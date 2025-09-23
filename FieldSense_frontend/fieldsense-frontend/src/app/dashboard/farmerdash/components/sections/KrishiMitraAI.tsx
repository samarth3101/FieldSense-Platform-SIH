"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Loader, Camera, Upload, X, ImageIcon, Leaf, MessageCircle, Sparkles, Mic } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  imageFile?: File;
  id: string;
}

interface KrishiMitraAIProps {
  language?: 'hi' | 'en';
}

const KrishiMitraAI: React.FC<KrishiMitraAIProps> = ({ language: propLanguage }) => {
  // Language selection state - now required before chatting
  const [language, setLanguage] = useState<'hindi' | 'english' | null>(null);
  const [showLanguageModal, setShowLanguageModal] = useState(true);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Control auto-scroll behavior
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Auto-set language from prop if available
  useEffect(() => {
    if (propLanguage && !language) {
      const langMap = { 'hi': 'hindi' as const, 'en': 'english' as const };
      const mappedLang = langMap[propLanguage];
      if (mappedLang) {
        handleLanguageSelect(mappedLang);
      }
    }
  }, [propLanguage, language]);

  // Translations
  const t = {
    krishiMitra: language === 'hindi' ? 'कृषि मित्र AI' : 'KrishiMitra AI',
    online: language === 'hindi' ? 'ऑनलाइन' : 'Online',
    voiceAdvice: language === 'hindi' ? 'आवाज़ सलाह' : 'Voice Advice',
    hello: language === 'hindi' ? 'नमस्ते!' : 'Hello!',
    askAnything: language === 'hindi' ? 'खेती से जुड़ा कोई भी सवाल पूछें' : 'Ask anything about farming',
    cropHealth: language === 'hindi' ? 'फसल की सेहत कैसी है?' : 'How is my crop health?',
    irrigationTime: language === 'hindi' ? 'सिंचाई का समय क्या है?' : 'When should I irrigate?',
    weatherForecast: language === 'hindi' ? 'मौसम का पूर्वानुमान' : 'Weather forecast',
    typeMessage: language === 'hindi' ? 'संदेश लिखें...' : 'Type your message...',
  };

  console.log('🤖 KrishiMitra rendering with language:', language);

  // Check if user has scrolled up from bottom
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setUserScrolledUp(!isAtBottom);
      setShouldAutoScroll(isAtBottom);
    }
  };

  // Controlled auto-scroll - only when user is at bottom
  useEffect(() => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, shouldAutoScroll]);

  // Set welcome message based on selected language
  const setWelcomeMessage = (selectedLang: 'hindi' | 'english') => {
    const welcomeMessages = {
      hindi: '🌾 नमस्ते! मैं KrishiMitra AI हूँ। खेती से जुड़े सवाल पूछें या फसल की फोटो भेजें!',
      english: '🌾 Hello! I am KrishiMitra AI. Ask farming questions or upload crop photos!'
    };

    setChatMessages([{
      role: 'assistant',
      content: welcomeMessages[selectedLang],
      timestamp: new Date(),
      id: '1'
    }]);
    setShouldAutoScroll(true);
  };

  // Language selection handler
  const handleLanguageSelect = (selectedLang: 'hindi' | 'english') => {
    setLanguage(selectedLang);
    setShowLanguageModal(false);
    setWelcomeMessage(selectedLang);
  };

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      fileInputRef.current?.click();
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context?.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          handleImageSelect(file);
          stopCamera();
        }
      }, 'image/jpeg');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  // Handle image selection
  const handleImageSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(language === 'hindi' ? 'कृपया image file select करें' : 'Please select an image file');
      return;
    }
    setSelectedImage(file);
    const preview = await fileToBase64(file);
    setImagePreview(preview);
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  // Voice recording toggle
  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
  };

  // Send message function
  const sendMessage = async () => {
    if (!chatMessage.trim() && !selectedImage) return;
    if (!language) return;

    setShouldAutoScroll(true);

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatMessage || (selectedImage ? (language === 'hindi' ? '📸 फसल की फोटो analysis करें' : '📸 Please analyze this crop image') : ''),
      timestamp: new Date(),
      imageFile: selectedImage || undefined,
      id: Date.now().toString()
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatMessage;
    const currentImage = selectedImage;
    
    setChatMessage('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    try {
      const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
      let model;
      
      for (const modelName of modelNames) {
        try {
          model = genAI.getGenerativeModel({ model: modelName });
          break;
        } catch (error) {
          continue;
        }
      }
      
      if (!model) throw new Error('Model not available');

      let parts: any[] = [];

      if (currentImage) {
        const imageBase64 = await fileToBase64(currentImage);
        const base64Data = imageBase64.split(',')[1];

        const prompt = language === 'hindi' 
          ? `आप एक farming expert हैं। इस crop image को देखकर Hindi में बताएं:

1. यह कौन सी फसल है?
2. फसल की सेहत कैसी है?
3. कोई बीमारी या कीड़े दिख रहे हैं?
4. क्या करना चाहिए?

केवल Hindi में जवाब दें:`
          : `You are a farming expert. Analyze this crop image and respond in English only:

1. What crop is this?
2. What's the health condition?
3. Any diseases or pests visible?
4. What should be done?

Respond only in English:`;

        parts = [
          { text: prompt },
          { inlineData: { mimeType: currentImage.type, data: base64Data } }
        ];
      } else {
        const prompt = language === 'hindi' 
          ? `आप एक farming expert हैं। केवल Hindi में जवाब दें:

सवाल: "${currentInput}"

Hindi में खेती की सलाह दें:`
          : `You are a farming expert. Respond only in English:

Question: "${currentInput}"

Provide farming advice in English:`;

        parts = [{ text: prompt }];
      }

      const result = await model.generateContent(parts);
      const response = await result.response;
      const text = response.text();

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: text || (language === 'hindi' ? 'माफ करें, मैं अभी जवाब नहीं दे पा रहा। फिर कोशिश करें।' : 'Sorry, I cannot respond right now. Please try again.'),
        timestamp: new Date(),
        id: Date.now().toString()
      }]);

    } catch (error) {
      console.error('Error:', error);
      
      let fallbackResponse = "";
      
      if (currentImage) {
        fallbackResponse = language === 'hindi' 
          ? "📸 फोटो देख रहा हूं...\n\n🌱 सामान्य सलाह:\n• पानी की जांच करें\n• पत्तियों का रंग देखें\n• कीड़े-मकोड़े चेक करें\n• नजदीकी कृषि केंद्र से सलाह लें"
          : "📸 Analyzing photo...\n\n🌱 General advice:\n• Check water levels\n• Examine leaf color\n• Look for pests\n• Consult local agriculture center";
      } else {
        const question = currentInput.toLowerCase();
        if (question.includes("गेहूं") || question.includes("wheat")) {
          fallbackResponse = language === 'hindi'
            ? "🌾 गेहूं की खेती:\n• अक्टूबर-नवंबर में बोएं\n• अच्छी मिट्टी चाहिए\n• 4-5 बार पानी दें\n• NPK खाद डालें"
            : "🌾 Wheat farming:\n• Sow in Oct-Nov\n• Need good soil\n• Water 4-5 times\n• Apply NPK fertilizer";
        } else if (question.includes("धान") || question.includes("rice")) {
          fallbackResponse = language === 'hindi'
            ? "🌾 धान की खेती:\n• पानी भरे खेत में लगाएं\n• 25 दिन पुराने पौधे लगाएं\n• यूरिया 3 बार डालें"
            : "🌾 Rice farming:\n• Plant in waterlogged fields\n• Use 25-day old seedlings\n• Apply urea 3 times";
        } else {
          fallbackResponse = language === 'hindi'
            ? "🌾 खेती की सलाह:\n• मिट्टी जांच कराएं\n• अच्छे बीज लें\n• मौसम देखकर काम करें\n• कृषि केंद्र से सलाह लें"
            : "🌾 Farming advice:\n• Test your soil\n• Use quality seeds\n• Check weather\n• Consult agriculture center";
        }
      }
      
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse + "\n\n(Demo response - API issue)",
        timestamp: new Date(),
        id: Date.now().toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  const handleVoiceToggle = () => {
    toggleVoiceRecording();
  };

  // Language Selection Modal
  if (showLanguageModal) {
    return (
      <div style={{
        height: '100vh',
        width: '100%',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        gap: '24px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌾</div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a', marginBottom: '8px' }}>
            KrishiMitra AI
          </h2>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Choose your preferred language / अपनी भाषा चुनें
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={() => handleLanguageSelect('hindi')}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            हिंदी
          </button>
          
          <button
            onClick={() => handleLanguageSelect('english')}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            English
          </button>
        </div>
      </div>
    );
  }

  // Camera Modal
  if (showCamera) {
    return (
      <div style={{
        height: '100vh',
        width: '100%',
        background: 'black',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '16px'
        }}>
          <button
            onClick={capturePhoto}
            style={{
              width: '64px',
              height: '64px',
              background: 'white',
              border: '4px solid #16a34a',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            📸
          </button>
          
          <button
            onClick={stopCamera}
            style={{
              width: '64px',
              height: '64px',
              background: '#ef4444',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'white',
              fontSize: '24px'
            }}
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #16a34a, #15803d)',
        color: 'white',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            margin: 0, 
            marginBottom: '2px' 
          }}>
            {t.krishiMitra}
          </h2>
          <p style={{ 
            fontSize: '12px', 
            opacity: 0.9, 
            margin: 0 
          }}>
            {t.online} • {t.voiceAdvice}
          </p>
        </div>
        <button 
          onClick={handleVoiceToggle}
          style={{
            background: isListening ? '#ef4444' : 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Mic size={16} />
        </button>
        <button
          onClick={() => {
            setShowLanguageModal(true);
            setChatMessages([]);
          }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          {language === 'hindi' ? 'भाषा बदलें' : 'Change Language'}
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          background: '#f9fafb'
        }}
      >
        {chatMessages.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#6b7280'
          }}>
            <div style={{ 
              fontSize: '48px', 
              marginBottom: '16px' 
            }}>
              <MessageCircle size={48} style={{ color: '#16a34a' }} />
            </div>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1f2937', 
              marginBottom: '8px' 
            }}>
              {t.hello}
            </h3>
            <p style={{ 
              fontSize: '14px', 
              marginBottom: '24px' 
            }}>
              {t.askAnything}
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              alignItems: 'center'
            }}>
              <button 
                onClick={() => setChatMessage(t.cropHealth)}
                style={{
                  padding: '8px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#374151'
                }}
              >
                "{t.cropHealth}"
              </button>
              <button 
                onClick={() => setChatMessage(t.irrigationTime)}
                style={{
                  padding: '8px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#374151'
                }}
              >
                "{t.irrigationTime}"
              </button>
              <button 
                onClick={() => setChatMessage(t.weatherForecast)}
                style={{
                  padding: '8px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '20px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#374151'
                }}
              >
                "{t.weatherForecast}"
              </button>
            </div>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div key={message.id} style={{
              marginBottom: '16px',
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: message.role === 'user' ? '#3b82f6' : 'white',
                color: message.role === 'user' ? 'white' : '#1f2937',
                fontSize: '14px',
                lineHeight: '1.5',
                whiteSpace: 'pre-line',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: message.role === 'assistant' ? '1px solid #e5e7eb' : 'none'
              }}>
                {/* Show image if present */}
                {message.imageFile && (
                  <div style={{ marginBottom: '8px' }}>
                    <img 
                      src={URL.createObjectURL(message.imageFile)} 
                      alt="Crop"
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
                
                <div>{message.content}</div>
                <div style={{
                  fontSize: '11px',
                  opacity: 0.7,
                  marginTop: '6px',
                  textAlign: 'right'
                }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '16px'
          }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              background: 'white',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Loader size={16} className="spin-animation" style={{ color: '#16a34a' }} />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {language === 'hindi' ? 'जवाब तैयार कर रहे हैं...' : 'Preparing response...'}
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {userScrolledUp && (
        <div style={{
          position: 'absolute',
          bottom: '100px',
          right: '20px',
          zIndex: 1000
        }}>
          <button
            onClick={() => {
              setShouldAutoScroll(true);
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              width: '36px',
              height: '36px',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            ⬇️
          </button>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div style={{
          padding: '12px 16px',
          background: '#f3f4f6',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img 
            src={imagePreview} 
            alt="Preview"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '2px solid #16a34a'
            }}
          />
          <div style={{ flex: 1, fontSize: '13px', color: '#6b7280' }}>
            {language === 'hindi' ? 'फोटो analysis के लिए तैयार है' : 'Photo ready for analysis'}
          </div>
          <button
            onClick={removeImage}
            style={{
              padding: '4px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '16px',
        background: 'white',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-end'
        }}>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeMessage}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              background: '#f9fafb'
            }}
            onFocus={(e) => e.target.style.borderColor = '#16a34a'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            disabled={isLoading}
          />
          
          {/* Camera Button */}
          <button
            onClick={startCamera}
            style={{
              width: '40px',
              height: '40px',
              background: '#16a34a',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            📷
          </button>
          
          {/* Gallery Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '40px',
              height: '40px',
              background: selectedImage ? '#16a34a' : '#6b7280',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}
          >
            📁
          </button>
          
          {/* Send Button */}
          <button 
            onClick={handleSendMessage} 
            disabled={!chatMessage.trim() && !selectedImage}
            style={{
              width: '40px',
              height: '40px',
              background: (chatMessage.trim() || selectedImage) ? '#16a34a' : '#d1d5db',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: (chatMessage.trim() || selectedImage) && !isLoading ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default KrishiMitraAI;