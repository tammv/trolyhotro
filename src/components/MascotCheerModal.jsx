import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, Heart, CheckCircle2 } from 'lucide-react';
import StudyZenMascot from './StudyZenMascot';
import { mascotVoice } from '../lib/ttsVoice';
import { soundFx } from '../lib/sound';
import confetti from 'canvas-confetti';

export default function MascotCheerModal({
  isOpen,
  title = "Tuyệt vời lắm bạn ơi! 🎉",
  message = "Bạn đã xác định đúng mấu chốt quan trọng nhất rồi. Bình tĩnh đi tiếp bước sau cùng mình nhé!",
  buttonText = "Đi tiếp cùng mình nào ✨",
  isLastStep = false,
  onContinue
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      soundFx.playSuccess();
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Phát giọng nói tiếng Việt hào hứng của mascot StudyZen
      setIsSpeaking(true);
      mascotVoice.speak(message, () => {
        setIsSpeaking(false);
      });
    } else {
      mascotVoice.stop();
      setIsSpeaking(false);
    }

    return () => {
      mascotVoice.stop();
    };
  }, [isOpen, message]);

  const handleReplayVoice = () => {
    soundFx.playChime();
    setIsSpeaking(true);
    mascotVoice.speak(message, () => {
      setIsSpeaking(false);
    });
  };

  const handleContinue = () => {
    mascotVoice.stop();
    soundFx.playChime();
    if (onContinue) onContinue();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-white via-blue-50/40 to-indigo-50/40 dark:from-[#1c2b33] dark:via-[#1e303c] dark:to-[#172630] rounded-3xl sm:rounded-4xl border-3 border-blue-400 dark:border-[#1cb0f6] shadow-[0_12px_40px_rgba(37,99,235,0.25)] p-6 sm:p-10 text-center space-y-6 my-auto animate-in zoom-in-95 duration-250 transition-colors">
        
        {/* Hào quang lấp lánh trên đầu */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-blue-500/20 blur-xl"></div>
        </div>

        {/* Tag trạng thái */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-[#12384a] text-blue-700 dark:text-[#1cb0f6] text-xs font-black border border-blue-200 dark:border-[#1c7aa6] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
          <span>{isLastStep ? 'Đã tìm thấy chìa khóa!' : 'Đồng hành cùng StudyZen'}</span>
        </div>

        {/* LINH VẬT STUDY ZEN NHẢY MÚA HÀO HỨNG */}
        <div className="flex flex-col items-center justify-center relative">
          <StudyZenMascot 
            className="w-32 h-32 sm:w-44 sm:h-44 drop-shadow-2xl" 
            variant={isSpeaking ? 'talking' : isLastStep ? 'celebrating' : 'cheering'} 
            animated={true}
          />

          {/* Vòng sóng âm thanh khi đang nói */}
          {isSpeaking && (
            <div className="absolute -bottom-2 flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-black shadow-md animate-pulse">
              <Volume2 className="w-3.5 h-3.5" />
              <span>StudyZen đang cổ vũ bạn...</span>
            </div>
          )}
        </div>

        {/* BÓNG THOẠI TRÀN VIỀN PHONG CÁCH CARTOON DUOLINGO */}
        <div className="relative bg-white dark:bg-[#243640] rounded-3xl p-5 sm:p-6 border-2 border-blue-200 dark:border-[#37464f] shadow-[0_5px_0_#93c5fd] dark:shadow-none text-left space-y-2">
          
          {/* Mũi nhọn bóng thoại trỏ lên linh vật */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white dark:bg-[#243640] border-t-2 border-l-2 border-blue-200 dark:border-[#37464f] rotate-45"></div>

          <div className="flex items-center justify-between gap-2">
            <h4 className="text-base sm:text-xl font-black text-slate-900 dark:text-[#e6eef2] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{title}</span>
            </h4>

            {/* Nút nghe lại giọng nói */}
            <button
              onClick={handleReplayVoice}
              title="Nghe lại lời nhắn"
              className="p-2 rounded-xl bg-blue-50 dark:bg-[#12384a] text-blue-600 dark:text-[#1cb0f6] hover:bg-blue-100 border border-blue-200 dark:border-[#1c7aa6] transition-all cursor-pointer shrink-0"
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-[#d1e1ea] font-bold leading-relaxed pt-1">
            "{message}"
          </p>
        </div>

        {/* NÚT TO 3D RỰC RỠ 'ĐI TIẾP CÙNG MÌNH NÀO' */}
        <div className="pt-2">
          <button
            onClick={handleContinue}
            className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-105 active:translate-y-1 text-white text-base sm:text-lg font-black shadow-[0_6px_0_#1e3a8a] active:shadow-[0_1px_0_#1e3a8a] transition-all flex items-center justify-center gap-3 cursor-pointer btn-3d"
          >
            <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span>{buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
