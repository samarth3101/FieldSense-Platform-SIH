import { useState, useCallback, useEffect } from 'react';
import { translations } from '../utils/translations';
import { Language } from '../types';

// Global language state to force ALL components to re-render
let globalLanguage: Language = 'hi';
let languageChangeListeners: Array<() => void> = [];

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(globalLanguage);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const [, forceUpdate] = useState(0);

  // Subscribe to global language changes
  useEffect(() => {
    const listener = () => {
      setLanguage(globalLanguage);
      forceUpdate(prev => prev + 1);
    };
    languageChangeListeners.push(listener);
    
    return () => {
      const index = languageChangeListeners.indexOf(listener);
      if (index > -1) {
        languageChangeListeners.splice(index, 1);
      }
    };
  }, []);

  const handleLanguageChange = useCallback((newLang: string) => {
    if (newLang === globalLanguage) return;
    
    console.log('🔄 CHANGING LANGUAGE FROM', globalLanguage, 'TO', newLang);
    setIsLanguageChanging(true);
    
    setTimeout(() => {
      globalLanguage = newLang as Language;
      setLanguage(globalLanguage);
      
      // Notify ALL components using this hook
      languageChangeListeners.forEach(listener => listener());
      
      setTimeout(() => {
        setIsLanguageChanging(false);
      }, 300);
    }, 300);
  }, []);

  const t = translations[language];

  return {
    language,
    isLanguageChanging,
    handleLanguageChange,
    t
  };
};
