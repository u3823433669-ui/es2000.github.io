
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 图片路径：Edibujar 文件夹下的 pared.jpg
  const imageUrl = "Edibujar/pared.jpg";

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto">
      <div 
        className="relative aspect-[3/4] w-full cursor-pointer"
        style={{ perspective: '2000px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-transform duration-500"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* 正面：文字 */}
          <div 
            className="absolute inset-0 bg-slate-800 border border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-8 shadow-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-10 h-1 bg-orange-500/50 rounded-full mb-8"></div>
            <h2 className="text-5xl font-black tracking-tighter text-white">PARED</h2>
            <p className="mt-6 text-[10px] opacity-40 font-bold tracking-widest text-white uppercase">点击翻看图片</p>
          </div>

          {/* 背面：图片 */}
          <div 
            className="absolute inset-0 bg-slate-900 border-2 border-orange-500 rounded-[2rem] overflow-hidden flex items-center justify-center"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {!imgError ? (
              <img 
                src={imageUrl} 
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
                alt="pared"
              />
            ) : (
              <div className="text-center p-6">
                <p className="text-orange-400 text-sm font-bold">无法读取图片</p>
                <p className="text-[10px] mt-2 opacity-50">请检查路径:</p>
                <code className="text-[10px] block mt-1 opacity-80">{imageUrl}</code>
              </div>
            )}
            <div className="absolute bottom-4 inset-x-0 text-center">
               <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-orange-400 border border-white/10 uppercase">
                  PARED
               </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-[10px] opacity-20 font-bold tracking-[0.4em] uppercase">Flashcard UI v1.0</p>
    </div>
  );
};

export default App;
