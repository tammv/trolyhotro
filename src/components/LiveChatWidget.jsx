import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck, PhoneCall, Send } from 'lucide-react';
import { CHAT_CONFIG, getAnonymousStudentId } from '../lib/chatConfig';
import { soundFx } from '../lib/sound';
import StudyZenMascot from './StudyZenMascot';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [crispReady, setCrispReady] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showSetupNotice, setShowSetupNotice] = useState(false);
  const anonId = getAnonymousStudentId();
  const isCrispConfigured = Boolean(CHAT_CONFIG.crispWebsiteId && CHAT_CONFIG.crispWebsiteId.trim() !== '');

  // Nhúng script Crisp Chat nếu đã cấu hình Website ID
  useEffect(() => {
    if (!isCrispConfigured) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CHAT_CONFIG.crispWebsiteId;

    window.$crisp.push(['safe', true]);
    // Gán mã phiên ẩn danh cho học sinh (không cần đăng nhập)
    window.$crisp.push(['set', 'user:nickname', [`Học sinh (${anonId})`]]);
    // Ẩn bong bóng mặc định của Crisp để dùng nút 3D StudyZen (tránh đè thanh điều hướng mobile)
    window.$crisp.push(['do', 'chat:hide']);

    window.$crisp.push([
      'on',
      'session:loaded',
      function () {
        setCrispReady(true);
      },
    ]);

    window.$crisp.push([
      'on',
      'chat:closed',
      function () {
        window.$crisp.push(['do', 'chat:hide']);
      },
    ]);

    window.$crisp.push([
      'on',
      'message:received',
      function () {
        setHasUnread(true);
        window.$crisp.push(['do', 'chat:show']);
      },
    ]);

    const s = document.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    document.head.appendChild(s);

    return () => {
      try {
        document.head.removeChild(s);
      } catch {}
    };
  }, [isCrispConfigured, anonId]);

  const handleOpenWebChat = () => {
    soundFx.playChime();
    if (isCrispConfigured && window.$crisp) {
      setIsOpen(false);
      setHasUnread(false);
      window.$crisp.push(['do', 'chat:show']);
      window.$crisp.push(['do', 'chat:open']);
    } else {
      setShowSetupNotice(true);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Cửa sổ chọn kênh Chat 3D */}
      {isOpen && (
        <div className="mb-3 w-[310px] sm:w-[340px] bg-white dark:bg-[#1c2b33] rounded-3xl border-2 border-blue-200 dark:border-[#37464f] shadow-[0_10px_30px_rgba(37,99,235,0.22)] overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          
          {/* Header khung chat */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/25 shrink-0">
                <StudyZenMascot className="w-8 h-8" variant="happy" animated={false} />
              </div>
              <div>
                <h4 className="font-black text-sm leading-tight">Nhắn trực tiếp với thầy cô</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-100 font-semibold mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Ẩn danh hoàn toàn · Mã: {anonId}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                soundFx.playBack();
                setIsOpen(false);
                setShowSetupNotice(false);
              }}
              className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Đóng khung chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nội dung lựa chọn kênh kết nối */}
          <div className="p-4 space-y-3">
            <p className="text-xs text-slate-600 dark:text-[#d1e1ea] font-medium leading-relaxed">
              Nếu bạn chưa biết gọi tên khó khăn của mình hoặc cần người lắng nghe trực tiếp, cứ nhắn cho cô nhé!
            </p>

            {/* Nút 1: Chat trực tiếp trên web (Crisp) */}
            <button
              onClick={handleOpenWebChat}
              className="w-full p-3.5 rounded-2xl bg-blue-600 hover:brightness-105 active:translate-y-0.5 text-white shadow-[0_4px_0_#1d4ed8] transition-all flex items-center justify-between gap-2 cursor-pointer text-left btn-3d"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/15">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black">Chat trực tiếp trên web</div>
                  <div className="text-[11px] text-blue-100 font-medium">
                    {isCrispConfigured ? (crispReady ? 'Báo thẳng tới điện thoại cô' : 'Đang kết nối...') : 'Không cần đăng nhập · Ẩn danh'}
                  </div>
                </div>
              </div>
              <Send className="w-4 h-4 shrink-0" />
            </button>

            {/* Thông báo nếu chưa dán mã Crisp */}
            {showSetupNotice && !isCrispConfigured && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-[#322714] border border-amber-200 dark:border-[#634b1a] text-[11px] text-amber-900 dark:text-[#fef08a] font-medium leading-relaxed animate-in fade-in duration-200">
                <strong>Lưu ý kết nối:</strong> Kênh chat web đang chờ gắn mã <strong>Crisp Website ID</strong> của cô giáo. Trong lúc chờ, bạn hãy bấm nút <strong>Nhắn qua Zalo</strong> ngay bên dưới để gặp cô nhé!
              </div>
            )}

            {/* Nút 2: Nhắn trực tiếp qua Zalo cô Khánh Nga */}
            <a
              href={`https://zalo.me/${CHAT_CONFIG.teacherZaloPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playChime()}
              className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 dark:bg-[#243640] dark:hover:bg-[#2c404c] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none transition-all flex items-center justify-between gap-2 text-left btn-3d"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-[#12384a] text-blue-600 dark:text-[#1cb0f6]">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-slate-800 dark:text-[#e6eef2]">
                    Nhắn qua Zalo {CHAT_CONFIG.teacherName}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#8fa5b1] font-semibold">
                    SĐT: {CHAT_CONFIG.teacherZaloPhone}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </a>

            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-[#58cc02] font-bold justify-center">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Bảo mật danh tính · Tin nhắn được giữ kín</span>
            </div>
          </div>

        </div>
      )}

      {/* Nút Chat nổi 3D StudyZen */}
      <button
        onClick={() => {
          soundFx.playPop();
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#1e3a8a,0_8px_20px_rgba(37,99,235,0.35)] border-2 border-white/20 transition-all active:translate-y-0.5 cursor-pointer btn-3d"
        title="Nhắn tin trực tiếp với thầy cô"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-blue-600 ${hasUnread ? 'bg-red-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
        </div>
        <span>Nhắn với cô</span>
      </button>

    </div>
  );
}
