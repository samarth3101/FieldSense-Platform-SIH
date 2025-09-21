import { ReportData } from '../types';

class ReportService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async generateReport(locationData: any, farmerData: any, language: string = 'hi'): Promise<ReportData> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const reportId = `RPT-${Date.now()}`;
      const timestamp = new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN');
      
      return {
        id: reportId,
        timestamp: timestamp,
        farmer: farmerData || {
          name: language === 'hi' ? 'राकेश शर्मा' : 'Rakesh Sharma',
          farmerID: 'MH-PN-2023-001247',
          phone: '+91 98765 43210',
          village: language === 'hi' ? 'खराडी गाँव' : 'Kharadi Village',
          state: language === 'hi' ? 'महाराष्ट्र' : 'Maharashtra'
        },
        location: locationData,
        cropHealth: Math.floor(Math.random() * 20) + 75, // 75-95
        soilCondition: language === 'hi' ? 'अच्छी' : 'Good',
        pestRisk: language === 'hi' ? 'कम' : 'Low',
        recommendations: language === 'hi' ? [
          'नाइट्रोजन उर्वरक की मात्रा बढ़ाएं',
          'सप्ताह में दो बार सिंचाई करें',
          'कीटनाशक का छिड़काव करें',
          'मिट्टी की नमी बनाए रखें'
        ] : [
          'Increase nitrogen fertilizer application',
          'Irrigate twice weekly',
          'Apply pesticide spray',
          'Maintain soil moisture levels'
        ],
        yieldPrediction: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0
        soilMoisture: Math.floor(Math.random() * 30) + 60, // 60-90
        npkLevels: { 
          n: Math.floor(Math.random() * 30) + 60, 
          p: Math.floor(Math.random() * 30) + 55, 
          k: Math.floor(Math.random() * 30) + 65 
        },
        diseaseRisk: language === 'hi' ? 'कम' : 'Low',
        irrigationSchedule: language === 'hi' ? [
          'सोमवार सुबह 6:00 बजे',
          'बुधवार शाम 5:00 बजे',
          'शुक्रवार सुबह 6:00 बजे'
        ] : [
          'Monday 6:00 AM',
          'Wednesday 5:00 PM', 
          'Friday 6:00 AM'
        ]
      };
    } catch (error) {
      console.error('Report generation error:', error);
      throw error;
    }
  }

  async downloadReport(reportData: ReportData, imageData: any = null, language: string = 'hi'): Promise<void> {
    try {
      // Create downloadable content
      const content = this.generateReportText(reportData, language);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `FieldSense_Report_${reportData.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log('📥 Report downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }

  private generateReportText(reportData: ReportData, language: string): string {
    const header = language === 'hi' ? 'फील्डसेंस एआई फसल विश्लेषण रिपोर्ट' : 'FieldSense AI Crop Analysis Report';
    const separator = '='.repeat(50);
    
    return `${header}
${separator}
${language === 'hi' ? 'रिपोर्ट ID' : 'Report ID'}: ${reportData.id}
${language === 'hi' ? 'तिथि' : 'Date'}: ${reportData.timestamp}

${language === 'hi' ? 'किसान की जानकारी' : 'Farmer Information'}:
${language === 'hi' ? 'नाम' : 'Name'}: ${reportData.farmer.name}
${language === 'hi' ? 'किसान ID' : 'Farmer ID'}: ${reportData.farmer.farmerID}
${language === 'hi' ? 'फोन' : 'Phone'}: ${reportData.farmer.phone}

${language === 'hi' ? 'स्थान की जानकारी' : 'Location Information'}:
${language === 'hi' ? 'अक्षांश' : 'Latitude'}: ${reportData.location.lat}
${language === 'hi' ? 'देशांतर' : 'Longitude'}: ${reportData.location.long}
${language === 'hi' ? 'शहर' : 'City'}: ${reportData.location.city}
${language === 'hi' ? 'राज्य' : 'State'}: ${reportData.location.state}

${language === 'hi' ? 'विश्लेषण परिणाम' : 'Analysis Results'}:
${language === 'hi' ? 'फसल स्वास्थ्य' : 'Crop Health'}: ${reportData.cropHealth}/100
${language === 'hi' ? 'मिट्टी की नमी' : 'Soil Moisture'}: ${reportData.soilMoisture}%
${language === 'hi' ? 'उत्पादन पूर्वानुमान' : 'Yield Prediction'}: ${reportData.yieldPrediction} ${language === 'hi' ? 'टन/एकड़' : 'ton/acre'}

${language === 'hi' ? 'पोषक तत्व स्तर' : 'Nutrient Levels'}:
${language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}: ${reportData.npkLevels.n}%
${language === 'hi' ? 'फॉस्फोरस (P)' : 'Phosphorus (P)'}: ${reportData.npkLevels.p}%
${language === 'hi' ? 'पोटेशियम (K)' : 'Potassium (K)'}: ${reportData.npkLevels.k}%

${language === 'hi' ? 'सुझाव' : 'Recommendations'}:
${reportData.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

${language === 'hi' ? 'सिंचाई अनुसूची' : 'Irrigation Schedule'}:
${reportData.irrigationSchedule.map((schedule, i) => `${i + 1}. ${schedule}`).join('\n')}

${separator}
${language === 'hi' ? 'रिपोर्ट जनरेट की गई: फील्डसेंस एआई द्वारा' : 'Report Generated by: FieldSense AI'}`;
  }
}

export const reportService = new ReportService();
