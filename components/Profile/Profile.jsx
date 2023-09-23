'use client'
import { useEffect, useState } from 'react';
import { getOffres, getDemandes } from '@hooks/Marketplace/get-annonces';
import { useRouter } from 'next/navigation';
import AnnoncesCard from './AnnoncesCard';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '@context/AuthContext';


const Profile = ({ user, userProfile }) => {
    const [offres, setOffres] = useState([]);
    const [demandes, setDemandes] = useState([]);
    const { user: currentUser, isAuthenticated } = useAuth();
    const router = useRouter();
    const userPosition = [user.position.latitude, user.position.longitude]
    const customIcon = new L.Icon({
      iconUrl: '/assets/map-marker.svg',
      iconSize: [32, 32],  
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  
  
    if (!userPosition) {
      return <p>Chargement de la position...</p>;
    }

    useEffect(() => {
      const fetchData = async () => {
          const offresResponse = await getOffres(user._id);
          const demandesResponse = await getDemandes(user._id);

          if (offresResponse.success) {
              setOffres(offresResponse.data);
          } else {
              console.error("Erreur lors du get des offres.");
          }

          if (demandesResponse.success) {
              setDemandes(demandesResponse.data);
          } else {
              console.error("Erreur lors du get des demandes.");
          }
      };

      fetchData();
  }, [user._id]);
  
  console.log(offres[0])

  const handleInitiateChat = () => {
    if (isAuthenticated) {
      const toUserId = currentUser._id; // Récupérez cet ID comme vous le souhaitez, peut-être à partir d'une liste d'utilisateurs ou de profils
      const fromUserId = user._id;


      router.push(`/chat/${toUserId}+${fromUserId}`);

    } else {
      alert("Vous devez être connecté pour chatter.");
    }
  };

    return (
      <>
      <br/>
        <div className="card w-96 bg-base-100 w-1/2">
          <figure className="px-10 pt-10">
            <div className="avatar mb-1.5">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={'http://localhost:3500/' + user.avatar} alt='User Avatar' />
              </div>
            </div>          
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user.fullName}</h2>
            <p>{user.age}ans</p>
            {
              userProfile? (
                <>
                </>
              ) : (
                <div className="card-actions">
                  <button onClick={handleInitiateChat} className="btn btn-outline btn-primary">Message</button>
                  <a href={`tel:+216` + user.phone}><button className="btn btn-outline btn-primary">Telephone</button></a>
                </div>
              )
            }

            <br />
            
            <div className='card badge p-10'>
              {user.bio}
            </div>
            <br/>
            <div className="carousel carousel-center rounded-box">
                <div className="carousel-item h-24 w-60 ">
                  <MapContainer center={userPosition} zoom={13} className='w-full h-full'>
                    <TileLayer
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker icon={customIcon} position={userPosition} />
                  </MapContainer>
                </div> 
            </div>
            <br />
            {user.images.length > 0 &&
                  user.images.slice(0, 5).map((image, index) => (
              <div key={index} className="carousel carousel-center rounded-box">
                <div className="carousel-item">
                  <img className="h-64 w-64" src={'http://localhost:3500/' + image} alt={`User image` + index} />
                </div> 
              </div>
                  ))
            }
          </div>
        </div>
      </>

    );
};

export default Profile;