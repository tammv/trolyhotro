import React from 'react';
import { Sparkles, Volume2, VolumeX, Music, BarChart3 } from 'lucide-react';

export default function MobileBottomNav({
  isMuted,
  setIsMuted,
  isMusicPlaying,
  setIsMusicPlaying,
  onOpenDashboard,
  onGoHome
}) {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-slate-200 shadow-xl rounded-t-2xl px-4 py-2 flex items-center justify-around select-none">
      
      {/* 1. Trang chủ / Bắt đầu */}
      <button
        onClick={onGoHome}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-600 hover:text-blue-600 active:scale-95 transition-transform"
      >
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-[10px] font-bold mt-0.5">Trang chủ</span>
      </button>

      {/* 2. Âm thanh click */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`flex flex-col items-center justify-center p-2 rounded-xl active:scale-95 transition-transform ${
          isMuted ? 'text-slate-400' : 'text-blue-600 font-bold'
        }`}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        <span className="text-[10px] mt-0.5">{isMuted ? 'Tắt âm' : 'Âm thanh'}</span>
      </button>

      {/* 3. Nhạc nền thư giãn */}
      <button
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className={`flex flex-col items-center justify-center p-2 rounded-xl active:scale-95 transition-transform ${
          isMusicPlaying ? 'text-indigo-600 font-bold' : 'text-slate-400'
        }`}
      >
        <Music className={`w-5 h-5 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] mt-0.5">{isMusicPlaying ? 'Đang bật' : 'Nhạc lofi'}</span>
      </button>

      {/* 4. Thống kê */}
      <button
        onClick={onOpenDashboard}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 active:scale-95 transition-transform"
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">Thống kê</span>
      </button>

    </nav>
  );
}
