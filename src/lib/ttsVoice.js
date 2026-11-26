/**
 * Chuyển đổi đại từ xưng hô từ góc nhìn học sinh ("Em", "em") sang góc nhìn bạn đồng hành thân thiện ("Bạn", "bạn")
 * Giúp lời thoại và giọng nói của linh vật StudyZen tự nhiên, ấm áp và gần gũi.
 */
export function convertEmToBan(text) {
  if (!text) return '';
  let str = text.trim();

  // Bỏ số thứ tự đầu câu nếu có (vd: "1. ", "2. ", "3) ")
  str = str.replace(/^\d+[\.\)]\s*/, '');

  // Xóa dấu chấm hoặc chấm phẩy cuối cùng để tránh lỗi lặp dấu câu khi lồng vào lời thoại
  str = str.replace(/[\.;]+$/, '').trim();

  // Chuyển cụm xưng hô ở đầu câu
  str = str.replace(/^Em\b/g, 'Bạn');
  str = str.replace(/^em\b/g, 'bạn');
  str = str.replace(/^EM\b/g, 'BẠN');

  // Chuyển cụm xưng hô sau dấu ngoặc hoặc dấu nháy
  str = str.replace(/(["'“‘(\[])\s*Em\b/g, '$1Bạn');
  str = str.replace(/(["'“‘(\[])\s*em\b/g, '$1bạn');

  // Chuyển các cụm phổ biến trong ngữ cảnh học sinh
  str = str.replace(/\bcủa em\b/gi, 'của bạn');
  str = str.replace(/\bvới em\b/gi, 'với bạn');
  str = str.replace(/\bcho em\b/gi, 'cho bạn');
  str = str.replace(/\bgiúp em\b/gi, 'giúp bạn');
  str = str.replace(/\bđể em\b/gi, 'để bạn');
  str = str.replace(/\bkhiến em\b/gi, 'khiến bạn');
  str = str.replace(/\blàm em\b/gi, 'làm bạn');
  str = str.replace(/\bkhi em\b/gi, 'khi bạn');
  str = str.replace(/\bnếu em\b/gi, 'nếu bạn');
  str = str.replace(/\bnhắc em\b/gi, 'nhắc bạn');
  str = str.replace(/\bhỏi em\b/gi, 'hỏi bạn');
  str = str.replace(/\bbảo em\b/gi, 'bảo bạn');

  // Chuyển các từ Em/em đứng độc lập còn lại
  str = str.replace(/\bEm\b/g, 'Bạn');
  str = str.replace(/\bem\b/g, 'bạn');

  return str.trim();
}

/**
 * Chuyển đổi chuỗi in hoa thành chữ thường có viết hoa chữ cái đầu (Sentence case)
 * Giúp tiêu đề tình huống tự nhiên, nhẹ nhàng, không gây cảm giác gắt gỏng do in hoa toàn bộ.
 */
export function formatSentenceCase(str) {
  if (!str) return '';
  const trimmed = str.trim();
  const lower = trimmed.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

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

      // Đảm bảo không xưng "Em" mà xưng "Bạn" khi đọc
      let cleanText = convertEmToBan(text);

      // Làm sạch text (bỏ markdown/dấu ngoặc kép thừa để đọc trôi chảy)
      cleanText = cleanText
        .replace(/[*_#`~[\]]/g, '')
        .replace(/["'“”‘’]/g, '')
        .replace(/\bStudyZen\b/gi, 'S-tơ-đi Zen')
        .replace(/\b1\b/g, 'một')
        .replace(/\b2\b/g, 'hai')
        .replace(/\b3\b/g, 'ba')
        .replace(/\s+/g, ' ')
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
