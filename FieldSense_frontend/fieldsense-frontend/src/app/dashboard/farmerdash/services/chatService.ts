class ChatService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  async sendMessage(message: string, language: string = 'hi'): Promise<string> {
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock AI responses
      const responses = language === 'hi' ? [
        "मैं आपके प्रश्न को समझ रहा हूं। कृपया थोड़ा इंतजार करें।",
        "आपकी फसल का स्वास्थ्य अच्छा दिख रहा है। नियमित सिंचाई और निगरानी जारी रखें।",
        "मौसम की जानकारी के अनुसार, अगले कुछ दिनों में हल्की बारिश की संभावना है।",
        "आपके खेत के लिए जैविक उर्वरक का उपयोग करने की सलाह दी जाती है।"
      ] : [
        "I understand your question. Please wait a moment.",
        "Your crop health looks good. Continue with regular irrigation and monitoring.",
        "According to weather information, light rain is expected in the next few days.",
        "Organic fertilizer is recommended for your field."
      ];

      return responses[Math.floor(Math.random() * responses.length)];
    } catch (error) {
      console.error('Chat service error:', error);
      return language === 'hi' 
        ? "क्षमा करें, कुछ त्रुटि हुई है। कृपया दोबारा कोशिश करें।"
        : "Sorry, there was an error. Please try again.";
    }
  }

  async processVoiceInput(audioBlob: Blob, language: string = 'hi'): Promise<string> {
    try {
      // In real app, this would process audio with speech-to-text service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return language === 'hi' 
        ? "मेरी फसल का स्वास्थ्य कैसा है?" 
        : "How is my crop health?";
    } catch (error) {
      console.error('Voice processing error:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
