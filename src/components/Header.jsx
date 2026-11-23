import React from 'react';
import { Volume2, VolumeX, Music, BarChart3, Sparkles, Sun, Moon } from 'lucide-react';

export default function Header({ 
  visitCount, 
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
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#131f24]/90 backdrop-blur-md border-b-2 border-slate-200/80 dark:border-[#37464f] shadow-2xs transition-colors">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo kiểu Duolingo 3D */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_3px_0_#1e40af] group-active:translate-y-0.5 group-active:shadow-none transition-all">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-slate-900 dark:text-[#e6eef2] text-base sm:text-xl tracking-tight group-hover:text-blue-500 transition-colors">
                Trợ Lý Gỡ Rối
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-blue-100 dark:bg-[#12384a] text-blue-700 dark:text-[#1cb0f6] rounded-lg border border-blue-200/80 dark:border-[#1c7aa6]">
                StudyZen
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#8fa5b1] hidden md:block font-medium">
              Đồng hành cùng học sinh vượt qua mọi khó khăn
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Visitor Counter Badge */}
          <div 
            title="Tổng số lượt truy cập đã hỗ trợ học sinh"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-[#1f3a10] text-emerald-800 dark:text-[#7ddc2c] text-xs font-bold border-2 border-emerald-200 dark:border-[#58a700] shadow-[0_2px_0_#a7f3d0] dark:shadow-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{visitCount.toLocaleString('vi-VN')}</span>
            <span className="hidden sm:inline text-emerald-600 dark:text-[#7ddc2c]">lượt xem</span>
          </div>

          {/* Nút Dark Mode (Hiển thị cả desktop và mobile) */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? "Chuyển sang Chế độ Sáng" : "Chuyển sang Chế độ Tối (Dark Mode)"}
            className="p-2 rounded-xl border-2 btn-3d font-bold text-xs bg-white dark:bg-[#1c2b33] text-slate-700 dark:text-yellow-400 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#cbd5e1] dark:shadow-[0_3px_0_#243640] cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Desktop Tools (Ẩn trên mobile vì đã có Bottom Nav) */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Âm thanh click Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
              className={`p-2 rounded-xl border-2 btn-3d font-bold text-xs cursor-pointer ${
                isMuted 
                  ? 'bg-slate-100 dark:bg-[#1c2b33] text-slate-400 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#cbd5e1] dark:shadow-[0_3px_0_#243640]' 
                  : 'bg-blue-50 dark:bg-[#12384a] text-blue-600 dark:text-[#1cb0f6] border-blue-200 dark:border-[#1c7aa6] shadow-[0_3px_0_#bfdbfe] dark:shadow-none'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Nhạc nền Toggle */}
            <button
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              title={isMusicPlaying ? "Tắt nhạc nền thư giãn" : "Bật nhạc nền thư giãn (Lo-fi/Calm)"}
              className={`p-2 rounded-xl border-2 btn-3d font-bold text-xs cursor-pointer ${
                isMusicPlaying 
                  ? 'bg-indigo-50 dark:bg-[#1f2937] text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-600 shadow-[0_3px_0_#c7d2fe] dark:shadow-none' 
                  : 'bg-slate-100 dark:bg-[#1c2b33] text-slate-400 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#cbd5e1] dark:shadow-[0_3px_0_#243640]'
              }`}
            >
              <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
            </button>

            {/* Nút Thống Kê (Dashboard) */}
            <button
              onClick={onOpenDashboard}
              title="Thống kê dành cho thầy cô"
              className="p-2 rounded-xl bg-white dark:bg-[#1c2b33] text-slate-700 dark:text-[#e6eef2] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-[0_3px_0_#243640] btn-3d cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}
