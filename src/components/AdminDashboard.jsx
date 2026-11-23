import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Lock, 
  Unlock, 
  X, 
  AlertCircle,
  Star,
  MessageSquare,
  Download,
  ThumbsUp,
  Smile,
  Heart
} from 'lucide-react';
import { getAllSessions, getVisitCount, getAllFeedbacks } from '../lib/supabase';

const RATING_LEVELS = [
  { score: 5, label: 'Tuyệt vời!', emoji: '🤩', color: 'bg-emerald-500' },
  { score: 4, label: 'Rất hữu ích', emoji: '😊', color: 'bg-blue-500' },
  { score: 3, label: 'Có ích chút', emoji: '🙂', color: 'bg-indigo-500' },
  { score: 2, label: 'Tàm tạm', emoji: '😐', color: 'bg-amber-500' },
  { score: 1, label: 'Chưa ổn', emoji: '😞', color: 'bg-rose-500' },
];

export default function AdminDashboard({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);

  const CORRECT_PIN = '2026';

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [visits, sess, fbs] = await Promise.all([
        getVisitCount(),
        getAllSessions(),
        getAllFeedbacks()
      ]);
      setTotalVisits(visits);
      setSessions(sess || []);
      setFeedbacks(fbs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pin.trim() === CORRECT_PIN) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Thống kê theo Vấn đề (Top problems)
  const topProblems = useMemo(() => {
    const counts = {};
    sessions.forEach(s => {
      const title = s.problem_title || (s.problem_id ? `Tình huống ${s.problem_id}` : 'Chưa xác định');
      counts[title] = (counts[title] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [sessions]);

  // Thống kê Độ hài lòng & Đánh giá
  const ratingStats = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) {
      return {
        average: '0.0',
        total: 0,
        positiveRate: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    let sum = 0;
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    feedbacks.forEach(f => {
      const r = Number(f.rating) || 5;
      sum += r;
      if (dist[r] !== undefined) dist[r]++;
      else dist[5]++;
    });

    const avg = (sum / feedbacks.length).toFixed(1);
    const positiveCount = (dist[5] || 0) + (dist[4] || 0);
    const positiveRate = Math.round((positiveCount / feedbacks.length) * 100);

    return {
      average: avg,
      total: feedbacks.length,
      positiveRate,
      distribution: dist
    };
  }, [feedbacks]);

  // Xuất file CSV danh sách góp ý
  const handleExportFeedbackCsv = () => {
    if (!feedbacks || feedbacks.length === 0) return;
    const headers = ['Thời gian', 'Mức độ', 'Điểm số', 'Vấn đề', 'Nội dung góp ý'];
    const rows = feedbacks.map(f => [
      new Date(f.created_at).toLocaleString('vi-VN'),
      f.rating === 5 ? 'Tuyệt vời' : f.rating === 4 ? 'Rất hữu ích' : f.rating === 3 ? 'Có ích chút' : f.rating === 2 ? 'Tàm tạm' : 'Chưa ổn',
      f.rating,
      `"${(f.problem_title || '').replace(/"/g, '""')}"`,
      `"${(f.comment || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gop_y_hoc_sinh_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1c2b33] w-full max-w-5xl rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-[#37464f] overflow-hidden my-auto transition-colors">
        
        {/* Header Dashboard */}
        <div className="bg-slate-900 dark:bg-[#131f24] text-white px-6 py-5 flex items-center justify-between border-b-2 border-slate-800 dark:border-[#37464f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_2px_0_#1d4ed8]">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Thống Kê Hỗ Trợ Học Sinh</h2>
              <p className="text-xs text-slate-400 font-medium">Báo cáo mức độ tương tác, độ hài lòng & góp ý</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chưa xác thực PIN (Đã xóa dòng chữ Mặc định 2026) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-[#243640] text-blue-600 dark:text-[#1cb0f6] flex items-center justify-center mx-auto mb-4 border-2 border-blue-200 dark:border-[#37464f] shadow-[0_3px_0_#bfdbfe] dark:shadow-none">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-[#e6eef2]">Bảo Mật Dành Cho Thầy Cô</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa5b1] mt-1.5 mb-6 font-medium">
              Vui lòng nhập mã PIN dành cho Thầy cô để xem số liệu thống kê.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <input
                type="password"
                placeholder="Nhập mã PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-[#37464f] bg-slate-50 dark:bg-[#243640] text-slate-900 dark:text-[#e6eef2] text-center text-lg tracking-widest font-black focus:outline-hidden focus:border-blue-500"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-rose-500 font-bold flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Mã PIN chưa chính xác. Vui lòng thử lại.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-blue-600 hover:brightness-105 text-white font-black text-sm shadow-[0_4px_0_#1d4ed8] border-2 border-blue-600 transition-all flex items-center justify-center gap-2 cursor-pointer btn-3d"
              >
                <Unlock className="w-4 h-4" /> Xác nhận mở khóa
              </button>
            </form>
          </div>
        ) : (
          /* Đã xác thực - Hiển thị Dashboard */
          <div className="p-5 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* 4 Khối KPI Cards 3D phong cách Duolingo */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Tổng lượt truy cập */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 dark:bg-[#243640] border-2 border-blue-200 dark:border-[#37464f] shadow-[0_3px_0_#bfdbfe] dark:shadow-none">
                <div className="flex items-center justify-between text-blue-700 dark:text-[#1cb0f6] mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider">Lượt truy cập</span>
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-blue-900 dark:text-[#e6eef2]">
                  {totalVisits.toLocaleString('vi-VN')}
                </div>
                <div className="text-[11px] text-blue-600 dark:text-[#8fa5b1] mt-0.5 font-medium">Lượt xem trực tiếp</div>
              </div>

              {/* Lượt gỡ rối hoàn thành */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 dark:bg-[#243640] border-2 border-indigo-200 dark:border-[#37464f] shadow-[0_3px_0_#c7d2fe] dark:shadow-none">
                <div className="flex items-center justify-between text-indigo-700 dark:text-[#a5b4fc] mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider">Đã gỡ rối</span>
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-indigo-900 dark:text-[#e6eef2]">
                  {sessions.length.toLocaleString('vi-VN')}
                </div>
                <div className="text-[11px] text-indigo-600 dark:text-[#8fa5b1] mt-0.5 font-medium">Phiên tìm thấy giải pháp</div>
              </div>

              {/* Điểm hài lòng trung bình */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-[#243640] border-2 border-amber-200 dark:border-[#37464f] shadow-[0_3px_0_#fde68a] dark:shadow-none">
                <div className="flex items-center justify-between text-amber-700 dark:text-[#f7cd46] mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider">Điểm hài lòng</span>
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-amber-900 dark:text-[#e6eef2] flex items-baseline gap-1">
                  <span>{ratingStats.average}</span>
                  <span className="text-xs text-amber-600 dark:text-[#8fa5b1] font-bold">/ 5.0</span>
                </div>
                <div className="text-[11px] text-amber-700 dark:text-[#8fa5b1] mt-0.5 font-medium">
                  {ratingStats.total} lượt đánh giá
                </div>
              </div>

              {/* Tỷ lệ phản hồi tích cực */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-[#243640] border-2 border-emerald-200 dark:border-[#37464f] shadow-[0_3px_0_#a7f3d0] dark:shadow-none">
                <div className="flex items-center justify-between text-emerald-700 dark:text-[#58cc02] mb-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider">Tỷ lệ tích cực</span>
                  <ThumbsUp className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-3xl font-black text-emerald-900 dark:text-[#e6eef2]">
                  {ratingStats.positiveRate}%
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-[#8fa5b1] mt-0.5 font-medium">Đánh giá 4⭐ & 5⭐</div>
              </div>

            </div>

            {/* Hàng 2 cột: [Top vấn đề] & [Thống kê độ hài lòng] */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Cột 1: Top vấn đề học sinh hay gặp khó khăn nhất */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#243640] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-[#e6eef2] text-sm sm:text-base mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-rose-500" />
                    Top vấn đề học sinh hay gặp nhất
                  </h4>
                  {topProblems.length > 0 ? (
                    <div className="space-y-2.5">
                      {topProblems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm p-3 rounded-2xl bg-slate-50 dark:bg-[#1c2b33] border border-slate-200 dark:border-[#37464f]">
                          <span className="text-slate-800 dark:text-[#e6eef2] font-bold line-clamp-1">
                            <strong className="text-blue-600 dark:text-[#1cb0f6] mr-1.5">#{idx + 1}</strong> {item.title}
                          </span>
                          <span className="px-2.5 py-1 rounded-xl bg-blue-100 dark:bg-[#12384a] text-blue-700 dark:text-[#1cb0f6] font-black shrink-0 border border-blue-200 dark:border-[#1c7aa6] text-xs">
                            {item.count} lượt
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-8 text-center font-medium">Chưa có dữ liệu ghi nhận</p>
                  )}
                </div>
              </div>

              {/* Cột 2: Thống kê chi tiết Độ hài lòng của học sinh */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#243640] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
                <h4 className="font-black text-slate-900 dark:text-[#e6eef2] text-sm sm:text-base mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  Phân bố mức độ hài lòng
                </h4>

                <div className="space-y-3">
                  {RATING_LEVELS.map((level) => {
                    const count = ratingStats.distribution[level.score] || 0;
                    const percent = ratingStats.total > 0 ? Math.round((count / ratingStats.total) * 100) : 0;

                    return (
                      <div key={level.score} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-[#e6eef2]">
                          <span className="flex items-center gap-1.5">
                            <span className="text-base">{level.emoji}</span>
                            <span>{level.label}</span>
                            <span className="text-slate-400 dark:text-[#8fa5b1] font-normal">({level.score}★)</span>
                          </span>
                          <span className="font-black text-slate-900 dark:text-[#e6eef2]">
                            {count} lượt <span className="text-slate-400 dark:text-[#8fa5b1] font-normal">({percent}%)</span>
                          </span>
                        </div>

                        {/* Thanh phần trăm 3D */}
                        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-[#1c2b33] overflow-hidden border border-slate-200/60 dark:border-[#37464f]">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${level.color}`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-[#37464f] flex items-center justify-between text-xs font-medium text-slate-500 dark:text-[#8fa5b1]">
                  <span>Tổng số lượt đánh giá: <strong className="text-slate-800 dark:text-[#e6eef2]">{ratingStats.total}</strong></span>
                  <span className="text-emerald-600 dark:text-[#58cc02] font-black">{ratingStats.positiveRate}% phản hồi tốt</span>
                </div>
              </div>

            </div>

            {/* Hàng Khối: Danh sách Góp ý & Chia sẻ từ học sinh (Hòm thư tâm sự) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#243640] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-[#e6eef2] text-sm sm:text-base flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    Hòm thư góp ý & Cảm xúc từ học sinh
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#8fa5b1] font-medium mt-0.5">
                    Các lời nhắn nhủ, cảm xúc và đề xuất được học sinh gửi sau phiên gỡ rối
                  </p>
                </div>

                {feedbacks.length > 0 && (
                  <button
                    onClick={handleExportFeedbackCsv}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#1c2b33] hover:bg-slate-200 dark:hover:bg-[#2b3c46] text-slate-700 dark:text-[#e6eef2] border border-slate-300 dark:border-[#37464f] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    <Download className="w-4 h-4 text-slate-500 dark:text-[#8fa5b1]" />
                    <span>Xuất file CSV</span>
                  </button>
                )}
              </div>

              {/* Danh sách các góp ý */}
              {feedbacks.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {feedbacks.map((fb, idx) => {
                    const matchedLevel = RATING_LEVELS.find(l => l.score === Number(fb.rating)) || RATING_LEVELS[0];
                    const dateStr = fb.created_at ? new Date(fb.created_at).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : 'Gần đây';

                    return (
                      <div 
                        key={fb.id || idx}
                        className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#1c2b33] border border-slate-200 dark:border-[#37464f] space-y-2 transition-all hover:border-blue-300 dark:hover:border-[#1cb0f6]"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#243640] border border-slate-200 dark:border-[#37464f] text-xs font-black text-slate-800 dark:text-[#e6eef2] flex items-center gap-1 shadow-2xs">
                              <span>{matchedLevel.emoji}</span>
                              <span>{matchedLevel.label}</span>
                            </span>
                            <span className="text-xs font-bold text-slate-500 dark:text-[#8fa5b1] line-clamp-1 max-w-xs sm:max-w-md">
                              {fb.problem_title || 'Tình huống học tập'}
                            </span>
                          </div>

                          <span className="text-[11px] text-slate-400 dark:text-[#6a808c] font-medium">
                            {dateStr}
                          </span>
                        </div>

                        {fb.comment && fb.comment.trim() ? (
                          <p className="text-xs sm:text-sm text-slate-800 dark:text-[#d1e1ea] font-medium leading-relaxed bg-white dark:bg-[#243640] p-3 rounded-xl border border-slate-200/80 dark:border-[#37464f] italic">
                            "{fb.comment}"
                          </p>
                        ) : (
                          <p className="text-xs text-slate-400 dark:text-[#6a808c] italic">
                            (Học sinh gửi đánh giá sao, không để lại thêm lời nhắn)
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center text-slate-400 dark:text-[#8fa5b1]">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-medium">Chưa có góp ý hoặc đánh giá nào từ học sinh.</p>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}