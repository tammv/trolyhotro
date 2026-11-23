import React from 'react';
import { Sparkles, Volume2, VolumeX, Music, BarChart3, Sun, Moon } from 'lucide-react';

export default function MobileBottomNav({
  isMuted,
  setIsMuted,
  isMusicPlaying,
  setIsMusicPlaying,
  isDarkMode,
  toggleDarkMode,
  onOpenDashboard,
  onGoHome
}) {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-[#37464f] shadow-xl rounded-t-2xl px-2 py-1.5 flex items-center justify-around select-none transition-colors">
      
      {/* 1. Trang chủ / Bắt đầu */}
      <button
        onClick={onGoHome}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-600 dark:text-[#8fa5b1] hover:text-blue-500 active:scale-95 transition-transform"
      >
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-[10px] font-bold mt-0.5">Trang chủ</span>
      </button>

      {/* 2. Âm thanh click */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={`flex flex-col items-center justify-center p-2 rounded-xl active:scale-95 transition-transform ${
          isMuted ? 'text-slate-400 dark:text-slate-500' : 'text-blue-600 dark:text-[#1cb0f6] font-bold'
        }`}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        <span className="text-[10px] mt-0.5">{isMuted ? 'Tắt âm' : 'Âm thanh'}</span>
      </button>

      {/* 3. Nhạc nền thư giãn */}
      <button
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        className={`flex flex-col items-center justify-center p-2 rounded-xl active:scale-95 transition-transform ${
          isMusicPlaying ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-400 dark:text-slate-500'
        }`}
      >
        <Music className={`w-5 h-5 ${isMusicPlaying ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] mt-0.5">{isMusicPlaying ? 'Đang bật' : 'Nhạc lofi'}</span>
      </button>

      {/* 4. Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-600 dark:text-yellow-400 active:scale-95 transition-transform"
      >
        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        <span className="text-[10px] font-bold mt-0.5">{isDarkMode ? 'Bật sáng' : 'Chế độ tối'}</span>
      </button>

      {/* 5. Thống kê */}
      <button
        onClick={onOpenDashboard}
        className="flex flex-col items-center justify-center p-2 rounded-xl text-slate-500 dark:text-[#8fa5b1] hover:text-slate-900 active:scale-95 transition-transform"
      >
        <BarChart3 className="w-5 h-5" />
        <span className="text-[10px] font-bold mt-0.5">Thống kê</span>
      </button>

    </nav>
  );
}
