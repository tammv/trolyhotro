import React from 'react';
import { Volume2, VolumeX, Music, BarChart3, Sparkles } from 'lucide-react';

export default function Header({ 
  visitCount, 
  isMuted, 
  setIsMuted, 
  isMusicPlaying, 
  setIsMusicPlaying,
  onOpenDashboard,
  onGoHome
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b-2 border-slate-200/80 shadow-2xs">
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
              <h1 className="font-black text-slate-900 text-base sm:text-xl tracking-tight group-hover:text-blue-600 transition-colors">
                Trợ Lý Gỡ Rối
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-extrabold bg-blue-100 text-blue-700 rounded-lg border border-blue-200/80">
                StudyZen
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block font-medium">
              Đồng hành cùng học sinh vượt qua mọi khó khăn
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Visitor Counter Badge */}
          <div 
            title="Tổng số lượt truy cập đã hỗ trợ học sinh"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border-2 border-emerald-200 shadow-[0_2px_0_#a7f3d0]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{visitCount.toLocaleString('vi-VN')}</span>
            <span className="hidden sm:inline text-emerald-600">lượt xem</span>
          </div>

          {/* Desktop Tools (Ẩn trên mobile vì đã có Bottom Nav) */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Âm thanh click Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
              className={`p-2 rounded-xl border-2 btn-3d font-bold text-xs ${
                isMuted 
                  ? 'bg-slate-100 text-slate-400 border-slate-200 shadow-[0_3px_0_#cbd5e1]' 
                  : 'bg-blue-50 text-blue-600 border-blue-200 shadow-[0_3px_0_#bfdbfe]'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Nhạc nền Toggle */}
            <button
              onClick={() => setIsMusicPlaying(!isMusicPlaying)}
              title={isMusicPlaying ? "Tắt nhạc nền thư giãn" : "Bật nhạc nền thư giãn (Lo-fi/Calm)"}
              className={`p-2 rounded-xl border-2 btn-3d font-bold text-xs ${
                isMusicPlaying 
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-300 shadow-[0_3px_0_#c7d2fe]' 
                  : 'bg-slate-100 text-slate-400 border-slate-200 shadow-[0_3px_0_#cbd5e1]'
              }`}
            >
              <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
            </button>

            {/* Nút Thống Kê (Dashboard) */}
            <button
              onClick={onOpenDashboard}
              title="Thống kê dành cho thầy cô"
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-[0_3px_0_#e2e8f0] btn-3d cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </header>
  );
}
