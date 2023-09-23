'use client'
import { useState } from 'react';
import { sendVerificationCode } from '@hooks/Auth/login';
import { useRouter } from 'next/navigation';
import { useAuth } from "@context/AuthContext";

function LoginCard(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleVerificationCode = async () => {

    console.log("Numero de telephone obtenu a travers la login card : " + phoneNumber);

    const response = await sendVerificationCode(phoneNumber);
    const success = response.success
    const fallback = response.fallback
    alert(fallback)
    
    if (success) {
      props.buttonClick(data);
    } else {
      console.error("Invalid phone number.");
    }
  };  

  const navigateToCreateAccount = () => {
    router.push("/auth/signup")
  };

  const data = {
    cardtype: 2,
    phoneNumber: phoneNumber,
  }



  return (
    <>
    <div className='flex flex-col items-center h-screen place-items-center'>
      <div className='mt-44 card w-96 bg-base-100'>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-5">Login</h2>
            <span className="label-text">Votre numero de telephone</span>
            <input type="number" placeholder="20218111" value={phoneNumber} onChange={handlePhoneNumberChange} maxLength={8} min={0} className="input input-bordered input-primary appearance-none w-full max-w-xs" />
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => handleVerificationCode()}>Login</button>
            </div>
            <p>Pas de compte? <a href='/auth/signup' className="link link-primary">Créer en un</a></p>
          </div>
        </div>
    </div>
    </>

  );
}

export default LoginCard;
