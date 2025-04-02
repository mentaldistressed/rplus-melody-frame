
import { useEffect, useRef } from 'react';

// Компонент, который создает анимацию вокруг логотипа
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
    const outerRadius = 120; // Радиус внешней анимации
    const particleCount = 60; // Количество частиц для анимации
    
    // Массив частиц для создания эффекта обтекания
    const particles: {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
      index: number; // Добавляем индекс для каждой частицы
    }[] = [];
    
    // Создаем частицы
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: outerRadius + Math.random() * 20 - 10,
        speed: 0.002 + Math.random() * 0.002,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4,
        color: `rgba(0, 0, 0, ${0.2 + Math.random() * 0.3})`,
        index: i // Сохраняем индекс частицы
      });
    }
    
    // Анимационный цикл
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем внешний круг
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius + 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Рисуем еще один круг для эффекта
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Рисуем частицы, обтекающие логотип
      particles.forEach((particle, index) => {
        // Обновляем угол (движение)
        particle.angle += particle.speed;
        
        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius;
        
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Добавляем линии между некоторыми частицами для связанного эффекта
        if (index % 3 === 0) {
          const nextParticle = particles[(index + 5) % particles.length];
          const nextX = centerX + Math.cos(nextParticle.angle) * nextParticle.radius;
          const nextY = centerY + Math.sin(nextParticle.angle) * nextParticle.radius;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.strokeStyle = `rgba(0, 0, 0, 0.05)`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
      
      // Очищаем центральную область для логотипа
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius - 40, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Прозрачный цвет для логотипа
      ctx.fill();
      
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
      className="w-full h-full absolute"
    />
  );
};

export default AudioEqualizer;
