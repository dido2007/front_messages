'use client'
import Profile from "@components/Profile/Profile";
import { useAuth } from "@context/AuthContext";

const MyProfile = () => {
  const { user, isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return(<section className='flex items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>
        Vous devez être connecté pour voir votre profil.
      </h1>
    </section>
    )
  } else {
    return (
      <div className="flex justify-center items-center">
        <Profile user={user} userProfile={true} />
      </div>
    );
  }
};

export default MyProfile;
