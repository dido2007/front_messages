import axios from "axios";

export const getOffres = async (userId) => {

  try {
    const response = await axios.post('http://localhost:3500/api/marketplace/getoffres', {
        userId: userId
    });

    return response.data;
  } 
  catch (error) {
    console.error('Error performing the get offres : ', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}

export const getDemandes = async (userId) => {
    try {
      const response = await axios.post('http://localhost:3500/api/marketplace/getdemandes', {
        userId: userId
      });
      
      return  response.data;
    } 
    catch (error) {
      console.error('Error performing the get demandes : ', error);
      const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
      
      return data;
    }
  }