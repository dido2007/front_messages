"use client"
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PinAnnonce = ({ annonce }) => {
    const customIcon = new L.Icon({
        iconUrl: '/assets/map-marker.svg',
        iconSize: [32, 32],  
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    console.log("annonce", annonce)
    console.log("annonce", annonce.user.fullName)



  return (
        <Marker icon={customIcon} position={[annonce.user.position.latitude, annonce.user.position.longitude]}>
            <Popup>
            {annonce.metier} - {annonce.tarif}DT
            </Popup>
        </Marker>
              
    )
}

export default PinAnnonce