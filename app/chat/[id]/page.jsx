'use client'

import { usePathname } from 'next/navigation';
import Chat from '@components/Chat/chat';
import { useAuth } from "@context/AuthContext";



function ChatPage() {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuth();
  
    let toUserId, fromUserId;
  
    if (pathname) {
      const chatIdPart = pathname.split('/chat/')[1];
      if (chatIdPart) {
        [toUserId, fromUserId] = chatIdPart.split('+');
      }
    }
  
    const canAcceesToChat = () => {
        if (!isAuthenticated) return false;
        
        if (user && (user._id === toUserId || user._id === fromUserId)) {
          return true;
        }
        return false;
      };
  

  
    return (
      <>
        {
          !canAcceesToChat() ? (
            <section className='flex items-center justify-center h-screen'>
              <h1 className='text-3xl font-bold text-center'>
                Vous n'avez pas le droit d'accéder à ce chat.
              </h1>
            </section>
          ) : (<Chat />)
        }
      </>
    );
  };
  


export default ChatPage;

