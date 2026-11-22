import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
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
  '1.1': { icon: Layers, color: 'text-blue-600 bg-blue-100/70 border-blue-200', tag: 'Quá tải bài tập' },
  '1.2': { icon: HelpCircle, color: 'text-indigo-600 bg-indigo-100/70 border-indigo-200', tag: 'Chưa hiểu đề bài' },
  '1.3': { icon: Clock, color: 'text-amber-600 bg-amber-100/70 border-amber-200', tag: 'Thời hạn nộp' },
  '1.4': { icon: UploadCloud, color: 'text-teal-600 bg-teal-100/70 border-teal-200', tag: 'Cách nộp bài' },
  '1.5': { icon: Hourglass, color: 'text-orange-600 bg-orange-100/70 border-orange-200', tag: 'Hạn làm quá ngắn' },
  '1.6': { icon: Compass, color: 'text-cyan-600 bg-cyan-100/70 border-cyan-200', tag: 'Chưa biết bắt đầu' },
  '1.7': { icon: Puzzle, color: 'text-purple-600 bg-purple-100/70 border-purple-200', tag: 'Gặp bài tập khó' },
  '1.8': { icon: AlertTriangle, color: 'text-red-600 bg-red-100/70 border-red-200', tag: 'Trễ hạn nộp' },
  '1.9': { icon: Laptop, color: 'text-emerald-600 bg-emerald-100/70 border-emerald-200', tag: 'Trục trặc kỹ thuật' },
  '1.10': { icon: CalendarRange, color: 'text-blue-600 bg-blue-100/70 border-blue-200', tag: 'Lịch thi dày đặc' },
  '1.11': { icon: FileQuestion, color: 'text-amber-600 bg-amber-100/70 border-amber-200', tag: 'Chưa rõ nội dung ôn' },
  '1.12': { icon: Target, color: 'text-emerald-600 bg-emerald-100/70 border-emerald-200', tag: 'Cách ôn thi' },
  '1.13': { icon: HeartPulse, color: 'text-pink-600 bg-pink-100/70 border-pink-200', tag: 'Lo âu phòng thi' },
  '1.14': { icon: Timer, color: 'text-violet-600 bg-violet-100/70 border-violet-200', tag: 'Phân bổ thời gian thi' },
  '1.15': { icon: BrainCircuit, color: 'text-indigo-600 bg-indigo-100/70 border-indigo-200', tag: 'Bí câu khó trong giờ thi' },
  '1.16': { icon: FileSearch, color: 'text-rose-600 bg-rose-100/70 border-rose-200', tag: 'Điểm chưa đạt' },
  '1.17': { icon: Edit3, color: 'text-blue-600 bg-blue-100/70 border-blue-200', tag: 'Sửa bài sau nhận xét' },
  '1.18': { icon: RefreshCw, color: 'text-amber-600 bg-amber-100/70 border-amber-200', tag: 'Lịch thi thay đổi' },
  '1.19': { icon: Frown, color: 'text-purple-600 bg-purple-100/70 border-purple-200', tag: 'Lo lắng chờ điểm' },
  '1.20': { icon: Brain, color: 'text-cyan-600 bg-cyan-100/70 border-cyan-200', tag: 'Tiếc nuối câu sai' },
  '1.21': { icon: Flame, color: 'text-red-600 bg-red-100/70 border-red-200', tag: 'Nhiều môn thi 1 ngày' },
};

