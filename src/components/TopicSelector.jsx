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
  CheckCircle2
} from 'lucide-react';
import { soundFx } from '../lib/sound';

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
  onSelectProblem 
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
      {/* 1. MÀN HÌNH CHÀO ĐÓN (HERO 3D DUOLINGO VỚI NÚT 'GỠ RỐI CÙNG MÌNH NHÉ') */}
      {/* ============================================================== */}
      {!isStarted ? (
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 py-6 sm:py-14 animate-fade-in-up">

          {/* Hero Avatar 3D */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white border-4 border-white shadow-[0_8px_0_#1e40af] mb-6 sm:mb-8 animate-float">
            <Heart className="w-10 h-10 sm:w-14 sm:h-14 fill-white/20 text-white" />
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-[#e6eef2] tracking-tight leading-tight">
            Gỡ Rối Áp Lực <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Đồng Hành Cùng Bạn
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 dark:text-[#8fa5b1] max-w-2xl mx-auto leading-relaxed px-2 font-medium">
            Áp lực bài tập dồn dập, hạn nộp gấp gáp hay nỗi sợ điểm số? Bạn không phải chịu đựng một mình. Mọi rắc rối đều có nút thắt và từng bước tháo gỡ nhẹ nhàng.
          </p>

          {/* Nút to 3D kiểu Duolingo 'Gỡ rối cùng mình nhé' */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-2">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-105 active:translate-y-1 text-white text-base sm:text-xl font-black shadow-[0_6px_0_#1e3a8a] active:shadow-[0_1px_0_#1e3a8a] transition-all flex items-center justify-center gap-3 cursor-pointer btn-3d"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              <span>Gỡ rối cùng mình nhé ✨</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* 3 Cam kết */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left max-w-3xl mx-auto pt-6 border-t-2 border-slate-200/70 dark:border-[#37464f] px-2">
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

    </div>
  );
}
