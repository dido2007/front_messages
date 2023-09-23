"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { usePathname } from 'next/navigation';
import { useFetchMessages } from '@hooks/Chat/chat';
import { useAuth } from "@context/AuthContext";



const socket = io("http://localhost:3500");

const ChatComponent = () => {
  const pathname = usePathname();
  const [fetchedMessages, loading] = useFetchMessages();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [toUserId, setToUserId] = useState(null);
  const [fromUserId, setFromUserId] = useState(null);
  const { user, isAuthenticated } = useAuth();



  useEffect(() => {
    // Extraction des IDs
    const ids = pathname.split('/chat/')[1].split('+');
    setToUserId(ids[0]);
    setFromUserId(ids[1]);

    // Load initial messages from the API
    if (fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
    }

    // Rejoindre la salle
    socket.emit("join room", { to: ids[0], from: ids[1] });

    // Écoutez les nouveaux messages
    socket.on("private message", (message) => { 
        setMessages((prevMessages) => [...prevMessages, {...message, self: message.from === user._id }]);
    });

    return () => {
      socket.off("private message");
    };
}, [fetchedMessages]);


  const handleSend =  () => {
    if (newMessage.trim() !== '' && toUserId && fromUserId) {
      const message = {
        content: newMessage.trim(),
        from: fromUserId,
        to: toUserId,
        self: true,
      };
      socket.emit("private message", message);
      setNewMessage('');


    }
  };
  
  

  return (
    <div className="flex flex-col h-[60vh] w-2/3 mx-auto bg-blue-50">
      <div className="flex flex-col flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-md mx-2 my-1 p-2 rounded ${
            message.self ? 'bg-blue-400 text-white ml-auto' : 'bg-white text-blue-400 mr-auto'
          }`}
        >
          {message.content}
        </div>
      ))}
      </div>

      <div className="flex items-center p-2 bg-white border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
          className="flex-1 p-2 rounded border"
        />
        <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-400 text-white rounded">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
