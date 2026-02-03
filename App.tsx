
import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Instagram, 
  Stethoscope, 
  TrendingUp, 
  Users, 
  Scale, 
  Car, 
  ChevronRight,
  Mail,
  Calendar,
  Flame,
  Search,
  UserCheck,
  X,
  ArrowLeft,
  FileText,
  ShieldCheck,
  Clock,
  Image as ImageIcon
} from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

// ==========================================
// 【客戶資料管理區塊 - 這裡就是您的後台】
// ==========================================
// 只要在這裡新增客戶姓名、內容、日期與圖片網址即可。
// 格式： "客戶姓名": { content: "...", date: "...", imageUrl: "..." },

interface ClientReport {
  content: string;
  date: string;
  imageUrl: string;
}

const CLIENT_REPORTS: Record<string, ClientReport> = {
  "余忠祐": {
    content: "忠祐您好，這是為您整理的最新投資績效摘要：\n\n目前您的整體資產配置表現穩健，特別是我們去年 7 月聊過，幫你做過標的轉換。這是一整年最新績效：(新)安聯台灣科技： 累積報酬率已經來到 98.13%。總體帳戶價值：從去年 2 月初的 123,375 成長到現在的 220,309。總體帳戶價值：從去年 2 月初的 123,375 成長到現在的 220,309。整體報酬率：累計也達到了 81.27%。這就是我們定期檢視，隨時因應市場調整標的的意義。",
    date: "2025/02/03",
    imageUrl: "https://i.postimg.cc/QNS7zhP0/S-19816482.jpg" 
  },
  "王小明": {
    content: "小明您好，這是本月您的資產檢視報告。目前組合中科技股比重較高，建議分批獲利了結，轉入穩健債券標的。詳情請參閱下方的績效截圖。",
    date: "2024/04/15",
    imageUrl: "https://api.a0.dev/assets/image?text=investment%20performance%20chart%20with%20professional%20data&aspect=16:9"
  },
  // --- 在此下方新增更多客戶 ---
  "張愛麗": {
    content: "愛麗您好，這是您的年度退休計畫進度表。目前達成率為 72%，表現優於預期。",
    date: "2024/05/22",
    imageUrl: "https://api.a0.dev/assets/image?text=retirement%20plan%20progress%20chart%20dashboard&aspect=16:9"
  }
};

// ==========================================
// 【顧問基本資訊設定】
// ==========================================
const INITIAL_CONTACT: ContactInfo = {
  name: "洪薏晴",
  company: "三商美邦人壽",
  title: "RFA 退休理財規劃師",
  slogan: "用專業回應您的信任，用溫度陪伴您的日常。",
  phone: "0917979019", 
  lineId: "t-4cUJ2Op1", 
  instagramId: "ching_1777", 
  email: "ching@example.com",
  customAvatarUrl: "https://i.postimg.cc/FRw3NtDc/profile.png" 
};

// 專業服務領域清單
const SERVICES: ServiceItem[] = [
  { id: '1', title: '醫療保險', description: '保單檢視 / 理賠服務', icon: <Stethoscope size={18} />, color: 'bg-blue-500/10 text-blue-400', isPopular: true },
  { id: '2', title: '投資理財', description: '資產配置 / 現金流規劃', icon: <TrendingUp size={18} />, color: 'bg-orange-500/10 text-orange-400', isPopular: true },
  { id: '3', title: '企業團險', description: '雇主責任 / 留才計劃', icon: <Users size={18} />, color: 'bg-purple-500/10 text-purple-400' },
  { id: '4', title: '稅務規劃', description: '預留稅源 / 資產傳承', icon: <Scale size={18} />, color: 'bg-green-500/10 text-green-400' },
  { id: '5', title: '產險服務', description: '車險、火險、旅平險', icon: <Car size={18} />, color: 'bg-red-500/10 text-red-400' }
];

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all cursor-pointer group active:scale-[0.98]">
    <div className={`p-2.5 rounded-xl ${item.color} border border-current/10`}>
      {item.icon}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h4 className="text-white font-bold text-[16px] tracking-wide">{item.title}</h4>
        {item.isPopular && (
          <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/20 text-amber-500 text-[9px] font-black rounded border border-amber-500/30 tracking-widest uppercase">
            <Flame size={10} fill="currentColor" />
            Popular
          </span>
        )}
      </div>
      <p className="text-gray-400 text-[13px] mt-0.5">{item.description}</p>
    </div>
    <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
  </div>
);

