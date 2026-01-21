
import React, { useState } from 'react';

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  // 根据您的描述，图片位于 Edibujar 文件夹中
  const imageUrl = "Edibujar/pared.jpg";

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div className="max-w-sm w-full">
        <header className="text-center mb-10">
          <h1 className="text-xl font-bold tracking-[0.3em] opacity-60 uppercase text-white">FLASHCARD</h1>
          <p className="text-[10px] text-orange-500 mt-2 font-bold uppercase tracking-widest">点击卡片翻转</p>
        </header>

        <div 
          className="relative aspect-[3/4] w-full cursor-pointer"
          style={{ perspective: '2000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="relative w-full h-full transition-all duration-700"
               style={{ 
                 transformStyle: 'preserve-3d',
                 transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
               }}>
            
            {/* 正面：文字 */}
            <div className="absolute inset-0 bg-[#1e293b] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 shadow-2xl"
                 style={{ backfaceVisibility: 'hidden' }}>
              <div className="w-12 h-1 bg-orange-500/30 rounded-full mb-10"></div>
              <h2 className="text-5xl font-black tracking-tighter uppercase text-white">PARED</h2>
              <p className="mt-10 text-[10px] opacity-40 font-bold tracking-[0.3em] text-white">TAP TO SEE IMAGE</p>
            </div>

            {/* 背面：图片 */}
            <div className="absolute inset-0 bg-[#0f172a] border-2 border-orange-500/50 rounded-[2.5rem] overflow-hidden flex items-center justify-center"
                 style={{ 
                   backfaceVisibility: 'hidden',
                   transform: 'rotateY(180deg)'
                 }}>
              {imgError ? (
                <div className="text-center p-10">
                  <p className="text-orange-400 text-sm font-bold">图片读取失败</p>
                  <p className="text-[10px] mt-4 opacity-50 text-white">路径应为：</p>
                  <code className="text-[10px] bg-black/40 p-2 rounded mt-2 block font-mono text-gray-300">{imageUrl}</code>
                </div>
              ) : (
                <img 
                  src={imageUrl} 
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                  alt="pared"
                />
              )}
              <div className="absolute bottom-6 inset-x-0 text-center">
                 <span className="bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold tracking-widest text-orange-400 border border-white/10 uppercase">
                    PARED
                 </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
