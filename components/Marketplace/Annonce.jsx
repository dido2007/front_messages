'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

const Annonce = ({ annonce }) => {
    const userPosition = [annonce.user.position.latitude, annonce.user.position.longitude]
    const customIcon = new L.Icon({
      iconUrl: '/assets/map-marker.svg',
      iconSize: [32, 32],  
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  
  
    if (!userPosition) {
      return <p>Chargement de la position...</p>;
    }

    const setImage = () => {
        switch(annonce.metier) {
          case 'Menuisier':
            return '/assets/images/metiers/technicien-menuisier.png'
          case 'Jardinier':
            return '/assets/images/metiers/technicien-jardinier.png'
          case 'Menage':
            return '/assets/images/metiers/technicien-menage.png'
          case 'Electricien':
            return '/assets/images/metiers/technicien-electricien.png'
        }
    }
    
    console.log(annonce)
    
    const image = setImage()

    return (
      <section className='flex flex-col items-center justify-center'>
        <br /><br />
        <div className="bg-gray-800 rounded-lg p-6 space-y-4 flex flex-col items-center justify-center w-3/4">
          <div>
            <h1 className='text-3xl font-bold text-center mb-2 text-white'>
                {annonce.annonceType + '  '} | {annonce.metier}
            </h1>
            <div>
                <img className="p-8 rounded-t-lg" src={image} width="300" height="300" alt="product image" />
            </div>
            <div className="flex justify-center mt-5">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{annonce.tarif}</span>
            </div>
            <h1 className='text-3xl font-bold text-center mb-2 text-white'>
                Description de l'annonce
            </h1>
            <div className="bg-gray-100 rounded-lg p-4 md:w-96">
                <h1 className='text-s md:text-lg text-center mb-2'>
                {annonce.description}
                </h1>
            </div>
            <Link href={'tel:+216' + annonce.user.phoneNumber}>
                <button 
                    type="button" 
                    className="bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center"
                    style={{ color: '#218AC6' }}>
                    Ajouter une annonce
                </button>
            </Link>
          </div>
          <div>
            <h1 className='text-3xl font-bold text-center mb-2 text-white'>
                {annonce.user.fullName}
            </h1>
            <h1 className='text-xl font-semibold text-center mb-2 text-white'>
                {annonce.user.age}
            </h1>
            <div className='flex items-center justify-center mb-4'>
                <img
                src={'http://localhost:3500/' + annonce.user.avatar}
                width={100}
                height={100}
                alt='User Avatar'
                className='rounded-full'
                />
            </div>
            <br />
            <h1 className='text-3xl font-bold text-center mb-2 text-white'>
                Localisation
            </h1>
            <br />
            <div className='rounded-full h-40 w-80 md:h-40 md:w-80 overflow-hidden sticky'>
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
        </div>
      </section>
    );
};

export default Annonce;