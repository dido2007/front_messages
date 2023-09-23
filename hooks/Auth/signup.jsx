import axios from "axios";

export const sendVerificationCode = async (phoneNumber) => {
  try {
    const response = await axios.post('http://localhost:3500/api/auth/signup-verification', {
      phone_number: phoneNumber,
    });

    return response.data; 
  } 
  catch (error) {
    console.error('Error performing login phone number is not sent on the backend:', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
};

export const finishRegistration = async (data) => {

  const formData = new FormData();
  formData.append('avatar', data.avatar);

  for (let i = 0; i < data.images.length; i++) {
    formData.append('images', data.images[i]);
  }

  formData.append('data', JSON.stringify(data));

  try {
    const response = await axios.post('http://localhost:3500/api/auth/signup', formData);
    
    return response.data;
  } 
  catch (error) {
    console.error('Error performing the signup: ', error);
    const data = {success: false, fallback: "Erreur lors de la connection a la base de donne"}
    
    return data;
  }
}