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
 * StudyZen Text-to-Speech
 * Ưu tiên giọng đọc tiếng Việt (vi-VN) có sẵn trên trình duyệt.
 * Nếu thiết bị không có giọng tiếng Việt (tránh đọc nhầm sang giọng tiếng Anh mặc định),
 * hệ thống tự động chuyển sang phát âm thanh tiếng Việt trực tuyến (Google TTS) hoặc im lặng an toàn.
 */
class StudyZenVoice {
  constructor() {
    this.isMuted = false;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.cachedVoice = null;
    this.currentAudio = null;
    this.playbackId = 0;
    this.initVoice();
  }

  findVietnameseVoice(voices = []) {
    if (!voices || voices.length === 0) return null;

    const viVoices = voices.filter((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return (
        lang === 'vi-vn' ||
        lang.startsWith('vi-') ||
        lang === 'vi' ||
        name.includes('vietnam') ||
        name.includes('tiếng việt') ||
        name.includes('tieng viet')
      );
    });

    if (viVoices.length === 0) return null;

    // Ưu tiên giọng tự nhiên (Google / Microsoft HoaiMy / NamMinh / Linh)
    return (
      viVoices.find((v) => /google|hoaimy|namminh|linh|an\b/i.test(v.name || '')) ||
      viVoices[0]
    );
  }

  initVoice() {
    if (!this.synth) return;

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      this.cachedVoice = this.findVietnameseVoice(voices);
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
    this.playbackId += 1;
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio.src = '';
      } catch {
        // Bỏ qua lỗi khi dọn dẹp audio
      }
      this.currentAudio = null;
    }
  }

  /**
   * Chia văn bản tiếng Việt thành các đoạn ngắn <= 180 ký tự theo dấu câu
   */
  splitTextChunks(text, maxLen = 180) {
    const sentences = text.split(/(?<=[.!?…,:;])\s+/);
    const chunks = [];
    let current = '';

    for (const part of sentences) {
      if (!part) continue;
      if ((current + ' ' + part).trim().length <= maxLen) {
        current = (current + ' ' + part).trim();
      } else {
        if (current) chunks.push(current);
        if (part.length <= maxLen) {
          current = part;
        } else {
          // Cắt theo từ nếu một câu quá dài
          const words = part.split(/\s+/);
          let buf = '';
          for (const w of words) {
            if ((buf + ' ' + w).trim().length <= maxLen) {
              buf = (buf + ' ' + w).trim();
            } else {
              if (buf) chunks.push(buf);
              buf = w;
            }
          }
          current = buf;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  /**
   * Phát giọng tiếng Việt dự phòng qua Audio khi trình duyệt không có voice vi-VN
   */
  playVietnameseAudioFallback(cleanText, playbackId, onEnd) {
    if (typeof Audio === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    const chunks = this.splitTextChunks(cleanText, 180);
    if (chunks.length === 0) {
      if (onEnd) onEnd();
      return;
    }

    const playNext = (index) => {
      if (this.isMuted || playbackId !== this.playbackId) {
        if (onEnd) onEnd();
        return;
      }
      if (index >= chunks.length) {
        this.currentAudio = null;
        if (onEnd) onEnd();
        return;
      }

      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(chunks[index])}`;
      const audio = new Audio();
      audio.referrerPolicy = 'no-referrer';
      audio.src = url;
      this.currentAudio = audio;

      audio.onended = () => {
        playNext(index + 1);
      };

      audio.onerror = () => {
        this.currentAudio = null;
        if (onEnd) onEnd();
      };

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          this.currentAudio = null;
          if (onEnd) onEnd();
        });
      }
    };

    playNext(0);
  }

  speak(text, onEnd) {
    if (this.isMuted || !text) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.stop();
      const currentPlaybackId = this.playbackId;

      // Đảm bảo không xưng "Em" mà xưng "Bạn" khi đọc
      let cleanText = convertEmToBan(text);

      // Làm sạch text (bỏ markdown/dấu ngoặc kép thừa để đọc trôi chảy bằng tiếng Việt)
      cleanText = cleanText
        .replace(/[*_#`~[\]]/g, '')
        .replace(/["'“”‘’]/g, '')
        .replace(/\bStudyZen\b/gi, 'Sờ tơ đi Zen')
        .replace(/\b1\b/g, 'một')
        .replace(/\b2\b/g, 'hai')
        .replace(/\b3\b/g, 'ba')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        if (onEnd) onEnd();
        return;
      }

      // Chỉ dùng Web Speech API nếu thiết bị THỰC SỰ có giọng tiếng Việt (vi-VN)
      // Tuyệt đối không để trình duyệt tự rơi về giọng tiếng Anh mặc định.
      let viVoice = this.cachedVoice;
      if (!viVoice && this.synth) {
        viVoice = this.findVietnameseVoice(this.synth.getVoices());
        if (viVoice) this.cachedVoice = viVoice;
      }

      if (this.synth && viVoice) {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = viVoice.lang || 'vi-VN';
        utterance.voice = viVoice;
        utterance.pitch = 1.1;
        utterance.rate = 1.02;
        utterance.volume = 1.0;

        if (onEnd) {
          utterance.onend = onEnd;
          utterance.onerror = onEnd;
        }

        this.synth.speak(utterance);
      } else {
        // Thiết bị không có giọng tiếng Việt cục bộ -> dùng Audio tiếng Việt
        this.playVietnameseAudioFallback(cleanText, currentPlaybackId, onEnd);
      }
    } catch (err) {
      console.warn('Lỗi phát giọng nói StudyZen:', err);
      if (onEnd) onEnd();
    }
  }
}

export const mascotVoice = new StudyZenVoice();
