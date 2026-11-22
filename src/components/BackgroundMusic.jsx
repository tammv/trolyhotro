import { useEffect, useRef } from 'react';

/**
 * Bộ tạo âm thanh thư giãn (Ambient Chill Synthesizer) bằng Web Audio API
 * Hoàn toàn miễn phí, 0 latency, 0 băng thông mạng, không bao giờ bị lỗi 404 file mp3!
 */
export default function BackgroundMusic({ isPlaying }) {
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      startAmbientMusic();
    } else {
      stopAmbientMusic();
    }

    return () => {
      stopAmbientMusic();
    };
  }, [isPlaying]);

  const startAmbientMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }

      // Danh sách các hợp âm dịu êm (Fmaj7 - Em7 - Dm7 - Cmaj7)
      const chords = [
        [174.61, 220.00, 261.63, 329.63], // F, A, C, E
        [164.81, 196.00, 246.94, 293.66], // E, G, B, D
        [146.83, 174.61, 220.00, 261.63], // D, F, A, C
        [130.81, 164.81, 196.00, 246.94], // C, E, G, B
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentCtx = audioCtxRef.current;
        const now = currentCtx.currentTime;
        const chord = chords[chordIndex % chords.length];
        chordIndex++;

        chord.forEach((freq) => {
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * 1.5, now);

          // Âm lượng rất nhỏ (0.015), êm dịu làm nền học tập
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.015, now + 1.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

          osc.connect(gain);
          gain.connect(currentCtx.destination);

          osc.start(now);
          osc.stop(now + 4.6);
        });
      };

      playChord();
      timerRef.current = setInterval(playChord, 4200);
    } catch {
      // Bỏ qua nếu trình duyệt chặn autoplay
    }
  };

  const stopAmbientMusic = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.suspend();
      } catch {
        // Ignored
      }
    }
  };

  return null;
}
