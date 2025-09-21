import { MessageCircle, Sparkles, Mic, Send } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useChat } from '../../hooks/useChat';
import styles from '../../styles/KrishiMitraAI.module.scss';

const KrishiMitraAI = () => {
  const { language, t } = useLanguage();
  const { 
    chatMessages, 
    chatMessage, 
    setChatMessage, 
    isListening, 
    sendMessage, 
    toggleVoiceRecording 
  } = useChat();

  console.log('🤖 KrishiMitra rendering with language:', language);

  const handleSendMessage = () => {
    sendMessage(language);
  };

  const handleVoiceToggle = () => {
    toggleVoiceRecording(t.cropHealth);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.aiAvatar}>
          <Sparkles className={styles.sparkleIcon} />
        </div>
        <div className={styles.aiInfo}>
          <h2 className={styles.aiTitle}>{t.krishiMitra}</h2>
          <p className={styles.aiStatus}>{t.online} • {t.voiceAdvice}</p>
        </div>
        <button 
          className={`${styles.voiceBtn} ${isListening ? styles.listening : ''}`}
          onClick={handleVoiceToggle}
        >
          <Mic />
        </button>
      </div>

      <div className={styles.chatMessages}>
        {chatMessages.length === 0 ? (
          <div className={styles.welcomeMessage}>
            <div className={styles.welcomeIcon}>
              <MessageCircle />
            </div>
            <h3>{t.hello}</h3>
            <p>{t.askAnything}</p>
            <div className={styles.quickQuestions}>
              <button className={styles.quickQuestion} onClick={() => setChatMessage(t.cropHealth)}>
                "{t.cropHealth}"
              </button>
              <button className={styles.quickQuestion} onClick={() => setChatMessage(t.irrigationTime)}>
                "{t.irrigationTime}"
              </button>
              <button className={styles.quickQuestion} onClick={() => setChatMessage(t.weatherForecast)}>
                "{t.weatherForecast}"
              </button>
            </div>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
              <div className={styles.messageContent}>
                {message.text}
              </div>
              <div className={styles.messageTime}>{message.timestamp}</div>
            </div>
          ))
        )}
      </div>

      <div className={styles.chatInput}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeMessage}
            className={styles.messageInput}
          />
          <button onClick={handleSendMessage} className={styles.sendBtn} disabled={!chatMessage.trim()}>
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KrishiMitraAI;
