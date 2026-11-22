import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Khóa lưu trữ cục bộ khi chạy offline/chưa cấu hình Supabase
const LOCAL_STORAGE_VISITS = 'studyzen_total_visits';
const LOCAL_STORAGE_SESSIONS = 'studyzen_student_sessions';

/**
 * Ghi nhận một lượt truy cập trang web
 */
export async function recordVisit() {
  // Ghi nhận cục bộ
  const currentCount = parseInt(localStorage.getItem(LOCAL_STORAGE_VISITS) || '120', 10);
  const newCount = currentCount + 1;
  localStorage.setItem(LOCAL_STORAGE_VISITS, newCount.toString());

  // Nếu đã kết nối Supabase, đồng bộ lên Cloud
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('site_visits').insert([{ visited_at: new Date().toISOString() }]);
    } catch (err) {
      console.warn('Lỗi ghi lượt truy cập Supabase:', err);
    }
  }

  return newCount;
}

/**
 * Lấy tổng số lượt truy cập
 */
export async function getVisitCount() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { count, error } = await supabase
        .from('site_visits')
        .select('*', { count: 'exact', head: true });
      if (!error && count !== null) {
        return Math.max(count, 120); // base count
      }
    } catch (err) {
      console.warn('Lỗi lấy lượt truy cập Supabase:', err);
    }
  }
  return parseInt(localStorage.getItem(LOCAL_STORAGE_VISITS) || '120', 10);
}

/**
 * Lưu thông tin phiên học sinh gỡ rối
 */
export async function saveStudentSession(sessionData) {
  const localList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS) || '[]');
  const newEntry = {
    id: `local-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...sessionData,
  };
  localList.unshift(newEntry);
  localStorage.setItem(LOCAL_STORAGE_SESSIONS, JSON.stringify(localList.slice(0, 200)));

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('student_sessions').insert([{
        student_name: sessionData.student_name,
        grade_class: sessionData.grade_class,
        school_name: sessionData.school_name,
        problem_id: sessionData.problem_id,
        problem_title: sessionData.problem_title,
        selected_branches: sessionData.selected_branches || {}
      }]);
    } catch (err) {
      console.warn('Lỗi lưu phiên Supabase:', err);
    }
  }

  return newEntry;
}

/**
 * Lấy tất cả các phiên cho trang Thống kê Dashboard
 */
export async function getAllSessions() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('student_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(300);
      if (!error && data) {
        return data;
      }
    } catch (err) {
      console.warn('Lỗi tải dữ liệu phiên từ Supabase:', err);
    }
  }

  // Fallback LocalStorage
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS) || '[]');
}
