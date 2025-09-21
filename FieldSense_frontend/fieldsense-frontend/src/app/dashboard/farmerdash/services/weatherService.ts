import { WeatherData } from '../types';

class WeatherService {
  private apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(lat: string, lon: string): Promise<WeatherData> {
    try {
      if (!this.apiKey) {
        // Return mock data if no API key
        return this.getMockWeatherData();
      }

      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      
      const data = await response.json();
      
      return {
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        rainfall: data.clouds?.all || 0,
        windSpeed: Math.round(data.wind?.speed * 3.6), // Convert m/s to km/h
        condition: data.weather[0]?.description || 'Clear',
        uvIndex: 5, // Would need separate UV API call
        pressure: data.main.pressure
      };
    } catch (error) {
      console.error('Weather service error:', error);
      return this.getMockWeatherData();
    }
  }

  private getMockWeatherData(): WeatherData {
    return {
      temp: 28,
      humidity: 65,
      rainfall: 20,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      uvIndex: 7,
      pressure: 1013
    };
  }
}

export const weatherService = new WeatherService();
