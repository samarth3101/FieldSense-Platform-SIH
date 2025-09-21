import { useState } from 'react';
import { ChatMessage } from '../types';

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const sendMessage = (language: string = 'hi') => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: chatMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        text: language === 'hi' 
          ? "मैं आपके प्रश्न को समझ रहा हूं। कृपया थोड़ा इंतजार करें।" 
          : "I understand your question. Please wait a moment.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoiceRecording = (cropHealthText: string) => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setChatMessage(cropHealthText);
        setIsListening(false);
      }, 3000);
    }
  };

  return {
    chatMessages,
    chatMessage,
    setChatMessage,
    isListening,
    sendMessage,
    toggleVoiceRecording
  };
};
