import React, { useState, useEffect } from 'react';
import { UserCheck, School, GraduationCap, Sparkles, X, RotateCcw, Edit2, User, CheckCircle2 } from 'lucide-react';

export default function StudentModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onEndSession,
  currentInfo 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [gradeClass, setGradeClass] = useState('');
  const [school, setSchool] = useState('');

  useEffect(() => {
    if (currentInfo) {
      setName(currentInfo.name || '');
      setGradeClass(currentInfo.gradeClass || '');
      setSchool(currentInfo.school || '');
      setIsEditing(false);
    } else {
      setName('');
      setGradeClass('');
      setSchool('');
      setIsEditing(true);
    }
  }, [currentInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      gradeClass: gradeClass.trim() || 'Chưa rõ',
      school: school.trim() || 'Chưa rõ'
    });
    setIsEditing(false);
    onClose();
  };

  const handleSwitchUser = () => {
    onEndSession();
    setIsEditing(true);
    setName('');
    setGradeClass('');
    setSchool('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            {currentInfo && !isEditing ? 'Thông Tin Của Bạn' : 'Chào Bạn Học Sinh!'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            {currentInfo && !isEditing
              ? 'Hệ thống đang đồng hành cùng bạn để tháo gỡ khó khăn.'
              : 'Chỉ cần nhập tên, lớp và trường là bạn có thể bắt đầu ngay.'}
          </p>
        </div>

        {/* 1. MÀN HÌNH XEM THÔNG TIN HIỆN TẠI (ĐỔI BẠN HỌC SINH KHÁC) */}
        {currentInfo && !isEditing ? (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  {currentInfo.name ? currentInfo.name.charAt(0).toUpperCase() : 'H'}
                </div>
                <div>
                  <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Đang dùng thông tin này
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                    {currentInfo.name}
                  </h3>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-200/60 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="font-semibold text-slate-500">Lớp:</span> {currentInfo.gradeClass}
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Trường:</span> {currentInfo.school}
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
                <span>Chỉnh sửa thông tin này</span>
              </button>

              {/* Nút Đổi bạn học sinh khác */}
              <button
                type="button"
                onClick={handleSwitchUser}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 hover:text-rose-600" />
                <span>Đổi bạn học sinh khác (Nhập thông tin mới)</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          /* 2. FORM NHẬP THÔNG TIN MỚI */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-blue-600" /> Tên của bạn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" /> Lớp
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 10A1, 11B2"
                  value={gradeClass}
                  onChange={(e) => setGradeClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-purple-600" /> Trường
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: THPT Chuyên..."
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
              >
                Xác Nhận & Bắt Đầu
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Để sau
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
