import React, { useState } from 'react';
import { 
  HelpCircle, 
  Lightbulb, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Sparkles,
  Smile
} from 'lucide-react';
import { soundFx } from '../lib/sound';

const FAQS = [
  {
    q: 'Mình mắc lỗi nhiều lần ở cùng một dạng bài, có phải mình học kém không?',
    a: 'Hoàn toàn không. Lặp lại một lỗi chỉ có nghĩa là có một mắt xích nhỏ trong cách hiểu trước đó chưa được gỡ đúng chỗ. Khi tách riêng bước bị vướng và làm lại 1 ví dụ thật chậm, não bộ sẽ ghi nhớ cách đúng rất chắc chắn.'
  },
  {
    q: 'Làm sao để không thấy sợ hay ngại khi đọc nhận xét của thầy cô?',
    a: 'Hãy thử coi lời nhận xét giống như “bản đồ chỉ đường” thay vì lời phán xét con người bạn. Thầy cô chỉ ra chỗ chưa khớp để bạn biết chính xác mình cần chỉnh ở đâu, giúp bạn đỡ mất công đoán mò và tiến bộ nhanh hơn.'
  },
  {
    q: 'Khi quá nhiều bài dồn lại và đầu óc trống rỗng, mình nên làm gì trước?',
    a: 'Đừng cố giải quyết tất cả cùng một lúc. Hãy bấm nút “Hạ nhiệt 60s” để thở đều, uống một ngụm nước, sau đó chọn duy nhất 1 việc nhỏ mất dưới 5 phút (ví dụ: mở vở đọc lại đề bài và gạch chân 2 từ khóa chính).'
  }
];

const MOODS = [
  {
    id: 'worried',
    emoji: '🌧️',
    label: 'Hơi lo lắng',
    desc: 'Sợ điểm số hoặc sai sót',
    response: '🌧️ Cảm giác hồi hộp trước điểm số chứng tỏ bạn rất quan tâm đến việc học của mình. Hãy nhớ rằng điểm số chỉ là thông tin phản hồi để biết mình cần chỉnh ở đâu — giá trị của bạn luôn lớn hơn mọi con số!'
  },
  {
    id: 'confused',
    emoji: '🌫️',
    label: 'Đang rối bời',
    desc: 'Chưa biết bắt đầu từ đâu',
    response: '🌫️ Khi mọi thứ rối tung, bạn không cần gỡ hết trong 5 phút. Chỉ cần chọn 1 tình huống phía trên và đọc Bước 1 thôi, sương mù sẽ tan dần từng chút một.'
  },
  {
    id: 'tired',
    emoji: '🍂',
    label: 'Hơi oải & thiếu lực',
    desc: 'Khó tập trung vào bàn học',
    response: '🍂 Nếu hôm nay bạn thấy mệt mỏi, hãy cho phép mình học với tốc độ chậm lại. Uống một ngụm nước ấm, thở đều 60 giây và chỉ làm một phần thật nhỏ vừa sức nhé.'
  },
  {
    id: 'hopeful',
    emoji: '🌱',
    label: 'Sẵn sàng thử từng chút',
    desc: 'Muốn hiểu rõ bài hơn',
    response: '🌱 Thật tuyệt vì bạn đang giữ tinh thần cởi mở! Hãy chọn một nút thắt bạn muốn làm rõ hôm nay — từng bước nhỏ của bạn đang tạo nên sự thay đổi rất bền vững.'
  }
];