const App: React.FC = () => {
  const [contact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [cacheBuster] = useState(() => Date.now());
  const [searchName, setSearchName] = useState('');
  const [reportResult, setReportResult] = useState<ClientReport | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false);

  const handleSearch = () => {
    if (!searchName.trim()) return;
    const result = CLIENT_REPORTS[searchName.trim()];
    if (result) {
      setReportResult(result);
      setSearchError(false);
      setShowReportPage(true);
    } else {
      setReportResult(null);
      setSearchError(true);
    }
  };

  const avatarSource = contact.customAvatarUrl || `./profile.jpg?t=${cacheBuster}`;

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex justify-center items-start sm:py-8 font-sans">
      <div className="w-full max-w-[420px] bg-[#0c1425] min-h-screen sm:min-h-[820px] sm:rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative border border-white/5 pb-32">
        
        {/* 全螢幕專屬報告頁面 (當搜尋成功時啟動) */}
        {showReportPage && reportResult && (
          <div className="absolute inset-0 z-[100] bg-[#0c1425] flex flex-col animate-in fade-in slide-in-from-right duration-500">
            {/* 標頭 */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
              <button 
                onClick={() => setShowReportPage(false)}
                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white font-black text-[14px] tracking-[0.2em] uppercase opacity-90">專屬資產檢視報告</h2>
              <div className="w-8"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="relative z-10">
                {/* 客戶標題 */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-[#0c1425]">
                      <UserCheck size={20} />
                    </div>
                    <h3 className="text-2xl font-black text-white">{searchName} <span className="text-sm opacity-40 font-normal">VIP 尊屬</span></h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold tracking-widest uppercase">
                    <Clock size={12} />
                    最後更新：{reportResult.date}
                  </div>
                </div>

                {/* 績效截圖展示區域 */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3 text-amber-500/70">
                    <ImageIcon size={16} />
                    <span className="text-[11px] font-black tracking-widest uppercase">績效數據截圖</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-black/40">
                    <img 
                      src={reportResult.imageUrl} 
                      alt="Performance" 
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://api.a0.dev/assets/image?text=Performance%20Screenshot%20Placeholder&aspect=16:9";
                      }}
                    />
                  </div>
                </div>

                {/* 報告文字說明 */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-10">
                  <div className="flex items-center gap-2 mb-4 text-amber-500/50">
                    <div className="h-[1px] w-4 bg-current"></div>
                    <span className="font-black text-[11px] tracking-[0.2em] uppercase">顧問分析建議</span>
                  </div>
                  <p className="text-gray-300 text-[16px] leading-relaxed whitespace-pre-line tracking-wide">
                    {reportResult.content}
                  </p>
                </div>

                {/* 底部諮詢按鈕 */}
                <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-8 mb-10 text-center">
                  <div>
                    <img src={avatarSource} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-amber-500/30" alt="" />
                    <p className="text-white font-black text-lg">{contact.name}</p>
                    <p className="text-amber-500 text-[12px] font-bold tracking-widest uppercase">{contact.title}</p>
                  </div>
                  <a 
                    href={`https://line.me/ti/p/${contact.lineId}`}
                    target="_blank"
                    className="w-full bg-[#06c755] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                  >
                    <MessageCircle size={18} fill="currentColor" />
                    對報告有疑問？立即諮詢
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 頂部圖片區域 (主頁) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#0c1425]">
          <div className="absolute inset-0 hex-pattern opacity-20"></div>
          <div className="absolute inset-0 flex items-start justify-center z-10">
            <img 
              src={avatarSource}
              alt={contact.name} 
              className="h-full w-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://api.a0.dev/assets/image?text=Professional%20Asian%20Female%20Financial%20Advisor%20Portrait&aspect=1:1";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425] via-transparent to-transparent opacity-100"></div>
          </div>
          <div className="absolute top-6 right-6 z-30">
             <div className="px-3 py-1 bg-amber-500/80 backdrop-blur-md rounded-full shadow-lg border border-white/20">
                <span className="text-[#0c1425] text-[10px] font-black tracking-widest uppercase">Certified RFA</span>
             </div>
          </div>
          <div className="absolute bottom-10 left-8 z-20 max-w-[280px]">
             <h1 className="text-5xl font-black text-white tracking-tighter mb-1 drop-shadow-2xl">
               {contact.name}
             </h1>
             <div className="space-y-1">
               <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-[#0c1425] px-2 py-0.5 rounded text-[12px] font-black uppercase tracking-tight shadow-lg">
                    {contact.company}
                  </span>
               </div>
               <p className="text-gray-200 text-sm font-bold tracking-wide">
                 {contact.title}
               </p>
             </div>
          </div>
        </div>

        {/* 主頁內容區塊 */}
        <div className="px-6 flex-1 bg-[#0c1425] relative z-30">
          <div className="pb-8 pt-6">
             <p className="text-gray-400 text-[15px] leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
               "{contact.slogan}"
             </p>
          </div>

          {/* 快速聯繫 */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            <a href={`tel:${contact.phone}`} className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-amber-500 rounded-2xl text-[#0c1425] shadow-lg shadow-amber-500/20 group-active:scale-95 transition-all">
                <Phone size={24} strokeWidth={2.5} />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">電話</span>
            </a>
            <a href={`https://line.me/ti/p/${contact.lineId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#06c755] group-active:scale-95 transition-all">
                <MessageCircle size={24} fill="currentColor" />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">LINE</span>
            </a>
            <a href={`https://www.instagram.com/${contact.instagramId}`} target="_blank" className="flex flex-col items-center gap-2 group">
              <div className="w-full h-14 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-2xl text-[#e4405f] group-active:scale-95 transition-all">
                <Instagram size={24} />
              </div>
              <span className="text-white text-[12px] font-bold opacity-60 uppercase tracking-tighter">IG</span>
            </a>
          </div>

          {/* 績效查詢 (搜尋框) */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase opacity-80">客戶專屬績效查詢</h3>
               <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="請輸入您的姓名查詢報告" 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-[15px] focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-amber-500 rounded-xl text-[#0c1425] hover:bg-amber-400 active:scale-95 transition-all"
              >
                <Search size={20} />
              </button>
            </div>
            {searchError && (
              <div className="mt-3 text-red-400/80 text-[12px] px-2 flex items-center gap-2 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                查無此姓名，請聯繫顧問洪薏晴確認。
              </div>
            )}
          </div>

          {/* 服務列表 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase opacity-80">專業服務領域</h3>
               <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
            </div>
            {SERVICES.map(service => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </div>
        </div>

        {/* 底部懸浮按鈕 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0c1425] via-[#0c1425] to-transparent backdrop-blur-xl z-50">
          <a 
            href={`https://line.me/ti/p/${contact.lineId}`}
            target="_blank"
            className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3.5 rounded-xl font-bold text-[16px] shadow-[0_10px_25px_rgba(6,199,85,0.2)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <Calendar size={18} />
            立即預約面談
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
