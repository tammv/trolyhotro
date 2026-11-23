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
  Heart,
  Star,
  MessageSquare,
  Send
} from 'lucide-react';
import { soundFx } from '../lib/sound';
import { getRandomQuote } from '../lib/motivationalQuotes';
import { saveStudentSession, saveStudentFeedback } from '../lib/supabase';

export default function DecisionTree({ 
  problem, 
  onBackToTopics 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(null);
  const [encouragement, setEncouragement] = useState('');
  const [copied, setCopied] = useState(false);

  // Trạng thái đánh giá & góp ý
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Cuộn lên đầu khi đổi bước
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const currentBranch = selectedBranchIndex !== null ? problem.Branches[selectedBranchIndex] : null;

  const currentSolution = (currentBranch && selectedSubIndex !== null && currentBranch.Solutions)
    ? currentBranch.Solutions[selectedSubIndex] || currentBranch.Solutions[0]
    : (currentBranch?.Solutions?.[0] || null);

  const handleSelectRootOption = (optionIndex) => {
    soundFx.playChime();
    setSelectedBranchIndex(optionIndex);
    setSelectedSubIndex(null);
    setEncouragement(getRandomQuote());
    setCurrentStep(2);
  };

  const handleSelectSubOption = (subIndex) => {
    soundFx.playSuccess();
    setSelectedSubIndex(subIndex);
    setEncouragement(getRandomQuote());
    setCurrentStep(3);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });

    saveStudentSession({
      student_name: 'Học sinh',
      grade_class: 'Chung',
      school_name: 'Trường học',
      problem_id: problem.Code,
      problem_title: problem.Title,
      selected_branches: {
        step1: problem.Options[selectedBranchIndex]?.Text || '',
        step2: currentBranch?.SubOptions[subIndex]?.Text || '',
        solution_title: currentBranch?.Solutions?.[subIndex]?.Title || ''
      }
    });
  };

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

  const handleCopySolution = () => {
    if (!currentSolution) return;
    const textToCopy = `[GỠ RỐI HỌC TẬP - ${problem.Title}]\n${currentSolution.Title}\n\n${currentSolution.Guide}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);
    soundFx.playSuccess();
    try {
      await saveStudentFeedback({
        student_name: 'Học sinh',
        grade_class: 'Chung',
        school_name: 'Trường học',
        problem_id: problem.Code,
        problem_title: problem.Title,
        rating,
        comment: comment.trim()
      });
      setIsFeedbackSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  // Tính % tiến trình 3D Candy Bar
  const progressPercent = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4 pb-20 sm:pb-8">
      
      {/* Top Navigation Bar 3D */}
      <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 shadow-[0_3px_0_#e2e8f0] text-xs sm:text-sm font-bold transition-all cursor-pointer btn-3d"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <button
          onClick={onBackToTopics}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 shadow-[0_3px_0_#e2e8f0] text-xs sm:text-sm font-bold transition-all cursor-pointer btn-3d"
        >
          <RotateCcw className="w-4 h-4 text-blue-600" />
          <span>Đổi vấn đề</span>
        </button>
      </div>

      {/* THANH TIẾN TRÌNH 3D CANDY PROGRESS BAR (DUOLINGO STYLE) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0] mb-5">
        <div className="flex items-center justify-between text-xs sm:text-sm font-black text-slate-600 mb-2.5">
          <span>Tiến trình gỡ rối</span>
          <span className="text-blue-600">Bước {currentStep} / 3</span>
        </div>
        
        {/* Thanh 3D lõm sâu */}
        <div className="bar-3d-container">
          <div 
            className="bar-3d-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-3 gap-1 text-[11px] font-bold text-center mt-2.5 text-slate-400">
          <span className={currentStep >= 1 ? 'text-blue-600 font-black' : ''}>1. Khó khăn chính</span>
          <span className={currentStep >= 2 ? 'text-blue-600 font-black' : ''}>2. Chi tiết hoàn cảnh</span>
          <span className={currentStep >= 3 ? 'text-emerald-600 font-black' : ''}>3. Hướng gỡ rối</span>
        </div>
      </div>

      {/* Lời động viên nổi bật */}
      {encouragement && (
        <div className="mb-5 p-4 rounded-3xl bg-amber-50 border-2 border-amber-200 shadow-[0_3px_0_#fde68a] flex items-start gap-3 animate-in fade-in duration-300">
          <div className="p-2 rounded-2xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-amber-800">Lời nhắn nhủ gửi bạn ✨</div>
            <p className="text-xs sm:text-sm text-amber-950 font-bold mt-0.5 leading-relaxed">
              "{encouragement}"
            </p>
          </div>
        </div>
      )}

      {/* ======================= BƯỚC 1: CÂU HỎI CẤP 1 ======================= */}
      {currentStep === 1 && (
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-black border border-blue-200 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Tình huống bạn chọn</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {problem.Title}
            </h2>
            {problem.Intro && (
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line border-l-4 border-blue-500 pl-3.5 py-1 bg-slate-50 rounded-r-xl font-medium">
                {problem.Intro}
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0]">
            <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
              {problem.RootQuestion || "Điều nào đang làm bạn khó xử nhất lúc này?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium">
              Chỉ cần chọn một điều quan trọng nhất trước. Sau khi giải quyết xong bạn luôn có thể xem tiếp.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {problem.Options?.map((opt, idx) => (
                <button
                  key={opt.Index || idx}
                  onClick={() => handleSelectRootOption(idx)}
                  className="card-3d w-full text-left p-4 sm:p-5 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-black text-xs sm:text-sm text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shrink-0 shadow-[0_2px_0_#cbd5e1]">
                      {opt.Index || (idx + 1)}
                    </span>
                    <span className="font-bold text-slate-800 group-hover:text-blue-900 text-sm sm:text-base leading-snug">
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
        <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0]">
            <span className="text-[11px] font-black text-blue-600 uppercase tracking-wider block mb-1">
              Đang xem xét nhánh
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900">
              {currentBranch.BranchTitle || currentBranch.OptionText}
            </h2>
            {currentBranch.Intro && (
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line border-l-4 border-indigo-500 pl-3.5 py-1 bg-slate-50 rounded-r-xl font-medium">
                {currentBranch.Intro}
              </p>
            )}
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-slate-200 shadow-[0_4px_0_#e2e8f0]">
            <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
              {currentBranch.Question || "Điều gì làm bạn băn khoăn hoặc khó chịu nhất lúc này?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-5 font-medium">
              Chọn tình huống gần nhất với cảm xúc của bạn:
            </p>

            <div className="grid grid-cols-1 gap-3">
              {(currentBranch.SubOptions && currentBranch.SubOptions.length > 0) ? (
                currentBranch.SubOptions.map((subOpt, sIdx) => (
                  <button
                    key={subOpt.Index || sIdx}
                    onClick={() => handleSelectSubOption(sIdx)}
                    className="card-3d w-full text-left p-4 sm:p-5 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 pr-3">
                      <span className="w-8 h-8 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-black text-xs sm:text-sm text-slate-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors shrink-0 shadow-[0_2px_0_#cbd5e1]">
                        {subOpt.Index || (sIdx + 1)}
                      </span>
                      <span className="font-bold text-slate-800 group-hover:text-indigo-900 text-sm sm:text-base leading-snug">
                        {subOpt.Text}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-600 text-sm mb-4 font-bold">Nhánh này có ngay các bước gợi ý cho bạn:</p>
                  <button
                    onClick={() => handleSelectSubOption(0)}
                    className="px-6 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-[0_4px_0_#3730a3] border-2 border-indigo-600 btn-3d"
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
        <div className="space-y-5 animate-in fade-in duration-300">
          
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-emerald-300 shadow-[0_6px_0_#a7f3d0] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>

            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Giải pháp gỡ rối phù hợp</span>
              </div>

              <button
                onClick={handleCopySolution}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-slate-200 bg-white shadow-[0_2px_0_#e2e8f0] text-slate-700 text-xs font-bold transition-all cursor-pointer btn-3d"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Đã lưu!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Lưu gợi ý</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {currentSolution.Title}
            </h2>

            {/* Chi tiết các bước gỡ rối */}
            <div className="mt-5 pt-5 border-t-2 border-slate-100">
              <div className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-wider mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" /> Các bước hành động cụ thể (Micro-actions):
              </div>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line bg-slate-50 p-4 sm:p-6 rounded-2xl border-2 border-slate-200 font-medium">
                {currentSolution.Guide}
              </div>
            </div>

            {/* Lưu ý an toàn & Đồng hành */}
            <div className="mt-5 p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                <strong>Nhắn nhủ từ thầy cô:</strong> Bạn không phải chịu đựng áp lực một mình. Nếu sau khi thử các bước trên mà vẫn thấy căng thẳng hoặc bối rối, hãy tìm đến thầy cô bộ môn, cán bộ tư vấn tâm lý học đường hoặc người thân để được hỗ trợ trực tiếp nhé.
              </div>
            </div>

            {/* KHẢO SÁT ĐỘ HÀI LÒNG & GÓP Ý PHONG CÁCH 3D DUOLINGO */}
            <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 border-2 border-blue-200 shadow-[0_3px_0_#bfdbfe]">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-[0_2px_0_#1d4ed8]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base">
                    Đánh Giá Độ Hài Lòng & Góp Ý
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Hướng dẫn này có giúp bạn cảm thấy nhẹ nhõm hơn không?
                  </p>
                </div>
              </div>

              {!isFeedbackSubmitted ? (
                <form onSubmit={handleSubmitFeedback} className="space-y-4 mt-3">
                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-2">
                      Mức độ hài lòng của bạn:
                    </label>
                    <div className="flex flex-wrap items-center gap-2">
                      {[
                        { score: 1, label: 'Chưa ổn', emoji: '😞' },
                        { score: 2, label: 'Tàm tạm', emoji: '😐' },
                        { score: 3, label: 'Có ích chút', emoji: '🙂' },
                        { score: 4, label: 'Rất hữu ích', emoji: '😊' },
                        { score: 5, label: 'Tuyệt vời!', emoji: '🤩' },
                      ].map((item) => (
                        <button
                          key={item.score}
                          type="button"
                          onClick={() => {
                            soundFx.playChime();
                            setRating(item.score);
                          }}
                          className={`px-3 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer btn-3d ${
                            rating === item.score
                              ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-[0_3px_0_#1d4ed8] scale-105'
                              : 'bg-white text-slate-700 border-2 border-slate-200 shadow-[0_2px_0_#cbd5e1]'
                          }`}
                        >
                          <span className="text-base">{item.emoji}</span>
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Chia sẻ cảm xúc của bạn hoặc góp ý để công cụ hỗ trợ tốt hơn..."
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-white border-2 border-slate-200 focus:outline-hidden focus:border-blue-500 text-xs sm:text-sm text-slate-800 transition-all font-medium"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingFeedback}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:brightness-105 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#059669] border-2 border-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmittingFeedback ? 'Đang gửi...' : 'Gửi đánh giá & Góp ý'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-3 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-950 flex items-center gap-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div className="text-xs sm:text-sm font-bold">
                    Cảm ơn bạn đã gửi đánh giá! Chúc bạn luôn bình tĩnh, tự tin và vượt qua mọi thử thách nhé ✨
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions 3D */}
            <div className="mt-6 pt-5 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleGoBack}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-slate-200 bg-white shadow-[0_3px_0_#e2e8f0] text-slate-700 text-xs sm:text-sm font-black transition-all btn-3d"
              >
                ⬅️ Xem tình huống khác trong mục này
              </button>

              <button
                onClick={onBackToTopics}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:brightness-105 text-white font-black text-xs sm:text-sm shadow-[0_4px_0_#1d4ed8] border-2 border-blue-600 transition-all flex items-center justify-center gap-1.5 btn-3d"
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
