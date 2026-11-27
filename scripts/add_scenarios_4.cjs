const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
let raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
let problems = JSON.parse(raw);

console.log('Current count:', problems.length);

// 1. Tình huống 1.29: Khi em đã thử nhiều lần và thấy nản
const p1_29 = {
  Id: "p1_29",
  Code: "1.29",
  FileName: "Khi em đã thử nhiều lần và thấy nản.docx",
  Title: "Khi em đã thử nhiều lần và thấy nản",
  RootQuestion: "Câu 1. Lúc này, em muốn được giúp điều gì trước?",
  Intro: "Em đã thử làm một bài khó vài lần nhưng vẫn chưa giải được. Em biết mình có thể làm gì tiếp theo, nhưng vì đã thử nhiều lần mà chưa có kết quả nên em thấy nản và không muốn thử thêm. Phần em đã làm vẫn có thể giúp em tìm ra chỗ để bắt đầu lại.",
  Options: [
    { Index: 1, Text: "Em biết cách làm bước tiếp theo, nhưng thấy nản và khó bắt đầu lại" },
    { Index: 2, Text: "Em biết mình cần làm bước nào, nhưng chưa rõ cách thực hiện" },
    { Index: 3, Text: "Em sợ thử lại vẫn sai, vì mấy lần trước đều chưa có kết quả" },
    { Index: 4, Text: "Em đã mệt và khó tập trung, nên muốn nghỉ trước" },
    { Index: 5, Text: "Em muốn có người cùng xem chỗ em mắc, nhưng chưa biết hỏi ai hoặc hỏi thế nào" },
    { Index: 6, Text: "Em chưa biết mình đang vướng ở đâu và muốn tìm hiểu thêm" },
    { Index: 7, Text: "Em muốn dừng lúc này để cất bài và quay lại khi thấy sẵn sàng" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em biết cách làm bước tiếp theo, nhưng thấy nản và khó bắt đầu lại",
      BranchTitle: "Bắt đầu lại từ một việc nhỏ ngay sau phần đã làm được",
      Intro: "Có lúc em biết phải làm gì mà vẫn thấy khó đặt bút xuống. Sau mấy lần thử, nghĩ đến chuyện làm hết bài có thể khiến em thấy ngại.",
      Question: "Em muốn chọn cách nào để bắt đầu lại nhẹ nhàng?",
      SubOptions: [
        { Index: 1, Text: "Chọn một việc thật nhỏ có điểm dừng rõ ràng (3 phút)" },
        { Index: 2, Text: "Xác định dấu hiệu hoàn thành cho bước tiếp theo" },
        { Index: 3, Text: "Khoanh chỗ chưa biết cách làm để hỏi gợi ý bước đầu" }
      ],
      Solutions: [
        {
          Title: "1. Chọn một việc vừa sức với động từ cụ thể",
          Guide: "Viết việc em định làm bằng một động từ cụ thể, như gạch, ghi, đối chiếu hoặc thử. Chọn việc có điểm dừng rõ ràng.\n\nVí dụ: “Đối chiếu dòng cuối với yêu cầu của đề” dễ bắt đầu hơn “Làm tiếp cho xong bài”.\n\nĐặt thời gian ngắn khoảng 3 phút, xong việc đó là dừng lại xem mình đã tiến thêm ở đâu."
        },
        {
          Title: "2. Xác định rõ dấu hiệu hoàn thành trên bài",
          Guide: "Thay vì nghĩ “Em sẽ cố thêm”, hãy nói rõ: “Em sẽ ghi một dòng giải thích vì sao thông tin này có ích”.\n\nNếu bắt đầu được nhưng việc vẫn quá lớn, giữ phần vừa làm và thu nhỏ tiếp (ví dụ: từ 'giải thích cả ý' thành 'ghi 1 lý do')."
        },
        {
          Title: "3. Đánh dấu chỗ vướng để hỏi bước đầu tiên",
          Guide: "Nếu đã thử mà nhận ra mình chưa biết cách làm ở một chỗ, khoanh chỗ đó lại và hỏi:\n“Thưa cô, em làm được đến đây. Cô có thể gợi ý giúp em thao tác đầu tiên ở chỗ này được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em biết mình cần làm bước nào, nhưng chưa rõ cách thực hiện",
      BranchTitle: "Tìm thao tác đầu tiên bị vướng ở bước tiếp theo",
      Intro: "Có thể em đã nhìn ra hướng làm rồi, chỉ còn một chỗ chưa biết đặt bút thế nào. Hãy nhìn từ dòng cuối mình còn hiểu.",
      Question: "Em đang dừng ở điểm nào khi chuẩn bị thực hiện?",
      SubOptions: [
        { Index: 1, Text: "Phân vân giữa các thông tin chưa biết chọn thông tin nào" },
        { Index: 2, Text: "Chưa biết thao tác làm tiếp theo như thế nào" },
        { Index: 3, Text: "Chỉ làm được khi nhìn bài mẫu, che mẫu lại là vướng" }
      ],
      Solutions: [
        {
          Title: "1. Đối chiếu từng thông tin với yêu cầu của đề",
          Guide: "Đọc lại đúng từ khóa đề hỏi (ví dụ: 'nêu lý do' hay 'nêu thời gian'). Thử nói xem mỗi thông tin giúp trả lời phần nào.\n\nNếu vẫn phân vân, hỏi thầy cô: “Thưa thầy, em đã làm đến đây. Em chưa biết dựa vào đâu để chọn giữa hai thông tin này. Thầy gợi ý cho em một dấu hiệu để tự chọn được không ạ?”."
        },
        {
          Title: "2. Đối chiếu cạnh một ví dụ tương tự",
          Guide: "Đặt bài của mình cạnh một ví dụ tương tự. Che phần làm tiếp của ví dụ, thử tự làm 1 thao tác trên bài của em rồi mở lại đối chiếu.\n\nNếu vẫn chưa rõ, đánh dấu đúng dòng đó để đi hỏi."
        },
        {
          Title: "3. Giảm dần sự phụ thuộc vào bài mẫu",
          Guide: "Nếu chỉ làm được khi nhìn mẫu, em xem lại đúng thao tác còn vướng. Khi sẵn sàng, che mẫu và thử lại đúng bước ấy.\n\nNếu vẫn mắc, hỏi vì sao thao tác đó phù hợp với bài của em."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em sợ thử lại vẫn sai, vì mấy lần trước đều chưa có kết quả",
      BranchTitle: "Thử một thay đổi nhỏ trên bản nháp cũ",
      Intro: "Sau vài lần làm mà kết quả chưa như mong, em ngại thử thêm cũng dễ hiểu. Em giữ lại bài nháp và chỉ thử đổi một chỗ em chưa chắc.",
      Question: "Em muốn kiểm tra điều gì trong lần thử này?",
      SubOptions: [
        { Index: 1, Text: "Giữ bài cũ và thử đổi riêng một chỗ nghi ngờ" },
        { Index: 2, Text: "Loại bỏ thông tin chưa trả lời đúng yêu cầu của đề" },
        { Index: 3, Text: "Đã thử 2 cách đều mắc tại cùng một chỗ" }
      ],
      Solutions: [
        {
          Title: "1. Giữ dấu vết cũ và đổi một yếu tố",
          Guide: "Đánh dấu chỗ nghi ngờ, giữ nguyên phần còn lại và chỉ thử đổi cách chọn thông tin hoặc phép tính ở chỗ đó.\n\nThay vì đòi hỏi “xem lần này có đúng hết không”, chỉ cần kiểm tra: “Thông tin em chọn có trả lời đúng điều đề hỏi không?”."
        },
        {
          Title: "2. Gạch cụm từ đề cần để lọc nháp",
          Guide: "Gạch chân cụm từ chỉ điều đề cần, đọc lại dòng mới viết để xem nó trả lời được phần nào.\n\nDù chưa giải xong, việc loại được một cách chưa phù hợp đã là một tiến bộ rất giá trị."
        },
        {
          Title: "3. Mang cả hai cách đã thử đi hỏi",
          Guide: "Nếu vẫn mắc ở cùng một chỗ, đặt bài xuống. Khi sẵn sàng, mang cả phần đã thử đi hỏi:\n“Thưa cô, em đã thử hai cách ở bước này nhưng đều mắc tại đây. Cô giúp em xem em nên kiểm tra điều gì trước được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em đã mệt và khó tập trung, nên muốn nghỉ trước",
      BranchTitle: "Đánh dấu chỗ dừng để nghỉ ngơi đúng cách",
      Intro: "Nếu em đã cố một lúc lâu mà đọc đi đọc lại vẫn rối, hãy cho phép mình nghỉ ngơi và để lại một dấu nhắc nhỏ.",
      Question: "Tình trạng mệt mỏi của em lúc này thế nào?",
      SubOptions: [
        { Index: 1, Text: "Cần nghỉ một lúc rồi quay lại làm tiếp" },
        { Index: 2, Text: "Đã nghỉ nhưng vẫn quá mệt và bài sắp đến hạn" },
        { Index: 3, Text: "Thường xuyên mệt mỏi kéo dài ảnh hưởng giấc ngủ/sinh hoạt" }
      ],
      Solutions: [
        {
          Title: "1. Ghi dấu nhắc trước khi nghỉ",
          Guide: "Đánh dấu dòng đang xem và ghi 1 dòng nhắc: “Khi quay lại, đọc yêu cầu rồi đối chiếu với dòng này”.\n\nSau đó đứng lên, uống nước hoặc nghỉ ngơi. Khi mở vở lại, nhìn ngay vào dấu nhắc đó để không mất sức tìm lại từ đầu."
        },
        {
          Title: "2. Xin ưu tiên phần quan trọng nếu bài gần hạn",
          Guide: "Nếu vẫn khó tập trung khi bài sắp đến hạn, em báo với thầy cô:\n“Thưa cô, em đã làm đến phần … nhưng hiện em khó tập trung để làm tiếp. Cô cho em hỏi phần nào em nên ưu tiên hoàn thành trước ạ?”."
        },
        {
          Title: "3. Chia sẻ khi tình trạng mệt mỏi kéo dài",
          Guide: "Nếu việc mệt và khó tập trung diễn ra thường xuyên làm em khó ngủ hoặc khó sinh hoạt, hãy trao đổi với giáo viên chủ nhiệm, tư vấn học đường hoặc người lớn tin cậy:\n“Dạo gần đây em hay mệt đến mức khó học tiếp. Em muốn có người cùng em xem lại việc học và thời gian nghỉ ạ.”."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn có người cùng xem chỗ em mắc, nhưng chưa biết hỏi ai hoặc hỏi thế nào",
      BranchTitle: "Nhờ người cùng xem đúng chỗ đang vướng",
      Intro: "Có lúc chỉ cần một người cùng nhìn vào dòng em đang vướng là em đã dễ nghĩ tiếp hơn. Em có thể đưa phần đã làm và nói câu ngắn.",
      Question: "Em muốn chuẩn bị cách hỏi hay xử lý phản hồi của người nghe?",
      SubOptions: [
        { Index: 1, Text: "Chuẩn bị câu mở lời ngắn chỉ đúng 1 chỗ vướng" },
        { Index: 2, Text: "Người em hỏi bận hoặc chỉ đưa đáp án mà không giải thích" },
        { Index: 3, Text: "Đã nghe gợi ý nhưng vẫn chưa tự làm được" }
      ],
      Solutions: [
        {
          Title: "1. Công thức 3 ý khi mở lời nhờ giúp",
          Guide: "Nói em đã làm đến đâu, chỉ chỗ vướng và xin 1 gợi ý nhỏ:\n- Với cô: “Thưa cô, em đã làm đến dòng này và thử hai cách. Khi thuận tiện, cô cho em một gợi ý để em tự sửa được không ạ?”\n- Với bạn: “Bạn xem giúp mình dòng này được không? Mình muốn hiểu cách chọn để tự làm tiếp”."
        },
        {
          Title: "2. Đề nghị gợi ý bước đầu thay vì nhận đáp án chép",
          Guide: "Nếu người hỏi chỉ đưa đáp án, em nói: “Dạ em cảm ơn cô. Cô gợi ý giúp em cách làm bước đầu để em tự thử được không ạ?”.\n\nNếu thầy cô đang bận, xin hẹn lại: “Thưa thầy, em có thể gặp thầy sau tiết học ngày mai để hỏi một bước trong bài được không ạ?”."
        },
        {
          Title: "3. Hỏi lại đúng một thao tác còn thiếu",
          Guide: "Khi nghe rồi nhưng vẫn chưa tự làm được, em chỉ phần đã hiểu và hỏi thêm đúng một thao tác còn vướng, sau đó tự làm lại ngay thao tác ấy."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em chưa biết mình đang vướng ở đâu và muốn tìm hiểu thêm",
      BranchTitle: "Tìm lại điểm bắt đầu khi chưa biết vướng ở đâu",
      Intro: "Khi muốn nhìn lại, em chỉ cần tìm chỗ cuối cùng mình còn hiểu. Ngay sau chỗ đó thường là điều em cần làm rõ.",
      Question: "Sau khi nhìn lại chỗ cuối còn hiểu, em thấy mình cần gì?",
      SubOptions: [
        { Index: 1, Text: "Thử nói cách làm cho dòng ngay sau chỗ đã hiểu" },
        { Index: 2, Text: "Tìm ra chỗ vướng và muốn đặt câu hỏi cho thầy cô" },
        { Index: 3, Text: "Vẫn chưa tìm ra chỗ mắc và cần người rà cùng" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra bằng một thao tác rất nhỏ",
          Guide: "Nhìn dòng ngay sau chỗ đã đánh dấu và thử nói mình sẽ làm gì ở dòng đó.\n\nNếu nói được cách làm, thử thực hiện 1 thao tác nhỏ. Nếu chưa nói được, em đã tìm đúng chỗ cần hỏi!"
        },
        {
          Title: "2. Đặt câu hỏi ngay từ điểm dừng",
          Guide: "Đánh dấu chỗ mắc và hỏi:\n“Thưa cô, em hiểu đến đây. Cô giúp em tìm xem em nên bắt đầu lại từ đâu được không ạ?”."
        },
        {
          Title: "3. Nhờ người tin tưởng cùng rà lại bài",
          Guide: "Đưa phần bài đã làm cho thầy cô hoặc bạn tin cậy và nói:\n“Thưa cô, em đã thử vài cách rồi mà vẫn chưa biết vướng ở đâu. Cô cùng em xem dòng cuối em làm được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em muốn dừng lúc này để cất bài và quay lại khi thấy sẵn sàng",
      BranchTitle: "Tạm dừng an toàn và giữ mốc quay lại",
      Intro: "Em hoàn toàn có quyền cất bài và nghỉ ngơi khi đã bỏ nhiều công sức mà chưa giải được.",
      Question: "Em muốn kết thúc phiên này theo cách nào?",
      SubOptions: [
        { Index: 1, Text: "Đánh dấu lại chỗ đang làm rồi cất bài nghỉ ngơi" },
        { Index: 2, Text: "Cần hỗ trợ thêm vì cảm giác nản kéo dài nhiều ngày" }
      ],
      Solutions: [
        {
          Title: "1. Cất bài và ghi nhớ phần đã làm được",
          Guide: "Phần em đã làm không hề vô ích. Đánh dấu chỗ cuối cùng đã làm để khi quay lại mở vở là thấy ngay.\n\nNghỉ ngơi thư giãn, uống nước và quay lại khi tâm trí thoải mái hơn."
        },
        {
          Title: "2. Tìm hỗ trợ khi cảm giác chán nản kéo dài",
          Guide: "Nếu cảm giác nản kéo dài ảnh hưởng đến nhiều môn học, giấc ngủ hoặc sinh hoạt, hãy chia sẻ với giáo viên chủ nhiệm, cán bộ tư vấn học đường hoặc gia đình để được đồng hành."
        }
      ]
    }
  ]
};

// 2. Tình huống 1.26: Khi em vẫn làm xong bài nhưng thấy ít hào hứng hơn trước
const p1_26 = {
  Id: "p1_26",
  Code: "1.26",
  FileName: "Khi em vẫn làm xong bài nhưng thấy ít hào hứng hơn trước.docx",
  Title: "Khi em vẫn làm xong bài nhưng thấy ít hào hứng hơn trước",
  RootQuestion: "Câu 1. Trong lần gần nhất em chỉ muốn làm bài cho xong, em nhận thấy điều gì rõ nhất?",
  Intro: "Sau nhiều ngày ôn tập liên tục, em vẫn làm xong các bài được giao, nhưng thấy ít hào hứng hơn trước và thường chỉ muốn làm cho xong. Em có thể nhớ lại một buổi ôn gần đây, xem lúc nào việc học bắt đầu thấy nặng hơn rồi chọn một điều muốn thử.",
  Options: [
    { Index: 1, Text: "Em bắt đầu thấy ngán sau khi đã ôn khá lâu và khó tập trung" },
    { Index: 2, Text: "Em vẫn tập trung được, nhưng thấy ngán khi đọc lại hoặc làm cùng một kiểu bài nhiều lần" },
    { Index: 3, Text: "Em đang học mà cứ nghĩ đến số bài còn lại hoặc hạn phải nộp" },
    { Index: 4, Text: "Sau khi làm sai hoặc quên một ý, em nghĩ nhiều đến điểm số hoặc tự trách mình" },
    { Index: 5, Text: "Em bắt đầu muốn làm cho xong từ một phần mình chưa hiểu rõ" },
    { Index: 6, Text: "Gần đây em chủ yếu ôn một mình và muốn có người cùng học, lắng nghe hoặc xem lại lịch ôn" },
    { Index: 7, Text: "Em ít muốn làm cả những việc ngoài học tập trước đây em thích, hoặc ngủ/sinh hoạt thay đổi" },
    { Index: 8, Text: "Em chưa rõ điều gì đã thay đổi hoặc thấy nhiều chuyện xảy ra cùng lúc" },
    { Index: 9, Text: "Em muốn dừng lúc này" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em bắt đầu thấy ngán sau khi đã ôn khá lâu và khó tập trung",
      BranchTitle: "Xử lý mệt mỏi và ngán sau thời gian ôn lâu",
      Intro: "Khi học lâu, sự tập trung giảm sút là phản ứng tự nhiên của não bộ.",
      Question: "Khi nào em bắt đầu thấy khó tập trung?",
      SubOptions: [
        { Index: 1, Text: "Sau khi đã học liên tục một lúc lâu" },
        { Index: 2, Text: "Ngay từ đầu buổi dù vừa mới nghỉ" },
        { Index: 3, Text: "Mỗi lần gặp đúng một đoạn khó hoặc rắc rối" }
      ],
      Solutions: [
        {
          Title: "1. Nghỉ ngắn và để lại dấu nhắc cụ thể",
          Guide: "Trước khi nghỉ, đánh dấu chỗ đang làm và ghi 1 việc rất ngắn cho lúc quay lại, ví dụ: “Mở đoạn 3, đọc một lượt và nói đoạn này nói về điều gì”.\n\nNếu quá mệt để ghi, chỉ cần gấp sách lại nghỉ ngơi."
        },
        {
          Title: "2. Giảm khối lượng định làm và sắp xếp lại lịch",
          Guide: "Nếu vừa nghỉ mà vẫn mệt ngay từ đầu buổi, hãy giảm lượng bài định làm trong buổi đó.\n\nNếu bài gần hạn, hỏi thầy cô: “Thưa cô, em đã làm đến phần này. Cô giúp em xác định việc nào cần hoàn thành trước được không ạ?”."
        },
        {
          Title: "3. Gỡ đúng đoạn gây chán nản",
          Guide: "Nếu các phần khác em vẫn theo được mà chỉ nản từ một đoạn khó, hãy đánh dấu đúng câu đầu tiên của đoạn đó để làm rõ hoặc hỏi thầy cô, không cần ép đọc cả đoạn dài."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em vẫn tập trung được, nhưng thấy ngán khi đọc lại hoặc làm cùng một kiểu bài nhiều lần",
      BranchTitle: "Đổi phương pháp ôn tập chống nhàm chán",
      Intro: "Đọc đi đọc lại cùng một kiểu rất dễ tạo cảm giác nhàm. Đổi sang phương pháp chủ động sẽ giúp não bộ hứng thú hơn.",
      Question: "Em muốn thử cách đổi mới nào?",
      SubOptions: [
        { Index: 1, Text: "Thử phương pháp tự kiểm tra trí nhớ (che sách và tự nói lại)" },
        { Index: 2, Text: "Tự đặt câu hỏi hoặc giải thích bài cho một người bạn" },
        { Index: 3, Text: "Chia nhỏ nội dung để tránh học vẹt cả trang" }
      ],
      Solutions: [
        {
          Title: "1. Kỹ thuật Active Recall (Che sách và tự nhắc lại)",
          Guide: "Đọc một mục ngắn, đóng hoặc che tài liệu lại, tự nói hoặc viết ra 3 ý chính theo đúng thứ tự.\n\nMở sách đối chiếu: thiếu ý nào thì chỉ xem lại đúng ý đó rồi thử lại. Cách này tạo cảm giác như một thử thách nhỏ thú vị."
        },
        {
          Title: "2. Học bằng cách giải thích cho người khác",
          Guide: "Thử tự nói thành tiếng như đang giảng cho một người bạn chưa học bài này. Việc dùng ngôn ngữ riêng giúp em hiểu sâu và bớt nhàm chán hơn."
        },
        {
          Title: "3. Thu nhỏ mục tiêu kiểm tra",
          Guide: "Thay vì đặt mục tiêu “học thuộc cả trang”, hãy chọn “nói được ba việc theo đúng thứ tự” hoặc viết 1 câu hỏi cho ý còn thiếu."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em đang học mà cứ nghĩ đến số bài còn lại hoặc hạn phải nộp",
      BranchTitle: "Tách bạch việc cần làm trước mắt khỏi danh sách bài còn lại",
      Intro: "Khi nhìn cả núi bài tập và hạn nộp, ta dễ bị thôi thúc làm qua loa cho xong.",
      Question: "Điều nào đang làm em phân tâm nhất lúc này?",
      SubOptions: [
        { Index: 1, Text: "Chưa biết việc nào cần ưu tiên làm trước" },
        { Index: 2, Text: "Biết việc làm trước nhưng chỉ muốn làm cho xong, mất hứng thú" },
        { Index: 3, Text: "Thấy thời gian còn lại không đủ cho tất cả" }
      ],
      Solutions: [
        {
          Title: "1. Sắp xếp ưu tiên theo hạn nộp và phần bắt buộc",
          Guide: "Xem hạn nộp thật và chỉ giữ phần bắt buộc. Nếu chưa rõ, hỏi: “Thưa cô, trong hai phần này, phần nào cần hoàn thành trước buổi học ngày mai ạ?”."
        },
        {
          Title: "2. Chọn 1 câu hỏi nhỏ thú vị để tìm hiểu sâu hơn",
          Guide: "Trong phần bắt buộc, chọn đúng 1 điểm em hơi tò mò (ví dụ: 'Hai cách này khác nhau ở bước nào?') và đọc để trả lời câu hỏi đó. Điều này khôi phục lại cảm giác khám phá khi học."
        },
        {
          Title: "3. Xin thầy cô hướng dẫn thu xếp khi thiếu thời gian",
          Guide: "Ghi phần đã làm và phần còn lại để hỏi sớm: “Thưa cô, em đã xong phần đầu. Với thời gian còn lại, cô giúp em xác định phần cần ưu tiên được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Sau khi làm sai hoặc quên một ý, em nghĩ nhiều đến điểm số hoặc tự trách mình",
      BranchTitle: "Thay đổi cách tự nói chuyện và tách bạch lỗi sai khỏi giá trị bản thân",
      Intro: "Sợ điểm kém hoặc tự trách mình dễ làm mất hoàn toàn niềm vui học tập.",
      Question: "Điều gì đang chiếm lấy suy nghĩ của em?",
      SubOptions: [
        { Index: 1, Text: "Tự trách mình kém cỏi khi quên hoặc làm sai" },
        { Index: 2, Text: "Lo lắng chuyện có thể xảy ra (sợ thi hỏng, bị đánh giá)" }
      ],
      Solutions: [
        {
          Title: "1. Nói chuyện với mình như nói với một người bạn",
          Guide: "Thay vì nghĩ “Mình học kiểu gì cũng không được”, hãy quay lại sự thật khách quan trên bài làm:\n“Em đã nhớ ba ý và quên một ý. Lúc này, em chỉ cần xem lại đúng ý cuối rồi thử nói lại một lần”."
        },
        {
          Title: "2. Chọn một việc cụ thể có thể kiểm soát ngay",
          Guide: "Thay vì nghĩ “Mình phải làm tốt hết”, hãy chọn 1 câu còn vướng và kiểm tra xem bước nào cần sửa.\n\nNếu quá căng, đặt bài xuống, thả lỏng vai và xin cô chọn giúp 1 phần vừa sức để bắt đầu."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em bắt đầu muốn làm cho xong từ một phần mình chưa hiểu rõ",
      BranchTitle: "Tìm đúng chỗ vướng khiến em nản và tháo gỡ",
      Intro: "Khi gặp chỗ khó không hiểu, phản ứng tự nhiên là muốn lướt qua cho xong. Hãy tìm đúng điểm dừng đó.",
      Question: "Em bắt đầu thấy vướng ở bước nào?",
      SubOptions: [
        { Index: 1, Text: "Chưa rõ đề bài yêu cầu làm gì" },
        { Index: 2, Text: "Hiểu đề nhưng chưa biết dùng thông tin nào" },
        { Index: 3, Text: "Đã chọn được thông tin nhưng chưa biết viết câu giải thích" }
      ],
      Solutions: [
        {
          Title: "1. Diễn đạt lại đề bằng lời của chính mình",
          Guide: "Tìm từ chỉ việc cần làm (so sánh, giải thích, nêu...) và xác định đối tượng đề hỏi.\n\nVí dụ: “Em cần nêu hai cách giống hoặc khác nhau thế nào ở thời gian và cách chia việc”."
        },
        {
          Title: "2. Đặt từng dữ kiện cạnh câu hỏi để kiểm tra",
          Guide: "Khoanh 1 dữ kiện và tự hỏi: “Dữ kiện này có trả lời thẳng từ khóa 'vì sao' hoặc câu hỏi của đề không?”. Nếu phân vân giữa 2 dữ kiện, giữ cả 2 để hỏi cô dấu hiệu phân biệt."
        },
        {
          Title: "3. Nối dữ kiện với kết luận thành câu giải thích",
          Guide: "Thử nói thành tiếng: “Khi làm việc A, kết quả B xảy ra...”. Sau đó viết lại câu đó.\n\nNếu vẫn vướng, hỏi cô: “Em đã biết dùng chi tiết này, cô gợi ý giúp em chỗ nối với kết luận được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Gần đây em chủ yếu ôn một mình và muốn có người cùng học, lắng nghe hoặc xem lại lịch ôn",
      BranchTitle: "Kết nối bạn bè, thầy cô hoặc gia đình để lấy lại động lực",
      Intro: "Học một mình lâu ngày dễ cảm thấy cô đơn và đuối sức. Hãy chia sẻ để có thêm góc nhìn và sự đồng hành.",
      Question: "Lúc này, em mong người kia giúp điều gì nhất?",
      SubOptions: [
        { Index: 1, Text: "Muốn có bạn cùng trao đổi 1 câu hoặc cách làm" },
        { Index: 2, Text: "Muốn có người lắng nghe mình kể trước khi bàn giải pháp" },
        { Index: 3, Text: "Muốn nhờ cô hoặc ba mẹ cùng điều chỉnh lại lịch ôn" }
      ],
      Solutions: [
        {
          Title: "1. Rủ bạn trao đổi đúng 1 bước vướng",
          Guide: "Nhắn cho bạn: “Bạn xem cùng mình đúng bước này được không? Mình muốn hiểu cách chọn để tự làm lại”.\n\nNếu bạn chỉ gửi đáp án, hỏi lại nhẹ nhàng: “Bạn giải thích ngắn vì sao chọn thông tin đó giúp mình nhé”."
        },
        {
          Title: "2. Xin được lắng nghe trước khi nhận lời khuyên",
          Guide: "Mở lời rõ ràng: “Bạn nghe mình kể vài phút về chuyện ôn mấy hôm nay không? Mình muốn nói hết điều đang vướng trước. Khi nào muốn bàn cách, mình sẽ hỏi bạn nhé”."
        },
        {
          Title: "3. Cùng thầy cô hoặc ba mẹ tinh chỉnh lịch ôn",
          Guide: "Đem phần đã làm và phần còn lại ra trao đổi: “Thưa cô, tối nay em còn 1 bài nộp và 2 mục đọc thêm. Cô giúp em xác định mục nào cần xem trước để em thu xếp thời gian nghỉ được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em ít muốn làm cả những việc ngoài học tập trước đây em thích, hoặc ngủ/sinh hoạt thay đổi",
      BranchTitle: "Tìm người lớn hỗ trợ trực tiếp khi cảm giác chán nản lan rộng",
      Intro: "Khi sự mất hứng thú kéo dài và ảnh hưởng đến sở thích cá nhân, giấc ngủ hoặc ăn uống, em rất nên có người lớn tin cậy đồng hành.",
      Question: "Em muốn mở lời tìm sự giúp đỡ bằng cách nào?",
      SubOptions: [
        { Index: 1, Text: "Nói chuyện riêng trực tiếp với thầy cô tin cậy" },
        { Index: 2, Text: "Nhắn tin hoặc viết trước để hẹn lịch gặp" },
        { Index: 3, Text: "Chưa biết tìm ai hoặc cần giúp ngay lập tức" }
      ],
      Solutions: [
        {
          Title: "1. Câu mở đầu xin gặp riêng thầy cô",
          Guide: "“Thưa cô, dạo gần đây em thấy ít muốn làm cả những việc trước đây em thích. Em có thể gặp riêng cô để nói thêm và nhờ cô giúp em tìm người hỗ trợ được không ạ?”."
        },
        {
          Title: "2. Soạn tin nhắn xin hẹn gặp",
          Guide: "“Thưa cô, em muốn xin một lúc nói chuyện riêng. Gần đây có chuyện đang ảnh hưởng đến việc học và sinh hoạt của em. Khi nào em có thể gặp cô được ạ?”."
        },
        {
          Title: "3. Kết nối cán bộ tư vấn hoặc người thân",
          Guide: "Hỏi giáo viên chủ nhiệm, người phụ trách tư vấn học đường hoặc cha mẹ.\n\nNếu thấy mình không an toàn hoặc cần giúp ngay, nói ngay với người lớn gần nhất: “Em cần có người ở cùng và giúp em ngay lúc này ạ”."
        }
      ]
    },
    {
      StepIndex: 8,
      OptionText: "Em chưa rõ điều gì đã thay đổi hoặc thấy nhiều chuyện xảy ra cùng lúc",
      BranchTitle: "Nhìn lại khoảnh khắc bắt đầu mất hứng thú",
      Intro: "Em chỉ cần nhớ lại đúng một buổi ôn gần đây và quan sát điều gì đã xảy ra ngay trước lúc em chỉ muốn làm cho xong.",
      Question: "Em nhận thấy manh mối nào trong buổi ôn đó?",
      SubOptions: [
        { Index: 1, Text: "Đang làm trôi chảy thì chép mẫu một câu khó rồi mất hứng" },
        { Index: 2, Text: "Đọc lặp lại nhiều trang tài liệu đã học rồi thấy ngán" },
        { Index: 3, Text: "Chưa nhận ra và muốn cùng thầy cô rà lại" }
      ],
      Solutions: [
        {
          Title: "1. Quay lại đúng câu khó khiến em chững lại",
          Guide: "Thay vì tự trách “Mình lười”, hãy nhìn đúng sự thật: em bị khựng lại ở một câu khó.\n\nThử che lời giải mẫu của đúng câu đó và tự giải thích lại."
        },
        {
          Title: "2. Thay đổi cách ôn ở những mục đã quen",
          Guide: "Nếu đọc lại kiến thức cũ khiến em ngán, hãy đổi sang làm 1 câu hỏi ứng dụng hoặc tự kiểm tra nhanh trong 5 phút rồi chuyển sang phần mới."
        },
        {
          Title: "3. Mở lời nhờ tìm hiểu cùng thầy cô",
          Guide: "“Dạo này em vẫn làm xong bài nhưng thường chỉ muốn làm cho xong. Em muốn có người cùng xem điều gì đã thay đổi ạ.”."
        }
      ]
    },
    {
      StepIndex: 9,
      OptionText: "Em muốn dừng lúc này",
      BranchTitle: "Tạm dừng nghỉ ngơi",
      Intro: "Em hoàn toàn có thể dừng ở đây mà không cần ép mình trả lời tiếp.",
      Question: "Lựa chọn nghỉ ngơi cho em:",
      SubOptions: [
        { Index: 1, Text: "Tạm dừng và giữ một dấu nhắc ngắn để quay lại sau" }
      ],
      Solutions: [
        {
          Title: "1. Dừng lại và chăm sóc bản thân",
          Guide: "Hãy gấp sách vở lại, làm một việc nhỏ em thấy thư giãn (nghe nhạc, uống nước, đi dạo nhẹ).\n\nKhi nào sẵn sàng, em có thể quay lại chọn một việc nhỏ phù hợp hơn."
        }
      ]
    }
  ]
};

// 3. Tình huống 1.27: Khi em đã chuẩn bị bài nhưng vẫn hồi hộp trước lớp (XH03)
const p1_27 = {
  Id: "p1_27",
  Code: "1.27",
  FileName: "XH03 - Khi em đã chuẩn bị bài nhưng vẫn hồi hộp trước lớp.docx",
  Title: "Khi em đã chuẩn bị bài nhưng vẫn hồi hộp trước lớp",
  RootQuestion: "Câu 1. Lúc này, em muốn được giúp việc gì trước?",
  Intro: "Em đã chuẩn bị nội dung cho bài thuyết trình, nhưng khi nghĩ đến lúc đứng trước lớp và nói để các bạn nghe, em thấy hồi hộp và lo mình sẽ quên điều định nói. Em có thể bắt đầu từ một câu hoặc một ý nhỏ.",
  Options: [
    { Index: 1, Text: "Em muốn sắp xếp bài thành những ý dễ nhớ khi nói" },
    { Index: 2, Text: "Em muốn biết cách thở và lấy nhịp trước khi mở lời" },
    { Index: 3, Text: "Em muốn nói rõ hơn để các bạn theo kịp" },
    { Index: 4, Text: "Em muốn nói tiếp được khi quên điều định nói" },
    { Index: 5, Text: "Em muốn tập trả lời câu hỏi giữa bài rồi quay lại phần đang nói" },
    { Index: 6, Text: "Em nói được khi tập một mình nhưng thấy khó khi có người nghe" },
    { Index: 7, Text: "Em từng bị cười, bị trêu hoặc bị chen lời và muốn biết cách nhờ giúp" },
    { Index: 8, Text: "Em đã tập nhưng vẫn thấy quá sức và muốn cùng thầy cô tìm cách" },
    { Index: 9, Text: "Em chưa rõ mình thường vướng ở đâu" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn sắp xếp bài thành những ý dễ nhớ khi nói",
      BranchTitle: "Tạo thẻ từ khóa dễ nhớ thay vì học thuộc cả đoạn",
      Intro: "Nếu phải đọc nguyên từng chữ mới nói được, em sẽ rất dễ bị rối. Thẻ từ khóa sẽ giúp em nhớ mạch trình bày tự nhiên.",
      Question: "Em muốn tập bước nào với thẻ từ khóa?",
      SubOptions: [
        { Index: 1, Text: "Rút gọn bài thành 3 cụm từ khóa theo thứ tự" },
        { Index: 2, Text: "Thêm câu nối để người nghe biết lúc chuyển ý" },
        { Index: 3, Text: "Thực hành nói chỉ với thẻ từ khóa" }
      ],
      Solutions: [
        {
          Title: "1. Làm thẻ 3 cụm từ khóa gợi nhớ",
          Guide: "Chọn 1 ý chính, xếp 2-3 ý nhỏ hỗ trợ theo thứ tự: Chuyện gì xảy ra -> Nhóm đã làm gì -> Kết quả ra sao.\n\nViết mỗi ý thành 1 cụm từ thật rõ nghĩa (ví dụ: thay 'giờ gửi' lặp lại thành 'khác giờ gửi' -> 'chốt giờ gửi chung' -> 'gửi đúng lúc')."
        },
        {
          Title: "2. Tạo câu nối ngắn giữa các từ khóa",
          Guide: "Nếu nhớ ý nhưng sợ người nghe không biết lúc chuyển ý, thêm câu nối ngắn:\n“Sau đó, nhóm em cùng thống nhất...”, “Kết quả là...”."
        },
        {
          Title: "3. Giảm dần gợi ý khi tập nói",
          Guide: "Tập nói nhìn câu mẫu trước, khi nói liền mạch được hai câu quanh chỗ chuyển thì cất văn bản dài đi, chỉ giữ lại thẻ từ khóa nhỏ trên tay."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn biết cách thở và lấy nhịp trước khi mở lời",
      BranchTitle: "Kỹ thuật thở và lấy nhịp mở đầu nhẹ nhàng",
      Intro: "Khi mới đứng lên trước lớp, nhịp tim nhanh và hơi thở gấp là bình thường. Em chỉ cần ổn định 1 nhịp trước khi cất tiếng.",
      Question: "Cách ổn định nhịp nào phù hợp với em?",
      SubOptions: [
        { Index: 1, Text: "Đặt chân chạm sàn và thở nhẹ theo nhịp tự nhiên" },
        { Index: 2, Text: "Nếu đếm hơi thở bị phân tâm, chuyển sang nhìn tiêu đề bài" },
        { Index: 3, Text: "Chuẩn bị câu giới thiệu chủ đề cực ngắn" }
      ],
      Solutions: [
        {
          Title: "1. Tư thế vững và nhịp thở tự nhiên (Theo NHS)",
          Guide: "Đặt hai bàn chân chạm vững trên sàn, thả lỏng hai vai.\n\nHít vào nhẹ qua mũi và thở ra nhẹ qua miệng theo nhịp dễ chịu. Tránh cố hít quá sâu hoặc nín thở (nếu thấy chóng mặt thì dừng ngay và thở bình thường)."
        },
        {
          Title: "2. Chuyển hướng chú ý nếu việc đếm gây phân tâm",
          Guide: "Nếu đếm nhịp thở khiến em càng để ý sự hồi hộp, hãy bỏ phần đếm.\n\nChỉ cần cảm nhận bàn chân chạm sàn, nhìn tiêu đề bài 1 nhịp rồi cất lời."
        },
        {
          Title: "3. Mở lời bằng câu ngắn nhất có thể",
          Guide: "Đánh dấu 1 chỗ dừng ngay sau câu đầu tiên:\n“Hôm nay em xin trình bày cách nhóm em chia việc.”\n\nNếu quá run, em chỉ cần giới thiệu tên chủ đề trước, dừng 1 nhịp rồi mới nói tiếp."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em muốn nói rõ hơn để các bạn theo kịp",
      BranchTitle: "Điều chỉnh tốc độ, ngắt nghỉ và chuyển ý rõ ràng",
      Intro: "Khi hồi hộp, ta thường nói nhanh hoặc nhỏ dần ở cuối câu.",
      Question: "Em muốn cải thiện điểm nào khi nói?",
      SubOptions: [
        { Index: 1, Text: "Tách câu dài và đánh dấu chỗ ngắt nghỉ" },
        { Index: 2, Text: "Thêm câu báo hiệu lúc sang ý mới" }
      ],
      Solutions: [
        {
          Title: "1. Tách câu dài và nói trọn câu",
          Guide: "Đánh dấu gạch chéo (/) ở chỗ cần ngắt hơi. Tách những câu quá dài thành 2 câu ngắn, tập giữ âm lượng đều đến hết chữ cuối của câu."
        },
        {
          Title: "2. Báo hiệu rõ khi chuyển phần",
          Guide: "Thêm câu báo hiệu: “Nhóm em đã sửa ở hai chỗ. Thứ nhất là... Còn ở phần cuối, nhóm em tóm tắt kết quả...”.\n\nNhờ 1 người bạn nghe thử và hỏi: “Bạn nghe được ý nào nhất?” để kiểm chứng."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em muốn nói tiếp được khi quên điều định nói",
      BranchTitle: "Cách giữ mạch và nói tiếp khi lỡ quên ý",
      Intro: "Quên một câu khi đang nói là chuyện ai cũng từng gặp. Em có cách xử lý để không bị đứng hình hoàn toàn.",
      Question: "Em gặp tình huống quên nào?",
      SubOptions: [
        { Index: 1, Text: "Quên câu chữ nhưng vẫn nhớ ý nhóm đã làm" },
        { Index: 2, Text: "Quên cả ý tiếp theo và cần nhìn thẻ từ khóa" },
        { Index: 3, Text: "Quên một số liệu hoặc chi tiết nhỏ" }
      ],
      Solutions: [
        {
          Title: "1. Diễn đạt lại bằng lời nói tự nhiên",
          Guide: "Dừng 1 nhịp, đừng cố nhớ lại từng chữ đã học thuộc. Nói bằng chính lời bình thường:\n“Sau đó, nhóm em chọn một giờ để mọi người cùng gửi bài”."
        },
        {
          Title: "2. Nhìn thẻ từ khóa hoặc xin vài giây xem ghi chú",
          Guide: "Dùng cụm từ gợi nhớ trên thẻ để mở câu: “Để giải quyết việc đó, nhóm em...” rồi nhìn tiếp dòng từ khóa tiếp theo."
        },
        {
          Title: "3. Xử lý khi quên số liệu chi tiết",
          Guide: "Nói bình tĩnh: “Em xin kiểm tra lại chi tiết này và bổ sung sau ạ”, rồi đi thẳng sang ý tiếp theo mà em nhớ chắc."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn tập trả lời câu hỏi giữa bài rồi quay lại phần đang nói",
      BranchTitle: "Giữ mạch bài nói khi có người đặt câu hỏi bất ngờ",
      Intro: "Khi đang nói mà có bạn hỏi ngang, em dễ bị mất mạch bài. Hãy dùng mẹo giữ chỗ.",
      Question: "Em muốn xử lý câu hỏi giữa bài theo cách nào?",
      SubOptions: [
        { Index: 1, Text: "Xin phép nói hết ý hiện tại rồi mới trả lời" },
        { Index: 2, Text: "Hỏi lại nếu chưa nghe rõ ý bạn hỏi" },
        { Index: 3, Text: "Cách quay lại đúng phần đang trình bày dở" }
      ],
      Solutions: [
        {
          Title: "1. Hẹn trả lời sau khi nói hết ý",
          Guide: "Nói lịch sự: “Bạn cho mình nói hết phần tiêu đề này nhé. Sau đó mình sẽ trả lời về hình minh họa”.\n\nGhi nhanh 1 chữ (ví dụ: 'hình') ra góc thẻ để không quên lời hẹn."
        },
        {
          Title: "2. Hỏi lại để xác nhận đúng trọng tâm",
          Guide: "Nếu chưa rõ ý bạn hỏi, hỏi lại: “Bạn muốn hỏi về cách nhóm làm hay về kết quả?”.\n\nNếu chưa biết câu trả lời, nói phần mình biết và hẹn kiểm tra bổ sung sau."
        },
        {
          Title: "3. Câu nối quay lại bài thuyết trình",
          Guide: "Sau khi trả lời xong, nhìn vào thẻ từ khóa và báo rõ: “Bây giờ mình xin nói tiếp phần kết quả sau khi dán nhãn...”."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em nói được khi tập một mình nhưng thấy khó khi có người nghe",
      BranchTitle: "Tập nói tăng dần cấp độ từ 1 người đến nhóm nhỏ",
      Intro: "Thay vì nhảy thẳng từ tập một mình sang đứng trước cả lớp, em hãy tập theo các bậc thang nhỏ.",
      Question: "Em muốn chọn mức độ luyện tập nào?",
      SubOptions: [
        { Index: 1, Text: "Tập 1 đoạn ngắn với 1 người bạn tin cậy" },
        { Index: 2, Text: "Kiểm tra xem người nghe có thực sự hiểu điều mình lo không" },
        { Index: 3, Text: "Tập với nhóm nhỏ trước buổi thật" }
      ],
      Solutions: [
        {
          Title: "1. Bậc thang luyện tập với 1 người nghe",
          Guide: "Nhờ 1 người bạn thân: “Bạn nghe giúp mình đoạn đầu thôi nhé. Xong rồi cho mình biết bạn hiểu ý nào”.\n\nNếu vẫn run quá, rút xuống chỉ tập đúng 1 câu mở đầu."
        },
        {
          Title: "2. Kiểm chứng nỗi lo bằng câu hỏi thật",
          Guide: "Nếu lo mình nói nhỏ bạn không nghe thấy, tập xong hỏi ngay: “Bạn nghe được ý chính nào?”. Khi bạn nhắc lại đúng ý, em sẽ thấy thực tế tốt hơn nỗi lo rất nhiều."
        },
        {
          Title: "3. Chốt trước phần sẽ nói với nhóm hoặc thầy cô",
          Guide: "Khi tập ổn với 1-2 bạn, tăng lên nhóm nhỏ rồi thống nhất trước với nhóm phần mình sẽ phụ trách trong buổi thật."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em từng bị cười, bị trêu hoặc bị chen lời và muốn biết cách nhờ giúp",
      BranchTitle: "Xử lý khi bị trêu chọc và nhờ thầy cô bảo vệ",
      Intro: "Em có quyền được trình bày trong môi trường tôn trọng và an toàn. Đừng chịu đựng việc bị trêu chọc một mình.",
      Question: "Em muốn chuẩn bị cách ứng phó nào?",
      SubOptions: [
        { Index: 1, Text: "Phản hồi ngay khi bị bạn chen lời" },
        { Index: 2, Text: "Nói riêng trước với thầy cô để được hỗ trợ trong giờ" },
        { Index: 3, Text: "Khi việc trêu chọc vẫn tiếp diễn" }
      ],
      Solutions: [
        {
          Title: "1. Câu phản hồi bình tĩnh khi bị chen lời",
          Guide: "Nếu vẫn có thể nói tiếp, nói rõ: “Bạn để mình nói hết ý này nhé”.\n\nNếu việc trêu vẫn tiếp diễn, em có quyền dừng lại và nhìn về phía thầy cô."
        },
        {
          Title: "2. Mở lời nhờ thầy cô hỗ trợ trước buổi thuyết trình",
          Guide: "Nói riêng với cô: “Lần trước có bạn trêu lúc em trình bày. Nếu chuyện đó xảy ra lần nữa, cô có thể nhắc các bạn để em nói hết ý được không ạ?”."
        },
        {
          Title: "3. Nhờ người lớn can thiệp ngay nếu bị bắt nạt",
          Guide: "Nếu em đã xin bạn dừng mà bạn vẫn trêu trước lớp hoặc sau giờ học, báo ngay cho giáo viên chủ nhiệm hoặc người lớn em tin cậy để được bảo vệ."
        }
      ]
    },
    {
      StepIndex: 8,
      OptionText: "Em đã tập nhưng vẫn thấy quá sức và muốn cùng thầy cô tìm cách",
      BranchTitle: "Đề xuất hình thức hỗ trợ phù hợp với thầy cô",
      Intro: "Nếu đã tập kỹ ở nhà mà đứng trước lớp vẫn quá sức, em có thể thương lượng với thầy cô một phương án nhẹ nhàng hơn.",
      Question: "Em muốn đề nghị thầy cô hỗ trợ điều gì?",
      SubOptions: [
        { Index: 1, Text: "Xin thầy cô nghe thử trước đoạn mở đầu" },
        { Index: 2, Text: "Xin phép dùng thẻ từ khóa hoặc trình bày một phần vừa sức" },
        { Index: 3, Text: "Cần hỗ trợ chuyên sâu vì nỗi lo kéo dài" }
      ],
      Solutions: [
        {
          Title: "1. Xin tập trước riêng với thầy cô",
          Guide: "“Thưa cô, em đã tập ở nhà và nhớ ý. Điều khó nhất là cất lời trước lớp. Cô có thể nghe em thử đúng đoạn mở đầu trước buổi được không ạ?”."
        },
        {
          Title: "2. Hỏi về việc dùng thẻ ghi chú và phạm vi trình bày",
          Guide: "Nếu cô chưa thể nghe trước, hỏi: “Cô có thể cho em dùng thẻ từ khóa khi trình bày hoặc tập trung nói một phần cụ thể được không ạ?”. Nhắc lại điều hai bên thống nhất."
        },
        {
          Title: "3. Kết nối tư vấn học đường nếu nỗi sợ ảnh hưởng sinh hoạt",
          Guide: "Nếu nỗi lo nói trước lớp thường xuyên khiến em né tránh nhiều hoạt động, hãy trao đổi với giáo viên chủ nhiệm để gặp cán bộ tư vấn tâm lý học đường."
        }
      ]
    },
    {
      StepIndex: 9,
      OptionText: "Em chưa rõ mình thường vướng ở đâu",
      BranchTitle: "Xác định đúng điểm vướng khi thuyết trình",
      Intro: "Tìm chỗ cuối em còn nói trôi chảy và chỗ đầu tiên bắt đầu khựng lại.",
      Question: "Khi tập thử, em thấy khựng lại ở bước nào?",
      SubOptions: [
        { Index: 1, Text: "Khựng ngay từ lúc mở lời" },
        { Index: 2, Text: "Nói được câu đầu nhưng dừng khi chuyển sang ý hai" },
        { Index: 3, Text: "Nói một mình ổn nhưng run khi có người nhìn" }
      ],
      Solutions: [
        {
          Title: "1. Chỉ tập trung nói tên chủ đề",
          Guide: "Nếu khựng từ câu đầu, chưa cần tập cả bài. Chỉ tập nói mỗi tên chủ đề + 1 câu mở đầu ngắn, dừng 1 nhịp rồi mới xem tiếp."
        },
        {
          Title: "2. Đánh dấu đúng chỗ chuyển ý để luyện",
          Guide: "Hoàn thành câu: “Em đã nói rõ chủ đề. Em chỉ dừng khi sang ý thứ hai. Vậy em sẽ tập riêng hai câu quanh chỗ chuyển ý đó”."
        },
        {
          Title: "3. Thay đổi đúng 1 điều: số người nghe",
          Guide: "Giữ nguyên một câu dễ nhất, chỉ thay đổi từ nói một mình sang nhờ 1 người bạn thân ngồi nghe trước."
        }
      ]
    }
  ]
};

// 4. Tình huống 1.28: Khi em muốn học thêm nhưng gia đình chưa thể thu xếp học phí
const p1_28 = {
  Id: "p1_28",
  Code: "1.28",
  FileName: "Khi em muốn học thêm nhưng gia đình chưa thể thu xếp học phí.docx",
  Title: "Khi em muốn học thêm nhưng gia đình chưa thể thu xếp học phí",
  RootQuestion: "Câu 1. Lúc này, em muốn được giúp việc nào trước?",
  Intro: "Em muốn học thêm để hiểu những phần bài còn vướng, nhưng gia đình chưa thể thu xếp học phí cho lớp em muốn đăng ký. Mong muốn hiểu bài hơn cho thấy em rất quan tâm đến việc học của mình. Em có thể hỏi về hỗ trợ học phí, tìm lớp chi phí thấp hoặc tự học hiệu quả bằng sách, vở và sự giúp đỡ từ thầy cô.",
  Options: [
    { Index: 1, Text: "Em muốn biết mình cần học lại phần nào trước" },
    { Index: 2, Text: "Em muốn hỏi xem lớp em muốn học có thể giảm học phí không" },
    { Index: 3, Text: "Em muốn tìm một khóa học trực tuyến hoặc lớp khác có chi phí thấp hơn" },
    { Index: 4, Text: "Em muốn bắt đầu học mà không phải đóng thêm tiền" },
    { Index: 5, Text: "Em muốn cùng gia đình chọn một cách học phù hợp" },
    { Index: 6, Text: "Em đã thử học nhưng vẫn chưa tự làm được bài" },
    { Index: 7, Text: "Em đang lo và chưa biết nên bắt đầu từ đâu" }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: "Em muốn biết mình cần học lại phần nào trước",
      BranchTitle: "Xác định chính xác lỗ hổng kiến thức cần học lại",
      Intro: "Trước khi tìm lớp hay tự học, biết chính xác mình hổng ở bước nào sẽ giúp em tiết kiệm rất nhiều thời gian và công sức.",
      Question: "Khi mở một bài gần đây, em thường dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Đọc đề nhưng chưa rõ phải làm gì" },
        { Index: 2, Text: "Hiểu đề nhưng chưa biết bắt đầu hoặc vướng ở phần sau" },
        { Index: 3, Text: "Thấy nhiều bài cùng khó và chưa biết chọn phần nào" }
      ],
      Solutions: [
        {
          Title: "1. Gạch từ khóa chỉ hành động trong đề",
          Guide: "Gạch từ chỉ việc cần làm (nêu, giải thích, so sánh...). Thử nói lại đề yêu cầu gì bằng lời của em. Nếu chưa rõ, khoanh đúng từ đó để hỏi thầy cô."
        },
        {
          Title: "2. Đánh dấu đúng bước bắt đầu phải nhìn mẫu",
          Guide: "Giữ lại phần đã làm được. Đánh dấu bước đầu tiên em phải nhìn mẫu hoặc cần người nhắc và hỏi thầy cô đúng bước đó:\n“Thưa cô, em đã chọn được chi tiết này. Em chưa biết dùng chi tiết đó để giải thích thế nào. Cô xem giúp em bước này được không ạ?”."
        },
        {
          Title: "3. So sánh hai bài để tìm điểm vướng chung",
          Guide: "Đặt hai bài gần đây cạnh nhau. Nếu cùng dừng ở 1 bước giống nhau, hãy luyện riêng bước đó trước. Nếu khác nhau, nhờ thầy cô chọn giúp 1 phần cần học trước để theo kịp bài mới."
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: "Em muốn hỏi xem lớp em muốn học có thể giảm học phí không",
      BranchTitle: "Cách mở lời hỏi về hỗ trợ hoặc miễn giảm học phí",
      Intro: "Nhiều thầy cô và lớp học có chính sách hỗ trợ học sinh có hoàn cảnh khó khăn. Em có thể hỏi riêng một cách lịch sự và rõ ràng.",
      Question: "Em đang ở bước nào khi trao đổi về học phí?",
      SubOptions: [
        { Index: 1, Text: "Chưa biết mở lời hỏi thầy cô thế nào" },
        { Index: 2, Text: "Lớp đồng ý giảm học phí hoặc chia nhỏ đợt đóng" },
        { Index: 3, Text: "Lớp chưa thể giảm hoặc mức sau giảm vẫn quá cao" }
      ],
      Solutions: [
        {
          Title: "1. Cách nhắn tin hoặc gặp riêng để hỏi lịch sự",
          Guide: "Nhắn riêng: “Thưa cô, em muốn hỏi riêng về việc đăng ký lớp. Khi nào em có thể gặp cô vài phút ạ?”.\n\nKhi gặp: “Thưa cô, em muốn học lớp này để hiểu phần bài còn vướng. Mức học phí hiện tại cao hơn khoản gia đình em có thể thu xếp. Cô cho em hỏi lớp có hỗ trợ giảm học phí hoặc có hình thức học phù hợp hơn không ạ?”."
        },
        {
          Title: "2. Hỏi kỹ các khoản phí trước khi về bàn với gia đình",
          Guide: "Xác nhận rõ:\n- Số tiền còn phải đóng là bao nhiêu?\n- Mức giảm áp dụng trong bao lâu (chỉ tháng đầu hay cả khóa)?\n- Có khoản tài liệu nào phải đóng riêng không?\nNếu cô hỏi gia đình đóng được bao nhiêu mà em muốn giữ riêng, đáp: “Dạ, cô cho em biết mức sau hỗ trợ để em về bàn với gia đình được không ạ?”."
        },
        {
          Title: "3. Xin tài liệu tự luyện nếu vẫn chưa thể theo học",
          Guide: "Nếu gia đình vẫn chưa thu xếp được: “Dạ, em cảm ơn cô đã xem xét. Khoản này gia đình em vẫn chưa thu xếp được. Cô có thể chỉ giúp em một ví dụ và một câu luyện đúng phần em đang vướng không ạ?”."
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: "Em muốn tìm một khóa học trực tuyến hoặc lớp khác có chi phí thấp hơn",
      BranchTitle: "Kiểm tra kỹ thông tin trước khi đăng ký lớp chi phí thấp",
      Intro: "Khi tìm khóa học online hoặc lớp giá rẻ, em cần kiểm tra 3 yếu tố để tránh mất tiền mà không giải quyết được chỗ vướng.",
      Question: "Em còn thiếu thông tin gì để quyết định?",
      SubOptions: [
        { Index: 1, Text: "Chưa rõ khóa có dạy đúng phần em cần và có người sửa bài không" },
        { Index: 2, Text: "Chưa rõ tổng chi phí thực tế và điều khoản gia hạn" },
        { Index: 3, Text: "Băn khoăn về lịch học, thiết bị hoặc mạng Internet" }
      ],
      Solutions: [
        {
          Title: "1. Kiểm tra nội dung bài học và cách nhận góp ý",
          Guide: "Hỏi rõ khóa có bài nào luyện đúng phần em đang vướng không và xem bài học thử. Kiểm tra xem có chỗ gửi bài để hỏi lại khi làm sai không, hay chỉ có video xem một chiều."
        },
        {
          Title: "2. Xác nhận tổng số tiền và không vội đóng tiền ngay",
          Guide: "Hỏi giá tính theo tháng hay cả khóa, tiền tài liệu có tính riêng không, có tự động gia hạn không.\n\nNếu bị hối đóng tiền ngay khi chưa rõ: “Em cần xem kỹ nội dung và trao đổi với gia đình trước ạ”."
        },
        {
          Title: "3. Thử thiết bị và đường truyền bằng bài mẫu",
          Guide: "Mở thử 1 bài mẫu vào đúng khung giờ em định học bằng thiết bị sẵn có. Nếu khó xem video hoặc thiếu mạng, ưu tiên tìm lớp gần nhà hoặc xin tài liệu in giấy."
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: "Em muốn bắt đầu học mà không phải đóng thêm tiền",
      BranchTitle: "Tận dụng nguồn học miễn phí từ thầy cô, bạn bè và sách vở",
      Intro: "Em hoàn toàn có thể tiến bộ rõ rệt mà không tốn chi phí nếu biết tập trung đúng chỗ vướng.",
      Question: "Em muốn bắt đầu bằng cách nào ngay hôm nay?",
      SubOptions: [
        { Index: 1, Text: "Hỏi trực tiếp thầy cô trên lớp đúng chỗ còn vướng" },
        { Index: 2, Text: "Tự luyện qua sách giáo khoa, vở ghi và bài mẫu" },
        { Index: 3, Text: "Học cùng bạn bè hoặc tìm tài liệu chung ở trường" }
      ],
      Solutions: [
        {
          Title: "1. Mang bài đã đánh dấu đi hỏi thầy cô",
          Guide: "Nói rõ: “Thưa cô, em đã tự làm đến đây. Em chưa biết dùng chi tiết này để giải thích thế nào. Cô xem giúp em đúng bước này không ạ?”.\n\nNếu cô hẹn sau tiết cuối, hỏi rõ địa điểm gặp. Nghe xong tự làm lại ngay 1 câu mới để kiểm chứng."
        },
        {
          Title: "2. Luyện tập với phương pháp Che lời giải",
          Guide: "Xem một bài mẫu có sẵn trong sách/vở, che phần giải đi rồi tự làm lại một câu tương tự. Mở ra đối chiếu để tìm đúng dòng đầu tiên mình làm khác."
        },
        {
          Title: "3. Học nhóm cùng bạn và xin tài liệu giấy",
          Guide: "Nhờ bạn giải thích 1 bước rồi tự làm câu khác: “Bạn chỉ giúp mình vì sao bạn chọn chi tiết này nhé, xong mình sẽ tự thử câu tiếp theo”.\n\nNếu thiếu thiết bị xem video, xin cô số trang sách hoặc chép 1 ví dụ và 1 câu luyện về làm."
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: "Em muốn cùng gia đình chọn một cách học phù hợp",
      BranchTitle: "Trò chuyện cởi mở với gia đình về cách học phù hợp điều kiện",
      Intro: "Em có thể kể phần bài em muốn hiểu, cách em định thử và lúc em muốn ba mẹ cùng xem lại kết quả.",
      Question: "Gia đình em đang có phản ứng hoặc hoàn cảnh thế nào?",
      SubOptions: [
        { Index: 1, Text: "Gia đình chưa thể chi thêm học phí" },
        { Index: 2, Text: "Gia đình có thể thu xếp một khoản nhỏ hoặc muốn thử cách khác trước" },
        { Index: 3, Text: "Em ngại nói vì sợ ba mẹ thêm lo lắng" }
      ],
      Solutions: [
        {
          Title: "1. Đề xuất kế hoạch tự học và xin hỗ trợ tinh thần",
          Guide: "Nói rõ điều em sẽ thử bằng sách vở hoặc nhờ thầy cô. Xin gia đình một việc không tốn tiền: “Ba mẹ dành cho con một góc yên tĩnh và cuối tuần nghe con kể lại cách làm con tự học được không ạ?”."
        },
        {
          Title: "2. Cùng gia đình chốt phương án thử và mốc kiểm tra",
          Guide: "Đưa thông tin rõ ràng về mức học phí đã hỏi hoặc cam kết thử tự học trước:\n“Dạ, con sẽ tự làm một câu mới. Nếu vẫn dừng ở cùng một bước, con sẽ đem cả hai bài hỏi lại cô. Cuối tuần mình cùng xem lại tiến bộ của con nhé ạ”."
        },
        {
          Title: "3. Mở lời nhẹ nhàng để giảm áp lực cho ba mẹ",
          Guide: "“Dạ, con có một phần bài còn vướng và muốn tìm cách tự học phù hợp với nhà mình. Ba mẹ nghe con kể cách con muốn thử được không ạ?”."
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: "Em đã thử học nhưng vẫn chưa tự làm được bài",
      BranchTitle: "Xác định điểm dừng khi tự học ở nhà",
      Intro: "Tự học bị kẹt là điều rất bình thường. Hãy khoanh đúng bước dừng để hỏi thầy cô.",
      Question: "Khi tự làm một câu mới, em dừng ở đâu?",
      SubOptions: [
        { Index: 1, Text: "Chưa hiểu đề hoặc chọn sai thông tin" },
        { Index: 2, Text: "Chọn được thông tin nhưng không viết thành câu giải thích được" },
        { Index: 3, Text: "Làm được câu giống mẫu nhưng vướng khi đề thay đổi" }
      ],
      Solutions: [
        {
          Title: "1. Đặt dữ kiện cạnh yêu cầu đề bài",
          Guide: "Viết rõ điều đề hỏi, chọn 1 dữ kiện và tự hỏi: “Dữ kiện này giúp trả lời điều gì?”. Nếu chưa trả lời được, đánh dấu dữ kiện đó để hỏi cô."
        },
        {
          Title: "2. Hoàn thành câu nối giải thích",
          Guide: "Giữ nguyên chi tiết đã chọn và viết theo khung: “Chi tiết này trả lời được đề vì...”. Nếu vẫn khựng lại, mang đúng khung câu dở đó đi hỏi cô."
        },
        {
          Title: "3. Tìm điểm thay đổi khi đề biến tấu",
          Guide: "Đặt bài mẫu và bài mới cạnh nhau, khoanh tròn chi tiết đã thay đổi trong đề và xem bước giải nào cần điều chỉnh theo."
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: "Em đang lo và chưa biết nên bắt đầu từ đâu",
      BranchTitle: "Chọn 1 việc nhỏ vừa sức ngay hôm nay",
      Intro: "Đừng cố giải quyết cả chuyện học phí lẫn toàn bộ bài tập cùng lúc. Hôm nay chỉ cần làm 1 việc nhỏ.",
      Question: "Tình hình trước mắt của em là gì?",
      SubOptions: [
        { Index: 1, Text: "Có bài trước mặt hoặc đang tìm hiểu lớp học" },
        { Index: 2, Text: "Sắp có bài kiểm tra nhưng chưa tự chọn được thông tin" },
        { Index: 3, Text: "Hôm nay đã mệt và muốn nghỉ" }
      ],
      Solutions: [
        {
          Title: "1. Làm 1 câu trong sách hoặc viết 1 câu hỏi",
          Guide: "Mở 1 câu trong sách, làm đến chỗ mình dừng và đánh dấu lại. Nếu đang tìm lớp, chỉ cần viết 1 điều muốn hỏi rõ về nội dung/học phí rồi dừng."
        },
        {
          Title: "2. Xin thầy cô ưu tiên bước cần luyện trước ngày thi",
          Guide: "Mang bài đến hỏi: “Thưa cô, với thời gian còn lại đến ngày kiểm tra, em nên luyện bước nào trước ạ?”.\n\nSau khi cô giải thích, tự thử làm lại 1 câu tương tự mà không nhìn giải."
        },
        {
          Title: "3. Để lại lời nhắc ngắn và nghỉ ngơi",
          Guide: "Ghi 1 dòng nhắc: “Ngày mai em mang câu 2 đến hỏi cô về bước chọn thông tin”, sau đó cất sách đi nghỉ ngơi thoải mái."
        }
      ]
    }
  ]
};

const existingCodes = problems.map(p => p.Code);
if (!existingCodes.includes("1.29")) {
  problems.push(p1_29);
  console.log("Added 1.29");
}
if (!existingCodes.includes("1.26")) {
  problems.push(p1_26);
  console.log("Added 1.26");
}
if (!existingCodes.includes("1.27")) {
  problems.push(p1_27);
  console.log("Added 1.27");
}
if (!existingCodes.includes("1.28")) {
  problems.push(p1_28);
  console.log("Added 1.28");
}

console.log('New total problems:', problems.length);
fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2), 'utf8');
console.log('Saved questions_data.json successfully!');
