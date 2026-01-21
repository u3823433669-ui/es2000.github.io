
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 核心：直接引用根目录下的图片
  const imageUrl = "pared.jpg";

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 font-sans text-white overflow-hidden">
      <div className="max-w-sm w-full relative">
        <header className="text-center mb-8">
          <h1 className="text-lg font-black tracking-[0.4em] opacity-40 uppercase">Single Card Test</h1>
          <p className="text-[10px] text-orange-500 mt-2 font-bold tracking-widest">点击卡片翻转</p>
        </header>

        <div 
          className="relative aspect-[3/4] w-full perspective-2000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180 scale-105' : 'scale-100'}`}>
            
            {/* 正面：文字 */}
            <div className="absolute inset-0 backface-hidden bg-[#0f172a] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 shadow-2xl">
              <div className="w-10 h-1 bg-orange-500/40 rounded-full mb-10"></div>
              <h2 className="text-5xl font-black tracking-tighter text-center uppercase">
                PARED
              </h2>
              <p className="mt-8 text-xs opacity-30 font-bold tracking-widest">CLICK TO FLIP</p>
            </div>

            {/* 背面：图片 */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0f172a] border-2 border-orange-500/50 rounded-[2.5rem] overflow-hidden">
              {imgError ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white/20">
                   <p className="text-xs font-bold uppercase mb-2">图片未找到</p>
                   <p className="text-[10px] font-mono break-all">请确保根目录有 {imageUrl}</p>
                </div>
              ) : (
                <img 
                  src={imageUrl} 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  alt="pared"
                />
              )}
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-6">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-orange-500">PARED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default App;
