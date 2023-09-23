'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useAuth } from "@context/AuthContext";


export const useFetchMessages = () => {
    const pathname = usePathname();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();


    useEffect(() => {
        const fetchMessages = async () => {
            const ids = pathname.split('/chat/')[1].split('+');
            const from = ids[0];
            const to = ids[1];

            try {
                const response = await axios.get(`http://localhost:3500/api/chat/history/${from}/${to}`);
                if (response.data.success) {
                    const modifiedMessages = response.data.messages.map(msg => ({
                        ...msg,
                        self: msg.from === user._id
                    }));
                    setMessages(modifiedMessages);
                }
                
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [pathname]);

    return [messages, loading];
}
