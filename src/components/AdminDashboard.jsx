import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Download, 
  Lock, 
  Unlock, 
  X, 
  School, 
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

  const CORRECT_PIN = '2026'; // Mã PIN mặc định dành cho thầy cô

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
      .slice(0, 5);
  }, [sessions]);

  // Thống kê theo Lớp
  const classBreakdown = useMemo(() => {
    const counts = {};
    sessions.forEach(s => {
      const cls = s.grade_class || 'Chưa rõ';
      counts[cls] = (counts[cls] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([cls, count]) => ({ cls, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [sessions]);

  // Xuất file CSV
  const handleExportCSV = () => {
    if (sessions.length === 0) return;
    const headers = ['Thời gian,Tên học sinh,Lớp,Trường,Mã vấn đề,Tiêu đề vấn đề'];
    const rows = sessions.map(s => {
      const time = s.created_at ? new Date(s.created_at).toLocaleString('vi-VN') : '';
      return `"${time}","${s.student_name || ''}","${s.grade_class || ''}","${s.school_name || ''}","${s.problem_id || ''}","${(s.problem_title || '').replace(/"/g, '""')}"`;
    });
    const csvContent = '\uFEFF' + [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `thong_ke_hoc_sinh_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Thống Kê Hỗ Trợ Học Sinh</h2>
              <p className="text-xs text-slate-400">Dữ liệu phân tích dành cho Thầy cô & Ban giám hiệu</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chưa xác thực PIN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-200/60">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Bảo mật Quản Trị Viên</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
              Vui lòng nhập mã PIN dành cho Thầy cô (Mặc định: <strong>2026</strong>) để xem số liệu học sinh.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <input
                type="password"
                placeholder="Nhập mã PIN..."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center text-lg tracking-widest font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-500 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Mã PIN chưa chính xác. Vui lòng thử 2026.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" /> Xác nhận mở khóa
              </button>
            </form>
          </div>
        ) : (
          /* Đã xác thực - Hiển thị Dashboard */
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/70">
                <div className="flex items-center justify-between text-blue-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Tổng lượt truy cập</span>
                  <Eye className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900">
                  {totalVisits.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-blue-600 mt-1">Lượt xem trực tiếp</div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200/70">
                <div className="flex items-center justify-between text-indigo-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Lượt học sinh gỡ rối</span>
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-900">
                  {sessions.length.toLocaleString('vi-VN')}
                </div>
                <div className="text-xs text-indigo-600 mt-1">Lượt tháo gỡ hoàn thành</div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/70">
                <div className="flex items-center justify-between text-emerald-700 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Tỷ lệ tương tác</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-900">
                  {totalVisits > 0 ? `${Math.round((sessions.length / totalVisits) * 100)}%` : '100%'}
                </div>
                <div className="text-xs text-emerald-600 mt-1">Học sinh hoàn thành các bước</div>
              </div>
            </div>

            {/* Phân tích Top vấn đề & Phân bố theo lớp */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Top vấn đề */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  Top vấn đề học sinh hay gặp khó khăn nhất
                </h4>
                {topProblems.length > 0 ? (
                  <div className="space-y-3">
                    {topProblems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <span className="truncate text-slate-700 max-w-[280px]">
                          <strong>#{idx + 1}</strong> {item.title}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold shrink-0">
                          {item.count} lượt
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">Chưa có dữ liệu ghi nhận</p>
                )}
              </div>

              {/* Phân bố theo Lớp */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-4 flex items-center gap-2">
                  <School className="w-4 h-4 text-indigo-500" />
                  Phân bố học sinh theo Khối / Lớp
                </h4>
                {classBreakdown.length > 0 ? (
                  <div className="space-y-3">
                    {classBreakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <span className="text-slate-700 font-medium">Lớp {item.cls}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-600 h-full rounded-full" 
                              style={{ width: `${Math.min(100, (item.count / (sessions.length || 1)) * 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-slate-800 text-xs w-10 text-right">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">Chưa có dữ liệu ghi nhận</p>
                )}
              </div>

            </div>

            {/* Bảng danh sách chi tiết */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Danh sách học sinh tương tác gần nhất
                </h4>
                <button
                  onClick={handleExportCSV}
                  disabled={sessions.length === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" /> Xuất file CSV
                </button>
              </div>

              <div className="overflow-x-auto max-h-60 border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 font-semibold uppercase tracking-wider sticky top-0 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-2.5">Thời gian</th>
                      <th className="px-3 py-2.5">Học sinh</th>
                      <th className="px-3 py-2.5">Lớp</th>
                      <th className="px-3 py-2.5">Trường</th>
                      <th className="px-3 py-2.5">Vấn đề đã chọn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sessions.map((s, idx) => (
                      <tr key={s.id || idx} className="hover:bg-slate-50/70">
                        <td className="px-3 py-2 whitespace-nowrap text-slate-400">
                          {s.created_at ? new Date(s.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '--'}
                        </td>
                        <td className="px-3 py-2 font-medium text-slate-900">{s.student_name}</td>
                        <td className="px-3 py-2">{s.grade_class}</td>
                        <td className="px-3 py-2 truncate max-w-[150px]">{s.school_name}</td>
                        <td className="px-3 py-2 truncate max-w-[220px]" title={s.problem_title}>
                          {s.problem_title}
                        </td>
                      </tr>
                    ))}
                    {sessions.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-3 py-6 text-center text-slate-400">
                          Chưa có lượt học sinh nào được ghi nhận.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
