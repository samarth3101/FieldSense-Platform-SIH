import { useState } from 'react';
import { LocationData } from '../types';

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    lat: '',
    long: '',
    city: '',
    state: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = async (language: string = 'hi'): Promise<LocationData> => {
    setIsLoading(true);
    
    // Simulate location fetching
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockLocation: LocationData = {
      lat: "18.5204",
      long: "73.8567", 
      city: language === 'hi' ? "पुणे" : "Pune",
      state: language === 'hi' ? "महाराष्ट्र" : "Maharashtra"
    };
    
    setLocationData(mockLocation);
    setIsLoading(false);
    
    return mockLocation;
  };

  return {
    locationData,
    isLoading,
    requestLocation,
    setLocationData
  };
};
