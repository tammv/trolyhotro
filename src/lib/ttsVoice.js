/**
 * StudyZen Text-to-Speech (Web Speech API)
 * Hoàn toàn miễn phí (0đ), chạy trực tiếp trên trình duyệt, không cần API key.
 */

class StudyZenVoice {
  constructor() {
    this.isMuted = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.cachedVoice = null;
    this.initVoice();
  }

  initVoice() {
    if (!this.synth) return;
    
    // Tải danh sách giọng nói
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Ưu tiên giọng tiếng Việt
      this.cachedVoice = voices.find(v => v.lang === 'vi-VN' || v.lang.startsWith('vi')) || null;
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    if (this.isMuted) {
      this.stop();
    }
  }

  stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
  }

  speak(text, onEnd) {
    if (this.isMuted || !this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.stop();

      // Làm sạch text (bỏ markdown/ký tự đặc biệt trước khi đọc)
      const cleanText = text
        .replace(/[*_#`~[\]]/g, '')
        .replace(/\bStudyZen\b/gi, 'S-tơ-đi Zen')
        .replace(/\b1\b/g, 'một')
        .replace(/\b2\b/g, 'hai')
        .replace(/\b3\b/g, 'ba')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'vi-VN';
      // Tinh chỉnh tông cao và tốc độ để giọng trẻ trung, hào hứng, thân thiện
      utterance.pitch = 1.15; 
      utterance.rate = 1.05; 
      utterance.volume = 1.0;

      if (this.cachedVoice) {
        utterance.voice = this.cachedVoice;
      } else {
        const voices = this.synth.getVoices();
        const viVoice = voices.find(v => v.lang === 'vi-VN' || v.lang.startsWith('vi'));
        if (viVoice) utterance.voice = viVoice;
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Lỗi phát giọng nói StudyZen:', err);
      if (onEnd) onEnd();
    }
  }
}

export const mascotVoice = new StudyZenVoice();
