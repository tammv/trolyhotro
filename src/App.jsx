import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TopicSelector from './components/TopicSelector';
import DecisionTree from './components/DecisionTree';
import StudentModal from './components/StudentModal';
import AdminDashboard from './components/AdminDashboard';
import BackgroundMusic from './components/BackgroundMusic';
import MobileBottomNav from './components/MobileBottomNav';
import { soundFx } from './lib/sound';
import { recordVisit, getVisitCount } from './lib/supabase';
import questionsData from './data/questions_data.json';

const LOCAL_STORAGE_STUDENT = 'studyzen_student_profile';

export default function App() {
  const [problems] = useState(questionsData);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  // Khởi tạo app
  useEffect(() => {
    // 1. Cập nhật lượt truy cập
    recordVisit().then((count) => setVisitCount(count));

    // 2. Tải thông tin học sinh đã lưu (nếu có)
    const saved = localStorage.getItem(LOCAL_STORAGE_STUDENT);
    if (saved) {
      try {
        setStudentInfo(JSON.parse(saved));
      } catch {
        // Ignored
      }
    }
  }, []);

  // Đồng bộ trạng thái âm thanh
  useEffect(() => {
    soundFx.setMuted(isMuted);
  }, [isMuted]);

  // Lưu thông tin học sinh
  const handleSaveStudentInfo = (info) => {
    setStudentInfo(info);
    localStorage.setItem(LOCAL_STORAGE_STUDENT, JSON.stringify(info));
  };

  // Đổi bạn học sinh khác (xóa thông tin để bạn mới nhập)
  const handleEndSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_STUDENT);
    setStudentInfo(null);
    setSelectedProblem(null);
  };

  // Chọn vấn đề để gỡ rối
  const handleSelectProblem = (prob) => {
    soundFx.playChime();
    setSelectedProblem(prob);
    // Nếu chưa có tên học sinh, mở nhẹ modal để ghi nhận
    if (!studentInfo) {
      setIsStudentModalOpen(true);
    }
  };

  // Quay lại trang danh mục
  const handleBackToTopics = () => {
    soundFx.playBack();
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Background Ambient Chill Music */}
      <BackgroundMusic isPlaying={isMusicPlaying} />

      {/* Header */}
      <Header
        visitCount={visitCount}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        studentInfo={studentInfo}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onGoHome={handleBackToTopics}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6">
        {!selectedProblem ? (
          <TopicSelector
            problems={problems}
            onSelectProblem={handleSelectProblem}
            studentInfo={studentInfo}
            onOpenStudentModal={() => setIsStudentModalOpen(true)}
          />
        ) : (
          <DecisionTree
            problem={selectedProblem}
            studentInfo={studentInfo}
            onBackToTopics={handleBackToTopics}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 border-t-2 border-slate-200 bg-white py-8 text-center text-xs text-slate-500 pb-24 sm:pb-8">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700">
            Trợ Lý Gỡ Rối Học Tập • Hệ thống hỗ trợ tâm lý & giải quyết áp lực học đường
          </p>
          <p className="text-slate-400 font-medium">
            Dữ liệu tổng hợp từ các chuyên đề thực tế dành cho học sinh. Luôn có giải pháp cho mọi khó khăn!
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Chỉ hiển thị trên điện thoại) */}
      <MobileBottomNav
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        studentInfo={studentInfo}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onGoHome={handleBackToTopics}
      />

      {/* Modals */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudentInfo}
        onEndSession={handleEndSession}
        currentInfo={studentInfo}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

    </div>
  );
}
