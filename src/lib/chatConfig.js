/**
 * Cấu hình kênh Chat trực tiếp hỗ trợ học sinh (Crisp Chat + Zalo)
 * Học sinh không cần đăng nhập - tự động gán mã phiên ẩn danh.
 */

export const CHAT_CONFIG = {
  // Mã Website ID từ tài khoản Crisp của cô giáo (https://app.crisp.chat)
  // Sau khi tạo tài khoản Crisp, dán Website ID vào đây hoặc biến môi trường VITE_CRISP_WEBSITE_ID
  crispWebsiteId: import.meta.env.VITE_CRISP_WEBSITE_ID || 'a8e006f6-f74b-4cc4-92c2-a5f7af523ddf',

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
