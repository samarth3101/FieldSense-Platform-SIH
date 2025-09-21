import { FarmerData, Farm } from '../types';

class FarmService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async getFarmerData(farmerId: string, language: string = 'hi'): Promise<FarmerData> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return properly translated mock data
      return {
        name: language === 'hi' ? "राकेश शर्मा" : "Rakesh Sharma",
        phone: "+91 98765 43210",
        email: "rakesh.sharma@gmail.com",
        village: language === 'hi' ? "खराडी गाँव" : "Kharadi Village",
        state: language === 'hi' ? "महाराष्ट्र" : "Maharashtra",
        district: language === 'hi' ? "पुणे" : "Pune",
        pincode: "411014",
        totalLand: language === 'hi' ? "4.3 एकड़" : "4.3 acres",
        memberSince: "2023",
        farmerID: "MH-PN-2023-001247",
        farms: [
          {
            id: 1,
            name: language === 'hi' ? "मुख्य खेत" : "Main Field",
            size: language === 'hi' ? "2.5 एकड़" : "2.5 acres",
            crop: language === 'hi' ? "गेहूं" : "Wheat",
            location: language === 'hi' ? "प्लॉट A1" : "Plot A1",
            health: language === 'hi' ? "उत्कृष्ट" : "Excellent",
            lastUpdate: "2",
            soilType: language === 'hi' ? "काली मिट्टी" : "Black Soil",
            irrigationType: language === 'hi' ? "स्प्रिंकलर" : "Sprinkler"
          },
          {
            id: 2,
            name: language === 'hi' ? "दक्षिण खेत" : "South Field",
            size: language === 'hi' ? "1.8 एकड़" : "1.8 acres",
            crop: language === 'hi' ? "चना" : "Gram",
            location: language === 'hi' ? "प्लॉट B2" : "Plot B2",
            health: language === 'hi' ? "अच्छा" : "Good",
            lastUpdate: "1",
            soilType: language === 'hi' ? "लाल मिट्टी" : "Red Soil",
            irrigationType: language === 'hi' ? "ड्रिप" : "Drip"
          }
        ]
      };
    } catch (error) {
      console.error('Farm service error:', error);
      throw error;
    }
  }

  async updateFarmHealth(farmId: number, health: string): Promise<void> {
    try {
      // In real app, this would update via API
      console.log(`Updating farm ${farmId} health to: ${health}`);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Update farm health error:', error);
      throw error;
    }
  }
}

export const farmService = new FarmService();
