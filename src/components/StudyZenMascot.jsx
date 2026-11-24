import React from 'react';

/**
 * Linh vật chính thức StudyZen (Dựa trên Brand Identity System & Logo Suite)
 * Chú giọt sao nhỏ màu tím oải hương & xanh dương, ngôi sao vàng dẫn lối trên trán.
 */
export default function StudyZenMascot({ 
  className = "w-24 h-24", 
  variant = "happy", // 'happy' | 'talking' | 'celebrating' | 'cheering'
  animated = true 
}) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className} ${animated ? 'animate-float' : ''}`}>
      <svg 
        viewBox="0 0 200 210" 
        className="w-full h-full drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient thân chính: Tím oải hương đỉnh đầu -> Xanh hoàng gia */}
          <linearGradient id="mascotBodyGrad" x1="100" y1="20" x2="100" y2="190" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="35%" stopColor="#818CF8" />
            <stop offset="70%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Gradient vùng bụng & mặt sáng dịu */}
          <radialGradient id="mascotFaceGlow" cx="100" cy="115" r="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#E0E7FF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>

          {/* Gradient cánh tay */}
          <linearGradient id="mascotArmGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Gradient ngôi sao vàng */}
          <linearGradient id="mascotStarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* 1. CHÂN TRÁI & CHÂN PHẢI (Stubby feet) */}
        <ellipse cx="78" cy="188" rx="14" ry="11" fill="#1E40AF" />
        <ellipse cx="122" cy="188" rx="14" ry="11" fill="#1E40AF" />

        {/* 2. CÁNH TAY TRÁI (Waving arm) */}
        {variant === 'talking' || variant === 'cheering' ? (
          <path 
            d="M52 115 C30 100 24 80 34 72 C44 65 58 84 62 104 Z" 
            fill="url(#mascotArmGrad)" 
            className="animate-pulse"
          />
        ) : (
          <ellipse cx="44" cy="126" rx="18" ry="14" transform="rotate(-25 44 126)" fill="url(#mascotArmGrad)" />
        )}

        {/* 3. CÁNH TAY PHẢI */}
        {variant === 'celebrating' || variant === 'cheering' ? (
          <path 
            d="M148 115 C170 100 176 80 166 72 C156 65 142 84 138 104 Z" 
            fill="url(#mascotArmGrad)" 
            className="animate-pulse"
          />
        ) : (
          <ellipse cx="156" cy="126" rx="18" ry="14" transform="rotate(25 156 126)" fill="url(#mascotArmGrad)" />
        )}

        {/* 4. THÂN CHÍNH HÌNH GIỌT SAO Ú NU (CHUBBY DROPLET BODY) */}
        {/* Đỉnh chóp mềm mại hơi nghiêng sang trái đặc trưng của logo StudyZen */}
        <path 
          d="M100 24 
             C106 20, 118 36, 134 56 
             C160 88, 172 122, 168 152 
             C162 182, 134 194, 100 194 
             C66 194, 38 182, 32 152 
             C28 122, 40 88, 66 56 
             C82 36, 94 20, 100 24 Z" 
          fill="url(#mascotBodyGrad)" 
          stroke="#1E40AF" 
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Ánh sáng dịu trên khuôn mặt */}
        <ellipse cx="100" cy="120" rx="52" ry="46" fill="url(#mascotFaceGlow)" />

        {/* 5. NGÔI SAO VÀNG DẪN ĐƯỜNG TRÊN TRÁN (#FACC15) */}
        <g transform="translate(100, 52)">
          {/* Tia sáng sao 4 cánh */}
          <path 
            d="M0 -15 C1 -4, 4 -1, 15 0 C4 1, 1 4, 0 15 C-1 4, -4 1, -15 0 C-4 -1, -1 -4, 0 -15 Z" 
            fill="url(#mascotStarGrad)" 
            stroke="#CA8A04" 
            strokeWidth="1.2"
          />
          {/* Điểm sáng tâm sao */}
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>

        {/* 6. ĐÔI LÔNG MÀY TINH NGHỊCH */}
        <path d="M68 92 C72 88, 82 89, 86 93" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M114 93 C118 89, 128 88, 132 92" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />

        {/* 7. ĐÔI MẮT ANIME TO TRÒN LONG LANH */}
        {/* Mắt trái */}
        <g>
          <ellipse cx="76" cy="112" rx="13" ry="16" fill="#0F172A" />
          {/* Vòng trăng khuyết xanh trong mắt */}
          <path d="M68 116 C71 124, 81 124, 84 116 C81 120, 71 120, 68 116 Z" fill="#38BDF8" />
          {/* Đốm sáng lớn */}
          <circle cx="73" cy="106" r="5" fill="#FFFFFF" />
          {/* Đốm sáng nhỏ */}
          <circle cx="81" cy="116" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Mắt phải */}
        <g>
          <ellipse cx="124" cy="112" rx="13" ry="16" fill="#0F172A" />
          {/* Vòng trăng khuyết xanh */}
          <path d="M116 116 C119 124, 129 124, 132 116 C129 120, 119 120, 116 116 Z" fill="#38BDF8" />
          {/* Đốm sáng lớn */}
          <circle cx="121" cy="106" r="5" fill="#FFFFFF" />
          {/* Đốm sáng nhỏ */}
          <circle cx="129" cy="116" r="2.2" fill="#FFFFFF" />
        </g>

        {/* 8. ĐÔI MÁ HỒNG CHIBI DỄ THƯƠNG */}
        <ellipse cx="58" cy="126" rx="8" ry="5.5" fill="#FDA4AF" opacity="0.85" />
        <ellipse cx="142" cy="126" rx="8" ry="5.5" fill="#FDA4AF" opacity="0.85" />

        {/* 9. KHUÔN MIỆNG CƯỜI RẠNG RỠ */}
        {variant === 'talking' ? (
          /* Miệng đang nói chuyện */
          <g>
            <path 
              d="M86 132 C86 148, 114 148, 114 132 Z" 
              fill="#831843" 
              stroke="#500724" 
              strokeWidth="2" 
            />
            {/* Chiếc lưỡi hồng nhỏ */}
            <path d="M92 144 C96 138, 104 138, 108 144 Z" fill="#FB7185" />
          </g>
        ) : (
          /* Miệng cười mèo vui vẻ */
          <path 
            d="M88 132 C94 142, 106 142, 112 132" 
            stroke="#1E3A8A" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
          />
        )}

        {/* 10. CÁC TIA SAO NHỎ XUNG QUANH KHI CELEBRATING */}
        {(variant === 'celebrating' || variant === 'cheering') && (
          <g>
            <path d="M30 50 L34 54 L30 58 L26 54 Z" fill="#FACC15" className="animate-ping" />
            <path d="M170 45 L174 49 L170 53 L166 49 Z" fill="#FACC15" className="animate-ping" />
            <circle cx="165" cy="85" r="2.5" fill="#FEF08A" />
            <circle cx="35" cy="90" r="2" fill="#FEF08A" />
          </g>
        )}
      </svg>
    </div>
  );
}
