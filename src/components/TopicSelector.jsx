import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Send, Clock, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';

export default function TopicSelector({ problems, onSelectProblem, studentInfo, onOpenStudentModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Phân loại 21 bộ câu theo danh mục
  const categorizedProblems = useMemo(() => {
    return problems.map(prob => {
      const codeNum = parseFloat(prob.Code);
      let category = 'other';
      let icon = BookOpen;
      let tag = 'Học tập';
      let colorClass = 'bg-blue-50 text-blue-700 border-blue-200';

      if ([1.1, 1.2, 1.5, 1.6, 1.7, 1.8].includes(codeNum)) {
        category = 'homework';
        icon = BookOpen;
        tag = 'Quản lý bài tập';
        colorClass = 'bg-blue-50 text-blue-700 border-blue-200';
      } else if ([1.3, 1.4, 1.9, 1.18].includes(codeNum)) {
        category = 'submission';
        icon = Send;
        tag = 'Thời hạn & Nộp bài';
        colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
      } else if ([1.10, 1.11, 1.12, 1.13, 1.14, 1.15, 1.21].includes(codeNum)) {
        category = 'exam';
        icon = Clock;
        tag = 'Kỳ thi & Kiểm tra';
        colorClass = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      } else if ([1.16, 1.17, 1.19, 1.20].includes(codeNum)) {
        category = 'mindset';
        icon = HeartHandshake;
        tag = 'Tâm lý & Hậu kiểm tra';
        colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      }

      return {
        ...prob,
        category,
        IconComponent: icon,
        categoryTag: tag,
        colorClass
      };
    });
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return categorizedProblems.filter(p => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = p.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.Code.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [categorizedProblems, activeCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12">
      
      {/* Hero Welcome */}
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        {studentInfo && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium border border-blue-200/60 mb-4 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Xin chào, <strong>{studentInfo.name}</strong> ({studentInfo.gradeClass} - {studentInfo.school})</span>
            <button 
              onClick={onOpenStudentModal}
              className="underline text-blue-600 hover:text-blue-800 ml-1 cursor-pointer"
            >
              Đổi
            </button>
          </div>
        )}
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Hôm nay điều gì đang làm bạn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">bối rối nhất?</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Đừng giữ lo lắng một mình. Hãy chọn vấn đề bạn đang đối mặt để cùng mở từng nút thắt và tìm ra hướng giải quyết phù hợp nhất.
        </p>

        {/* Search Bar */}
        <div className="mt-8 relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm vấn đề (ví dụ: quá nhiều bài, sợ thi, nộp bài muộn...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm sm:text-base transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'Tất cả vấn đề', count: 21 },
            { id: 'homework', label: 'Quản lý bài tập', count: 6 },
            { id: 'submission', label: 'Thời hạn & Nộp bài', count: 4 },
            { id: 'exam', label: 'Kỳ thi & Kiểm tra', count: 7 },
            { id: 'mindset', label: 'Tâm lý học đường', count: 4 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
        {filteredProblems.map((prob) => {
          const Icon = prob.IconComponent;
          return (
            <div
              key={prob.Id}
              onClick={() => onSelectProblem(prob)}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-400 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${prob.colorClass}`}>
                    Bộ câu {prob.Code}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Icon className="w-3.5 h-3.5" />
                    {prob.categoryTag}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-base sm:text-lg group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {prob.Title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed">
                  {prob.Intro || "Hướng dẫn phân nhánh giúp bạn gỡ rối từng bước..."}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{prob.Branches?.length || 0} hướng tháo gỡ</span>
                <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Bắt đầu gỡ rối <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-base">Không tìm thấy vấn đề phù hợp với từ khóa của bạn.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="mt-3 text-sm text-blue-600 underline font-medium"
          >
            Xem lại tất cả
          </button>
        </div>
      )}

    </div>
  );
}
