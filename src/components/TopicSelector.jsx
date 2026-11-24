import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Layers, 
  HelpCircle, 
  Clock, 
  UploadCloud, 
  Hourglass, 
  Compass, 
  Puzzle, 
  AlertTriangle, 
  Laptop, 
  CalendarRange, 
  FileQuestion, 
  Target, 
  HeartPulse, 
  Timer, 
  BrainCircuit, 
  FileSearch, 
  Edit3, 
  RefreshCw, 
  Frown, 
  Brain, 
  Flame,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Wind
} from 'lucide-react';
import { soundFx } from '../lib/sound';
import QuickSupport from './QuickSupport';

// Bản đồ icon và màu sắc cho từng tình huống cụ thể
const PROBLEM_ICONS = {
  '1.1': { icon: Layers, color: 'text-blue-600 bg-blue-100 border-blue-300 shadow-[0_3px_0_#93c5fd]', tag: 'Quá tải bài tập' },
  '1.2': { icon: HelpCircle, color: 'text-indigo-600 bg-indigo-100 border-indigo-300 shadow-[0_3px_0_#a5b4fc]', tag: 'Chưa hiểu đề bài' },
  '1.3': { icon: Clock, color: 'text-amber-600 bg-amber-100 border-amber-300 shadow-[0_3px_0_#fcd34d]', tag: 'Thời hạn nộp' },
  '1.4': { icon: UploadCloud, color: 'text-teal-600 bg-teal-100 border-teal-300 shadow-[0_3px_0_#5eead4]', tag: 'Cách nộp bài' },
  '1.5': { icon: Hourglass, color: 'text-orange-600 bg-orange-100 border-orange-300 shadow-[0_3px_0_#fdba74]', tag: 'Hạn làm quá ngắn' },
  '1.6': { icon: Compass, color: 'text-cyan-600 bg-cyan-100 border-cyan-300 shadow-[0_3px_0_#67e8f9]', tag: 'Chưa biết bắt đầu' },
  '1.7': { icon: Puzzle, color: 'text-purple-600 bg-purple-100 border-purple-300 shadow-[0_3px_0_#d8b4fe]', tag: 'Gặp bài tập khó' },
  '1.8': { icon: AlertTriangle, color: 'text-red-600 bg-red-100 border-red-300 shadow-[0_3px_0_#fca5a5]', tag: 'Trễ hạn nộp' },
  '1.9': { icon: Laptop, color: 'text-emerald-600 bg-emerald-100 border-emerald-300 shadow-[0_3px_0_#86efac]', tag: 'Trục trặc kỹ thuật' },
  '1.10': { icon: CalendarRange, color: 'text-blue-600 bg-blue-100 border-blue-300 shadow-[0_3px_0_#93c5fd]', tag: 'Lịch thi dày đặc' },
  '1.11': { icon: FileQuestion, color: 'text-amber-600 bg-amber-100 border-amber-300 shadow-[0_3px_0_#fcd34d]', tag: 'Chưa rõ nội dung ôn' },
  '1.12': { icon: Target, color: 'text-emerald-600 bg-emerald-100 border-emerald-300 shadow-[0_3px_0_#86efac]', tag: 'Cách ôn thi' },
  '1.13': { icon: HeartPulse, color: 'text-pink-600 bg-pink-100 border-pink-300 shadow-[0_3px_0_#f9a8d4]', tag: 'Lo âu phòng thi' },
  '1.14': { icon: Timer, color: 'text-violet-600 bg-violet-100 border-violet-300 shadow-[0_3px_0_#c4b5fd]', tag: 'Phân bổ thời gian thi' },
  '1.15': { icon: BrainCircuit, color: 'text-indigo-600 bg-indigo-100 border-indigo-300 shadow-[0_3px_0_#a5b4fc]', tag: 'Bí câu khó trong giờ thi' },
  '1.16': { icon: FileSearch, color: 'text-rose-600 bg-rose-100 border-rose-300 shadow-[0_3px_0_#fda4af]', tag: 'Điểm chưa đạt' },
  '1.17': { icon: Edit3, color: 'text-blue-600 bg-blue-100 border-blue-300 shadow-[0_3px_0_#93c5fd]', tag: 'Sửa bài sau nhận xét' },
  '1.18': { icon: RefreshCw, color: 'text-amber-600 bg-amber-100 border-amber-300 shadow-[0_3px_0_#fcd34d]', tag: 'Lịch thi thay đổi' },
  '1.19': { icon: Frown, color: 'text-purple-600 bg-purple-100 border-purple-300 shadow-[0_3px_0_#d8b4fe]', tag: 'Lo lắng chờ điểm' },
  '1.20': { icon: Brain, color: 'text-cyan-600 bg-cyan-100 border-cyan-300 shadow-[0_3px_0_#67e8f9]', tag: 'Tiếc nuối câu sai' },
  '1.21': { icon: Flame, color: 'text-red-600 bg-red-100 border-red-300 shadow-[0_3px_0_#fca5a5]', tag: 'Nhiều môn thi 1 ngày' },
};

