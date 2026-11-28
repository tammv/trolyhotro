import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, Sparkles, Heart, Play, RotateCcw, Volume2, VolumeX, Trees, CloudRain, Flower2, Waves } from 'lucide-react';
import { soundFx } from '../lib/sound';
import confetti from 'canvas-confetti';

const MEDITATION_VIDEO_ID = 'r3gRcVd1swk';
const MEDITATION_EMBED_URL = `https://www.youtube.com/embed/${MEDITATION_VIDEO_ID}?autoplay=1&loop=1&playlist=${MEDITATION_VIDEO_ID}&enablejsapi=1&rel=0`;

const NATURE_SCENES = [
  {
    id: 'forest',
    label: 'Rừng xanh',
    icon: Trees,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-emerald-900 via-teal-900 to-slate-900',
    particleType: 'firefly',
  },
  {
    id: 'rain',
    label: 'Mưa lá',
    icon: CloudRain,
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=900&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-slate-800 via-teal-950 to-slate-950',
    particleType: 'rain',
  },
  {
    id: 'meadow',
    label: 'Hoa cỏ',
    icon: Flower2,
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-rose-900/90 via-emerald-900 to-slate-900',
    particleType: 'petal',
  },
  {
    id: 'ocean',
    label: 'Biển êm',
    icon: Waves,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80',
    fallbackGradient: 'from-sky-900 via-cyan-950 to-slate-950',
    particleType: 'sparkle',
  },
];

