'use client';

import { useEffect, useRef, useState } from 'react';

interface FakeCameraFeedProps {
  fps: number;
}

const FakeCameraFeed: React.FC<FakeCameraFeedProps> = ({ fps }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(0);

  // 生成随机移动的对象
  const [movingObjects, setMovingObjects] = useState(() => {
    return Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.7)`,
    }));
  });

  // 更新移动对象位置
  useEffect(() => {
    const interval = setInterval(
      () => {
        setTime(prev => prev + 1);
        setMovingObjects(prev =>
          prev.map(obj => {
            let newX = obj.x + obj.speedX;
            let newY = obj.y + obj.speedY;

            // 边界检查和反弹
            if (newX <= 0 || newX >= 100) {
              obj.speedX *= -1;
              newX = Math.max(0, Math.min(100, newX));
            }
            if (newY <= 0 || newY >= 100) {
              obj.speedY *= -1;
              newY = Math.max(0, Math.min(100, newY));
            }

            return { ...obj, x: newX, y: newY };
          })
        );
      },
      1000 / Math.max(10, fps)
    ); // 确保至少有10FPS的更新频率，即使摄像头FPS更低

    return () => clearInterval(interval);
  }, [fps]);

  // 绘制视频帧
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 清除画布
    ctx.fillStyle = '#f3f4f6'; // 浅灰色背景
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 添加噪点
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 10 - 5;
      data[i] = Math.max(0, Math.min(255, data[i] + noise)); // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // B
    }
    ctx.putImageData(imageData, 0, 0);

    // 添加日期时间戳
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN');
    const timeStr = now.toLocaleTimeString('zh-CN');
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '10px monospace';
    ctx.fillText(`${dateStr} ${timeStr}`, 10, 20);

    // 绘制移动的对象
    movingObjects.forEach(obj => {
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(
        (obj.x / 100) * canvas.width,
        (obj.y / 100) * canvas.height,
        obj.size,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    // 添加扫描线效果
    const scanLineY = ((time % 100) / 100) * canvas.height;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, scanLineY, canvas.width, 2);

    // 添加边框
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [movingObjects, time]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* 添加摄像头效果叠加层 */}
      <div className="pointer-events-none absolute inset-0">
        {/* 左上角红点 */}
        <div className="absolute top-2 left-2 h-2 w-2 animate-pulse rounded-full bg-red-500"></div>

        {/* 网格线 */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default FakeCameraFeed;
