'use client'
import SignupVerification from "@components/Auth/Signup/SignupVerification"
import SignupInfo from "@components/Auth/Signup/SignupInfo"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VerifCodeSignup from "@components/Auth/Signup/VerifCodeSignup";


const Signup = () => {
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
        <SignupVerification data={data} buttonClick={handleNavigation} />
    )
  } else if(cardType == 2){
    return (
        <VerifCodeSignup data={data} phoneNumber={phoneNumber} buttonClick={handleNavigation} />
    )
  } else if(cardType == 3){
    return (
        <SignupInfo data={data} phoneNumber={phoneNumber} buttonClick={handleNavigation} />
    )
  }else{
    router.replace("/")
  }

}

export default Signup