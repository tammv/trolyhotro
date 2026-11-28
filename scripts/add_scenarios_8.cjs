const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.38: Khi em khó sắp xếp thời gian giữa việc học ở trường và học thêm
const p1_38 = {
  Id: "p1_38",
  Code: "1.38",
  FileName: "Khi em khó sắp xếp thời gian giữa việc học ở trường và học thêm.docx",
  Title: "Khi em khó sắp xếp thời gian giữa việc học ở trường và học thêm",
  RootQuestion: "Câu 1. Điều gì khiến em khó thu xếp việc học nhất lúc này?",
  Intro: "Có những ngày em học ở trường rồi đi học thêm. Về nhà, em còn bài cần nộp ở trường, bài học thêm và phần chuẩn bị cho ngày mai, dẫn đến sát giờ ngủ vẫn còn bài dang dở.\n\nEm cứ bắt đầu từ một ngày gần đây khiến em khó xoay xở: một bài cụ thể, một hạn nộp hoặc một khoảng giờ hay bị kẹt là đủ để tìm cách gỡ.",
  Options: [
    { Index: 1, Text: "Em có nhiều bài cần làm và chưa biết bài nào nên làm trước" },
    { Index: 2, Text: "Em chưa biết mình thực sự còn bao nhiêu thời gian để tự học" },
    { Index: 3, Text: "Có một bài làm em mất nhiều thời gian hơn dự kiến" },
    { Index: 4, Text: "Em đã thử sắp xếp nhưng lịch học thêm vẫn thường xuyên khiến em học muộn hoặc bỏ dở bài ở trường" },
    { Index: 5, Text: "Em thấy rối khi nhìn nhiều việc đang dồn lại và muốn có người giúp em bắt đầu" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em có nhiều bài cần làm và chưa biết bài nào nên làm trước",
      BranchTitle: "Xếp thứ tự ưu tiên theo hạn nộp và quỹ thời gian thật",
      Intro: "Thay vì làm theo cảm tính hoặc chọn bài dễ trước, em chỉ cần đối chiếu hạn nộp thực tế của từng bài.",
      Question: "Với hai bài em đang phân vân, em muốn xử lý bước nào?",
      SubOptions: [
        { Index: 1, Text: "Ghi hạn nộp của hai bài và chọn việc cần sớm hơn làm trước" },
        { Index: 2, Text: "Xử lý khi gặp câu giữ em quá lâu trong bài ưu tiên" },
        { Index: 3, Text: "Tận dụng khoảng trống ngày mai nếu cả hai bài đều gần hạn" }
      ],
      Solutions: [
        {
          Title: "1. Đặt hạn nộp cạnh thời lượng cần làm",
          Guide: "Ví dụ: Có 35 phút. Phiếu ở trường nộp sáng mai (mất 20 phút), bài học thêm 2 ngày nữa mới dùng (mất 25 phút).\n\nCách xếp: Dành 20 phút làm xong phiếu sáng mai, 10 phút đọc trước đề bài học thêm và đánh dấu câu sẽ làm tiếp, chừa 5 phút dự phòng."
        },
        {
          Title: "2. Không để một câu khó làm kẹt toàn bộ buổi tối",
          Guide: "Nếu một câu trong bài ưu tiên giữ em quá lâu, đánh dấu câu ấy lại, làm phần còn lại trước rồi mới quay lại hoặc viết câu hỏi nhờ cô:\n“Thưa cô, em đã làm được phần này và còn vướng phần kia. Cô giúp em xác định phần cần hoàn thành trước được không ạ?”"
        },
        {
          Title: "3. Tách hai bài vào hai khoảng thời gian khác nhau nếu có thể",
          Guide: "Nếu bài trường cần sáng mai còn bài học thêm cần tối mai, đừng cố dồn cả hai vào tối nay. Hãy dùng khoảng trống sau giờ học chiều mai (trước giờ học thêm) cho bài buổi tối."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em chưa biết mình thực sự còn bao nhiêu thời gian để tự học",
      BranchTitle: "Tính quỹ thời gian thực tế từ lúc sẵn sàng ngồi vào bàn",
      Intro: "Nhiều bạn tính giờ học từ lúc vừa về đến nhà nên bị hụt vì còn thời gian ăn uống, tắm rửa và nghỉ ngơi.",
      Question: "Trong một ngày có học thêm, em muốn tính và điều chỉnh thời gian thế nào?",
      SubOptions: [
        { Index: 1, Text: "Tính đúng khoảng trống từ lúc sẵn sàng mở vở đến giờ cần đi ngủ" },
        { Index: 2, Text: "Chia khối thời gian ngắn có chừa phút nghỉ và phút dự phòng" },
        { Index: 3, Text: "Điều chỉnh nhanh khi hôm đó về muộn hơn dự kiến" }
      ],
      Solutions: [
        {
          Title: "1. Chỉ tính từ lúc mở vở đến giờ dừng",
          Guide: "Ví dụ: Về nhà 20h15, ăn uống xong mở vở lúc 21h00 và cần ngủ lúc 22h00 -> Quỹ thời gian thực tế là **60 phút** (không phải 1 giờ 45 phút)."
        },
        {
          Title: "2. Chia nhịp 25-5-20-10 thay vì nhồi kín",
          Guide: "Với 60 phút: làm 1 việc 25 phút, nghỉ 5 phút, làm phần ngắn 20 phút và giữ 10 phút dự phòng.\n\nNếu quỹ thời gian chỉ có 45 phút mà 2 bài mất 45 phút, muốn nghỉ thì làm trọn bài cần sớm và chỉ làm 1 phần nhỏ của bài kia."
        },
        {
          Title: "3. Khi bắt đầu muộn hơn dự định, vẫn giữ giờ dừng để ngủ",
          Guide: "Nếu dự kiến học 60 phút nhưng bị muộn mất 20 phút (chỉ còn 40 phút), chọn làm trọn 1 bài cần gấp nhất và dời bài kia sang khoảng trống khác, không cắt giờ ngủ.\n\nNếu lịch luôn thiếu dù tính đúng, hãy nhờ gia đình hoặc thầy cô cùng xem lại."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Có một bài làm em mất nhiều thời gian hơn dự kiến",
      BranchTitle: "Gỡ điểm nghẽn khiến một bài kéo dài quá lâu",
      Intro: "Hãy mở đúng bài đang làm em chậm lại, chỉ dòng cuối em tự làm được và xem nguyên nhân khiến bài kéo dài.",
      Question: "Khi mở bài làm em mất nhiều thời gian, em dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Chưa hiểu đề yêu cầu gì hoặc chưa biết bước tiếp theo" },
        { Index: 2, Text: "Làm được nhưng bài dài hơn dự kiến" },
        { Index: 3, Text: "Bài ở trường và bài học thêm có phần luyện giống nhau" }
      ],
      Solutions: [
        {
          Title: "1. Nói lại đề bằng 1 câu và không lặp ý",
          Guide: "• Chưa hiểu đề: Đọc và nói lại việc cần làm (ví dụ: 'Đề xuất 1 thay đổi và nêu dấu hiệu kiểm tra').\n• Bí bước kế: Giữ phần đã làm, kiểm tra xem hai lý do có bị trùng ý không (vd: 'kịp hạn' và 'làm nhanh' giống nhau -> đổi sang dữ kiện khác như 'dùng đồ có sẵn' hay 'chia được cho 2 người')."
        },
        {
          Title: "2. Đo thời gian 1 phần để đặt điểm dừng thực tế",
          Guide: "Nếu làm 1 phần mất 12 phút mà còn 2 phần tương tự và chỉ còn 18 phút, đừng cố làm hết cả 2 phần. Làm trọn 1 phần nữa rồi dừng đúng giờ và ghi chỗ sẽ làm tiếp."
        },
        {
          Title: "3. Tách phần bắt buộc nộp với phần luyện tự chọn",
          Guide: "Kiểm tra lời giao của từng bài: giữ đủ phần phải nộp (có hạn), còn phần luyện tương tự ghi 'tự chọn' thì chỉ làm câu giúp kiểm tra chỗ yếu nếu còn giờ.\n\nNếu chưa rõ: “Thưa cô, phần này em cần nộp đủ hay có thể chọn câu để luyện ạ?”"
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đã thử sắp xếp nhưng lịch học thêm vẫn thường xuyên khiến em học muộn hoặc bỏ dở bài ở trường",
      BranchTitle: "Trao đổi với gia đình để điều chỉnh lịch học thêm quá tải",
      Intro: "Nếu đã thu xếp hợp lý mà lịch học thêm vẫn liên tục đẩy em vào thế học sát giờ ngủ, em có thể cùng ba mẹ xem lại một buổi cụ thể.",
      Question: "Em muốn chuẩn bị cuộc trao đổi với gia đình như thế nào?",
      SubOptions: [
        { Index: 1, Text: "Mở lời nêu rõ buổi nào có ích và buổi nào đang làm mình quá tải" },
        { Index: 2, Text: "Đáp lại khéo léo khi ba mẹ lo đổi lịch sẽ không theo kịp bài" },
        { Index: 3, Text: "Thử nghiệm 1 tuần hoặc nhờ thầy cô chủ nhiệm cùng xem lịch" }
      ],
      Solutions: [
        {
          Title: "1. Ghi nhận lợi ích trước khi đề xuất đổi giờ/lịch",
          Guide: "Mẫu câu gợi ý:\n“Dạ, con hiểu ba mẹ muốn con theo kịp bài. Buổi thứ Ba giúp con hiểu phần đang vướng. Hai tối thứ Năm vừa rồi, con về muộn và chưa làm xong bài ở trường trước giờ ngủ. Ba mẹ có thể cùng con xem buổi thứ Năm có đổi giờ được không ạ? Mình thử một tuần rồi xem con có nộp bài đúng hạn không ạ?”"
        },
        {
          Title: "2. Khi ba mẹ lo chưa kịp bài hoặc tuần này chưa đổi được",
          Guide: "• Nếu ba mẹ lo hổng bài: Nhắc lại nỗi lo đó và đề nghị thử 1 tuần có kiểm tra kết quả (nộp bài đúng hạn + giữ giờ ngủ).\n• Nếu chưa đổi được ngay: Xin cùng tìm một khoảng làm bài trước giờ học thêm hoặc hỏi cô phần ưu tiên."
        },
        {
          Title: "3. Nhờ giáo viên chủ nhiệm hỗ trợ nếu lịch vẫn vượt sức",
          Guide: "“Thưa cô, em đã thử thu xếp lại nhưng hai tối này em vẫn phải làm bài sát giờ ngủ. Cô có thể cùng em xem việc nào nên điều chỉnh trước được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em thấy rối khi nhìn nhiều việc đang dồn lại và muốn có người giúp em bắt đầu",
      BranchTitle: "Gỡ rối nhanh bằng 1 thao tác nhỏ, nghỉ ngắn hoặc hỏi thứ tự",
      Intro: "Khi vừa đi học về mà đầu óc quay cuồng vì nhiều bài dồn lại, em chỉ cần chọn một hành động vừa đúng với sức của mình lúc này.",
      Question: "Ngay lúc này, em muốn làm gì trước?",
      SubOptions: [
        { Index: 1, Text: "Còn sức thử một thao tác thật nhỏ để bắt đầu" },
        { Index: 2, Text: "Đang rất mệt và muốn nghỉ một lát trước khi làm tiếp" },
        { Index: 3, Text: "Muốn nhờ thầy cô giúp xếp thứ tự các bài đang dồn" }
      ],
      Solutions: [
        {
          Title: "1. Đổi 'làm hết bài' thành 1 thao tác tay đầu tiên",
          Guide: "Ghi ra 2–3 việc đang nghĩ tới, khoanh việc có hạn sớm nhất. Đổi cụm 'làm bài ở trường' thành thao tác cụ thể: “Mở phiếu và đọc yêu cầu đầu tiên”."
        },
        {
          Title: "2. Nghỉ ngắn và bảo vệ giấc ngủ nếu đã quá mệt",
          Guide: "Đặt vở xuống, thả lỏng vai, uống nước. Nếu về muộn và quá mệt (mà bài trường gần xong, bài học thêm còn 2 ngày): chỉ kiểm tra nhanh 1 phần còn thiếu của bài sáng mai hoặc để lại dòng nhắc rồi đi nghỉ.\n\nNếu căng thẳng kéo dài ảnh hưởng giấc ngủ/ăn uống, hãy tìm giáo viên chủ nhiệm hoặc tư vấn học đường."
        },
        {
          Title: "3. Nhắn ngắn cho cô để xin gợi ý thứ tự ưu tiên",
          Guide: "“Thưa cô, tối nay em còn hai bài chưa xong và chưa biết bắt đầu từ việc nào. Cô có thể giúp em xem thứ tự không ạ?” (Kèm tên 2 bài và hạn nộp)."
        }
      ]
    }
  ]
};

// 2. Tình huống 1.39: Khi chưa biết vận dụng kiến thức đã học vào bài tập mới
const p1_39 = {
  Id: "p1_39",
  Code: "1.39",
  FileName: "Khi chưa biết vận dụng kiến thức đã học vào bài tập mới.docx",
  Title: "Khi chưa biết vận dụng kiến thức đã học vào bài tập mới",
  RootQuestion: "Câu 1. Em muốn được giúp ở chỗ nào trước?",
  Intro: "Khi làm một bài mới, em hiểu đề yêu cầu gì và nhớ thầy cô đã dạy cách làm liên quan ở bài trước, nhưng khi tự làm lại chững lại vì chưa biết đến bước nào thì dùng cách đó.\n\nEm đã hiểu đề và nhớ bài cũ — đó là hai điểm tựa rất tốt. Hãy bắt đầu từ dòng cuối cùng em còn giải thích được.",
  Options: [
    { Index: 1, Text: "Em hiểu bài cần kết quả gì, nhưng chưa nhận ra bước tiếp theo cần làm gì" },
    { Index: 2, Text: "Em biết bước tiếp theo cần làm gì, nhưng chưa biết chọn cách nào trong những cách đã học" },
    { Index: 3, Text: "Em đã chọn được cách làm, nhưng chưa biết dùng thông tin nào của bài mới" },
    { Index: 4, Text: "Em đã làm thử, nhưng kết quả chưa khớp với yêu cầu và em chưa biết cần sửa từ đâu" },
    { Index: 5, Text: "Em chưa chỉ được chỗ vướng và muốn có người cùng xem" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em hiểu bài cần kết quả gì, nhưng chưa nhận ra bước tiếp theo cần làm gì",
      BranchTitle: "Tìm bước trung gian bị thiếu sau dòng cuối em đã làm",
      Intro: "Giữa phần em đã viết và kết quả đề cần thường có một bước nối (ví dụ đối chiếu điều kiện hoặc chọn chi tiết làm căn cứ).",
      Question: "Sau dòng cuối em đã làm được, bài còn thiếu điều gì?",
      SubOptions: [
        { Index: 1, Text: "Đã liệt kê phương án/ý kiến nhưng chưa kiểm tra điều kiện hay chọn căn cứ" },
        { Index: 2, Text: "Đã tóm tắt dữ kiện nhưng chưa nối được lý do để viết kết luận" },
        { Index: 3, Text: "Vẫn chưa nhận ra chỗ thiếu và muốn hỏi thầy cô đúng bước tiếp theo" }
      ],
      Solutions: [
        {
          Title: "1. Đặt câu hỏi nối: “Đã có X rồi, còn thiếu gì để ra kết luận?”",
          Guide: "• Ví dụ 1: Đã liệt kê 2 cách làm, đề hỏi chọn cách kịp 1 buổi -> Bước nối ở giữa là **kiểm tra thời gian của từng cách** trước khi chọn.\n• Ví dụ 2: Đã nêu ý kiến, đề đòi dùng chi tiết giải thích -> Bước nối là **chọn chi tiết làm căn cứ** rồi mới viết giải thích."
        },
        {
          Title: "2. Chèn bước nối trước phần kết luận trên bài thật",
          Guide: "Quay lại dòng đã đánh dấu, viết thêm 1 dòng cho bước trung gian bị thiếu (ví dụ nối các chi tiết cho thấy nguyên nhân nhóm đổi kế hoạch) trước khi chốt kết luận."
        },
        {
          Title: "3. Hỏi thầy cô đúng phần sau dòng cuối em làm được",
          Guide: "“Thưa cô, em đã làm được đến dòng này. Cô giúp em xem sau dòng này bài còn cần làm rõ điều gì được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em biết bước tiếp theo cần làm gì, nhưng chưa biết chọn cách nào trong những cách đã học",
      BranchTitle: "Dựa vào câu hỏi của đề để chọn đúng công cụ đã học",
      Intro: "Mỗi câu hỏi của đề (hỏi so sánh hai phương án hay hỏi đạt mốc điều kiện) sẽ gợi ý cho em dùng đúng cách làm tương ứng.",
      Question: "Ở bước này, đề muốn em tìm ra điều gì?",
      SubOptions: [
        { Index: 1, Text: "Phân biệt khi nào dùng cách 'so sánh hai phương án' vs 'kiểm tra theo mốc điều kiện'" },
        { Index: 2, Text: "Phân biệt khi nào cần 'kể lại trình tự' vs 'chỉ một chi tiết làm rõ nhận xét'" },
        { Index: 3, Text: "Hỏi thầy cô để xác nhận căn cứ chọn cách làm trên bài thật" }
      ],
      Solutions: [
        {
          Title: "1. Đọc kỹ từ khóa giới hạn hay so sánh trong đề",
          Guide: "• Đề hỏi “Cách nào mất ít thời gian hơn?” -> Đặt 2 cách cạnh nhau để **so sánh**.\n• Đề hỏi “Có phương án nào đáp ứng giới hạn tối đa 5 hình không?” -> **Kiểm tra từng phương án với mốc 5 hình** (nếu A=6, B=8 thì A ít hơn B nhưng cả hai đều không đạt mốc 5)."
        },
        {
          Title: "2. Chọn cách trả lời trực tiếp câu hỏi thay vì kể lan man",
          Guide: "Ví dụ đề hỏi: “Chi tiết nào cho thấy việc chia nhiệm vụ giúp nhóm phát hiện phần thiếu?” -> Không kể lại cả quá trình làm việc, chỉ chọn cách **tìm đúng 1 chi tiết cho thấy nhóm phát hiện việc chưa có người làm**."
        },
        {
          Title: "3. Hỏi xác nhận căn cứ chọn cách với thầy cô",
          Guide: "“Thưa thầy, em đang phân vân giữa hai cách. Em chọn cách này vì đề hỏi về điều kiện ở dòng này. Thầy xem giúp em căn cứ đó đã phù hợp chưa ạ?”"
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em đã chọn được cách làm, nhưng chưa biết dùng thông tin nào của bài mới",
      BranchTitle: "Lọc bỏ thông tin nền để chọn đúng chi tiết chứng minh",
      Intro: "Bài mới thường có nhiều chi tiết kể bối cảnh (giờ họp, màu nền, cỡ chữ...). Em chỉ cần chọn chi tiết liên quan trực tiếp đến nhận xét cần làm rõ.",
      Question: "Em muốn luyện lọc thông tin theo tình huống nào?",
      SubOptions: [
        { Index: 1, Text: "Phân biệt chi tiết bối cảnh với chi tiết chứng minh trực tiếp" },
        { Index: 2, Text: "Giải thích mối liên hệ giữa chi tiết đã chọn và nhận xét của đề" },
        { Index: 3, Text: "Phân vân giữa hai chi tiết trên bài thật và muốn hỏi cô" }
      ],
      Solutions: [
        {
          Title: "1. Đặt thử từng chi tiết cạnh nhận xét để kiểm tra",
          Guide: "Ví dụ nhận xét: “Chạy thử giúp nhóm phát hiện lỗi trước khi gửi”.\n• Chi tiết 'dùng nền xanh', 'ở lại thu dọn' chỉ là bối cảnh.\n• Chi tiết 'một đường dẫn không mở được khi chạy thử' mới nối thẳng với 'phát hiện lỗi'."
        },
        {
          Title: "2. Viết 1 câu nối rõ nguyên nhân – kết quả",
          Guide: "Sau khi chọn đúng chi tiết (ví dụ: 'hỏi lại người phụ trách nên phát hiện tệp định gửi là bản cũ'), viết 1 câu nối thẳng việc hỏi lại với kết quả tránh nộp nhầm bản."
        },
        {
          Title: "3. Khoanh 2 chỗ phân vân để xin thầy cô gợi ý",
          Guide: "“Thưa cô, em biết cần chọn chi tiết làm căn cứ. Em đang phân vân giữa hai chỗ đã đánh dấu. Cô giúp em xem chi tiết nào làm rõ nhận xét hơn được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đã làm thử, nhưng kết quả chưa khớp với yêu cầu và em chưa biết cần sửa từ đâu",
      BranchTitle: "Giữ dòng làm đúng và sửa đúng dòng bị lệch",
      Intro: "Kết quả chưa khớp không có nghĩa là em sai toàn bộ. Đặt đề cạnh bài để tìm đúng một dòng cần chỉnh (hiểu nhầm từ khóa giới hạn hoặc chọn nhầm căn cứ).",
      Question: "Khi đối chiếu bài làm với đề, em nghi ngờ mình lệch ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Số liệu đúng nhưng kết luận bị ngược do hiểu nhầm cụm 'không quá' / 'ít nhất'" },
        { Index: 2, Text: "Kết luận đúng nhưng dòng căn cứ chưa chứng minh được cho kết luận" },
        { Index: 3, Text: "Đã kiểm tra dữ kiện nhưng kết quả vẫn lệch và cần cô chỉ dòng đầu tiên cần xem" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra lại các cụm từ mốc giới hạn ('không quá', 'ít nhất')",
          Guide: "• 'Không quá 10 phút' -> Đúng 10 phút vẫn đạt (không bị vượt).\n• 'Ít nhất 2 ví dụ' -> Nộp 3 ví dụ vẫn đạt (không cần bỏ bớt).\n\nGiữ nguyên số liệu đúng em đã tìm được, chỉ sửa lại dòng kết luận."
        },
        {
          Title: "2. Thay dòng căn cứ lạc đề bằng chi tiết khớp nhận xét",
          Guide: "Ví dụ: Giữ phần kết luận “mọi người biết phần mình phụ trách”, nhưng thay căn cứ “nhóm dùng nền màu xanh” bằng “bản phân công ghi tên người phụ trách từng phần”."
        },
        {
          Title: "3. Nhờ cô chỉ giúp dòng đầu tiên cần xem lại",
          Guide: "“Thưa cô, em đã kiểm tra dữ kiện và sửa dòng này. Kết quả vẫn chưa khớp với yêu cầu. Cô giúp em tìm dòng đầu tiên cần xem lại được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em chưa chỉ được chỗ vướng và muốn có người cùng xem",
      BranchTitle: "Chỉ dòng cuối còn hiểu để mở lời nhờ gợi ý",
      Intro: "Em chưa cần diễn đạt trọn vẹn mới có thể hỏi. Chỉ cần mở bài và chỉ đúng dòng cuối em còn giải thích được đã là một cách bắt đầu rất tốt.",
      Question: "Em muốn chuẩn bị cách hỏi và cách làm tiếp sau khi được gợi ý thế nào?",
      SubOptions: [
        { Index: 1, Text: "Mẫu câu mở lời khi nhớ cách làm cũ nhưng chưa biết đặt vào bước nào" },
        { Index: 2, Text: "Cách tự làm tiếp một bước ngay khi nhận được gợi ý ngắn của thầy cô" },
        { Index: 3, Text: "Xin cô xem lại khi đang phân vân giữa hai chi tiết căn cứ" }
      ],
      Solutions: [
        {
          Title: "1. Mẫu câu chỉ đúng phần đã làm và chỗ phân vân",
          Guide: "“Thưa cô, em đã liệt kê được hai phương án. Em nhớ cách đối chiếu với điều kiện nhưng chưa biết ở bài này nên dùng trước hay sau khi chọn. Cô gợi ý giúp em đúng bước này được không ạ?”"
        },
        {
          Title: "2. Thử làm tiếp 1 bước từ gợi ý trước khi hỏi thêm",
          Guide: "Khi cô gợi ý (vd: “Em xem điều kiện thời gian nhé”), đừng chờ đáp án hết; hãy thử áp dụng ngay: “Dạ, em sẽ so thời gian của từng phương án với giới hạn rồi mới chọn ạ.”"
        },
        {
          Title: "3. Nêu rõ nhận xét và hai chi tiết đang phân vân",
          Guide: "Khi phân vân giữa 2 chi tiết, chỉ rõ nhận xét cần chứng minh và 2 chi tiết đó cho cô xem. Sau khi cô gợi ý, tự thử nối từng chi tiết với nhận xét trước khi chốt."
        }
      ]
    }
  ]
};

problems.push(p1_38, p1_39);

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('New total problems:', problems.length);
console.log('Added 1.38, 1.39 successfully!');
