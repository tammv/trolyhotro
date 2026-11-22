import React from 'react';
import { Volume2, VolumeX, Music, BarChart3, User, Sparkles } from 'lucide-react';

export default function Header({ 
  visitCount, 
  isMuted, 
  setIsMuted, 
  isMusicPlaying, 
  setIsMusicPlaying,
  studentInfo,
  onOpenStudentModal,
  onOpenDashboard,
  onGoHome
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight group-hover:text-blue-600 transition-colors">
                Trợ Lý Gỡ Rối
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
                StudyZen
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Đồng hành cùng học sinh vượt qua mọi khó khăn
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Visitor Counter Badge */}
          <div 
            title="Tổng số lượt truy cập đã hỗ trợ học sinh"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{visitCount.toLocaleString('vi-VN')}</span>
            <span className="hidden sm:inline text-emerald-600/90">lượt xem</span>
          </div>

          {/* Âm thanh click Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
            className={`p-2 rounded-xl border transition-all duration-150 ${
              isMuted 
                ? 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200' 
                : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Nhạc nền Toggle */}
          <button
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            title={isMusicPlaying ? "Tắt nhạc nền thư giãn" : "Bật nhạc nền thư giãn (Lo-fi/Calm)"}
            className={`p-2 rounded-xl border transition-all duration-150 ${
              isMusicPlaying 
                ? 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 ring-2 ring-indigo-400/30' 
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Music className={`w-4 h-4 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
          </button>

          {/* Nút thông tin học sinh */}
          <button
            onClick={onOpenStudentModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-200 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span className="max-w-[80px] sm:max-w-[120px] truncate">
              {studentInfo ? studentInfo.name : 'Nhập thông tin'}
            </span>
          </button>

          {/* Nút Thống Kê (Dashboard) */}
          <button
            onClick={onOpenDashboard}
            title="Thống kê dành cho thầy cô"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
