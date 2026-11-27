const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.30: Khi kế hoạch học tập bị gián đoạn và em muốn bỏ mục tiêu
const p1_30 = {
  Id: "p1_30",
  Code: "1.30",
  FileName: "Khi kế hoạch học tập bị gián đoạn và em muốn bỏ mục tiêu.docx",
  Title: "Khi kế hoạch học tập bị gián đoạn và em muốn bỏ mục tiêu",
  RootQuestion: "Câu 1. Lần gần nhất em định quay lại kế hoạch, điều gì khiến em khó tiếp tục nhất?",
  Intro: "Em đã đặt mục tiêu học tập và lên kế hoạch để thực hiện. Sau vài buổi không học được như dự định, em thấy nản và nghĩ đến chuyện bỏ luôn mục tiêu đó. Em có thể cho mình thêm thời gian, nhìn lại một buổi gần đây rồi chọn điều em cần nhất lúc này: thử một việc vừa sức, đổi cách, hoặc nghỉ và xem lại sau.",
  Options: [
    { Index: 1, Text: "Em nhìn phần việc còn lại rồi thấy nản, dù vẫn có việc em biết cách làm" },
    { Index: 2, Text: "Em vẫn muốn đạt mục tiêu, nhưng thời gian không còn như lúc lên kế hoạch" },
    { Index: 3, Text: "Em cứ dừng ở một phần cụ thể vì chưa biết cách làm" },
    { Index: 4, Text: "Em biết cách làm nhưng còn thiếu điều kiện để thực hiện" },
    { Index: 5, Text: "Em chưa chắc mục tiêu cũ còn phù hợp" },
    { Index: 6, Text: "Em chưa rõ mình vướng ở đâu, hoặc có nhiều điều cùng lúc" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em nhìn phần việc còn lại rồi thấy nản, dù vẫn có việc em biết cách làm",
      BranchTitle: "Bắt đầu lại bằng một việc quen thuộc và vừa sức",
      Intro: "Khi vài buổi không như dự định, nghĩ đến toàn bộ kế hoạch dễ làm em mệt. Em chỉ cần chọn 1 việc quen thuộc và đủ nhỏ để thử ngay.",
      Question: "Em muốn chọn bước nhỏ nào để khởi động lại?",
      SubOptions: [
        { Index: 1, Text: "Chọn 1 việc quen thuộc vừa quỹ thời gian 10 phút" },
        { Index: 2, Text: "Mở đúng đoạn đã đánh dấu và đọc 1 câu" },
        { Index: 3, Text: "Thu nhỏ hơn nữa hoặc đánh dấu để nghỉ nếu hôm nay chưa đủ sức" }
      ],
      Solutions: [
        {
          Title: "1. Chọn việc quen thuộc có điểm dừng rõ ràng",
          Guide: "Ví dụ: Mục 1 đã xong, mục 2 có đoạn đánh dấu, tối nay chỉ có 10 phút.\n\nChọn 1 việc vừa thời gian và có điểm dừng rõ: “Nói lại một ý ở mục 2 rồi mở vở đối chiếu, xong là dừng”.\n\nGiữ lại một dấu vết nhỏ (một câu đã viết hoặc một ý đã đối chiếu) để thấy mình đã tiến thêm."
        },
        {
          Title: "2. Khởi động từ đúng 1 câu đã đánh dấu",
          Guide: "Nếu vẫn thấy khó bắt đầu, chỉ cần mở đúng đoạn đã đánh dấu và đọc 1 câu. Khi sẵn sàng, thử nói 1 điều em hiểu từ câu đó.\n\nVí dụ: Nếu đã viết phần mở đầu và còn ghi chú 2 ý, trong 12 phút chỉ cần viết thành câu hoàn chỉnh 1 ý trong bản nháp."
        },
        {
          Title: "3. Thu nhỏ tiếp hoặc xin hỗ trợ nếu cảm thấy quá tải",
          Guide: "Nếu đã bắt đầu nhưng việc vẫn quá lớn, giữ phần vừa làm và thu nhỏ thêm một lần nữa.\n\nNếu hôm nay quá mệt, em có quyền đánh dấu chỗ quay lại và nghỉ ngơi, hoặc chia sẻ với cô: “Thưa cô, mấy buổi gần đây em chưa học được như dự định. Cô cùng em chọn một việc em làm được trước không ạ?”."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em vẫn muốn đạt mục tiêu, nhưng thời gian không còn như lúc lên kế hoạch",
      BranchTitle: "Xếp lại lịch theo khoảng thời gian thực sự còn có",
      Intro: "Sau khi tính giờ học, việc đã hẹn và thời gian nghỉ, hãy xem em còn bao nhiêu phút thực sự để xếp phần ưu tiên.",
      Question: "Em muốn sắp xếp lại quỹ thời gian như thế nào?",
      SubOptions: [
        { Index: 1, Text: "Ưu tiên phần bắt buộc và chừa thời gian tự kiểm tra" },
        { Index: 2, Text: "Điều chỉnh lại ước lượng thời gian thực tế cho buổi sau" },
        { Index: 3, Text: "Hỏi thầy cô phần cần làm trước nếu phần bắt buộc vượt thời gian" }
      ],
      Solutions: [
        {
          Title: "1. Chọn phần bắt buộc và gác phần đọc thêm sang sau",
          Guide: "Ước lượng thời gian thực tế rồi xếp việc phục vụ trực tiếp mục tiêu trước hạn.\n\nVí dụ: Sáng thứ Sáu cần giải thích 2 ý, có 20 phút tối nay và 15 phút tối mai -> Dành 15 phút đọc mục chính và 15 phút tự giải thích đối chiếu; phần đọc thêm (25 phút) để sau thứ Sáu."
        },
        {
          Title: "2. Dùng thời gian thực tế để điều chỉnh kế hoạch",
          Guide: "Nếu dự kiến 15 phút nhưng thực tế làm mất 25 phút, đừng ép bản thân làm nhanh ẩu.\n\nChia phần tiếp theo nhỏ hơn hoặc xếp vào một khoảng thời gian dài hơn vào buổi tới."
        },
        {
          Title: "3. Xin thầy cô xác định thứ tự ưu tiên",
          Guide: "Nếu lịch thay đổi đột xuất và phần bắt buộc vẫn vượt thời gian, giữ danh sách ưu tiên và hỏi thầy cô phần nào cần hoàn thành trước."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em cứ dừng ở một phần cụ thể vì chưa biết cách làm",
      BranchTitle: "Gỡ đúng bước bài đang mắc để đi tiếp",
      Intro: "Khi kế hoạch dừng lại vì một bài khó, em chỉ cần gỡ đúng thao tác khiến mình đứng lại.",
      Question: "Em bắt đầu vướng ở thao tác nào?",
      SubOptions: [
        { Index: 1, Text: "Em chưa nói được đề yêu cầu mình làm gì" },
        { Index: 2, Text: "Em hiểu đề nhưng chưa biết chọn thông tin nào" },
        { Index: 3, Text: "Em có thông tin nhưng chưa biết viết lời giải thích" }
      ],
      Solutions: [
        {
          Title: "1. Xác định động từ, đối tượng và phạm vi của đề",
          Guide: "Tìm từ chỉ việc cần làm (so sánh, giải thích...), đối tượng và phạm vi sau chữ 'về'.\n\nVí dụ: “So sánh tự ôn và ôn cùng bạn về cách kiểm tra phần đã hiểu” -> Nêu hai cách giống hoặc khác nhau thế nào về cách kiểm tra phần đã hiểu.\n\nNếu chưa chắc, hỏi cô: “Thưa cô, em hiểu là cần so sánh về tiêu chí này. Em hiểu vậy đúng chưa ạ?”."
        },
        {
          Title: "2. Đặt từng dữ kiện cạnh câu hỏi 'vì sao'",
          Guide: "Khoanh 1 dữ kiện và xem nó trả lời phần nào của đề. Chẳng hạn, 'Nhóm có mặt lúc 7 giờ' chỉ cho biết thời điểm, còn 'Mỗi bạn chuẩn bị sẵn phần mình' mới giải thích vì sao nhóm xong trước giờ trình bày.\n\nNếu 2 dữ kiện đều có vẻ đúng, ghi vai trò từng dữ kiện hoặc mang cả hai đi hỏi."
        },
        {
          Title: "3. Nối dữ kiện với kết quả bằng lời của mình",
          Guide: "Nói thành tiếng trước: “Khi so bản nháp với đề, nhóm thấy mục nào chưa được trả lời”, rồi viết lại thành câu.\n\nNếu vẫn vướng, hỏi: “Thưa cô, em chọn được dữ kiện này nhưng chưa biết nối với kết luận. Cô gợi ý giúp em được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em biết cách làm nhưng còn thiếu điều kiện để thực hiện",
      BranchTitle: "Bổ sung điều kiện còn thiếu hoặc làm trước phần sẵn có",
      Intro: "Đôi khi kế hoạch gián đoạn chỉ vì thiếu tài liệu, thiếu chỗ học yên tĩnh hoặc thiếu người giải đáp 1 bước.",
      Question: "Em cần có thêm điều gì trước tiên?",
      SubOptions: [
        { Index: 1, Text: "Thiếu tài liệu hoặc bản hướng dẫn (bảng tiêu chí)" },
        { Index: 2, Text: "Thiếu chỗ học yên tĩnh hoặc khoảng thời gian liền mạch" },
        { Index: 3, Text: "Cần người giải thích một phần cụ thể" }
      ],
      Solutions: [
        {
          Title: "1. Hỏi rõ tài liệu thiếu và làm phần sẵn có trong lúc chờ",
          Guide: "Gọi tên đúng tài liệu thiếu và xác nhận giờ nhận: “Thưa cô, em đã có bản nháp nhưng chưa tìm thấy bảng tiêu chí. Cô chỉ giúp em xem ở đâu được không ạ?”.\n\nTrong lúc chờ bạn hoặc cô gửi, dùng yêu cầu chung đối chiếu bản nháp trước và đánh dấu chỗ cần kiểm tra lại sau."
        },
        {
          Title: "2. Đề nghị khoảng yên tĩnh với gia đình và tận dụng khoảng ngắn",
          Guide: "Nếu chỗ học đang ồn, tận dụng 10 phút ngắn để chuẩn bị tài liệu, và nói rõ nhu cầu với người nhà:\n“Dạ, sau bữa cơm con cần 20 phút để đọc và tóm tắt bài. Con dùng chỗ yên tĩnh lúc đó được không ạ?”."
        },
        {
          Title: "3. Xin gợi ý đúng bước và hẹn giờ trao đổi",
          Guide: "Nếu cô bận chưa xem được và dặn đọc mục 2 trước, đáp xác nhận:\n“Dạ, em sẽ đọc mục hai. Nếu vẫn chưa hiểu, em có thể hỏi cô sau tiết học ngày mai được không ạ?”.\n\nSau khi được giải thích, tự thử làm lại 1 bước để kiểm tra."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em chưa chắc mục tiêu cũ còn phù hợp",
      BranchTitle: "Điều chỉnh mục tiêu hoặc đổi cách làm cho phù hợp thực tế",
      Intro: "Mục tiêu đặt ra để phục vụ việc học của em, nên em hoàn toàn có quyền điều chỉnh nó cho vừa sức với hoàn cảnh hiện tại.",
      Question: "Khi nghĩ đến kết quả ban đầu, điều nào gần với em nhất?",
      SubOptions: [
        { Index: 1, Text: "Em muốn giữ mục tiêu và đổi cách làm" },
        { Index: 2, Text: "Em muốn đặt một mốc gần hơn và dễ kiểm tra hơn" },
        { Index: 3, Text: "Em muốn chuyển sang một mục tiêu khác cần thiết hơn" },
        { Index: 4, Text: "Em chưa muốn quyết định lúc này và muốn tạm dừng" }
      ],
      Solutions: [
        {
          Title: "1. Giữ mục tiêu nhưng chia nhỏ thành các lượt ngắn",
          Guide: "Thay một buổi dài 40 phút bằng hai lượt ngắn 20 phút. Trong từng khoảng, chỉ đặt 1 việc có thể kiểm tra (ví dụ: tự nói lại 1 ý rồi mở ghi chú đối chiếu)."
        },
        {
          Title: "2. Đặt mốc gần hơn và vừa sức",
          Guide: "Ví dụ: Đổi từ “chuẩn bị 4 ví dụ” thành “dùng 1 ví dụ đã có để giải thích trọn một ý”. Hoặc đổi từ “làm hết bộ câu ôn” thành “làm xong phần để phát hiện chỗ vướng trước giờ học”.\n\nKhông cần dồn phần đã lỡ vào cùng một buổi."
        },
        {
          Title: "3. Chuyển sang mục tiêu mới sát nhu cầu thực tế",
          Guide: "Nếu sắp phải trả lời vấn đáp thay vì nộp bộ ghi chú, chuyển thời gian sang tự tập trả lời và dùng lại những ghi chú đã làm làm câu hỏi tự ôn. Hỏi thầy cô nếu cần xác nhận yêu cầu bắt buộc."
        },
        {
          Title: "4. Tạm dừng có chủ đích và giữ mốc mở lại",
          Guide: "Nếu phần bắt buộc đã xong và phần còn lại do em tự đặt, em có thể để lại 1 dấu ở phần đã làm và cho phép mình tạm dừng, quay lại khi sẵn sàng."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa rõ mình vướng ở đâu, hoặc có nhiều điều cùng lúc",
      BranchTitle: "Nhìn lại buổi học gần nhất để tìm đúng điểm cản trở",
      Intro: "Em hãy nhớ lại ngay trước lúc em dừng, có việc gì vừa xảy ra? Chỉ cần chọn 1 điều quan sát được để kiểm tra.",
      Question: "Trong buổi gần nhất, điều gì vừa thay đổi hoặc làm em dừng lại?",
      SubOptions: [
        { Index: 1, Text: "Dừng ở một câu khó hoặc bước chọn dữ kiện" },
        { Index: 2, Text: "Quỹ thời gian bị thu hẹp đột ngột (từ 45p còn 15p)" },
        { Index: 3, Text: "Nhiều vấn đề kéo dài ảnh hưởng giấc ngủ và sinh hoạt" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra riêng bước cuối cùng trước khi dừng",
          Guide: "Chỉ dòng cuối cùng còn hiểu rồi đặt từng ghi chú cạnh câu hỏi. Nếu vẫn vướng ở bước chọn thông tin, mang cả 2 ghi chú đi hỏi cô."
        },
        {
          Title: "2. Cắt gọn nhiệm vụ cho vừa quỹ thời gian mới",
          Guide: "Khi thời gian chỉ còn 15 phút thay vì 45 phút, chấp nhận điều kiện thực tế và chọn đúng 1 việc làm trọn vẹn trong 15 phút."
        },
        {
          Title: "3. Tìm người lớn hỗ trợ trực tiếp nếu thấy quá sức",
          Guide: "Chia sẻ với thầy cô hoặc cán bộ tư vấn học đường:\n“Thưa cô, chuyện học gần đây đang ảnh hưởng đến sinh hoạt của em. Cô có thể gặp riêng em hoặc giúp em liên hệ người phụ trách tư vấn học đường được không ạ?”."
        }
      ]
    }
  ]
};

// 2. Tình huống 1.31: Khi em muốn ôn đều nhưng thường dời buổi học
const p1_31 = {
  Id: "p1_31",
  Code: "1.31",
  FileName: "Khi em muốn ôn đều nhưng thường dời buổi học.docx",
  Title: "Khi em muốn ôn đều nhưng thường dời buổi học",
  RootQuestion: "Câu 1. Trong buổi gần nhất em dời hoặc dừng việc ôn, điều gì đã xảy ra?",
  Intro: "Sau nhiều tuần ôn tập, em nhận ra mình hay dời buổi ôn sang hôm khác (lướt mạng/chơi game quá giờ, bị điện thoại ngắt quãng, gặp câu khó rồi bỏ ngang hoặc thấy ngán). Hãy bắt đầu từ một điều em muốn tự làm được trong lần kiểm tra tới, rồi chọn một thay đổi vừa sức.",
  Options: [
    { Index: 1, Text: "Trước giờ ôn, em chơi game hoặc lướt mạng lâu hơn dự định" },
    { Index: 2, Text: "Em đã mở bài nhưng nhiều lần dừng để xem điện thoại" },
    { Index: 3, Text: "Em gặp một chỗ chưa biết làm rồi mới chuyển sang việc khác" },
    { Index: 4, Text: "Lúc đầu em còn theo được bài, sau đó em thấy mệt và khó tập trung" },
    { Index: 5, Text: "Em vẫn tập trung được nhưng thấy ngán vì cứ ôn theo cùng một cách" },
    { Index: 6, Text: "Đến giờ định ôn, em vẫn còn việc khác cần làm hoặc thời gian đã thay đổi" },
    { Index: 7, Text: "Em chưa rõ, hoặc có nhiều việc xảy ra cùng lúc" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Trước giờ ôn, em chơi game hoặc lướt mạng lâu hơn dự định",
      BranchTitle: "Giữ giờ ôn, giờ ngủ và thay thế thói quen mở máy",
      Intro: "Một lần chơi lâu chưa phải là 'nghiện'. Điều quan trọng là nhận ra lúc mình định dừng và thay thế bằng một hành động dễ bắt đầu hơn.",
      Question: "Điều gì làm em khó dừng chơi/lướt mạng trước giờ ôn nhất?",
      SubOptions: [
        { Index: 1, Text: "Muốn giữ giờ bắt đầu ôn nhưng bị cuốn vào ván mới" },
        { Index: 2, Text: "Muốn giữ giờ chuẩn bị đi ngủ buổi tối" },
        { Index: 3, Text: "Ngại từ chối bạn đang chờ chơi cùng" },
        { Index: 4, Text: "Thói quen cứ ngồi vào bàn là mở máy ngay" },
        { Index: 5, Text: "Thường xuyên khó dừng làm ảnh hưởng học tập và giấc ngủ" }
      ],
      Solutions: [
        {
          Title: "1. Làm 1 câu trước khi mở máy & mở sẵn trang vở",
          Guide: "Chuẩn bị sẵn câu ôn đã đánh dấu. Gần đến giờ ôn không vào thêm ván mới.\n\nÁp dụng nguyên tắc: “Khi ngồi vào bàn sau bữa tối, em sẽ tự làm câu đã đánh dấu trước rồi mới quyết định có mở game/mạng không”."
        },
        {
          Title: "2. Chọn mốc dừng sớm và việc làm ngay khi chuông reo",
          Guide: "Nếu định đi ngủ lúc 22h15, không vào ván dài 25 phút lúc 22h05.\n\nChuẩn bị sẵn 1 việc làm ngay khi chuông reo: cắm sạc điện thoại xa giường và soạn đồ cho ngày mai."
        },
        {
          Title: "3. Câu nói từ chối khéo léo với bạn bè",
          Guide: "Báo trước mốc mình sẽ rời. Khi được rủ thêm, nói tự nhiên:\n- “Mình làm câu ôn trước nhé. Xong mình nhắn bạn sau.”\n- “Mình đã hẹn ôn lúc 20 giờ, ván này mình không vào nhé. Mai có thời gian mình chơi tiếp.”"
        },
        {
          Title: "4. Đổi cách nghỉ ngắn có điểm kết thúc rõ ràng",
          Guide: "Thay vì mở máy để nghỉ 5 phút (dễ lố thành 1 tiếng), chọn cách nghỉ có điểm kết thúc rõ: uống cốc nước, đi lại một vòng hoặc nghe đúng 1 bài nhạc rồi ngồi vào câu đã đánh dấu."
        },
        {
          Title: "5. Nhờ người lớn đồng hành nếu khó dừng kéo dài",
          Guide: "Nếu nhiều lần muốn dừng mà không được làm ảnh hưởng giờ ngủ và việc học, hãy chia sẻ với ba mẹ hoặc thầy cô:\n“Dạ, con đã thử đặt giờ dừng nhưng nhiều hôm vẫn dùng lâu hơn dự định. Ba mẹ cùng con xem một buổi và chọn một cách để thử được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em đã mở bài nhưng nhiều lần dừng để xem điện thoại",
      BranchTitle: "Giảm xao nhãng từ điện thoại và quay lại đúng chỗ",
      Intro: "Khi bị ngắt quãng bởi tin nhắn hay thói quen cầm máy, em cần một mẹo nhỏ để quay lại mạch bài ngay lập tức.",
      Question: "Điều gì kéo sự chú ý của em khỏi bài học?",
      SubOptions: [
        { Index: 1, Text: "Có thông báo tin nhắn hiện lên hoặc tự cầm máy theo thói quen" },
        { Index: 2, Text: "Đang dùng điện thoại xem tài liệu rồi lướt sang ứng dụng khác" },
        { Index: 3, Text: "Lỡ mở tin nhắn xong quay lại quên mất mình đang làm đến đâu" }
      ],
      Solutions: [
        {
          Title: "1. Tắt thông báo phụ hoặc đặt máy ngoài tầm tay",
          Guide: "Tạm tắt thông báo nhóm chat chưa gấp (vẫn giữ chuông cuộc gọi từ người nhà). Nếu buổi ôn không cần đến điện thoại, hãy đặt máy sang bàn khác hoặc ngoài tầm với."
        },
        {
          Title: "2. Mở sẵn đúng tài liệu hoặc dùng bản giấy",
          Guide: "Mở sẵn đúng trang tài liệu trước khi ngồi vào bàn, đóng hết các tab/ứng dụng giải trí. Nếu có thể, in ra giấy hoặc chép ý cần xem ra vở để khỏi đụng vào máy."
        },
        {
          Title: "3. Ghi 'mỏ neo quay lại' ngay trên đầu trang vở",
          Guide: "Ghi rõ câu đang làm và thao tác kế tiếp ra nháp, ví dụ: “Câu 2, so hai dữ kiện”.\n\nNếu lỡ xem tin nhắn, đóng máy lại, nhìn ngay vào dòng mỏ neo đó và thực hiện đúng thao tác đã ghi."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em gặp một chỗ chưa biết làm rồi mới chuyển sang việc khác",
      BranchTitle: "Gỡ bước bị kẹt khiến em chán nản bỏ sang giải trí",
      Intro: "Nhiều khi em không phải lười, mà vì gặp đúng 1 bước chưa biết làm nên mới tìm sang điện thoại. Hãy gỡ ngay bước đó.",
      Question: "Ngay trước lúc rời bài, em chưa làm được việc gì?",
      SubOptions: [
        { Index: 1, Text: "Chưa nói được đề muốn mình làm gì" },
        { Index: 2, Text: "Hiểu đề nhưng chưa biết dùng thông tin nào" },
        { Index: 3, Text: "Có thông tin nhưng chưa biết viết thành câu trả lời" }
      ],
      Solutions: [
        {
          Title: "1. Đọc kỹ từ chỉ việc cần làm và phạm vi của đề",
          Guide: "Tìm động từ chính (so sánh, giải thích...) và cụm đứng sau từ 'về'. Nói lại yêu cầu bằng 1 câu của riêng em trước khi làm.\n\nNếu chưa chắc, hỏi cô: “Thưa cô, em hiểu là cần so sánh hai cách về điểm này. Em hiểu vậy đã đúng chưa ạ?”."
        },
        {
          Title: "2. Đối chiếu từng dữ kiện với câu hỏi 'vì sao'",
          Guide: "Đặt từng ghi chú cạnh câu hỏi. Ghi chú chỉ nêu thời gian không trả lời cho câu hỏi 'vì sao'. Khoanh dữ kiện trả lời đúng trọng tâm rồi mới viết."
        },
        {
          Title: "3. Nối dữ kiện với kết quả thành câu hoàn chỉnh",
          Guide: "Nói trước bằng lời: “Nhờ ghép bài trước hạn một ngày, nhóm còn thời gian sửa những đoạn trùng ý”, rồi viết lại.\n\nNếu vẫn vướng, hỏi cô: “Cô gợi ý giúp em cách nối dữ kiện này với kết quả được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Lúc đầu em còn theo được bài, sau đó em thấy mệt và khó tập trung",
      BranchTitle: "Nhận diện dấu hiệu mệt và nghỉ đúng lúc",
      Intro: "Khi đọc cùng một đoạn nhiều lần mà vẫn chưa nắm ý, đó là dấu hiệu não cần nghỉ ngơi.",
      Question: "Em muốn xử lý cơn mệt trong buổi ôn thế nào?",
      SubOptions: [
        { Index: 1, Text: "Đánh dấu chỗ dừng và để lại lời nhắc ngắn trước khi nghỉ" },
        { Index: 2, Text: "Hỏi ưu tiên nếu đã nghỉ mà vẫn mệt khi bài sắp đến hạn" }
      ],
      Solutions: [
        {
          Title: "1. Đặt dấu nhắc ngắn để không mất dấu khi quay lại",
          Guide: "Nếu đọc đoạn 3 nhiều lần không vào và sắp đến giờ ăn, đánh dấu đầu đoạn 3 và ghi: “Mở đoạn 3, đọc một lượt rồi nói một ý em hiểu”.\n\nNếu quá mệt để ghi, chỉ cần gấp vở lại nghỉ ngay."
        },
        {
          Title: "2. Điều chỉnh lượng bài hoặc nhờ thầy cô chọn phần ưu tiên",
          Guide: "Nếu vẫn mệt khi quay lại và bài gần đến hạn, hỏi thầy cô phần nào cần ưu tiên trước. Nếu mệt kéo dài ảnh hưởng giấc ngủ/sinh hoạt, hãy tìm người hỗ trợ trực tiếp."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em vẫn tập trung được nhưng thấy ngán vì cứ ôn theo cùng một cách",
      BranchTitle: "Làm mới buổi ôn để tự kiểm tra khả năng nhớ và vận dụng",
      Intro: "Thay vì đọc thụ động, hãy biến buổi ôn thành thử thách tự kiểm tra nhanh.",
      Question: "Sau lượt ôn, em muốn tự kiểm tra được điều gì?",
      SubOptions: [
        { Index: 1, Text: "Tự nhớ được một ý hoặc các bước khi che tài liệu" },
        { Index: 2, Text: "Tự dùng điều vừa ôn để làm một câu mới" }
      ],
      Solutions: [
        {
          Title: "1. Che sách tự nói lại và chỉ xem lại đúng ý thiếu",
          Guide: "Đọc mục ngắn, che lại rồi tự nói các bước theo thứ tự. Nếu thiếu bước giữa (như bước đối chiếu), chỉ mở xem lại đúng câu giữa rồi che lại nói lần nữa."
        },
        {
          Title: "2. Đối chiếu nháp với đề mới để bổ sung ý thiếu",
          Guide: "Đặt bản nháp cạnh yêu cầu của câu mới, đánh dấu yêu cầu nào chưa có câu trả lời (ví dụ: đã nêu hai con số nhưng chưa viết câu so sánh) và bổ sung ngay phần đó."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Đến giờ định ôn, em vẫn còn việc khác cần làm hoặc thời gian đã thay đổi",
      BranchTitle: "Xếp lại buổi ôn theo thời gian thực tế còn có",
      Intro: "Không nhất thiết phải học đủ 45 phút mới gọi là ôn. Hãy tận dụng khoảng thời gian thật sự có để làm việc quan trọng nhất.",
      Question: "Em muốn sắp xếp lại quỹ thời gian ra sao?",
      SubOptions: [
        { Index: 1, Text: "Chọn việc cần cho ngày mai và chừa thời gian tự kiểm tra" },
        { Index: 2, Text: "Điều chỉnh lượng việc nếu thực tế làm lâu hơn dự kiến" }
      ],
      Solutions: [
        {
          Title: "1. Xếp phần chính trước hạn và để phần phụ sang sau",
          Guide: "Ví dụ chỉ có 20 phút tối nay: dùng 10 phút đọc phần chính và 10 phút tự giải thích đối chiếu; phần đọc thêm (25 phút) để sang buổi khác.\n\nNếu còn 15 phút tối nay và 10 phút sáng mai: hoàn thiện nội dung + kiểm tra trước, bỏ qua việc chép lại cả trang."
        },
        {
          Title: "2. Chia nhỏ bài hoặc hỏi thầy cô phần ưu tiên",
          Guide: "Dùng thời gian đo được ở buổi thật để chia nhỏ phần sau. Nếu nhiều việc bắt buộc dồn cùng hạn, hỏi: “Thưa cô, với thời gian còn lại, cô giúp em xác định phần cần hoàn thành trước được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em chưa rõ, hoặc có nhiều việc xảy ra cùng lúc",
      BranchTitle: "Truy vết trình tự buổi ôn để duy trì đều đặn nhiều buổi",
      Intro: "Nhìn lại thứ tự diễn biến của một buổi giúp em phát hiện đúng nguyên nhân: do điện thoại hay do gặp bài khó trước rồi mới mở máy.",
      Question: "Em muốn kiểm tra khía cạnh nào trước?",
      SubOptions: [
        { Index: 1, Text: "Truy vết thứ tự: gặp câu khó trước hay xem điện thoại trước" },
        { Index: 2, Text: "Kế hoạch duy trì đều trong 3 buổi tới và cách quay lại nếu lỡ buổi" }
      ],
      Solutions: [
        {
          Title: "1. Xác định điểm ngắt mạch đầu tiên",
          Guide: "Nếu mở vở làm được câu 1, sang câu 2 bị kẹt rồi mới mở video -> Vấn đề là ở câu 2, cần gỡ câu 2.\n\nNếu chưa rõ, hỏi cô: “Thưa cô, dạo này em hay dời buổi ôn mà chưa rõ vì sao. Cô cùng em xem một buổi gần đây được không ạ?”."
        },
        {
          Title: "2. Nhật ký 3 dòng để giữ nhịp đều qua 3 buổi tới",
          Guide: "Sau mỗi buổi chỉ cần tự nhủ 3 dòng:\n1. Việc định làm (ví dụ: Tự trả lời câu đánh dấu).\n2. Việc thực tế xảy ra.\n3. Điều muốn giữ hoặc đổi cho buổi tới.\n\nNếu lỡ 1 buổi (ví dụ thứ Ba), tối thứ Tư có 15 phút chỉ cần làm 1 câu ở phần đang dở rồi đối chiếu, không cần dồn bù cả buổi cũ."
        }
      ]
    }
  ]
};

// 3. Tình huống 1.32: Khi em đã ôn lại mà số câu đúng vẫn chưa tăng
const p1_32 = {
  Id: "p1_32",
  Code: "1.32",
  FileName: "Khi em đã ôn lại mà số câu đúng vẫn chưa tăng.docx",
  Title: "Khi em đã ôn lại mà số câu đúng vẫn chưa tăng",
  RootQuestion: "Câu 1. Lúc này, em muốn được giúp việc gì trước?",
  Intro: "Trước khi ôn phần đầu, em làm bài tự kiểm tra ngắn. Ôn xong làm lại thấy số câu đúng vẫn bằng lần trước nên em thấy hụt hẫng và nản. Hãy nhìn lại một câu để biết thực ra mình đã tiến bộ ở đâu và chỉ còn cần sửa đúng bước nào.",
  Options: [
    { Index: 1, Text: "Em muốn xem bài làm đã thay đổi ở đâu dù số câu đúng vẫn bằng nhau" },
    { Index: 2, Text: "Em muốn tìm và sửa bước khiến mình sai lại ở câu cũ" },
    { Index: 3, Text: "Em muốn tập tự làm sau khi đã xem tài liệu" },
    { Index: 4, Text: "Em đang nản và muốn chọn điều vừa sức với mình lúc này" },
    { Index: 5, Text: "Em muốn nhờ ai đó cùng xem bài hoặc lắng nghe em" },
    { Index: 6, Text: "Em muốn tìm chỗ đang vướng vì chưa biết nên xem từ đâu" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn xem bài làm đã thay đổi ở đâu dù số câu đúng vẫn bằng nhau",
      BranchTitle: "So sánh chi tiết hai lượt làm để thấy điểm tiến bộ thật sự",
      Intro: "Tổng số câu đúng bằng nhau không có nghĩa là em không tiến bộ. Có thể em đã làm đúng được câu mới mà chỉ sơ suất ở câu khác.",
      Question: "Em còn giữ bài làm của cả hai lần không?",
      SubOptions: [
        { Index: 1, Text: "Còn cả hai bài để đặt cạnh nhau đối chiếu" },
        { Index: 2, Text: "Chỉ nhớ tổng số câu đúng của hai lần" }
      ],
      Solutions: [
        {
          Title: "1. Bỏ qua các câu giống nhau, chỉ xét các câu thay đổi",
          Guide: "Đặt hai bài cạnh nhau, gạch bỏ những câu giống nhau ở cả hai lần.\n\nVí dụ: Lần đầu đúng 1, 3, 4; Lần sau đúng 1, 2, 4 -> Thực tế em đã khắc phục được câu 2 (từ sai thành đúng!), chỉ cần xem lại vì sao câu 3 lại sai thôi."
        },
        {
          Title: "2. Dùng bài hiện tại làm mốc cho lần kiểm tra sau",
          Guide: "Nếu không còn bài cũ, ghi lại đúng 1 bước mình tự làm được ở bài hiện tại để làm mốc đối chiếu rõ ràng cho lượt ôn tiếp theo."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn tìm và sửa bước khiến mình sai lại ở câu cũ",
      BranchTitle: "Sửa đúng bước gây sai lặp lại ở câu cũ",
      Intro: "Không cần học lại tất cả từ đầu, hãy kiểm tra xem em sai ở khâu hiểu đề, chọn dữ kiện hay viết lời giải thích.",
      Question: "Khi xem câu sai, em cần được giúp ở bước nào?",
      SubOptions: [
        { Index: 1, Text: "Em chưa hiểu rõ yêu cầu của đề" },
        { Index: 2, Text: "Em chưa biết chọn thông tin/dữ kiện nào" },
        { Index: 3, Text: "Em chưa viết được lời giải thích hoàn chỉnh" }
      ],
      Solutions: [
        {
          Title: "1. Đọc kỹ từ khóa hành động và phạm vi đề",
          Guide: "Tìm động từ chính (so sánh, giải thích...) và cụm phạm vi (sau chữ 'về'). Nói lại yêu cầu bằng 1 câu của chính em rồi đối chiếu với đề hoặc hỏi thầy cô xác nhận."
        },
        {
          Title: "2. Kiểm tra dữ kiện có trả lời thẳng từ khóa 'vì sao' không",
          Guide: "Đặt từng dữ kiện cạnh câu hỏi. Dữ kiện chỉ nêu giờ giấc (19 giờ) trả lời cho 'lúc nào', còn dữ kiện nêu hành động (ghép bài trước hạn 1 ngày) mới trả lời cho 'vì sao'."
        },
        {
          Title: "3. Viết câu nối dữ kiện với kết quả",
          Guide: "Che mẫu và nối hành động với tác dụng:\n“Nhờ đặt bản nháp cạnh đề và đọc từng mục, nhóm phát hiện ra mục chưa có câu trả lời”.\n\nNếu vẫn vướng, hỏi cô: “Em đã chọn dữ kiện này, cô gợi ý giúp em cách nối với kết quả được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em muốn tập tự làm sau khi đã xem tài liệu",
      BranchTitle: "Luyện tự lập sau khi che tài liệu và kiểm tra kết quả",
      Intro: "Hiểu khi nhìn tài liệu khác với tự làm khi không nhìn tài liệu. Hãy luyện từng bước để ghi nhớ vững chắc.",
      Question: "Khi che tài liệu, em cần tập việc gì?",
      SubOptions: [
        { Index: 1, Text: "Em hay quên bước đầu tiên khi vừa che tài liệu" },
        { Index: 2, Text: "Em nhớ các bước nhưng chưa biết áp dụng vào câu mới" },
        { Index: 3, Text: "Em làm được nhưng chưa biết cách tự kiểm tra lại" }
      ],
      Solutions: [
        {
          Title: "1. Chỉ mở lại đúng 1 dòng bị quên rồi che tiếp",
          Guide: "Đọc hướng dẫn 3 bước (ví dụ: Đọc yêu cầu -> So từng yêu cầu -> Sửa phần thiếu), che lại và nói bước đầu.\n\nNếu quên bước nào, chỉ mở xem đúng câu đó rồi che lại và tự nói lại một lần nữa."
        },
        {
          Title: "2. Đặt bản nháp cạnh yêu cầu đề mới để tìm phần thiếu",
          Guide: "Ví dụ đề mới đòi hỏi 'nêu thời gian hai cách và so sánh', trong khi nháp mới ghi 2 con số thời gian -> Đánh dấu phần 'so sánh' chưa có và viết bổ sung ngay câu so sánh."
        },
        {
          Title: "3. Kiểm tra từng yêu cầu xem đã đủ và không trùng nhau",
          Guide: "Đề đòi 'một lợi ích và một lý do', kiểm tra xem trong câu của mình đã có đủ 2 vế đó chưa bằng cách gạch chân riêng từng vế."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đang nản và muốn chọn điều vừa sức với mình lúc này",
      BranchTitle: "Tự động viên công bằng và chọn bước nhỏ vừa sức",
      Intro: "Khi thấy điểm không tăng, đừng phủ nhận toàn bộ công sức của mình. Hãy nhìn vào phần em đã làm được.",
      Question: "Em muốn làm gì với bài hiện tại?",
      SubOptions: [
        { Index: 1, Text: "Nhìn nhận phần tiến bộ nhỏ trên bài và làm 1 bước kế tiếp" },
        { Index: 2, Text: "Đánh dấu chỗ vướng để nghỉ ngơi một lúc" }
      ],
      Solutions: [
        {
          Title: "1. Nói với mình bằng giọng khách quan như nói với bạn",
          Guide: "Ví dụ: “Hai lần đều đúng 3/5 câu, nhưng lần này mình đã tự giải thích được bước đầu của câu 4 rồi”.\n\nChỉ chọn xem lại đúng bước sau của câu 4 hoặc thu nhỏ mục tiêu ôn lại."
        },
        {
          Title: "2. Cất bài có điểm hẹn hoặc tìm hỗ trợ nếu nản kéo dài",
          Guide: "Em hoàn toàn có quyền dừng lại nghỉ ngơi. Nếu đã ôn nhiều lần mà vẫn thấy quá nản, chia sẻ với cô: “Thưa cô, em đã thử ôn lại nhưng vẫn thấy rất nản và khó học tiếp. Cô cùng em xem một câu hoặc nghe em nói chuyện riêng một chút được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn nhờ ai đó cùng xem bài hoặc lắng nghe em",
      BranchTitle: "Nhờ thầy cô hoặc bạn bè so sánh lỗi và lắng nghe",
      Intro: "Đôi khi một góc nhìn từ thầy cô hoặc bạn bè sẽ chỉ ra ngay chi tiết nhỏ em vô tình bỏ qua.",
      Question: "Em muốn người ấy giúp việc gì trước?",
      SubOptions: [
        { Index: 1, Text: "Nhờ giải thích đúng 1 lỗi hoặc 1 bước bị sai" },
        { Index: 2, Text: "Nhờ cùng đối chiếu hai lượt làm để tìm chỗ thay đổi" },
        { Index: 3, Text: "Chỉ muốn được lắng nghe cảm giác hụt hẫng trước" }
      ],
      Solutions: [
        {
          Title: "1. Xin gợi ý cách làm thay vì chỉ nhận đáp án",
          Guide: "Nói rõ: “Thưa cô, em hiểu đề hỏi nguyên nhân nhưng chưa biết chọn dữ kiện nào. Cô giúp em xem đúng bước đó được không ạ?”.\n\nNếu bạn bận định gửi đáp án, hỏi thêm: “Bạn giải thích ngắn lý do chọn dữ kiện đó giúp mình nhé”."
        },
        {
          Title: "2. Mở lời nhờ cùng soi lại hai bài",
          Guide: "“Thưa cô, hai lần em đúng bằng nhau nhưng câu 2 đổi từ đúng sang sai. Sau tiết cuối, cô cùng em xem dòng đầu tiên khác nhau được không ạ?”."
        },
        {
          Title: "3. Đề nghị được lắng nghe trước khi nhận lời khuyên",
          Guide: "Nếu đối phương vội khuyên “Ôn lại đi”, đáp nhẹ nhàng: “Cảm ơn bạn. Cho mình kể hết chuyện hôm nay một chút trước khi bàn cách ôn nhé”."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em muốn tìm chỗ đang vướng vì chưa biết nên xem từ đâu",
      BranchTitle: "Kiểm tra theo 3 bước để phát hiện điểm lệch",
      Intro: "Khi nhìn một câu sai, hãy kiểm tra lần lượt từ lúc đọc đề, lúc chọn thông tin đến lúc viết kết luận.",
      Question: "Em muốn kiểm tra lại theo trình tự nào?",
      SubOptions: [
        { Index: 1, Text: "Rà soát 3 khâu: Đọc đề -> Chọn dữ kiện -> Viết câu" },
        { Index: 2, Text: "Thử áp dụng vào câu mới và chọn bước tiếp theo" }
      ],
      Solutions: [
        {
          Title: "1. Đối chiếu 3 khâu để tìm đúng chỗ lệch",
          Guide: "Ví dụ: Đề hỏi 'so sánh hai cách về thời gian' (20p và 30p), nháp chỉ ghi 'Cách B mất 30 phút' -> Khâu lệch là thiếu dữ kiện của Cách A và thiếu câu so sánh.\n\nSửa đúng khâu bị lệch đó rồi kiểm tra lại."
        },
        {
          Title: "2. Chọn hướng đi tiếp sau khi tìm ra chỗ vướng",
          Guide: "Nếu đã tự làm được bước từng vướng, giữ cách ôn đó và sang phần mới.\n\nNếu vẫn sai ở bước cũ, đổi cách học riêng bước đó hoặc nhờ thầy cô xem cùng."
        }
      ]
    }
  ]
};

const existingCodes = problems.map(p => p.Code);
if (!existingCodes.includes("1.30")) {
  problems.push(p1_30);
  console.log("Added 1.30");
}
if (!existingCodes.includes("1.31")) {
  problems.push(p1_31);
  console.log("Added 1.31");
}
if (!existingCodes.includes("1.32")) {
  problems.push(p1_32);
  console.log("Added 1.32");
}

console.log('New total problems:', problems.length);
fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('Saved questions_data.json successfully!');
