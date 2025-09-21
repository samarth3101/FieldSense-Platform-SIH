import { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { weatherService } from '../services/weatherService';

export const useWeather = (lat?: string, lon?: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude?: string, longitude?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getCurrentWeather(
        latitude || lat || "18.5204",
        longitude || lon || "73.8567"
      );
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon);
    } else {
      // Load with default coordinates
      fetchWeather();
    }
  }, [lat, lon]);

  return {
    weatherData,
    isLoading,
    error,
    refetch: fetchWeather
  };
};
