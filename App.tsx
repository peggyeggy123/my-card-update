
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
  Image as ImageIcon,
  ChevronDown,
  Target,
  Activity,
  Award
} from 'lucide-react';
import { ServiceItem, ContactInfo } from './types';

// ==========================================
// 【客戶資料管理區塊 - 這裡就是您的後台】
// ==========================================

interface ReportSection {
  title: string;
  content: string;
}

interface CategoryData {
  date: string;
  imageUrl: string;
  sections: ReportSection[];
}

interface ClientReport {
  password: string; // 每位客戶獨立的解鎖密碼
  investment: CategoryData;
  medical: CategoryData;
}

const CLIENT_REPORTS: Record<string, ClientReport> = {
  "余忠祐": {
    password: "WTYP", 
    investment: {
      date: "2025/02/03",
      imageUrl: "https://i.postimg.cc/QNS7zhP0/S-19816482.jpg",
      sections: [
        {
          title: "績效總結回顧",
          content: "忠祐您好，這是為您整理的最新投資績效摘要。目前您的整體資產配置表現穩健，特別是我們去年 7 月做的標的轉換，現在看來是非常正確的決定。"
        },
        {
          title: "核心持股表現",
          content: "「(新)安聯台灣科技」表現最為亮眼，累積報酬率已來到 98.13%。總體帳戶價值從去年 2 月初的 123,375 成長到現在的 220,309。"
        },
        {
          title: "我的建議",
          content: "整體報酬率累計已達 81.27%。這體現了我們定期檢視、隨時因應市場調整標的的意義。目前科技產業長線動能還是很強，既然已經抓對了趨勢，建議可以多提撥一點資金，再累積更大的本金，未來獲利會更明顯。"
        }
      ]
    },
    medical: {
      date: "2025/02/03",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
  },
  "葉天暐": {
    password: "PGJE", 
    investment: {
      date: "2025/02/03",
      imageUrl: "https://i.postimg.cc/85tf3g40/S-19832835.jpg",
      sections: [
        {
          title: "績效總結回顧",
          content: "天暐您好，這是為您整理的最新投資績效摘要。目前您的整體資產配置表現相當穩健！"
        },
        {
          title: "核心持股表現",
          content: "「安聯台灣大壩」表現相當亮眼，累積報酬率已來到 122.56%。總體帳戶價值從去年 2 月初的 89,495 成長到現在的 175,810。"
        },
        {
          title: "我的建議",
          content: "目前科技產業長線動能還是稱強，我們已經抓對了趨勢，恭喜您也在今年多提撥一點資金，讓組合更完整。持續定期定額，讓時間幫我們複利！"
        }
      ]
    },
    medical: {
      date: "2025/02/03",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
  },
  "蘇暐翔": {
    password: "HFWP", 
    investment: {
      date: "2025/02/04",
      imageUrl: "https://i.postimg.cc/3JnFr1VL/IMG-0226.jpg",
      sections: [
        {
          title: "績效總結回顧",
          content: "暐翔您好，年前特別為您更新定期定額績效。在過去一年的市場波動中，目前您的整體資產配置表現相當亮眼！這就是堅持長期投資最好的回報！"
        },
        {
          title: "核心持股表現",
          content: "目前標的連結50%台股+50%美股基金，其中「安聯台灣大壩」，這檔台股基金累積報酬率已來到 114.41%。總體帳戶價值從去年 2 月初的 142,160 成長到現在的 285,437。"
        },
        {
          title: "我的建議",
          content: "很開心能陪您一起見證這段時間的資產成長，這證明了我們當時的堅持是正確的！目前科技產業的長線動能還是很強，我們已經抓對了趨勢，可以善用年終紅包加碼，累積更多本金。除了守住原本的獲利，也配置一些不同標的來讓組合更完整。持續定期定額，讓時間幫我們複利！"
        }
      ]
    },
    medical: {
      date: "2025/02/04",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
  },
  "王韻雅": {
    password: "DVUL", 
    investment: {
      date: "2025/02/04",
      imageUrl: "https://i.postimg.cc/KzKS20YM/IMG-0227.jpg",
      sections: [
        {
          title: "績效總結回顧",
          content: "Coco您好，年前特別為您更新定期定額績效。還記得2023年市場最震盪的時候嗎。我知道您也懷疑過，甚至有過想放棄的念頭。"
        },
        {
          title: "核心持股表現",
          content: "目前標的連結50%台股+50%美股基金，其中「安聯台灣大壩」，這檔台股基金累積報酬率已來到 109.87%。總體帳戶價值從去年 2 月初的 127,037 成長到現在的 269,959。"
        },
        {
          title: "我的建議",
          content: "很開心能陪您一起見證這段時間的資產成長，這證明了我們當時的堅持與選擇是正確的！目前科技產業的長線動能還是很強，我們已經抓對了趨勢，可以善用年終紅包加碼，累積更多本金。除了守住原本的獲利，也配置一些不同標的來讓組合更完整。持續定期定額，讓時間幫我們複利！"
        }
      ]
    },
    medical: {
      date: "2025/02/04",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
  },
 "黃志宇": {
    password: "NFLW", 
    investment: {
      date: "2025/02/04",
      imageUrl: "https://i.postimg.cc/K8YyFvVM/IMG-0242.avif",
      sections: [
        {
          title: "績效總結回顧",
          content: "志宇您好，年前特別為您更新定期定額績效。在過去一年的市場波動中，目前您的整體資產配置表現相當亮眼！這就是堅持長期投資最好的回報！"
        },
        {
          title: "核心持股表現",
          content: "目前標的連結50%台股+50%美股基金，其中「安聯台灣大壩」，這檔台股基金累積報酬率已來到 123.41%。總體帳戶價值從去年 2 月初的 121,468 成長到現在的 257,912。"
        },
        {
          title: "我的建議",
          content: "很開心能陪您一起見證這段時間的資產成長，這證明了我們當時的選擇是正確的！目前科技產業的長線動能還是很強，已經抓對了趨勢，可以善用年終紅包加碼，累積更多本金。除了守住原本的獲利，也配置一些不同標的來讓組合更完整。持續定期定額，讓時間幫我們複利！"
        }
      ]
    },
    medical: {
      date: "2025/02/04",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
  },"張慎紘": {
    password: "JENO", 
     investment: {
      date: "2025/02/03",
      imageUrl: "https://i.postimg.cc/wT2mxT45/S-19832845.jpg",
      sections: [
        {
          title: "績效總結回顧",
          content: "慎紘您好，這是為您整理的最新投資績效摘要。目前您的整體資產配置表現相當穩健！"
        },
        {
          title: "核心持股表現",
          content: "「安聯台灣大壩」表現相當亮眼，累積報酬率已來到 122.82%。總體帳戶價值從去年 2 月初的 258,534 成長到現在的 455,692。"
        },
        {
          title: "我的建議",
          content: "目前科技產業長線動能還是很強，我們已經抓對了趨勢，可以善用年終紅包加碼，累積更多本金。除了守住原本的獲利，也配置一些不同標的來讓組合更完整。持續定期定額，讓時間幫我們複利！"
        }
      ]
    },
    medical: {
      date: "2025/02/03",
      imageUrl: "無",
      sections: [
        {
          title: "醫療保險資料",
          content: "無"
        }
      ]
    }
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

const SERVICES: ServiceItem[] = [
  { id: '1', title: '醫療保險', description: '保單檢視 / 理賠服務', icon: <Stethoscope size={18} />, color: 'bg-blue-500/10 text-blue-400', isPopular: true },
  { id: '2', title: '投資理財', description: '資產配置 / 現金流規劃', icon: <TrendingUp size={18} />, color: 'bg-orange-500/10 text-orange-400', isPopular: true },
  { id: '3', title: '企業團險', description: '雇主責任 / 留才計劃', icon: <Users size={18} />, color: 'bg-purple-500/10 text-purple-400' },
  { id: '4', title: '稅務規劃', description: '預留稅源 / 資產傳承', icon: <Scale size={18} />, color: 'bg-green-500/10 text-green-400' },
  { id: '5', title: '產險服務', description: '車險、火險、旅平險', icon: <Car size={18} />, color: 'bg-red-500/10 text-red-400' }
];

const App: React.FC = () => {
  const [contact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [cacheBuster] = useState(() => Date.now());
  const [searchName, setSearchName] = useState('');
  const [reportResult, setReportResult] = useState<ClientReport | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'investment' | 'medical'>('investment');
  const [foundClientName, setFoundClientName] = useState('');

  const handleSearch = () => {
    const input = searchName.trim();
    if (!input) return;

    // 搜尋邏輯：檢查輸入是否等於「客戶姓名 + 該客戶自定義密碼」
    const entry = Object.entries(CLIENT_REPORTS).find(([name, data]) => {
      return input === name + data.password;
    });

    if (entry) {
      const [name, data] = entry;
      setReportResult(data);
      setFoundClientName(name); 
      setSearchError(false);
      setActiveCategory('investment');
      setShowReportPage(true);
    } else {
      setReportResult(null);
      setSearchError(true);
    }
  };

  const avatarSource = contact.customAvatarUrl || `./profile.jpg?t=${cacheBuster}`;

  const currentCategoryData = reportResult ? reportResult[activeCategory] : null;

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex justify-center items-start sm:py-8 font-sans">
      <div className="w-full max-w-[420px] bg-[#0c1425] min-h-screen sm:min-h-[820px] sm:rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative border border-white/5 pb-32">
        
        {/* 全螢幕專屬報告頁面 */}
        {showReportPage && reportResult && currentCategoryData && (
          <div className="absolute inset-0 z-[100] bg-[#0c1425] flex flex-col animate-in fade-in slide-in-from-right duration-500">
            {/* 標頭 */}
            <div className="px-6 py-6 flex items-center justify-between border-b border-white/5 bg-white/[0.02] backdrop-blur-xl sticky top-0 z-50">
              <button 
                onClick={() => setShowReportPage(false)}
                className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-white font-black text-[14px] tracking-[0.2em] uppercase opacity-90">專屬資產檢視報告</h2>
              <div className="w-8"></div>
            </div>

            {/* 分類切換器 */}
            <div className="px-6 mt-6">
              <div className="flex bg-white/5 p-1.5 rounded-2xl gap-2 border border-white/5 shadow-inner">
                <button 
                  onClick={() => setActiveCategory('investment')}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold text-sm ${
                    activeCategory === 'investment' 
                      ? 'bg-amber-500 text-[#0c1425] shadow-lg scale-[1.02]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TrendingUp size={16} />
                  投資理財
                </button>
                <button 
                  onClick={() => setActiveCategory('medical')}
                  className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold text-sm ${
                    activeCategory === 'medical' 
                      ? 'bg-blue-500 text-white shadow-lg scale-[1.02]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Stethoscope size={16} />
                  醫療保險
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8" key={activeCategory}>
              <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${activeCategory === 'investment' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                      {activeCategory === 'investment' ? <TrendingUp size={20} /> : <Activity size={20} />}
                    </div>
                    <h3 className="text-2xl font-black text-white">{foundClientName} <span className="text-sm opacity-40 font-normal">VIP 尊屬</span></h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold tracking-widest uppercase">
                    <Clock size={12} />
                    最後更新：{currentCategoryData.date}
                  </div>
                </div>

                {currentCategoryData.imageUrl !== "無" && (
                  <div className="mb-10">
                    <div className={`flex items-center gap-2 mb-4 ${activeCategory === 'investment' ? 'text-amber-500/70' : 'text-blue-500/70'}`}>
                      <ImageIcon size={16} />
                      <span className="text-[11px] font-black tracking-widest uppercase italic">
                        {activeCategory === 'investment' ? 'Market Performance Snapshot' : 'Protection Coverage Snapshot'}
                      </span>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-black/40">
                      <img 
                        src={currentCategoryData.imageUrl} 
                        alt="Report Data" 
                        className="w-full h-auto object-cover min-h-[180px]"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`h-[1px] w-8 ${activeCategory === 'investment' ? 'bg-amber-500/50' : 'bg-blue-500/50'}`}></div>
                    <span className={`font-black text-[11px] tracking-[0.2em] uppercase ${activeCategory === 'investment' ? 'text-amber-500/80' : 'text-blue-500/80'}`}>
                      顧問專業深度分析
                    </span>
                  </div>

                  {currentCategoryData.sections.map((section, idx) => (
                    <div key={idx} className="group animate-in slide-in-from-bottom duration-500 fill-mode-both" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 transition-all group-hover:bg-white/[0.05] group-hover:border-white/10">
                        <div className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-50 ${activeCategory === 'investment' ? 'bg-gradient-to-b from-amber-500 to-transparent' : 'bg-gradient-to-b from-blue-500 to-transparent'}`}></div>
                        
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`mt-1 p-1 rounded-lg ${activeCategory === 'investment' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                             <Target size={14} />
                          </div>
                          <h4 className="text-white font-black text-[17px] tracking-wide">{section.title}</h4>
                        </div>
                        <p className="text-gray-400 text-[15px] leading-relaxed pl-8">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-8 flex flex-col items-center animate-in fade-in zoom-in duration-1000 delay-500 fill-mode-both">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                      <span className="text-amber-500 font-black text-xl tracking-[0.3em] drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                        祝您新年快樂
                      </span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                    </div>
                    <p className="text-gray-500 text-[12px] font-medium tracking-widest uppercase opacity-60 italic">Happy New Year & Best Wishes</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6 border-t border-white/5 pt-10 mb-10 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
                    <img src={avatarSource} className="relative w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-amber-500/30" alt="" />
                    <p className="text-white font-black text-xl mb-1">{contact.name}</p>
                    <p className="text-amber-500 text-[12px] font-bold tracking-widest uppercase mb-6">{contact.title}</p>
                  </div>
                  <a 
                    href={`https://line.me/ti/p/${contact.lineId}`}
                    target="_blank"
                    className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_15px_30px_rgba(6,199,85,0.2)]"
                  >
                    <MessageCircle size={22} fill="currentColor" />
                    立即與顧問預約聊聊
                  </a>
                  <p className="text-gray-500 text-[11px] font-medium tracking-widest uppercase">
                    Personal Financial Analysis Report © {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 主頁大頭貼部分 */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#0c1425]">
          <div className="absolute inset-0 hex-pattern opacity-20"></div>
          <div className="absolute inset-0 flex items-start justify-center z-10">
            <img 
              src={avatarSource}
              alt={contact.name} 
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1425] via-transparent to-transparent opacity-100"></div>
          </div>
          
          <div className="absolute top-6 right-6 z-30">
             <div className="px-3 py-1 bg-amber-500/80 backdrop-blur-md rounded-full shadow-lg border border-white/20">
                <span className="text-[#0c1425] text-[10px] font-black tracking-widest uppercase">Certified RFA</span>
             </div>
          </div>

          <div className="absolute bottom-10 left-8 z-20 max-w-[280px]">
             <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl mb-1 animate-in fade-in slide-in-from-bottom-2 duration-1000">
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
               {/* 服務年資：維持在 RFA 下方的白字樣式 */}
               <p className="text-gray-400 text-[11px] font-black tracking-[0.2em] uppercase opacity-70 mt-1">
                 服務年資：6年
               </p>
             </div>
          </div>
        </div>

        {/* 主頁內容 */}
        <div className="px-6 flex-1 bg-[#0c1425] relative z-30">
          <div className="pb-8 pt-6">
             <p className="text-gray-400 text-[15px] leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
               "{contact.slogan}"
             </p>
          </div>

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

          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase opacity-80">客戶專屬績效查詢</h3>
               <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="請輸入專屬服務識別碼" 
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
                識別內容有誤，請聯繫顧問洪薏晴進行確認。
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-white font-black text-[13px] tracking-[0.2em] uppercase opacity-80">專業服務領域</h3>
               <div className="h-[1px] flex-1 bg-white/10 ml-4"></div>
            </div>
            {SERVICES.map(service => (
              <div key={service.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all cursor-pointer group active:scale-[0.98]">
                <div className={`p-2.5 rounded-xl ${service.color} border border-current/10`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold text-[16px] tracking-wide">{service.title}</h4>
                    {service.isPopular && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-500/20 text-amber-500 text-[9px] font-black rounded border border-amber-500/30 tracking-widest uppercase">
                        <Flame size={10} fill="currentColor" />
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-[13px] mt-0.5">{service.description}</p>
                </div>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0c1425] via-[#0c1425] to-transparent backdrop-blur-xl z-50">
          <a 
            href={`https://line.me/ti/p/${contact.lineId}`}
            target="_blank"
            className="w-full bg-[#06c755] hover:bg-[#05b34c] text-white py-3.5 rounded-xl font-bold text-[16px] shadow-[0_10px_25px_rgba(6,199,85,0.2)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all relative overflow-hidden group"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full skew-x-[-20deg] group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <Calendar size={18} />
            預約聊聊
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
