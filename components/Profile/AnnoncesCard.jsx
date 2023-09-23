const AnnoncesCard = ( { annonce } ) => {
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


  const image = setImage()
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
          <div>
              <img className="p-8 rounded-t-lg" src={image} width="300" height="300" alt="product image" />
          </div>

          <div className="px-5 pb-5">
          <div className="flex justify-between items-center text-xl font-semibold text-gray-900 dark:text-white pt-3 mt-5">
              <div className="rounded-full  py-1">{annonce.annonceType}</div>|
              <div className="rounded-full px-3 py-1">{annonce.metier}</div>
          </div>
          <br/>
          <hr className="bg-black" /> 
          <div className="flex justify-center mt-5">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{annonce.tarif + 'DT'}</span>
          </div>
          </div>
      </div>
    </div>
  );
};

export default AnnoncesCard;