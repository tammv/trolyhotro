const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// Tình huống 1.40: Khi bài nhóm sắp đến hạn mà các bạn chưa phối hợp
const p1_40 = {
  Id: "p1_40",
  Code: "1.40",
  FileName: "Khi bài nhóm sắp đến hạn mà các bạn chưa phối hợp.docx",
  Title: "Khi bài nhóm sắp đến hạn mà các bạn chưa phối hợp",
  RootQuestion: "Câu 1. Điều gì đang làm bài nhóm khó tiến triển nhất?",
  Intro: "Nhóm em được giao một bài tập và chỉ còn ít thời gian trước hạn nộp. Có bạn chưa trả lời tin nhắn, có bạn chưa nhận việc hoặc đã nhận mà chưa báo làm đến đâu.\n\nEm đã chủ động tìm cách để cả nhóm cùng làm. Hãy bắt đầu từ một việc cụ thể: phần nào đang thiếu, ai có thể nhận và nhóm cần quyết định trước mấy giờ.",
  Options: [
    { Index: 1, Text: "Nhóm chưa rõ còn những phần nào và chưa thống nhất ai làm phần nào" },
    { Index: 2, Text: "Một số bạn chưa trả lời nên nhóm chưa biết các bạn có thể tham gia không" },
    { Index: 3, Text: "Có bạn đã nhận việc nhưng đang vướng hoặc có thể gửi muộn" },
    { Index: 4, Text: "Các bạn chưa đồng ý với cách chia việc, hoặc em đang phải nhận quá nhiều" },
    { Index: 5, Text: "Hạn nộp đã sát mà nhóm vẫn thiếu phần quan trọng" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Nhóm chưa rõ còn những phần nào và chưa thống nhất ai làm phần nào",
      BranchTitle: "Chốt danh sách sản phẩm còn thiếu, người nhận và giờ gửi",
      Intro: "Em sẽ cùng nhóm chốt từng phần cần làm thành sản phẩm cụ thể, người phụ trách và mốc giờ gửi để còn thời gian ghép và kiểm tra bài.",
      Question: "Em muốn thực hiện bước nào trước để nhóm chia việc rõ ràng?",
      SubOptions: [
        { Index: 1, Text: "Liệt kê các phần còn thiếu thành từng sản phẩm cụ thể" },
        { Index: 2, Text: "Nhắn đề xuất chia việc kèm giờ gửi để chừa thời gian ghép bài" },
        { Index: 3, Text: "Kiểm tra mốc hẹn và xử lý nếu còn phần chưa ai nhận" }
      ],
      Solutions: [
        {
          Title: "1. Ghi rõ từng phần thành sản phẩm cụ thể",
          Guide: "Mở yêu cầu của thầy cô, đối chiếu với những gì nhóm đã có. Viết phần còn thiếu thành sản phẩm rõ ràng (vd: 'viết 3 ý chính', 'chọn 2 hình minh họa', 'ghép các phần vào tệp chung', 'kiểm tra trước khi nộp').\n\nNếu hai bạn đang làm trùng một phần, đề nghị một bạn đổi sang phần đang trống."
        },
        {
          Title: "2. Mẫu tin nhắn chia việc có chừa thời gian ghép & kiểm tra",
          Guide: "Tính ngược từ hạn nộp (vd: nộp 21h, cần 45 phút ghép -> hạn gửi nội dung là 20h15).\n\nMẫu nhắn: “Mọi người ơi, bài nộp lúc 21 giờ. Nhóm còn ý chính, hình minh họa, ghép bài và kiểm tra. Mỗi bạn nhắn giúp mình phần có thể nhận nhé. Mình đề xuất gửi hai phần nội dung trước 20 giờ 15 để còn thời gian ghép. Nếu giờ đó chưa phù hợp, bạn báo để nhóm cùng chỉnh nha.”"
        },
        {
          Title: "3. Theo dõi mốc hẹn và chia nhỏ phần còn trống",
          Guide: "Khi các bạn xác nhận, ghi lại: Ai làm - Sản phẩm gì - Giờ gửi. Đến mốc hẹn, mở tệp chung kiểm tra. Nếu vẫn còn phần chưa ai nhận, hỏi nhóm có thể chia nhỏ phần đó hoặc đổi chéo với phần khác không."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Một số bạn chưa trả lời nên nhóm chưa biết các bạn có thể tham gia không",
      BranchTitle: "Nhắn tin ngắn dễ trả lời và đặt mốc chốt phương án dự phòng",
      Intro: "Thay vì nhắn chung chung 'Các bạn gửi sớm nhé', hãy nêu rõ việc cần nhận và mốc giờ cần phản hồi để kịp đổi người nếu bạn bận.",
      Question: "Em muốn xử lý tình huống chờ phản hồi thế nào?",
      SubOptions: [
        { Index: 1, Text: "Tính sẵn hai mốc giờ: giờ bắt đầu ghép và giờ chốt người làm thay" },
        { Index: 2, Text: "Nhắn tin riêng ngắn gọn để bạn dễ trả lời dù đang bận" },
        { Index: 3, Text: "Xử lý khi hết giờ hẹn mà bạn vẫn chưa phản hồi" }
      ],
      Solutions: [
        {
          Title: "1. Tính ngược hai mốc thời gian trước khi nhắn",
          Guide: "Ví dụ: Nộp lúc 21h00, cần 20 phút ghép & kiểm tra -> phải ghép chậm nhất lúc 20h40.\n\nNếu người làm thay cần 15 phút viết ví dụ -> phải chốt người chậm nhất lúc 20h25."
        },
        {
          Title: "2. Mẫu tin nhắn riêng rõ ràng, lịch sự",
          Guide: "“Bạn ơi, nhóm còn thiếu một ví dụ. Bạn có thể nhận phần này và gửi trước 20 giờ 40 không? Bạn báo giúp mình trước 20 giờ 25 nhé. Nếu hôm nay bạn bận, cứ báo để nhóm kịp thu xếp nha.”"
        },
        {
          Title: "3. Kích hoạt phương án dự phòng đúng mốc hẹn",
          Guide: "Khi bạn phản hồi, xác nhận lại phần việc và giờ gửi với cả nhóm. Nếu quá mốc hẹn vẫn chưa có tin nhắn, báo đúng sự việc vào nhóm (vd: “Đến 20h25 nhóm chưa có xác nhận phần ví dụ”) để chuyển sang người dự phòng. Nếu vẫn thiếu người và có nguy cơ trễ hạn, nhắn thầy cô sớm."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Có bạn đã nhận việc nhưng đang vướng hoặc có thể gửi muộn",
      BranchTitle: "Giữ lại phần bạn đã làm được và hỗ trợ phần còn thiếu",
      Intro: "Đừng đợi bạn làm hoàn hảo 100% mới gửi hoặc làm lại từ đầu. Hãy lấy phần bạn đã làm được rồi nhờ bạn khác tiếp sức phần còn thiếu.",
      Question: "Bạn đang vướng ở đâu và nhóm có thể hỗ trợ thế nào?",
      SubOptions: [
        { Index: 1, Text: "Hỏi nhanh xem bạn đang thiếu tài liệu, chưa rõ yêu cầu hay thiếu giờ" },
        { Index: 2, Text: "Xin bạn gửi ngay phần đã làm được để người khác nối tiếp" },
        { Index: 3, Text: "Chốt mốc kiểm tra lại và phương án thay thế nếu không kịp" }
      ],
      Solutions: [
        {
          Title: "1. Hỏi đúng chỗ vướng để hỗ trợ trúng đích",
          Guide: "“Bạn đã làm được đến đâu rồi? Bạn đang vướng ở yêu cầu, thiếu tài liệu hay cần thêm thời gian?”\n\n• Chưa hiểu yêu cầu -> gửi 1 ví dụ.\n• Thiếu tài liệu -> gửi đúng đường dẫn.\n• Thiếu thời gian -> nhận phần bạn đã làm để chia phần còn lại."
        },
        {
          Title: "2. Tận dụng phần bạn đã làm ngay lập tức",
          Guide: "Ví dụ bạn có 2 ý nhưng chưa kịp tìm ví dụ (hoặc có 2 hình nhưng chưa kịp viết chú thích):\n“Bạn gửi hai ý vào tệp chung trong 5 phút tới được không? Mình hỏi nhóm xem ai có thể tìm một ví dụ, rồi bạn xem giúp ví dụ đó có khớp với hai ý không nhé.”"
        },
        {
          Title: "3. Mở tệp kiểm tra đúng mốc và báo thầy cô nếu phần bắt buộc bị kẹt",
          Guide: "Chốt rõ: Ai gửi gì, mấy giờ gửi và ai hỗ trợ ghép nốt. Nếu tới mốc bạn vẫn chưa gửi được phần bắt buộc và nhóm không tự xoay xở kịp, cập nhật lại nhóm để thay thế hoặc nhắn thầy cô xin hướng dẫn."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Các bạn chưa đồng ý với cách chia việc, hoặc em đang phải nhận quá nhiều",
      BranchTitle: "Lắng nghe lý do của bạn và đề nghị chia lại vừa sức",
      Intro: "Nếu bạn đang phải ôm hết phần ghép, kiểm tra và thêm cả viết bài, hãy hỏi lý do bạn kia chưa nhận rồi chia nhỏ lại sao cho ai cũng làm được.",
      Question: "Em muốn trao đổi lại với nhóm theo bước nào?",
      SubOptions: [
        { Index: 1, Text: "Hỏi xem bạn đang vướng ở đâu khiến bạn chưa nhận phần việc" },
        { Index: 2, Text: "Gửi tài liệu nền để bạn làm phần ngắn, còn em giữ phần ghép & kiểm tra" },
        { Index: 3, Text: "Nhắn thầy cô nếu nhóm vẫn bất đồng hoặc em bị dồn quá nhiều việc" }
      ],
      Solutions: [
        {
          Title: "1. Hỏi lý do cụ thể trước khi nhận thêm việc",
          Guide: "“Phần mở đầu đang khó ở chỗ nào vậy bạn?” Có khi bạn không từ chối vì lười, mà vì chỉ có 10 phút hoặc chưa biết nhóm đã chốt những ý nào."
        },
        {
          Title: "2. Chia nhỏ vừa sức bạn và giữ rõ vai trò của em",
          Guide: "Ví dụ: “À, bạn còn 10 phút và chưa có các ý nhóm đã chốt. Mình gửi bạn ba ý ngay nhé. Bạn có thể viết hai câu mở đầu trong 10 phút không? Mình sẽ ghép và kiểm tra. Nếu vẫn khó kịp, bạn báo để nhóm thu xếp nha.”\n\nNếu bạn chỉ viết được 1 câu: ghi nhận câu đó, chốt giờ bạn gửi rồi hỏi nhóm ai hỗ trợ câu còn lại."
        },
        {
          Title: "3. Nhờ thầy cô hỗ trợ khi nhóm không tự thống nhất được",
          Guide: "“Thưa cô, em đang phụ trách ghép và kiểm tra bài. Nhóm đã thử chia lại nhưng phần mở đầu vẫn chưa có bạn xác nhận. Bài nộp lúc 21 giờ. Cô có thể hướng dẫn nhóm em cách xử lý phần còn thiếu và ghi nhận phần việc từng bạn đã làm được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Hạn nộp đã sát mà nhóm vẫn thiếu phần quan trọng",
      BranchTitle: "Ưu tiên phần bắt buộc, chốt giờ ghép cuối và báo thầy cô sớm",
      Intro: "Khi thời gian chỉ còn tính bằng phút, không dàn trải trang trí hay làm phần phụ. Tập trung toàn lực cho phần bắt buộc và giữ đủ phút cuối để ghép, kiểm tra tệp nộp.",
      Question: "Nhóm đang sát giờ nộp ở mức nào?",
      SubOptions: [
        { Index: 1, Text: "Chỉ còn 15–25 phút, vừa thiếu phần bắt buộc vừa chưa trang trí" },
        { Index: 2, Text: "Muốn nhắn thầy cô xin hướng dẫn nộp hoặc bổ sung kịp thời" },
        { Index: 3, Text: "Kiểm tra lại tệp trước khi bấm nộp để tránh gửi nhầm bản" }
      ],
      Solutions: [
        {
          Title: "1. Bỏ phần trang trí, dồn hết cho phần bắt buộc và giữ phút cuối để ghép",
          Guide: "Ví dụ: Còn 20 phút đến hạn, cần 10 phút ghép -> bỏ phần trang trí, dành 10 phút làm ngay kết luận bắt buộc (hoặc tìm nguồn từ tài liệu sẵn có) và bắt buộc dừng để ghép đúng mốc 10 phút cuối."
        },
        {
          Title: "2. Nhắn thầy cô sớm trước khi quá hạn",
          Guide: "“Thưa cô, bài nhóm em nộp lúc 21 giờ. Nhóm đã xong phần giải thích nhưng còn thiếu ví dụ theo yêu cầu. Nhóm đang chuẩn bị tệp để nộp. Nếu chưa bổ sung kịp, cô hướng dẫn giúp nhóm em cách nộp hoặc bổ sung được không ạ?”"
        },
        {
          Title: "3. Kiểm tra kỹ sau khi nộp",
          Guide: "Nếu thầy cô cho phép bổ sung, xác nhận rõ phần cần bổ sung và hạn mới. Sau khi gửi bài, mở lại tệp xem đã đúng bản chưa và kiểm tra xem hệ thống đã báo xác nhận nộp thành công chưa."
        }
      ]
    }
  ]
};

problems.push(p1_40);

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('New total problems:', problems.length);
console.log('Added 1.40 successfully!');
