import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/sound';
import { 
  Trees, 
  MapPin, 
  Eye, 
  Compass, 
  Camera, 
  ScrollText, 
  Layers, 
  Fingerprint, 
  UserCheck, 
  HelpCircle, 
  BookOpen, 
  Calendar, 
  Activity, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sun,
  Moon,
  Gamepad2,
  Lock,
  Heart,
  CloudRain,
  Wind,
  Snowflake,
  Smile
} from 'lucide-react';

export function ChapterThree() {
  const [activeSection, setActiveSection] = useState<'overview' | 'flow' | 'story' | 'reflection'>('overview');
  const [activeInsight, setActiveInsight] = useState<number>(0);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  // --- Interactive Squirrel & Pinecone Playground States ---
  const [squirrelState, setSquirrelState] = useState<'idle' | 'curious' | 'eating' | 'jumping'>('idle');
  const [friendshipScore, setFriendshipScore] = useState<number>(30); // start at 30%
  const [droppedPinecones, setDroppedPinecones] = useState<{ id: number; x: number; isEaten: boolean; y: number; type: 'hazelnut' | 'peanut' | 'pinecone' }[]>([]);
  const [bubblesText, setBubblesText] = useState<string>("Squeak! Click me or click the branch/button to feed! 🐿️");
  const [selectedFood, setSelectedFood] = useState<'hazelnut' | 'peanut' | 'pinecone'>('hazelnut');
  const [squirrelX, setSquirrelX] = useState<number>(75);
  const [gameLogs, setGameLogs] = useState<string[]>([
    "[System] Ecosystem link established. Wild squirrel 'Momo' is cuddled in the tree nest.",
    "[系统] 传感器已连通。智能装置显示远端户外松鼠‘Momo’正活跃于窗外香樟树冠。"
  ]);
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'windy' | 'snowy'>('sunny');
  const [squirrelMood, setSquirrelMood] = useState<'happy' | 'curious' | 'cozy' | 'playful'>('happy');

  const squirrelDialogues: Record<string, Record<string, string>> = {
    sunny: {
      happy: "Squeak! The sunshine makes my orange tail glow so beautifully! ☀️ (太阳暖烘烘的，照得我的红毛蓬松又亮丽！)",
      curious: "Sniff sniff... The warm sun releases the sweet resin smell of camphor leaves! (阳光烤出了香樟树叶的油脂甜香，真好闻！)",
      cozy: "Heheh, warm stones are the best for taking a mini midday nap. Zzz... (躺在温热的石头上打个小盹，太惬意了~)",
      playful: "Look at me! Shaking tree shadows is my favorite game! 🌳✨ (看我！在斑驳的树影里捉迷藏，你抓不到我吧！)"
    },
    rainy: {
      happy: "Pitter-patter! Water droplets are like music on my oak-leaf roof! 🌧️ (雨点打在橡树叶上，像森林里的打击乐！)",
      curious: "I see worms crawling out of the soft damp soil! So interesting! (湿润的泥土里钻出了小虫子，好神奇！)",
      cozy: "I love staying cozy inside our digital nest, tail wrapped tight! (抱着大尾巴缩在暖和的窝里避雨，幸福指数加倍！)",
      playful: "Wheee! Splashing in small puddles when running for a hazelnut! (水花四溅！在雨水洼里跳跃，我是丛林雨行侠！)"
    },
    windy: {
      happy: "Sussurating wind! Shaking tree seeds are dropping all by themselves! 🍃 (大风刮过，好多植物种子自己掉下来了，省力气！)",
      curious: "Whoa! The wind brought a fascinating smell from the deep mountains! (哇！这阵强风带来了深山老林里松针的气味，好兴奋！)",
      cozy: "Bracing against the breeze! My tufted ears are pointing into the draft! (风大啦！压低脑袋，耳朵上的长绒毛倒向一边，可爱吧！)",
      playful: "Wheee! I'm surfing on the swaying branches! Full coordination check! (在狂风中荡秋千！看我的超级平衡力！)"
    },
    snowy: {
      happy: "Snow sparkles! The forest looks like white powdered sugar! ❄️ (下雪啦！森林变成了撒满白糖的小甜点，真好看。)",
      curious: "I wonder if my buried hazelnuts are still safe under this thick snow blanket? (我秋天埋在泥土里的坚果，藏在这层白雪下还能找到吗？)",
      cozy: "Burrowing inside the warm cedar-wood shavings! Heart rate slowing... Zzz... (在温暖的杉木屑里蜷缩成一个毛茸茸的圆球，冬眠中~)",
      playful: "Catching individual snowflakes on my nose! It cold-tickles! ❄️❣ (用粉嫩的小鼻子接雪花，凉滋滋地直打喷嚏！)"
    }
  };
  
  // --- Storyboard Media Previews State (Supports local image/GIF uploads) ---
  const [storyboardMedia, setStoryboardMedia] = useState<Record<number, string>>({});

  const triggerFeed = (targetX: number, foodType: 'hazelnut' | 'peanut' | 'pinecone') => {
    if (squirrelState === 'eating' || squirrelState === 'jumping') return;

    const newId = Date.now();
    setDroppedPinecones(prev => [...prev, { id: newId, x: targetX, isEaten: false, y: -20, type: foodType }]);
    
    const foodNames = {
      hazelnut: "🌰 Roasted Hazelnut (香烤榛子)",
      peanut: "🥜 Small Peanut (有机花生)",
      pinecone: "🍄 Forest Pinecone (落叶松果)"
    };
    
    const remarks = {
      hazelnut: "Squeak! I smell toasted hazelnuts! 🌰 Scurrying over! (闻到了榛子的油脂香气，跑过来！)",
      peanut: "Crunchy peanuts! Shell peeling time! 🥜 Run run run! (花生！连壳剥开最解馋了！)",
      pinecone: "A golden pinecone! Cozy winter stash! 🍄 Yahoo! (沉甸甸的松果掉下来了！大丰收！)"
    };
    
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setGameLogs(prev => [
      `[${nowStr}] [Drop] Triggered sensor. A ${foodNames[foodType]} dropped onto coord ${Math.round(targetX)}%.`,
      `[${nowStr}] [投放] 触发传感器。一颗 ${foodNames[foodType]} 掉落在 ${Math.round(targetX)}% 的土壤上。`,
      ...prev
    ].slice(0, 7));

    soundManager.playClick();
    
    // Phase 1: Turn and run to food!
    setSquirrelState('curious');
    setBubblesText(remarks[foodType]);
    setSquirrelX(targetX);
    
    // Phase 2: Reach and start eating
    setTimeout(() => {
      setSquirrelState('eating');
      soundManager.playSwipe();
      
      const eatTexts = {
        hazelnut: "Nibble nibble... This hazelnut kernel is buttery and rich! 🌰✨ (发出咔哒咔哒啃榛子的声音)",
        peanut: "Snack snack... Peanuts are perfectly crispy! 🥜🧡 (小爪子抱着花生剥个不停)",
        pinecone: "Claw claw... Rolling this big pinecone around! 🍄💎 (正在开心地剥坚硬松果)"
      };
      setBubblesText(eatTexts[foodType]);

      // Phase 3: Finish eating and jump
      setTimeout(() => {
        // mark as eaten
        setDroppedPinecones(prev => prev.map(p => p.id === newId ? { ...p, isEaten: true } : p));
        
        const scoreInc = foodType === 'hazelnut' ? 10 : foodType === 'peanut' ? 15 : 25;
        setFriendshipScore(s => Math.min(100, s + scoreInc));
        setSquirrelState('jumping');
        soundManager.playSwipe();
        
        const finishTexts = {
          hazelnut: "Wonderful! Co-living empathy is increasing! 🧡 (+10 Empathy Index)",
          peanut: "Yummy! Momo is nodding in approval! 🥜❣ (+15 Empathy Index)",
          pinecone: "Ecosystem affinity maximized! Total mutual adaptation! 🌲 (+25 Empathy Index)"
        };
        setBubblesText(finishTexts[foodType]);
        
        setGameLogs(prev => [
          `[${nowStr}] [Eat] Momo enjoyed the snack. Empathy index increased by +${scoreInc}%.`,
          `[${nowStr}] [摄食] Momo 满足地吃完了它。人与动物生态指数提升了 +${scoreInc}%。`,
          ...prev
        ].slice(0, 7));

        // Phase 4: Idle back
        setTimeout(() => {
          setSquirrelState('idle');
          setBubblesText("Squeak! I'm still near. Throw more items or click me of custom remarks! 🐿️");
        }, 1200);

      }, 1400);

    }, 800);
  };

  const mainMetadata = [
    { label: "Project Type", value: "Long-term Living Experiment", zh: "长期生活实验" },
    { label: "Theme", value: "Human–Animal Co-living Interaction", zh: "人与动物共居交互研究" },
    { label: "My Role", value: "Experimental Subject & Research Assistant", zh: "实验参与者 / 研究协助者" },
    { label: "Duration", value: "Multi-week Continuous Observation", zh: "数周持续观察" },
    { label: "Study Field", value: "Everyday Aesthetics & Design Ethics", zh: "日常美学 / 体验反思 / 设计伦理" }
  ];

  const roleDetails = [
    {
      title: "Experimental Subject",
      zhTitle: "作为实验参与者",
      desc: "Lived closely with the connected indoor display device in my private domestic setting. Directly accepted and absorbed the subtle environmental telemetry and output rhythms of the system, observing its psychological, emotional, and routine-based feedback loops.",
      zhDesc: "在真实的个人起居空间中与室内交互装置深度共处。亲自接纳、感应装置发出的环境联动微表情，观察并记录其如何对日常作息、情绪起伏和空间氛围产生隐性干涉。"
    },
    {
      title: "Research Assistant",
      zhTitle: "作为研究协助者",
      desc: "Collaborated with the primary research team to configure devices and document physical conditions. Gathered system telemetry, cataloged daily logs, mapped emotional response metrics, and transformed structured raw observations into valuable empirical insights.",
      zhDesc: "协助核心研究团队开展软硬件配置及现场部署。负责收集日常系统状态日志、梳理使用反馈、记录突发异常，并将松散的第一人称生活日记提炼为扎实的研究反思材料。"
    }
  ];

  const experimentSteps = [
    {
      step: "01",
      title: "Device Installation",
      zhTitle: "装置部署",
      desc: "Deploying the connected indoor display device directly into the private living environment. Calibrating its network state with the outdoor animal telemetry camera to establish a reliable co-living awareness bridge.",
      zhDesc: "在真实起居室中安装并配置室内交互接收端。通过物联网云端将其与室外的野生松鼠观察摄制模组进行无线连接，校准实时数据通道。"
    },
    {
      step: "02",
      title: "Daily Co-living",
      zhTitle: "日常共居",
      desc: "Integrating the device into everyday routines. Observing the subtle audio, tactile, or ambient light shifts occurring when wild guests trigger sensors outside, maintaining continuous cognitive and sensory ambient connection.",
      zhDesc: "将装置自然融入日常生活轨迹。在读书、工作、小憩等静止活动中，静待远端动物活动触发的呼吸灯亮灭或微妙轻拍反应，保持常态化无感感知。"
    },
    {
      step: "03",
      title: "Observation & Log",
      zhTitle: "体验记录",
      desc: "Consistently documenting behavioral adaptions, emotional fluctuations, shifts in personal routines, and specific micro-interaction episodes triggered by the continuous presence of the non-human entity.",
      zhDesc: "以第一人称视角持续、长期书写生活日志。详细捕捉因松鼠出现而造成的注意力转移、陪伴心理起伏、行为重塑事件，形成体验素材库。"
    },
    {
      step: "04",
      title: "Research Feedback",
      zhTitle: "反思与反馈",
      desc: "Synthesizing empirical observation logs into clean designerly insight structures. Evaluating questions of user tolerance limits, empathy projection thresholds, and future moral design boundaries for human-animal cohabitation.",
      zhDesc: "组织整理长期观察日志，配合研究团队拆解分析交互装置的接受度。从人机交互视角切入，产出关于人类-非人类相处、陪伴感边界与设计伦理的反馈。"
    }
  ];

  const storyboardFrames = [
    {
      frame: "Frame 1",
      time: "Morning / Quiet Presence — 上午",
      title: "Quiet Presence",
      zhTitle: "安静的存在",
      desc: "I notice the indoor device as part of my room and become aware that it is connected to squirrel activity outside.",
      zhDesc: "装置安静地存在于房间中，让我意识到它与室外松鼠活动相连。"
    },
    {
      frame: "Frame 2",
      time: "Daytime / Observation — 白天",
      title: "Observation",
      zhTitle: "日常观察与联动",
      desc: "As I go through daily routines, I observe moments when the system reacts or encourages my attention toward the outdoor environment.",
      zhDesc: "在日常生活中，装置的反馈让我将注意力投向室外环境和松鼠活动。"
    },
    {
      frame: "Frame 3",
      time: "Evening / Emotional Awareness — 傍晚",
      title: "Emotional Awareness",
      zhTitle: "共居情感觉察",
      desc: "The continued presence of the device creates a subtle sense of companionship and reminds me of a non-human co-living relationship.",
      zhDesc: "装置持续存在带来微妙的陪伴感，让我意识到人与非人动物之间也可能形成共居关系。"
    },
    {
      frame: "Frame 4",
      time: "Reflection / Meaning of Co-living — 深夜",
      title: "Meaning of Co-living",
      zhTitle: "关于共居反思",
      desc: "I reflect on how the device changes my perception of everyday life, companionship, and the boundary between home and nature.",
      zhDesc: "我开始反思装置如何改变我对日常生活、陪伴感以及“家”与“自然”边界的理解。"
    }
  ];

  const insights = [
    {
      icon: Eye,
      title: "Interactive devices reshape natural attention",
      zhTitle: "日常装置可以重塑人的自然注意力",
      desc: "Rather than forcing alerts like standard smartphones, the system relies on physical light pulses to guide mindfulness. It opens a gentle window, encouraging the user to notice weather, bird activity, and squirrel rhythms that would otherwise be entirely filtered out by our concrete living spaces.",
      zhDesc: "设计没有提供充满焦虑感的警报通知，而是通过温和缓慢的光流变化提示老居民。它充当一副自然的媒介偏光镜，让人自发地去关心窗外的风雨和野生松鼠，打破了混泥土都市对人的信息闭锁。"
    },
    {
      icon: Compass,
      title: "Co-living generates subtle companion loops",
      zhTitle: "物理共居交互催生持久的无言陪伴",
      desc: "Even without explicit tactile petting or virtual simulation, bridging a remote habitat and domestic space via organic sensors yields deep reassurance. Knowing that a living creature is active nearby, and reading their rhythms, dissolves isolated loneliness into connected comfort.",
      zhDesc: "人类不需要与野生松鼠有违背天性的肉体接触或强制驯化。仅依靠云端遥感产生的行为节奏共振，即可创造极高密度的情感满足，证明不越界的陪伴更能换来内心的归属安定。"
    },
    {
      icon: ScrollText,
      title: "Empathy projection is multi-layered & complex",
      zhTitle: "人类对非人类的移情是多层次且复杂的",
      desc: "The study reveals critical ethical boundaries. Over-exposure to animal rhythms can cause user fatigue, while artificial representations risk distortion. Empathetic interaction calls for silent, non-intrusive loops that strictly respect the autonomous wild nature of animals.",
      zhDesc: "实验揭示了敏感的设计伦理红线：过度频繁的动物状态打扰容易转变成行为负担，过假的人造模拟又容易削弱真实感。这提示我们在未来的物联交互中要遵循‘谦逊无感’，捍卫野生生命本真的生命秩序。"
    }
  ];

  const contributions = [
    {
      title: "Continuous First-Hand Co-living Experience",
      zhTitle: "长期一线真实共居记录",
      detail: "Lived with the prototype for several weeks, tracking my cognitive adaptation curves and documenting direct interactions."
    },
    {
      title: "Somatic Reaction Mapping & Diaries",
      zhTitle: "多维身心触觉日记编撰",
      detail: "Created personal journals detailing sensory spikes, comfort levels, focus duration, and emotional security values."
    },
    {
      title: "Collaborative Hardware Configuration Support",
      zhTitle: "装置校准与交互故障捕捉",
      detail: "Assisted the design team on network debugging, sensory delay analysis, and calibration of lighting intervals."
    },
    {
      title: "Design Ethics & Empathy Insight Structuring",
      zhTitle: "设计伦理与移情心境提炼",
      detail: "Synthesized qualitative data regarding boundaries of non-human privacy, distance design, and ethical user acceptance."
    }
  ];

  return (
    <div className="relative overflow-hidden selection:bg-amber-100 selection:text-amber-900 leading-normal">
      
      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm Forest Theme Ambient Orbs */}
        <div className="absolute top-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-amber-100/30 to-emerald-50/20 blur-[100px] opacity-70"></div>
        <div className="absolute bottom-[10%] left-[8%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-stone-100/40 to-amber-50/30 blur-[90px] opacity-60"></div>
        
        {/* Soft floating tree & leaves skeletons */}
        <motion.div 
          animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[6%] text-emerald-800/5 hover:text-emerald-800/10 transition-colors"
        >
          <Trees size={150} strokeWidth={0.5} />
        </motion.div>

        <motion.div 
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[12%] text-amber-800/5 hover:text-amber-800/10 transition-colors"
        >
          <Compass size={130} strokeWidth={0.5} />
        </motion.div>
        
        {/* Natural background wavy vector lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none">
          <path d="M 0,300 C 150,220 350,380 500,280 C 650,180 850,340 1000,240 C 1150,140 1350,280 1500,180" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-800" strokeDasharray="6,6" />
          <path d="M 0,650 C 200,550 400,750 600,600 C 800,450 1100,700 1300,550 C 1450,420 1600,580 1800,480" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-800" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 max-w-7xl relative pt-24 pb-16">
        
        {/* Navigation Sidebar-like glass controller inside page */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8 lg:mt-12">
          
          {/* LEFT SIDEBAR: Sticky Navigator & Metadata */}
          <div className="lg:w-1/3 flex flex-col space-y-8 lg:sticky lg:top-28 lg:h-[calc(100vh-160px)] justify-between">
            
            {/* Title Block & Subtitle */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span 
                  onMouseEnter={soundManager.playHover}
                  onClick={soundManager.playClick}
                  className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100/60 backdrop-blur-md border border-emerald-200/50 rounded-full text-[10px] font-bold tracking-wider text-emerald-800 hover:bg-emerald-200 transition-colors uppercase cursor-pointer shadow-xs"
                >
                  <Trees size={10} />
                  Co-Living Study
                </span >
                <span 
                  onMouseEnter={soundManager.playHover}
                  onClick={soundManager.playClick}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-100/60 backdrop-blur-md border border-amber-200/50 rounded-full text-[10px] font-bold tracking-wider text-amber-800 hover:bg-amber-200 transition-colors uppercase cursor-pointer shadow-xs"
                >
                  <UserCheck size={10} />
                  Research Assistant
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-800 uppercase block mb-1">CHAPTER 03 / PORTFOLIO PROJECT</span>
                <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[62px] tracking-tight leading-[1.1] text-brand-text">
                  Living with Squirrels
                </h1>
                <p className="font-sans text-[15px] sm:text-[17px] font-medium text-brand-text/90 mt-3 leading-snug">
                  A Human–Animal Co-living Interaction Study
                  <span className="block text-xs text-brand-muted/80 font-light mt-1.5 border-l border-emerald-600/30 pl-3">
                    人类—动物共居空间下的温和媒介与移情交互实验
                  </span>
                </p>
              </div>

              {/* Glassmorphic Section Switchers */}
              <div className="bg-white/45 backdrop-blur-md border border-white/60 p-2 rounded-3xl shadow-sm space-y-1">
                {[
                  { id: 'overview', label: '01 / Project Overview', zh: '项目概览与角色' },
                  { id: 'flow', label: '02 / Experiment Flow', zh: '四阶段实验流程' },
                  { id: 'story', label: '03 / Storyboard & Insights', zh: '故事板与核心洞察' },
                  { id: 'reflection', label: '04 / Reflections', zh: '研究贡献与感受' }
                ].map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => { soundManager.playClick(); setActiveSection(sec.id as any); }}
                    onMouseEnter={soundManager.playHover}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between ${activeSection === sec.id ? 'bg-emerald-800/90 text-white font-medium shadow-md' : 'text-brand-text hover:bg-white/40'}`}
                  >
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider">{sec.label}</p>
                      <p className={`text-[10px] ${activeSection === sec.id ? 'text-emerald-100' : 'text-brand-muted'} font-light mt-0.5`}>{sec.zh}</p>
                    </div>
                    {activeSection === sec.id && (
                      <motion.div layoutId="sidebar-active-dot" className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Human-Animal Co-living Ethic quote */}
            <div className="hidden lg:block bg-stone-100/80 backdrop-blur-xs border border-white/40 p-5 rounded-2xl">
              <BookOpen size={16} className="text-emerald-800 mb-2" />
              <p className="text-[11px] leading-relaxed text-brand-muted/95 font-light">
                "We realize interaction design is not just a tool for human efficiency, but can build an invisible sensory bridge to share somatic co-presence with nature safely."
              </p>
              <p className="text-[10px] text-amber-800 font-bold mt-2">— Personal Field Diary Reflection</p>
            </div>

          </div>

          {/* RIGHT SIDE CONTENT: Dynamically Rendered Based on Switcher */}
          <div className="flex-1 w-full lg:min-h-[calc(100vh-160px)] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              
              {/* SECTION 1: OVERVIEW & MY ROLE */}
              {activeSection === 'overview' && (
                <motion.div
                  key="overview-panel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  {/* Summary Callout Banner */}
                  <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-[2.5rem] p-8 md:p-10 shadow-sm space-y-6">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-800 uppercase block mb-1">01 / CONCEPT BRIEF</span>
                    <h2 className="text-2xl md:text-3xl font-serif italic text-brand-text">Connecting Private Closets with the Wild Outside</h2>
                    
                    <p className="text-sm md:text-base leading-relaxed text-brand-text/90 font-light">
                      This project explores how interactive devices can mediate co-living experiences between humans and urban animals. Through a long-term living experiment, I participated both as a research assistant and as an experimental subject, observing how an indoor device connected with an outdoor squirrel observation system influenced daily routines, feelings of companionship, and emotional awareness.
                    </p>

                    <p className="text-[13px] leading-relaxed text-brand-muted border-l-2 border-emerald-600/30 pl-4 bg-emerald-50/10 py-1.5 italic font-light">
                      本项目探索交互装置如何介入人与城市动物之间的共居体验。在长期生活实验中，我同时作为研究协助者和实验参与者，体验室内交互装置与室外松鼠观察系统之间的联动，并观察其如何影响日常生活、陪伴感以及情绪感知。
                    </p>
                  </div>

                  {/* INTERACTIVE WILD FOREST OASIS */}
                  <div className="bg-gradient-to-br from-emerald-950/15 via-amber-950/5 to-stone-100/40 backdrop-blur-md border border-white/70 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#047857] uppercase block mb-1">ECOLOGICAL PLAYGROUND / 智能共居实验区</span>
                        <h3 className="text-xl font-serif italic text-brand-text">Co-living Symbiosis Playground</h3>
                        <p className="text-xs text-brand-muted/90 font-light mt-1">
                          Select a wild treat below, then <strong>click anywhere on the branch or the grass ground</strong> to drop it! Watch Momo scurry and enjoy.
                        </p>
                      </div>
                      
                      {/* Empathy Score indicator */}
                      <div className="bg-white/90 backdrop-blur-xs border border-white/95 p-3.5 px-5 rounded-2xl flex items-center gap-4.5 shadow-sm">
                        <div className="text-left">
                          <p className="text-[9px] uppercase font-bold tracking-widest text-[#B45309]">Somatic Symbiosis Level</p>
                          <p className="text-xs font-bold text-brand-text leading-tight mt-0.5">
                            {friendshipScore < 45 ? "Distant Observers" : friendshipScore < 75 ? "Trusting Neighbors" : "Inseparable Companions 🐿️❣"}
                          </p>
                          <p className="text-[9px] text-[#047857] font-semibold tracking-wide uppercase mt-0.5">{friendshipScore}% Empathy Index</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                          <Heart className={`w-5 h-5 ${squirrelState === 'jumping' ? 'animate-bounce fill-amber-500 text-amber-500' : 'animate-pulse'}`} />
                        </div>
                      </div>
                    </div>

                    {/* NEW: Selectable Treats Panel */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          id: 'hazelnut',
                          label: '香烤榛子',
                          enLabel: 'Roasted Hazelnut',
                          icon: '🌰',
                          score: '+10 Symbiosis',
                          desc: 'Sweet buttery snack. Momo scurries down quickly.',
                          color: 'border-amber-300 bg-amber-50/50 hover:bg-amber-100 text-amber-950'
                        },
                        {
                          id: 'peanut',
                          label: '有机花生',
                          enLabel: 'Snappy Peanut',
                          icon: '🥜',
                          score: '+15 Symbiosis',
                          desc: 'Crunchy fun shell! Fun for Momo to crack open.',
                          color: 'border-orange-300 bg-orange-50/50 hover:bg-orange-100 text-orange-950'
                        },
                        {
                          id: 'pinecone',
                          label: '高山红松果',
                          enLabel: 'Forest Pinecone',
                          icon: '🍄',
                          score: '+25 Symbiosis',
                          desc: 'Rich oily pine seeds. Giant treat with sparks!',
                          color: 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-950'
                        }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setSelectedFood(item.id as any);
                            soundManager.playClick();
                            setBubblesText(`Prepped ${item.enLabel}! Tap on the branch or grass to drop it! 🌟`);
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                            selectedFood === item.id 
                              ? 'bg-amber-50 border-amber-500/80 shadow-xs ring-1 ring-amber-500/20' 
                              : 'bg-white/50 border-black/5 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-[8px] tracking-wide uppercase font-bold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded-md">
                              {item.score}
                            </span>
                          </div>
                          <p className="text-xs font-bold leading-tight">{item.label}</p>
                          <p className="text-[9px] font-medium text-brand-muted shrink-0 uppercase tracking-tight leading-tight mb-1">
                            {item.enLabel}
                          </p>
                          <p className="text-[9px] text-brand-muted/90 font-light leading-none hidden sm:block">
                            {item.desc}
                          </p>
                          {selectedFood === item.id && (
                            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* NEW: Weather and Mood Microclimate Controllers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/50 border border-white/80 rounded-[2.5rem] p-6 shadow-xs">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#047857] mb-2 flex items-center gap-1.5 leading-none">
                          <Sun className="w-3.5 h-3.5 animate-pulse" />
                          Outdoor Microclimate / 户外小气候 (天气)
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'sunny', icon: Sun, label: '晴天 Sunny', color: 'hover:bg-amber-50 border-amber-500/10 text-amber-800' },
                            { id: 'rainy', icon: CloudRain, label: '雨天 Rainy', color: 'hover:bg-blue-50 border-blue-500/10 text-blue-800' },
                            { id: 'windy', icon: Wind, label: '风天 Windy', color: 'hover:bg-teal-50 border-teal-500/10 text-teal-800' },
                            { id: 'snowy', icon: Snowflake, label: '雪天 Snowy', color: 'hover:bg-sky-50 border-sky-500/10 text-sky-850' },
                          ].map((wt) => {
                            const IconC = wt.icon;
                            const isActive = weather === wt.id;
                            return (
                              <button
                                type="button"
                                key={wt.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setWeather(wt.id as any);
                                  soundManager.playClick();
                                  const changeTexts = {
                                    sunny: "The sun clears up the autumn sky. Momo stands tall smelling the warm camphor resin! ☀️",
                                    rainy: "Damp dew fills the moss grove. Momo is seeking shelter in our cozy dry node! 🌧️",
                                    windy: "Breezes ripple the camphor tree canopy. Momo's fluffy ears point straight to balance! 🍃",
                                    snowy: "Snowflakes settle on the branches! Momo's thick auburn outdoor fur fluffs up double! ❄️"
                                  };
                                  setBubblesText(changeTexts[wt.id as 'sunny' | 'rainy' | 'windy' | 'snowy']);
                                  
                                  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  setGameLogs(prev => [
                                    `[${nowStr}] [Weather] Forest microclimate set to ${wt.id.toUpperCase()}. Telemetry signal synchronized.`,
                                    `[${nowStr}] [天气] 气象数据同步为 ${wt.label}。交互设备自动感应并切换微气候背景。`,
                                    ...prev
                                  ].slice(0, 7));
                                }}
                                className={`p-2 py-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-[10px] font-bold transition-all no-stage-click ${
                                  isActive 
                                    ? 'bg-emerald-800 text-white border-transparent shadow-xs scale-[1.03]' 
                                    : `bg-white/90 border-black/5 text-slate-700 ${wt.color}`
                                }`}
                              >
                                <IconC className={`w-3.5 h-3.5 ${isActive ? 'animate-bounce' : ''}`} />
                                <span className="text-[7.5px] uppercase tracking-wider block">{wt.id}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#B45309] mb-2 flex items-center gap-1.5 leading-none">
                          <Smile className="w-3.5 h-3.5 text-amber-600" />
                          Momo's Emotional State / 情绪感知 (心情)
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'happy', label: '开心', en: 'Happy', emoji: '😊' },
                            { id: 'curious', label: '好奇', en: 'Curious', emoji: '🤔' },
                            { id: 'cozy', label: '安宁', en: 'Cozy', emoji: '🧸' },
                            { id: 'playful', label: '顽皮', en: 'Playful', emoji: '⚡' },
                          ].map((md) => {
                            const isActive = squirrelMood === md.id;
                            return (
                              <button
                                type="button"
                                key={md.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSquirrelMood(md.id as any);
                                  soundManager.playClick();
                                  const customSpeak = {
                                    happy: "Squeak! Golden autumn sun makes my whiskers wiggle in pure happiness! 😊",
                                    curious: "Sniff sniff... My whiskers feel micro-vibrations in the camera telemetry! 🤔",
                                    cozy: "Momo is cozy! I am curling into a round thermal ball of soft fur! 🧸",
                                    playful: "Yahoo! Time for acrobatics! Tap the branch to see my lightning reflexes! ⚡"
                                  };
                                  setBubblesText(customSpeak[md.id as 'happy' | 'curious' | 'cozy' | 'playful']);
                                  
                                  const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  setGameLogs(prev => [
                                    `[${nowStr}] [Mood] Squirrel emotional signal adjusted: ${md.en.toUpperCase()}.`,
                                    `[${nowStr}] [情绪] 装置同步松鼠 Momo 情绪为【${md.label}】。感应呼吸灯随之转换。`,
                                    ...prev
                                  ].slice(0, 7));
                                }}
                                className={`p-2 py-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-[10px] font-bold transition-all no-stage-click ${
                                  isActive 
                                    ? 'bg-amber-600 text-white border-transparent shadow-xs scale-[1.03]' 
                                    : 'bg-white/90 border-black/5 text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                                }`}
                              >
                                <span className="text-xs leading-none">{md.emoji}</span>
                                <span className="text-[7.5px] uppercase tracking-wider block">{md.en}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Stage Canvas Box */}
                    <div 
                      onClick={(e) => {
                        // Click anywhere in the box to throw a nut!
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
                        // Avoid trigger if clicking on specific buttons/items
                        const target = e.target as HTMLElement;
                        if (target.closest('.no-stage-click')) return;
                        
                        triggerFeed(clickX, selectedFood);
                      }}
                      className={`relative h-[270px] w-full rounded-3xl border border-emerald-900/10 overflow-hidden flex flex-col justify-between p-4 px-6 cursor-pointer hover:shadow-sm group select-none transition-all duration-750 ${
                        weather === 'sunny' 
                          ? 'bg-gradient-to-b from-amber-50/40 via-stone-50/70 to-emerald-50/30' 
                          : weather === 'rainy' 
                          ? 'bg-gradient-to-b from-slate-100/70 via-slate-100/70 to-blue-100/40' 
                          : weather === 'windy' 
                          ? 'bg-gradient-to-b from-teal-50/30 via-stone-50/70 to-emerald-50/45' 
                          : 'bg-gradient-to-b from-sky-50/30 via-slate-100/80 to-stone-100/60'
                      }`}
                    >
                      
                      {/* Background Mini Forest Grid */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
                        <svg className="w-full h-full">
                          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" />
                          <line x1="30%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="1" />
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="1" />
                          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="currentColor" strokeWidth="1" />
                          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      {/* WEATHER PARTICLE SYSTEMS OVERLAYS */}
                      {weather === 'sunny' && (
                        <div className="absolute inset-0 bg-radial-gradient from-amber-300/10 via-transparent to-transparent pointer-events-none z-0 mix-blend-screen" />
                      )}

                      {weather === 'rainy' && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-[1.2px] h-5 bg-blue-400/40 rounded-full"
                              style={{ left: `${12 + i * 13}%`, top: `-${15 + i * 4}%` }}
                              animate={{ y: [0, 270], x: [0, -15] }}
                              transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, ease: "linear", delay: i * 0.12 }}
                            />
                          ))}
                        </div>
                      )}

                      {weather === 'windy' && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute h-[1.2px] bg-gradient-to-r from-transparent via-emerald-600/10 to-transparent rounded-full"
                              style={{ left: `-120px`, top: `${35 + i * 45}px`, width: "180px" }}
                              animate={{ x: [0, 620], y: [0, 25, 0] }}
                              transition={{ duration: 1.8 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                            />
                          ))}
                        </div>
                      )}

                      {weather === 'snowy' && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2.5 h-2.5 bg-white/95 rounded-full blur-[0.4px] flex items-center justify-center text-[7px]"
                              style={{ left: `${8 + i * 13}%`, top: `-${15 + i * 4}%`, color: 'RGBA(255,255,255,0.73)' }}
                              animate={{ y: [0, 270], x: [0, 15, -10, 15] }}
                              transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                            >
                              ❄
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {/* Interactive Target Hint overlay on Hover */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[10px] text-slate-400/40 pointer-events-none tracking-widest font-mono font-semibold uppercase group-hover:opacity-100 transition-opacity">
                        ★ Click any spot on grass to Toss Selected Snack ★
                      </div>

                      {/* Oak Branch (Top) */}
                      <div className="relative z-10 flex justify-between items-start no-stage-click">
                        <motion.div 
                          whileHover={{ rotate: [-0.8, 0.8, -0.8] }}
                          transition={{ duration: 0.8 }}
                          onClick={() => {
                            const randomX = 15 + Math.random() * 60; // 15% to 75%
                            triggerFeed(randomX, selectedFood);
                          }}
                          className="bg-amber-900/10 border border-amber-900/15 cursor-pointer rounded-2xl p-2 px-3.5 flex items-center gap-2 hover:bg-amber-900/20 transition-all text-xs text-amber-900 shadow-xs select-none"
                        >
                          <Trees size={13} className="text-emerald-800 animate-pulse" />
                          <span className="font-medium text-[11px]">Shake Oak Branch to Drop Snack / 摇晃树枝掉落</span>
                        </motion.div>
                        
                        <button
                          onClick={() => {
                            setFriendshipScore(30);
                            setDroppedPinecones([]);
                            setSquirrelX(75);
                            setBubblesText("Ecosystem reset! Let's re-connect! 🌲");
                            setGameLogs([
                              "[System] Ecosystem parameters cleared. Momo is sitting back in the comfort zone.",
                              "[系统] 实验状态已重置，松鼠返回原位，期待新的环境输入。"
                            ]);
                            soundManager.playClick();
                          }}
                          className="p-1 px-2.5 bg-white/70 border hover:bg-white text-[9px] font-bold text-brand-muted uppercase rounded-lg hover:shadow-xs transition-all pointer-events-auto"
                        >
                          Reset Game
                        </button>
                      </div>

                      {/* Floating Bubbles Speech bubble above squirrel */}
                      <AnimatePresence>
                        {bubblesText && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: -10 }}
                            className="absolute bg-white/95 border border-[#047857]/20 p-2.5 px-4 rounded-2xl shadow-md text-[11px] font-semibold text-emerald-950 z-20 pointer-events-none flex items-center gap-1.5 max-w-[85%] text-left"
                            style={{ 
                              left: `${Math.min(75, Math.max(10, squirrelX - 15))}%`, 
                              bottom: '95px'
                            }}
                          >
                            <Sparkles size={11} className="text-amber-500 shrink-0" />
                            <span>{bubblesText}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Dynamic Falling/Dropped Treats */}
                      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                        {droppedPinecones.map((cone) => {
                          if (cone.isEaten) return null;
                          return (
                            <motion.div
                              key={cone.id}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 195, opacity: 1 }}
                              transition={{ type: "spring", bounce: 0.45, duration: 0.9 }}
                              className="absolute"
                              style={{ left: `${cone.x}%`, transform: 'translateX(-50%)' }}
                            >
                              <div className="w-9 h-9 rounded-full bg-white border border-amber-300 shadow-sm flex items-center justify-center transition-transform hover:scale-110 relative">
                                <span className="text-lg">
                                  {cone.type === 'hazelnut' ? '🌰' : cone.type === 'peanut' ? '🥜' : '🍄'}
                                </span>
                                
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] uppercase font-bold bg-[#B45309] text-white px-1.5 rounded-sm animate-pulse whitespace-nowrap block">
                                  Feed Momo!
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Ground Zone (Bottom) */}
                      <div className="w-full h-8 border-t border-emerald-900/10 rounded-b-2xl bg-gradient-to-t from-emerald-800/15 to-emerald-800/2 px-4 flex items-center justify-between pointer-events-none relative z-10">
                        <span className="text-[9px] font-mono text-emerald-950 font-bold tracking-wider">MOSS ADAPTATION ZONE</span>
                        
                        {/* Interactive Active Squirrel that now physically scampers toward squirrelX */}
                        <motion.div
                          className="absolute bottom-1 pointer-events-auto no-stage-click"
                          animate={{ left: `${squirrelX}%` }}
                          transition={{ type: "spring", stiffness: 85, damping: 13 }}
                          style={{ transform: "translateX(-50%)", cursor: "pointer" }}
                        >
                          <motion.div
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.playClick();
                              const remark = squirrelDialogues[weather]?.[squirrelMood] || "Squeak! Golden leaves are beautiful! (落叶沙沙响，大自然真神奇！)";
                              setBubblesText(remark);
                              setSquirrelState('curious');
                              // Log touch
                              const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                              setGameLogs(prev => [
                                `[${nowStr}] [Social] Engaged with Momo under ${weather.toUpperCase()} climate (Mood: ${squirrelMood.toUpperCase()}).`,
                                `[${nowStr}] [互动] 隔空抚摸了 Momo。当前微气候同步其情绪感知为【${squirrelMood}】。`,
                                ...prev
                              ].slice(0, 7));
                              setTimeout(() => setSquirrelState('idle'), 900);
                            }}
                            animate={
                              squirrelState === 'eating' ? {
                                scale: [1, 1.08, 0.96, 1.08, 1],
                                rotate: [0, 3, -3, 3, 0]
                              } : squirrelState === 'jumping' ? {
                                y: [0, -45, 0],
                                scale: [1, 1.15, 0.9, 1]
                              } : squirrelState === 'curious' ? {
                                rotate: [0, -6, 6, -6, 0]
                              } : {
                                scaleY: [1, 1.04, 1]
                              }
                            }
                            transition={
                              squirrelState === 'eating' ? { duration: 1.1, repeat: Infinity } 
                              : squirrelState === 'jumping' ? { duration: 0.8, ease: "easeOut" }
                              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                            }
                          >
                            <svg viewBox="0 0 80 80" className="w-[72px] h-[72px] drop-shadow-md select-none overflow-visible">
                              <defs>
                                <linearGradient id="tailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#EA580C" />
                                  <stop offset="100%" stopColor="#9A3412" />
                                </linearGradient>
                                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#F97316" />
                                  <stop offset="100%" stopColor="#C2410C" />
                                </linearGradient>
                              </defs>

                              {/* Squirrel Tail (Extra Large & Fluffy with tip) */}
                              <motion.path 
                                d="M 22,50 C 10,48 5,30 14,18 C 22,6 36,10 32,24 C 28,34 30,42 22,50 Z" 
                                fill="url(#tailGrad)"
                                animate={
                                  squirrelState === 'eating' 
                                    ? { rotate: [0, 8, -8, 8, 0], scale: [1, 1.05, 1] } 
                                    : squirrelState === 'jumping' 
                                    ? { y: [0, -6, 2, 0], rotate: [0, 25, -25, 0] } 
                                    : { rotate: [0, 4, -4, 0] }
                                }
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                style={{ transformOrigin: "26px 46px" }}
                              />

                              {/* Back Feet */}
                              <ellipse cx="32" cy="58" rx="4.5" ry="2.5" fill="#9A3412" />
                              <ellipse cx="48" cy="58" rx="4.5" ry="2.5" fill="#9A3412" />

                              {/* Main Body */}
                              <rect x="28" y="32" width="24" height="28" rx="11" fill="url(#bodyGrad)" />
                              
                              {/* Fluffy Chest/Belly Patch (Cream White) */}
                              <ellipse cx="40" cy="46" rx="7" ry="10" fill="#FFFBEB" />

                              {/* Ear Tufts (Furry Tips) - Left & Right */}
                              <path d="M 33,12 Q 31,3 32,0 Q 34,4 34,12" fill="#7C2D12" />
                              <path d="M 47,12 Q 49,3 48,0 Q 46,4 46,12" fill="#7C2D12" />

                              {/* Ears */}
                              {/* Left Ear */}
                              <path d="M 31,20 L 33,10 L 37,18 Z" fill="#C2410C" />
                              <path d="M 32.5,18 L 34,12 L 36,17 Z" fill="#FDA4AF" />
                              {/* Right Ear */}
                              <path d="M 49,20 L 47,10 L 43,18 Z" fill="#C2410C" />
                              <path d="M 47.5,18 L 46,12 L 44,17 Z" fill="#FDA4AF" />

                              {/* Head */}
                              <circle cx="40" cy="24" r="12.5" fill="url(#bodyGrad)" />

                              {/* Cute Big Sparkling Eyes */}
                              {/* Left Eye */}
                              <circle cx="35.5" cy="22.5" r="3" fill="#1C1917" />
                              {/* Sparks */}
                              <circle cx="34.5" cy="21.5" r="1.1" fill="#FFFFFF" />
                              <circle cx="36.5" cy="23.5" r="0.6" fill="#FFFFFF" />

                              {/* Right Eye */}
                              <circle cx="44.5" cy="22.5" r="3" fill="#1C1917" />
                              {/* Sparks */}
                              <circle cx="43.5" cy="21.5" r="1.1" fill="#FFFFFF" />
                              <circle cx="45.5" cy="23.5" r="0.6" fill="#FFFFFF" />

                              {/* Soft Blush Cheeks */}
                              <circle cx="32" cy="25.5" r="2.2" fill="#F43F5E" opacity="0.65" />
                              <circle cx="48" cy="25.5" r="2.2" fill="#F43F5E" opacity="0.65" />

                              {/* Adorable little nose & mouth */}
                              <polygon points="39.2,23.8 40.8,23.8 40,24.6" fill="#451A03" />
                              {/* Little 'w' smile mouth */}
                              <path d="M 38.5,26 Q 39.3,27 40,26.2 Q 40.7,27 41.5,26" fill="none" stroke="#451A03" strokeWidth="0.8" strokeLinecap="round" />

                              {/* Cute Whiskers */}
                              <line x1="28" y1="24.5" x2="24" y2="24" stroke="#D97706" strokeWidth="0.5" opacity="0.8" />
                              <line x1="28" y1="26" x2="23" y2="26.5" stroke="#D97706" strokeWidth="0.5" opacity="0.8" />
                              <line x1="52" y1="24.5" x2="56" y2="24" stroke="#D97706" strokeWidth="0.5" opacity="0.8" />
                              <line x1="52" y1="26" x2="57" y2="26.5" stroke="#D97706" strokeWidth="0.5" opacity="0.8" />

                              {/* Cute Front Paws */}
                              <motion.ellipse 
                                cx="34" 
                                cy={squirrelState === 'eating' ? 39 : 44} 
                                rx="3" 
                                ry="2" 
                                fill="#D97706" 
                                animate={squirrelState === 'eating' ? { y: [0, -3, 0], x: [0, 1, 0] } : {}}
                                transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
                              />
                              <motion.ellipse 
                                cx="46" 
                                cy={squirrelState === 'eating' ? 39 : 44} 
                                rx="3" 
                                ry="2" 
                                fill="#D97706" 
                                animate={squirrelState === 'eating' ? { y: [0, -3, 0], x: [0, -1, 0] } : {}}
                                transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                              />

                              {/* Small nut item held between hands when eating */}
                              {squirrelState === 'eating' && (
                                <motion.g
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: [0.9, 1.1, 0.9] }}
                                  transition={{ duration: 0.4, repeat: Infinity }}
                                  style={{ transformOrigin: "40px 39px" }}
                                >
                                  <circle cx="40" cy="39" r="3" fill="#D97706" />
                                  <path d="M 38,39 C 38,36 42,36 42,39 Z" fill="#78350F" />
                                </motion.g>
                              )}
                            </svg>
                            
                            {squirrelState === 'jumping' && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 animate-bounce">
                                <span className="text-red-500 text-xs text-nowrap">🧡 🌟 🧡</span>
                              </div>
                            )}
                          </motion.div>
                        </motion.div>
                        
                        <span className="text-[9px] font-mono text-brand-muted font-light">
                          {droppedPinecones.filter(p=>!p.isEaten).length} Active Treat(s)
                        </span>
                      </div>

                    </div>

                    {/* NEW: Co-Living Terminal Observation Log */}
                    <div className="border border-emerald-900/10 rounded-2xl bg-black/5 p-4 space-y-2 mt-4 font-mono">
                      <div className="flex items-center justify-between text-[10px] text-emerald-800 border-b border-emerald-900/10 pb-1.5 mb-1">
                        <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse" />
                          Sensory Co-living Telemetry Terminal
                        </span>
                        <span className="text-brand-muted">Active Stream (15s polling)</span>
                      </div>
                      
                      <div className="space-y-1.5 max-h-[105px] overflow-y-auto pr-1 text-[11px] font-light leading-relaxed scrollbar-thin">
                        {gameLogs.map((log, index) => (
                          <div 
                            key={index} 
                            className={`flex items-start gap-1 pb-1 border-b border-black/2 ${
                              log.includes("[Eat]") || log.includes("[摄食]") 
                                ? 'text-amber-800 font-medium' 
                                : log.includes("[Drop]") || log.includes("[投放]") 
                                ? 'text-[#047857]' 
                                : 'text-slate-600'
                            }`}
                          >
                            <span className="shrink-0 text-amber-500">›</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Role Definition Module */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <UserCheck className="text-amber-800 w-5 h-5" />
                       <h3 className="text-lg font-serif italic text-brand-text">My Dual Role & Responsibilities — 我在研究中的双重定位</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {roleDetails.map((role, i) => (
                        <div key={i} className="bg-white/40 border border-white/60 rounded-[2rem] p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
                           <div>
                              <div className="flex items-center gap-2.5 mb-2.5">
                                 <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                 <h4 className="text-[15px] font-bold tracking-tight text-brand-text">{role.title}</h4>
                              </div>
                              <span className="text-[11px] font-bold text-emerald-800/80 uppercase tracking-widest block mb-4">{role.zhTitle}</span>
                              <p className="text-xs text-brand-text/80 leading-relaxed font-light mb-4">{role.desc}</p>
                           </div>
                           <p className="text-[11px] text-brand-muted font-light leading-normal border-t border-black/5 pt-3 mt-4">
                              {role.zhDesc}
                           </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {mainMetadata.map((meta, i) => (
                       <div key={i} className="bg-stone-50/60 border border-white/80 p-4 rounded-2xl shadow-xs">
                          <p className="text-[9px] uppercase font-bold tracking-wider text-brand-muted mb-0.5">{meta.label}</p>
                          <p className="text-xs font-semibold text-brand-text leading-tight mb-2 select-all">{meta.value}</p>
                          <p className="text-[10px] text-brand-muted/70 font-light border-t border-brand-muted/10 pt-1.5 leading-none">{meta.zh}</p>
                       </div>
                     ))}
                  </div>

                  {/* Photo Polaroids Grid Prevision (Where they can paste later) */}
                  <div className="space-y-4">
                     <p className="text-xs uppercase font-bold tracking-widest text-brand-muted flex items-center gap-2">
                       <Camera size={12} />
                       Observation Gallery & Setup Blueprints
                     </p>
                     
                     <div className="grid sm:grid-cols-3 gap-4">
                        {[
                          { id: "indoor-device", title: "Indoor Device in Domestic Workspace", sub: "室内装置布置于电脑桌旁", color: "bg-amber-100/10" },
                          { id: "squirrel-observation", title: "Outdoor Observation & Squirrel Nest", sub: "室外红松鼠树干筑巢点", color: "bg-emerald-100/10" },
                          { id: "user-interacting", title: "Human Ambient Interactive Episode", sub: "参与者日常余光无感观察动作", color: "bg-stone-100/10" }
                        ].map((pic, idx) => (
                          <div 
                             key={idx} 
                             className="bg-white p-3 rounded-2xl shadow-xs border border-white/90 hover:shadow-md hover:scale-[1.01] transition-all flex flex-col aspect-[4/5] justify-between cursor-pointer"
                             onClick={soundManager.playClick}
                          >
                             {/* Placeholder image representation */}
                             <div className={`flex-1 rounded-xl ${pic.color} border border-dashed border-stone-200 flex flex-col items-center justify-center p-4 text-center group`}>
                                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: idx }}>
                                  <Camera className="w-8 h-8 text-stone-400 group-hover:text-emerald-700 transition-colors" strokeWidth={1} />
                                </motion.div>
                                <span className="text-[10px] uppercase tracking-widest text-brand-muted font-bold block mt-3">Photo Placeholder</span>
                                <span className="text-[9px] text-brand-muted/60 block mt-1">Ready for subject photo uploads</span>
                             </div>

                             {/* Polaroid Title */}
                             <div className="pt-3 pb-1 text-left px-1">
                                <p className="text-[11px] font-semibold text-brand-text line-clamp-1 leading-tight">{pic.title}</p>
                                <p className="text-[10px] text-brand-muted/80 font-light line-clamp-1 mt-0.5">{pic.sub}</p>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                </motion.div>
              )}

              {/* SECTION 2: EXPERIMENT FLOW TIMELINE */}
              {activeSection === 'flow' && (
                <motion.div
                  key="flow-panel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                     <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-800 uppercase block mb-1">02 / EXPERIMENTAL FLOW</span>
                     <h2 className="text-2xl md:text-3xl font-serif italic text-brand-text">Four Phases of Ecological Reflection</h2>
                     <p className="text-xs text-brand-muted font-light mt-1">
                       Click each phase below to analyze the concrete interaction step and sensory tracking guidelines.
                     </p>

                     {/* Step Toggler Panel */}
                     <div className="grid grid-cols-4 gap-2 mt-8 border-b border-black/5 pb-6">
                        {experimentSteps.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => { soundManager.playClick(); setActiveFlowStep(idx); }}
                            className={`py-3 px-2 rounded-xl border text-center transition-all ${activeFlowStep === idx ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm font-medium' : 'bg-transparent border-transparent text-brand-muted hover:bg-white/30'}`}
                          >
                            <span className="block font-serif italic text-sm md:text-base leading-none">Step {item.step}</span>
                            <span className="hidden sm:inline text-[9px] uppercase tracking-widest font-bold font-sans mt-1 block opacity-80">{item.title}</span>
                          </button>
                        ))}
                     </div>

                     {/* Step Active Detail Content */}
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={activeFlowStep}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -10 }}
                         transition={{ duration: 0.2 }}
                         className="pt-6 grid md:grid-cols-12 gap-8 items-center"
                       >
                          <div className="md:col-span-7 space-y-4">
                             <div className="flex items-center gap-3">
                                <span className="font-serif italic text-lg text-amber-800 bg-amber-100/60 px-3 py-1 rounded-full">{experimentSteps[activeFlowStep].step}</span>
                                <h3 className="text-xl font-bold text-brand-text">{experimentSteps[activeFlowStep].title}</h3>
                             </div>
                             <span className="text-xs font-bold text-emerald-800/80 block uppercase tracking-widest">{experimentSteps[activeFlowStep].zhTitle}</span>
                             <p className="text-sm text-brand-text/90 leading-relaxed font-light">{experimentSteps[activeFlowStep].desc}</p>
                             <p className="text-xs text-brand-muted font-light leading-relaxed border-l-2 border-stone-350 pl-4 bg-black/2 py-2 rounded-r-lg">
                                {experimentSteps[activeFlowStep].zhDesc}
                             </p>
                          </div>

                          {/* Placeholder image inside Step display */}
                          <div className="md:col-span-5">
                             <div className="bg-white p-3 rounded-2xl shadow-xs border border-white/80 aspect-[4/3] flex flex-col justify-between">
                                <div className="flex-1 rounded-xl bg-stone-100/65 border border-dashed border-stone-200 flex flex-col items-center justify-center p-4 text-center cursor-pointer group" onClick={soundManager.playClick}>
                                   <Activity className="w-8 h-8 text-stone-400 group-hover:text-emerald-700 transition-colors animate-pulse" />
                                   <span className="text-[10px] uppercase font-bold text-brand-muted block mt-2">Flow Snapshot</span>
                                   <span className="text-[9px] text-brand-muted/70 block mt-0.5">Placeholder: Phase {activeFlowStep + 1} Capture</span>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Complete Process Visual Grid Timeline */}
                  <div className="space-y-4">
                     <p className="text-xs uppercase font-bold tracking-widest text-brand-muted flex items-center gap-1.5">
                       <Layers size={12} fill="currentColor" className="text-emerald-800" />
                       Horizontal Timeline Breakdown
                     </p>
                     
                     <div className="grid sm:grid-cols-4 gap-6">
                       {experimentSteps.map((step, idx) => (
                         <div 
                           key={idx} 
                           onClick={() => { soundManager.playClick(); setActiveFlowStep(idx); }}
                           className={`p-5 rounded-2xl border transition-all cursor-pointer ${activeFlowStep === idx ? 'bg-white border-emerald-600/50 shadow-md' : 'bg-white/40 border-white/60 hover:bg-white/60'}`}
                         >
                            <span className="font-serif italic text-xs text-amber-800 tracking-wider">Step 0{idx+1}</span>
                            <h4 className="text-[13px] font-bold text-brand-text mt-1.5 leading-tight">{step.title}</h4>
                            <p className="text-[10px] text-brand-muted font-light line-clamp-2 mt-2 leading-relaxed">{step.desc}</p>
                            <span className="text-[9px] text-emerald-800 font-bold tracking-wide uppercase mt-3.5 block border-t border-black/5 pt-2">{step.zhTitle}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 3: STORYBOARD & INSIGHTS */}
              {activeSection === 'story' && (
                <motion.div
                  key="story-panel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  
                  {/* Storyboard Block */}
                  <div className="space-y-6">
                    <div className="text-left">
                       <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-800 uppercase block mb-1">03 / STORYBOARD NARRATIVE</span>
                       <h3 className="text-2xl font-serif italic text-brand-text">A Representative Day in the Experiment</h3>
                       <p className="text-xs text-brand-muted font-light mt-1">
                          A 4-frame reflective journal mapping sensory moments, environmental attention, and organic companionship triggers in daily routines.
                       </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                       {storyboardFrames.map((frame, i) => (
                         <div key={i} className="bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/70 p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                               <div className="flex items-center justify-between border-b border-black/5 pb-3.5 mb-4">
                                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase">
                                     {frame.frame}
                                  </span>
                                  <span className="text-[10px] font-mono text-brand-muted">
                                     {frame.time}
                                  </span>
                               </div>

                               {/* Dynamic upload-ready media preview box */}
                               <div 
                                 onClick={() => {
                                    document.getElementById(`st-file-${i}`)?.click();
                                 }}
                                 className="relative aspect-[16/10] bg-stone-100/70 rounded-2xl border border-dashed border-stone-200 overflow-hidden mb-5 group/media cursor-pointer hover:border-emerald-600/30 hover:bg-stone-50 transition-all select-none flex flex-col items-center justify-center p-4 text-center mt-3"
                               >
                                  <input 
                                    type="file" 
                                    id={`st-file-${i}`} 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={(e) => {
                                       const file = e.target.files?.[0];
                                       if (file) {
                                          const reader = new FileReader();
                                          reader.onloadend = () => {
                                             setStoryboardMedia(prev => ({ ...prev, [i]: reader.result as string }));
                                             soundManager.playSwipe();
                                          };
                                          reader.readAsDataURL(file);
                                       }
                                    }}
                                  />
                                  
                                  {storyboardMedia[i] ? (
                                     <div className="absolute inset-0 w-full h-full">
                                        <img referrerPolicy="no-referrer" src={storyboardMedia[i]} alt={frame.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                                           <span className="text-[10px] text-white font-medium flex items-center gap-1">
                                              <Camera size={12} /> Replace Photo/GIF (点击更换) 🐿️
                                           </span>
                                        </div>
                                     </div>
                                  ) : (
                                     <div className="space-y-1.5 pointer-events-none">
                                        <div className="mx-auto w-10.5 h-10.5 rounded-full bg-stone-200/50 flex items-center justify-center text-stone-400 group-hover/media:text-emerald-700 group-hover/media:bg-emerald-50 transition-all">
                                           <Camera size={16} />
                                        </div>
                                        <div>
                                           <p className="text-[10px] font-bold text-brand-text">Reserved Sketch/Image Slot</p>
                                           <p className="text-[8px] text-brand-muted uppercase mt-0.5">点击在此处上传现场照片 or 记录 GIF</p>
                                        </div>
                                     </div>
                                  )}
                               </div>

                               <h4 className="text-lg font-serif italic text-brand-text mb-1 leading-snug">{frame.title}</h4>
                               <h5 className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest mb-4">{frame.zhTitle}</h5>
                               <p className="text-xs text-brand-text/90 leading-relaxed font-light mb-4">{frame.desc}</p>
                            </div>

                            <div className="border-t border-black/5 pt-4 mt-4">
                               <p className="text-[11px] text-brand-muted font-light leading-relaxed">{frame.zhDesc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Photo Placeholder for Storyboard Sketches */}
                  <div className="bg-white/30 backdrop-blur-sm border border-white/60 p-4 rounded-[2.5rem] mt-8 gap-4 flex flex-col md:flex-row items-center justify-between">
                     <div className="p-4">
                        <h4 className="font-serif italic text-lg text-brand-text">Sketches & Subject Interactions</h4>
                        <p className="text-xs text-brand-muted font-light mt-1 max-w-md">
                           Placeholders to insert hand-drawn panels, telemetry charts, or photographs representing the subject observing or documenting emotional states.
                        </p>
                     </div>

                     <div className="flex gap-4">
                        <div className="bg-white border rounded-xl p-2.5 shadow-xs w-36 aspect-square flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform" onClick={soundManager.playClick}>
                           <Activity size={20} className="text-stone-400 mb-1" />
                           <span className="text-[9px] uppercase font-bold text-brand-muted">Sketch Slot</span>
                        </div>
                        <div className="bg-white border rounded-xl p-2.5 shadow-xs w-36 aspect-square flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform" onClick={soundManager.playClick}>
                           <Camera size={20} className="text-stone-400 mb-1" />
                           <span className="text-[9px] uppercase font-bold text-brand-muted">Subject photo</span>
                        </div>
                     </div>
                  </div>

                  {/* Insights Cards Slider / Tabs */}
                  <div className="space-y-6 pt-6 border-t border-black/5">
                     <div className="text-left">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#D97706] uppercase block mb-1">04 / THEORETICAL INSIGHTS</span>
                        <h3 className="text-2xl font-serif italic text-brand-text">Key Research Insights — 核心学术洞察</h3>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6">
                       {insights.map((ins, idx) => (
                         <div 
                           key={idx} 
                           onMouseEnter={() => { soundManager.playSwipe(); setActiveInsight(idx); }}
                           onClick={soundManager.playClick}
                           className={`p-6 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between ${activeInsight === idx ? 'bg-amber-50/70 border-amber-300 shadow-md' : 'bg-white/40 border-white/60 hover:bg-white/70'}`}
                         >
                            <div>
                               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-5 ${activeInsight === idx ? 'bg-amber-200/50 text-amber-900' : 'bg-stone-100 text-stone-500'}`}>
                                  {React.createElement(ins.icon, { size: 18, strokeWidth: 1.5 })}
                               </div>
                               <h4 className="text-[14px] font-bold text-brand-text leading-snug mb-1">{ins.title}</h4>
                               <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#B45309] mb-4">{ins.zhTitle}</h5>
                               <p className="text-xs text-brand-text/80 leading-relaxed font-light mb-4">{ins.desc}</p>
                            </div>

                            <p className="text-[11px] text-brand-muted font-light leading-relaxed border-t border-black/5 pt-3.5 mt-auto">
                               {ins.zhDesc}
                            </p>
                         </div>
                       ))}
                     </div>
                  </div>

                </motion.div>
              )}

              {/* SECTION 4: REFLECTION & CONTRIBUTION */}
              {activeSection === 'reflection' && (
                <motion.div
                  key="reflection-panel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-10"
                >
                  
                  {/* Personal Contribution Block */}
                  <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-[2.5rem] p-8 md:p-10 shadow-sm space-y-6">
                     <span className="text-[10px] font-bold tracking-[0.25em] text-emerald-800 uppercase block mb-1">05 / DOCUMENTED ASSISTANCE</span>
                     <h2 className="text-2xl md:text-3xl font-serif italic text-brand-text">My Research Contribution — 我的学术贡献</h2>
                     
                     <div className="grid sm:grid-cols-2 gap-6 mt-6">
                        {contributions.map((con, idx) => (
                          <div key={idx} className="p-5 rounded-2xl bg-white/60 border border-white/95 hover:shadow-sm transition-shadow">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block shrink-0" />
                                <h4 className="text-[13px] font-bold text-brand-text leading-tight">{con.title}</h4>
                             </div>
                             <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-800/80 mb-2.5">{con.zhTitle}</p>
                             <p className="text-xs text-brand-muted font-light leading-relaxed mb-1">{con.detail}</p>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Personal Reflections Narrative Column */}
                  <div className="grid md:grid-cols-12 gap-8 items-stretch">
                     
                     {/* Left Reflection Column */}
                     <div className="md:col-span-7 bg-white/40 border border-white/60 rounded-[2rem] p-8 space-y-4 flex flex-col justify-between">
                        <div>
                           <h3 className="font-serif italic text-xl text-brand-text mb-1">Empathetic Personal Reflection</h3>
                           <h4 className="text-xs font-bold text-brand-muted uppercase tracking-widest mb-4">关于实验设计价值的反思</h4>
                           
                           <div className="space-y-4">
                              <p className="text-xs sm:text-sm leading-relaxed text-brand-text/90 font-light">
                                "This project helped me understand that interaction design is not only about usability, but also about shaping relationships, attention, and emotional meaning in everyday life. Participating from both the researcher’s side and the user’s side gave me a deeper understanding of experience-based design."
                              </p>
                              <p className="text-xs leading-relaxed text-brand-muted pl-4 border-l border-amber-600/30 font-light italic bg-stone-50/5 py-1">
                                面对混凝土隔热物联系统阻绝了城市生物的接触，这个温和的共居实验让我深刻认识到：日常多维交互能塑造深海无边界的环境意识。同时参与学者与用户双重视角后，我获得了关于体验设计及自然陪伴论理学的全新理解，并在未来交互中保持着更宽广的设计包容胸怀。
                              </p>
                           </div>
                        </div>

                        <div className="border-t border-black/5 pt-4 mt-6">
                           <p className="text-[10px] text-brand-muted font-mono">Date: Continuous Diary Log 2026/05</p>
                        </div>
                     </div>

                     {/* Right Poster Gallery Card Placeholder */}
                     <div className="md:col-span-5 bg-white p-4 rounded-[2rem] shadow-xs border border-white/90 flex flex-col justify-between aspect-[4/3] md:aspect-auto">
                        <div className="flex-1 rounded-2xl bg-stone-100/60 border border-dashed border-stone-200 flex flex-col items-center justify-center p-6 text-center select-none group">
                           <motion.div 
                             animate={{ y: [0, -4, 0] }}
                             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                           >
                             <Trees className="w-10 h-10 text-stone-400 group-hover:text-amber-800 transition-colors" strokeWidth={1} />
                           </motion.div>
                           <span className="text-[11px] uppercase tracking-widest text-[#B45309] font-bold block mt-3">Companion Scene Poster</span>
                           <span className="text-[9px] text-brand-muted/70 block mt-1">Ready for custom experimental photo of squirrel or assistant in forest space</span>
                        </div>
                        <div className="pt-3 pb-1 text-center">
                           <p className="text-[11px] font-bold text-brand-text">Co-living Symbiosis</p>
                           <p className="text-[9px] text-brand-muted/70 mt-0.5 font-light">Human-nature awareness design feedback</p>
                        </div>
                     </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
}
