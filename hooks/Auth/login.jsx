import axios from "axios";

export const sendVerificationCode = async (phoneNumber) => {
  try {
    const response = await axios.post('http://localhost:3500/api/auth/login', {
      phone_number: phoneNumber,
    });

    return response.data;
  } 
  catch (error) {
    console.error('Error performing login phone number is not sent on the backend:', error);
    const data = { success: false, fallback: "Erreur lors de la connexion à la base de données" };
    
    return data;
  }
};
