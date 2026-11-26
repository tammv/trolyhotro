const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.22: Khi em muốn có người lắng nghe chuyện học
const p1_22 = {
  Id: "p1_22",
  Code: "1.22",
  FileName: "Bộ câu hỏi hỗ trợ chuyên sâu - Khi em muốn có người lắng nghe chuyện học.docx",
  Title: "Khi em muốn có người lắng nghe chuyện học",
  RootQuestion: "Câu 1. Lúc này, em muốn được giúp điều gì trước?",
  Intro: "Có những hôm tan học rồi mà em vẫn nghĩ mãi về một chuyện ở lớp. Có thể em chỉ muốn có ai đó nghe mình kể một chút. Em có thể bắt đầu bằng một câu ngắn, hoặc nói “Em chưa biết kể từ đâu”. Em được chọn ai sẽ nghe, lúc nào muốn nói và phần nào muốn giữ riêng.",
  Options: [
    { Index: 1, Text: "Em muốn chọn một người mà em thấy yên tâm khi kể" },
    { Index: 2, Text: "Em muốn bớt rối hoặc bồn chồn một chút trước khi nói" },
    { Index: 3, Text: "Em đã nghĩ đến một người nhưng chưa biết mở lời thế nào" },
    { Index: 4, Text: "Em đã thử kể nhưng vẫn thấy mình chưa được lắng nghe" },
    { Index: 5, Text: "Em muốn tạm dừng" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn chọn một người mà em thấy yên tâm khi kể",
      BranchTitle: "Chọn người em thấy yên tâm để chia sẻ",
      Intro: "Nếu đã nghĩ đến một người, em thử nhớ một việc họ từng làm giúp em dễ nói. Nếu chưa nghĩ ra ai, em có thể xét hai điều: em có thấy yên tâm khi nói với người ấy không và em có thể liên hệ lúc nào?",
      Question: "Em đã nghĩ đến một người có thể lắng nghe em chưa?",
      SubOptions: [
        { Index: 1, Text: "Em đã nghĩ đến một người nhưng chưa biết họ có thể nghe lúc nào" },
        { Index: 2, Text: "Em chưa nghĩ ra ai và muốn biết tiêu chí chọn người phù hợp" },
        { Index: 3, Text: "Người em muốn gặp đang bận hoặc chỉ hẹn được lúc khác" },
        { Index: 4, Text: "Em muốn nhờ thầy cô kết nối với người phụ trách tư vấn học đường" }
      ],
      Solutions: [
        {
          Title: "1. Xác định thời điểm và hẹn gặp người em tin cậy",
          Guide: "Chọn một người và hỏi lúc nào họ có thể nghe. Xác nhận giờ hẹn rõ ràng.\n\nNếu người đầu tiên chưa trả lời và em muốn được nghe sớm hơn, em có thể nhắn cho một người khác mà em thấy yên tâm.\n\nTrước khi liên hệ, chọn một điều muốn đạt: có người nghe hôm nay hoặc có một giờ hẹn phù hợp."
        },
        {
          Title: "2. Hai tiêu chí xác định người lắng nghe phù hợp",
          Guide: "Nếu chưa nghĩ ra ai, em xét 2 điều:\n1. Em có thấy yên tâm và an toàn khi nói với người ấy không?\n2. Em có thể liên hệ vào lúc nào?\n\nNếu muốn có người nghe trước khi rời trường, em có thể hỏi thầy cô em tin xem ai ở trường có thể nghe em chia sẻ riêng."
        },
        {
          Title: "3. Phương án dự phòng khi người được chọn đang bận",
          Guide: "Nếu cô giáo hoặc người em chọn bận, thử nói:\n“Thưa cô, nếu hôm nay cô bận, cô có thể chỉ giúp em người em có thể gặp riêng trước khi về không ạ?”.\n\nNếu cô chỉ gặp được ngày mai mà em cần chia sẻ hôm nay, hãy nhờ cô giới thiệu thầy cô khác đang có mặt tại trường."
        },
        {
          Title: "4. Kết nối với cán bộ tư vấn học đường",
          Guide: "Nếu em đã hỏi thêm mà vẫn chưa có ai, em có thể nói với thầy cô em tin:\n“Thưa cô, em đã thử nhờ một người nghe nhưng chưa kết nối được. Cô có thể giúp em gặp người phụ trách tư vấn học đường không ạ?”.\n\nKhi có người trả lời, em xem giờ hẹn có hợp với mình không."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn bớt rối hoặc bồn chồn một chút trước khi nói",
      BranchTitle: "Ứng phó với căng thẳng và bồn chồn trước khi nói",
      Intro: "Nếu có cách từng giúp em dễ bắt đầu, em có thể thử lại cách đó. Em cũng có thể nhận diện cảm xúc và thử một bước nhỏ vừa sức.",
      Question: "Em nhận thấy điều gì rõ nhất lúc này?",
      SubOptions: [
        { Index: 1, Text: "Em nghĩ đến nhiều chuyện cùng lúc và khó chọn điều muốn kể" },
        { Index: 2, Text: "Em thấy người căng hoặc bồn chồn (viết rồi xóa tin nhắn)" },
        { Index: 3, Text: "Em lo người nghe sẽ trách, hỏi dồn hoặc xem nhẹ chuyện em kể" },
        { Index: 4, Text: "Em quá mệt để kể ngay lúc này" },
        { Index: 5, Text: "Em chưa rõ điều gì đang làm mình khó bắt đầu và chưa biết mình cần gì" }
      ],
      Solutions: [
        {
          Title: "1. Khi em chưa biết kể từ đâu",
          Guide: "Chọn một việc và nói việc đó đang ảnh hưởng đến em thế nào.\nVí dụ: “Em còn hai việc chưa xong. Điều em muốn kể trước là ngày mai em phải báo tiến độ mà chưa biết nói thế nào. Em cứ nghĩ đến chuyện đó từ chiều.”\n\nNếu đầu óc vẫn rối, em mở lời: “Thưa cô, em có mấy chuyện về việc học đang nghĩ mãi. Cô nghe em kể từng chút được không ạ?”."
        },
        {
          Title: "2. Khi em thấy người căng hoặc bồn chồn",
          Guide: "Nếu em đang cầm điện thoại mà cứ viết rồi xóa, em có thể đặt điện thoại xuống một lát.\n\nThử nhìn một vật gần mình và để ý một chi tiết nhỏ, như màu nắp bút. Khi ý nghĩ lại chạy về chuyện học, em đưa sự chú ý về chi tiết ấy.\n\nEm cũng có thể ngồi nghỉ hoặc nhắn nhờ người em tin ở bên cạnh."
        },
        {
          Title: "3. Khi em lo bị trách hoặc bị xem nhẹ",
          Guide: "Thử phân biệt điều em biết chắc và điều còn lo lắng. “Em biết mình chưa xong bài. Em chưa biết người ấy sẽ phản ứng thế nào khi nghe em kể.”\n\nNói rõ nhu cầu: “Bạn có thể nghe mình kể hết một ý trước được không?”.\n\nVới ba mẹ: “Dạ, con biết ba mẹ muốn hiểu chuyện gì xảy ra. Ba mẹ nghe con kể phần con đang vướng trước được không ạ?”.\n\nNếu bị đe dọa hoặc sợ bị làm đau, tìm ngay người lớn hỗ trợ trực tiếp."
        },
        {
          Title: "4. Khi em quá mệt để kể ngay",
          Guide: "Em có quyền nghỉ ngơi hoặc xin một lời hẹn!\n\nNếu muốn có người ở bên: Nhắn “Bạn ở cùng mình một lát được không? Mình chưa muốn kể ngay”.\n\nNếu muốn hẹn sau: Nói “Thưa cô, em muốn trao đổi riêng về chuyện học. Ngày mai lúc nào cô có thể nghe em vài phút được không ạ?”. Khi cần nghỉ, em có quyền dừng tại đây."
        },
        {
          Title: "5. Khi em chưa biết mình cần gì",
          Guide: "Chưa cần gọi tên cảm xúc. Tự hỏi:\n- Em muốn yên một lát? (Có thể tạm dừng tại đây)\n- Em muốn có người ở cạnh? (Nhắn “Bạn ở cùng mình một lát được không? Mình chưa muốn kể ngay”)\n- Em muốn nói một câu ngắn? (Nói “Thưa cô, em đang thấy rối vì chuyện học. Em chưa biết kể từ đâu. Cô có thể nghe em nói từng chút được không ạ?”)."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em đã nghĩ đến một người nhưng chưa biết mở lời thế nào",
      BranchTitle: "Luyện tập mở lời và đề nghị được lắng nghe",
      Intro: "Em thử tự nói một câu trước. Câu mở đầu có thể cho người kia biết em muốn kể chuyện gì và mong họ làm gì.",
      Question: "Em muốn chuẩn bị câu mở lời với đối tượng nào?",
      SubOptions: [
        { Index: 1, Text: "Mở lời với bạn bè" },
        { Index: 2, Text: "Mở lời với thầy cô giáo" },
        { Index: 3, Text: "Mở lời với cha mẹ hoặc người thân" },
        { Index: 4, Text: "Đáp lại khi người nghe vội chỉ cách làm thay vì lắng nghe" }
      ],
      Solutions: [
        {
          Title: "1. Câu mở lời với bạn bè",
          Guide: "Em có thể nói:\n“Bạn nghe mình kể một chút về chuyện học được không? Mình muốn nói ra trước. Khi nào cần góp ý, mình sẽ hỏi bạn nhé”.\n\nCách này giúp bạn hiểu em đang cần được lắng nghe và đồng cảm trước, chưa cần vội đưa ra lời khuyên."
        },
        {
          Title: "2. Câu mở lời với thầy cô",
          Guide: "Em có thể nói:\n“Thưa cô, mấy hôm nay em thấy áp lực vì chuyện học. Cô có thể nghe em chia sẻ riêng vài phút được không ạ?”.\n\nLời nói lịch sự, nêu rõ tâm trạng và xin thời gian riêng giúp thầy cô dễ sắp xếp hỗ trợ em chu đáo."
        },
        {
          Title: "3. Câu mở lời với cha mẹ",
          Guide: "Em có thể nói:\n“Dạ, con muốn kể với ba mẹ một chuyện về việc học. Ba mẹ nghe con nói hết trước được không ạ?”.\n\nViệc xin ba mẹ nghe hết một ý trước sẽ giúp giảm nguy cơ bị ngắt lời hoặc bị trách móc vội vàng."
        },
        {
          Title: "4. Nhắc lại nhu cầu lắng nghe khi đối phương vội khuyên",
          Guide: "Khi bạn đáp: “Gửi bài đây, mình chỉ bạn làm cho nhanh”, em đáp:\n“Cảm ơn bạn. Bạn nghe mình kể hết trước một chút được không? Sau đó nếu cần bàn cách làm, mình sẽ hỏi bạn nhé”.\n\nNhắc lại nhu cầu bằng thái độ ghi nhận và nhẹ nhàng."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đã thử kể nhưng vẫn thấy mình chưa được lắng nghe",
      BranchTitle: "Xử lý các tình huống khó khăn sau khi mở lời",
      Intro: "Không phải lúc nào cuộc trò chuyện cũng diễn ra suôn sẻ. Nhận diện phản ứng của người nghe giúp em chủ động điều chỉnh.",
      Question: "Điều gì đã xảy ra sau khi em mở lời?",
      SubOptions: [
        { Index: 1, Text: "Người ấy đang bận hoặc em vẫn đang chờ họ trả lời" },
        { Index: 2, Text: "Người ấy vội góp ý khi em chưa kể hết" },
        { Index: 3, Text: "Người ấy hỏi đến điều em chưa muốn kể" },
        { Index: 4, Text: "Người ấy cho biết họ chưa thể hỗ trợ theo cách em cần" },
        { Index: 5, Text: "Người ấy chế giễu em hoặc em không còn thoải mái nói tiếp" }
      ],
      Solutions: [
        {
          Title: "1. Khi người ấy đang bận hoặc chưa trả lời",
          Guide: "Nếu cô nói: “Cô cần vào dạy, hôm nay chưa tiện gặp”, em đáp:\n“Dạ, cô có thể giúp em gặp một thầy cô khác hôm nay không ạ?”.\n\nNếu đã có lời hẹn, nhắc lại giờ. Nếu chưa có phản hồi, em chọn chờ hoặc tìm người khác nếu cần được nghe sớm hơn."
        },
        {
          Title: "2. Khi người ấy vội góp ý",
          Guide: "Ghi nhận ý tốt và nhắc điều em cần:\n“Cảm ơn bạn. Bạn nghe mình kể hết trước được không? Sau đó nếu cần bàn lịch, mình sẽ hỏi bạn”.\n\nEm thử nói một lần. Nếu bạn đồng ý, em kể tiếp. Nếu bạn vẫn tiếp tục khuyên, em có thể nói “Mình xin dừng ở đây” và tìm người khác."
        },
        {
          Title: "3. Khi người ấy hỏi điều em chưa muốn kể",
          Guide: "Có những điều em muốn để dành đến khi thật sự sẵn sàng. Em tách rõ phần giữ riêng và phần muốn kể:\n“Dạ, phần ở nhà em chưa sẵn sàng kể. Em muốn nói trước về chuyện học đang làm em quá tải ạ”.\n\nNếu người ấy vẫn gặng hỏi, em có quyền dừng cuộc trò chuyện."
        },
        {
          Title: "4. Khi người ấy chưa thể hỗ trợ theo cách em cần",
          Guide: "Nếu thầy nói chưa có thời gian nghe riêng, em xin giới thiệu người khác:\n“Thưa thầy, thầy chỉ giúp em có thể gặp ai để nói chuyện riêng hôm nay được không ạ?”.\n\nEm cũng có thể hỏi về đầu mối phụ trách tư vấn học đường của trường."
        },
        {
          Title: "5. Khi em bị chế giễu hoặc muốn kết thúc cuộc nói chuyện",
          Guide: "Nói một câu ngắn để dừng: “Mình muốn dừng ở đây”.\n\nNếu bạn nói “Mình chỉ đùa thôi”, em nhắc lại quyết định dừng lại. Tìm người em thật sự tin cậy.\n\nNếu có lời đe dọa hoặc sợ bị làm đau, hãy tìm ngay một người lớn đáng tin cậy đang ở gần để được bảo vệ."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn tạm dừng",
      BranchTitle: "Tạm dừng và tìm kiếm hỗ trợ an toàn khi cần",
      Intro: "Em luôn có quyền tạm dừng bất cứ khi nào em thấy cần. Sự an toàn và thoải mái của em là quan trọng nhất.",
      Question: "Lúc này em muốn làm gì tiếp theo?",
      SubOptions: [
        { Index: 1, Text: "Em muốn nghỉ một lát để bình tâm lại" },
        { Index: 2, Text: "Em muốn có người ngồi cạnh mà chưa cần nói gì" },
        { Index: 3, Text: "Em cần người lớn giúp trực tiếp vì cảm thấy không an toàn" }
      ],
      Solutions: [
        {
          Title: "1. Tạm dừng nghỉ ngơi",
          Guide: "Em có thể dừng ở đây. Thả lỏng vai, thở chậm và uống một ngụm nước ấm.\n\nKhi muốn quay lại, em có thể bắt đầu từ điều mình cần lúc ấy. Không ai thúc ép em phải vội vã."
        },
        {
          Title: "2. Nhờ người ở cạnh",
          Guide: "Nhắn tin cho bạn hoặc người thân:\n“Bạn ở cùng mình một lát được không? Mình chưa muốn kể ngay”.\n\nSự hiện diện tĩnh lặng của một người bạn có thể giúp em cảm thấy an tâm hơn rất nhiều."
        },
        {
          Title: "3. Tìm người lớn hỗ trợ trực tiếp khẩn cấp",
         Guide: "Nếu em đang bị đe dọa, sợ bị làm đau hoặc cần giúp ngay:\nTìm thầy cô ở trường và nói: “Thưa cô, em đang thấy không an toàn. Cô có thể ở cùng em và giúp em tìm người phụ trách ngay được không ạ?”.\n\nNếu việc học khiến em quá tải nhiều lần: Hẹn gặp tư vấn học đường: “Thưa cô, chuyện học làm em thấy quá tải nhiều lần. Cô có thể giúp em xem em nên bắt đầu từ đâu không ạ?”."
        }
      ]
    }
  ]
};

// 2. Tình huống 1.23: Trong giờ học, em chưa hiểu nội dung thầy cô vừa giải thích nhưng lớp đã chuyển sang nội dung tiếp theo
const p1_23 = {
  Id: "p1_23",
  Code: "1.23",
  FileName: "Bộ câu hỏi chuyên sâu NT01 - Trong giờ học chưa hiểu nội dung nhưng lớp đã chuyển.docx",
  Title: "Trong giờ học, em chưa hiểu nội dung thầy cô vừa giải thích nhưng lớp đã chuyển sang nội dung tiếp theo",
  RootQuestion: "Câu 1. Điều nào đang làm em khó theo kịp bài học nhất lúc này?",
  Intro: "Nếu em còn đang nghĩ về phần vừa học mà lớp đã chuyển sang phần mới, em có thể thấy hụt một nhịp. Có thể em muốn hỏi thêm nhưng chưa biết bắt đầu từ đâu. Chuyện đó vẫn có thể xảy ra, kể cả khi em đã rất cố gắng theo dõi. Em cứ từ từ, bắt đầu bằng việc nhỏ: đánh dấu một từ, một ý hoặc một bước em muốn xem lại.",
  Options: [
    { Index: 1, Text: "Em chưa hiểu một từ hoặc khái niệm thầy cô vừa giải thích" },
    { Index: 2, Text: "Em hiểu từng ý nhưng chưa hiểu các ý liên quan với nhau như thế nào" },
    { Index: 3, Text: "Em chưa hiểu vì sao thầy cô đưa ra một kết luận" },
    { Index: 4, Text: "Em chưa hiểu một bước trong ví dụ hoặc bài tập thầy cô đang hướng dẫn" },
    { Index: 5, Text: "Em chưa nhớ hoặc chưa hiểu kiến thức đã học có liên quan đến bài mới" },
    { Index: 6, Text: "Em chưa kịp nghe, quan sát hoặc ghi lại nội dung bài học" },
    { Index: 7, Text: "Em muốn hỏi lại thầy cô nhưng chưa biết hỏi thế nào hoặc ngại hỏi" },
    { Index: 8, Text: "Em đã được giải thích lại nhưng vẫn chưa hiểu" },
    { Index: 9, Text: "Em đang lo lắng vì chưa theo kịp bài học và muốn lấy lại sự bình tĩnh" },
    { Index: 10, Text: "Em có khó khăn khác hoặc chưa biết diễn đạt" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em chưa hiểu một từ hoặc khái niệm thầy cô vừa giải thích",
      BranchTitle: "Làm rõ từ hoặc khái niệm chưa hiểu",
      Intro: "Khi chưa hiểu một khái niệm, em hãy xác định đúng điều mình chưa hiểu để không phải học lại tất cả từ đầu.",
      Question: "Điều nào đúng nhất với khó khăn của em về khái niệm này?",
      SubOptions: [
        { Index: 1, Text: "Em chưa biết khái niệm đó có nghĩa gì" },
        { Index: 2, Text: "Em đã nghe định nghĩa nhưng chưa hiểu một số từ trong định nghĩa" },
        { Index: 3, Text: "Em hiểu từng từ nhưng chưa hiểu ý nghĩa của cả định nghĩa" },
        { Index: 4, Text: "Em chưa hình dung được khái niệm qua hình ảnh hoặc ví dụ" },
        { Index: 5, Text: "Em dễ nhầm khái niệm này với khái niệm khác" },
        { Index: 6, Text: "Em nhớ được định nghĩa nhưng chưa giải thích được bằng lời của em" },
        { Index: 7, Text: "Em chưa hiểu khái niệm này liên quan thế nào đến nội dung học tiếp theo" }
      ],
      Solutions: [
        {
          Title: "1. Tìm hiểu nghĩa của khái niệm qua học liệu và câu hỏi cụ thể",
          Guide: "Ghi lại tên khái niệm cùng tên bài. 5 bước tự học:\n1. Mở bài học, xem tên mục và từ in đậm.\n2. Đọc đối tượng, đặc điểm quan trọng và phạm vi áp dụng.\n3. Tìm một ví dụ minh họa.\n4. Đóng tài liệu và thử tự giải thích bằng lời của em.\n5. Mở lại đối chiếu. Nếu cần hỏi thầy cô: “Thưa cô, em chưa hiểu cụm từ này, cô cho em xem một ví dụ cụ thể được không ạ?”."
        },
        {
          Title: "2. Làm rõ từ khó nằm bên trong định nghĩa",
          Guide: "Một từ chưa rõ có thể khiến cả câu khó hiểu. Đánh dấu từ đó, giữ nguyên cả câu để xem các từ xung quanh.\n\nNếu từ mang nghĩa chuyên môn: Đặt câu hỏi “Thưa cô, trong định nghĩa … có cụm từ … mà em chưa hiểu. Cô có thể giải thích cụm từ này trước để em hiểu được cả định nghĩa không ạ?”.\n\nSau khi làm rõ từ khó, đọc lại cả câu định nghĩa."
        },
        {
          Title: "3. Tách định nghĩa thành các thành phần để hiểu trọn vẹn",
          Guide: "Chia định nghĩa thành các ý nhỏ:\n- Đối tượng được nói đến là gì?\n- Đặc điểm thứ nhất, đặc điểm thứ hai là gì?\n- Mối liên hệ giữa các đặc điểm?\n- Điều kiện hoặc phạm vi áp dụng?\n\nNếu chưa rõ điều kiện, hỏi thầy cô: “Nội dung này được áp dụng trong những trường hợp nào? Nếu điều kiện thay đổi thì kết luận có còn đúng không ạ?”."
        },
        {
          Title: "4. Hình dung khái niệm qua sơ đồ và ví dụ cụ thể",
          Guide: "Đọc tên hình và chú giải, dùng mũi tên nối để xem thứ tự quá trình.\n\nĐối chiếu lần lượt từng đặc điểm trong định nghĩa với chi tiết trong ví dụ: “Đây là ví dụ về … vì có đặc điểm …”.\n\nNếu chưa tìm được căn cứ, hỏi: “Thưa cô, chi tiết nào trong ví dụ cho thấy đây là trường hợp của khái niệm này ạ?”."
        },
        {
          Title: "5. Phân biệt hai khái niệm dễ nhầm lẫn",
          Guide: "Đặt hai khái niệm cạnh nhau và lập bảng so sánh theo cùng tiêu chí:\n- Gạch chân phần giống nhau bằng một ký hiệu, phần khác nhau bằng ký hiệu khác.\n- Tìm một ví dụ cho mỗi khái niệm để chỉ ra sự khác biệt.\n\nNhờ thầy cô: “Khi so sánh hai khái niệm này, em cần dựa vào đặc điểm nào để phân biệt bản chất ạ?”."
        },
        {
          Title: "6. Diễn đạt định nghĩa bằng ngôn ngữ của chính em",
          Guide: "Ghi lại 2-3 từ khóa quan trọng rồi che định nghĩa lại. Bắt đầu bằng câu ngắn nêu đối tượng, sau đó bổ sung đặc điểm bằng lời của em, giữ lại các thuật ngữ cần thiết.\n\nĐối chiếu 3 điều: đúng đối tượng, đủ đặc điểm quan trọng và không làm thay đổi ý nghĩa khoa học."
        },
        {
          Title: "7. Kết nối khái niệm với nội dung bài học tiếp theo",
          Guide: "Đối chiếu tên khái niệm với các công thức, sơ đồ hoặc bước thực hiện ở phần mới.\n\nTự hỏi: “Nội dung mới đang sử dụng khái niệm này để xác định, giải thích hay thực hiện điều gì?”.\n\nNếu chưa rõ, hỏi: “Thưa cô, em đã hiểu khái niệm … nhưng chưa hiểu vì sao cần dùng nó ở phần này. Cô chỉ giúp em mối liên hệ được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em hiểu từng ý nhưng chưa hiểu các ý liên quan với nhau như thế nào",
      BranchTitle: "Kết nối mối liên hệ giữa các ý trong bài học",
      Intro: "Khi hai ý cứ lẫn vào nhau, em viết mỗi ý trên một dòng. Em có thể nghỉ một lát rồi quay lại nối hai dòng đó.",
      Question: "Em đang chưa hiểu mối liên hệ nào?",
      SubOptions: [
        { Index: 1, Text: "Em chưa biết cần hiểu ý nào trước" },
        { Index: 2, Text: "Em chưa hiểu nguyên nhân dẫn đến kết quả" },
        { Index: 3, Text: "Em chưa hiểu các bước của một quá trình liên kết với nhau ra sao" },
        { Index: 4, Text: "Em chưa hiểu điểm giống và khác giữa hai nội dung" },
        { Index: 5, Text: "Em chưa hiểu kiến thức trước giúp giải thích nội dung mới như thế nào" }
      ],
      Solutions: [
        {
          Title: "1. Xác định thứ tự ưu tiên giữa các ý",
          Guide: "Viết mỗi ý trên một dòng. Tự hỏi: “Để hiểu ý này, em cần biết điều gì trước?”.\n\nĐánh dấu kiến thức đã hiểu và kiến thức còn thiếu.\n\nHỏi thầy cô: “Thưa cô, em đã hiểu phần … nhưng chưa biết cần bổ sung kiến thức nào trước để hiểu phần … . Cô giúp em xác định thứ tự tìm hiểu được không ạ?”."
        },
        {
          Title: "2. Làm rõ quá trình trung gian từ nguyên nhân đến kết quả",
          Guide: "Chia lời giải thích thành 3 cột: Nguyên nhân/Điều kiện -> Quá trình xảy ra ở giữa -> Kết quả.\n\nKhông chỉ nhớ hai đầu sơ đồ, hãy tìm hiểu điều gì xảy ra ở giữa.\n\nHỏi thầy cô: “Em đã biết A dẫn đến B nhưng chưa hiểu quá trình xảy ra ở giữa. Cô giải thích từng bước giúp em được không ạ?”."
        },
        {
          Title: "3. Kết nối các bước trong một quy trình",
          Guide: "Bên cạnh mỗi bước, ghi kết quả tạo thành và xem kết quả đó làm đầu vào cho bước tiếp theo như thế nào.\n\nNếu chưa hiểu một mũi tên trong sơ đồ, chỉ tập trung giải thích đúng mũi tên đó, không cần học thuộc cả sơ đồ máy móc."
        },
        {
          Title: "4. So sánh điểm giống và khác theo cùng tiêu chí",
          Guide: "Chọn cùng một tiêu chí để đối chiếu cả hai nội dung (không so kết quả của nội dung này với điều kiện của nội dung kia).\n\nLập bảng đối chiếu rõ ràng và thử phân loại trên một ví dụ mới."
        },
        {
          Title: "5. Tìm điểm tựa từ kiến thức cũ cho bài mới",
          Guide: "Đặt hai nội dung cạnh nhau, đánh dấu từ, dữ kiện hoặc công thức liên quan.\n\nTự hỏi: “Nếu bỏ kiến thức cũ đi thì bước nào ở bài mới em không giải thích được?”. Đó chính là điểm nối quan trọng nhất cần ôn lại."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em chưa hiểu vì sao thầy cô đưa ra một kết luận",
      BranchTitle: "Tìm hiểu căn cứ và lập luận dẫn đến kết luận",
      Intro: "Một kết luận khoa học luôn cần được hiểu cùng với những dữ kiện và căn cứ dẫn đến kết luận đó.",
      Question: "Em đang chưa hiểu điều nào trong kết luận?",
      SubOptions: [
        { Index: 1, Text: "Em chưa hiểu dữ kiện được sử dụng" },
        { Index: 2, Text: "Em chưa hiểu kiến thức làm căn cứ" },
        { Index: 3, Text: "Em hiểu dữ kiện và kiến thức nhưng chưa hiểu cách lập luận" },
        { Index: 4, Text: "Em có cách hiểu khác với kết luận của thầy cô" },
        { Index: 5, Text: "Em chưa hiểu điều kiện áp dụng của kết luận" }
      ],
      Solutions: [
        {
          Title: "1. Đọc lại và phân tích chính xác dữ kiện",
          Guide: "Tìm lại số liệu, bảng hoặc kết quả thực nghiệm. Đọc tên bảng, tên hàng, cột và đơn vị đo.\n\nXác định mỗi dữ kiện đang mô tả đối tượng nào, ở điều kiện nào trước khi rút ra nhận xét."
        },
        {
          Title: "2. Xác định kiến thức nền làm căn cứ kết luận",
          Guide: "Hỏi thầy cô: “Thưa cô, để đưa ra kết luận này, em cần dựa vào kiến thức hoặc định lý nào ạ?”.\n\nSau khi xác định được kiến thức, em tự dùng kiến thức đó để phân tích lại dữ kiện ban đầu."
        },
        {
          Title: "3. Làm rõ bước suy luận trung gian",
          Guide: "Ghi riêng: Dữ kiện có sẵn -> Kiến thức áp dụng -> Kết luận.\n\nHỏi thầy cô: “Em đã hiểu dữ kiện và kiến thức nhưng chưa rõ vì sao từ đó suy ra được kết luận này. Cô chỉ cho em bước nối ở giữa được không ạ?”."
        },
        {
          Title: "4. Trao đổi khi có cách hiểu khác biệt",
          Guide: "Trình bày dựa trên căn cứ khoa học: “Thưa cô, từ dữ kiện này em đang hiểu theo hướng A, nhưng kết luận của cô là B. Cô xem giúp em cách lập luận của em chưa phù hợp ở đâu ạ?”. Lắng nghe phản hồi để sửa lại bước tư duy."
        },
        {
          Title: "5. Kiểm tra điều kiện áp dụng của kết luận",
          Guide: "Tìm các từ hạn định: “khi”, “trong điều kiện”, “chỉ áp dụng đối với”.\n\nThử thay đổi một điều kiện và xem kết luận có còn đúng không. Kết luận khoa học luôn đi kèm điều kiện cụ thể."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em chưa hiểu một bước trong ví dụ hoặc bài tập thầy cô đang hướng dẫn",
      BranchTitle: "Tháo gỡ bước bị kẹt trong ví dụ hoặc bài tập",
      Intro: "Em không cần làm lại toàn bộ bài ngay. Hãy tìm bước cuối cùng mình đã hiểu và bước đầu tiên mình chưa hiểu.",
      Question: "Em đang vướng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Em chưa hiểu yêu cầu hoặc dữ kiện đề bài" },
        { Index: 2, Text: "Em chưa biết vì sao cần sử dụng kiến thức hoặc công thức đó" },
        { Index: 3, Text: "Em chưa hiểu cách chuyển từ bước trước sang bước sau" },
        { Index: 4, Text: "Em hiểu cách làm nhưng chưa thực hiện được thao tác" },
        { Index: 5, Text: "Em hiểu lúc thầy cô làm nhưng chưa tự làm được" }
      ],
      Solutions: [
        {
          Title: "1. Tách điều đã cho và điều cần tìm",
          Guide: "Ghi rõ 2 cột: Điều đề bài cho biết | Điều đề bài yêu cầu tìm.\n\nDiễn đạt lại yêu cầu bằng lời của em. Nếu chưa hiểu từ nào trong đề bài, đánh dấu từ đó để làm rõ trước."
        },
        {
          Title: "2. Tìm căn cứ lựa chọn công thức",
          Guide: "Xem mối liên hệ giữa đại lượng cần tìm với đại lượng đã cho trong đề bài.\n\nHỏi thầy cô: “Dữ kiện nào trong bài giúp em nhận ra cần dùng công thức này ạ?”. Tự thử chọn công thức cho một bài tương tự."
        },
        {
          Title: "3. Khôi phục bước chuyển tiếp ở giữa hai dòng",
          Guide: "Chép riêng hai bước đang vướng. Viết thêm các dòng biến đổi trung gian.\n\nXác định xem mình chưa hiểu quy tắc, phép biến đổi toán học hay bước suy luận."
        },
        {
          Title: "4. Luyện tập riêng thao tác còn vướng",
          Guide: "Chọn đúng thao tác đang vướng và thực hiện trên bài đơn giản hơn.\n\nNhờ thầy cô: “Cô hướng dẫn em thao tác này một lần rồi để em tự thử làm lại được không ạ?”. Tự sửa lỗi trước khi giải tiếp bài hoàn chỉnh."
        },
        {
          Title: "5. Giảm dần sự phụ thuộc vào lời giải mẫu",
          Guide: "Quy trình 3 bước tự lập:\n1. Xem ví dụ và tự giải thích từng bước.\n2. Che lời giải, chỉ giữ câu hỏi gợi ý và tự làm lại.\n3. Thử một bài tương tự mà không nhìn mẫu. Nếu vướng, chỉ xin gợi ý một bước nhỏ thay vì xem hết lời giải."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em chưa nhớ hoặc chưa hiểu kiến thức đã học có liên quan đến bài mới",
      BranchTitle: "Bổ sung và kết nối kiến thức nền tảng đã học",
      Intro: "Nếu thấy có quá nhiều phần cần xem lại, em chọn đúng một điều cần để hiểu bài hiện tại. Em có thể nhờ thầy cô cùng xác định phần nên xem trước.",
      Question: "Khó khăn của em với kiến thức đã học là gì?",
      SubOptions: [
        { Index: 1, Text: "Em không nhớ kiến thức thuộc bài nào" },
        { Index: 2, Text: "Em đã học nhưng không nhớ nội dung" },
        { Index: 3, Text: "Em nhớ nội dung nhưng chưa hiểu bản chất" },
        { Index: 4, Text: "Em hiểu kiến thức nhưng chưa biết sử dụng vào bài mới" },
        { Index: 5, Text: "Em thiếu nhiều kiến thức nền và chưa biết bổ sung từ đâu" }
      ],
      Solutions: [
        {
          Title: "1. Tra cứu nhanh vị trí kiến thức cũ",
          Guide: "Lấy từ khóa thầy cô đang nói tra trong mục lục sách giáo khoa hoặc vở ghi cũ.\n\nHỏi thầy cô: “Kiến thức cô đang nhắc thuộc bài nào ạ? Em muốn xem lại đúng mục đó để theo kịp bài hôm nay”."
        },
        {
          Title: "2. Kích hoạt trí nhớ chủ động (Active Recall)",
          Guide: "Ghi ra giấy những gì em còn nhớ trước khi mở sách xem. Sau đó mở sách đối chiếu và chỉ bổ sung đúng chi tiết em quên.\n\nĐóng sách lại và tự nói lại một lần."
        },
        {
          Title: "3. Hiểu bản chất thay vì học thuộc lòng câu chữ",
          Guide: "Xác định phần chưa hiểu: định nghĩa, mối liên hệ hay cách làm bài? Tự giải thích bằng một ví dụ thực tế thay vì chỉ đọc thuộc lòng câu chữ."
        },
        {
          Title: "4. Đặt kiến thức cũ cạnh bài mới để so sánh",
          Guide: "Đặt ví dụ cũ cạnh bài tập mới. So sánh điểm giống, điểm khác và điều kiện sử dụng. Thử làm một bước nhỏ có dùng kiến thức cũ."
        },
        {
          Title: "5. Lập kế hoạch bổ sung kiến thức trọng tâm",
          Guide: "Không cần học lại cả quyển sách! Hỏi giáo viên: “Em còn thiếu kiến thức A và B, cô giúp em xác định phần nào cần bổ sung trước để hiểu bài hiện tại ạ?”.\n\nChia nhỏ mục tiêu học trong 2-3 buổi, mỗi buổi 15-20 phút."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa kịp nghe, quan sát hoặc ghi lại nội dung bài học",
      BranchTitle: "Xử lý khi bị lỡ nhịp nghe, nhìn hoặc ghi chép",
      Intro: "Nếu lỡ một đoạn khiến em cuống, em chỉ cần đặt một dấu hỏi ở chỗ thiếu rồi nghe tiếp. Khi thuận tiện, em xin đối chiếu đúng đoạn đó.",
      Question: "Điều gì khiến em chưa tiếp nhận được đầy đủ nội dung?",
      SubOptions: [
        { Index: 1, Text: "Em chưa nghe rõ lời giảng" },
        { Index: 2, Text: "Em chưa quan sát rõ chữ viết, hình ảnh hoặc sơ đồ" },
        { Index: 3, Text: "Em đang ghi chép thì thầy cô chuyển sang nội dung khác" },
        { Index: 4, Text: "Em cố ghi tất cả nên không theo kịp lời giải thích" },
        { Index: 5, Text: "Em cần hình thức tiếp nhận thông tin phù hợp hơn" }
      ],
      Solutions: [
        {
          Title: "1. Nhờ thầy cô nhắc lại ý chính",
          Guide: "Khi phù hợp, giơ tay: “Thưa cô, em chưa nghe rõ phần giải thích về … . Cô nhắc lại ý chính giúp em được không ạ?”.\n\nNếu hay khó nghe do vị trí ngồi, trao đổi riêng để xin đổi chỗ phù hợp hơn."
        },
        {
          Title: "2. Khắc phục khi khó quan sát bảng",
          Guide: "Nói rõ chi tiết chưa nhìn rõ: “Thưa cô, em chưa đọc được chú giải ở góc phải. Cô cho em xem tài liệu hoặc mô tả bằng lời được không ạ?”. Mượn vở bạn ngồi gần đối chiếu nhanh trong giờ ra chơi."
        },
        {
          Title: "3. Đánh dấu vị trí ghi dở để nghe tiếp",
          Guide: "Đặt dấu hỏi hoặc chừa trống vài dòng trong vở rồi tập trung nghe tiếp phần giảng mới. Giờ ra chơi mượn vở bạn: “Bạn cho mình đối chiếu đúng đoạn này nhé”."
        },
        {
          Title: "4. Thay đổi phương pháp ghi chép thông minh",
          Guide: "Không chép nguyên văn từng câu! Chia trang vở thành 3 phần: Ý chính | Ví dụ/Căn cứ | Điều chưa hiểu (Câu hỏi).\n\nƯu tiên nghe hiểu và ghi từ khóa, công thức quan trọng."
        },
        {
          Title: "5. Đề xuất hình thức hỗ trợ tiếp nhận phù hợp",
          Guide: "Trao đổi riêng với giáo viên: “Khi bài giảng trình bày theo cách này em khó theo dõi. Cô có thể cho em xin bản tóm tắt hoặc sơ đồ các bước được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em muốn hỏi lại thầy cô nhưng chưa biết hỏi thế nào hoặc ngại hỏi",
      BranchTitle: "Luyện kỹ năng đặt câu hỏi và trao đổi với thầy cô",
      Intro: "Biết đặt câu hỏi là kỹ năng giúp em chủ động trong học tập. Em có thể chuẩn bị câu hỏi ngắn trước và chọn trao đổi riêng sau tiết học.",
      Question: "Điều nào khiến em khó trao đổi với thầy cô nhất?",
      SubOptions: [
        { Index: 1, Text: "Em chưa biết bắt đầu cuộc trao đổi" },
        { Index: 2, Text: "Em chưa biết trình bày điều mình chưa hiểu" },
        { Index: 3, Text: "Em chưa biết nên hỏi ai hoặc hỏi vào lúc nào" },
        { Index: 4, Text: "Em sợ bị đánh giá hoặc bị các bạn trêu chọc" },
        { Index: 5, Text: "Em đã hỏi nhưng chưa được giải đáp" },
        { Index: 6, Text: "Em muốn đề nghị cách hỗ trợ khác nhưng ngại bị từ chối" }
      ],
      Solutions: [
        {
          Title: "1. Mẫu câu mở đầu ngắn gọn, lịch sự",
          Guide: "Tập 3 câu ngắn:\n“Thưa cô, em xin phép hỏi về bài hôm nay. Em chưa hiểu phần … nên khó theo kịp nội dung tiếp theo. Khi thuận tiện, cô giúp em làm rõ phần này được không ạ?”."
        },
        {
          Title: "2. Công thức 4 ý để trình bày câu hỏi rõ ràng",
          Guide: "Chuẩn bị trước 4 ý:\n1. Bài đang học.\n2. Điều em đã hiểu.\n3. Điều cụ thể em chưa hiểu.\n4. Cách em muốn được cô hỗ trợ.\nKhông hỏi chung chung “Em không hiểu bài”, hãy chỉ đúng dòng đang vướng."
        },
        {
          Title: "3. Chọn thời điểm và kênh trao đổi thích hợp",
          Guide: "Nếu trong giờ cô đang bận: ghi câu hỏi vào vở, cuối tiết xin gặp 2 phút hoặc hỏi qua kênh nhóm học tập được phép. Nếu cần, nhờ giáo viên chủ nhiệm hướng dẫn thời điểm thuận tiện."
        },
        {
          Title: "4. Giải tỏa nỗi sợ bị đánh giá hoặc trêu chọc",
          Guide: "Em có quyền hỏi riêng sau tiết học hoặc viết giấy gửi thầy cô. Nếu có bạn trêu: “Mình đang muốn hiểu bài để tự làm, mình không muốn bị trêu vì việc này”. Ai cũng có lúc cần hỏi để tiến bộ."
        },
        {
          Title: "5. Cách hỏi lại khi chưa nhận được phản hồi",
          Guide: "Nhắc lại lịch sự: “Thưa cô, em xin phép hỏi lại nội dung … vì em vẫn còn vướng ở bài tiếp theo. Khi thuận tiện, cô hướng dẫn giúp em được không ạ?”. Nói rõ điều em đã thử làm để cô biết em đã nỗ lực."
        },
        {
          Title: "6. Đề nghị cách giải thích khác vừa sức hơn",
          Guide: "Nói rõ: “Thưa cô, em chưa hiểu được qua cách giải thích vừa rồi. Cô cho em một ví dụ ngắn hơn hoặc minh họa bằng sơ đồ được không ạ?”. Đề nghị điều chỉnh phương pháp là quyền chính đáng của người học."
        }
      ]
    },
    {
      StepIndex: 8,
      OptionText: "Em đã được giải thích lại nhưng vẫn chưa hiểu",
      BranchTitle: "Đổi hướng tiếp cận khi đã được giải thích mà vẫn chưa hiểu",
      Intro: "Nếu cách giải thích trước chưa giúp em hiểu bài, hãy mạnh dạn thay đổi cách tiếp cận thay vì lặp lại cách cũ.",
      Question: "Điều nào đúng với khó khăn hiện tại của em?",
      SubOptions: [
        { Index: 1, Text: "Lời giải thích vẫn có từ ngữ em chưa hiểu" },
        { Index: 2, Text: "Ví dụ được sử dụng vẫn quá khó đối với em" },
        { Index: 3, Text: "Em chưa theo kịp các bước giải thích" },
        { Index: 4, Text: "Em hiểu khi có người hướng dẫn nhưng chưa tự làm được" },
        { Index: 5, Text: "Em đã thử nhiều cách nhưng vẫn chưa hiểu" }
      ],
      Solutions: [
        {
          Title: "1. Yêu cầu làm rõ từ ngữ trong lời giải thích",
          Guide: "Ghi lại đúng từ đó và đề nghị: “Cô giải thích giúp em từ này trước được không ạ?”. Sau khi hiểu từ ngữ, quay lại hiểu toàn bộ nội dung."
        },
        {
          Title: "2. Xin một ví dụ đơn giản hơn",
          Guide: "Đề nghị: “Thưa cô, ví dụ này có nhiều dữ kiện quá em chưa theo kịp. Cô cho em một ví dụ đơn giản hơn chỉ tập trung vào một bước được không ạ?”. Làm chủ từ bước dễ trước."
        },
        {
          Title: "3. Đề nghị người hỗ trợ nói chậm và dừng từng bước",
          Guide: "Xác định bước cuối cùng em theo được. Đề nghị: “Cô dừng giúp em ở bước 2. Em xin tự nói lại bước này trước khi cô sang bước 3 được không ạ?”."
        },
        {
          Title: "4. Giảm dần sự hỗ trợ để tự lập",
          Guide: "Tự làm lại trên số liệu khác mà không nhìn mẫu. Nhờ người hướng dẫn chỉ quan sát và chỉ nhắc khi em thực sự bế tắc."
        },
        {
          Title: "5. Lập bảng tổng kết các cách đã thử và xin hỗ trợ chuyên sâu",
          Guide: "Lập bảng 3 cột: Cách đã thử | Điều đã hiểu | Điều còn vướng.\n\nTrao đổi với thầy cô bộ môn: “Em đã thử đọc sách, xem ví dụ và hỏi bạn nhưng vẫn chưa rõ phần này. Cô cùng em xem lại em đang thiếu kỹ năng nào nhé”."
        }
      ]
    },
    {
      StepIndex: 9,
      OptionText: "Em đang lo lắng vì chưa theo kịp bài học và muốn lấy lại sự bình tĩnh",
      BranchTitle: "Giải tỏa lo âu và lấy lại sự bình tĩnh trong giờ học",
      Intro: "Khi lo lắng, em có thể khó tập trung nghe giảng hoặc liên tục nghĩ đến phần chưa hiểu. Hãy hít thở sâu và bắt đầu bằng một việc nhỏ.",
      Question: "Điều nào đang làm em khó chịu nhất lúc này?",
      SubOptions: [
        { Index: 1, Text: "Em cứ nghĩ đến phần kiến thức chưa hiểu" },
        { Index: 2, Text: "Em lo càng học tiếp thì càng không hiểu" },
        { Index: 3, Text: "Em lo mình học chậm hơn các bạn" },
        { Index: 4, Text: "Em sợ bị gọi trả lời khi chưa hiểu bài" },
        { Index: 5, Text: "Em thấy bồn chồn hoặc cơ thể căng thẳng" },
        { Index: 6, Text: "Em quá mệt để tập trung hoặc lo bị trách phạt" }
      ],
      Solutions: [
        {
          Title: "1. Kỹ thuật viết ra giấy để 'cất' âu lo",
          Guide: "Ghi nhanh ra góc vở: “Chỗ này chưa hiểu, sẽ xem lại lúc 17h”.\n\nSau khi đã ghi lịch xem lại, tâm trí sẽ giải phóng và em có thể tiếp tục nghe bài giảng hiện tại."
        },
        {
          Title: "2. Phân tách bài học thành các phần độc lập",
          Guide: "Kiểm tra xem phần mới có hoàn toàn phụ thuộc vào phần cũ không. Nếu có phần độc lập, tiếp tục ghi nhận. Một bài học có nhiều mảng, chưa hiểu một ý không có nghĩa là hỏng cả buổi học."
        },
        {
          Title: "3. Tập trung vào tiến bộ của chính mình",
          Guide: "Đừng so sánh với tốc độ của bạn bên cạnh. Đặt mục tiêu nhỏ: trong tiết này em hiểu đúng 1 công thức hoặc 1 định nghĩa là đã tiến bộ so với trước."
        },
        {
          Title: "4. Chuẩn bị câu trả lời trung thực nếu bị gọi",
          Guide: "Tập sẵn câu: “Thưa cô, em theo được đến bước này, bước sau em chưa chắc. Cô cho em một gợi ý để em thử trả lời được không ạ?”. Thầy cô luôn trân trọng sự cầu thị trung thực."
        },
        {
          Title: "5. Bài tập neo đậu cơ thể (Grounding theo WHO)",
          Guide: "Đặt 2 bàn chân chạm vững trên sàn nhà. Thả lỏng hai vai. Nhìn quanh lớp và gọi tên 3 đồ vật màu xanh. Hít thở tự nhiên, cảm nhận cơ thể trở về trạng thái an toàn."
        },
        {
          Title: "6. Nghỉ ngơi ngắn và tách bạch nỗi sợ",
          Guide: "“Em chưa hiểu bài” là sự thật lúc này. “Cô sẽ ghét/mắng em” là suy nghĩ lo âu chưa xảy ra.\n\nNếu quá mệt, xin phép rửa mặt hoặc tạm dừng 5 phút để hồi phục năng lượng."
        }
      ]
    },
    {
      StepIndex: 10,
      OptionText: "Em có khó khăn khác hoặc chưa biết diễn đạt",
      BranchTitle: "Tìm lại điểm bắt đầu khi chưa biết diễn đạt",
      Intro: "Nếu em chưa gọi tên được điều đang vướng, em có thể chọn nghỉ, chọn một việc nhỏ hoặc nhờ một người cùng xem bài.",
      Question: "Em muốn bắt đầu bằng cách nào?",
      SubOptions: [
        { Index: 1, Text: "Em muốn thử tìm đúng phần mình chưa hiểu" },
        { Index: 2, Text: "Em muốn viết điều đang vướng ra giấy" },
        { Index: 3, Text: "Em muốn có người cùng xem lại bài" },
        { Index: 4, Text: "Em chưa muốn chia sẻ lúc này và muốn tạm dừng" }
      ],
      Solutions: [
        {
          Title: "1. Lần ngược lại dòng cuối cùng còn hiểu",
          Guide: "Lật lại vở, tìm dòng cuối cùng em còn hiểu được. Đánh dấu ngay dòng tiếp theo – đó chính là điểm xuất phát của khó khăn cần tháo gỡ."
        },
        {
          Title: "2. Viết hai câu định vị khó khăn",
          Guide: "Điền vào 2 chỗ trống:\n- “Em đã hiểu đến phần …”.\n- “Em chưa rõ từ chỗ …”.\nCó 2 câu này, em đi hỏi thầy cô hoặc bạn bè sẽ cực kỳ dễ dàng."
        },
        {
          Title: "3. Nhờ người cùng rà soát bài",
          Guide: "Đề nghị bạn hoặc cô: “Em chưa biết mình bắt đầu không hiểu từ đâu. Cô cùng em nhìn lướt qua từng ý để em thử nói lại được không ạ?”."
        },
        {
          Title: "4. Quyền tạm dừng",
          Guide: "Em hoàn toàn có quyền tạm dừng nghỉ ngơi mà không phải giải thích điều riêng tư. Khi sẵn sàng, em có thể quay lại bất cứ lúc nào."
        }
      ]
    }
  ]
};

// 3. Tình huống 1.24: Cha mẹ hoặc người chăm sóc nói sẽ đánh em vì bị điểm thấp hoặc chưa làm xong bài
const p1_24 = {
  Id: "p1_24",
  Code: "1.24",
  FileName: "Bộ câu hỏi tư vấn hỗ trợ chuyên sâu NT01 - Áp lực gia đình và điểm số.docx",
  Title: "Cha mẹ hoặc người chăm sóc nói sẽ đánh em vì bị điểm thấp hoặc chưa làm xong bài",
  RootQuestion: "Câu 1. Điều nào gần nhất với tình huống của em lúc này?",
  Intro: "Có thể em vừa muốn ba mẹ yên tâm, vừa ngại nói vì sợ ba mẹ thất vọng. Khi nghe nói sẽ bị đánh hoặc bị mắng, em có thể thấy sợ, buồn hoặc chỉ muốn im lặng. Em có quyền được an toàn và được giúp đỡ. Khi thấy an toàn và muốn nói chuyện, em có thể bắt đầu từ một điều nhỏ, như chỗ em chưa hiểu hoặc điều em mong ba mẹ nghe trước.",
  Options: [
    { Index: 1, Text: "Em cần được giúp ngay vì đang bị đánh, sợ sắp bị đánh hoặc vừa bị đánh và cần chăm sóc" },
    { Index: 2, Text: "Em đang ở nơi an toàn nhưng sợ bị đánh khi về nhà hoặc khi ba mẹ biết kết quả học" },
    { Index: 3, Text: "Em nghĩ ba mẹ có thể chỉ nói để em cố gắng nhưng em chưa biết họ có định đánh thật không" },
    { Index: 4, Text: "Em đang ở nơi an toàn nhưng chưa sẵn sàng nói chuyện trực tiếp với ba mẹ" },
    { Index: 5, Text: "Em đang an toàn và muốn trao đổi để ba mẹ hiểu em hơn" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em cần được giúp ngay vì đang bị đánh, sợ sắp bị đánh hoặc vừa bị đánh và cần chăm sóc",
      BranchTitle: "Tìm sự trợ giúp khẩn cấp và bảo vệ an toàn",
      Intro: "Nếu em đang gặp nguy hiểm, hãy ưu tiên sự an toàn của bản thân lên trên hết. Em có quyền được bảo vệ.",
      Question: "Hành động an toàn nhất cho em lúc này:",
      SubOptions: [
        { Index: 1, Text: "Di chuyển đến chỗ có người lớn em tin cậy ở gần" },
        { Index: 2, Text: "Gọi đường dây nóng bảo vệ trẻ em 111 hoặc cứu trợ khẩn cấp 113 / 115" },
        { Index: 3, Text: "Báo ngay với thầy cô hoặc người đang có mặt giúp đỡ" }
      ],
      Solutions: [
        {
          Title: "1. Di chuyển đến nơi an toàn gần nhất",
          Guide: "Nếu có thể di chuyển an toàn, em đến ngay phòng giáo viên, phòng bảo vệ, nhà người thân hoặc hàng xóm tin cậy.\n\nNói rõ: “Em có thể bị đánh, em cần được giúp ngay ạ” rồi nói nơi em đang ở."
        },
        {
          Title: "2. Gọi các số điện thoại hỗ trợ khẩn cấp",
          Guide: "- Tổng đài quốc gia bảo vệ trẻ em: 111 (miễn phí, 24/7).\n- Công an can thiệp khẩn cấp: 113.\n- Cấp cứu y tế nếu bị thương: 115.\nEm hoặc người ở gần có thể gọi ngay lập tức."
        },
        {
          Title: "3. Nhờ người lớn đáng tin cậy ở bên",
          Guide: "Báo ngay cho thầy cô chủ nhiệm hoặc ban giám hiệu: “Em bị đe dọa đánh đập và em sợ không dám về nhà. Thầy cô giúp em can thiệp với gia đình được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em đang ở nơi an toàn nhưng sợ bị đánh khi về nhà hoặc khi ba mẹ biết kết quả học",
      BranchTitle: "Tìm hỗ trợ trước khi rời trường hoặc về nhà",
      Intro: "Nếu đang ở trường, hãy tìm sự giúp đỡ của thầy cô trước khi rời trường để có phương án bảo vệ an toàn.",
      Question: "Em muốn làm gì để đảm bảo an toàn trước khi về?",
      SubOptions: [
        { Index: 1, Text: "Gặp thầy cô trước khi rời trường" },
        { Index: 2, Text: "Nhờ thầy cô làm cầu nối trao đổi trước với ba mẹ" },
        { Index: 3, Text: "Đề nghị người lớn có trách nhiệm đồng hành" }
      ],
      Solutions: [
        {
          Title: "1. Báo với thầy cô trước giờ về",
          Guide: "Gặp cô trước khi tan trường: “Thưa cô, ba mẹ em nói sẽ đánh em vì em chưa làm xong bài / điểm thấp. Em sợ khi về nhà hôm nay. Cô có thể giúp em trước khi em về không ạ?”."
        },
        {
          Title: "2. Nhờ nhà trường kết nối với gia đình",
          Guide: "Đề nghị cô chủ nhiệm hoặc chuyên viên tư vấn gọi điện trao đổi với phụ huynh trước, giải thích về khó khăn của em và nhắc nhở phương pháp giáo dục không bạo lực."
        },
        {
          Title: "3. Xác định nơi an toàn dự phòng",
          Guide: "Nếu em vẫn cảm thấy nguy hiểm khi về nhà, đề nghị nhà trường cho ở lại phòng tư vấn hoặc liên hệ người thân (ông bà, cô chú) đến đón và bảo trợ."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em nghĩ ba mẹ có thể chỉ nói để em cố gắng nhưng em chưa biết họ có định đánh thật không",
      BranchTitle: "Xác định mức độ an toàn và giải tỏa lo sợ",
      Intro: "Có thể ba mẹ lo em bỏ qua bài học, nhưng lời dọa đánh vẫn khiến em rất sợ. Em có thể thăm dò mức độ an toàn.",
      Question: "Sau khi nghe lời nhắc đó, em muốn làm gì trước?",
      SubOptions: [
        { Index: 1, Text: "Em vẫn sợ mình có thể bị đánh và cần tìm người lớn chia sẻ" },
        { Index: 2, Text: "Em chưa rõ mình có an toàn không và muốn nhờ người ở cùng" },
        { Index: 3, Text: "Em thấy an toàn và muốn hiểu điều ba mẹ thực sự lo lắng" },
        { Index: 4, Text: "Em chưa muốn nói chuyện và muốn nghỉ ngơi trước" }
      ],
      Solutions: [
        {
          Title: "1. Chia sẻ nỗi sợ với thầy cô hoặc chuyên viên tâm lý",
          Guide: "Nói với thầy cô: “Ba mẹ em nói sẽ đánh em vì điểm thấp. Em chưa biết ba mẹ có làm thật không nhưng em rất sợ. Cô giúp em xem nên làm gì tiếp theo ạ?”."
        },
        {
          Title: "2. Nhờ người thân đáng tin cậy có mặt cùng",
          Guide: "Nhờ anh chị lớn, ông bà hoặc người thân có uy tín ngồi cùng khi em báo điểm hoặc nói chuyện học tập với ba mẹ để đảm bảo không khí an toàn."
        },
        {
          Title: "3. Hỏi để làm rõ điều ba mẹ lo lắng khi thấy an toàn",
          Guide: "Hỏi nhẹ nhàng: “Dạ, khi nhắc con cố gắng hơn, ba mẹ lo nhất điều gì về việc học của con lúc này ạ?”. Lắng nghe điều ba mẹ lo để tìm hướng giải quyết bài tập."
        },
        {
          Title: "4. Tạm dừng để bình tâm",
          Guide: "Em có quyền nghỉ ngơi hoặc nhờ người bạn tin cậy lắng nghe trước. Em tự chọn điều mình sẵn sàng chia sẻ."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đang ở nơi an toàn nhưng chưa sẵn sàng nói chuyện trực tiếp với ba mẹ",
      BranchTitle: "Chuẩn bị tâm lý và tìm người đồng hành trung gian",
      Intro: "Khi chưa sẵn sàng đối thoại trực tiếp, em có thể chuẩn bị trước nội dung hoặc nhờ người đồng hành hỗ trợ.",
      Question: "Em muốn chuẩn bị bước nào trước?",
      SubOptions: [
        { Index: 1, Text: "Xin nói riêng với thầy cô hoặc chuyên viên tâm lý học đường" },
        { Index: 2, Text: "Viết ra giấy hoặc tin nhắn điều muốn nói trước khi nói trực tiếp" },
        { Index: 3, Text: "Nhờ một người lớn em tin cậy ngồi cùng khi trao đổi với ba mẹ" }
      ],
      Solutions: [
        {
          Title: "1. Tâm sự với người lớn trung gian đáng tin cậy",
          Guide: "Nói với cô: “Thưa cô, em muốn ba mẹ hiểu chuyện học của em nhưng em chưa sẵn sàng nói trực tiếp. Cô có thể nghe em trước và giúp em chọn cách trao đổi phù hợp không ạ?”."
        },
        {
          Title: "2. Soạn trước tin nhắn hoặc thư ngắn",
          Guide: "Viết ra giấy: “Dạ, con biết điểm lần này chưa tốt. Con đã tìm ra chỗ mình vướng và đang nhờ cô hướng dẫn sửa. Con xin gửi ba mẹ xem bài con đã sửa vào tối mai ạ”."
        },
        {
          Title: "3. Nhờ người có mặt làm điểm tựa an toàn",
          Guide: "Nhờ một người thân mà ba mẹ tôn trọng cùng có mặt trong buổi nói chuyện. Sự có mặt của người thứ ba giúp cuộc nói chuyện giữ được sự bình tĩnh và văn minh."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em đang an toàn và muốn trao đổi để ba mẹ hiểu em hơn",
      BranchTitle: "Đối thoại hiệu quả và thương lượng hòa bình với gia đình",
      Intro: "Khi em thấy an toàn và muốn nói chuyện, em có thể chọn 1 trong 10 vấn đề cụ thể dưới đây để cùng ba mẹ tháo gỡ nút thắt.",
      Question: "Em muốn cùng ba mẹ làm rõ điều gì trước?",
      SubOptions: [
        { Index: 1, Text: "Em muốn hiểu ba mẹ thực sự mong điều gì khi nói 'cố gắng hơn'" },
        { Index: 2, Text: "Em sợ ba mẹ thất vọng nên chưa dám nói điểm thật" },
        { Index: 3, Text: "Ba mẹ mong em đạt mức điểm mà em thấy khó đạt ngay" },
        { Index: 4, Text: "Ba mẹ muốn em làm xong bài tối nay nhưng em còn phần chưa hiểu" },
        { Index: 5, Text: "Em thấy áp lực khi ba mẹ so sánh em với bạn hoặc anh chị" },
        { Index: 6, Text: "Em đang quá căng thẳng, khó mở lời hoặc khó nói tiếp" },
        { Index: 7, Text: "Em muốn ba mẹ hiểu lời dọa đánh khiến em rất sợ và khó học" },
        { Index: 8, Text: "Em khó nhận ra ba mẹ quan tâm đến em theo cách nào" },
        { Index: 9, Text: "Em biết ba mẹ lo cho em nhưng cách hỏi về điểm làm em thấy áp lực" },
        { Index: 10, Text: "Em muốn hai bên gần nhau hơn sau một cuộc nói chuyện căng thẳng" }
      ],
      Solutions: [
        {
          Title: "1. Làm rõ ý nghĩa của lời nhắc 'cố gắng hơn'",
          Guide: "Hỏi ba mẹ: “Dạ, khi nói con cố gắng hơn, ba mẹ muốn con ưu tiên làm việc nào trước trong tuần này ạ: sửa chỗ bài tập chưa hiểu hay ôn lại kiến thức cũ ạ?”.\n\nChuyển từ mục tiêu chung chung sang một hành động cụ thể."
        },
        {
          Title: "2. Cách báo điểm số chân thật và giảm bớt thất vọng",
          Guide: "Công thức 3 phần: Nêu kết quả + Chỉ chỗ làm được + Kế hoạch sửa chỗ sai:\n“Dạ, điểm lần này của con chưa như mong đợi. Con làm được phần câu hỏi ngắn, nhưng câu giải thích con bị thiếu ý. Con đã xin cô hướng dẫn và tối mai con sẽ tự làm lại ạ”."
        },
        {
          Title: "3. Thương lượng khi kỳ vọng điểm số quá cao",
          Guide: "Thay vì hứa điểm số xa vời, hãy cam kết hành vi cụ thể:\n“Dạ, con xin giữ điểm 8 làm mục tiêu phấn đấu. Việc con có thể làm chắc chắn tuần này là tự sửa lại 1 câu khó và giải thích cho ba mẹ nghe mà không nhìn đáp án. Ba mẹ xem tiến bộ của con qua câu này nhé ạ”."
        },
        {
          Title: "4. Kế hoạch khi bài tập chưa thể hoàn thành trong đêm nay",
          Guide: "Trình bày rõ ràng: “Dạ, tối nay con hoàn thành phần 1 và 2. Phần 3 con chưa hiểu đề, sáng mai con sẽ hỏi cô giáo. Chiều mai sau khi hỏi xong con sẽ hoàn thành nốt trước hạn nộp ạ”."
        },
        {
          Title: "5. Phản hồi tích cực khi bị so sánh với bạn khác",
          Guide: "Bày tỏ cảm xúc và chuyển hướng sang bài làm của mình: “Dạ, con biết ba mẹ muốn con có động lực. Nhưng khi nghe so sánh con thấy rất áp lực. Ba mẹ xem bài lần này của con đã làm tốt hơn bài trước ở bước này rồi ạ”."
        },
        {
          Title: "6. Xin khoảng dừng khi cuộc nói chuyện trở nên căng thẳng",
          Guide: "Nói bình tĩnh: “Dạ, lúc này con đang thấy rất rối và khó nói rõ ý. Ba mẹ cho con xin nghỉ 15 phút được không ạ? Sau đó con xin nói tiếp về chỗ con chưa hiểu trong bài ạ”."
        },
        {
          Title: "7. Giúp ba mẹ hiểu tác hại của lời dọa nạt",
          Guide: "Bày tỏ chân thành: “Dạ, con hiểu ba mẹ muốn con chăm học. Nhưng khi nghe nói sẽ bị đánh, con thấy rất sợ và càng không thể tập trung làm bài được. Lần sau ba mẹ nhắc việc con cần làm bằng lời bình tĩnh được không ạ?”."
        },
        {
          Title: "8. Nhận diện sự quan tâm qua hành động nhỏ hàng ngày",
          Guide: "Nhận ra sự chăm sóc của cha mẹ qua đồ ăn, sự đưa đón hay chuẩn bị đồ dùng. Nói lời cảm ơn cụ thể: “Con cảm ơn mẹ đã chuẩn bị đồ ăn sáng cho con. Con thấy được quan tâm lắm ạ”."
        },
        {
          Title: "9. Đề xuất thời điểm và cách hỏi han về việc học",
          Guide: "Đề xuất thời gian phù hợp: “Dạ, khi con vừa đi học về con đang khá mệt. Sau bữa cơm tối ba mẹ hỏi con học thế nào được không ạ? Lúc đó con sẽ kể được nhiều hơn ạ”."
        },
        {
          Title: "10. Nối lại tình cảm sau bất đồng hoặc tranh cãi",
          Guide: "Chủ động mở lời sau khi cả hai đã nguôi giận: “Dạ, hôm qua con chưa nói rõ được ý mình. Con muốn ba mẹ hiểu chỗ con đang vướng và con cũng muốn nghe ba mẹ lo lắng điều gì. Mình dành 5 phút nói chuyện nhẹ nhàng được không ạ?”."
        }
      ]
    }
  ]
};

// Kiểm tra xem đã có chưa
const existingCodes = problems.map(p => p.Code);
if (!existingCodes.includes("1.22")) {
  problems.push(p1_22);
  console.log("Added 1.22");
}
if (!existingCodes.includes("1.23")) {
  problems.push(p1_23);
  console.log("Added 1.23");
}
if (!existingCodes.includes("1.24")) {
  problems.push(p1_24);
  console.log("Added 1.24");
}

console.log('New total problems:', problems.length);

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('Saved questions_data.json successfully!');
