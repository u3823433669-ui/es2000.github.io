
import React, { useState, useEffect } from 'react';
import { CardData } from './types';
import Card from './components/Card';
import { generateAIImage } from './services/gemini';

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rawInput, setRawInput] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('');

  const ACCESS_CODE = "study2025"; 
  const DEFAULT_WORDS = ["Apple", "Cyberpunk", "Universe", "Dream", "Meditation"];

  // 初始化加载
  useEffect(() => {
    if (isLoggedIn) {
      const savedData = localStorage.getItem('my_vocab_data');
      if (savedData) {
        setCards(JSON.parse(savedData));
      } else {
        processWords(DEFAULT_WORDS);
      }
    }
  }, [isLoggedIn]);

  // 处理单词并生成/获取图片
  const processWords = async (wordList: string[]) => {
    setIsLoading(true);
    setCurrentIndex(0);
    const newCards: CardData[] = [];

    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i].trim();
      if (!word) continue;

      setLoadingStatus(`正在为 "${word}" 构思画面... (${i + 1}/${wordList.length})`);
      
      // 尝试调用 AI 生成图片，如果失败则使用占位图
      let imageUrl = await generateAIImage(`High quality artistic visualization of the word: ${word}, clean background, cinematic lighting, 4k`);
      
      if (!imageUrl) {
        imageUrl = `https://picsum.photos/seed/${encodeURIComponent(word)}/600/800`;
      }

      newCards.push({
        id: `card-${Date.now()}-${i}`,
        frontType: 'text',
        frontContent: word,
        backType: 'image',
        backContent: imageUrl,
        isFlipped: false,
      });
    }

    setCards(newCards);
    localStorage.setItem('my_vocab_data', JSON.stringify(newCards));
    setIsLoading(false);
    setLoadingStatus('');
  };

  const handleBulkImport = () => {
    const words = rawInput.split(/[\n,，\s]+/).filter(w => w.trim() !== '');
    if (words.length > 0) {
      processWords(words);
      setShowAdmin(false);
      setRawInput('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ACCESS_CODE) {
      setIsLoggedIn(true);
    } else {
      setLoginError(true);
      setPasscode('');
    }
  };

  const handleFlip = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: !c.isFlipped } : c));
  };

  // 登录界面
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 font-sans">
        <div className="w-full max-w-sm bg-slate-900/40 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-2xl text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">V-Vocab 视觉词库</h2>
          <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest font-bold">解锁你的视觉记忆</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={passcode} 
              onChange={(e) => {setPasscode(e.target.value); setLoginError(false);}}
              className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-4 text-center text-2xl tracking-[0.5em] text-white focus:border-orange-500 outline-none transition-all mb-4"
              placeholder="••••"
            />
            {loginError && <p className="text-rose-500 text-[10px] mb-4 font-bold uppercase">密码验证失败</p>}
            <button className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-500 hover:text-white active:scale-95 transition-all shadow-lg">进入实验室</button>
          </form>
          <p className="mt-8 text-[10px] text-slate-600 font-medium">PASSWORD: study2025</p>
        </div>
      </div>
    );
  }

  // 加载动画
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-10 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-white font-black text-xl mb-4">AI 正在生成视觉记忆...</h2>
        <p className="text-slate-400 text-sm max-w-xs leading-relaxed">{loadingStatus}</p>
      </div>
    );
  }

  // 主界面
  return (
    <div className="max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col font-sans">
      {/* 头部导航 */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-white font-black text-2xl tracking-tighter">V-VOCAB</h1>
          <div className="h-1 w-8 bg-orange-500 rounded-full mt-1"></div>
        </div>
        <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border border-white/5 text-orange-400 font-mono text-sm font-bold shadow-xl">
          {cards.length > 0 ? currentIndex + 1 : 0} <span className="text-slate-600 mx-1">/</span> {cards.length}
        </div>
      </div>

      {/* 卡片区域 */}
      <div className="flex-1 flex flex-col">
        {cards.length > 0 ? (
          <Card card={cards[currentIndex]} onFlip={handleFlip} onDelete={() => {}} />
        ) : (
          <div className="flex-1 flex items-center justify-center border-4 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-slate-600 font-bold">暂无单词，请点击下方导入</p>
          </div>
        )}
        
        {/* 控制按钮 */}
        <div className="grid grid-cols-4 gap-4 mt-10">
          <button 
            onClick={() => setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length)}
            disabled={cards.length <= 1}
            className="col-span-1 bg-slate-900 h-20 rounded-[2rem] flex items-center justify-center border border-white/5 active:scale-90 transition-all text-white hover:bg-slate-800 disabled:opacity-30 shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => setCurrentIndex(prev => (prev + 1) % cards.length)}
            disabled={cards.length <= 1}
            className="col-span-3 bg-white h-20 rounded-[2rem] flex items-center justify-center gap-3 font-black text-black active:scale-95 transition-all text-xl hover:bg-orange-500 hover:text-white shadow-xl disabled:opacity-30"
          >
            <span>下一张卡片</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>

        {/* 管理区域 */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col gap-4">
          <button 
            onClick={() => setShowAdmin(!showAdmin)}
            className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-orange-400 uppercase tracking-widest text-left transition-colors"
          >
            <span className={`transition-transform duration-300 ${showAdmin ? 'rotate-180' : ''}`}>▼</span>
            {showAdmin ? '隐藏管理面板' : '批量导入新单词'}
          </button>

          {showAdmin && (
            <div className="bg-slate-900 p-6 rounded-[2rem] border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-300">
              <label className="block text-white text-[10px] font-bold mb-3 uppercase tracking-tighter opacity-50">输入单词（用空格、逗号或回车分隔）</label>
              <textarea 
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="例如: Apple, Banana, Sunshine..."
                className="w-full h-32 bg-black/50 border border-white/5 rounded-2xl p-4 text-white text-sm focus:border-orange-500 outline-none mb-4 transition-all"
              />
              <button 
                onClick={handleBulkImport}
                className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl hover:bg-orange-500 transition-all shadow-lg active:scale-95"
              >
                生成 AI 视觉卡片
              </button>
              <p className="mt-4 text-[9px] text-slate-500 leading-relaxed">提示：AI 生成需要时间，建议一次导入不超过 10 个单词以获得最佳体验。</p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-auto pt-10 text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em]">
        Visual Vocabulary Lab &copy; 2025
      </footer>
    </div>
  );
};

export default App;