export default function TopicSelector({ 
  problems, 
  onSelectProblem, 
  studentInfo, 
  onOpenStudentModal 
}) {
  // Trạng thái đã bấm "Gỡ rối cùng mình nhé" hay chưa
  const [isStarted, setIsStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null); // ID trường hợp đang xem chi tiết mô tả

  // Phân loại danh mục
  const categorizedProblems = useMemo(() => {
    return problems.map(prob => {
      const codeNum = parseFloat(prob.Code);
      const iconMeta = PROBLEM_ICONS[prob.Code] || { 
        icon: HelpCircle, 
        color: 'text-blue-600 bg-blue-100/70 border-blue-200', 
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

  // Xử lý khi bấm nút "Gỡ rối cùng mình nhé"
  const handleStart = () => {
    soundFx.playChime();
    setIsStarted(true);
    if (!studentInfo) {
      onOpenStudentModal();
    }
  };

  const toggleExpand = (e, id) => {
    e.stopPropagation();
    soundFx.playChime();
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="py-6 sm:py-10">
      
      {/* ============================================================== */}
      {/* 1. MÀN HÌNH CHÀO ĐÓN (HERO SECTION VỚI NÚT 'GỠ RỐI CÙNG MÌNH NHÉ') */}
      {/* ============================================================== */}
      {!isStarted ? (
        <div className="max-w-4xl mx-auto text-center px-4 py-8 sm:py-16 animate-fade-in-up">
          
          {studentInfo && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200/80 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Chào mừng bạn <strong>{studentInfo.name}</strong> ({studentInfo.gradeClass} - {studentInfo.school})</span>
              <button 
                onClick={onOpenStudentModal}
                className="underline text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
              >
                Đổi
              </button>
            </div>
          )}

          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-8 animate-float">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-white/20 text-white" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
            Gỡ Rối Áp Lực <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Đồng Hành Cùng Học Sinh
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Áp lực bài tập, thời hạn gấp gáp hay nỗi sợ điểm kém? Bạn không phải chịu đựng một mình. Mọi rắc rối đều có nút thắt và từng bước tháo gỡ nhẹ nhàng.
          </p>

          {/* Nút to 'Gỡ rối cùng mình nhé' */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base sm:text-lg font-bold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer animate-glow"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Gỡ rối cùng mình nhé ✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Cam kết */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto pt-8 border-t border-slate-200/60">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" /> 21 Tình huống thực tế
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Được tổng hợp từ các bài tập, kỳ thi và tâm lý thực tế của học sinh.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4" /> Cây quyết định thông minh
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Phân nhánh từng câu hỏi giúp bạn làm rõ vấn đề và có giải pháp vi mô ngay.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mb-1">
                <ShieldCheck className="w-4 h-4" /> Riêng tư & Hoàn toàn 0đ
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Không thu thập dữ liệu nhạy cảm, giao diện thân thiện, âm thanh thư giãn.
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* ============================================================== */
        /* 2. DANH SÁCH 21 TRƯỜNG HỢP (HIỂN THỊ FULL TIÊU ĐỀ + XEM MÔ TẢ) */
        /* ============================================================== */
        <div className="animate-fade-in-up">
          
          {/* Header danh sách */}
          <div className="text-center max-w-3xl mx-auto mb-8 px-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={() => setIsStarted(false)}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline cursor-pointer"
              >
                ← Quay lại trang giới thiệu
              </button>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Chọn vấn đề bạn đang cần được <span className="text-blue-600">tháo gỡ</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Hãy chọn tình huống gần nhất với hoàn cảnh hiện tại của bạn:
            </p>

            {/* Ô tìm kiếm */}
            <div className="mt-6 relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Tìm nhanh tình huống (quá nhiều bài, hạn nộp gấp, sợ thi, bị điểm kém...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base transition-all"
              />
            </div>

            {/* Phân loại Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {[
                { id: 'all', label: 'Tất cả 21 tình huống' },
                { id: 'homework', label: 'Quản lý bài tập (6)' },
                { id: 'submission', label: 'Thời hạn & Nộp bài (4)' },
                { id: 'exam', label: 'Kỳ thi & Kiểm tra (7)' },
                { id: 'mindset', label: 'Tâm lý & Sau thi (4)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid danh sách 21 trường hợp - FULL TIÊU ĐỀ + XEM CHI TIẾT MÔ TẢ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
            {filteredProblems.map((prob) => {
              const Icon = prob.IconComponent;
              const isExpanded = expandedId === prob.Id;

              return (
                <div
                  key={prob.Id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between shadow-2xs hover:shadow-lg ${
                    isExpanded ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200/90 hover:border-blue-300'
                  }`}
                >
                  <div>
                    {/* Header Card: Icon trực quan + Nhãn phân loại (Không còn chữ "Bộ câu") */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${prob.colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
                          {prob.tag}
                        </span>
                      </div>

                      <span className="text-xs text-slate-400 font-medium">
                        {prob.Branches?.length || 0} hướng tháo gỡ
                      </span>
                    </div>

                    {/* FULL TIÊU ĐỀ KHÔNG CẮT BỚT */}
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                      {prob.Title}
                    </h3>

                    {/* Nút bấm để xem chi tiết mô tả */}
                    <div className="mt-3">
                      <button
                        onClick={(e) => toggleExpand(e, prob.Id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors py-1 cursor-pointer"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-4 h-4" /> Thu gọn mô tả
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" /> Bấm để xem chi tiết mô tả hoàn cảnh
                          </>
                        )}
                      </button>

                      {/* Chi tiết mô tả xổ xuống khi bấm xem */}
                      {isExpanded && (
                        <div className="mt-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                          {prob.Intro || "Hướng dẫn phân nhánh giúp bạn giải quyết từng bước cụ thể."}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nút Bắt đầu gỡ rối */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Có giải pháp vi mô
                    </span>
                    <button
                      onClick={() => onSelectProblem(prob)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Bắt đầu gỡ rối này</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-base font-medium">Không tìm thấy tình huống nào với từ khóa này.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 px-4 py-2 rounded-xl bg-slate-100 text-sm text-blue-600 hover:bg-slate-200 font-semibold"
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
