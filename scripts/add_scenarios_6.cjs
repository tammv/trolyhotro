const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.33: Khi gia đình so sánh điểm và em sợ làm ba mẹ thất vọng
const p1_33 = {
  Id: "p1_33",
  Code: "1.33",
  FileName: "Khi gia đình so sánh điểm và em sợ làm ba mẹ thất vọng.docx",
  Title: "Khi gia đình so sánh điểm và em sợ làm ba mẹ thất vọng",
  RootQuestion: "Câu 1. Sau khi nghe người thân so sánh điểm của em với bạn, em muốn được giúp việc gì trước?",
  Intro: "Sau khi biết điểm bài kiểm tra của em, người thân nhắc rằng một bạn trong lớp được điểm cao hơn và nói: “Lần sau con phải được điểm cao như bạn.” Em buồn khi bị so sánh và lo gia đình sẽ thất vọng.\n\nEm chưa cần trả lời ngay hay hứa một mức điểm khi đang lo. Em có thể chọn điều mình cần nhất lúc này.\n\nNếu em bị đe dọa, bị đánh hoặc sợ mình sắp bị làm đau, em có thể dừng lại ngay và tìm một người lớn đáng tin cậy: “Em đang sợ mình sẽ bị làm đau. Em cần cô giúp em ngay lúc này ạ.”",
  Options: [
    { Index: 1, Text: "Em muốn có người nghe em kể hoặc muốn dịu lại một chút" },
    { Index: 2, Text: "Em muốn hiểu người thân thực sự mong điều gì" },
    { Index: 3, Text: "Em muốn nói với người thân rằng việc bị so sánh khiến em áp lực" },
    { Index: 4, Text: "Em muốn cùng người thân thống nhất một mục tiêu vừa sức" },
    { Index: 5, Text: "Em muốn biết nên sửa gì để lần sau làm bài tốt hơn" },
    { Index: 6, Text: "Em chưa rõ mình cần gì, hoặc có nhiều điều cùng lúc" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn có người nghe em kể hoặc muốn dịu lại một chút",
      BranchTitle: "Tìm người lắng nghe hoặc cho mình một khoảng nghỉ bình tâm",
      Intro: "Em có thể thương ba mẹ và vẫn buồn vì lời so sánh. Nếu chưa muốn bàn chuyện điểm số hay lập kế hoạch ôn, em có thể nói rõ điều mình cần trước.",
      Question: "Ngay lúc này, em muốn điều gì nhất?",
      SubOptions: [
        { Index: 1, Text: "Em muốn có người nghe em kể hết điều đang vướng" },
        { Index: 2, Text: "Em muốn có một lúc yên tĩnh để dịu lại" },
        { Index: 3, Text: "Khi người nghe đưa lời khuyên ngay, em muốn nói để họ hiểu mình cần được nghe trước" }
      ],
      Solutions: [
        {
          Title: "1. Chọn người lắng nghe tôn trọng và mở lời ngắn gọn",
          Guide: "Chọn một người từng lắng nghe em với thái độ tôn trọng (thầy cô, người thân khác hoặc bạn tin cậy).\n\nCâu gợi ý: “Thưa cô, em đang buồn vì chuyện điểm số ở nhà. Cô có thể nghe em kể riêng vài phút được không ạ? Em muốn nói hết điều đang vướng trước ạ.”"
        },
        {
          Title: "2. Tạm đặt bài sang một bên và bình tâm lại",
          Guide: "Nếu có thể, em đặt bài sang một bên, ngồi ở nơi thoải mái và để ý bàn chân chạm sàn hoặc một âm thanh quanh mình.\n\nNếu chưa muốn nói hay làm gì thêm, em có thể nghỉ ngay. Sau đó tự chọn nghỉ thêm, quay lại một việc nhỏ hoặc tìm người trò chuyện khi sẵn sàng."
        },
        {
          Title: "3. Nhẹ nhàng nói rõ khi người nghe vội khuyên",
          Guide: "Nếu người nghe nói “Con cứ ôn thêm là được”, em có thể đáp:\n“Dạ, con cảm ơn mẹ. Lúc này con muốn mẹ nghe con kể hết một chút. Khi nào bình tĩnh hơn, con muốn cùng mẹ bàn cách ôn ạ.”\n\nNếu đang buồn chưa muốn nói tiếp: “Dạ, con đang buồn. Con muốn nghỉ một lát rồi nói chuyện sau ạ.”"
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn hiểu người thân thực sự mong điều gì",
      BranchTitle: "Hỏi để hiểu điều gia đình đang lo phía sau điểm số",
      Intro: "Người thân có thể lo em hổng kiến thức, chưa theo kịp phần sau hoặc sợ ảnh hưởng mục tiêu tương lai. Hiểu đúng nỗi lo giúp cuộc nói chuyện bớt căng thẳng.",
      Question: "Em muốn tìm hiểu điều người thân mong muốn theo cách nào?",
      SubOptions: [
        { Index: 1, Text: "Hỏi nhẹ nhàng xem ba mẹ đang lo nhất điều gì ngoài con số" },
        { Index: 2, Text: "Nhắc lại bằng lời của mình để xác nhận hiểu đúng ý ba mẹ" },
        { Index: 3, Text: "Chuẩn bị câu hỏi trước hoặc nhờ người lớn tin cậy hỗ trợ" }
      ],
      Solutions: [
        {
          Title: "1. Đặt câu hỏi mở để hiểu nỗi lo thật sự",
          Guide: "Khi thấy an toàn và thuận tiện, em có thể hỏi:\n“Dạ, con nghe ba nói lần sau con cần được điểm cao hơn. Ba lo nhất là con còn hổng kiến thức hay lo kết quả này sẽ ảnh hưởng đến mục tiêu sau này của con ạ?”\n\nNếu sợ ba mẹ thất vọng: “Con đang lo mẹ thất vọng. Mẹ có thể nói cho con biết mẹ đang lo nhất về điều gì không ạ?”"
        },
        {
          Title: "2. Xác nhận lại điều mình nghe được",
          Guide: "Sau khi nghe người thân chia sẻ (ví dụ “Mẹ sợ con không theo kịp phần sau”), em đáp lại bằng lời của mình:\n“Dạ, con hiểu là mẹ đang lo con chưa nắm chắc phần này. Con hiểu như vậy đúng không ạ?”\n\nNếu người thân vẫn chỉ nhắc đến điểm: “Dạ, con hiểu ba muốn điểm con khá hơn. Con muốn cùng ba xem con cần sửa bước nào để tiến bộ ạ.”"
        },
        {
          Title: "3. Viết câu hỏi trước nếu chưa sẵn sàng hỏi ngay",
          Guide: "Nếu lúc đó chưa thể nói trực tiếp, em có thể viết câu hỏi ra giấy trước, trao đổi với một người thân khác dễ nói chuyện hoặc nhờ thầy cô/người phụ trách tư vấn học đường cùng chuẩn bị."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em muốn nói với người thân rằng việc bị so sánh khiến em áp lực",
      BranchTitle: "Mở lời về cảm giác áp lực khi bị so sánh",
      Intro: "Em có thể trân trọng mong muốn của ba mẹ và vẫn chia sẻ rằng việc so sánh khiến em buồn và khó tập trung hơn.",
      Question: "Cách nào giúp em thấy dễ mở lời hơn?",
      SubOptions: [
        { Index: 1, Text: "Chọn lúc nói chuyện riêng khi cả hai đều bình tĩnh" },
        { Index: 2, Text: "Ghi nhận mong muốn tiến bộ của ba mẹ và đề nghị cách đồng hành khác" },
        { Index: 3, Text: "Xin tạm dừng hoặc giữ chuyện điểm số cho riêng mình nếu đang đông người/căng thẳng" }
      ],
      Solutions: [
        {
          Title: "1. Nói rõ việc đã xảy ra, cảm giác của em và điều em mong",
          Guide: "Chọn lúc chỉ có hai người (hoặc viết lời nhắn ngắn trước):\n“Dạ, lúc ba nhắc điểm của bạn và nói lần sau con phải được như bạn, con buồn và càng lo khi nghĩ đến bài kiểm tra tới. Con biết ba mong con tiến bộ. Lần sau ba có thể cùng con xem con đã làm được gì và cần sửa gì trên bài không ạ?”"
        },
        {
          Title: "2. Khi ba mẹ nói “Có so sánh mới có động lực”",
          Guide: "Em đáp nhẹ nhàng nhưng rõ ý:\n“Dạ, con hiểu ba muốn con cố gắng. Khi nghe so điểm với bạn, con rất dễ nghĩ mình học kém. Ba giúp con nhìn vào phần con cần sửa trên bài được không ạ?”"
        },
        {
          Title: "3. Xin dừng hoặc giữ riêng tư khi tình huống căng thẳng",
          Guide: "Nếu bị hỏi điểm trước mặt đông người (như trong bữa ăn), em có thể xin nói chuyện sau đó ở chỗ riêng.\n\nNếu cuộc nói chuyện trở nên căng hơn: “Dạ, lúc này con hơi rối. Con xin dừng một lát rồi mình nói tiếp khi thuận tiện được không ạ?” Nếu thấy không an toàn, hãy rời đi và tìm người lớn đáng tin cậy."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em muốn cùng người thân thống nhất một mục tiêu vừa sức",
      BranchTitle: "Thống nhất bước làm cụ thể vừa quỹ thời gian của em",
      Intro: "Thay vì hứa một mức điểm chưa chắc đạt ngay, em có thể cùng ba mẹ thống nhất một việc làm cụ thể và thời điểm hai bên cùng kiểm tra tiến bộ.",
      Question: "Điều gì đang khó thống nhất nhất giữa em và gia đình?",
      SubOptions: [
        { Index: 1, Text: "Gia đình muốn mức điểm cụ thể, em muốn đề nghị một bước kiểm tra được trước" },
        { Index: 2, Text: "Gia đình muốn em học nhiều giờ hơn nhưng lịch hiện tại đã chật" },
        { Index: 3, Text: "Gia đình chưa yên tâm nếu không thấy rõ sự cố gắng của em" }
      ],
      Solutions: [
        {
          Title: "1. Đề nghị một bước sửa bài cụ thể và hẹn ngày xem lại",
          Guide: "Ví dụ khi ba mẹ muốn “Lần sau phải được 8 điểm”:\n“Dạ, con hiểu ba muốn con tiến bộ. Lần này con hay mất điểm ở phần giải thích. Trước bài tới, con muốn dùng hai buổi để sửa hai câu và thử một câu mới. Tối thứ Sáu, con có thể cho ba xem câu con đã tự làm không ạ?”"
        },
        {
          Title: "2. Nói rõ quỹ thời gian thực tế thay vì từ chối chung chung",
          Guide: "Thay vì nói “Con không có thời gian”, hãy nêu thời gian thật và việc sẽ làm:\n“Tối nay con còn bài phải nộp nên chỉ có 25 phút để ôn. Con sẽ sửa đúng một bước trong câu đã sai và tự thử một câu. Xong con sẽ cho ba xem lại ạ.”"
        },
        {
          Title: "3. Chọn dấu hiệu tiến bộ nhìn thấy được",
          Guide: "Chọn một kết quả nhỏ hai bên cùng kiểm tra được: sửa xong 2 câu sai, tự làm 1 câu tương tự không nhìn mẫu, hoặc ghi lại đúng chỗ cần hỏi cô.\n\nNếu hai bên vẫn chưa thống nhất, em giữ phần kế hoạch vừa sức mình làm được và nhờ thầy cô cùng xem."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn biết nên sửa gì để lần sau làm bài tốt hơn",
      BranchTitle: "Chọn đúng 1 bước cần sửa trên chính bài kiểm tra của em",
      Intro: "Em có thể bắt đầu từ một câu trong bài kiểm tra vừa rồi để tìm ra chỗ mình đã làm được và bước cần sửa tiếp.",
      Question: "Khi xem một câu chưa làm đúng, em thường dừng ở bước nào?",
      SubOptions: [
        { Index: 1, Text: "Chưa rõ đề muốn gì hoặc chưa biết chọn thông tin nào" },
        { Index: 2, Text: "Có thông tin rồi nhưng chưa biết viết thành câu giải thích" },
        { Index: 3, Text: "Chưa hiểu dấu sửa hoặc không biết mình sai từ đâu" }
      ],
      Solutions: [
        {
          Title: "1. Luyện tách yêu cầu đề và đối chiếu thông tin",
          Guide: "• Nếu chưa rõ đề muốn gì: Gạch từ chỉ việc phải làm (so sánh, giải thích...) rồi nói lại đề bằng lời của mình.\n• Nếu chưa biết chọn thông tin: Đặt từng dữ kiện cạnh câu hỏi xem dữ kiện nào trả lời trực tiếp cho câu hỏi (ví dụ hỏi 'vì sao' thì tìm nguyên nhân, không phải mốc giờ)."
        },
        {
          Title: "2. Tập viết câu giải thích có căn cứ",
          Guide: "Nói trước bằng lời xem thông tin đã chọn dẫn tới kết quả thế nào, rồi viết thành 1 câu ngắn.\n\nKhi đã sửa được 1 câu, che mẫu và tự làm lại đúng bước đó để báo kết quả cụ thể với ba mẹ: “Con đã tự chọn được thông tin và đang tập viết câu giải thích rõ hơn ạ.”"
        },
        {
          Title: "3. Hỏi thầy cô đúng vị trí bị vướng",
          Guide: "Chọn một vị trí cụ thể để hỏi:\n“Thưa cô, em hiểu đến dòng này nhưng chưa biết vì sao bước sau bị sai. Cô có thể gợi ý giúp em cần sửa gì trước không ạ?”"
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa rõ mình cần gì, hoặc có nhiều điều cùng lúc",
      BranchTitle: "Nhìn lại một thời điểm cụ thể để chọn việc cần giúp trước",
      Intro: "Khi nhiều cảm xúc dồn lại cùng lúc, em chỉ cần nhìn lại một khoảnh khắc gần nhất (ví dụ lúc mở bài ra ôn sau khi nghe lời so sánh) để chọn đúng một việc.",
      Question: "Khi nghĩ đến bài kiểm tra tới, điều nào trở lại rõ nhất với em?",
      SubOptions: [
        { Index: 1, Text: "Nhớ lời so sánh của người thân nên buồn và khó đọc tiếp" },
        { Index: 2, Text: "Lo về mức điểm phải đạt nhưng chưa hiểu gia đình mong gì" },
        { Index: 3, Text: "Áp lực kéo dài ảnh hưởng đến giấc ngủ, đến lớp và sinh hoạt" }
      ],
      Solutions: [
        {
          Title: "1. Gỡ nút thắt đang làm em dừng lại trước",
          Guide: "• Nếu điều nặng nhất là lời so sánh: Xin được lắng nghe hoặc nghỉ một lát trước khi mở bài.\n• Nếu vừa mở bài ra sửa mà đầu vẫn nghĩ đến mức điểm: Tạm đặt bài xuống, chỉ chọn 1 việc nhẹ hơn hoặc đổi sang bước hỏi gia đình."
        },
        {
          Title: "2. Đổi cách linh hoạt khi nhận ra điều khác vướng hơn",
          Guide: "Em chỉ cần chọn 1 việc vừa sức ở thời điểm hiện tại. Nếu vừa thử mới thấy mình cần một việc khác, em hoàn toàn có quyền đổi lựa chọn."
        },
        {
          Title: "3. Tìm người hỗ trợ trực tiếp nếu áp lực kéo dài",
          Guide: "Nếu nỗi lo điểm số khiến em khó ngủ, khó tập trung hoặc gia đình tiếp tục gây áp lực nặng nề, hãy nói riêng với giáo viên chủ nhiệm hoặc người phụ trách tư vấn học đường:\n“Thưa cô, gần đây em lo chuyện điểm số đến mức khó ngủ và khó tập trung. Em muốn được nói riêng với cô ạ.”"
        }
      ]
    }
  ]
};

// 2. Tình huống 1.34: Khi em đã ôn nhưng vẫn chưa yên tâm trước bài kiểm tra
const p1_34 = {
  Id: "p1_34",
  Code: "1.34",
  FileName: "Khi em đã ôn nhưng vẫn chưa yên tâm trước bài kiểm tra.docx",
  Title: "Khi em đã ôn nhưng vẫn chưa yên tâm trước bài kiểm tra",
  RootQuestion: "Câu 1. Trong lần ôn gần nhất, việc nào khiến em chưa yên tâm nhất?",
  Intro: "Bài kiểm tra sắp đến. Em đã dành thời gian ôn, nhưng vẫn chưa yên tâm vì có vài chỗ còn phải xem lại vở mới trả lời được, hoặc lo gặp câu hỏi khác mẫu.\n\nCàng gần giờ kiểm tra, em có thể càng muốn mở vở xem lại cho chắc. Hãy chọn một câu ngắn, thử trả lời trước khi mở vở rồi đối chiếu để biết phần nào có thể yên tâm và chỗ nào đáng ôn thêm.",
  Options: [
    { Index: 1, Text: "Em đọc lại thấy quen, nhưng chưa biết mình nhớ được gì khi đóng vở" },
    { Index: 2, Text: "Em đã tự làm bài và biết mình hay mắc ở một bước, nhưng chưa sửa được" },
    { Index: 3, Text: "Em làm được câu giống mẫu, nhưng khi câu hỏi thay đổi thì chưa biết dùng" },
    { Index: 4, Text: "Em còn nhiều phần muốn ôn, chưa biết phần nào cần làm trước trong thời gian còn lại" },
    { Index: 5, Text: "Em đã tự làm được một số câu, nhưng cứ nghĩ đến lúc kiểm tra là lo mình sẽ quên" },
    { Index: 6, Text: "Em chưa rõ mình vướng ở đâu, hoặc có nhiều điều cùng lúc" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em đọc lại thấy quen, nhưng chưa biết mình nhớ được gì khi đóng vở",
      BranchTitle: "Tự kiểm tra trí nhớ khi đóng vở (Active Recall)",
      Intro: "Đọc lại vở dễ tạo cảm giác 'quen mắt' nhưng chưa chắc tự nhớ được khi vào phòng thi. Chỉ cần thử đóng vở trên một đoạn ngắn là em biết ngay mình nắm chắc đến đâu.",
      Question: "Lần gần nhất đóng vở, em tự nói hoặc viết được đến đâu?",
      SubOptions: [
        { Index: 1, Text: "Tự nói được ý chính nhưng thiếu một chi tiết" },
        { Index: 2, Text: "Mới nhớ vài từ khóa, chưa nói được ý trọn vẹn" },
        { Index: 3, Text: "Chưa thử trả lời khi đóng vở bao giờ" }
      ],
      Solutions: [
        {
          Title: "1. Chỉ xem lại đúng dòng chứa ý còn thiếu",
          Guide: "Đừng đọc lại cả trang. Hãy đánh dấu ý em tự nhớ được và ý còn thiếu, mở vở xem đúng dòng còn thiếu ấy, rồi che vở và thử nói lại trọn vẹn một lượt.\n\nVí dụ: “Em nhớ cần đọc đề và sửa bài, nhưng quên bước so bài với yêu cầu. Em sẽ xem lại đúng bước đó rồi thử nói đủ ba việc.”"
        },
        {
          Title: "2. Chia nhỏ thành từng câu đơn rồi ghép dần",
          Guide: "Nếu chưa nhớ được ý đầu tiên, đọc lại đúng 1 câu, che đi rồi nói bằng lời của mình. Khi đã nói trôi chảy câu 1, mới ghép thêm câu thứ 2."
        },
        {
          Title: "3. Thử ngay 1 đoạn ngắn 3 ý để kiểm tra",
          Guide: "Chọn 1 mục đang ôn, đọc 1 lượt, che tài liệu và viết/nói lại bằng lời của em rồi mở vở đối chiếu.\n\nNếu nhớ đủ nội dung nhưng vẫn chưa làm được bài tập vận dụng, chuyển sang nhánh 'Thử câu hỏi khác với câu đã luyện'."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em đã tự làm bài và biết mình hay mắc ở một bước, nhưng chưa sửa được",
      BranchTitle: "Gỡ đúng một bước hay mắc sai sót",
      Intro: "Thay vì ôn lại toàn bộ từ đầu, em chỉ cần xác định đúng bước đầu tiên mình bị dừng lại khi làm bài.",
      Question: "Khi xem lại một câu làm chưa đúng, em thường dừng ở bước nào?",
      SubOptions: [
        { Index: 1, Text: "Chưa rõ đề muốn mình làm gì" },
        { Index: 2, Text: "Hiểu đề nhưng chưa biết chọn thông tin nào" },
        { Index: 3, Text: "Có thông tin nhưng chưa viết được lời giải thích" }
      ],
      Solutions: [
        {
          Title: "1. Tách từ khóa hành động và tiêu chí của đề",
          Guide: "Tìm từ chỉ việc cần làm (so sánh, giải thích...) và cụm từ chỉ tiêu chí (thường nằm sau chữ 'về...').\n\nNói lại đề bằng một câu của riêng em rồi kiểm tra xem mình đã giữ đủ 2 phần đó chưa. Nếu chưa chắc, hỏi cô: “Thưa cô, em hiểu là đề muốn em so sánh hai cách về điểm này. Em hiểu vậy đúng chưa ạ?”"
        },
        {
          Title: "2. Đặt từng dữ kiện cạnh điều đề hỏi",
          Guide: "So từng thông tin với câu hỏi. Ví dụ: Đề hỏi 'vì sao nhóm chuẩn bị xong trước giờ trình bày?' -> Dữ kiện giờ có mặt chỉ cho biết thời gian, còn dữ kiện 'mỗi bạn chuẩn bị sẵn phần mình' mới giải thích được lý do."
        },
        {
          Title: "3. Tập câu nối giữa dữ kiện và kết quả",
          Guide: "Đừng chỉ chép lại dữ kiện. Hãy nói thành lời xem việc đó dẫn tới kết quả thế nào (ví dụ: “Nhờ đặt bản nháp cạnh đề, nhóm phát hiện ra yêu cầu nào còn thiếu”) rồi viết lại câu của em."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em làm được câu giống mẫu, nhưng khi câu hỏi thay đổi thì chưa biết dùng",
      BranchTitle: "Thử áp dụng kiến thức vào câu hỏi biến đổi khác mẫu",
      Intro: "Đặt câu mẫu và câu mới cạnh nhau giúp em thấy phần nào giữ nguyên và phần nào đã đổi yêu cầu.",
      Question: "Khi câu hỏi khác mẫu, em thường dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Thấy cách hỏi khác nên chưa nhận ra có thể dùng điều đã học" },
        { Index: 2, Text: "Nhận ra điều đã học nhưng chưa biết dùng dữ kiện mới thế nào" },
        { Index: 3, Text: "Đã thử làm nhưng chưa biết có đúng trọng tâm đề mới không" }
      ],
      Solutions: [
        {
          Title: "1. So sánh câu mẫu và câu mới để tìm phần thay đổi",
          Guide: "Kiểm tra xem việc cần làm (ví dụ đều là 'so sánh' hay 'giải thích') có giống nhau không, và tiêu chí mới là gì.\n\nVí dụ: Câu mẫu so sánh về 'thời gian', câu mới so sánh về 'cách chia việc'. Em vẫn dùng cách đối chiếu hai phương án, nhưng thay bằng dữ kiện về cách chia việc."
        },
        {
          Title: "2. Gạch chân cụm từ mới trước khi viết",
          Guide: "Nếu lỡ trả lời theo thói quen cũ của câu mẫu, hãy gạch chân cụm từ yêu cầu mới, nháp riêng ý của từng đối tượng theo đúng cụm từ đó rồi nối thành câu trả lời."
        },
        {
          Title: "3. Tự thử trước khi xem lời giải rồi đánh dấu điểm khác biệt",
          Guide: "Thử làm 1 câu khác mẫu trong phần đang ôn trước khi mở đáp án. Nếu còn mắc, khoanh đúng điểm khác nhau giữa câu mới và câu mẫu để hỏi thầy cô hoặc bạn."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em còn nhiều phần muốn ôn, chưa biết phần nào cần làm trước trong thời gian còn lại",
      BranchTitle: "Chọn phần ưu tiên vừa quỹ thời gian còn lại",
      Intro: "Khi thời gian có hạn, chọn đúng 1 phần trọng tâm để ôn kỹ và tự kiểm tra hiệu quả hơn nhiều so với việc lướt vội tất cả.",
      Question: "Trong thời gian còn lại, em muốn sắp xếp lượt ôn thế nào?",
      SubOptions: [
        { Index: 1, Text: "Tính khoảng thời gian thực sự còn có để xếp lượt ôn + lượt tự kiểm tra" },
        { Index: 2, Text: "Ưu tiên phần nằm trong phạm vi kiểm tra mà mình còn phải nhìn mẫu" },
        { Index: 3, Text: "Hỏi xác nhận phạm vi nếu chưa chắc phần nào sẽ thi" }
      ],
      Solutions: [
        {
          Title: "1. Nguyên tắc 2 phần: Thời gian sửa + Thời gian tự kiểm tra",
          Guide: "Xem lịch thật xem em có bao nhiêu phút (ví dụ 20-25 phút). Không xếp tràn kín.\n\nVí dụ: Dành 10-15 phút sửa đúng phần hay vướng, dành 5-10 phút đóng vở tự làm lại 1 câu và đối chiếu. Phần đọc thêm để sang lúc khác."
        },
        {
          Title: "2. Chọn phần bắt buộc còn yếu, không chép lại toàn bộ vở",
          Guide: "Phần đã tự làm được chỉ cần kiểm tra lướt nhanh. Dành thời gian cho phần nằm trong đề cương nhưng em vẫn phải nhìn mẫu. Không dành 20 phút cuối chỉ để chép lại toàn bộ ghi chú."
        },
        {
          Title: "3. Xác nhận phạm vi hoặc dừng đúng giờ gần sát thi",
          Guide: "Nếu chưa rõ phạm vi: “Thưa cô, em đã ôn hai phần này. Cô giúp em xác nhận phần nào nằm trong phạm vi kiểm tra được không ạ?”\n\nNếu đã quá sát giờ thi, chỉ xem lại 1 chỗ đã đánh dấu và chuẩn bị đồ dùng cần thiết rồi nghỉ ngơi."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em đã tự làm được một số câu, nhưng cứ nghĩ đến lúc kiểm tra là lo mình sẽ quên",
      BranchTitle: "Tách nỗi lo khỏi năng lực thực tế và chuẩn bị bước bắt đầu",
      Intro: "Lo lắng trước giờ thi là bình thường, ngay cả khi em đã ôn tốt. Em có thể vừa còn lo một chút, vừa thực hiện được các bước làm bài rõ ràng.",
      Question: "Lúc nghĩ đến bài kiểm tra, điều gì đang làm em lo nhất?",
      SubOptions: [
        { Index: 1, Text: "Lo vào phòng kiểm tra sẽ quên mất phải bắt đầu từ đâu" },
        { Index: 2, Text: "Lo gặp một câu khó rồi bị rối sang các câu khác" },
        { Index: 3, Text: "Căng thẳng đến mức muốn mở vở xem lại liên tục hoặc cần nghỉ" }
      ],
      Solutions: [
        {
          Title: "1. Tách 'điều đã làm được' khỏi 'điều đang lo'",
          Guide: "Tự nhắc một câu dựa trên thực tế: “Em đã tự làm đúng hai câu. Nếu vào phòng thi đọc một câu mà chưa nhớ ngay, em sẽ đọc lại yêu cầu và ghi từ khóa mình nhớ.”"
        },
        {
          Title: "2. Chuẩn bị sẵn kịch bản 'kẹt câu khó'",
          Guide: "Nếu bài kiểm tra cho phép làm theo thứ tự tự chọn: đánh dấu câu đang vướng, chuyển sang làm câu nắm chắc hơn trước rồi quay lại sau để giữ nhịp bình tĩnh."
        },
        {
          Title: "3. Hạ nhiệt nhanh khi thấy quá căng",
          Guide: "Đặt bài xuống, đặt hai bàn chân chạm sàn, hít thở chậm và để ý cảm giác chân chạm sàn. Không ép mình phải hết lo 100% mới làm bài; chỉ cần chọn 1 bước nhỏ đầu tiên.\n\nNếu nỗi lo ảnh hưởng đến giấc ngủ, đến lớp, hãy nói chuyện riêng với thầy cô hoặc người lớn tin cậy."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa rõ mình vướng ở đâu, hoặc có nhiều điều cùng lúc",
      BranchTitle: "Kiểm tra nhanh 1 câu ngắn để tìm đúng chỗ dừng",
      Intro: "Thay vì mở lại toàn bộ tài liệu, em chỉ cần thử 1 câu ngắn để xem mình dừng lại ở khâu nào.",
      Question: "Khi thử làm một câu em đã ôn, em thường dừng ở thời điểm nào?",
      SubOptions: [
        { Index: 1, Text: "Đóng vở lại là chưa nhớ được ý đầu tiên" },
        { Index: 2, Text: "Nhớ ý nhưng mắc ở một bước viết/chọn dữ kiện hoặc khi đề đổi mẫu" },
        { Index: 3, Text: "Vẫn chưa xác định được và muốn nhờ thầy cô chỉ giúp bước nên luyện" }
      ],
      Solutions: [
        {
          Title: "1. Chẩn đoán nhanh điểm dừng trên 1 câu",
          Guide: "• Đóng vở quên ngay -> Chọn nhánh 1 (Tự kiểm tra khi đóng vở).\n• Bắt đầu được nhưng tắc giữa chừng -> Chọn nhánh 2 (Sửa đúng 1 bước hay mắc).\n• Câu quen làm được, câu lạ tắc -> Chọn nhánh 3 (Thử câu hỏi khác mẫu)."
        },
        {
          Title: "2. Đặt đề cạnh nháp để tìm chỗ thiếu",
          Guide: "So phần mình đã viết với từng yêu cầu của đề. Khoanh đúng yêu cầu nào chưa làm được để chỉ ôn lại đúng chỗ đó, không học lại từ đầu."
        },
        {
          Title: "3. Nhờ thầy cô chỉ giúp bước ưu tiên",
          Guide: "Giữ câu em bị dừng và hỏi:\n“Thưa cô, em đã ôn phần này nhưng khi tự làm vẫn dừng ở đây. Cô có thể giúp em xác định bước nên luyện trước không ạ?”"
        }
      ]
    }
  ]
};

// 3. Tình huống 1.35: Khi điểm kiểm tra khiến em mất tự tin và ngại phát biểu
const p1_35 = {
  Id: "p1_35",
  Code: "1.35",
  FileName: "Khi điểm kiểm tra khiến em mất tự tin và ngại phát biểu.docx",
  Title: "Khi điểm kiểm tra khiến em mất tự tin và ngại phát biểu",
  RootQuestion: "Câu 1. Sau khi nhận bài kiểm tra, em muốn được giúp việc gì trước?",
  Intro: "Khi thầy cô trả bài, em thấy điểm của mình thấp hơn mong đợi và thua bạn khác. Em buồn, nghi ngờ khả năng của bản thân, đến lúc thảo luận bài mới dù đã nghĩ ra cách làm nhưng vẫn im lặng vì sợ nói sai.\n\nEm chưa cần ép mình phát biểu ngay trước cả lớp. Em có thể bắt đầu từ việc xem lại một câu, thử nói với một bạn tin cậy, hoặc chọn cách tham gia vừa sức.",
  Options: [
    { Index: 1, Text: "Em muốn tin hơn vào khả năng học của mình" },
    { Index: 2, Text: "Em muốn biết cụ thể mình cần sửa gì trên bài" },
    { Index: 3, Text: "Em muốn góp ý vào bài học nhưng sợ nói sai" },
    { Index: 4, Text: "Em muốn biết nên làm gì khi bạn đã bình luận hoặc trêu về điểm của em" },
    { Index: 5, Text: "Em chưa rõ mình cần gì, hoặc có nhiều điều cùng lúc" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn tin hơn vào khả năng học của mình",
      BranchTitle: "Tách một điểm số chưa như ý khỏi toàn bộ khả năng của em",
      Intro: "Một bài kiểm tra điểm thấp không có nghĩa là em học kém hay câu nào em nghĩ ra cũng sai. Hãy nhìn vào chi tiết cụ thể trên bài để thấy những gì em đã làm được.",
      Question: "Khi nhớ lại điểm bài kiểm tra, câu nào em hay tự nói với mình nhất?",
      SubOptions: [
        { Index: 1, Text: "“Bạn được điểm cao hơn, chắc mình học kém và khó tiến bộ.”" },
        { Index: 2, Text: "“Câu này sai thì chắc những ý mình nghĩ ra sau này cũng sai.”" },
        { Index: 3, Text: "Muốn tìm lại một bước cụ thể mình đã làm được trên bài" }
      ],
      Solutions: [
        {
          Title: "1. Tách 'sự việc đã xảy ra' khỏi 'suy nghĩ tự chê mình'",
          Guide: "• Sự việc: “Bài của em được 6 điểm, bài bạn được 8 điểm.”\n• Suy nghĩ lo lắng: “Mình sẽ chẳng bao giờ làm tốt hơn.”\n\nHãy nhìn thẳng vào bài: xem ở câu làm chưa trọn vẹn, em đã làm đúng được đến bước nào (ví dụ: đã chọn đúng dữ kiện, chỉ thiếu câu giải thích)."
        },
        {
          Title: "2. Chọn 1 bước nhỏ để tự kiểm chứng khả năng ngay lúc này",
          Guide: "Thay vì nói chung chung “Mình phải cố hơn”, hãy nói sát với bài làm:\n“Em đã chọn được thông tin cần dùng ở câu 3. Em sẽ thử viết thêm một câu giải thích rồi đối chiếu với đề.”"
        },
        {
          Title: "3. Che mẫu làm lại 1 bước để lấy lại cảm giác làm chủ",
          Guide: "Khi em tự sửa và che mẫu làm lại đúng 1 bước ấy, hãy ghi nhận kết quả đó cho bản thân. Không cần vội tin ngay vào tất cả, cứ giữ một bước làm được làm điểm tựa cho lần học tới."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn biết cụ thể mình cần sửa gì trên bài",
      BranchTitle: "Tìm đúng chỗ cần sửa thay vì thấy sai toàn bộ",
      Intro: "Nhìn vào điểm số tổng dễ thấy nản, nhưng khi tách từng câu ra, thường em chỉ vướng ở một bước cụ thể.",
      Question: "Ở một câu em muốn xem lại, em dừng ở chỗ nào?",
      SubOptions: [
        { Index: 1, Text: "Chưa hiểu đề yêu cầu gì hoặc chưa biết chọn thông tin nào" },
        { Index: 2, Text: "Đã có thông tin nhưng chưa biết viết thành lời giải thích" },
        { Index: 3, Text: "Chưa hiểu dấu sửa hoặc lời nhận xét của thầy cô trên bài" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra bước hiểu đề và lọc dữ kiện",
          Guide: "• Gạch từ chỉ hành động (so sánh, giải thích...) và nói lại yêu cầu đề bằng 1 câu.\n• Đặt từng thông tin cạnh câu hỏi để kiểm tra xem thông tin đó trả lời đúng câu hỏi hay chỉ nêu chi tiết phụ (như mốc giờ)."
        },
        {
          Title: "2. Nối dữ kiện với kết quả thành 1 câu giải thích",
          Guide: "Thử nói thành lời xem dữ kiện đã chọn dẫn tới kết quả thế nào, rồi viết lại câu đó và đối chiếu với đề. Nếu vẫn vướng, đánh dấu đúng chỗ chưa nối được để hỏi."
        },
        {
          Title: "3. Hỏi đúng 1 dấu sửa hoặc nhận xét chưa rõ",
          Guide: "Cách mở lời lịch sự và rõ ý:\n“Thưa cô, em đã chọn được thông tin cho câu 3 nhưng chưa hiểu nhận xét ‘thiếu căn cứ’. Cô có thể chỉ giúp em dòng nào cần bổ sung để em tự sửa được không ạ?”\n\nNếu cô bận, xin hẹn lại đầu giờ hôm sau và đánh dấu sẵn câu muốn hỏi."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em muốn góp ý vào bài học nhưng sợ nói sai",
      BranchTitle: "Tham gia đóng góp ý kiến theo cách vừa sức và an toàn",
      Intro: "Em không cần phải giơ tay nói ngay trước cả lớp nếu đang ngại. Có nhiều cách để ý tưởng của em được lắng nghe nhẹ nhàng hơn.",
      Question: "Em muốn bắt đầu bằng cách tham gia nào?",
      SubOptions: [
        { Index: 1, Text: "Viết một câu nháp ra giấy hoặc gửi qua kênh thầy cô cho phép" },
        { Index: 2, Text: "Thử nói với một bạn thân hoặc trong nhóm nhỏ trước" },
        { Index: 3, Text: "Nói một ý ngắn trước lớp khi đã chuẩn bị sẵn câu" }
      ],
      Solutions: [
        {
          Title: "1. Viết ra nháp để nhìn rõ ý mình đã nghĩ được",
          Guide: "Ghi 1 câu gồm ý kiến + lý do ngắn (ví dụ: “Em nghĩ tiêu đề giúp người đọc tìm đúng phần”). Nếu hôm nay chưa muốn nói thành lời, em giữ bản nháp hoặc gửi riêng cho cô khi được phép."
        },
        {
          Title: "2. Thử chia sẻ với 1 người em thấy thoải mái",
          Guide: "Đưa bản nháp hoặc nói nhỏ với bạn bên cạnh. Nếu bạn có ý khác, em có thể hỏi nhẹ: “Bạn dựa vào chỗ nào trong đề để chọn vậy?” để cùng trao đổi thay vì tự thu mình lại."
        },
        {
          Title: "3. Mẫu câu chia sẻ ngắn, mở đường cho góp ý nhẹ nhàng",
          Guide: "Em chỉ cần nói phần mình chắc rồi mở lời hỏi thêm:\n“Em nghĩ dữ kiện thứ hai giúp trả lời câu hỏi vì nó nói lý do. Em chưa chắc phần giải thích phía sau, cô xem giúp em được không ạ?”\n\nNếu thầy cô chỉ ra chỗ sai: “Dạ, em hiểu chỗ cần xem lại rồi ạ. Em thử nói lại ý này được không ạ?”"
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em muốn biết nên làm gì khi bạn đã bình luận hoặc trêu về điểm của em",
      BranchTitle: "Đặt giới hạn an toàn trước lời trêu chọc của bạn",
      Intro: "Nếu có người đem điểm hoặc câu trả lời của em ra nhận xét, em có quyền thấy khó chịu, đặt giới hạn rõ ràng và tìm người hỗ trợ bất cứ lúc nào.",
      Question: "Lúc này, em muốn được giúp việc gì trước?",
      SubOptions: [
        { Index: 1, Text: "Nói rõ giới hạn để bạn dừng việc nhắc điểm hoặc trêu chọc" },
        { Index: 2, Text: "Gặp riêng thầy cô để được bảo vệ nếu việc lặp lại hoặc bị đưa lên nhóm lớp" },
        { Index: 3, Text: "Xin thầy cô nghe em kể riêng trước khi quyết định bước tiếp theo" }
      ],
      Solutions: [
        {
          Title: "1. Nói ngắn gọn và dứt khoát giới hạn của em",
          Guide: "Nếu thấy an toàn khi đáp lời trực tiếp:\n“Mình không muốn bạn nhắc điểm của mình trước nhóm. Bạn dừng lại nhé.”\n\nNếu bạn nói “Mình đùa thôi”: “Mình thấy khó chịu khi bạn nói vậy. Mình muốn bạn dừng.” Nếu bạn tiếp tục, hãy rời cuộc trò chuyện và tìm người hỗ trợ."
        },
        {
          Title: "2. Bảo vệ quyền riêng tư trong nhóm chat hoặc trước lớp",
          Guide: "Nếu bị hỏi điểm trong nhóm chat, em có quyền không trả lời hoặc nhắn riêng nhờ thầy cô hỗ trợ.\n\nNếu thấy không thoải mái nói trước cả lớp, em có thể xin cô gửi ý kiến bằng giấy hoặc tin nhắn riêng trong thời gian này."
        },
        {
          Title: "3. Xin gặp riêng giáo viên chủ nhiệm hoặc tư vấn học đường",
          Guide: "“Thưa cô, sau khi trả bài, có bạn nhiều lần nhắc điểm của em trước nhóm khiến em rất ngại tham gia bài học. Em muốn xin gặp riêng cô để cô giúp em tìm cách xử lý ạ.”\n\nNếu thầy cô lỡ hỏi trước lớp, em đáp: “Dạ, em muốn trao đổi riêng ạ.”"
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em chưa rõ mình cần gì, hoặc có nhiều điều cùng lúc",
      BranchTitle: "Nhìn lại khoảnh khắc trước khi im lặng để gỡ từng nút",
      Intro: "Khi nhiều cảm giác cùng ập tới sau giờ trả bài, hãy nhớ lại đúng khoảnh khắc em định lên tiếng rồi lại thôi để chọn 1 việc thử trước.",
      Question: "Ngay trước lúc quyết định im lặng, em nhớ điều gì rõ nhất?",
      SubOptions: [
        { Index: 1, Text: "Chưa chắc câu trả lời của mình có đúng không" },
        { Index: 2, Text: "Đã có ý đúng nhưng ngại nói trước đám đông" },
        { Index: 3, Text: "Vẫn nặng lòng về điểm số hoặc lời bạn từng trêu" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra lại ý kiến của mình với đề",
          Guide: "Nếu điều em băn khoăn là cách làm, hãy đối chiếu ý em viết trong vở với yêu cầu của đề hoặc xin cô một gợi ý ngắn."
        },
        {
          Title: "2. Chọn kênh chia sẻ ít áp lực hơn",
          Guide: "Nếu đã có ý và chỉ ngại nói trước cả lớp, thử viết thành 1 câu hoàn chỉnh rồi chia sẻ với 1 bạn trong nhóm trước, không ép mình phát biểu lớn ngay."
        },
        {
          Title: "3. Gỡ nỗi lo điểm số hoặc tìm thầy cô nếu ảnh hưởng kéo dài",
          Guide: "Xem lại 1 bước nhỏ trong bài kiểm tra để thấy mình đã làm được gì.\n\nNếu sự ngại ngùng kéo dài khiến em sợ đến lớp hoặc không dám tham gia bài học, hãy tìm gặp riêng giáo viên chủ nhiệm hoặc người phụ trách tư vấn học đường."
        }
      ]
    }
  ]
};

problems.push(p1_33, p1_34, p1_35);

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('New total problems:', problems.length);
console.log('Added 1.33, 1.34, 1.35 successfully!');
