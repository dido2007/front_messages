'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { finishRegistration } from '@hooks/Auth/signup'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from "@context/AuthContext";


function SignupInfo(props) {
    const customIcon = new L.Icon({
        iconUrl: '/assets/map-marker.svg',
        iconSize: [32, 32],  
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [avatar, setAvatar] = useState('');
    const [position, setPosition] = useState([11.866496, 56.253163]);
    const [userType, setUserType] = useState('');
    const [interestedServices, setInterestedServices] = useState([]);
    const [bio, setBio] = useState('');
    const [images, setImages] = useState([]);
    const [pdp, setPdp]= useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleFirstNameChange = (e) => {
        const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, ''); 
        setFirstName(newValue);
    };
    
    const handleLastNameChange = (e) => {
        const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, ''); 
        setLastName(newValue);
    };

    const fullName = firstName + " " + lastName

    const LocationMarker = () => {
        useMapEvents({
          click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
          },
        });
      
        return (
          <Marker icon={customIcon} position={position} draggable={true} ondragend={(e) => setPosition([e.target.getLatLng().lat, e.target.getLatLng().lng])}>
            <Popup>Vous êtes ici</Popup>
          </Marker>
        );
    };

    // const handleAvatarChange = (event) => {
    //     const file = event.target.files[0];
    //     setAvatar(file);
    // };
    
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setPosition([latitude, longitude]);
            }, (error) => {
                console.error("Erreur lors de la récupération de la localisation", error);
            });
        } else {
            console.error("La géolocalisation n'est pas prise en charge par ce navigateur");
        }
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const [profilePic, setProfilePic] = useState('');
  

    const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      setAvatar(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPdp(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const handleInterestedServicesChange = (event) => {
        if(interestedServices.includes(value)){
            setInterestedServices(interestedServices.filter((item) => item !== value));            
        }else{
            setInterestedServices([...interestedServices, value]);            
        }
    }; 


    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleImagesChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    const handleSubmit = async () => {
        const response = await finishRegistration(data);
        const success = response.success
        const fallback = response.fallback
        alert(fallback)

        console.log('DATA' + data.fullName)
        const userData = response.data
        if (success) {
            login(userData)
            router.push("/")
        } else {
          console.error("Valeurs mals envoyees a la DB.");
        }
    };

    const data = {
        phoneNumber: props.phoneNumber,
        fullName: fullName,
        age: age,
        avatar: avatar,
        rating: 0,
        bio: bio,
        images: images,
        position: position,
        interestedServices: interestedServices,
        userType: userType,
    }

    const navigateToHaveAccount = () => {
        router.replace("/auth/signup")
    };

    return (

        <>
            <div className='flex flex-col items-center h-full place-items-center'>
                <div className='mt-5 card w-96 bg-base-100'>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-3xl mb-5">Creer votre compte</h2>
                        <br />
                        <div className='flex flex-row'>
                            <div className='flex flex-col mr-3'>
                                <span className="label-text">Votre prenom</span>
                                <input type="text" placeholder="John" value={firstName} onChange={handleFirstNameChange} maxLength={16} className="input input-bordered input-primary appearance-none w-full max-w-xs" />
                            </div>

                            <div className='flex flex-col ml-3'>
                                <span className="label-text">Votre nom</span>
                                <input type="text" placeholder="Doe" value={lastName} onChange={handleLastNameChange} maxLength={16} className="input input-bordered input-primary appearance-none w-full max-w-xs" />
                            </div>
                        </div>
                        <br />
                        <span className="label-text">Votre age</span>
                        <input type="number" placeholder="18" value={age} onChange={handleAgeChange} maxLength={2} max={80} min={18}  className="input input-bordered input-primary appearance-none w-full max-w-xs" />
                        <br />
                        <span className="label-text">Votre photo de profile</span>
                        <input type="file" accept="image/*" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleAvatarChange} />
                        {pdp && ( <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mt-4"> <img src={pdp} alt="Avatar" className="w-full h-full object-cover" /></div>)}
                        <br />
                        <span className="label-text">Votre position</span>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='sticky w-80 h-40'>
                            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <LocationMarker />
                            </MapContainer>
                            </div>
                            <br />
                            <button onClick={getCurrentLocation}  className="btn btn-outline btn-primary">Ma localisation</button>
                        </div>
                        <br />
                        <span className="label-text">Etes-vous plutôt Offreur ou Demandeur de service ?</span>
                        <select className="select select-primary w-full max-w-xs" required value={userType} onChange={handleUserTypeChange}>
                            <option disabled selected>Sélectionnez une option</option>
                            <option value="offreur">Offreur</option>
                            <option value="demandeur">Demandeur</option>
                            <option value="offreur+demandeur">Les deux</option>
                        </select>
                        <br />
                        <span className="label-text">Quels sont les services qui vous intéressent le plus ?</span>
                        <div className="flex flex-col">
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Technicien</span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={interestedServices.includes('technicien')}
                                        onChange={() => handleInterestedServicesChange('technicien')}
                                    />
                                </label>
                            </div>
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Formateur</span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={interestedServices.includes('formateur')}
                                        onChange={() => handleInterestedServicesChange('formateur')}
                                    />
                                </label>
                            </div>
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Assistance</span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={interestedServices.includes('assistance')}
                                        onChange={() => handleInterestedServicesChange('assistance')}
                                    />
                                </label>
                            </div>
                            <div className="form-control w-52">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Freelance</span>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={interestedServices.includes('freelance')}
                                        onChange={() => handleInterestedServicesChange('freelance')}
                                    />
                                </label>
                            </div>
                        </div>
                        <br />
                        <span className="label-text">Decrivez-vous en quelques mots</span>
                        <textarea className="textarea textarea-primary" required placeholder="Decrivez-vous..." onChange={handleBioChange} value={bio}></textarea>
                        <br/>
                        <br />
                        <span className="label-text">Avez-vous des images de vos anciens projets, de vos diplomes/certificats, de votre matériel ?</span>
                        <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                        <br/>
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
                        </div>
                        <p>Vous avez un compte ? <a href='/auth/login' className="link link-primary">Se connecter</a></p>
                    </div>
                </div>
            </div>
        </>

    );
    
}

export default SignupInfo;