export default function BreathingModal({ isOpen, onClose }) {
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [phase, setPhase] = useState('ready'); // 'ready' | 'inhale' | 'hold' | 'exhale' | 'done'
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [sceneId, setSceneId] = useState('forest');
  const [loadedImages, setLoadedImages] = useState({});
  const timerRef = useRef(null);
  const iframeRef = useRef(null);

  const currentScene = useMemo(
    () => NATURE_SCENES.find((s) => s.id === sceneId) || NATURE_SCENES[0],
    [sceneId]
  );

  // Hạt hiệu ứng thiên nhiên cố định để không nhảy vị trí khi re-render mỗi giây
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 7 + 5) % 94}%`,
        top: `${(i * 11 + 8) % 85}%`,
        delay: `${(i * 0.45).toFixed(2)}s`,
        duration: `${(4.5 + (i % 5) * 1.1).toFixed(1)}s`,
        size: 5 + (i % 4) * 2,
      })),
    []
  );

  const sendPlayerCommand = useCallback((func) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: '' }),
        '*'
      );
    }
  }, []);

  const handleReset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsActive(false);
    setSecondsLeft(60);
    setPhase('ready');
  }, []);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
      setIsMusicOn(true);
    }
  }, [isOpen, handleReset]);

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
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setPhase('done');
      setIsActive(false);
      soundFx.playSuccess();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
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
    if (isMusicOn) {
      sendPlayerCommand('unMute');
      sendPlayerCommand('playVideo');
    }
  };

  const handleToggleMusic = () => {
    if (isMusicOn) {
      sendPlayerCommand('pauseVideo');
      setIsMusicOn(false);
    } else {
      setIsMusicOn(true);
      sendPlayerCommand('unMute');
      sendPlayerCommand('playVideo');
    }
  };

  if (!isOpen) return null;

  const isImgReady = Boolean(loadedImages[currentScene.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl shadow-2xl border-2 border-white/25 p-5 sm:p-7 text-center space-y-5 my-auto relative overflow-hidden bg-gradient-to-br ${currentScene.fallbackGradient}`}
      >
        {/* Lớp ảnh nền thiên nhiên chuyển động chậm (Ken Burns) */}
        <img
          key={currentScene.id}
          src={currentScene.imageUrl}
          alt={`Khung cảnh ${currentScene.label}`}
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [currentScene.id]: true }))}
          className={`absolute inset-0 w-full h-full object-cover animate-ken-burns pointer-events-none select-none transition-opacity duration-700 ${
            isImgReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Lớp phủ dịu mắt giúp chữ và vòng tròn hít thở luôn rõ nét */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-900/40 to-slate-950/65 backdrop-blur-[1.5px] pointer-events-none" />

        {/* Hiệu ứng hạt thiên nhiên bay nhẹ */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {particles.map((p) => {
            if (currentScene.particleType === 'rain') {
              return (
                <span
                  key={p.id}
                  style={{
                    left: p.left,
                    animationDelay: p.delay,
                    animationDuration: `${(parseFloat(p.duration) * 0.45).toFixed(1)}s`,
                  }}
                  className="absolute -top-6 w-[1.5px] h-5 rounded-full bg-sky-200/45 animate-rain-fall"
                />
              );
            }
            const colorClass =
              currentScene.particleType === 'petal'
                ? 'bg-pink-200/65 rounded-tl-full rounded-br-full'
                : currentScene.particleType === 'sparkle'
                ? 'bg-cyan-100/60 rounded-full'
                : 'bg-amber-200/65 rounded-full shadow-[0_0_8px_rgba(253,230,138,0.8)]';
            return (
              <span
                key={p.id}
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
                className={`absolute animate-nature-float ${colorClass}`}
              />
            );
          })}
        </div>

        {/* Video nhạc thiền chạy nền tự động */}
        {isMusicOn && (
          <iframe
            ref={iframeRef}
            src={MEDITATION_EMBED_URL}
            title="Nhạc thiền thư giãn nền"
            allow="autoplay; encrypted-media"
            aria-hidden="true"
            tabIndex={-1}
            className="w-1 h-1 opacity-0 pointer-events-none absolute -z-10"
          />
        )}

        {/* Nội dung nổi phía trên nền thiên nhiên */}
        <div className="relative z-10 space-y-5">
          {/* Header Modal */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/15 backdrop-blur-md text-teal-200 text-xs font-black border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hạ nhiệt 60 giây</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleMusic}
                title={isMusicOn ? 'Tắt nhạc thiền nền' : 'Bật nhạc thiền nền'}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border backdrop-blur-md transition-colors cursor-pointer ${
                  isMusicOn
                    ? 'bg-teal-500/30 text-teal-100 border-teal-300/40'
                    : 'bg-white/10 text-slate-300 border-white/20'
                }`}
              >
                {isMusicOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isMusicOn ? 'Nhạc nền' : 'Đã tắt'}</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thanh chọn cảnh thiên nhiên chill */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {NATURE_SCENES.map((scene) => {
              const SceneIcon = scene.icon;
              const isSelected = scene.id === sceneId;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => {
                    soundFx.playPop();
                    setSceneId(scene.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-900 border-white shadow-md scale-105'
                      : 'bg-white/15 text-white/90 border-white/20 hover:bg-white/25'
                  }`}
                >
                  <SceneIcon className="w-3.5 h-3.5" />
                  <span>{scene.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tiêu đề */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs">
              Thả lỏng vai và thở chậm cùng nhau
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-medium drop-shadow-xs">
              Không cần vội giải bài ngay. Vừa ngắm thiên nhiên, nghe nhạc nhẹ và thở đều 1 phút nhé.
            </p>
          </div>

          {/* Vòng tròn Visual hít thở kính mờ */}
          <div className="py-3 flex flex-col items-center justify-center min-h-[185px]">
            <div
              className={`w-36 h-36 rounded-full border-4 border-white/70 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-1000 select-none ${
                phase === 'inhale'
                  ? 'scale-125 bg-gradient-to-tr from-teal-300/80 via-sky-300/80 to-indigo-300/80 shadow-[0_0_40px_rgba(94,234,212,0.55)]'
                  : phase === 'hold'
                  ? 'scale-125 bg-gradient-to-tr from-purple-300/80 via-indigo-300/80 to-blue-300/80 shadow-[0_0_45px_rgba(167,139,250,0.6)]'
                  : phase === 'exhale'
                  ? 'scale-95 bg-gradient-to-tr from-emerald-300/75 via-teal-200/75 to-sky-200/75 shadow-[0_0_25px_rgba(52,211,153,0.45)]'
                  : phase === 'done'
                  ? 'scale-110 bg-emerald-200/90 shadow-[0_0_35px_rgba(16,185,129,0.55)]'
                  : 'scale-100 bg-white/85 shadow-lg'
              }`}
            >
              <span className="text-base font-black text-slate-900">
                {phase === 'inhale' && 'Hít vào nhẹ...'}
                {phase === 'hold' && 'Giữ êm...'}
                {phase === 'exhale' && 'Thở ra chậm...'}
                {phase === 'done' && 'Nhẹ nhõm rồi 🌿'}
                {phase === 'ready' && 'Sẵn sàng'}
              </span>
              <span className="text-xs font-bold text-slate-700 mt-1">
                {phase === 'done' ? 'Hoàn thành' : `${secondsLeft} giây`}
              </span>
            </div>
          </div>

          {/* Lời nhắc nhủ vỗ về */}
          <p className="text-xs sm:text-sm text-slate-100 italic font-medium px-3 drop-shadow-xs">
            {phase === 'done'
              ? '“Bạn vừa làm rất tốt! Giờ đây đầu óc đã sáng rõ hơn để cùng gỡ rối từng bước.”'
              : '“Mọi nút thắt đều trở nên dễ tháo gỡ hơn khi bạn đang ở trạng thái bình tĩnh.”'}
          </p>

          {/* Các nút điều khiển */}
          <div className="flex items-center justify-center gap-3 pt-1">
            {!isActive && phase !== 'done' && (
              <button
                onClick={handleStart}
                className="px-8 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 active:translate-y-0.5 text-white text-sm font-black shadow-[0_4px_0_#0f766e] border-2 border-teal-400 transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Bắt đầu 60 giây thở đều</span>
              </button>
            )}

            {isActive && (
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border-2 border-white shadow-md text-xs font-black transition-all cursor-pointer btn-3d"
              >
                Dừng lại & Đặt lại
              </button>
            )}

            {phase === 'done' && (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleStart}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border-2 border-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 cursor-pointer btn-3d"
                >
                  <RotateCcw className="w-4 h-4 text-teal-600" />
                  <span>Thở thêm 1 lần</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black shadow-[0_4px_0_#047857] border-2 border-emerald-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-3d"
                >
                  <Heart className="w-4 h-4 text-pink-100" />
                  <span>Đã ổn, bắt đầu gỡ rối</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
