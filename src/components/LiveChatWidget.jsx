import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck, PhoneCall, Send, ArrowLeft } from 'lucide-react';
import { CHAT_CONFIG, getAnonymousStudentId } from '../lib/chatConfig';
import { soundFx } from '../lib/sound';
import StudyZenMascot from './StudyZenMascot';

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('menu'); // 'menu' | 'crisp'
  const anonId = getAnonymousStudentId();
  const isCrispConfigured = Boolean(CHAT_CONFIG.crispWebsiteId && CHAT_CONFIG.crispWebsiteId.trim() !== '');

  const crispEmbedUrl = isCrispConfigured
    ? `https://go.crisp.chat/chat/embed/?website_id=${encodeURIComponent(CHAT_CONFIG.crispWebsiteId)}&user_nickname=${encodeURIComponent(`Học sinh (${anonId})`)}`
    : '';

  const handleOpenWebChat = () => {
    soundFx.playChime();
    setActiveMode('crisp');
  };

  const handleClose = () => {
    soundFx.playBack();
    setIsOpen(false);
    setActiveMode('menu');
  };

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      
      {/* Cửa sổ Chat 3D StudyZen */}
      {isOpen && (
        <div className={`mb-3 bg-white dark:bg-[#1c2b33] rounded-3xl border-2 border-blue-200 dark:border-[#37464f] shadow-[0_12px_35px_rgba(37,99,235,0.28)] overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200 flex flex-col ${
          activeMode === 'crisp' 
            ? 'w-[calc(100vw-2rem)] sm:w-[390px] h-[480px] sm:h-[540px]' 
            : 'w-[310px] sm:w-[340px]'
        }`}>
          
          {/* Header khung chat */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3.5 sm:p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              {activeMode === 'crisp' ? (
                <button
                  onClick={() => {
                    soundFx.playBack();
                    setActiveMode('menu');
                  }}
                  className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
                  title="Quay lại chọn kênh"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/25 shrink-0">
                  <StudyZenMascot className="w-8 h-8" variant="happy" animated={false} />
                </div>
              )}
              <div>
                <h4 className="font-black text-sm leading-tight">
                  {activeMode === 'crisp' ? `Chat với ${CHAT_CONFIG.teacherName}` : 'Nhắn trực tiếp với thầy cô'}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-100 font-semibold mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Ẩn danh hoàn toàn · Mã: {anonId}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Đóng khung chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chế độ Menu chọn kênh */}
          {activeMode === 'menu' && (
            <div className="p-4 space-y-3">
              <p className="text-xs text-slate-600 dark:text-[#d1e1ea] font-medium leading-relaxed">
                Nếu bạn chưa biết gọi tên khó khăn của mình hoặc cần người lắng nghe trực tiếp, cứ nhắn cho cô nhé!
              </p>

              {/* Nút 1: Chat trực tiếp trên web (Crisp Embed) */}
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
                      Báo thẳng tới điện thoại cô · Ẩn danh
                    </div>
                  </div>
                </div>
                <Send className="w-4 h-4 shrink-0" />
              </button>

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
          )}

          {/* Chế độ khung Chat trực tiếp Crisp Embedded */}
          {activeMode === 'crisp' && (
            <div className="flex-1 w-full h-full bg-slate-50 dark:bg-[#131f24] relative">
              {isCrispConfigured ? (
                <iframe
                  title="Khung chat trực tiếp StudyZen"
                  src={crispEmbedUrl}
                  className="w-full h-full border-0"
                  allow="microphone; camera"
                />
              ) : (
                <div className="p-6 text-center text-xs text-slate-600 dark:text-[#8fa5b1]">
                  Chưa cấu hình mã Crisp Website ID.
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* Nút Chat nổi 3D StudyZen */}
      <button
        onClick={() => {
          soundFx.playPop();
          setIsOpen(!isOpen);
        }}
        className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-105 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#1e3a8a,0_8px_20px_rgba(37,99,235,0.35)] border-2 border-white/20 transition-all active:translate-y-0.5 cursor-pointer btn-3d"
        title="Nhắn tin trực tiếp với thầy cô"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-blue-600 animate-pulse"></span>
        </div>
        <span>Nhắn với cô</span>
      </button>

    </div>
  );
}
