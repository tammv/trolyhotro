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
const LOCAL_STORAGE_VISITS = 'studyzen_visits_v2';
const LOCAL_STORAGE_SESSIONS = 'studyzen_student_sessions';
const LOCAL_STORAGE_FEEDBACKS = 'studyzen_student_feedbacks';

/**
 * Ghi nhận một lượt truy cập trang web
 */
export async function recordVisit() {
  // Ghi nhận cục bộ
  const currentCount = parseInt(localStorage.getItem(LOCAL_STORAGE_VISITS) || '0', 10);
  const newCount = currentCount + 1;
  localStorage.setItem(LOCAL_STORAGE_VISITS, newCount.toString());

  // Nếu đã kết nối Supabase, đồng bộ lên Cloud
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('site_visits')
        .insert([{ visited_at: new Date().toISOString() }]);
      if (error) {
        console.warn('Lỗi ghi lượt truy cập Supabase:', error.message || error);
      }
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
        return count;
      }
    } catch (err) {
      console.warn('Lỗi lấy lượt truy cập Supabase:', err);
    }
  }
  return parseInt(localStorage.getItem(LOCAL_STORAGE_VISITS) || '0', 10);
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
      const { error } = await supabase.from('student_sessions').insert([{
        student_name: sessionData.student_name,
        grade_class: sessionData.grade_class,
        school_name: sessionData.school_name,
        problem_id: sessionData.problem_id,
        problem_title: sessionData.problem_title,
        selected_branches: sessionData.selected_branches || {}
      }]);
      if (error) {
        console.warn('Lỗi lưu phiên Supabase:', error.message || error);
      }
    } catch (err) {
      console.warn('Lỗi lưu phiên Supabase:', err);
    }
  }

  return newEntry;
}

/**
 * Tải toàn bộ các dòng từ một bảng Supabase theo từng trang 1000 dòng
 * để tránh bị cắt số liệu thống kê khi vượt quá giới hạn mặc định.
 */
async function fetchAllSupabaseRows(tableName, orderColumn = 'created_at') {
  const PAGE_SIZE = 1000;
  let allRows = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order(orderColumn, { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return { data: null, error };
    }

    if (!data || data.length === 0) {
      break;
    }

    allRows = allRows.concat(data);
    if (data.length < PAGE_SIZE) {
      break;
    }
    from += PAGE_SIZE;
  }

  return { data: allRows, error: null };
}

/**
 * Lấy tất cả các phiên cho trang Thống kê Dashboard
 */
export async function getAllSessions() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await fetchAllSupabaseRows('student_sessions', 'created_at');
      if (!error && data) {
        return data;
      }
      if (error) {
        console.warn('Lỗi tải dữ liệu phiên từ Supabase:', error.message || error);
      }
    } catch (err) {
      console.warn('Lỗi tải dữ liệu phiên từ Supabase:', err);
    }
  }

  // Fallback LocalStorage
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSIONS) || '[]');
}

/**
 * Lưu đánh giá độ hài lòng & góp ý của học sinh
 */
export async function saveStudentFeedback(feedbackData) {
  const localList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEEDBACKS) || '[]');
  const newEntry = {
    id: `fb-${Date.now()}`,
    created_at: new Date().toISOString(),
    ...feedbackData
  };
  localList.unshift(newEntry);
  localStorage.setItem(LOCAL_STORAGE_FEEDBACKS, JSON.stringify(localList.slice(0, 200)));

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('student_feedbacks').insert([{
        student_name: feedbackData.student_name,
        grade_class: feedbackData.grade_class,
        school_name: feedbackData.school_name,
        problem_id: feedbackData.problem_id,
        problem_title: feedbackData.problem_title,
        rating: feedbackData.rating,
        comment: feedbackData.comment
      }]);
      if (error) {
        console.warn('Lỗi lưu feedback Supabase:', error.message || error);
      }
    } catch (err) {
      console.warn('Lỗi lưu feedback Supabase:', err);
    }
  }

  return newEntry;
}

/**
 * Lấy tất cả đánh giá & góp ý kèm trạng thái đồng bộ Cloud
 */
export async function getAllFeedbacksWithStatus() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await fetchAllSupabaseRows('student_feedbacks', 'created_at');
      if (!error && data) {
        return { data, isCloud: true, error: null };
      }
      if (error) {
        console.warn('Lỗi tải dữ liệu feedback từ Supabase:', error.message || error);
        return {
          data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEEDBACKS) || '[]'),
          isCloud: false,
          error: error.message || 'Không thể đọc bảng student_feedbacks trên Supabase'
        };
      }
    } catch (err) {
      console.warn('Lỗi tải dữ liệu feedback từ Supabase:', err);
      return {
        data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEEDBACKS) || '[]'),
        isCloud: false,
        error: err.message || 'Lỗi kết nối Supabase'
      };
    }
  }

  // Fallback LocalStorage khi chưa cấu hình Supabase
  return {
    data: JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEEDBACKS) || '[]'),
    isCloud: false,
    error: null
  };
}

/**
 * Lấy tất cả đánh giá & góp ý cho trang Thống kê Dashboard
 */
export async function getAllFeedbacks() {
  const { data } = await getAllFeedbacksWithStatus();
  return data;
}
