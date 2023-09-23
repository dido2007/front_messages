'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAnnonce } from '@hooks/Marketplace/add-annonce'
import { useAuth } from "@context/AuthContext";

const AddAnnonce = () => {
    const [annonceType, setAnnonceType] = useState('');
    const [metier, setMetier] = useState('');
    const [description, setDescription] = useState('');
    const [disponibilite, setDisponibilite] = useState([]);
    const [tarif, setTarif] = useState('');
    const [images, setImages] = useState([]);
    const router = useRouter();
    const { user } = useAuth();

    const handleAnnonceTypeChange = (event) => {
        setAnnonceType(event.target.value);
    };

    const handleMetierChange = (event) => {
        setMetier(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDisponibiliteChange = (value) => {
        if (disponibilite.includes(value)) {
            setDisponibilite(disponibilite.filter((item) => item !== value));
        } else {
            setDisponibilite([...disponibilite, value]);
        }
    };

    const handleTarifChange = (event) => {
        setTarif(event.target.value);
    };

    const handleImagesChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    const handleSubmit = async () => {
        console.log(metier)
        console.log(data.annonceType)
        console.log(data.metier)
        const response = await addAnnonce(data);
        const success = response.success
        const fallback = response.fallback
        alert(fallback)

        if (success) {
            router.push("/")
        } else {
          console.error("Valeurs mals envoyees a la DB.");
        }
    };

    const data = {
        userId: user,
        annonceType: annonceType,
        metier: metier,
        description: description,
        disponibilite: disponibilite,
        tarif: tarif,
        images: images,
    }
  return (
    <>
        <br />
        <div className="card  bg-base-100 w-full">
            <div className="card-body items-center text-center">
                <h2 className="card-title">Creer une annonce</h2>
                <p>Soyez acteur de notre communaute</p>
                <br/>
                <span className="label-text">Selectionnez le type de service</span>
                <select className="select select-primary w-full max-w-xs" required value={annonceType} onChange={handleAnnonceTypeChange}>
                    <option disabled selected>Offre ou Demande ?</option>
                    <option disabled></option>
                    <option value="Offre">Une Offre</option>
                    <option value="Demande">Une Demande</option>
                </select>
                <br/>
                <span className="label-text">Selectionnez le type de metier</span>
                <select className="select select-primary w-full max-w-xs" required value={metier} onChange={handleMetierChange}>
                    <option disabled selected>Quel metier ?</option>
                    <option disabled></option>
                    <option disabled className="text-red-500 font-bold">Techniciens :</option>
                    <option value="Jardinier">Jardinier</option>
                    <option value="Femme de Menage">Femme de Menage</option>
                    <option value="Plombier">Plombier</option>
                    <option value="Menuisier">Menuisier</option>
                    <option value="Electricien">Electricien</option>
                    <option disabled className="text-red-500 font-bold">Formation :</option>
                    <option value="Formation Scolaire">Formation Scolaire</option>
                    <option value="Formation Sportive">Formation Sportive</option>
                    <option value="Formation Professionnelle">Formation Professionnelle</option>
                    <option value="Formation Artistique">Formation Artistique</option>
                    <option value="Formation Culinaire">Formation Culinaire</option>
                    <option disabled className="text-red-500 font-bold">Freelance :</option>
                    <option value="Developpeur">Developpeur</option>
                    <option value="Graphiste">Graphiste</option>
                    <option value="Marketing Digital">Marketing Digital</option>
                    <option value="Designer">Designer</option>
                </select>
                <br/>
                <span className="label-text">Selectionnez votre disponibilite</span>
                <div className="flex flex-col">
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">Les weekends</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={disponibilite.includes('weekends')}
                                onChange={() => handleDisponibiliteChange('weekends')}
                            />
                        </label>
                    </div>
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">En semaine</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={disponibilite.includes('semaine')}
                                onChange={() => handleDisponibiliteChange('semaine')}
                            />
                        </label>
                    </div>
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">Les matins</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={disponibilite.includes('matins')}
                                onChange={() => handleDisponibiliteChange('matins')}
                            />
                        </label>
                    </div>
                    <div className="form-control w-52">
                        <label className="cursor-pointer label">
                            <span className="label-text">Les apres-midi</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={disponibilite.includes('apres-midi')}
                                onChange={() => handleDisponibiliteChange('apres-midi')}
                            />
                        </label>
                    </div>
                </div>
                <br/>
                <span className="label-text">Decrivez la tache en quelques mots</span>
                <textarea className="textarea textarea-primary" required placeholder="Decrivez la tache..." onChange={handleDescriptionChange} value={description}></textarea>
                <br/>
                <span className="label-text">Prenez une image</span>
                <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <br/>
                <span className="label-text">Ajoutez le tarif</span>
                <div className="form-control">
                    <label className="input-group">
                        <span className='btn-primary text-white'>Tarif</span>
                        <input required type="number" value={tarif} onChange={handleTarifChange} min={5} step={5} max={1000} placeholder="5" className="input input-bordered input-primary" />
                        <span className='btn-primary text-white'>DT</span>
                    </label>
                </div>
                <br />
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={handleSubmit}>Publier</button>
                </div>
            </div>
        </div>
    </>

  )
}

export default AddAnnonce