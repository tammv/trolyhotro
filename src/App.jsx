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

const THEME_STORAGE_KEY = 'studyzen_dark_mode';

export default function App() {
  const [problems] = useState(questionsData);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  // Quản lý Chế độ Tối (Dark Mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    soundFx.playChime();
    setIsDarkMode(prev => !prev);
  };

  // Khởi tạo lượt truy cập
  useEffect(() => {
    recordVisit().then((count) => setVisitCount(count));
  }, []);

  // Đồng bộ trạng thái âm thanh
  useEffect(() => {
    soundFx.setMuted(isMuted);
  }, [isMuted]);

  // Chọn vấn đề để gỡ rối
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#131f24] text-slate-800 dark:text-[#e6eef2] flex flex-col font-sans transition-colors duration-250">
      
      {/* Background Ambient Chill Music */}
      <BackgroundMusic isPlaying={isMusicPlaying} />

      {/* Header */}
      <Header
        visitCount={visitCount}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
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
      <footer className="mt-12 sm:mt-16 border-t-2 border-slate-200 dark:border-[#37464f] bg-white dark:bg-[#1c2b33] py-8 text-center text-xs text-slate-500 dark:text-[#8fa5b1] pb-24 sm:pb-8 transition-colors">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700 dark:text-[#e6eef2]">
            Trợ Lý Gỡ Rối Học Tập • Hệ thống hỗ trợ tâm lý & giải quyết áp lực học đường
          </p>
          <p className="text-slate-400 dark:text-[#8fa5b1] font-medium">
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
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
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
