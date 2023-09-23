"use client"
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getDemandes } from '@hooks/Marketplace/get-annonces';
import { useAuth } from "@context/AuthContext";
import PinAnnonce from './PinAnnonce';

const MapDemande = ({ load }) => {
  const { user, isAuthenticated } = useAuth();
  const [userPosition, setUserPosition] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const customIcon = new L.Icon({
    iconUrl: '/assets/map-marker.svg',
    iconSize: [32, 32],  
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const fetchData = async () => {
    !isAuthenticated ? navigator.geolocation ? navigator.geolocation.getCurrentPosition(position => { setUserPosition([position.coords.latitude, position.coords.longitude])}) : alert("La géolocalisation n'est pas prise en charge par ce navigateur.") : setUserPosition([user.position.latitude, user.position.longitude])
      const demandesResponse = await getDemandes(false);
  
      if (demandesResponse.success) {
        setDemandes(demandesResponse.data);
        setLoading(false);
      } else {
        setError("Erreur lors du chargement des demandes.");
        setLoading(false);
        console.error("Erreur lors du chargement des demandes.");
      }
  };

  useEffect(() => {
    if (load) {
      fetchData(); 
    }
  }, [load]); 


  if (loading) {
    return <p>Chargement des demandes...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des demandes.</p>;
  }

  return (
    <div className="card w-96 h-64 items-center bg-base-100 shadow-xl sticky">
      <MapContainer icon={customIcon} center={userPosition} zoom={10} style={{ width: '200%', height: '150%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        {demandes.map((demande, index) => (
            <PinAnnonce key={index} annonce={demande}/>
          )
        )}
        <Marker icon={customIcon} position={userPosition}>
            <Popup>
              Ma position
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  );
};

export default MapDemande;
