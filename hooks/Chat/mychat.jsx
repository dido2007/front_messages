'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "@context/AuthContext";

export const useMyChats = () => {
  const { user } = useAuth();
  const [myChats, setMyChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/chat/mychats', {
          params: {
            userId: user._id
          }
        });
        setMyChats(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des conversations", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); //mettre user._id 

  return { myChats, loading };
};
