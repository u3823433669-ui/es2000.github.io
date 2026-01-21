
import React, { useState, useEffect } from 'react';

// 根据你提供的截图，这些是根目录中确实存在的文件名
const WORD_LIST = [
  "alentar", "arana", "barba", "cantidad", "cartel", "cartelera", "comodo", "creido"
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentExt, setCurrentExt] = useState<'jpg' | 'png'>('jpg');

  const currentWord = WORD_LIST[currentIndex];

  // 这里的路径不再包含 "images/"，直接指向根目录
  const imageUrl = `${currentWord}.${currentExt}`;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setImgError(false);
    setIsLoading(false);
    setCurrentExt('jpg'); // 重置为默认后缀
    setCurrentIndex((prev) => (prev + 1) % WORD_LIST.length);
  };

  const toggleFlip = () => {
    if (!isFlipped) {
      setIsLoading(true);
      setImgError(false);
    }
    setIsFlipped(!isFlipped);
  };

  const onImageLoad = () => {
    setIsLoading(false);
    setImgError(false);
  };

  const onImageError = () => {
    // 如果 jpg 加载失败，尝试加载 png (因为你截图中有些单词同时有 jpg 和 png)
    if (currentExt === 'jpg') {
      setCurrentExt('png');
    } else {
      setIsLoading(false);
      setImgError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 font-sans text-white overflow-hidden">
      {/* 动态背景 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-sm w-full relative">
        <header className="text-center mb-8">
          <h1 className="text-lg font-black tracking-[0.4em] opacity-40 uppercase">Memory Cards</h1>
        </header>

        <div 
          className="relative aspect-[3/4] w-full perspective-2000 cursor-pointer"
          onClick={toggleFlip}
        >
          <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180 scale-105' : 'scale-100'}`}>
            
            {/* Front: Text */}
            <div className="absolute inset-0 backface-hidden bg-[#0f172a] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-8 shadow-2xl">
              <div className="w-10 h-1 bg-orange-500/40 rounded-full mb-10"></div>
              <h2 className="text-4xl font-black tracking-tighter text-center uppercase leading-none">
                {currentWord}
              </h2>
              <div className="mt-16 flex flex-col items-center opacity-30">
                <div className="w-8 h-8 border-2 border-dashed border-white rounded-full flex items-center justify-center animate-spin-slow">
                   <span className="text-[10px]">↻</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] mt-3 uppercase">Click to Reveal</span>
              </div>
            </div>

            {/* Back: Image */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0f172a] border-2 border-orange-500/50 rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_-15px_rgba(249,115,22,0.4)]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] z-10">
                  <div className="w-6 h-6 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {imgError ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white/20">
                   <p className="text-xs font-bold uppercase mb-2">图片未找到</p>
                   <p className="text-[10px] font-mono break-all">{imageUrl}</p>
                </div>
              ) : (
                <img 
                  src={imageUrl} 
                  className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'scale-110 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'}`}
                  onLoad={onImageLoad}
                  onError={onImageError}
                  alt={currentWord}
                />
              )}
              
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-center pb-6">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-orange-500">{currentWord}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5 font-mono text-xs text-white/40">
            {currentIndex + 1} / {WORD_LIST.length}
          </div>
          <button 
            onClick={handleNext}
            className="flex-1 bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs"
          >
            Next Card
          </button>
        </div>
      </div>

      <style>{`
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default App;
