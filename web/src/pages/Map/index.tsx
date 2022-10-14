import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import Leaflet from "leaflet";
import { Plus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import logoIMG from '../../assets/logo.svg'
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface EventsLocationsType {
    id: string,
    eventName: string,
    eventType: string,
    hourStart: number,
    hourEnd: number,
    longitude: number,
    latitude: number
}

const iconMap = Leaflet.icon({
    iconUrl: logoIMG,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -55],
});

export function MapPage() {

    const [latitude, setLatitude] = useState(-23.3897984);
    const [longitude, setLongitude] = useState(-47.8380032);
    const [eventLocations, setEventLocations] = useState<EventsLocationsType[]>([])


    useEffect(() => {
        axios.get('http://localhost:3333/events')
            .then(response => {
                // handle success
                const data = response.data;
                setEventLocations(data)
                console.log(eventLocations)
                console.log(response.data[0].longitude)

            })
    }, []);

    function handleSubimit(event: FormEvent){

    }

    function LocationMaker() {
        const [position, setPosition] = useState<Number[]>([latitude, longitude]);
        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                const { lat, lng } = e.latlng;
                setLatitude(lat),
                    setLongitude(lng)
                map.flyTo(e.latlng, map.getZoom())
                console.log(position)
            },
        })

        return position === null ? null : (
            <Marker
                position={position}
                icon={iconMap}
            >

                <Popup>You are here</Popup>
            </Marker>)
    }


    return (
        <div className="h-scree">
            <MapContainer className="h-screen z-30" center={[-23.3701552, -47.8604453]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />{
                    eventLocations.map(location => {
                        return (
                            <Marker
                                key={location.id}
                                position={[location.longitude, location.latitude]}
                                icon={iconMap}
                            >
                                <Popup >
                                    <div>
                                        <label>{location.eventName}</label><br />
                                        <label>{location.eventType}</label><br />
                                        <small>das {location.hourEnd}hrs ate {location.hourEnd}hrs</small>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    })
                }

            </MapContainer>

            <Dialog.Root>
                <Dialog.Trigger
                    className="rounded absolute flex justify-center items-center bottom-4 left-4 z-30 bg-green-700 h-10 w-10"
                >
                    <Plus size={32} color="#ffffff" weight="light" />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/60 inset-0 fixed z-40" />
                    <Dialog.Content className="absolute m-auto top-0 bottom-0 left-0 right-0 bg-[#2A2634] h-[550px] w-[500px] z-40 text-white p-4 rounded">
                        <Dialog.Title className="text-3xl font-black text-white py-2">Públique um evento</Dialog.Title>

                        <p>Clique no mapa para pegar sua localização atual.</p>
                        <MapContainer className="h-[150px] z-30 rounded" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMaker />
                        </MapContainer>
                        <div className="py-2 flex justify-start flex-col">
                            <label htmlFor='namer'>Nome:</label>
                            <input className="bg-zinc-900 h-[40px] p-2 rounded" type="text" name="name" placeholder="Digite o nome do evento" />
                        </div>

                        <div className="py-2 flex justify-start flex-col">
                            <label htmlFor='eventType'>Tipo do evento:</label>
                            <input className="bg-zinc-900 h-[40px] p-2 rounded" type="text" id="eventType" placeholder="Digite o nome do evento" />
                        </div>

                        <div className="flex items-center justify-start py-2">
                            <div className="flex flex-col mr-10">
                                <label htmlFor='hourStart'>Início:</label>
                                <input className="bg-zinc-900 h-[40px] p-2 rounded" id="hourStart" type="time" placeholder="De" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor='hourEnd'>Fim:</label>
                                <input className="bg-zinc-900 h-[40px] p-2 rounded" name="hourEnd" type="time" placeholder="Até" />
                            </div>

                        </div>
                        <button className="bg-green-500 w-full h-10 rounded hover:bg-green-600">Criar</button>

                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>

    )
}