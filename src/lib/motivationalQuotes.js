// Danh sách lời động viên tích cực, ấm áp dành cho học sinh

export const motivationalQuotes = [
  "Hít một hơi thật sâu nào! Nhận diện được khó khăn là bạn đã đi được một nửa chặng đường rồi đấy.",
  "Mọi nút thắt đều có cách gỡ. Bạn sắp tìm thấy hướng đi phù hợp rồi!",
  "Bạn đang làm rất tốt! Từng bước nhỏ một, không cần phải vội vã.",
  "Cảm giác rối bời là hoàn toàn bình thường. Chúng mình cùng nhau gỡ từng việc một nhé!",
  "Chỉ cần tập trung vào bước tiếp theo ngay trước mắt, bạn sẽ thấy mọi thứ nhẹ nhàng hơn nhiều.",
  "Đừng lo lắng quá nhé, khó khăn lúc này là cơ hội để bạn rèn luyện sự bình tĩnh và kiên trì.",
  "Mỗi lần bạn dám đối diện với khó khăn là một lần bạn trưởng thành hơn rồi đấy!",
  "Tuyệt vời! Giải pháp cụ thể sắp mở ra cho bạn rồi, cố lên nhé!"
];

export function getRandomQuote() {
  const index = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[index];
}
