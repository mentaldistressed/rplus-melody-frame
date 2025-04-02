
import { useEffect, useRef } from 'react';

// Компонент, который создает анимацию вокруг логотипа/изображения
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
    
    // Вызываем сразу и добавляем слушатель изменения размера окна
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Определяем радиус на основе размеров canvas
    const minDimension = Math.min(canvas.width, canvas.height);
    const outerRadius = minDimension * 0.4; // 40% от минимального размера
    const innerRadius = outerRadius * 0.6; // Внутренний радиус для логотипа
    
    const particleCount = 80; // Увеличиваем количество частиц
    
    // Массив частиц для создания эффекта обтекания
    const particles: {
      angle: number;
      radius: number;
      baseRadius: number;
      speed: number;
      size: number;
      opacity: number;
      color: string;
      index: number;
    }[] = [];
    
    // Создаем частицы с более интересными параметрами
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const baseRadius = outerRadius + Math.random() * (outerRadius * 0.2);
      
      particles.push({
        angle,
        baseRadius,
        radius: baseRadius,
        speed: 0.001 + Math.random() * 0.003, // Разнообразные скорости
        size: 1 + Math.random() * 4, // Разные размеры частиц
        opacity: 0.3 + Math.random() * 0.5,
        color: `rgba(0, 0, 0, ${0.15 + Math.random() * 0.3})`,
        index: i
      });
    }
    
    // Анимационный цикл с более красивыми эффектами
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем внешние круги с градиентом
      const gradient = ctx.createRadialGradient(
        centerX, centerY, innerRadius,
        centerX, centerY, outerRadius * 1.2
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.7, 'rgba(240, 240, 240, 0.03)');
      gradient.addColorStop(1, 'rgba(230, 230, 230, 0.05)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Время для волновых эффектов
      const time = Date.now() * 0.001;
      
      // Рисуем частицы с волновым эффектом
      particles.forEach((particle, index) => {
        // Обновляем угол
        particle.angle += particle.speed;
        
        // Добавляем волновой эффект к радиусу
        const waveAmplitude = outerRadius * 0.05;
        const waveFrequency = 3;
        const wave = Math.sin(time + index * 0.2) * waveAmplitude;
        particle.radius = particle.baseRadius + wave;
        
        const x = centerX + Math.cos(particle.angle) * particle.radius;
        const y = centerY + Math.sin(particle.angle) * particle.radius;
        
        // Пульсация размера частиц
        const sizeVariation = Math.sin(time * 2 + index) * 0.5 + 1;
        const currentSize = particle.size * sizeVariation;
        
        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Добавляем линии между некоторыми частицами для создания паутины
        if (index % 2 === 0) {
          // Находим ближайшие частицы
          let nextIndex1 = (index + 5) % particles.length;
          let nextIndex2 = (index + 11) % particles.length;
          
          const nextParticle1 = particles[nextIndex1];
          const nextParticle2 = particles[nextIndex2];
          
          const nextX1 = centerX + Math.cos(nextParticle1.angle) * nextParticle1.radius;
          const nextY1 = centerY + Math.sin(nextParticle1.angle) * nextParticle1.radius;
          
          const nextX2 = centerX + Math.cos(nextParticle2.angle) * nextParticle2.radius;
          const nextY2 = centerY + Math.sin(nextParticle2.angle) * nextParticle2.radius;
          
          // Рисуем линии с градиентом прозрачности
          const dist1 = Math.sqrt(Math.pow(x - nextX1, 2) + Math.pow(y - nextY1, 2));
          const maxDist = outerRadius;
          
          if (dist1 < maxDist) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX1, nextY1);
            const opacity = 0.05 * (1 - dist1 / maxDist);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          
          const dist2 = Math.sqrt(Math.pow(x - nextX2, 2) + Math.pow(y - nextY2, 2));
          if (dist2 < maxDist) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX2, nextY2);
            const opacity = 0.05 * (1 - dist2 / maxDist);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      // Очищаем центральную область для логотипа с мягким краем
      const clearGradient = ctx.createRadialGradient(
        centerX, centerY, innerRadius * 0.85,
        centerX, centerY, innerRadius
      );
      clearGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
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
