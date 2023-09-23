import axios from "axios";

export const verifyVerificationCode = async (phoneNumber, verificationCode) => {
  try {    
    const response = await axios.post('http://localhost:3500/api/auth/verification', {
      code: verificationCode, 
      phone: phoneNumber,
    });

    return response.data; 
  }
  catch (error) {
    console.error('Error performing verification code phone number and verification code are not sent on the backend:', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}

    return data;
  }
}

