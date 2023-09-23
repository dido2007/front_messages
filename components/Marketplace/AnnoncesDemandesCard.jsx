import Link from "next/link";

const AnnoncesDemandesCard = ({ annonce }) => {

  const setImage = () => {
    switch(annonce.metier) {
      case 'Jardinier':
        return '/assets/images/metiers/technicien-jardinier.png'
      case 'Femme de Menage':
        return '/assets/images/metiers/technicien-nettoyeur.png'
      case 'Plombier':
        return '/assets/images/metiers/technicien-plombier.png'
      case 'Menuisier':
        return '/assets/images/metiers/technicien-menuisier.png'
      case 'Electricien':
        return '/assets/images/metiers/technicien-electricien.png'
      case 'Formation Scolaire':
        return '/assets/images/metiers/formation-scolaire.png'
      case 'Formation Sportive':
        return '/assets/images/metiers/formation-sportive.png'
      case 'Formation Professionnelle':
        return '/assets/images/metiers/formation-informatique.png'
      case 'Formation Artistique':
        return '/assets/images/metiers/formation-artistique.png'
      case 'Developpeur':
        return '/assets/images/metiers/freelance-developpeur.png'
      case 'Graphiste':
        return '/assets/images/metiers/freelance-graphiste.png'
      case 'Marketing Digital':
        return '/assets/images/metiers/freelance-marketing.png'
      case 'Designer':
        return '/assets/images/metiers/freelance-webdesigner.png'
    }
  }

  const image = setImage()

  const images = annonce.images
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <button>
          <Link href={'/profile/' + annonce.user._id}>
            <h2>
              <div className="avatar">
                <div className="w-6 h-6 rounded-full mr-4">
                    <img src={'http://localhost:3500/' + annonce.user.avatar} />
                </div>
              </div>
              {annonce.user.fullName}
            </h2>
            <span class="indicator-item badge">8km</span>
          </Link>
        </button>
        <figure className="px-10 pt-10">
          <div className="w-64 carousel rounded-box">
            <div className="carousel-item w-full">
              <img src={image} alt="Metier" />
            </div> 
              {images.map((image, index) => (
                <div className="carousel-item w-full">
                    <img src={'http://localhost:3500/' + image} className="mask mask-squircle w-80 h-60" key={index} alt="Tailwind CSS Carousel component" />
                </div> 
              ))}
        </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{annonce.annonceType + " " + annonce.metier}</h2>
          <p>{annonce.tarif + "DT"}</p>
          <div className="card-actions">
            <Link href={'/annonce/' + 1 + '-' + annonce._id} className="btn btn-primary">VOIR L'OFFRE</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnoncesDemandesCard;