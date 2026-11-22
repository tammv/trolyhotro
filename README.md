# 🌿 Trợ Lý Gỡ Rối Học Tập (StudyZen)

Hệ thống hỗ trợ học sinh giải quyết các áp lực, khó khăn trong học tập và thi cử theo phương pháp **cây quyết định phân nhánh (Decision Tree)** tương tác cao, ấm áp và khích lệ tinh thần.

---

## ✨ Tính Năng Nổi Bật

1. **Kho 21 Chủ Đề Toàn Diện**: Bao quát tất cả các tình huống học sinh hay gặp phải (quá tải bài tập, chưa hiểu đề, thời hạn gấp, áp lực phòng thi, tâm lý lo sợ điểm kém...).
2. **Cây Quyết Định Phân Nhánh**: Hướng dẫn học sinh nhận diện từng bước cảm xúc -> tình huống cụ thể -> giải pháp hành động vi mô (Micro-actions).
3. **Điều Hướng Linh Hoạt**: Dễ dàng quay lại bước trước hoặc đổi sang vấn đề khác bất kỳ lúc nào.
4. **Hiệu Ứng Khích Lệ Tinh Thần**:
   - Lời động viên ấm áp ngẫu nhiên sau mỗi lựa chọn.
   - Âm thanh "chime/pop" nhẹ nhàng được tạo trực tiếp bằng **Web Audio API** (0 latency, 0 băng thông).
   - Nhạc nền thư giãn (Ambient Chill Synthesizer) giúp làm dịu tâm trạng.
5. **Định Danh & Thống Kê Học Sinh**:
   - Nhập thông tin nhanh: Tên, Lớp, Trường (tự động ghi nhớ trên trình duyệt).
   - Bộ đếm tổng số lượt truy cập trực tiếp trên Header.
   - **Bảng Thống Kê (Admin Dashboard)** dành cho Thầy cô (mã PIN: `2026`): Biểu đồ phân bố theo lớp, top vấn đề bế tắc nhiều nhất, xuất file CSV.
6. **Chi Phí 0 ĐỒNG**:
   - Frontend: Vite + React + Tailwind CSS v4.
   - Backend/Database: **Supabase** (Gói Free Tier vĩnh viễn) kết hợp LocalStorage Fallback.
   - Hosting: Tương thích hoàn hảo với Vercel / Cloudflare Pages (Miễn phí trọn đời).

---

## 🚀 Cài Đặt & Chạy Cục Bộ (Local)

```bash
# 1. Chuyển vào thư mục dự án
cd trolyhotro

# 2. Cài đặt thư viện
npm install

# 3. Chạy môi trường phát triển
npm run dev
```

Mở trình duyệt tại: `http://localhost:5173`

---

## 🗄️ Cấu Hình Supabase (Tùy Chọn)

Hệ thống đã có sẵn cơ chế **Fallback LocalStorage** để hoạt động ngay lập tức mà không bắt buộc có Supabase.

Nếu muốn đồng bộ dữ liệu tập trung lên Cloud:
1. Đăng ký tài khoản miễn phí tại [Supabase](https://supabase.com) và tạo 1 Project mới.
2. Mở mục **SQL Editor** trong Supabase và chạy đoạn script sau:

```sql
-- 1. Bảng ghi nhận lượt truy cập
CREATE TABLE site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    visited_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Bảng ghi nhận phiên gỡ rối của học sinh
CREATE TABLE student_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    student_name TEXT NOT NULL,
    grade_class TEXT NOT NULL,
    school_name TEXT NOT NULL,
    problem_id TEXT,
    problem_title TEXT,
    selected_branches JSONB
);

-- Phân quyền Row Level Security
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cho phep ghi luot truy cap" ON site_visits FOR INSERT WITH CHECK (true);
CREATE POLICY "Cho phep doc tong so luot" ON site_visits FOR SELECT USING (true);

CREATE POLICY "Cho phep hoc sinh gui phien" ON student_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Cho phep doc thong ke" ON student_sessions FOR SELECT USING (true);
```

3. Tạo file `.env` trong thư mục `trolyhotro` (dựa trên `.env.example`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

---

## 🌐 Triển Khai Lên Vercel (Khi sẵn sàng)

1. Đăng nhập [Vercel](https://vercel.com) bằng tài khoản GitHub.
2. Chọn **"Add New Project"** -> Chọn repository `tammv/trolyhotro`.
3. Nếu có dùng Supabase, thêm 2 biến môi trường `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` vào mục **Environment Variables**.
4. Nhấn **Deploy** - Website sẽ hoạt động với đường dẫn `.vercel.app` tốc độ cao hoàn toàn miễn phí!
