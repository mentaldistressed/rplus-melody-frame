
import { useEffect, useRef } from 'react';

// Компонент с более профессиональной анимацией
const AudioEqualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Адаптируем размер canvas к контейнеру
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = 300;
        canvas.height = 300;
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Радиусы для анимации
    const minDimension = Math.min(canvas.width, canvas.height);
    const outerRadius = minDimension * 0.45;
    const innerRadius = outerRadius * 0.7;
    
    // Анимационный цикл
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Создаем более тонкую и строгую графику
      
      // Внешний круг - слабо заметный
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Средний круг - тонкая линия
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius * 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Внутренний круг - граница для логотипа
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 0.25;
      ctx.stroke();
      
      // Лучи от центра - более сдержанные
      const rayCount = 18;
      const time = Date.now() * 0.0005;
      
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const rotation = time % (Math.PI * 2);
        
        const currentAngle = angle + rotation;
        
        // Внешние точки
        const outerX = centerX + Math.cos(currentAngle) * outerRadius;
        const outerY = centerY + Math.sin(currentAngle) * outerRadius;
        
        // Внутренние точки
        const innerX = centerX + Math.cos(currentAngle) * innerRadius;
        const innerY = centerY + Math.sin(currentAngle) * innerRadius;
        
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.strokeStyle = `rgba(0, 0, 0, ${0.03 + Math.sin(time + i) * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Мягкая черта для разделения логотипа и фона
      const clearGradient = ctx.createRadialGradient(
        centerX, centerY, innerRadius * 0.9,
        centerX, centerY, innerRadius
      );
      clearGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      clearGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
      ctx.fillStyle = clearGradient;
      ctx.fill();
      
      requestAnimationFrame(animate);
    };
    
    const animation = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animation);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute"
    />
  );
};

export default AudioEqualizer;
