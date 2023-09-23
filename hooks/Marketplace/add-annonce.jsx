import axios from "axios";

export const addAnnonce = async (data) => {

  const formData = new FormData();

  formData.append('data', JSON.stringify(data));

  for (let i = 0; i < data.images.length; i++) {
    formData.append('images', data.images[i]);
  }
  
  try {
    const response = await axios.post('http://localhost:3500/api/marketplace/add', formData);
    
    return response.data;
  } catch (error) {
    console.error('Error performing the add annonce: ', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}