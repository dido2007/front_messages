'use client'

import { useAuth } from "@context/AuthContext";
import { useMyChats } from '@hooks/Chat/mychat';
import ChatCard from '@components/Chat/mychat';

const Chat = () => {
  const { isAuthenticated } = useAuth();
  const { myChats, loading } = useMyChats();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (isAuthenticated) {
    return (
      <>
        <section className='flex items-center justify-center h-screen'>
          <h1 className='text-3xl font-bold text-center'>
            Vous devez être connecté
          </h1>
        </section>
      </>
    )
  } else {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-4 text-center'>Vos Chats</h2>
        {myChats.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 ml-5 lg:grid-cols-3 ml-20 gap-4">
            {myChats.map((chat, index) => (
              <ChatCard key={index} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <p className="text-lg text-gray-600">Aucun chat, commencez un !</p>
          </div>
        )}
      </div>
    );
  }
};

export default Chat;
