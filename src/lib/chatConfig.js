/**
 * Cấu hình kênh Chat trực tiếp hỗ trợ học sinh (Phương án 1: Tawk.to + Zalo)
 * Học sinh không cần đăng nhập - tự động gán mã phiên ẩn danh.
 */

export const CHAT_CONFIG = {
  // Mã Property ID và Widget ID từ tài khoản Tawk.to của cô giáo
  // Sau khi cô tạo tài khoản trên https://www.tawk.to, dán Property ID vào đây hoặc biến môi trường VITE_TAWK_PROPERTY_ID
  tawkPropertyId: import.meta.env.VITE_TAWK_PROPERTY_ID || '',
  tawkWidgetId: import.meta.env.VITE_TAWK_WIDGET_ID || 'default',

  // Số điện thoại Zalo kết nối trực tiếp tới điện thoại của cô giáo
  teacherZaloPhone: '0935320230',
  teacherName: 'Cô Khánh Nga',
};

/**
 * Lấy hoặc tạo Mã phiên ẩn danh cho học sinh (lưu trong localStorage, không cần đăng nhập)
 */
export function getAnonymousStudentId() {
  try {
    const key = 'studyzen_anon_student_id';
    let id = localStorage.getItem(key);
    if (!id) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      id = `HS-${randomNum}`;
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return 'HS-ẨnDanh';
  }
}
