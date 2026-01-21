
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 确定的路径：Edibujar 文件夹下的 pared.jpg
  const imageUrl = "Edibujar/pared.jpg";

  return (
    <div className="flex flex-col items-center justify-center w-full px-6">
      <div 
        className="relative aspect-[3/4] w-full max-w-[320px] cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className="relative w-full h-full transition-transform duration-500 shadow-2xl"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* 正面：纯文字 */}
          <div 
            className="absolute inset-0 bg-[#1e293b] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-8 h-1 bg-orange-500/40 rounded-full mb-6"></div>
            <h2 className="text-4xl font-black tracking-tighter text-white">PARED</h2>
            <p className="mt-6 text-[10px] opacity-30 font-bold tracking-[0.3em] uppercase">TAP TO FLIP</p>
          </div>

          {/* 背面：图片 */}
          <div 
            className="absolute inset-0 bg-[#0f172a] border-2 border-orange-500/50 rounded-[2.5rem] overflow-hidden flex items-center justify-center"
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
              <div className="text-center p-4">
                <p className="text-orange-400 text-xs font-bold uppercase">Image Not Found</p>
                <code className="text-[9px] block mt-2 opacity-40 font-mono">Edibujar/pared.jpg</code>
              </div>
            )}
            
            <div className="absolute bottom-4 inset-x-0 flex justify-center">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-orange-400 border border-white/5 uppercase tracking-widest">
                PARED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
