import { useState } from 'react';
import { NotificationData } from '../types';
import { 
  Droplets,
  CloudRain,
  FileText,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export const useNotifications = (language: string = 'hi') => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getNotifications = (): NotificationData[] => [
    {
      id: 1,
      type: 'warning',
      title: language === 'hi' ? 'मुख्य खेत के लिए सिंचाई अनुस्मारक' : 'Irrigation reminder for main field',
      message: language === 'hi' ? 'कल सुबह 6 बजे तक सिंचाई करें' : 'Irrigate by 6 AM tomorrow',
      time: language === 'hi' ? "2 घंटे पहले" : "2 hours ago",
      urgent: true,
      icon: Droplets
    },
    {
      id: 2,
      type: 'info',
      title: language === 'hi' ? 'मौसम चेतावनी: भारी बारिश की संभावना' : 'Weather alert: Heavy rain expected',
      message: language === 'hi' ? 'अगले 3 दिनों में 80mm बारिश' : '80mm rainfall expected in next 3 days',
      time: language === 'hi' ? "4 घंटे पहले" : "4 hours ago",
      urgent: false,
      icon: CloudRain
    },
    {
      id: 3,
      type: 'success',
      title: language === 'hi' ? 'आपकी मिट्टी विश्लेषण रिपोर्ट तैयार है' : 'Your soil analysis report is ready',
      message: language === 'hi' ? 'डाउनलोड करने के लिए तैयार' : 'Ready for download',
      time: language === 'hi' ? "6 घंटे पहले" : "6 hours ago",
      urgent: false,
      icon: FileText
    },
    {
      id: 4,
      type: 'warning',
      title: language === 'hi' ? 'दक्षिण खेत में कीट का पता चला' : 'Pest detection alert in south field',
      message: language === 'hi' ? 'तुरंत कार्रवाई की आवश्यकता' : 'Immediate action required',
      time: language === 'hi' ? "1 दिन पहले" : "1 day ago",
      urgent: true,
      icon: AlertTriangle
    },
    {
      id: 5,
      type: 'info',
      title: language === 'hi' ? 'नई कृषि तकनीकें उपलब्ध हैं' : 'New farming techniques available',
      message: language === 'hi' ? 'ऐप अपडेट करें' : 'Update app for new features',
      time: language === 'hi' ? "2 दिन पहले" : "2 days ago",
      urgent: false,
      icon: TrendingUp
    }
  ];

  return {
    notifications: getNotifications(),
    showNotifications,
    setShowNotifications
  };
};
