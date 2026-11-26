const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../src/data/questions_data.json');
const raw = fs.readFileSync(dataFilePath, 'utf8').replace(/^\uFEFF/, '');
const problems = JSON.parse(raw);

const p1_25 = {
  Id: 'p1_25',
  Code: '1.25',
  FileName: 'Bộ câu hỏi hỗ trợ chuyên sâu - Khi chuyện học ảnh hưởng đến giấc ngủ, bữa ăn và sinh hoạt của em.docx',
  Title: 'Khi chuyện học ảnh hưởng đến giấc ngủ, bữa ăn và sinh hoạt của em',
  RootQuestion: 'Câu 1. Hôm nay, em muốn việc nào dễ hơn một chút?',
  Intro:
    'Có những hôm em đã gấp vở mà đầu óc vẫn nghĩ đến bài chưa xong. Bữa cơm cũng có thể trôi qua vội vàng, còn những việc em từng mong chờ thì dạo này em thấy khó tham gia hơn.\n\nNếu chuyện học đã khiến những ngày của em trở nên khó khăn như vậy, em có thể bắt đầu từ một điều em muốn dễ hơn hôm nay. Em có thể thử một thay đổi nhỏ và nói với một người lớn em tin để có người cùng em thu xếp. Một câu như “Dạo này em khó ngủ vì cứ nghĩ đến chuyện học” cũng đủ để bắt đầu.\n\n(Nếu em đang thấy không an toàn, sợ ai đó làm đau mình hoặc sợ mình có thể làm đau bản thân, hãy chọn mục “Em cần được giúp ngay” để tìm người có thể ở bên em ngay lúc này.)',
  Options: [
    { Index: 1, Text: 'Em muốn có thời gian nghỉ và dễ đi ngủ hơn.' },
    { Index: 2, Text: 'Em muốn dành thời gian cho bữa ăn và ăn uống như thường ngày.' },
    { Index: 3, Text: 'Em muốn tham gia lại một việc em từng làm hoặc từng thích.' },
    { Index: 4, Text: 'Nhiều việc cùng bị ảnh hưởng và em chưa biết nên bắt đầu ở đâu.' },
    { Index: 5, Text: 'Em muốn có người cùng em tìm cách.' },
    { Index: 6, Text: 'Em cần được giúp ngay (khi thấy không an toàn).' },
    { Index: 7, Text: 'Em muốn xem lại cách mình đã thử.' },
    { Index: 8, Text: 'Em tự thử với một tình huống mới.' }
  ],
  Branches: [
    {
      StepIndex: 1,
      OptionText: 'Em muốn có thời gian nghỉ và dễ đi ngủ hơn.',
      BranchTitle: 'Khi em muốn có thời gian nghỉ và dễ đi ngủ hơn',
      Intro: 'Hãy để ý xem điều gì thường xảy ra ngay trước lúc em định nghỉ ngơi buổi tối.',
      Question: 'Câu 1aa. Điều gì thường xảy ra trước lúc em định nghỉ?',
      SubOptions: [
        { Index: 1, Text: 'Em vẫn đang học vì còn việc chưa xong.' },
        { Index: 2, Text: 'Em đã dừng học nhưng vẫn nghĩ mãi về chuyện học.' },
        { Index: 3, Text: 'Em chưa rõ điều gì khiến mình khó nghỉ hoặc khó ngủ.' }
      ],
      Solutions: [
        {
          Title: '1. Khi em vẫn đang học vào lúc định nghỉ',
          Guide:
            'Khi còn nhiều việc dở dang, em có thể thấy khó đặt vở xuống. Trước khi học tối nay, em thử chọn một phần cần làm trước và một giờ em muốn dừng. Nếu chưa rõ phần nào cần gấp, em có thể hỏi người đang chờ phần việc đó.\n\n• Em thử: Sáng mai em phải nộp một bài. Nhóm cũng đang chờ phần của em nhưng chưa nói cần lúc nào. Em sẽ hỏi nhóm điều gì để biết mình nên làm trước việc nào?\n- Nếu em đã hỏi nhóm cần phần nào và trước mấy giờ, em có thông tin để sắp xếp.\n- Nếu em mới hỏi giờ, em có thể hỏi thêm: “Nhóm cần mình gửi phần nào trước để làm tiếp?”\n- Nếu còn khó mở lời, em có thể thử: “Tối nay nhóm cần mình gửi phần nào và trước mấy giờ?”\n- Khi nhóm nói tối nay chỉ cần hai ý chính, phần giải thích có thể gửi sáng mai, em thử nhắn lại phần em sẽ gửi tối nay và phần em sẽ gửi sau.\n\n• Kiểm tra & nhờ hỗ trợ thêm:\nKhi thử tối nay, em xem mình có dừng học vào giờ đã chọn được không. Nếu cả hai việc đều gấp, em có thể nhờ thầy cô cùng sắp xếp: “Thưa cô, hai việc của em có hạn gần nhau. Mấy hôm nay em học đến muộn và sáng dậy rất mệt. Cô có thể giúp em chọn phần cần làm trước không ạ?” Nếu em đã dừng được mà vẫn thường khó ngủ, em có thể kể điều đó với người lớn em tin để được giúp thêm.'
        },
        {
          Title: '2. Khi em đã dừng học nhưng vẫn nghĩ mãi về chuyện học',
          Guide:
            'Em có thể ghi riêng hai dòng:\n- Dòng đầu: Ghi điều em đang lo.\n- Dòng sau: Ghi việc đầu tiên em có thể làm khi quay lại.\nVí dụ: “Em lo phần trình bày còn thiếu. Sáng mai em sẽ hỏi nhóm cần bổ sung mục nào trước.”\n\n• Em thử: Em đã cất vở nhưng vẫn nghĩ “Ngày mai chắc em không kịp”. Em sẽ ghi hai dòng thế nào?\n- Nếu em viết “Mai em sẽ cố hơn”, em thử đổi thành việc có thể bắt đầu ngay, như mở yêu cầu bài và đánh dấu phần còn thiếu. Nếu chưa biết làm thế nào, em có thể chọn hỏi đúng một điều mình chưa rõ.\n- Em thử tiếp: Em nhớ ra mình chưa hiểu yêu cầu của phần kết. Em sẽ ghi câu hỏi nào để ngày mai có thể hỏi thầy cô?\n\n• Kiểm tra & nhờ hỗ trợ thêm:\nKhi thử tối nay, em có thể để ghi chú ở chỗ dễ tìm rồi xem lại vào lúc đã chọn. Sau đó, em tự hỏi mình có dễ đặt chuyện học xuống để nghỉ hơn không. Nếu vẫn thấy khó, em có thể nói: “Thưa cô, em đã thử ghi lại việc sẽ làm ngày mai nhưng vẫn khó ngủ nhiều hôm. Cô có thể giúp em tìm người để trao đổi không ạ?”'
        },
        {
          Title: '3. Khi em chưa rõ vì sao mình khó ngủ',
          Guide:
            'Em thử nhớ lại một buổi tối gần đây. Lúc muốn nghỉ, em còn đang làm bài hay đã cất vở? Nếu đã cất vở, em có nhớ mình còn nghĩ đến chuyện gì không? Em chỉ cần nói điều mình nhớ được.\n\n• Em thử: Một bạn kể “Tối qua mình đã cất vở, nhưng lên giường vẫn nghĩ đến bài chưa xong”. Em nhận ra điều gì từ lời bạn kể?\nNếu em mới nghĩ đến việc bảo bạn dừng học sớm hơn, em có thể để ý rằng bạn đã dừng học và đang cần một cách để tạm gác điều còn lo.\n\n• Bước tiếp theo cho em:\nVới chuyện của em, nếu nhận ra điều xảy ra trước giờ nghỉ, em có thể chọn một cách phù hợp để thử. Nếu vẫn chưa rõ, em có thể nói: “Thưa cô, em khó ngủ nhiều hôm và sáng dậy rất mệt. Em chưa rõ vì sao. Cô có thể giúp em tìm người để trao đổi không ạ?” Khi có người trả lời, em hỏi mình sẽ gặp ai, lúc nào và ở đâu.'
        }
      ]
    },
    {
      StepIndex: 2,
      OptionText: 'Em muốn dành thời gian cho bữa ăn và ăn uống như thường ngày.',
      BranchTitle: 'Khi em muốn ăn uống như thường ngày',
      Intro: 'Hãy nhìn lại một bữa ăn gần đây để nhận ra điều gì đang làm giờ ăn bị ảnh hưởng.',
      Question: 'Câu 1ba. Điều gì thường xảy ra vào giờ ăn?',
      SubOptions: [
        { Index: 1, Text: 'Em đang học hoặc trao đổi với nhóm nên ăn muộn hoặc bỏ dở bữa.' },
        { Index: 2, Text: 'Em đã dành thời gian ăn nhưng vẫn thấy khó ăn.' },
        { Index: 3, Text: 'Em chưa rõ điều gì làm việc ăn uống thay đổi.' }
      ],
      Solutions: [
        {
          Title: '1. Khi việc học lấn vào bữa ăn',
          Guide:
            'Em có thể chọn một bữa gần nhất để thử. Khi đến giờ ăn, em đánh dấu chỗ đang làm dở và ghi một việc sẽ làm khi quay lại. Nếu nhóm đang chờ, em có thể gửi phần đã xong hoặc báo lúc mình sẽ xem tiếp.\n\n• Em thử: Nhóm gửi một đoạn cần sửa đúng lúc em chuẩn bị ăn tối. Em còn sửa dở một câu. Em sẽ để lại dấu gì cho mình và nhắn gì cho nhóm?\n- Nếu em mới nhắn “Mình bận”, em có thể thêm: “Mình đi ăn tối. Sau bữa tối mình sẽ xem đoạn nhóm vừa gửi.” Nếu em lo nhóm chưa làm tiếp được, em có thể hỏi họ đang cần phần nào.\n- Em thử tiếp: Nhóm nói chỉ cần tiêu đề và hai ý chính để ghép trước. Em đã có phần đó. Em sẽ gửi gì và báo lúc nào mình quay lại?\n\n• Sau bữa ăn:\nEm xem riêng hai điều: Em có dành được thời gian ăn không? Khi đã có thời gian, em có thấy dễ ăn hơn không? Nếu việc học vẫn lấn vào bữa, em có thể báo giờ nghỉ sớm hơn hoặc nhờ người ở nhà gọi em khi đến bữa. Nếu đã dành thời gian mà vẫn khó ăn nhiều lần, em có thể kể điều đó với người lớn em tin để được giúp thêm.'
        },
        {
          Title: '2. Khi em đã dành thời gian ăn nhưng vẫn khó ăn',
          Guide:
            'Em có thể bắt đầu từ một bữa em nhớ rõ:\n“Dạ, tối qua con đã dừng học để ăn cùng nhà nhưng vẫn bỏ dở bữa. Mấy hôm nay việc này cứ lặp lại. Con muốn ba mẹ giúp con tìm người để trao đổi ạ.”\n\n• Em thử:\n- Nếu người nghe nói “Con cứ dừng học sớm hơn là được”, em sẽ nói thêm điều gì để họ hiểu em đã có thời gian ăn mà vẫn gặp khó khăn? Nếu em mới nói “Con khó ăn”, em có thể kể một việc cụ thể, như tối qua em đã cất bài và ngồi ăn cùng nhà nhưng vẫn bỏ dở bữa.\n- Em thử tiếp: Người ấy hỏi “Con muốn ba mẹ giúp gì trước?”. Em thử nói một việc vừa sức với mình, như nhờ ba mẹ cùng tìm người có chuyên môn để trao đổi hoặc đi cùng em khi gặp người đó.\n\n• Lưu ý nhỏ:\nKhi nói thật, em xem người ấy đã hiểu điều em gặp và có thể giúp em làm gì tiếp. Nếu người đầu tiên chưa hiểu hoặc chưa thể giúp, em có thể chọn một người lớn khác em tin. Nếu nói thành lời còn khó, em có thể viết một câu ngắn rồi đưa cho người ấy đọc.'
        },
        {
          Title: '3. Khi em chưa rõ điều gì làm việc ăn uống thay đổi',
          Guide:
            'Em nhớ lại một bữa gần đây. Đến giờ ăn, em vẫn đang học hay đã ngồi vào bàn mà vẫn thấy khó ăn?\n\n• Em thử: Một bạn kể “Tối qua mình đã gấp vở và ngồi ăn cùng nhà, nhưng vẫn bỏ dở bữa”. Nếu bạn muốn nhờ người lớn giúp, bạn có thể kể việc gì đã xảy ra?\nNếu em mới nói “Bạn ấy thấy áp lực”, em thử thêm chi tiết mà bạn đã kể và một lời nhờ cụ thể.\n\n• Bước tiếp theo cho em:\nVới chuyện của em, nếu việc học lấn vào bữa, em có thể thử chọn một điểm dừng. Nếu vẫn chưa hiểu vì sao, em có thể nói bằng điều mình nhận thấy: “Dạo này con hay ăn muộn hoặc bỏ dở bữa. Con chưa biết vì sao. Ba mẹ có thể giúp con tìm người để trao đổi không ạ?”'
        }
      ]
    },
    {
      StepIndex: 3,
      OptionText: 'Em muốn tham gia lại một việc em từng làm hoặc từng thích.',
      BranchTitle: 'Khi em muốn tham gia lại một hoạt động hằng ngày',
      Intro: 'Em không cần làm trọn vẹn như trước ngay lập tức; hãy xem điều gì đang cản trở mình nhiều nhất.',
      Question: 'Câu 1ca. Điều gì đang làm em khó tham gia nhất?',
      SubOptions: [
        { Index: 1, Text: 'Việc học chiếm mất thời gian em dành cho hoạt động ấy.' },
        { Index: 2, Text: 'Em có thời gian nhưng thấy mệt hoặc khó bắt đầu.' },
        { Index: 3, Text: 'Em đã thử tham gia nhưng vẫn thấy quá sức.' },
        { Index: 4, Text: 'Em chưa rõ vì sao mình khó tham gia.' }
      ],
      Solutions: [
        {
          Title: '1. Khi việc học chiếm mất thời gian',
          Guide:
            'Em có thể chọn một phần hoạt động em muốn giữ lại, rồi xem việc học nào có thể gửi trước hoặc trao đổi sau.\n\n• Em thử: Nhóm hẹn đúng lúc em muốn đến câu lạc bộ. Em đã làm xong phần của mình, chỉ còn một đoạn cần góp ý. Em sẽ đề nghị cách nào để cả em và nhóm đều có thể tiếp tục?\n- Nếu em mới nói “Mình không họp được”, em có thể thêm: “Mình gửi phần đã làm trước nhé. Nhóm góp ý giúp mình ở đoạn cuối. Sau buổi sinh hoạt mình sẽ xem lại.”\n- Em thử tiếp: Nhóm nói cần em giải thích đoạn cuối trong buổi họp. Em có thể gửi lời giải thích trước hoặc xin nhóm ghi lại câu hỏi để em trả lời vào giờ đã hẹn. Em thử nói rõ nhóm sẽ nhận được gì và khi nào.\n\n• Kiểm tra sau khi thử:\nKhi thử thật, em xem nhóm đã có phần cần thiết chưa và em đã tham gia được phần hoạt động mình chọn chưa. Nếu hai việc vẫn trùng, em có thể thử một dịp khác hoặc nhờ người giao việc cùng sắp xếp.'
        },
        {
          Title: '2. Khi em có thời gian nhưng thấy mệt hoặc khó bắt đầu',
          Guide:
            'Nếu vẫn muốn tham gia, em có thể thử một phần ngắn hoặc rủ một người đi cùng. Em có thể chọn nghỉ nếu hôm nay thấy quá mệt.\n\n• Em thử: Bạn rủ em ở lại cả buổi. Em chỉ thấy vừa sức với phần đầu. Em sẽ nói gì để bạn hiểu?\n- Nếu em mới đáp “Để mình xem”, em có thể nói rõ hơn: “Mình muốn đi cùng bạn. Hôm nay mình ở phần đầu thôi. Bạn vào cùng mình được không?”\n- Em thử tiếp: Bạn nói “Ở lại thêm một chút đi”. Em có thể đáp: “Mình vui vì được đi cùng bạn. Hôm nay mình về lúc đã định nhé.” Em thử nói bằng lời của mình.\n\n• Sau khi thử thật:\nEm xem mình có tham gia được phần đã chọn và phần đó có vừa sức không. Nếu em chưa đi được, lần sau em có thể chọn một việc quen thuộc hơn hoặc nhờ người đi cùng. Nếu đã thử mà vẫn thấy quá sức, em có thể nghỉ và kể với người lớn em tin về điều còn khó.'
        },
        {
          Title: '3. Khi em đã thử nhưng vẫn thấy quá sức',
          Guide:
            'Đã thử một phần cũng giúp em biết mình cần gì thêm. Em có thể nói:\n“Thưa cô, em đã vào cùng bạn ở phần đầu nhưng một lúc sau em thấy rất mệt. Em muốn nghỉ hôm nay và nhờ cô cùng em xem lần sau nên thử thế nào ạ.”\n\n• Em thử:\n- Cô hỏi “Lần sau em muốn cô giúp gì?”. Em có thể xin cô giúp chọn phần ngắn hơn, tìm người đi cùng hoặc giúp em gặp người có thể hỗ trợ thêm.\n- Em thử tiếp: Cô nói chưa sắp xếp được người đi cùng. Em muốn nghỉ buổi đó, thử một phần ngắn hơn nếu thấy vừa sức, hay nhờ cô giúp em tìm người để trao đổi? Em thử nói lựa chọn của mình.\n\n• Theo dõi tiếp:\nSau đó, em xem cách đã chọn có phù hợp với sức của mình không. Nếu những hoạt động hằng ngày vẫn thường quá sức, em có thể nói thêm điều đó với người lớn em tin và nhờ họ giúp em gặp người có chuyên môn.'
        },
        {
          Title: '4. Khi em chưa rõ vì sao mình khó tham gia',
          Guide:
            'Em nhớ lại lần gần nhất mình định tham gia. Lúc ấy em còn vướng việc học, có thời gian mà vẫn khó bắt đầu, hay đã tham gia một phần rồi phải dừng?\n\n• Em thử: Một bạn đã làm xong bài và đến câu lạc bộ cùng bạn thân, nhưng chỉ ở được một lúc rồi thấy rất mệt. Em sẽ hỏi bạn điều gì để hiểu phần nào đang quá sức?\nEm có thể hỏi: “Bạn bắt đầu thấy mệt vào lúc nào?” hoặc “Có phần nào bạn vẫn muốn tham gia trong lần tới không?”\n\n• Bước tiếp theo cho em:\nVới chuyện của em, nếu nhận ra một điều cụ thể, em có thể chọn thay đổi dựa trên điều đó. Nếu vẫn chưa rõ, em có thể kể lại một lần với người em tin. Sau cuộc trò chuyện, em xem mình đã chọn được một bước để thử hay đã có người cùng em tìm hiểu thêm chưa.'
        }
      ]
    },
    {
      StepIndex: 4,
      OptionText: 'Nhiều việc cùng bị ảnh hưởng và em chưa biết nên bắt đầu ở đâu.',
      BranchTitle: 'Khi nhiều việc trong ngày cùng bị ảnh hưởng',
      Intro:
        'Em có thể thấy việc nào cũng cần lo. Hôm nay, em được chọn một việc để bắt đầu. Sau khi thử, em xem việc nào khác vẫn còn khó để biết mình cần thay đổi thêm điều gì hoặc nhờ ai giúp.',
      Question: 'Câu 1da. Trong phần còn lại của hôm nay, em muốn bắt đầu từ việc nào?',
      SubOptions: [
        { Index: 1, Text: 'Em muốn có thời gian nghỉ trước khi ngủ' },
        { Index: 2, Text: 'Em muốn dành thời gian cho một bữa ăn' },
        { Index: 3, Text: 'Em muốn tham gia một phần hoạt động hằng ngày' },
        { Index: 4, Text: 'Em muốn có người cùng em chọn việc để bắt đầu' },
        { Index: 5, Text: 'Sau lần thử, em còn cần được giúp ở đâu?' }
      ],
      Solutions: [
        {
          Title: '1. Em muốn có thời gian nghỉ trước khi ngủ',
          Guide:
            '• Việc em có thể thử: Em chọn một giờ dừng học, làm phần đã xác nhận là cần gấp và ghi một việc sẽ làm tiếp. Nếu đã dừng mà vẫn lo, em có thể ghi điều đang lo và để lại đến lúc mình đã chọn.\n\n• Em thử: Em đã ăn tối muộn vì còn bài cần nộp sáng mai. Nhóm cũng đang chờ nhưng chưa nói cần phần nào. Em sẽ hỏi gì? Nếu nhóm chỉ cần hai ý chính, em thử nhắn phần sẽ gửi tối nay và ghi phần sẽ làm tiếp sáng mai.\n\n• Sau khi thử:\nEm xem mình có dừng học được không và có thấy dễ nghỉ hơn không. Nếu giấc ngủ đã dễ hơn mà bữa ăn vẫn bị lấn giờ, em có thể giữ cách dừng học và chọn riêng một bữa để thử thay đổi tiếp. Nếu cả hai điều vẫn khó, em có thể kể với người lớn em tin về việc đã thử và nhờ họ cùng em thu xếp.'
        },
        {
          Title: '2. Em muốn dành thời gian cho một bữa ăn',
          Guide:
            '• Việc em có thể thử: Em chọn bữa gần nhất, đánh dấu phần bài đang dở và báo lúc sẽ quay lại. Nếu nhóm cần một phần để làm tiếp, em có thể gửi phần đã có.\n\n• Em thử: Nhóm cần em góp ý đúng giờ ăn tối. Em đã đọc xong và có hai ý chính. Em sẽ nhắn gì? Nếu nhóm cần thêm một ý ngay, em hỏi ý nào đang cần để làm tiếp rồi cho nhóm biết phần còn lại em có thể trả lời lúc nào.\n\n• Sau bữa ăn:\nEm xem mình đã dành được thời gian ăn chưa và có thấy dễ ăn hơn không. Nếu bữa ăn dễ hơn nhưng em vẫn học đến khuya, em có thể giữ khoảng thời gian ăn đã chọn và nhờ người giao bài giúp xác định việc cần làm tối nay. Nếu vẫn khó ăn dù đã có thời gian, em có thể kể về bữa vừa rồi với người lớn em tin và nhờ họ giúp em tìm người để trao đổi.'
        },
        {
          Title: '3. Em muốn tham gia một phần hoạt động hằng ngày',
          Guide:
            '• Việc em có thể thử: Em chọn một phần muốn tham gia, một lúc để dừng và người có thể đi cùng nếu em muốn. Nếu trùng giờ với việc học, em có thể gửi phần đã làm trước hoặc xin trao đổi vào lúc khác.\n\n• Em thử: Nhóm hẹn đúng lúc em muốn tham gia phần đầu buổi sinh hoạt. Em đã làm xong phần của mình. Em sẽ đề nghị gì để nhóm vẫn làm tiếp được? Nếu nhóm cần thêm lời giải thích, em có thể gửi trước hoặc hẹn lúc trả lời. Nếu bạn rủ em ở cả buổi, em thử nói rõ phần em thấy vừa sức hôm nay.\n\n• Sau khi thử:\nEm xem mình đã tham gia được phần đã chọn chưa và thấy thế nào khi tham gia. Nếu hoạt động đó vừa sức nhưng em vẫn khó ngủ hoặc khó ăn, em có thể kể những điều còn khó với người em tin. Nếu tham gia vẫn quá sức, em có thể nghỉ và nhờ người ấy giúp em chọn bước phù hợp hơn.'
        },
        {
          Title: '4. Em muốn có người cùng em chọn việc để bắt đầu',
          Guide:
            'Em có thể mở lời:\n“Thưa cô, dạo này chuyện học làm em khó ngủ và hay bỏ dở bữa tối. Em chưa biết nên thay đổi việc gì trước. Cô có thể cùng em chọn một việc vừa sức để thử hôm nay không ạ?”\n\n• Em thử: Cô hỏi “Tối nay, điều gì em muốn dễ hơn một chút?”. Nếu chưa biết chọn, em có thể nói về việc sắp đến: “Dạ, sắp đến bữa tối mà em vẫn còn nhiều bài. Cô có thể giúp em xem phần nào để sau bữa được không ạ?” Nếu cô bận, em thử xin một giờ hẹn hoặc hỏi ai có thể gặp em sớm hơn.\n\n• Sau cuộc trò chuyện:\nEm thử nhắc lại việc sẽ làm, lúc sẽ thử và người em có thể gặp lại. Nếu vẫn chưa rõ, em có thể hỏi: “Dạ, việc đầu tiên em có thể thử hôm nay là gì ạ?” Nếu chưa gặp được ai, em có thể nhờ một người lớn em tin giúp liên hệ hoặc đi cùng.'
        },
        {
          Title: '5. Sau lần thử, em còn cần được giúp ở đâu?',
          Guide:
            'Tùy vào kết quả sau khi thử, em chọn hướng phù hợp nhất:\n\n• Việc em chọn đã dễ hơn, một việc khác vẫn còn khó: Em có thể giữ cách vừa có ích và chọn một việc để chăm sóc tiếp.\n• Em chưa thử được: Em có thể nói rõ mình còn vướng ở đâu, như chưa rõ hạn nộp, không đổi được giờ nhóm hoặc quá mệt để bắt đầu. Em chỉ cần đổi một điều hoặc nhờ người khác giúp đúng chỗ đó.\n• Em đã thử nhưng sinh hoạt vẫn khó: Em có thể kể một việc đã thử và một điều vẫn còn khó, rồi nhờ người lớn em tin giúp em gặp người có chuyên môn.\n• Em đang chờ người hỗ trợ: Nếu chưa có hẹn, em có thể hỏi lại hoặc tìm người có thể giúp sớm hơn. Nếu đã có hẹn, em xác nhận giờ và nơi gặp.\n• Em muốn nghỉ ở đây: Em có thể dừng và quay lại khi cần.'
        }
      ]
    },
    {
      StepIndex: 5,
      OptionText: 'Em muốn có người cùng em tìm cách.',
      BranchTitle: 'Khi em muốn có người cùng tìm cách',
      Intro:
        'Em có thể bắt đầu với thầy cô em tin, người phụ trách tư vấn học đường, cha mẹ, người chăm sóc hoặc một người lớn em thấy yên tâm. Em có thể nói trực tiếp, đưa một dòng ghi chú hoặc chỉ xin gặp riêng trước.\n\nMẫu mở lời: “Thưa cô, chuyện học làm em căng thẳng đã lâu. Mấy hôm nay em hay khó ngủ và sáng dậy rất mệt. Cô có thể nghe em nói riêng một lúc và giúp em tìm người hỗ trợ được không ạ?”\n(Nếu cô nói hôm nay chưa gặp được mà em vẫn muốn có người giúp trước khi về, em có thể hỏi: “Dạ, cô chỉ giúp em ai đang ở trường và có thể gặp em hôm nay được không ạ?”)',
      Question: 'Câu 1ea. Sau khi em liên hệ, việc gì đã xảy ra?',
      SubOptions: [
        { Index: 1, Text: 'Em chưa liên hệ' },
        { Index: 2, Text: 'Em đang chờ trả lời' },
        { Index: 3, Text: 'Em đã có hẹn' },
        { Index: 4, Text: 'Đã đến giờ hẹn nhưng em chưa gặp được người ấy' },
        { Index: 5, Text: 'Em đã nói chuyện nhưng chưa rõ bước tiếp theo' },
        { Index: 6, Text: 'Em đã nói chuyện và biết bước tiếp theo' }
      ],
      Solutions: [
        {
          Title: '1. Khi em chưa liên hệ',
          Guide:
            'Em có thể bắt đầu bằng một câu xin gặp riêng hoặc nhờ người em tin đi cùng.\n\nVí dụ: “Thưa cô, chuyện học làm em căng thẳng đã lâu. Mấy hôm nay em hay khó ngủ và sáng dậy rất mệt. Cô có thể nghe em nói riêng một lúc và giúp em tìm người hỗ trợ được không ạ?”'
        },
        {
          Title: '2. Khi em đang chờ trả lời',
          Guide:
            'Nếu muốn được giúp sớm hơn, em có thể gặp hoặc gọi một người lớn khác mà em thấy yên tâm.\n\nNếu ở trường và muốn gặp trước khi về: “Dạ, cô chỉ giúp em ai đang ở trường và có thể gặp em hôm nay được không ạ?”'
        },
        {
          Title: '3. Khi em đã có hẹn',
          Guide:
            'Em xác nhận rõ 3 thông tin: gặp ai, ở đâu và vào lúc nào để mình yên tâm chuẩn bị trước khi đến.'
        },
        {
          Title: '4. Khi đã đến giờ hẹn nhưng em chưa gặp được người ấy',
          Guide:
            'Em có thể nhắn hoặc xin một giờ hẹn khác, hoặc hỏi xem có ai đang sẵn sàng có thể gặp em trước lúc này.'
        },
        {
          Title: '5. Khi em đã nói chuyện nhưng chưa rõ bước tiếp theo',
          Guide:
            'Em có thể hỏi lại để nắm chắc việc cần làm:\n“Dạ, việc em nên làm trước là gì? Nếu vẫn thấy khó, em có thể gặp lại ai ạ?”'
        },
        {
          Title: '6. Khi em đã nói chuyện và biết bước tiếp theo',
          Guide:
            'Em có thể ghi riêng 3 điều ra giấy hoặc ghi chú điện thoại: việc sẽ làm, người có thể giúp và lúc sẽ trao đổi lại.'
        }
      ]
    },
    {
      StepIndex: 6,
      OptionText: 'Em cần được giúp ngay (khi thấy không an toàn).',
      BranchTitle: 'Em cần được giúp ngay',
      Intro:
        'Nếu em đang thấy không an toàn, sợ ai đó làm đau mình hoặc sợ mình có thể làm đau bản thân, hãy ưu tiên tìm người lớn ở bên cạnh ngay lúc này.',
      Question: 'Lúc này em có thể liên hệ với ai gần nhất?',
      SubOptions: [
        { Index: 1, Text: 'Tìm hoặc gọi ngay người lớn đáng tin cậy ở trường hoặc ở nhà' },
        { Index: 2, Text: 'Nếu người đầu tiên chưa thể giúp ngay' }
      ],
      Solutions: [
        {
          Title: '1. Tìm hoặc gọi ngay người lớn đáng tin cậy',
          Guide:
            'Hãy tìm hoặc gọi ngay một người lớn đáng tin cậy có thể ở bên em. Nếu ở trường, em có thể đến chỗ thầy cô đang có mặt. Nếu gọi điện, em có thể nói em đang ở đâu và cần họ đến giúp ngay.\n\nEm có thể nói thẳng:\n“Em đang thấy không an toàn. Em cần cô ở cùng em và giúp em ngay ạ.”'
        },
        {
          Title: '2. Nếu người đầu tiên chưa thể giúp',
          Guide:
            'Nếu người đầu tiên chưa thể giúp, hãy tìm hoặc gọi ngay một người lớn khác (thầy cô khác, cán bộ tư vấn học đường, cha mẹ hoặc người thân đáng tin cậy).\n\nEm có thể rời màn hình này để đi tìm người giúp ngay.'
        }
      ]
    },
    {
      StepIndex: 7,
      OptionText: 'Em muốn xem lại cách mình đã thử.',
      BranchTitle: 'Khi em muốn xem lại cách mình đã thử',
      Intro: 'Nhìn lại sau khi thử giúp em giữ lại điều hiệu quả và điều chỉnh nhẹ nhàng phần còn vướng.',
      Question: 'Câu 1ga. Em đã thực hiện được việc mình chọn đến đâu?',
      SubOptions: [
        { Index: 1, Text: 'Em đã làm được' },
        { Index: 2, Text: 'Em mới làm được một phần' },
        { Index: 3, Text: 'Em chưa thử được' },
        { Index: 4, Text: 'Lần tới, em muốn làm gì? (Dùng lại / Đổi phần / Nhờ giúp / Nghỉ)' }
      ],
      Solutions: [
        {
          Title: '1. Khi em đã làm được',
          Guide:
            'Em có thể xem việc ngủ, ăn uống hoặc sinh hoạt có dễ hơn với mình không.\n\nNếu điều mình chọn đã dễ hơn, em có thể tiếp tục giữ cách này cho lần tới.'
        },
        {
          Title: '2. Khi em mới làm được một phần',
          Guide:
            'Em có thể giữ phần đã làm được và sửa một chỗ còn vướng. Ví dụ, em đã ghi việc sẽ làm ngày mai nhưng chưa dừng học được đúng giờ. Lần sau, em có thể hỏi trước xem phần nào thực sự cần làm tối nay.'
        },
        {
          Title: '3. Khi em chưa thử được',
          Guide:
            'Em có thể chọn lúc khác, thu nhỏ việc định làm hoặc nhờ một người cùng em thực hiện. Nếu muốn dừng, em có thể nghỉ và quay lại khi cần.'
        },
        {
          Title: '4. Câu 1gb. Lần tới, em muốn làm gì?',
          Guide:
            'Em chọn một trong các hướng sau cho lần tới:\n• Em muốn dùng lại cách vừa thử: Chọn một lúc cụ thể để thử lại.\n• Em muốn đổi một phần: Chọn một điều cần đổi, như báo giờ nghỉ sớm hơn hoặc tham gia một phần ngắn hơn.\n• Em muốn có người cùng giúp: Kể một việc đã thử và một điều vẫn còn khó.\n• Em muốn nghỉ ở đây: Em có thể quay lại theo điều mình cần lúc đó.\n\nKhi quay lại, em tự hỏi: “Em đã dùng lại cách nào? Sau đó, điều gì dễ hơn và điều gì vẫn còn khó?” Nếu chưa có dịp thử lại, em có thể để đến lần sau. Nếu việc ngủ, ăn uống hoặc sinh hoạt vẫn khó, em có thể nói với người đang hỗ trợ về điều còn ảnh hưởng đến em.'
        }
      ]
    },
    {
      StepIndex: 8,
      OptionText: 'Em tự thử với một tình huống mới.',
      BranchTitle: 'Em tự thử với một tình huống mới',
      Intro:
        'Em chọn một tình huống gần với điều mình vừa tập. Em có thể trả lời bằng lời của mình trước khi xem phần tự kiểm tra. Nếu muốn áp dụng ngay hoặc tìm người hỗ trợ, em có thể bỏ qua phần này.',
      Question: 'Em muốn tự tập với tình huống nào dưới đây?',
      SubOptions: [
        { Index: 1, Text: 'Tối nay có bài nộp sáng mai và việc nhóm chưa rõ hạn (1ha)' },
        { Index: 2, Text: 'Nhóm hẹn đúng giờ ăn tối khi phần của em đã xong (1hb)' },
        { Index: 3, Text: 'Muốn tham gia phần đầu sinh hoạt nhưng bạn rủ ở cả buổi (1hc)' },
        { Index: 4, Text: 'Ngày mai nộp bài, nhóm hẹn giờ ăn tối và hay học khuya (1hd)' }
      ],
      Solutions: [
        {
          Title: '1. Tình huống 1ha — Sắp xếp để dừng học đúng giờ',
          Guide:
            '• Tình huống: Tối nay em có một bài phải nộp sáng mai và một phần việc nhóm chưa rõ hạn. Em muốn dừng học vào giờ đã chọn.\n- Em sẽ làm gì trước?\n- Nếu cả hai việc đều gấp, em sẽ nhờ ai giúp điều gì?\n- Sau khi thử, em sẽ xem điều gì để biết mình đã có thời gian nghỉ?\n\n• Tự kiểm tra sau khi trả lời:\nEm xem mình đã chọn được một việc có thể làm, một cách khác nếu gặp trở ngại và một điều để kiểm tra sau khi thử chưa. Nếu câu trả lời còn chung, em chỉ cần thêm một chi tiết (ví dụ sẽ hỏi nhóm phần nào trước, hay nhờ cô chọn phần làm trước). Biết lúc nào cần nhờ người khác cùng giúp cũng là một bước em có thể chọn cho mình.'
        },
        {
          Title: '2. Tình huống 1hb — Giữ giờ ăn tối khi nhóm hẹn trùng giờ',
          Guide:
            '• Tình huống: Nhóm hẹn đúng giờ ăn tối. Phần của em đã xong và có thể gửi trước.\n- Em sẽ đề nghị cách nào?\n- Nếu nhóm cần em giải thích thêm một ý, em sẽ làm gì?\n- Sau bữa ăn, em sẽ xem lại điều gì?\n\n• Tự kiểm tra sau khi trả lời:\nEm xem mình đã chọn được một việc có thể làm, một cách khác nếu gặp trở ngại và một điều để kiểm tra sau khi thử chưa. Nếu câu trả lời còn chung, em chỉ cần thêm một chi tiết, như em sẽ gửi phần nào trước bữa ăn và báo mấy giờ sẽ quay lại.'
        },
        {
          Title: '3. Tình huống 1hc — Tham gia phần vừa sức',
          Guide:
            '• Tình huống: Em muốn tham gia phần đầu buổi sinh hoạt. Bạn muốn em ở lại cả buổi.\n- Em sẽ nói thế nào?\n- Nếu bạn vẫn rủ ở lại, em sẽ đáp gì?\n- Em sẽ dựa vào đâu để biết phần mình chọn có vừa sức?\n\n• Tự kiểm tra sau khi trả lời:\nEm xem mình đã chọn được một cách nói rõ ràng, một câu đáp giữ giới hạn nhẹ nhàng và dấu hiệu để tự đánh giá sức mình chưa. Nếu đã có cách làm mà vẫn thấy cần người đi cùng hoặc hỗ trợ, em có thể nói điều đó.'
        },
        {
          Title: '4. Tình huống 1hd — Khi nhiều việc trùng nhau cùng lúc',
          Guide:
            '• Tình huống: Ngày mai em phải nộp bài, nhóm lại muốn trao đổi vào giờ ăn tối. Mấy hôm nay em cũng thường học đến lúc định ngủ.\n- Em muốn dành thời gian cho việc nào trước?\n- Nếu giờ trao đổi của nhóm vẫn giữ nguyên, em sẽ làm gì?\n- Sau khi thử, em sẽ làm gì nếu một việc khác vẫn còn khó?\n\n• Tự kiểm tra sau khi trả lời:\nEm xem mình đã chọn được một việc ưu tiên trước, một phương án dự phòng và một người để nhờ giúp khi một việc khác vẫn còn khó chưa. Biết lúc nào cần nhờ người khác cùng giúp cũng là một bước em có thể chọn cho mình.'
        }
      ]
    }
  ]
};

const existingIndex = problems.findIndex((p) => p.Code === '1.25');
if (existingIndex !== -1) {
  problems[existingIndex] = p1_25;
  console.log('Updated existing scenario 1.25');
} else {
  problems.push(p1_25);
  console.log('Added new scenario 1.25');
}

fs.writeFileSync(dataFilePath, JSON.stringify(problems, null, 2) + '\n', 'utf8');
console.log('Total scenarios:', problems.length);
