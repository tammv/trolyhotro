const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.36: Khi em thấy mình đang “nỗ lực ảo” trong học tập
const p1_36 = {
  Id: "p1_36",
  Code: "1.36",
  FileName: "Khi em thấy mình đang nỗ lực ảo trong học tập.docx",
  Title: "Khi em thấy mình đang “nỗ lực ảo” trong học tập",
  RootQuestion: "Câu 1. Khi tự học, em muốn được giúp ở chỗ nào trước?",
  Intro: "Có những hôm em ngồi học khá lâu, đọc lại bài, gạch chân hay xem bài mẫu. Nhìn vở thấy quen nhưng khi gấp vở lại thì khó nói được ý chính, hoặc gặp câu tương tự lại chưa biết bắt đầu từ đâu.\n\nCông sức em bỏ ra vẫn đáng được ghi nhận. “Nỗ lực ảo” chỉ là cảm giác học lâu nhưng chưa biết mình tự nhớ, giải thích hoặc làm được đến đâu. Hãy chọn một trở ngại khiến buổi học hôm nay khó nhất để thử ngay một việc nhỏ.",
  Options: [
    { Index: 1, Text: "Em đọc lại thấy quen, nhưng gấp vở lại thì khó nói được ý chính" },
    { Index: 2, Text: "Em hiểu bài mẫu khi xem, nhưng gặp câu tương tự thì chưa biết bắt đầu" },
    { Index: 3, Text: "Em tự làm được một phần, nhưng chưa biết mình sai hoặc thiếu ở đâu" },
    { Index: 4, Text: "Em hay bị gián đoạn và khó quay lại đúng việc đang làm" },
    { Index: 5, Text: "Em đã cố học nhiều lần, thấy nản và chưa biết nên bắt đầu sửa từ đâu" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em đọc lại thấy quen, nhưng gấp vở lại thì khó nói được ý chính",
      BranchTitle: "Tập che vở và diễn đạt lại ý chính bằng lời của mình",
      Intro: "Việc em nhớ được vài từ đã cho em một chỗ để bắt đầu. Hôm nay em chỉ cần chọn một đoạn ngắn, che nội dung và tự diễn đạt một ý.",
      Question: "Với một đoạn ngắn vừa học, khi che nội dung và chỉ nhìn tiêu đề, em nói được đến đâu?",
      SubOptions: [
        { Index: 1, Text: "Chưa nhớ được ý nào hoặc chỉ nhớ vài từ khóa rời rạc" },
        { Index: 2, Text: "Nói được ý chính nhưng còn mơ hồ, chưa giải thích rõ" },
        { Index: 3, Text: "Muốn thử quy trình 4 bước che vở tự diễn đạt vào bài thật" }
      ],
      Solutions: [
        {
          Title: "1. Rút đoạn xuống 2-3 câu và dùng câu hỏi dẫn",
          Guide: "Nếu vẫn trống ý, đừng đọc cả trang. Rút đoạn xuống còn 2–3 câu với một câu hỏi cụ thể (ví dụ: “Việc này giúp ích gì?”), rồi che lại và chỉ trả lời đúng câu hỏi đó.\n\nNếu nhớ vài từ khóa, chọn 1 từ khóa và nói rõ nó có tác dụng gì."
        },
        {
          Title: "2. Thêm một lời giải thích hoặc ví dụ tự nghĩ",
          Guide: "Để thoát khỏi cảm giác 'mơ hồ', hãy thêm 1 câu giải thích hoặc 1 ví dụ ngắn do em tự nghĩ ra, rồi kiểm tra xem ví dụ đó có đúng với ý vừa học không."
        },
        {
          Title: "3. Quy trình 4 bước: Đọc -> Che & nói -> Mở đối chiếu -> Che & thử lại",
          Guide: "1. Đọc tìm ý: “Đoạn này muốn em hiểu điều gì?”\n2. Che nội dung và nói/viết 1 câu bằng lời của mình.\n3. Mở lại tìm đúng chỗ thiếu để bổ sung.\n4. Che lại và nói trọn ý.\n\nNếu vẫn chưa hiểu nghĩa 1 câu, đánh dấu để hỏi cô: “Thưa cô, em hiểu đoạn này nói về…, nhưng chưa hiểu câu… nghĩa là gì ạ?”"
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em hiểu bài mẫu khi xem, nhưng gặp câu tương tự thì chưa biết bắt đầu",
      BranchTitle: "Tập tự chọn bước đầu trước khi mở bài mẫu",
      Intro: "Xem lời giải mẫu và tự chọn cách bắt đầu là hai việc khác nhau. Buổi này em chỉ cần tập chọn được bước đầu và nói được vì sao chọn bước đó.",
      Question: "Khi nhìn một câu mới mà chưa mở bài mẫu, em thường dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Chưa nói rõ được câu hỏi cần em làm gì" },
        { Index: 2, Text: "Biết phải làm gì nhưng chưa biết dùng thông tin nào trước" },
        { Index: 3, Text: "Muốn tập quy trình dùng bài mẫu đúng lúc cần" }
      ],
      Solutions: [
        {
          Title: "1. Bắt đầu bằng câu “Việc em cần làm là…”",
          Guide: "Che bài mẫu rồi viết một dòng nói rõ yêu cầu đề (ví dụ: “Việc em cần làm là chọn cách phù hợp với thời gian còn lại và nêu lý do”)."
        },
        {
          Title: "2. Chọn thông tin khớp trực tiếp với điều kiện đề",
          Guide: "Nối lựa chọn với mục tiêu: xem dữ kiện nào trả lời thẳng cho điều kiện đề đặt ra (ví dụ: nhóm chỉ còn 1 buổi -> kiểm tra thời gian thực hiện của từng cách trước, rồi mới xét việc nhóm quen cách nào)."
        },
        {
          Title: "3. Chỉ xem đúng phần bài mẫu của bước đang tắc rồi che lại",
          Guide: "Đọc yêu cầu -> Tự ghi bước đầu -> Nếu tắc mới mở đúng phần mẫu liên quan -> Che mẫu và tự làm lại -> Thử ngay trên một câu khác đổi dữ kiện.\n\nNếu vẫn vướng, hỏi thầy: “Thưa thầy, em hiểu câu này cần…, nhưng đang phân vân nên dùng thông tin nào trước ạ?”"
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em tự làm được một phần, nhưng chưa biết mình sai hoặc thiếu ở đâu",
      BranchTitle: "So từng dòng với yêu cầu để tìm đúng chỗ thiếu đầu tiên",
      Intro: "Em đã có phần tự làm để kiểm tra. Buổi này em sẽ tìm đúng một chỗ cần sửa rồi che lời giải để tự sửa lại.",
      Question: "Khi so bài của mình với yêu cầu, em thường gặp điều nào?",
      SubOptions: [
        { Index: 1, Text: "Chỉ nhìn kết quả cuối nên chưa biết bắt đầu lệch ở bước nào" },
        { Index: 2, Text: "Biết chỗ sai/thiếu nhưng chưa hiểu vì sao hoặc ý bị trùng" },
        { Index: 3, Text: "Sửa được khi nhìn lời giải nhưng gặp câu tương tự lại lặp lỗi" }
      ],
      Solutions: [
        {
          Title: "1. Đặt đề và bài cạnh nhau, so từ dòng đầu tiên",
          Guide: "Đọc lại yêu cầu và đánh dấu những phần bài đã đáp ứng. Khoanh vào yêu cầu đầu tiên bài chưa trả lời đủ (ví dụ: đề đòi 2 lý do khác nhau nhưng bài mới viết 1 lý do hoặc thiếu cách kiểm tra)."
        },
        {
          Title: "2. Kiểm tra xem hai ý có bị trùng nghĩa không",
          Guide: "Ví dụ: “tiết kiệm thời gian” và “làm nhanh hơn” thực chất là một ý. Hãy đổi ý thứ hai sang một lợi ích khác hẳn (ví dụ: “còn đủ thời gian để kiểm tra lại” hoặc giải thích cụ thể cách thực hiện).\n\nNếu chưa chắc: “Thưa cô, em đã viết hai ý nhưng chưa biết có trùng nhau không. Cô chỉ giúp em chỗ cần sửa được không ạ?”"
        },
        {
          Title: "3. Che mẫu và thử lại trên một câu khác cùng dạng",
          Guide: "Sau khi sửa xong, đặt bài đã sửa sang một bên và làm lại một câu khác có cùng dạng yêu cầu. Ghi lại 1 câu nhắc ngắn cho lần sau (vd: “Đề hỏi cách kiểm tra -> phải nêu rõ bước xác nhận”)."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em hay bị gián đoạn và khó quay lại đúng việc đang làm",
      BranchTitle: "Để lại 'dấu quay lại' và xử lý nguồn gây xao nhãng",
      Intro: "Có những lần gián đoạn em hạn chế được, cũng có lúc em cần dừng ngay. Bí quyết là để lại dấu quay lại thật cụ thể trước khi rời bàn.",
      Question: "Điều gì thường làm em rời khỏi việc đang học?",
      SubOptions: [
        { Index: 1, Text: "Mở điện thoại xem thông báo rồi bị cuốn sang việc khác hoặc nhớ việc vặt" },
        { Index: 2, Text: "Có người gọi hoặc có việc nhà cần làm ngay" },
        { Index: 3, Text: "Gặp chỗ khó nên dừng lại rồi không biết quay lại từ đâu" }
      ],
      Solutions: [
        {
          Title: "1. Tắt thông báo và ghi việc chợt nhớ ra giấy riêng",
          Guide: "• Để điện thoại ngoài tầm tay hoặc chỉ mở sẵn đúng trang cần học.\n• Khi chợt nhớ việc khác (như 'hỏi giờ nộp bài'), ghi nhanh ra giấy riêng để hết lượt học mới xử lý, rồi quay lại đúng dòng đang viết."
        },
        {
          Title: "2. Để lại 'dấu quay lại' gồm 2 ý: Đang làm tới đâu + Việc đầu tiên khi trở lại",
          Guide: "Đừng ghi chung chung “học tiếp”. Hãy ghi cụ thể: “Đã viết ý đầu. Khi quay lại, tìm 1 ví dụ cho ý đó.”\n\nNếu có người gọi: “Dạ, con làm xong dòng này rồi sang giúp ngay ạ.” Nếu phải đi gấp, lúc quay lại nhìn dòng cuối vừa viết để nối tiếp."
        },
        {
          Title: "3. Đổi dòng 'làm tiếp bài' thành một thao tác tay cụ thể",
          Guide: "Khi dừng vì gặp chỗ khó, ghi ngay thao tác đầu tiên khi quay lại (vd: “Đọc lại đề và khoanh từ chỉ việc phải làm”).\n\nNếu việc học liên tục bị ngắt vì việc gia đình, hãy nhờ người thân sắp xếp cho em một khoảng ngắn liền mạch 15–20 phút."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em đã cố học nhiều lần, thấy nản và chưa biết nên bắt đầu sửa từ đâu",
      BranchTitle: "Chọn 1 việc nhỏ vừa sức hoặc nghỉ ngắn để lấy lại nhịp",
      Intro: "Nếu đã thử nhiều lần mà vẫn thấy rối, em không cần cố ép mình ôn cả bài lớn. Một câu tự giải thích được hay một câu hỏi rõ ràng đều là kết quả thật.",
      Question: "Lúc này, em thấy sức mình có thể làm gì?",
      SubOptions: [
        { Index: 1, Text: "Còn đủ sức thử một việc thật ngắn trong 10–15 phút" },
        { Index: 2, Text: "Đang quá mệt hoặc đọc đi đọc lại vẫn không vào" },
        { Index: 3, Text: "Muốn mang phần đã thử nhờ thầy cô hoặc bạn xem giúp chỗ mắc" }
      ],
      Solutions: [
        {
          Title: "1. Chọn đúng 1 việc nhỏ có thể tự kiểm tra ngay",
          Guide: "Thay vì 'ôn lại cả bài', chỉ chọn 1 việc: che vở viết 1 câu em còn nhớ, hoặc chỉ đọc đề của 1 câu và viết xem đề hỏi gì rồi đối chiếu."
        },
        {
          Title: "2. Nghỉ ngắn có chủ đích và ghi sẵn bước quay lại",
          Guide: "Đặt bài xuống, thả lỏng vai, uống nước hoặc đi lại nhẹ. Trước khi nghỉ, ghi 1 dòng nhỏ: “Khi quay lại, gấp vở và nói 1 ý còn nhớ”.\n\nNếu mệt mỏi kéo dài ảnh hưởng giấc ngủ/ăn uống, hãy nói sớm với thầy cô hoặc người lớn tin cậy."
        },
        {
          Title: "3. Mang đúng dòng bị dừng đến hỏi bạn hoặc thầy cô",
          Guide: "• Với bạn: “Bạn xem giúp mình câu này nhé, mình muốn biết mình hiểu sai đề hay thiếu bước đầu.”\n• Với thầy cô: “Thưa cô, em đã thử tự làm đến đây. Cô giúp em nhận ra bước cần sửa trước được không ạ?”"
        }
      ]
    }
  ]
};

// 2. Tình huống 1.37: Khi em cần học bù để theo kịp bài mới
const p1_37 = {
  Id: "p1_37",
  Code: "1.37",
  FileName: "Khi em cần học bù để theo kịp bài mới.docx",
  Title: "Khi em cần học bù để theo kịp bài mới",
  RootQuestion: "Câu 1. Điều gì khiến em khó bắt đầu học bù nhất lúc này?",
  Intro: "Sau khi nghỉ một buổi học, em trở lại lớp và thấy thầy cô đã sang bài mới có dùng kiến thức của buổi em nghỉ. Em muốn học bù để theo kịp nhưng chưa biết bắt đầu từ đâu.\n\nEm cứ bắt đầu từ một dòng trong bài mới hoặc một bước chưa làm được để lần ngược về phần cần học bù.",
  Options: [
    { Index: 1, Text: "Em chưa biết buổi em nghỉ lớp đã học đến đâu" },
    { Index: 2, Text: "Em có tài liệu rồi, nhưng chưa biết phần nào cần học trước để hiểu bài mới" },
    { Index: 3, Text: "Em đã tìm được phần cần học bù, nhưng xem lại vẫn chưa hiểu hoặc chưa tự làm được" },
    { Index: 4, Text: "Em muốn nhờ thầy cô hoặc một bạn giúp, nhưng chưa biết hỏi thế nào" },
    { Index: 5, Text: "Em thấy bài dồn lại và chưa biết thu xếp thời gian học bù" },
    { Index: 6, Text: "Em chưa biết mình bắt đầu vướng ở đâu trong bài mới" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em chưa biết buổi em nghỉ lớp đã học đến đâu",
      BranchTitle: "Xác định đúng bài và mục lớp đã học trong buổi nghỉ",
      Intro: "Biết tên bài thôi chưa đủ, em cần biết chính xác lớp đã dừng ở mục nào và bài mới hôm nay đang dùng lại phần nào.",
      Question: "Em đã tìm được thông tin gì về buổi học đó?",
      SubOptions: [
        { Index: 1, Text: "Đã có lịch học và vở ghi của bạn trong buổi nghỉ" },
        { Index: 2, Text: "Mới biết tên bài, chưa biết mục cụ thể lớp đã học" },
        { Index: 3, Text: "Chưa có tài liệu hoặc thông tin các nguồn chưa khớp" }
      ],
      Solutions: [
        {
          Title: "1. Đối chiếu vở ghi với phần bài mới đang dùng lại",
          Guide: "Xem lịch để biết tên bài, xem vở ghi để biết lớp học đến mục nào, và đối chiếu với lời nhắc của thầy cô hôm nay để mở đúng ví dụ/sơ đồ cần học trước tiên."
        },
        {
          Title: "2. Hỏi bạn chính xác đoạn lớp đã dùng lại",
          Guide: "Nhắn ngắn cho bạn: “Bạn cho mình hỏi buổi trước lớp học đến mục nào nhé. Nếu tiện, bạn chỉ giúp mình phần hôm nay thầy cô dùng lại được không?”"
        },
        {
          Title: "3. Nhờ thầy cô xác nhận nếu thiếu tài liệu hoặc nguồn ghi khác nhau",
          Guide: "Trong lúc chờ tài liệu, đánh dấu chỗ đang vướng trong bài mới để có thông tin là quay lại học ngay phần đó."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em có tài liệu rồi, nhưng chưa biết phần nào cần học trước để hiểu bài mới",
      BranchTitle: "Lần ngược từ chỗ vướng trong bài mới về đúng mục cần học bù",
      Intro: "Em không cần học lại hết cả bài cũ một lúc. Chỉ cần xem bài mới đang tắc ở bước nào để mở đúng mục giải quyết bước đó.",
      Question: "Em bắt đầu không theo được từ đâu trong bài mới?",
      SubOptions: [
        { Index: 1, Text: "Đã làm được phần đầu, chỉ thiếu đúng một bước kiểm tra/đối chiếu" },
        { Index: 2, Text: "Chưa biết chọn mục nào trong vở buổi trước để ưu tiên" },
        { Index: 3, Text: "Đã xem mục đó nhưng dùng vào bài mới vẫn thấy thiếu" }
      ],
      Solutions: [
        {
          Title: "1. Chỉ mở đúng mục giúp giải quyết dòng đang tắc",
          Guide: "Ví dụ: Em đã viết được lựa chọn nhưng chưa biết kiểm tra điều kiện -> Mở thẳng mục 'Đối chiếu lựa chọn với điều kiện' trong vở buổi nghỉ, học xong dùng ngay vào dòng đang vướng."
        },
        {
          Title: "2. Gạch dưới cụm nêu chỗ vướng để khớp với tiêu đề mục cũ",
          Guide: "So cụm từ em đang bí (ví dụ 'chọn thông tin để so sánh') với tên các mục trong vở buổi trước để chọn mục khớp nhất học trước."
        },
        {
          Title: "3. Tự thử 1 bước trên bài mới rồi hỏi thầy cô nếu vẫn thiếu",
          Guide: "Học đoạn ngắn -> Tự thử ngay 1 bước trước khi xem mẫu. Nếu vẫn bí: “Thưa thầy, em đã xem mục này và thử dùng ở dòng này. Thầy giúp em xem em còn thiếu phần nào được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em đã tìm được phần cần học bù, nhưng xem lại vẫn chưa hiểu hoặc chưa tự làm được",
      BranchTitle: "Hiểu nghĩa từ khóa, mục đích bước làm và tự thử lại",
      Intro: "Khi đã tìm đúng phần cần học bù, hãy xác định xem em đang dừng ở nghĩa của từ, mục đích của bước làm hay khâu tự thực hiện.",
      Question: "Khi thử lại phần học bù, em dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Chưa hiểu nghĩa của một từ hoặc một câu hướng dẫn" },
        { Index: 2, Text: "Biết bước đó làm gì nhưng chưa hiểu vì sao cần làm" },
        { Index: 3, Text: "Theo được khi nhìn mẫu, nhưng che mẫu rồi chưa tự làm được" }
      ],
      Solutions: [
        {
          Title: "1. Dùng ví dụ đi kèm để tự giải thích từ/câu khó",
          Guide: "Xem ví dụ minh họa của cụm từ đó (ví dụ 'đối chiếu' là so hai danh sách để tìm điểm thiếu/thay đổi; 'lược bớt' là bỏ phần trùng lặp). Tự nói lại bằng lời của mình.\n\nNếu chưa rõ: “Thưa cô, em hiểu phần đầu câu này. Cô cho em một ví dụ về cụm từ này được không ạ?”"
        },
        {
          Title: "2. Hỏi 'Nếu bỏ qua bước này thì sao?' để hiểu mục đích",
          Guide: "Tìm xem bước đó giúp phát hiện lỗi gì (ví dụ đếm trang/ảnh giúp phát hiện vượt giới hạn; mở tệp giúp tránh gửi nhầm bản). Hiểu mục đích xong sẽ dễ nhớ hơn nhiều."
        },
        {
          Title: "3. Che mẫu, tách đúng 2 con số/dữ kiện rồi tự thử lại",
          Guide: "Che bài mẫu và viết bước đầu (ví dụ so sánh giới hạn tối đa với số lượng thực tế). Nếu cần nhìn mẫu, chỉ xem đúng dòng liên quan rồi che lại làm câu khác."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em muốn nhờ thầy cô hoặc một bạn giúp, nhưng chưa biết hỏi thế nào",
      BranchTitle: "Mở lời ngắn gọn, chỉ đúng chỗ vướng để nhận trợ giúp nhanh",
      Intro: "Một câu hỏi rõ vị trí giúp bạn bè hoặc thầy cô chỉ đúng chỗ em cần chỉ trong vài phút, em không cần ngại làm phiền.",
      Question: "Điều gì làm em khó hỏi nhất lúc này?",
      SubOptions: [
        { Index: 1, Text: "Chưa biết nên hỏi ai và chọn lúc nào cho tiện" },
        { Index: 2, Text: "Ngại làm phiền hoặc chưa biết mở lời sao cho rõ" },
        { Index: 3, Text: "Muốn biết cách đáp lại nếu cô bận hoặc bạn gửi cả trang vở" }
      ],
      Solutions: [
        {
          Title: "1. Chọn đúng người và đúng thời điểm",
          Guide: "• Hỏi bạn: để biết lớp học đến đâu hoặc mượn vở ghi.\n• Hỏi thầy cô: để biết phần nào quan trọng cho bài mới. Nếu cô đang giảng, đánh dấu chỗ vướng và hỏi cuối tiết hoặc qua kênh lớp."
        },
        {
          Title: "2. Mẫu câu mở lời ngắn gọn, chỉ thẳng dòng vướng",
          Guide: "“Thưa cô, buổi trước em nghỉ. Hôm nay em chọn được cách làm, nhưng chưa biết dùng điều kiện nào để kiểm tra. Cô chỉ giúp em phần cần xem trước được không ạ?”\n\nNếu ngại nói trực tiếp, có thể nhắn 2 câu ngắn hoặc mở sẵn trang rồi chỉ vào dòng đó."
        },
        {
          Title: "3. Cách đáp khéo khi cô bận hoặc bạn gửi cả trang",
          Guide: "• Nếu cô bận hẹn tiết sau: “Dạ, em sẽ xem ví dụ cuối mục 2 rồi thử lại. Nếu còn vướng, em có thể hỏi cô sau tiết sau được không ạ?”\n• Nếu bạn gửi cả trang ảnh: “Cảm ơn bạn nhé. Bạn chỉ giúp mình dòng lớp đã dùng lại hôm nay được không?”"
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em thấy bài dồn lại và chưa biết thu xếp thời gian học bù",
      BranchTitle: "Chia lượt học bù 10–15 phút ưu tiên phần bài mới cần dùng",
      Intro: "Nghĩ tới cả bài cũ lẫn bài mới dễ bị ngợp. Em chỉ cần dùng một khoảng 10–15 phút cho đúng ví dụ mà bài mới đang cần.",
      Question: "Điều gì làm em khó bắt đầu thu xếp hôm nay?",
      SubOptions: [
        { Index: 1, Text: "Vừa có bài mới phải làm ngày mai, vừa có phần cũ cần học bù" },
        { Index: 2, Text: "Chỉ có khoảng thời gian ngắn (10–15 phút)" },
        { Index: 3, Text: "Đang mệt, căng thẳng hoặc áp lực kéo dài" }
      ],
      Solutions: [
        {
          Title: "1. Làm phần đã biết trước, tách riêng phần vướng cần học bù",
          Guide: "Nếu bài có 3 câu mà em đã biết làm 2 câu, làm nhanh 2 câu đó trước. Thời gian còn lại chỉ tập trung vào đúng 1 ví dụ của buổi nghỉ liên quan tới câu thứ 3."
        },
        {
          Title: "2. Kế hoạch 10–15 phút: Xem 1 ví dụ + Che mẫu tự thử + Ghi dấu",
          Guide: "Đừng đọc cả trang. Dành nửa thời gian xem đúng 1 ví dụ, nửa còn lại che mẫu tự thử. Hết giờ chưa xong thì ghi đúng câu cần hỏi để quay lại."
        },
        {
          Title: "3. Nghỉ ngắn nếu đang rối hoặc tìm hỗ trợ nếu áp lực kéo dài",
          Guide: "Nếu mệt quá, đặt bài xuống nghỉ một lát rồi thử đọc 1 câu.\n\nNếu áp lực bài dồn ảnh hưởng giấc ngủ/sinh hoạt, hãy tìm giáo viên chủ nhiệm hoặc người phụ trách tư vấn học đường."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa biết mình bắt đầu vướng ở đâu trong bài mới",
      BranchTitle: "Đọc từng dòng để khoanh đúng dòng đầu tiên bị dừng",
      Intro: "Em chưa cần gọi tên chính xác kiến thức mình thiếu. Chỉ cần đọc từng dòng trong ví dụ bài mới xem đến dòng nào thì bị khựng lại.",
      Question: "Em muốn tìm chỗ vướng theo bước nào?",
      SubOptions: [
        { Index: 1, Text: "Đọc từng dòng và thử nói dòng đó đang làm gì" },
        { Index: 2, Text: "Chỉ vào dòng bị khựng để hỏi thầy cô" },
        { Index: 3, Text: "Nhắc lại bằng lời của mình sau khi được giải thích" }
      ],
      Solutions: [
        {
          Title: "1. Đánh dấu ngay dòng đầu tiên chưa giải thích được",
          Guide: "Đọc từng dòng trong một ví dụ của bài mới (ví dụ: dòng 1 chọn thông tin, dòng 2 so với điều kiện, dòng 3 kết luận). Hiểu dòng 1 nhưng tới dòng 2 không hiểu đang so điều kiện nào -> Đánh dấu ngay dòng 2."
        },
        {
          Title: "2. Chỉ đúng dòng đó để nhờ xem cùng",
          Guide: "Thay vì nói “Em chưa hiểu cả bài”, hãy xác nhận phần mình hiểu rồi chỉ dòng bị dừng: “Thưa cô, em hiểu dòng đầu, cô xem cùng em từ dòng này được không ạ?”"
        },
        {
          Title: "3. Nói lại bằng lời của mình và tự làm tiếp 1 bước",
          Guide: "Khi nghe thầy cô hoặc bạn giải thích xong dòng đó, thử nói lại bằng lời của em và tự làm tiếp bước kế theo để kiểm tra mình đã thông chưa."
        }
      ]
    }
  ]
};

problems.push(p1_36, p1_37);

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('New total problems:', problems.length);
console.log('Added 1.36, 1.37 successfully!');