const ITEMS_PER_PAGE = 6;

export default function TopicSelector({ 
  problems, 
  onSelectProblem,
  onOpenBreathingModal
}) {
  const [isStarted, setIsStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Phân loại danh mục
  const categorizedProblems = useMemo(() => {
    return problems.map(prob => {
      const codeNum = parseFloat(prob.Code);
      const iconMeta = PROBLEM_ICONS[prob.Code] || { 
        icon: HelpCircle, 
        color: 'text-blue-600 bg-blue-100 border-blue-300 shadow-[0_3px_0_#93c5fd]', 
        tag: 'Khó khăn học tập' 
      };

      let category = 'other';
      if ([1.1, 1.2, 1.5, 1.6, 1.7, 1.8].includes(codeNum)) {
        category = 'homework';
      } else if ([1.3, 1.4, 1.9, 1.18].includes(codeNum)) {
        category = 'submission';
      } else if ([1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.21].includes(codeNum)) {
        category = 'exam';
      } else if ([1.16, 1.17, 1.19, 1.20].includes(codeNum)) {
        category = 'mindset';
      }

      return {
        ...prob,
        category,
        IconComponent: iconMeta.icon,
        colorClass: iconMeta.color,
        tag: iconMeta.tag
      };
    });
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return categorizedProblems.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [categorizedProblems, activeCategory, searchQuery]);

  // Reset về trang 1 khi tìm kiếm hoặc đổi danh mục
  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  const handleStart = () => {
    soundFx.playChime();
    setIsStarted(true);
  };

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    soundFx.playChime();
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="py-4 sm:py-10">
      
      {/* ============================================================== */}
      {/* 1. MÀN HÌNH CHÀO ĐÓN (HERO 3D DUOLINGO KẾ THỪA TỪ FILE HTML)    */}
      {/* ============================================================== */}
      {!isStarted ? (
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-fade-in-up">

          {/* Hero Card 2 cột */}
          <div className="bg-white dark:bg-[#1c2b33] rounded-3xl border-2 border-slate-200 dark:border-[#37464f] shadow-[0_6px_0_#e2e8f0] dark:shadow-none p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
            
            {/* Cột trái: Thông điệp đồng cảm */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-[#12384a] text-blue-700 dark:text-[#1cb0f6] text-xs font-black border border-blue-200 dark:border-[#1c7aa6]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Góc nhỏ bình tâm · Không chấm điểm · Không phán xét</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#e6eef2] tracking-tight leading-tight">
                Chào bạn, hôm nay việc học của bạn thế nào?
              </h1>

              <div className="rounded-2xl bg-slate-50 dark:bg-[#243640] border-2 border-slate-200/80 dark:border-[#37464f] p-4 sm:p-5">
                <p className="text-xs sm:text-sm md:text-base font-bold text-slate-700 dark:text-[#d1e1ea] leading-relaxed italic">
                  “Bạn không cần phải giỏi ngay từ đầu. Bạn chỉ cần có một nơi giúp mình hiểu rõ hơn và tiến bộ từng ngày.”
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] leading-relaxed font-medium">
                Mắc kẹt trước một bài tập khó hay lo lắng khi nhận lại bài kiểm tra là điều rất tự nhiên. Hãy chọn nút thắt bạn đang gặp, chúng mình sẽ cùng tháo gỡ từng chút một nhé.
              </p>

              {/* 2 Nút hành động chính */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={handleStart}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-105 active:translate-y-1 text-white text-sm sm:text-base font-black shadow-[0_5px_0_#1e3a8a] active:shadow-[0_1px_0_#1e3a8a] transition-all flex items-center justify-center gap-2.5 cursor-pointer btn-3d"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Bắt đầu gỡ rối nhẹ nhàng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBreathingModal}
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-[#243640] hover:bg-slate-50 dark:hover:bg-[#2e424e] text-teal-700 dark:text-[#2dd4bf] border-2 border-teal-200 dark:border-[#0d9488] shadow-[0_4px_0_#99f6e4] dark:shadow-none font-black text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d"
                >
                  <Wind className="w-4 h-4 text-teal-600 dark:text-[#2dd4bf]" />
                  <span>Hạ nhiệt 60 giây</span>
                </button>
              </div>
            </div>

            {/* Cột phải: Minh họa SVG không gian học tập bình yên từ file HTML */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/70 to-emerald-50/70 dark:from-[#1b2b34] dark:via-[#1e303b] dark:to-[#172d28] p-5 border-2 border-blue-100 dark:border-[#37464f] shadow-inner">
                <svg viewBox="0 0 360 280" className="w-full h-auto drop-shadow-sm select-none" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Minh họa góc học tập bình yên của StudyZen">
                  {/* Khung cửa sổ ánh sáng ấm */}
                  <rect x="48" y="24" width="140" height="150" rx="20" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="3"/>
                  <line x1="118" y1="24" x2="118" y2="174" stroke="#EFF6FF" strokeWidth="3"/>
                  <line x1="48" y1="98" x2="188" y2="98" stroke="#EFF6FF" strokeWidth="3"/>
                  
                  {/* Mặt trời dịu & mây nhỏ */}
                  <circle cx="84" cy="60" r="16" fill="#FDE68A"/>
                  <path d="M132 76C132 69.3726 137.373 64 144 64C149.1 64 153.457 67.181 155.188 71.667C156.081 71.239 157.081 71 158.138 71C161.928 71 165 74.072 165 77.862C165 81.652 161.928 84.724 158.138 84.724H134.5C130.91 84.724 128 81.814 128 78.224C128 75.134 130.156 72.548 133.047 71.886" fill="#E0F2FE"/>

                  {/* Chậu cây xanh hy vọng */}
                  <rect x="235" y="138" width="46" height="42" rx="10" fill="#FDBA74"/>
                  <path d="M258 138C258 112 240 100 226 105C229 122 243 132 258 138Z" fill="#22C55E"/>
                  <path d="M258 138C258 106 278 92 294 98C290 118 275 130 258 138Z" fill="#16A34A"/>
                  <line x1="258" y1="138" x2="258" y2="90" stroke="#15803D" strokeWidth="3" strokeLinecap="round"/>

                  {/* Mặt bàn gỗ sáng */}
                  <rect x="24" y="180" width="312" height="16" rx="8" fill="#CBD5E1"/>

                  {/* Cuốn sổ mở với những dòng ghi chú nhẹ nhàng */}
                  <path d="M74 166C74 159.373 79.3726 154 86 154H152C156.418 154 160 157.582 160 162V180H74V166Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5"/>
                  <path d="M246 166C246 159.373 240.627 154 234 154H168C163.582 154 160 157.582 160 162V180H246V166Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5"/>
                  <line x1="92" y1="166" x2="142" y2="166" stroke="#BFDBFE" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="178" y1="166" x2="226" y2="166" stroke="#BBF7D0" strokeWidth="3" strokeLinecap="round"/>

                  {/* Thẻ nhắc nhở tích cực lơ lửng */}
                  <g>
                    <rect x="196" y="34" width="132" height="46" rx="14" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="2.5"/>
                    <circle cx="218" cy="57" r="10" fill="#F3E8FF"/>
                    <path d="M214 57L217 60L223 54" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="236" y="49" width="74" height="6" rx="3" fill="#CBD5E1"/>
                    <rect x="236" y="61" width="52" height="6" rx="3" fill="#E2E8F0"/>
                  </g>

                  {/* Nhãn thông điệp dưới bàn */}
                  <rect x="78" y="214" width="204" height="38" rx="19" fill="#EFF6FF"/>
                  <circle cx="102" cy="233" r="6" fill="#2563EB"/>
                  <text x="116" y="238" fill="#1E40AF" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="700">Từng bước nhỏ, vững vàng hơn</text>
                </svg>
              </div>
            </div>

          </div>

          {/* 3 Cam kết */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left max-w-4xl mx-auto pt-4 border-t-2 border-slate-200/70 dark:border-[#37464f] px-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#1c2b33] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
              <div className="flex items-center gap-2 text-blue-600 dark:text-[#1cb0f6] font-black text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" /> 21 Tình huống thực tế
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8fa5b1] font-medium leading-relaxed">
                Được tổng hợp từ các bài tập, kỳ thi và tâm lý thực tế của học sinh.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1c2b33] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" /> Cây quyết định thông minh
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8fa5b1] font-medium leading-relaxed">
                Phân nhánh từng bước giúp bạn hiểu rõ vấn đề và có giải pháp vi mô ngay.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#1c2b33] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-black text-sm mb-1">
                <ShieldCheck className="w-4 h-4" /> Riêng tư & Hoàn toàn 0đ
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8fa5b1] font-medium leading-relaxed">
                Không cần tạo tài khoản hay đăng nhập, giao diện thân thiện, âm thanh thư giãn.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* ============================================================== */
        /* 2. DANH SÁCH TÌNH HUỐNG (DUOLINGO 3D + PHÂN TRANG 6 VẤN ĐỀ)     */
        /* ============================================================== */
        <div className="animate-fade-in-up pb-16 sm:pb-8">
          
          {/* Header danh sách + NÚT QUAY LẠI TRANG GIỚI THIỆU THIẾT KẾ ĐẸP 3D */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 px-3">
            
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={() => {
                  soundFx.playBack();
                  setIsStarted(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1c2b33] text-slate-700 dark:text-[#e6eef2] hover:text-blue-600 dark:hover:text-[#1cb0f6] border-2 border-slate-200 dark:border-[#37464f] hover:border-blue-300 dark:hover:border-[#1cb0f6] shadow-[0_3px_0_#e2e8f0] dark:shadow-[0_3px_0_#243640] text-xs sm:text-sm font-bold transition-all cursor-pointer btn-3d"
              >
                <ArrowLeft className="w-4 h-4 text-slate-400" />
                <span>Quay lại trang giới thiệu</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-[#e6eef2] tracking-tight">
              Chọn vấn đề bạn đang cần <span className="text-blue-600 dark:text-[#1cb0f6]">tháo gỡ</span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] font-medium">
              Chọn tình huống gần nhất với hoàn cảnh hiện tại của bạn:
            </p>

            {/* Ô tìm kiếm */}
            <div className="mt-5 relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Tìm nhanh (quá nhiều bài, hạn nộp gấp, sợ thi...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-[#1c2b33] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none text-slate-900 dark:text-[#e6eef2] focus:outline-hidden focus:border-blue-500 text-sm font-semibold transition-all"
              />
            </div>

            {/* Phân loại Pills phong cách 3D Duolingo */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-5">
              {[
                { id: 'all', label: 'Tất cả (21)' },
                { id: 'homework', label: 'Bài tập (6)' },
                { id: 'submission', label: 'Nộp bài (4)' },
                { id: 'exam', label: 'Kiểm tra (7)' },
                { id: 'mindset', label: 'Tâm lý (4)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playChime();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-black transition-all cursor-pointer btn-3d ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-[0_3px_0_#1d4ed8]'
                      : 'bg-white dark:bg-[#1c2b33] text-slate-600 dark:text-[#8fa5b1] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none hover:bg-slate-50 dark:hover:bg-[#243640]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid danh sách: Đúng 6 vấn đề mỗi trang (3D Duolingo Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-3 sm:px-4">
            {paginatedProblems.map((prob) => {
              const Icon = prob.IconComponent;
              const isExpanded = expandedId === prob.Id;

              return (
                <div
                  key={prob.Id}
                  className={`card-3d p-4 sm:p-6 flex flex-col justify-between ${
                    isExpanded ? 'border-blue-400 dark:border-[#1cb0f6] shadow-[0_5px_0_#93c5fd] dark:shadow-none' : ''
                  }`}
                >
                  <div>
                    {/* Header Card: Icon tròn 3D + Tag danh mục */}
                    <div className="flex items-center justify-between gap-2.5 mb-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 ${prob.colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-xl text-[11px] font-black uppercase tracking-wide bg-slate-100 dark:bg-[#243640] text-slate-700 dark:text-[#8fa5b1] border border-slate-200 dark:border-[#37464f]">
                          {prob.tag}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold text-slate-400 dark:text-[#6a808c]">
                        {prob.Branches?.length || 0} hướng gỡ
                      </span>
                    </div>

                    {/* FULL TIÊU ĐỀ KHÔNG CẮT BỚT */}
                    <h3 className="font-black text-slate-900 dark:text-[#e6eef2] text-base sm:text-lg leading-snug">
                      {prob.Title}
                    </h3>

                    {/* Bấm vào để xem chi tiết mô tả */}
                    <div className="mt-3">
                      <button
                        onClick={(e) => toggleExpand(e, prob.Id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-[#1cb0f6] hover:text-blue-800 dark:hover:text-[#38bdf8] transition-colors py-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" /> Thu gọn mô tả
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" /> Bấm để xem chi tiết hoàn cảnh
                          </>
                        )}
                      </button>

                      {/* Chi tiết mô tả xổ xuống */}
                      {isExpanded && (
                        <div className="mt-2.5 p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 dark:bg-[#12384a]/60 border-2 border-blue-200 dark:border-[#1c7aa6]/50 text-slate-700 dark:text-[#d1e1ea] text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-in fade-in duration-200 font-medium">
                          {prob.Intro || "Hướng dẫn phân nhánh giúp bạn giải quyết từng bước cụ thể."}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút Bắt đầu gỡ rối 3D kiểu Duolingo */}
                  <div className="mt-5 pt-3.5 border-t-2 border-slate-100 dark:border-[#2b3c46] flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400 dark:text-[#6a808c] font-bold hidden sm:inline">
                      Giải pháp từng bước
                    </span>
                    <button
                      onClick={() => onSelectProblem(prob)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-blue-600 hover:brightness-105 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#1d4ed8] border-2 border-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d"
                    >
                      <span>Bắt đầu gỡ rối này</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BỘ ĐIỀU KHIỂN PHÂN TRANG (3D CONTROLS) */}
          {totalPages > 1 && (
            <div className="mt-8 sm:mt-10 mx-3 sm:mx-4 px-4 py-3.5 bg-white dark:bg-[#1c2b33] rounded-2xl border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa5b1] font-bold">
                Hiển thị <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProblems.length)}</strong> / <strong>{filteredProblems.length}</strong> tình huống
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundFx.playBack();
                    setCurrentPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 340, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border-2 border-slate-200 dark:border-[#37464f] text-slate-700 dark:text-[#e6eef2] bg-white dark:bg-[#243640] shadow-[0_2px_0_#e2e8f0] dark:shadow-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer btn-3d"
                  title="Trang trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      soundFx.playChime();
                      setCurrentPage(num);
                      window.scrollTo({ top: 340, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-black transition-all cursor-pointer btn-3d ${
                      currentPage === num
                        ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-[0_3px_0_#1d4ed8]'
                        : 'bg-white dark:bg-[#243640] text-slate-700 dark:text-[#e6eef2] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_2px_0_#e2e8f0] dark:shadow-none hover:bg-slate-50 dark:hover:bg-[#2e424e]'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => {
                    soundFx.playChime();
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 340, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border-2 border-slate-200 dark:border-[#37464f] text-slate-700 dark:text-[#e6eef2] bg-white dark:bg-[#243640] shadow-[0_2px_0_#e2e8f0] dark:shadow-none disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer btn-3d"
                  title="Trang sau"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {filteredProblems.length === 0 && (
            <div className="text-center py-12 text-slate-500 dark:text-[#8fa5b1]">
              <p className="text-base font-bold">Không tìm thấy tình huống nào với từ khóa này.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 px-4 py-2 rounded-xl bg-blue-50 dark:bg-[#12384a] text-sm text-blue-600 dark:text-[#1cb0f6] border border-blue-200 dark:border-[#1c7aa6] font-bold cursor-pointer"
              >
                Xem lại toàn bộ 21 tình huống
              </button>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 3. KHU VỰC HỖ TRỢ NHANH (3 TAB FAQ, MẸO HỌC, CHẠM CẢM XÚC)      */}
      {/* ============================================================== */}
      <QuickSupport onOpenBreathModal={onOpenBreathingModal} />

    </div>
  );
}
