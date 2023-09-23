'use client'
import LoginVerification from "@components/Auth/Login/LoginVerification"
import VerifCodeLogin from "@components/Auth/Login/VerifCodeLogin";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [cardType, setCardType] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNavigation = (data) => {
    console.log("App Jsx Data : " + data);
    setData(() => data);
    console.log("App Jsx Data Cardtype : " + data.cardtype);
    setCardType(() => data.cardtype);
    console.log("App Jsx Data Phone : " + data.phoneNumber);
    setPhoneNumber(() => data.phoneNumber);
  };

  if(cardType == 1){
    return (
        <LoginVerification data={data} buttonClick={handleNavigation} />
    )
  } else if(cardType == 2){
    return (
        <VerifCodeLogin data={data} phoneNumber={phoneNumber} buttonClick={handleNavigation} />
    )
  } else{
    router.replace("/")
  }
}

export default Login