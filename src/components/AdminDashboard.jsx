import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Lock, 
  Unlock, 
  X, 
  AlertCircle 
} from 'lucide-react';
import { getAllSessions, getVisitCount } from '../lib/supabase';

export default function AdminDashboard({ isOpen, onClose }) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
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
      const [visits, sess] = await Promise.all([
        getVisitCount(),
        getAllSessions()
      ]);
      setTotalVisits(visits);
      setSessions(sess || []);
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
      .slice(0, 8);
  }, [sessions]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1c2b33] w-full max-w-4xl rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-[#37464f] overflow-hidden my-auto transition-colors">
        
        {/* Header Dashboard */}
        <div className="bg-slate-900 dark:bg-[#131f24] text-white px-6 py-5 flex items-center justify-between border-b-2 border-slate-800 dark:border-[#37464f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_2px_0_#1d4ed8]">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Thống Kê Hỗ Trợ Học Sinh</h2>
              <p className="text-xs text-slate-400 font-medium">Dữ liệu phân tích dành cho Thầy cô & Ban giám hiệu</p>
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
          /* Đã xác thực - Hiển thị Dashboard (Đã ẩn Phân bố theo lớp và Bảng danh sách) */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* KPI Cards 3D */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-[#243640] border-2 border-blue-200 dark:border-[#37464f] shadow-[0_3px_0_#bfdbfe] dark:shadow-none">
                <div className="flex items-center justify-between text-blue-700 dark:text-[#1cb0f6] mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Tổng lượt truy cập</span>
                  <Eye className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-[#e6eef2]">
                  {totalVisits.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-blue-600 dark:text-[#8fa5b1] mt-1 font-medium">Lượt xem trực tiếp</div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-[#243640] border-2 border-indigo-200 dark:border-[#37464f] shadow-[0_3px_0_#c7d2fe] dark:shadow-none">
                <div className="flex items-center justify-between text-indigo-700 dark:text-[#a5b4fc] mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Lượt gỡ rối hoàn thành</span>
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-900 dark:text-[#e6eef2]">
                  {sessions.length.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-indigo-600 dark:text-[#8fa5b1] mt-1 font-medium">Lượt đã tìm thấy giải pháp</div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-[#243640] border-2 border-emerald-200 dark:border-[#37464f] shadow-[0_3px_0_#a7f3d0] dark:shadow-none">
                <div className="flex items-center justify-between text-emerald-700 dark:text-[#58cc02] mb-2">
                  <span className="text-xs font-black uppercase tracking-wider">Tỷ lệ tương tác</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-[#e6eef2]">
                  {totalVisits > 0 ? `${Math.round((sessions.length / totalVisits) * 100)}%` : '100%'}
                </div>
                <div className="text-xs text-emerald-600 dark:text-[#8fa5b1] mt-1 font-medium">Học sinh hoàn thành các bước</div>
              </div>
            </div>

            {/* Khối Top vấn đề học sinh hay gặp khó khăn nhất (Toàn bộ chiều rộng, rõ ràng) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#243640] border-2 border-slate-200 dark:border-[#37464f] shadow-[0_3px_0_#e2e8f0] dark:shadow-none">
              <h4 className="font-black text-slate-900 dark:text-[#e6eef2] text-sm sm:text-base mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Top vấn đề học sinh hay gặp khó khăn nhất
              </h4>
              {topProblems.length > 0 ? (
                <div className="space-y-3">
                  {topProblems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm p-3 rounded-2xl bg-slate-50 dark:bg-[#1c2b33] border border-slate-200 dark:border-[#37464f]">
                      <span className="text-slate-800 dark:text-[#e6eef2] font-bold">
                        <strong className="text-blue-600 dark:text-[#1cb0f6] mr-1.5">#{idx + 1}</strong> {item.title}
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-blue-100 dark:bg-[#12384a] text-blue-700 dark:text-[#1cb0f6] font-black shrink-0 border border-blue-200 dark:border-[#1c7aa6]">
                        {item.count} lượt
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center font-medium">Chưa có dữ liệu ghi nhận</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
