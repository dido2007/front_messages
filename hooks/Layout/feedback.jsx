import axios from "axios";

export const sendFeedback = async (data) => {
  
  try {    
    const response = await axios.post('http://localhost:3500/api/layout/feedback', {
      title: data.title, 
      description: data.description,
    })

    return response.data;
  }
  catch (error) {
    console.error('Error performing the feedback sending on the backend:', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}

