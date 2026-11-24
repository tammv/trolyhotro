import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Heart, Play, RotateCcw } from 'lucide-react';
import { soundFx } from '../lib/sound';
import confetti from 'canvas-confetti';

export default function BreathingModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [phase, setPhase] = useState('ready'); // 'ready' | 'inhale' | 'hold' | 'exhale' | 'done'
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      const elapsed = 60 - secondsLeft;
      const cyclePos = elapsed % 12; // Chu kỳ 12s: 4s hít, 2s giữ, 6s thở

      if (cyclePos < 4) {
        setPhase('inhale');
      } else if (cyclePos < 6) {
        setPhase('hold');
      } else {
        setPhase('exhale');
      }

      timerRef.current = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setPhase('done');
      setIsActive(false);
      soundFx.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, secondsLeft]);

  const handleStart = () => {
    soundFx.playChime();
    setSecondsLeft(60);
    setIsActive(true);
    setPhase('inhale');
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsActive(false);
    setSecondsLeft(60);
    setPhase('ready');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1c2b33] w-full max-w-md rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-[#37464f] p-6 sm:p-8 text-center space-y-6 my-auto transition-colors">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-50 dark:bg-[#12384a] text-teal-700 dark:text-[#1cb0f6] text-xs font-black border border-teal-200 dark:border-[#1c7aa6]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hạ nhiệt 60 giây</span>
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#243640] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tiêu đề */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-slate-900 dark:text-[#e6eef2] tracking-tight">
            Thả lỏng vai và thở chậm cùng nhau
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa5b1] font-medium">
            Không cần vội giải bài ngay. Dành đúng 1 phút để nhịp tim và tâm trí dịu lại nhé.
          </p>
        </div>

        {/* Vòng tròn Visual hít thở chuyển động mượt mà */}
        <div className="py-4 flex flex-col items-center justify-center min-h-[190px]">
          <div
            className={`w-36 h-36 rounded-full border-4 border-white dark:border-[#37464f] flex flex-col items-center justify-center transition-all duration-1000 select-none ${
              phase === 'inhale'
                ? 'scale-125 bg-gradient-to-tr from-teal-200 via-blue-200 to-indigo-200 dark:from-teal-900/60 dark:to-blue-900/60 shadow-[0_0_35px_rgba(59,130,246,0.35)]'
                : phase === 'hold'
                ? 'scale-125 bg-gradient-to-tr from-purple-200 via-indigo-200 to-blue-200 dark:from-purple-900/60 dark:to-indigo-900/60 shadow-[0_0_45px_rgba(139,92,246,0.4)]'
                : phase === 'exhale'
                ? 'scale-95 bg-gradient-to-tr from-emerald-200 via-teal-200 to-blue-100 dark:from-emerald-900/60 dark:to-teal-900/60 shadow-[0_0_20px_rgba(22,163,74,0.25)]'
                : phase === 'done'
                ? 'scale-110 bg-emerald-100 dark:bg-emerald-950/60 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'scale-100 bg-slate-100 dark:bg-[#243640] shadow-sm'
            }`}
          >
            <span className="text-base font-black text-slate-800 dark:text-[#e6eef2]">
              {phase === 'inhale' && 'Hít vào nhẹ...'}
              {phase === 'hold' && 'Giữ êm...'}
              {phase === 'exhale' && 'Thở ra chậm...'}
              {phase === 'done' && 'Nhẹ nhõm rồi 🌿'}
              {phase === 'ready' && 'Sẵn sàng'}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-[#8fa5b1] mt-1">
              {phase === 'done' ? 'Hoàn thành' : `${secondsLeft} giây`}
            </span>
          </div>
        </div>

        {/* Lời nhắc nhủ vỗ về */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] italic font-medium px-4">
          {phase === 'done'
            ? '“Bạn vừa làm rất tốt! Giờ đây đầu óc đã sáng rõ hơn để cùng gỡ rối từng bước.”'
            : '“Mọi nút thắt đều trở nên dễ tháo gỡ hơn khi bạn đang ở trạng thái bình tĩnh.”'}
        </p>

        {/* Các nút điều khiển */}
        <div className="flex items-center justify-center gap-3 pt-1">
          {!isActive && phase !== 'done' && (
            <button
              onClick={handleStart}
              className="px-8 py-3.5 rounded-2xl bg-teal-600 hover:brightness-105 active:translate-y-0.5 text-white text-sm font-black shadow-[0_4px_0_#0f766e] border-2 border-teal-600 transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt đầu 60 giây thở đều</span>
            </button>
          )}

          {isActive && (
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-2xl bg-white dark:bg-[#243640] text-slate-600 dark:text-[#e6eef2] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_2px_0_#cbd5e1] dark:shadow-none text-xs font-bold transition-all cursor-pointer btn-3d"
            >
              Dừng lại & Đặt lại
            </button>
          )}

          {phase === 'done' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleStart}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-white dark:bg-[#243640] text-slate-700 dark:text-[#e6eef2] border-2 border-slate-200 dark:border-[#37464f] text-xs font-black shadow-[0_3px_0_#cbd5e1] dark:shadow-none flex items-center justify-center gap-1.5 cursor-pointer btn-3d"
              >
                <RotateCcw className="w-4 h-4 text-teal-600" />
                <span>Thở thêm 1 lần</span>
              </button>

              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-emerald-600 hover:brightness-105 text-white text-xs font-black shadow-[0_4px_0_#059669] border-2 border-emerald-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-3d"
              >
                <Heart className="w-4 h-4 text-pink-200" />
                <span>Đã ổn, bắt đầu gỡ rối</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}