export default function QuickSupport({ onOpenBreathModal }) {
  const [activeTab, setActiveTab] = useState('faq'); // 'faq' | 'tips' | 'mood'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState(null);

  const handleTabChange = (tab) => {
    soundFx.playChime();
    setActiveTab(tab);
  };

  const toggleFaq = (index) => {
    soundFx.playChime();
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const handleSelectMood = (mood) => {
    soundFx.playChime();
    setSelectedMood(mood);
  };

  return (
    <div className="mt-12 sm:mt-16 bg-white dark:bg-[#1c2b33] rounded-3xl border-2 border-slate-200 dark:border-[#37464f] shadow-[0_4px_0_#e2e8f0] dark:shadow-none p-5 sm:p-8 transition-colors">
      
      {/* Header khu vực */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b-2 border-slate-100 dark:border-[#2b3c46]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 dark:bg-[#2d1f47] text-purple-700 dark:text-[#c084fc] text-xs font-black border border-purple-200 dark:border-[#581c87]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Góc tiếp sức tinh thần</span>
          </span>
          <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-[#e6eef2] tracking-tight mt-1.5">
            Hỗ trợ nhanh khi bạn cần một điểm tựa
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa5b1] font-medium mt-0.5">
            Giải tỏa lo lắng, mẹo học nhẹ nhàng và không gian chia sẻ cảm xúc
          </p>
        </div>

        {/* 3 Tab chọn kiểu Duolingo 3D */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-[#243640] border border-slate-200 dark:border-[#37464f] self-start md:self-auto gap-1">
          {[
            { id: 'faq', label: 'Hỏi đáp thường gặp', icon: HelpCircle },
            { id: 'tips', label: 'Mẹo học 5 phút', icon: Lightbulb },
            { id: 'mood', label: 'Chạm cảm xúc', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-[0_2px_0_#1d4ed8]'
                    : 'text-slate-600 dark:text-[#8fa5b1] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* NỘI DUNG TAB 1: CÂU HỎI THƯỜNG GẶP (FAQ ACCORDION) */}
      {activeTab === 'faq' && (
        <div className="pt-6 space-y-3 animate-in fade-in duration-200">
          {FAQS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border-2 border-slate-200 dark:border-[#37464f] bg-slate-50/70 dark:bg-[#243640]/70 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-black text-xs sm:text-sm text-slate-800 dark:text-[#e6eef2] hover:text-blue-600 dark:hover:text-[#1cb0f6] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-[#12384a] text-blue-600 dark:text-[#1cb0f6] flex items-center justify-center text-xs shrink-0 font-bold">
                      ?
                    </span>
                    <span>{item.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-[#d1e1ea] font-medium leading-relaxed border-t border-slate-200/60 dark:border-[#37464f] bg-white/60 dark:bg-[#1c2b33]/60 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* NỘI DUNG TAB 2: MẸO HỌC NHẸ NHÀNG (TIPS) */}
      {activeTab === 'tips' && (
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
          
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-[#12384a]/50 border-2 border-blue-200 dark:border-[#1c7aa6] space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-[0_2px_0_#1d4ed8]">
              5'
            </div>
            <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-[#e6eef2]">
              Quy tắc 5 phút mở đầu
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] leading-relaxed font-medium">
              Tự nhủ: “Mình chỉ cần ngồi vào bàn và làm thử đúng 5 phút thôi, xong nếu mệt có thể nghỉ”. Vượt qua phút đầu tiên là phần khó nhất đã qua.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#133929]/50 border-2 border-emerald-200 dark:border-[#226744] space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_2px_0_#059669]">
              <Edit3 className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-[#e6eef2]">
              Dịch nhận xét thành 1 việc nhỏ
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] leading-relaxed font-medium">
              Thay vì đọc cả đoạn nhận xét dài và thấy rối, hãy khoanh tròn đúng 1 câu cần sửa trước, viết lại câu đó ra giấy nháp rồi mới sang ý tiếp theo.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-[#322714]/50 border-2 border-amber-200 dark:border-[#634b1a] space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-[0_2px_0_#b45309]">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-[#e6eef2]">
              Chia 20 phút học – 5 phút thở
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] leading-relaxed font-medium">
              Não bộ tiếp thu tốt nhất khi có quãng nghỉ ngắn. Sau 20 phút tập trung, hãy đứng dậy vươn vai và nhìn ra xa khoảng 5 phút để mắt thư giãn.
            </p>
          </div>

        </div>
      )}

      {/* NỘI DUNG TAB 3: CHIA SẺ CẢM XÚC (MOOD CHECK-IN) */}
      {activeTab === 'mood' && (
        <div className="pt-6 space-y-5 animate-in fade-in duration-200">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8fa5b1] font-medium">
            Hôm nay lòng bạn đang mang cảm giác nào? Chạm vào một biểu tượng bên dưới để nhận lời nhắn riêng cho bạn nhé:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {MOODS.map((mood) => {
              const isSelected = selectedMood?.id === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleSelectMood(mood)}
                  className={`p-4 rounded-2xl border-2 text-left space-y-1.5 transition-all cursor-pointer btn-3d ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 dark:bg-[#12384a] shadow-[0_3px_0_#1d4ed8] scale-102'
                      : 'border-slate-200 dark:border-[#37464f] bg-slate-50 dark:bg-[#243640] shadow-[0_2px_0_#cbd5e1] dark:shadow-none hover:border-blue-300'
                  }`}
                >
                  <span className="text-2xl block">{mood.emoji}</span>
                  <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-[#e6eef2] block">
                    {mood.label}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-[#8fa5b1] block font-medium">
                    {mood.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Khối phản hồi ấm áp từ StudyZen */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 dark:from-[#231a38] dark:via-[#1e2a3a] dark:to-[#172b38] border-2 border-purple-200 dark:border-[#581c87] text-xs sm:text-sm text-slate-800 dark:text-[#e6eef2] leading-relaxed font-medium">
            {selectedMood ? (
              <div className="animate-in fade-in duration-300">
                <span className="font-black text-purple-700 dark:text-[#c084fc] block mb-1">💬 Lời nhắn dành cho bạn:</span>
                {selectedMood.response}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-purple-500 shrink-0" />
                <span>
                  <strong>StudyZen nhắn bạn:</strong> Dù hôm nay tâm trạng của bạn đang ở mức nào, việc bạn ghé vào đây để tìm cách hiểu bài hơn đã là một nỗ lực rất đáng tự hào rồi.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}