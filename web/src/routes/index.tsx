import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AddEvent } from "../pages/AddEvent";
 
import {MapPage} from '../pages/Map'

export function AppRoute() {
    return (
        <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/event" element={<AddEvent />} />
        </Routes>  
    )
}