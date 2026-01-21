
import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData;
  onFlip: (id: string) => void;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ card, onFlip, onDelete }) => {
  const renderContent = (type: 'text' | 'image', content: string) => {
    if (type === 'image') {
      return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center p-2">
          <img 
            src={content} 
            alt="Vocabulary visualization" 
            className="max-w-full max-h-full object-contain rounded-xl transition-opacity duration-700 opacity-0"
            onLoad={(e) => {
               (e.target as HTMLImageElement).classList.remove('opacity-0');
               (e.target as HTMLImageElement).classList.add('opacity-100');
            }}
            onError={(e) => {
               console.error("Image load failed for:", content);
               const parent = (e.target as HTMLElement).parentElement;
               if (parent) {
                  parent.innerHTML = `
                    <div class="text-rose-400 text-center p-4">
                      <p class="font-black text-sm uppercase">AI 图像加载失败</p>
                      <p class="text-[10px] mt-2 opacity-50">${card.frontContent}</p>
                    </div>`;
               }
            }}
          />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-white">
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-8"></div>
        <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 break-words leading-tight uppercase">
          {content}
        </p>
        <div className="mt-12 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black flex items-center gap-2 animate-bounce shadow-lg uppercase tracking-widest">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
          </svg>
          点击查看画面
        </div>
      </div>
    );
  };

  return (
    <div className="group relative w-full aspect-[3/4] perspective-1000">
      <div 
        className={`flip-card-inner relative w-full h-full preserve-3d cursor-pointer shadow-2xl rounded-[3rem] ${card.isFlipped ? 'flipped' : ''}`}
        onClick={() => onFlip(card.id)}
      >
        {/* Front Side (Text) */}
        <div className="absolute inset-0 backface-hidden border-[10px] border-slate-900 rounded-[3rem] overflow-hidden shadow-inner bg-white">
          {renderContent('text', card.frontContent)}
        </div>

        {/* Back Side (AI Image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 border-[10px] border-orange-500 bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl">
          {renderContent('image', card.backContent)}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <p className="text-[9px] text-white/70 font-black uppercase tracking-widest">{card.frontContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
