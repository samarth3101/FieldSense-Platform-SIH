export interface LocationData {
  lat: string;
  long: string;
  city: string;
  state: string;
}

export interface ReportData {
  id: string;
  timestamp: string;
  farmer: any;
  location: LocationData;
  cropHealth: number;
  soilCondition: string;
  pestRisk: string;
  recommendations: string[];
  yieldPrediction: number;
  soilMoisture: number;
  npkLevels: { n: number; p: number; k: number };
  diseaseRisk: string;
  irrigationSchedule: string[];
}

export interface NotificationData {
  id: number;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  urgent: boolean;
  icon: any;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}
