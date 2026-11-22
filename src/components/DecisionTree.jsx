import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  Copy, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { soundFx } from '../lib/sound';
import { getRandomQuote } from '../lib/motivationalQuotes';
import { saveStudentSession } from '../lib/supabase';

export default function DecisionTree({ 
  problem, 
  studentInfo, 
  onBackToTopics 
}) {
  // currentStep: 1 (Câu hỏi cấp 1) -> 2 (Câu hỏi cấp 2) -> 3 (Xem giải pháp)
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [encouragement, setEncouragement] = useState('');
  const [copied, setCopied] = useState(false);

  // Cuộn lên đầu trang khi đổi bước
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Nhánh Level 1 đang chọn
  const currentBranch = selectedBranchIndex !== null ? problem.Branches[selectedBranchIndex] : null;

  // Giải pháp Level 2 đang chọn
  const currentSolution = (currentBranch && selectedSubIndex !== null && currentBranch.Solutions)
    ? currentBranch.Solutions[selectedSubIndex] || currentBranch.Solutions[0]
    : (currentBranch?.Solutions?.[0] || null);

  // Chọn ở bước 1
  const handleSelectRootOption = (optionIndex) => {
    soundFx.playChime();
    setSelectedBranchIndex(optionIndex);
    setSelectedSubIndex(null);
    setEncouragement(getRandomQuote());
    setCurrentStep(2);
  };

  // Chọn ở bước 2
  const handleSelectSubOption = (subIndex) => {
    soundFx.playSuccess();
    setSelectedSubIndex(subIndex);
    setEncouragement(getRandomQuote());
    setCurrentStep(3);

    // Bắn pháo hoa confetti chúc mừng
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });

    // Lưu phiên thống kê vào Supabase / LocalStorage
    saveStudentSession({
      student_name: studentInfo?.name || 'Ẩn danh',
      grade_class: studentInfo?.gradeClass || 'Chưa rõ',
      school_name: studentInfo?.school || 'Chưa rõ',
      problem_id: problem.Code,
      problem_title: problem.Title,
      selected_branches: {
        step1: problem.Options[selectedBranchIndex]?.Text || '',
        step2: currentBranch?.SubOptions[subIndex]?.Text || '',
        solution_title: currentBranch?.Solutions?.[subIndex]?.Title || ''
      }
    });
  };

  // Quay lại bước trước
  const handleGoBack = () => {
    soundFx.playBack();
    if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedBranchIndex(null);
    } else {
      onBackToTopics();
    }
  };

  // Sao chép nội dung giải pháp
  const handleCopySolution = () => {
    if (!currentSolution) return;
    const textToCopy = `[GỠ RỐI HỌC TẬP - ${problem.Title}]\n${currentSolution.Title}\n\n${currentSolution.Guide}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <button
          onClick={onBackToTopics}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-medium transition-colors shadow-2xs"
        >
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <span>Đổi vấn đề khác</span>
        </button>
      </div>

      {/* Breadcrumb Steps Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </span>
            <span className={currentStep === 1 ? 'font-bold text-slate-900' : ''}>Khó khăn chính</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </span>
            <span className={currentStep === 2 ? 'font-bold text-slate-900' : ''}>Chi tiết tình huống</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </span>
            <span className={currentStep === 3 ? 'font-bold text-slate-900' : ''}>Hướng gỡ rối</span>
          </div>
        </div>
      </div>

      {/* Lời động viên nổi bật sau khi chọn */}
      {encouragement && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/80 flex items-start gap-3 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">Lời nhắn nhủ gửi bạn ✨</div>
            <p className="text-xs sm:text-sm text-amber-900 font-medium mt-0.5 leading-relaxed">
              "{encouragement}"
            </p>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 1: CÂU HỎI CẤP 1 ======================= */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Vấn Đề */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <div className="inline-block px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-3">
              Bộ câu {problem.Code}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {problem.Title}
            </h2>
            {problem.Intro && (
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line border-l-3 border-blue-500 pl-4 py-1 bg-slate-50/60 rounded-r-xl">
                {problem.Intro}
              </p>
            )}
          </div>

          {/* Câu hỏi cấp 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              {problem.RootQuestion || "Điều nào đang làm em khó xử nhất lúc này?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Em chỉ cần chọn một điều quan trọng nhất trước. Sau khi giải quyết xong, em luôn có thể quay lại xem tiếp.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {problem.Options?.map((opt, idx) => (
                <button
                  key={opt.Index || idx}
                  onClick={() => handleSelectRootOption(idx)}
                  className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/50 transition-all duration-150 flex items-center justify-between group cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shrink-0 shadow-2xs">
                      {opt.Index || (idx + 1)}
                    </span>
                    <span className="font-medium text-slate-800 group-hover:text-blue-900 text-sm sm:text-base leading-snug">
                      {opt.Text}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 2: CÂU HỎI CẤP 2 ======================= */}
      {currentStep === 2 && currentBranch && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Đang xem xét
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentBranch.BranchTitle || currentBranch.OptionText}
            </h2>
            {currentBranch.Intro && (
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line border-l-3 border-indigo-500 pl-4 py-1 bg-slate-50/60 rounded-r-xl">
                {currentBranch.Intro}
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              {currentBranch.Question || "Điều gì làm em băn khoăn hoặc khó chịu nhất lúc này?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Chọn tình huống gần nhất với cảm xúc của em để nhận gợi ý hành động cụ thể nhé:
            </p>

            <div className="grid grid-cols-1 gap-3">
              {(currentBranch.SubOptions && currentBranch.SubOptions.length > 0) ? (
                currentBranch.SubOptions.map((subOpt, sIdx) => (
                  <button
                    key={subOpt.Index || sIdx}
                    onClick={() => handleSelectSubOption(sIdx)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200/90 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/50 transition-all duration-150 flex items-center justify-between group cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-sm text-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors shrink-0 shadow-2xs">
                        {subOpt.Index || (sIdx + 1)}
                      </span>
                      <span className="font-medium text-slate-800 group-hover:text-indigo-900 text-sm sm:text-base leading-snug">
                        {subOpt.Text}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))
              ) : (
                /* Nếu không có SubOptions riêng, chuyển thẳng đến xem giải pháp */
                <div className="text-center py-6">
                  <p className="text-slate-600 text-sm mb-4">Nhánh này có ngay các bước gợi ý cho em:</p>
                  <button
                    onClick={() => handleSelectSubOption(0)}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-500/20"
                  >
                    Xem ngay hướng dẫn giải quyết ✨
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 3: KẾT QUẢ & GIẢI PHÁP HÀNH ĐỘNG ======================= */}
      {currentStep === 3 && currentSolution && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Solution Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-emerald-200/80 shadow-lg shadow-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Giải pháp gỡ rối phù hợp với bạn</span>
              </div>

              <button
                onClick={handleCopySolution}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Đã lưu!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lưu gợi ý</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {currentSolution.Title}
            </h2>

            {/* Chi tiết các bước gỡ rối */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Các bước hành động cụ thể (Micro-actions):
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/70">
                {currentSolution.Guide}
              </div>
            </div>

            {/* Lưu ý an toàn & Đồng hành */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-blue-900 leading-relaxed">
                <strong>Nhắn nhủ từ thầy cô:</strong> Bạn không phải chịu đựng áp lực một mình. Nếu sau khi thử các bước trên mà bạn vẫn thấy căng thẳng hoặc bối rối, hãy tìm đến thầy cô bộ môn, cán bộ tư vấn tâm lý học đường hoặc người thân để được hỗ trợ trực tiếp nhé.
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleGoBack}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium transition-colors"
              >
                ⬅️ Xem tình huống khác trong mục này
              </button>

              <button
                onClick={onBackToTopics}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 text-pink-300" />
                <span>Tôi đã ổn, quay lại trang chủ</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
