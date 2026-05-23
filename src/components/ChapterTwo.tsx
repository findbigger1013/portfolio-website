import React, { useState, useMemo } from 'react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/sound';
import { PlaceholderImage } from './PlaceholderImage';
import { 
  Shirt, 
  Brain, 
  HeartPulse, 
  Network, 
  Sparkles, 
  Activity, 
  Flower2, 
  ShieldAlert, 
  Sun, 
  Home, 
  ArrowRight, 
  Fingerprint, 
  Eye, 
  Tv, 
  Heart,
  Smartphone,
  CheckCircle2,
  Lock,
  Compass
} from 'lucide-react';

export function ChapterTwo() {
  const [activeSystemNode, setActiveSystemNode] = useState<string>('clothing');
  const [activeStoryStep, setActiveStoryStep] = useState<number>(0);
  const [activeStructureTab, setActiveStructureTab] = useState<'front' | 'collar' | 'haptic'>('front');

  const metadata = [
    { label: "Project Type", value: "Concept Design / Inclusive Design / Smart Clothing", zh: "概念设计 / 包容性设计 / 智能服装" },
    { label: "Field", value: "Healthcare Design / Emotional Interaction / IoT Care", zh: "康养健康设计 / 情感化交互 / 物联网照护" },
    { label: "Target User", value: "Dementia Patients & Distant Family Members", zh: "认知症老人 / 照护者 / 远方家属成员" },
    { label: "My Role", value: "Research / UIUX Design / Smart System Architect", zh: "用户调研 / 交互设计 / 智能系统架构" },
    { label: "Technologies", value: "Smart Textiles / Bio-sensors / Cloud Haptics", zh: "智能织物 / 生理信号传感器 / 远程触觉反馈" }
  ];

  const backgroundCards = [
    {
      title: "Dressing can become difficult",
      zhTitle: "穿衣可能变得困难",
      desc: "Dementia patients often experience declines in memory, hand eye coordination, and spatial awareness, making the daily ritual of wearing clothing a source of intense cognitive friction.",
      zhDesc: "认知症患者可能因为记忆力、手眼协调及空间认知能力的下降，导致日常最普通的穿衣行为变成一项充满焦虑和重度认知负担的难关。"
    },
    {
      title: "Emotions are often invisible",
      zhTitle: "情绪常常难以表达",
      desc: "Language impairment is common in advanced stages. Often suffering in silent loneliness or quiet anxiety, their authentic internal states remain unseen and unaddressed by household caregivers.",
      zhDesc: "患者常伴有语言表达障碍，导致沉默的孤独、无助或焦虑无法对外清晰倾诉，照护者和不在身边的家人难以察觉和给予安抚。"
    },
    {
      title: "Distance weakens care",
      zhTitle: "亲情距离被空间稀释",
      desc: "Family members in long-distance environments feel helpless. They lack reliable channels to feel the wellness of their parents, lacking the daily tangible emotional reassurance they desire.",
      zhDesc: "在远距离情况下的家属成员常有心无力，缺少可以真实、安全、随时同步感知父母健康与心境的温柔通道，造成亲情纽带的空间断层。"
    }
  ];

  const userNeeds = [
    {
      icon: Shirt,
      title: "Physical Support",
      zhTitle: "易用的身体支持",
      desc: "Front-opening and Velcro fasteners support seamless, painless independent dressing.",
      zhDesc: "前开襟结构与魔术贴代替传统纽扣，让微弱肢体肌肉力量的老人也能轻松痛快穿脱。",
      color: "text-neon-pink bg-neon-pink/10"
    },
    {
      icon: Brain,
      title: "Cognitive Guidance",
      zhTitle: "自适应认知引导",
      desc: "Contrast-color cues on collars and sleeves help patients instinctively identify clothing ports.",
      zhDesc: "通过高饱和对比色的领口、袖口拼接设计，天然暗示穿衣的方向与正确穿着次序。",
      color: "text-glow-purple bg-glow-purple/10"
    },
    {
      icon: HeartPulse,
      title: "Emotional Expression",
      zhTitle: "生理级情绪可视化",
      desc: "Integrating knitted textile sensors into active cuffs to extract heart-rate and translate to feelings.",
      zhDesc: "在手腕处无感贴合织物电极，高灵敏采集心跳与脉搏，将隐蔽的情绪转换为彩色光晕。",
      color: "text-soft-cyan bg-soft-cyan/10"
    },
    {
      icon: Network,
      title: "Haptic Connection",
      zhTitle: "跨空间的触觉反馈",
      desc: "Soft electronic actuators simulate human touch to bring warm reassurance over thousands of miles.",
      zhDesc: "微型排汗气囊和触感线圈模拟轻拍、抚摸微动效，让远在海外的子女也能提供真实的身体温存。"
    }
  ];

  // Interactive System Diagram Config
  const systemNodes: Record<string, { title: string, zhTitle: string, status: string, detail: string, zhDetail: string }> = {
    clothing: {
      title: "Smart Care Clothing",
      zhTitle: "智能易穿脱服装",
      status: "Active / 智能常态穿着中",
      detail: "Adaptive fabric chassis featuring frontal alignment indicators and color-guided zipper flaps. Keeps patient physical load at absolute minimum.",
      zhDetail: "采用改性羊毛弹性基底，领口和左右袖片自带自感色块引导。配有超低重力无毛刺柔软尼龙魔术拉锁。"
    },
    sensors: {
      title: "Textile Bio-sensors",
      zhTitle: "织物传感纱线",
      status: "Monitoring / 脉律实时捕捉中",
      detail: "Intact pulse plethysmography sensor woven into the interior sleeve cuff. Streams real-time heart rate variability (HRV) for autonomic nervous analysis.",
      zhDetail: "袖口里层织入银纤维导电纱线，精准贴近腕部桡动脉。收集心率变异性(HRV)，用于评估压力和激动状态。"
    },
    textileDisplay: {
      title: "OLED Smart Fabric Indicator",
      zhTitle: "微型柔性服装显示",
      status: "Calm State / 显示柔和呼吸色",
      detail: "Flexible micro-phosphor fiber light pattern sewn flat and integrated on the chest. Glows a slow warm coral or soft aqua depending on stress levels.",
      zhDetail: "胸前区置入柔性点阵织物发光条。用极其微弱且慢速变幻的温暖珊瑚橘色、宁静湖蓝色提示患者当前的心绪情绪。"
    },
    remoteFlower: {
      title: "Forget-Me-Not Companion Flower",
      zhTitle: "物联网“勿忘我”电子花",
      status: "Online / 远端家属侧桌摆摆件",
      detail: "A physical micro-sculpture companion positioned on distant family's desk. Blooms silently when state shifts, offering the touch interface.",
      zhDetail: "子女置于书桌上的机械花盆。根据老人血压、心率区间自动开合。家属轻抚花瓣即可向老人发射触觉安慰波纹。"
    },
    hapticActuators: {
      title: "Cloud Tactile Feedback Actuators",
      zhTitle: "背部轻拂微拍气囊阵列",
      status: "Standby / 触觉触发就绪",
      detail: "Ultra-thin localized touch solenoids embedded inside back shoulders. Translates far-away stroking to relaxing physical vibrations.",
      zhDetail: "埋于内衣肩胛骨两侧的毫米级超薄柔电磁振动阵列，模拟子女的搭肩、轻顺背肌。微频输出，安全抗敏。"
    },
    smartHome: {
      title: "IoT Safe Care Shield",
      zhTitle: "智能音视频与环境感知罩",
      status: "Synced / 智能家居照护联动",
      detail: "Integrates with smart wardrobe, safety sensors, and emergency notification system, bridging institutional and home environments.",
      zhDetail: "衣橱LED自动引导照光；当老人出现不适时，自动连接电视，播放儿孙问候投影，同时安全触发监护后台警报。"
    }
  };

  const storySteps = [
    {
      time: "08:30 AM",
      phase: "Morning Dressing",
      zhPhase: "晨间自主穿衣",
      icon: Sun,
      title: "No-friction Dressing Routine",
      zhTitle: "无摩擦的自主穿衣",
      desc: "Forget-Me-Not wardrobe uses subtle white-beam LEDs to direct the elder to the smart garment. The collar has a bright navy rim, sleeves correspond to vivid lavender lines, allowing independent orientation verification. Soft magnetic Velcro auto-snaps when closed.",
      zhDesc: "早晨，衣柜门轻柔开启，暖黄灯光自动照亮今日服装。由于独特的领口湛蓝色、两袖亮紫色的色彩拼贴，老人一眼便认清衣服正反。只需将左右前襟一扣，魔术搭扣便自动锁合，无需和烦琐纽扣搏斗。"
    },
    {
      time: "02:15 PM",
      phase: "Anxiety Capture",
      zhPhase: "情绪无感捕获",
      icon: HeartPulse,
      title: "Invisible Feelings Spark Visual Lights",
      zhTitle: "看不见的心流化作微光",
      desc: "During post-lunch transition, the patient sits alone is hit with a silent panic attack. Her heart rate spikes. Automatically, the silver yarn cuff picks up the cardiac pulse. On the jacket's lapel, a slow pink-purple ring pulses as a soft notification to nearby staff.",
      zhDesc: "午后，老人在客厅感到一时记忆空白与轻微惊恐，心尖开始乱跳。腕口的银导电纤维悄然录得一分钟112次的高压心率。胸前发光纤维缓慢地转换为一圈如呼吸般波动的紫红微光，悄然告知社区照护者此时她正处于焦虑状态。"
    },
    {
      time: "02:18 PM",
      phase: "Remote Flower Sync",
      zhPhase: "勿忘我花同步感应",
      icon: Flower2,
      title: "The Silent Messenger Petals Open",
      zhTitle: "远邦传书，勿忘我悄然开合",
      desc: "Thousands of miles away, the daughter notices her desktop electronic flower bloom from a closed posture and transition to hot-rose lighting. She instantly recognizes her mother's physical and somatic tension. No noisy calling or alert, just an immediate emotional connection.",
      zhDesc: "数千里外下着冷雨，女儿书桌上的“勿忘我”金属电子花检测到云端触发，金属花瓣徐徐舒展。底座亮起一抹微热的暖粉光。女儿看了一眼，立刻明白母亲遭遇了突发眩晕或情绪焦虑，温暖的关怀即时穿梭。"
    },
    {
      time: "02:20 PM",
      phase: "Tangible Comfort",
      zhPhase: "温柔的跨时空轻拍",
      icon: Fingerprint,
      title: "An Ocean Cross Haptic Stroke",
      zhTitle: "大洋彼岸的指尖轻拍",
      desc: "The daughter gently brushes on the top flower pistil. The physical request routes instantly to the mother's shoulder actuators. A rhythmic, whispering micro-vibration strokes the elder's back, simulating a gentle massage. The elder sighs with immediate physical relief.",
      zhDesc: "女儿倾身，在盆栽的花蕊感应模块上用食指打了个轻柔的画圈。物联网指令送达母亲常着的智能外衣，背部左肩和右肩的微震微囊轻轻地作三次律动揉拍。老人心跳渐平，感受到如同女儿在身旁宽慰的触感。"
    },
    {
      time: "02:30 PM",
      phase: "IoT Memory Care",
      zhPhase: "记忆唤起与音影联动",
      icon: Tv,
      title: "Warm Echoes on Screens",
      zhTitle: "电视屏幕播放过去的快乐记忆",
      desc: "Sensing the stress levels leveling down, the main IoT dashboard gently shifts the television display to play a soft, low-volume video recording carousel of past family birthday celebrations, anchoring the patient back to familiarity and safety.",
      zhDesc: "随着老人心率在轻拍下放缓，客厅的智能家居网关自动联动电视屏，以最柔和的水墨动效，推播数年前拍下的家人庆生录像片段与熟悉钟声。通过音乐与人脸重温，帮老人牢固地锁定安全记忆节点。"
    }
  ];

  const functionalHighlights = [
    {
      num: "01",
      title: "Adaptive Structure",
      zhTitle: "解构式易穿脱设计",
      tag: "Clothing Ergonomics",
      en: "Eliminating the physical and cognitive struggle of dressing with customized side zips, soft magnet Velcro linings, and custom patterns that allow 100% painless arm routing.",
      zh: "用柔软、超顺滑、无伤害级别的磁吸魔术贴取代难以合拢的精细纽扣，并针对偏瘫或关节僵硬者量身设计无束缚一拉式拉锁路径。",
      image: "Adaptive structure diagram"
    },
    {
      num: "02",
      title: "Contrast Color Guidance",
      zhTitle: "标志色对比式视觉线索",
      tag: "Visual Cognitive Aid",
      en: "Utilizing highly saturated visual blocks on cuffs, pockets, and collars. Alleviates spatial confusion about what goes inside-out or upside-down.",
      zh: "以高饱和对比度标识衣领和袖口。防止老人将正反套错、内外穿反，通过视觉锚点给予下意识行动指示。",
      image: "High contrast colors illustration"
    },
    {
      num: "03",
      title: "Embedded Textile ECG",
      zhTitle: "柔软隐藏型织物心电纱线",
      tag: "Somatic Interface",
      en: "Knitted smart conductive yarns wrap around wrists to detect user heart beats without cold adhesive gel, ensuring a snug feel with absolute respect.",
      zh: "将全织物导电纱无感编织入贴身内衬手腕。摆脱冷硬笨重的常规穿戴设备，维持老人对外界的优雅与体面尊严。",
      image: "Conductive smart textile diagram"
    },
    {
      num: "04",
      title: "Bi-directional Haptic Bridge",
      zhTitle: "双向物理脉搏触觉桥梁",
      tag: "Connected Companion",
      en: "An elegant cyber-physical system consisting of micro-pneumatic actuators on shoulders and a physical desk flower that moves and mimics breathing rhythms.",
      zh: "当家属轻抚物联网勿忘我，衣服后背气阀会规律通气鼓起产生轻轻的拥抱感，以触觉重新架起母女之间的心潮涟漪。"
    }
  ];

  const designValues = [
    {
      title: "Restoring Independence",
      zhTitle: "重建自理尊严",
      desc: "By removing physical and spatial obstacles during dressing, Forget-Me-Not shifts elders from passive 'assisted objects' back into active 'independent actors'.",
      zhDesc: "抹去穿衣过程中的身体桎梏与空间死角，将老人从'被动接受摆弄的看守对象'还原为'生活的主动掌控者'，收获成就感。"
    },
    {
      title: "Democratizing Emotions",
      zhTitle: "打破无声之墙",
      desc: "For those with damaged speech, the smart textile becomes their voice, bringing internal pain, joy, and peace outside to caregivers softly but clearly.",
      zhDesc: "对中重度表达受损的老人，发光的智能织物成了他们的物理代言人，将藏匿心底的信息转为温热的光色，不落下一缕渴望。"
    },
    {
      title: "Closing Spatial Separation",
      zhTitle: "时空的亲情拼图",
      desc: "Moving beyond distance notifications. Merging IoT data streams with remote pneumatic stroke actuators so love is no longer an invisible call, but a touch felt on the shoulders.",
      zhDesc: "跳出冷冰冰的手机振动警示。将数据云反馈、智能花物理开合和服装背部微触融为一体，让异乡的牵挂真实落在背部。"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Decorative elements specific to Chapter 2 */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
            className="absolute top-[12%] right-[10%] text-glow-purple/20"
          >
            <Flower2 size={120} strokeWidth={0.5} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
            className="absolute bottom-[15%] left-[5%] text-neon-pink/20"
          >
            <Shirt size={80} strokeWidth={0.5} />
          </motion.div>
          <motion.div 
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.6, 0.3] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
            className="absolute top-[40%] left-[20%] text-soft-cyan/40"
          >
            <HeartPulse size={48} strokeWidth={1} />
          </motion.div>
          
          {/* Connecting glowing vector line simulation */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <path d="M100 500 Q 300 200 600 450 T 1100 250" fill="none" stroke="currentColor" strokeWidth="2" className="text-glow-purple" />
            <path d="M200 600 Q 500 300 900 550" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neon-pink" strokeDasharray="5,5" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Box: Content */}
            <div className="flex-1 w-full flex flex-col items-start pt-10">
              <FadeIn delay={0.1}>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Inclusive Design", "Care Technology", "Smart Clothing", "Emotion Visualization", "Remote Haptic"].map((tag) => (
                    <span 
                      key={tag} 
                      onMouseEnter={soundManager.playHover}
                      onClick={soundManager.playClick}
                      className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer bg-white/40 backdrop-blur-md border border-neon-pink/20 rounded-full text-[10px] font-medium tracking-wide text-brand-text hover:shadow-[0_0_15px_rgba(255,95,162,0.3)] transition-all duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-neon-pink"></span>
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="relative mb-6">
                <span className="text-xs font-bold tracking-[0.25em] text-glow-purple uppercase block mb-2">CHAPTER 02 / PROJECT 02</span>
                <h1 className="font-serif italic text-5xl sm:text-6xl lg:text-[85px] tracking-tight text-brand-text leading-[1.1]">
                  Forget-Me-Not
                </h1>
                <p className="font-sans text-lg md:text-xl font-medium text-brand-text mt-4 leading-tight">
                  Smart Care Clothing System for Dementia Patients
                  <span className="block text-xs md:text-sm text-brand-muted font-light mt-1 border-l-2 border-glow-purple/40 pl-3">
                    面向认知症老人的智能照护服装系统
                  </span>
                </p>
              </FadeIn>

              <FadeIn delay={0.3} className="max-w-xl space-y-4 mb-8">
                <p className="text-sm md:text-base leading-relaxed text-brand-text/90 font-light">
                  An inclusive, empathetic healthcare intervention. Forget-Me-Not transforms daily wear into a gentle interface, bridging independent self-dressing, automated emotional bio-sensing, and distant family tactile reassurance.
                </p>
                <p className="text-[13px] leading-relaxed text-brand-muted/80 font-light">
                  忘我服装不仅解决身体穿套的障碍，还通过高对比度视觉提示减轻老人的认知压力。同时，借助无感织物微纤传感器捕获其潜在的焦虑，经云端网络通知亲属并支持隔空轻抚后背，修复远渡重洋的家庭关怀裂痕。
                </p>
              </FadeIn>
            </div>

            {/* Right Box: Hero Poster Collage */}
            <FadeIn delay={0.4} className="flex-1 w-full relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-glow-purple/20 to-pale-rose/30 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
              <div className="relative aspect-[4/5] w-full max-w-sm md:max-w-md mx-auto rounded-[2.5rem] overflow-hidden bg-white/30 backdrop-blur-xl shadow-lg border border-white/60 hover:shadow-[0_15px_50px_rgba(205,183,246,0.3)] transition-all duration-500 -rotate-1 hover:rotate-0 p-3">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-white/70 to-pale-rose/40 p-1 flex flex-col justify-between relative">
                  
                  {/* Decorative tag */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-[9px] font-bold text-neon-pink tracking-wider z-20 uppercase">
                    Care System Block 02
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center p-6 text-center select-none">
                    <div className="space-y-4 cursor-pointer" onClick={soundManager.playClick}>
                      <div className="relative inline-block">
                        <Shirt className="w-16 h-16 text-glow-purple opacity-80 mx-auto animate-pulse" strokeWidth={1} />
                        <Flower2 className="w-8 h-8 text-neon-pink absolute -bottom-1 -right-1" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif italic text-brand-text text-xl"> Forget-Me-Not Blueprints </h3>
                      <p className="text-xs text-brand-muted max-w-xs font-light">
                        [Adaptive clothing structure, haptic actuators, and IoT desk-base flower visual layout]
                      </p>
                    </div>
                  </div>
                  
                  {/* Miniature dashboard mockup inside the card */}
                  <div className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-soft-pink/30 flex items-center justify-center text-neon-pink">
                           <Activity size={16} />
                        </div>
                        <div className="text-left">
                           <p className="text-[10px] font-bold uppercase tracking-wider text-brand-text">Somatic Status</p>
                           <p className="text-[10px] text-brand-muted font-light leading-none">Mother's Jacket Connected</p>
                        </div>
                     </div>
                     <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                       ONLINE
                     </span>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 2. Project Info Section */}
      <section className="py-12 bg-white/20 backdrop-blur-sm border-y border-white/50 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {metadata.map((item, i) => (
              <FadeIn delay={0.05 * i} key={i} className="flex flex-col p-4 bg-white/40 border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] uppercase tracking-wider text-brand-muted font-bold mb-1">{item.label}</span>
                <span className="text-xs md:text-[13px] font-medium text-brand-text leading-tight mb-2 select-all">{item.value}</span>
                <span className="text-[10px] text-brand-muted/75 font-light leading-snug mt-auto border-t border-brand-muted/10 pt-2">{item.zh}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Background / Opportunity Area */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-white/10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-glow-purple uppercase block mb-2">01 / REALITY INSIGHTS</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text mb-4">Behind the Whispering Memory</h2>
            <p className="text-xs md:text-sm text-brand-muted font-light">
              Dementia is more than physiological forgetting. It is a slow wall separating independent actions and emotional connection.
              <br/><span className="text-[11px] block mt-1 opacity-70">认知症并非单纯的遗忘，它是一座渐渐隔绝自主生活和小家庭情感流动的围墙。</span>
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {backgroundCards.map((card, i) => (
              <FadeIn delay={0.15 * i} key={i} className="bg-white/40 backdrop-blur-xl border border-white/75 p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative group flex flex-col justify-between">
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-soft-pink/15 flex items-center justify-center font-serif text-xs italic text-neon-pink select-none">
                  0{i + 1}
                </div>
                <div>
                   <h3 className="text-lg font-serif italic text-brand-text mb-1">{card.title}</h3>
                   <h4 className="text-xs font-semibold text-brand-muted mb-4">{card.zhTitle}</h4>
                   <p className="text-[13px] text-brand-text/80 leading-relaxed font-light mb-4">{card.desc}</p>
                </div>
                <p className="text-[11px] text-brand-muted font-light leading-snug border-t border-black/5 pt-4 mt-4 italic">
                  {card.zhDesc}
                </p>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Design Challenge Billboard */}
      <section className="py-24 relative z-10 bg-white/30 backdrop-blur-sm border-y border-white/30">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl text-center">
          <FadeIn className="mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] text-neon-pink uppercase block mb-3">02 / DESIGN CHALLENGE</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-brand-text leading-snug max-w-3xl mx-auto mb-6">
              "How might we help dementia patients dress more independently, express emotions more clearly, and stay emotionally connected with distant family members?"
            </h2>
            <p className="text-sm md:text-base text-brand-muted inline-block border-y border-brand-muted/20 py-2 font-light">
              如何帮助认知症老人更自主地穿衣、更清楚地表达情绪，并与远方家人保持情感连接？
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { q: "How can clothing reduce cognitive burden?", zh: "服装如何降低认知负担？" },
              { q: "How can invisible emotions become visible?", zh: "不可见的情绪如何被看见？" },
              { q: "How can distant care become tangible?", zh: "远程关怀如何变得可感知？" }
            ].map((item, i) => (
              <FadeIn delay={0.1 * i} key={i} className="p-6 bg-white/40 border border-white/60 rounded-2xl flex flex-col items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-glow-purple mb-3"></span>
                <p className="text-[13px] font-medium text-brand-text mb-1 leading-snug">{item.q}</p>
                <p className="text-[11px] text-brand-muted font-light">{item.zh}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. User Needs Cards */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-glow-purple uppercase block mb-2">03 / HUMAN NEEDS</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text mb-4">Four Dimensions of Empathetic Support</h2>
            <p className="text-xs md:text-sm text-brand-muted font-light">
              Bridging functional apparel design with physiological signals and IoT emotional loops.
              <br/><span className="text-[11px] block mt-1 opacity-70">将基础功能性特殊服装设计扩展至生理传感与跨次元情感闭环。</span>
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userNeeds.map((need, i) => (
              <FadeIn delay={0.1 * i} key={i} className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[2rem] p-6 shadow-xs hover:shadow-md transition-shadow group cursor-pointer" onMouseEnter={soundManager.playSwipe} onClick={soundManager.playClick}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 ${need.color || 'text-glow-purple bg-glow-purple/10'}`}>
                  {React.createElement(need.icon, { strokeWidth: 1.5, className: "w-6 h-6" })}
                </div>
                <h3 className="text-[16px] font-serif italic text-brand-text mb-0.5">{need.title}</h3>
                <h4 className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-3">{need.zhTitle}</h4>
                <p className="text-xs text-brand-text/90 leading-relaxed font-light mb-3">{need.desc}</p>
                <p className="text-[11px] text-brand-muted leading-snug font-light border-t border-black/5 pt-3 mt-auto">
                  {need.zhDesc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. System Overview Panel (Interactive Cybernetic Diagram) */}
      <section className="py-24 relative z-10 bg-white/20 backdrop-blur-xl border-y border-white/50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Schematic Left Map */}
            <div className="lg:col-span-7 flex flex-col">
              <FadeIn className="mb-8">
                <span className="text-[10px] font-bold tracking-[0.25em] text-glow-purple uppercase block mb-1">04 / SYSTEM TELEMETRY</span>
                <h2 className="text-3xl font-serif italic text-brand-text">The Empathy Network Map</h2>
                <p className="text-xs text-brand-muted font-light mt-1">
                  Hover or select different system nodes to decode the care loop logic.
                  <span className="hidden sm:inline"> | 点击不同网络节点，解析各层面的穿脱、监测与反馈交互机制。</span>
                </p>
              </FadeIn>

              {/* Schematic Map Plate Mockup */}
              <FadeIn delay={0.1} className="relative aspect-[4/3] w-full bg-white/40 border border-white/80 rounded-[2.5rem] shadow-inner overflow-hidden p-6 flex flex-col justify-between">
                 {/* Decorative vector matrix background */}
                 <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none opacity-20">
                    <svg className="w-full h-full">
                       <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="text-brand-muted" />
                       <circle cx="50%" cy="50%" r="20%" fill="none" stroke="currentColor" strokeWidth="1" className="text-neon-pink" />
                    </svg>
                 </div>

                 {/* Interactive Nodes Ploter */}
                 <div className="relative flex-1 flex flex-col justify-around">
                   
                    {/* Level 1: Smart Wardrobe & Safe Care Clothing (Patient Side) */}
                    <div className="flex justify-between items-center z-10">
                      
                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'clothing' ? 'bg-glow-purple text-white border-glow-purple shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('clothing'); }}
                      >
                         <Shirt size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">01 / Smart Clothing</span>
                      </button>

                      <div className="w-12 h-[1px] bg-dashed border-t border-brand-muted/20 flex-1 mx-2" />

                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'sensors' ? 'bg-neon-pink text-white border-neon-pink shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('sensors'); }}
                      >
                         <Activity size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">02 / Bio-Sensors</span>
                      </button>
                    </div>

                    {/* Level 2: Local Display & Signal Processing */}
                    <div className="flex justify-center items-center z-10">
                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'textileDisplay' ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('textileDisplay'); }}
                      >
                         <Eye size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">03 / Fabric Display</span>
                      </button>
                    </div>

                    {/* Level 3: IoT Cloud Bridge, Remote Flower (Family Side) */}
                    <div className="flex justify-between items-center z-10">
                      
                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'remoteFlower' ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('remoteFlower'); }}
                      >
                         <Flower2 size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">04 / Forget-Me-Not Flower</span>
                      </button>

                      <div className="w-12 h-[1px] bg-dashed border-t border-brand-muted/20 flex-1 mx-2" />

                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'hapticActuators' ? 'bg-pink-600 text-white border-pink-600 shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('hapticActuators'); }}
                      >
                         <Fingerprint size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">05 / Tactile Actuators</span>
                      </button>
                    </div>

                    {/* Level 4: IoT Smart Home Gateway */}
                    <div className="flex justify-center items-center z-10">
                      <button 
                         className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all ${activeSystemNode === 'smartHome' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105' : 'bg-white/70 hover:bg-white border-white/80 shadow-xs'}`}
                         onMouseEnter={() => { soundManager.playHover(); setActiveSystemNode('smartHome'); }}
                      >
                         <Home size={16} />
                         <span className="text-[11px] font-bold tracking-wider uppercase">06 / IoT Care Shield</span>
                      </button>
                    </div>

                 </div>

                 {/* Simulated visual flow link paths */}
                 <div className="text-[10px] uppercase font-mono text-brand-muted/70 tracking-widest flex items-center justify-between border-t border-black/5 pt-4">
                    <span>Somatic Cloud Bridge</span>
                    <span className="flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Tx Real-time Secure Channel
                    </span>
                 </div>
              </FadeIn>
            </div>

            {/* Live Node Decoding Block Right */}
            <div className="lg:col-span-5 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSystemNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between aspect-[5/4] lg:aspect-auto"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-glow-purple uppercase bg-glow-purple/10 px-3 py-1 rounded-full inline-block mb-3">
                      {systemNodes[activeSystemNode].status}
                    </span>
                    <h3 className="text-3xl font-serif italic text-brand-text mb-1 leading-tight">{systemNodes[activeSystemNode].title}</h3>
                    <h4 className="text-sm font-semibold text-brand-muted mb-6">{systemNodes[activeSystemNode].zhTitle}</h4>
                    
                    <div className="space-y-4">
                      <p className="text-base text-brand-text/90 leading-relaxed font-light">{systemNodes[activeSystemNode].detail}</p>
                      <p className="text-[13px] text-brand-muted font-light leading-relaxed border-l-2 border-brand-muted/30 pl-4 bg-black/2 opacity-90 py-1 rounded-r-lg">
                        {systemNodes[activeSystemNode].zhDetail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-8 pt-6 border-t border-black/5 text-[11px] tracking-wider font-bold text-glow-purple/80">
                     <span>Explore live blueprints below</span>
                     <ArrowRight size={12} className="animate-bounce" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Key Features (Adaptive Sizing Bento Cards) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-neon-pink uppercase block mb-2">05 / CORE ADAPTIVE FEATS</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text mb-4">Tactile Adaptation Architecture</h2>
            <p className="text-xs md:text-sm text-brand-muted font-light">
              Crafting non-invasive assistance and dignified clothing interfaces.
              <br/><span className="text-[11px] block mt-1 opacity-70">通过柔软解构服装与非侵入生理科技，还原认知症老人体面的日常。</span>
            </p>
          </FadeIn>

          {/* Interactive Inspection Simulator */}
          <div className="grid lg:grid-cols-12 gap-8 mb-16">
             <FadeIn className="lg:col-span-4 bg-white/40 border border-white/60 rounded-[2.5rem] p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif italic text-brand-text mb-2">Adaptive Inspector</h3>
                  <p className="text-[11px] text-brand-muted tracking-widest uppercase mb-6">Interactive Blueprint Toggle</p>
                  
                  <div className="space-y-2">
                     {[
                       { id: 'front', label: 'Adaptive Dressing Structure', sub: '易穿脱前开前襟结构' },
                       { id: 'collar', label: 'Color-based Navigation', sub: '领袖区域高饱和颜色引导' },
                       { id: 'haptic', label: 'Tactile Array Positioning', sub: '背部双侧气囊反馈点分布' }
                     ].map((tab) => (
                       <button 
                         key={tab.id}
                         onClick={() => { soundManager.playClick(); setActiveStructureTab(tab.id as any); }}
                         className={`w-full text-left px-5 py-4 rounded-2xl border transition-all flex flex-col ${activeStructureTab === tab.id ? 'bg-white border-glow-purple text-brand-text shadow-sm' : 'bg-transparent border-transparent text-brand-muted hover:bg-white/20'}`}
                       >
                          <span className="text-[13px] font-medium leading-tight">{tab.label}</span>
                          <span className="text-[10px] opacity-80 mt-1 font-light">{tab.sub}</span>
                       </button>
                     ))}
                  </div>
                </div>

                <div className="border-t border-brand-muted/10 pt-4 mt-8">
                   <p className="text-[11px] text-brand-muted font-light leading-relaxed">
                     The garment merges technical textile development with standard tailoring techniques, optimizing fit for easy community nursing.
                   </p>
                </div>
             </FadeIn>
             
             {/* Dynamic Blueprint display on Right */}
             <FadeIn delay={0.15} className="lg:col-span-8 bg-white/40 border border-white/60 p-4 md:p-6 rounded-[2.5rem] shadow-sm flex flex-col">
                <div className="relative flex-1 bg-white/50 border border-white/85 rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center p-8">
                   <div className="absolute inset-0 bg-gradient-to-tr from-glow-purple/5 to-neon-pink/5 pointer-events-none" />
                   
                   <AnimatePresence mode="wait">
                     {activeStructureTab === 'front' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.98 }}
                         className="text-center max-w-md space-y-4"
                       >
                          <Shirt className="w-16 h-16 text-neon-pink opacity-80 mx-auto" strokeWidth={1} />
                          <h4 className="text-xl font-serif italic text-brand-text">Front-Opening Alignment Linings</h4>
                          <p className="text-xs text-brand-muted leading-relaxed font-light">
                            Instead of rigid, cold plastic buttons, we embed high-alignment magnetic soft zippers on the front breast. It auto-snaps securely when clothing flaps get within 1.5 cm of proximity.
                          </p>
                          <code className="text-[9px] bg-white/60 px-3 py-1.5 rounded-md font-mono text-brand-muted">Material: Soft Neodymium Sheets / Hyper-stretch Fleece</code>
                       </motion.div>
                     )}
                     {activeStructureTab === 'collar' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.98 }}
                         className="text-center max-w-md space-y-4"
                       >
                          <Compass className="w-16 h-16 text-glow-purple opacity-80 mx-auto animate-spin" style={{ animationDuration: '40s' }} strokeWidth={1} />
                          <h4 className="text-xl font-serif italic text-brand-text">High-Contrast Cuff/Collar Stitching</h4>
                          <p className="text-xs text-brand-muted leading-relaxed font-light">
                            Color fields utilize deep indigo for the crewneck rim and vibrant lavender cuffs on sleeves. This assists correct physical posture and sequence without verbal intervention or caregiver assistance.
                          </p>
                          <code className="text-[9px] bg-white/60 px-3 py-1.5 rounded-md font-mono text-brand-muted">Encoding Scheme: Deep Navy (Top-Neck) / Ultra Violet (Left Cuff)</code>
                       </motion.div>
                     )}
                     {activeStructureTab === 'haptic' && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.98 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 0.98 }}
                         className="text-center max-w-md space-y-4"
                       >
                          <Fingerprint className="w-16 h-16 text-soft-cyan opacity-80 mx-auto" strokeWidth={1} />
                          <h4 className="text-xl font-serif italic text-brand-text">Sensing Actuators Allocation</h4>
                          <p className="text-xs text-brand-muted leading-relaxed font-light">
                            Three pneumatic cells are distributed on each side, placing soft pressure on key points mimicking family reassurance. High frequency heat dissipation fabrics ensure safe and allergy-painless longevity.
                          </p>
                          <code className="text-[9px] bg-white/60 px-3 py-1.5 rounded-md font-mono text-brand-muted">Point Configuration: Left Infraspinatous / Right Trapezius Nodes</code>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             </FadeIn>
          </div>

          {/* Core Feature Bento Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {functionalHighlights.map((feat, i) => (
              <FadeIn delay={0.1 * i} key={i} className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 p-8 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-8xl font-serif italic opacity-[0.04] text-black select-none font-bold group-hover:scale-110 transition-transform">
                  {feat.num}
                </div>
                
                <div className="space-y-4 relative z-10">
                   <div className="flex items-center gap-2">
                     <span className="text-[9px] font-bold tracking-widest text-[#FF5FA2] bg-pink-100 hover:bg-pink-200 cursor-pointer px-3 py-1 rounded-full uppercase">
                       {feat.tag}
                     </span>
                   </div>
                   
                   <div>
                     <h3 className="text-2xl font-serif italic text-brand-text mb-1 leading-snug">{feat.title}</h3>
                     <h4 className="text-xs font-semibold text-brand-muted">{feat.zhTitle}</h4>
                   </div>
                   
                   <p className="text-[13px] text-brand-text/90 leading-relaxed font-light">{feat.en}</p>
                </div>

                <div className="border-t border-black/5 pt-4 mt-6 relative z-10">
                   <p className="text-[11px] text-brand-muted font-light leading-relaxed">{feat.zh}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Interaction Scenario (Story Step Slider) */}
      <section className="py-24 relative z-10 bg-white/20 backdrop-blur-xl border-y border-white/50">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#A978FF] uppercase block mb-2">06 / DAY STORYBOARD</span>
              <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text">A Day with Forget-Me-Not</h2>
              <p className="text-xs md:text-sm text-brand-muted font-light mt-1">
                Follow Forget-Me-Not’s intelligent loop from morning dressing to midnight smart home safety.
              </p>
            </div>
            
            {/* Direct selector indicators */}
            <div className="flex flex-wrap gap-2">
               {storySteps.map((step, i) => (
                 <button 
                   key={i}
                   onClick={() => { soundManager.playClick(); setActiveStoryStep(i); }}
                   className={`px-3.5 py-2 rounded-full border text-[11px] font-bold tracking-wider transition-all ${activeStoryStep === i ? 'bg-[#A978FF] text-white border-[#A978FF]' : 'bg-white/60 hover:bg-white text-brand-text border-white/80'}`}
                 >
                    {step.time}
                 </button>
               ))}
            </div>
          </div>

          <div className="bg-white/40 border border-white/80 rounded-[3rem] p-6 md:p-10 shadow-sm relative overflow-hidden">
             
             {/* Simulated progression track indicator */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-[#A978FF]/10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-neon-pink to-glow-purple"
                  animate={{ width: `${((activeStoryStep + 1) / storySteps.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
             </div>

             <div className="grid lg:grid-cols-12 gap-8 items-center mt-4">
                
                {/* Visual simulator box on left */}
                <div className="lg:col-span-4 aspect-[4/3] bg-white/50 rounded-[2rem] overflow-hidden relative border border-white/60 flex items-center justify-center p-6 text-center shadow-inner group">
                   <div className="absolute inset-0 bg-gradient-to-br from-pale-rose/20 to-glow-purple/10 pointer-events-none" />
                   
                   <AnimatePresence mode="wait">
                     <motion.div 
                       key={activeStoryStep}
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.95 }}
                       transition={{ duration: 0.3 }}
                       className="space-y-4"
                     >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-white/80 flex items-center justify-center text-[#A978FF] shadow-xs mx-auto group-hover:scale-105 transition-transform">
                           {React.createElement(storySteps[activeStoryStep].icon, { strokeWidth: 1.2, className: "w-8 h-8" })}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-[#FF5FA2] font-semibold block">{storySteps[activeStoryStep].time}</span>
                        <h4 className="text-lg font-serif italic text-brand-text">{storySteps[activeStoryStep].phase}</h4>
                        <span className="text-xs text-brand-muted block font-light leading-none">{storySteps[activeStoryStep].zhPhase}</span>
                     </motion.div>
                   </AnimatePresence>

                   {/* Floating Next handle */}
                   <button 
                     onClick={() => { soundManager.playSwipe(); setActiveStoryStep((activeStoryStep + 1) % storySteps.length); }}
                     className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white border border-white/80 shadow-md flex items-center justify-center text-[#A978FF] hover:scale-110 active:scale-95 transition-transform"
                   >
                     <ArrowRight size={16} />
                   </button>
                </div>

                {/* Narrative box on right */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStoryStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                         <div>
                           <h3 className="text-2xl sm:text-3xl font-serif italic text-brand-text mb-1 leading-snug">
                             {storySteps[activeStoryStep].title}
                           </h3>
                           <h4 className="text-sm font-semibold text-[#A978FF]">{storySteps[activeStoryStep].zhTitle}</h4>
                         </div>

                         <div className="space-y-4">
                           <p className="text-[14px] md:text-base text-brand-text leading-relaxed font-light">{storySteps[activeStoryStep].desc}</p>
                           <p className="text-xs md:text-[13px] text-brand-muted tracking-wide leading-relaxed font-light border-l-2 border-[#A978FF]/30 pl-4">
                             {storySteps[activeStoryStep].zhDesc}
                           </p>
                         </div>
                      </motion.div>
                   </AnimatePresence>
                </div>

             </div>
          </div>

        </div>
      </section>

      {/* 9. Visual / Prototype Gallery */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-white/10">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-glow-purple uppercase block mb-2">07 / DESIGN BLUEPRINTS</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text mb-4">System Specimen & Physical Blueprints</h2>
            <p className="text-xs md:text-sm text-brand-muted font-light">
              Visual specs illustrating tailoring nodes, sensor matrices, haptic arrays, and IoT connections.
              <br/><span className="text-[11px] block mt-1 opacity-70">设计方案与软硬件实装图：展示结构打版图、柔性纱线分布及勿忘我配套中控。</span>
            </p>
          </FadeIn>

          {/* Art-collage style layout with rotational panels */}
          <div className="grid md:grid-cols-12 gap-6 auto-rows-[220px]">
             
             <FadeIn className="md:col-span-8 md:row-span-2 bg-white/40 border border-white/60 p-4 rounded-[2.5rem] shadow-sm transform -rotate-1 hover:rotate-0 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div className="w-full h-[320px] rounded-2xl overflow-hidden bg-white/50 relative">
                  <PlaceholderImage text="[Blueprint 01: Smart jacket front and side structural pattern]" className="w-full h-full !bg-transparent text-brand-text/50 font-serif italic" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-glow-purple shadow-sm uppercase z-10">
                     01 / Front & Side Structural Cut
                  </div>
                </div>
                <div className="px-2 mt-4 text-left">
                  <span className="text-xs font-bold text-brand-text block uppercase">Chapter 2 System Pattern Drafting</span>
                  <p className="text-[11px] text-brand-muted font-light">智能服装前偏开、袖缝预埋传感器布线槽结构原型打版示意</p>
                </div>
             </FadeIn>

             <FadeIn delay={0.1} className="md:col-span-4 bg-white/40 border border-white/60 p-3 rounded-[2rem] shadow-sm transform rotate-1 hover:rotate-0 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div className="w-full h-[140px] rounded-2xl overflow-hidden bg-white/50 relative">
                   <PlaceholderImage text="[Blueprint 02: Conductive wrist threads details]" className="w-full h-full !bg-transparent text-brand-text/40 font-serif text-sm italic" />
                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-neon-pink shadow-sm uppercase z-10">
                     02/ Knitted Conductive Cuff
                   </div>
                </div>
                <span className="text-[10px] text-brand-muted font-light px-1">银纤维防静电导电织带，评估桡动脉心率</span>
             </FadeIn>

             <FadeIn delay={0.2} className="md:col-span-4 bg-white/40 border border-white/60 p-3 rounded-[2rem] shadow-sm transform -rotate-1 hover:rotate-0 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div className="w-full h-[140px] rounded-2xl overflow-hidden bg-white/50 relative">
                   <PlaceholderImage text="[Blueprint 03: Miniature back touch actuators]" className="w-full h-full !bg-transparent text-brand-text/40 font-serif text-sm italic" />
                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-glow-purple shadow-sm uppercase z-10">
                     03/ Magnet Haptic Matrix
                   </div>
                </div>
                <span className="text-[10px] text-brand-muted font-light px-1">对称肩胛骨毫米级低压气囊，模拟搭肩拍抚</span>
             </FadeIn>

             <FadeIn delay={0.3} className="md:col-span-6 bg-white/40 border border-white/60 p-3 rounded-[2rem] shadow-sm transform rotate-2 hover:rotate-0 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div className="w-full h-[155px] rounded-2xl overflow-hidden bg-[#FFF9FB] relative">
                   <PlaceholderImage text="[Blueprint 04: Forget-Me-Not companion mechanical flower details]" className="w-full h-full !bg-transparent text-brand-text/40 font-serif text-sm italic" />
                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-teal-600 shadow-sm uppercase z-10">
                     04/ Companion mechanical IoT Flower
                   </div>
                </div>
                <span className="text-[10px] text-brand-muted font-light px-1 mt-2 block">物联网花盆：微型电机驱动连杆片仿真花瓣缓慢绽放机制</span>
             </FadeIn>

             <FadeIn delay={0.4} className="md:col-span-6 bg-white/40 border border-white/60 p-3 rounded-[2rem] shadow-sm transform -rotate-1 hover:rotate-0 hover:shadow-lg transition-all duration-500 flex flex-col justify-between">
                <div className="w-full h-[155px] rounded-2xl overflow-hidden bg-white/50 relative">
                   <PlaceholderImage text="[Blueprint 05: Whole ecosystem telemetry network]" className="w-full h-full !bg-transparent text-brand-text/40 font-serif text-sm italic" />
                   <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-600 shadow-sm uppercase z-10">
                     05/ IoT Care System Blueprint
                   </div>
                </div>
                <span className="text-[10px] text-brand-muted font-light px-1 mt-2 block">生态连接全图景：老人智能外衣-子女桌面勿忘我-智能家居关怀</span>
             </FadeIn>

          </div>

        </div>
      </section>

      {/* 10. Design Value (Benefit Grid) */}
      <section className="py-24 relative z-10 bg-white/30 backdrop-blur-sm border-y border-white/35">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.25em] text-glow-purple uppercase block mb-2">08 / SYSTEM IMPACT</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-brand-text mb-4">Values Built in Yarn</h2>
            <p className="text-xs md:text-sm text-brand-muted font-light">
              Designing to validate patient life independence and close emotional distance.
              <br/><span className="text-[11px] block mt-1 opacity-70">让照护融于日常起居。</span>
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {designValues.map((value, i) => (
              <FadeIn delay={0.15 * i} key={i} className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-[2.5rem] p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-glow-purple to-neon-pink/80 flex items-center justify-center text-white text-sm font-bold font-serif italic mb-6">
                     0{i + 1}
                  </div>
                  <h3 className="text-xl font-serif italic text-brand-text mb-1">{value.title}</h3>
                  <h4 className="text-xs font-semibold text-brand-muted mb-4">{value.zhTitle}</h4>
                  <p className="text-[13px] text-brand-text/85 leading-relaxed font-light mb-6">{value.desc}</p>
                </div>
                <p className="text-[11px] text-brand-muted font-light leading-relaxed border-t border-black/5 pt-4">
                  {value.zhDesc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Reflection Block */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-white/10">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <FadeIn className="space-y-8 flex flex-col items-center">
             <Heart className="w-12 h-12 text-neon-pink animate-pulse" strokeWidth={1} />
             
             <h3 className="text-3xl font-serif italic text-brand-text">Design Reflections</h3>
             
             <div className="space-y-6">
                <p className="text-base sm:text-lg md:text-xl font-light text-brand-text/90 italic leading-relaxed max-w-3xl">
                  "This project helped me understand that inclusive design is not only about solving functional problems, but also about protecting dignity, emotion, and connection in everyday life. For dementia patients, clothing is not just a daily object. It can become a gentle interface between the body, memory, family, and care."
                </p>
                
                <p className="text-xs sm:text-sm md:text-base text-brand-muted tracking-wide font-light border-t border-brand-muted/20 pt-6 max-w-2xl mx-auto">
                  这个项目让我意识到，包容性设计不仅是解决功能问题，也是在日常生活中保护人的尊严、情绪和关系。对于认知症老人来说，衣服不只是日用品，也可以成为连接身体、记忆、家人和照护的温柔媒介。
                </p>
             </div>
             
             <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-glow-purple to-transparent mt-8"></div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
