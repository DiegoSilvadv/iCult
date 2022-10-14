import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const port = 3333;

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/events', async (req, res) => {
    const locations = await prisma.Locations.findMany()
    return res.json(locations);
});

app.post('/createLocations', async (req, res) => {
    const reqData = req.body;
    const createLocation = await prisma.Locations.create({
        data: {
            eventName: reqData.eventName,
            eventType: reqData.eventType,
            hourStart: reqData.hourStart,
            hourEnd: reqData.hourEnd,
            longitude: reqData.longitude,
            latitude: reqData.latitude
        }
    })
    return res.json(createLocation);

})
app.listen(port, () => console.log('Server is running now'));