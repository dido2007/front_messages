'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { verifyVerificationCode } from '@hooks/Auth/verification'
import { useAuth } from "@context/AuthContext";

const VerifCodeSignup = (props) => {
    const { login } = useAuth();
    const [verificationCode, setVerificationCode] = useState('');

    const router = useRouter();

    const navigateToCreateAccount = () => {
        router.push("/auth/signup")
      };
    
    
    const navigateToHaveAccount = () => {
        router.replace("/auth/signup")
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSubmit = async () => {
        const response = await verifyVerificationCode(props.phoneNumber, verificationCode);
        const success = response.success
        const fallback = response.fallback
        alert(fallback)

        console.log('DATA' + data.fullName)
        const userData = response.data
        if (success) {
            props.buttonClick(data);
        } else {
          console.error("Valeurs mals envoyees a la DB.");
        }
    };


    const data = {
        phoneNumber: props.phoneNumber,
        verificationCode: verificationCode,
        cardtype: 3,
    }
    
  return (
    <>
        <div className='flex flex-col items-center h-screen place-items-center'>
            <div className='mt-44 card w-96 bg-base-100'>
                <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl mb-5">Code de verification</h2>
                <span className="label-text">Votre numero de telephone</span>
                <input type="number" placeholder="000000" value={verificationCode} onChange={handleVerificationCodeChange} maxLength={6} min={0} className="input input-bordered input-primary appearance-none w-full max-w-xs" />
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Confirmer</button>
                </div>
                <p>Pas de compte? <a href='/auth/signup' className="link link-primary">Créer en un</a></p>
                <p>Vous avez un compte? <a href='/auth/login' className="link link-primary">Créer en un</a></p>
                </div>
            </div>
        </div>
    </>
  )
}

export default VerifCodeSignup