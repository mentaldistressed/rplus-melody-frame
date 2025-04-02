
import { useEffect, useRef } from 'react';

const AudioEqualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 300;
    canvas.height = 300;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    const barCount = 64;
    const barWidth = 4;
    const barMaxHeight = 80;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + barMaxHeight + 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw inner circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw equalizer bars
      for (let i = 0; i < barCount; i++) {
        const angle = (i * 2 * Math.PI) / barCount;
        
        // Random height for animation effect
        const height = Math.random() * barMaxHeight + 10;
        
        const startX = centerX + (radius - 5) * Math.cos(angle);
        const startY = centerY + (radius - 5) * Math.sin(angle);
        
        const endX = centerX + (radius + height) * Math.cos(angle);
        const endY = centerY + (radius + height) * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(0,0,0,0.6)';
        ctx.lineWidth = barWidth;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animation);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default AudioEqualizer;
