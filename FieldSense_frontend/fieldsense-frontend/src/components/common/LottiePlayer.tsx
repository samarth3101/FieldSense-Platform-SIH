"use client";

import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';

interface LottiePlayerProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
}

const LottiePlayer = ({ 
  animationPath, 
  className = '', 
  loop = true, 
  autoplay = true, 
  speed = 1,
  style 
}: LottiePlayerProps) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(animationPath);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load Lottie animation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, [animationPath]);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed, animationData]);

  if (isLoading) {
    return (
      <div className={`lottie-loader ${className}`} style={style}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
};

export default LottiePlayer;
