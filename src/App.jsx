import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TopicSelector from './components/TopicSelector';
import DecisionTree from './components/DecisionTree';
import AdminDashboard from './components/AdminDashboard';
import BackgroundMusic from './components/BackgroundMusic';
import MobileBottomNav from './components/MobileBottomNav';
import { soundFx } from './lib/sound';
import { recordVisit, getVisitCount } from './lib/supabase';
import questionsData from './data/questions_data.json';

export default function App() {
  const [problems] = useState(questionsData);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  // Khởi tạo lượt truy cập
  useEffect(() => {
    recordVisit().then((count) => setVisitCount(count));
  }, []);

  // Đồng bộ trạng thái âm thanh
  useEffect(() => {
    soundFx.setMuted(isMuted);
  }, [isMuted]);

  // Chọn vấn đề để gỡ rối - Vào thẳng ngay lập tức, không có bất kỳ popup nào
  const handleSelectProblem = (prob) => {
    soundFx.playChime();
    setSelectedProblem(prob);
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
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onGoHome={handleBackToTopics}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6">
        {!selectedProblem ? (
          <TopicSelector
            problems={problems}
            onSelectProblem={handleSelectProblem}
          />
        ) : (
          <DecisionTree
            problem={selectedProblem}
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
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onGoHome={handleBackToTopics}
      />

      {/* Dashboard Thống kê dành cho Thầy cô */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
      />

    </div>
  );
}
