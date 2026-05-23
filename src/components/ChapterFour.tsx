import React, { useState, useEffect, useRef } from 'react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/sound';
import { PlaceholderImage } from './PlaceholderImage';
import { 
  Headphones, 
  Play, 
  RotateCcw, 
  Heart, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  UserCheck, 
  Brain, 
  Waves, 
  Coffee, 
  Music, 
  Volume2, 
  Timer, 
  Crosshair, 
  ChevronRight, 
  Tv, 
  HelpCircle,
  CheckCircle2,
  ListFilter,
  Watch,
  Cpu,
  Glasses,
  Zap,
  Gamepad2,
  Gauge,
  CloudRain,
  Bird,
  BookOpen,
  Keyboard,
  Train,
  School,
  Flame,
  Car,
  Wrench,
  Users,
  AlertTriangle,
  GraduationCap,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon
} from 'lucide-react';

interface TargetPoint {
  id: number;
  x: number; // percentage
  y: number; // percentage
  num?: number;
  isClicked: boolean;
}

export function ChapterFour() {
  const [activeSection, setActiveSection] = useState<'overview' | 'flow' | 'playground' | 'storyboard'>('overview');
  
  // --- Stress Sound Lab States ---
  const [playgroundStep, setPlaygroundStep] = useState<number>(1);
  const [activeSoundCategory, setActiveSoundCategory] = useState<'relaxing' | 'neutral' | 'intense'>('relaxing');
  const [selectedSound, setSelectedSound] = useState<string>('ocean_waves');
  const [selectedTask, setSelectedTask] = useState<'shooting' | 'connect'>('shooting');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [timer, setTimer] = useState<number>(0);
  const [targets, setTargets] = useState<TargetPoint[]>([]);
  const [nextNumberToClick, setNextNumberToClick] = useState<number>(1);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [correctClicks, setCorrectClicks] = useState<number>(0);
  const [shakeDotId, setShakeDotId] = useState<number | null>(null);
  const [subjectiveStress, setSubjectiveStress] = useState<number>(3);
  const [subjectiveFocus, setSubjectiveFocus] = useState<number>(3);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);
  const [roundsHistory, setRoundsHistory] = useState<any[]>([]);
  const [storyboardImages, setStoryboardImages] = useState<Record<number, string>>({});
  const [activeUrlPromptId, setActiveUrlPromptId] = useState<number | null>(null);
  const [tempUrlValue, setTempUrlValue] = useState<string>('');
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Expanded Sound environment profiles mapped by category
  const soundCategories = [
    {
      id: 'relaxing',
      title: 'Relaxing / Low-stress Sounds',
      zhTitle: '放松 / 低压力环境',
      tag: 'Low Stress',
      tagColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      sounds: [
        { id: 'ocean_waves', name: 'Ocean Waves', zhName: '海浪声', icon: Waves, soundType: 'wave' },
        { id: 'light_rain', name: 'Light Rain', zhName: '小雨声', icon: CloudRain, soundType: 'pulse' },
        { id: 'forest_birds', name: 'Forest Birds', zhName: '森林鸟鸣', icon: Bird, soundType: 'hover' },
        { id: 'soft_piano', name: 'Soft Piano', zhName: '轻柔钢琴', icon: Music, soundType: 'message' },
        { id: 'white_noise', name: 'White Noise', zhName: '白噪音', icon: Volume2, soundType: 'pulse' }
      ]
    },
    {
      id: 'neutral',
      title: 'Everyday / Neutral Sounds',
      zhTitle: '日常 / 中性环境',
      tag: 'Neutral',
      tagColor: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      sounds: [
        { id: 'cafe_noise', name: 'Café Noise', zhName: '咖啡馆环境音', icon: Coffee, soundType: 'click' },
        { id: 'library_murmur', name: 'Library Murmur', zhName: '图书馆轻微人声', icon: BookOpen, soundType: 'hover' },
        { id: 'office_keyboard', name: 'Office Keyboard', zhName: '办公室键盘声', icon: Keyboard, soundType: 'click' },
        { id: 'subway_interior', name: 'Subway Interior', zhName: '地铁车厢环境音', icon: Train, soundType: 'pulse' },
        { id: 'classroom_bg', name: 'Classroom Background', zhName: '教室背景音', icon: GraduationCap, soundType: 'hover' }
      ]
    },
    {
      id: 'intense',
      title: 'High-stimulation / Stressful Sounds',
      zhTitle: '高刺激 / 压力环境',
      tag: 'High Stimulation',
      tagColor: 'bg-rose-500/10 border-rose-500/20 text-rose-450 text-rose-400 font-bold',
      sounds: [
        { id: 'rock_music', name: 'Rock Music', zhName: '摇滚音乐', icon: Flame, soundType: 'sparkle' },
        { id: 'edm_beat', name: 'EDM', zhName: '快节奏电子乐', icon: Zap, soundType: 'sparkle' },
        { id: 'traffic_noise', name: 'Traffic Noise', zhName: '交通噪音', icon: Car, soundType: 'paper' },
        { id: 'construction_noise', name: 'Construction Noise', zhName: '施工噪音', icon: Wrench, soundType: 'paper' },
        { id: 'crowd_shouting', name: 'Crowd Shouting', zhName: '嘈杂人群声', icon: Users, soundType: 'pulse' },
        { id: 'alarm_sound', name: 'Alarm Sound', zhName: '警报声', icon: AlertTriangle, soundType: 'message' }
      ]
    }
  ];

  const getActiveSoundInfo = () => {
    for (const cat of soundCategories) {
      const found = cat.sounds.find(s => s.id === selectedSound);
      if (found) {
        return {
          ...found,
          categoryTitle: cat.title,
          categoryZhTitle: cat.zhTitle,
          tag: cat.tag,
          tagColor: cat.tagColor
        };
      }
    }
    return {
      id: 'ocean_waves',
      name: 'Ocean Waves',
      zhName: '海浪声',
      icon: Waves,
      soundType: 'wave',
      categoryTitle: 'Relaxing / Low-stress Sounds',
      categoryZhTitle: '放松 / 低压力环境',
      tag: 'Low Stress',
      tagColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    };
  };

  const activeSoundInfo = getActiveSoundInfo();

  const metadata = [
    { label: "Project Type", value: "HCI Research / VR User Study", zh: "HCI 研究 / VR 用户实验", icon: Glasses },
    { label: "Context", value: "School Research Environment", zh: "学术研究实验室环境", icon: Cpu },
    { label: "Session Length", value: "Around 1 hour per session", zh: "单次测试时长：约 1 小时", icon: Timer },
    { label: "My Role", value: "Experimental Participant / Research Assistant", zh: "实验参与者 / 研究协助者", icon: UserCheck },
    { label: "Methods", value: "VR Testing / Questionnaire / Material Organization", zh: "VR 测试体验 / 问卷回收 / 语料材料整理", icon: Brain }
  ];

  const roleIntroduction = {
    title: "Experimental Participant & Research Assistant",
    zhTitle: "实验参与者 / 研究协助者 双重身份",
    desc: "In this project, I participated as both an experimental participant and a research assistant. I joined multiple one-hour VR testing sessions, completed interaction tasks under different auditory conditions, filled in questionnaires, provided feedback, and supported the organization of research materials.",
    zhDesc: "在这个项目中，我以实验参与者和研究协助者的双重身份参与。我多次参与约一小时的 VR 物理实验室测试，在不同声音环境下戴上头显完成手柄交互任务，填写主观体验问卷、提供定量定性反馈，并协助梳理整理相关研究与报告语料。"
  };

  const flowSteps = [
    {
      num: "01",
      title: "Equipment Setup",
      zhTitle: "设备佩戴与校准",
      desc: "Participants wore a VR headset and sensor-based controllers inside the calibrated physical research laboratory.",
      zhDesc: "参与者在专门的学校人机交互暗室中，佩戴头戴式 VR 眼镜与具有空间追踪传感器的高精度手柄。",
      icon: Glasses
    },
    {
      num: "02",
      title: "Virtual Environment",
      zhTitle: "进入全景虚拟场景",
      desc: "Participants entered a simulated virtual three-dimensional scene and followed step-by-step controller orientation instructions.",
      zhDesc: "参与者进入定制的 3D 三维虚拟测试空间，根据系统初始引导确定基准视线与手持控制器姿态。",
      icon: Tv
    },
    {
      num: "03",
      title: "Auditory Conditions",
      zhTitle: "随机引入声音刺激",
      desc: "Different spatialized soundscapes (such as noisy café noise, soothing waves, or fast rock) simulated varying cognitive friction and stress states.",
      zhDesc: "系统通过耳麦随机播放咖啡馆喧闹声、静谧海风、高唤醒摇滚或连续粉噪等，从而重塑用户的压力负荷状态。",
      icon: Headphones
    },
    {
      num: "04",
      title: "Interaction Tasks",
      zhTitle: "完成精准交互任务",
      desc: "Participants performed cognitive-physical tasks including shooting floating canvas targets and clicking dots in specific sequences.",
      zhDesc: "在此声音刺激下，参与者需快速完成空间射线射击漂浮目标，或是按特定升序连点成线等精密动作指示。",
      icon: Gamepad2
    },
    {
      num: "05",
      title: "Performance Recording",
      zhTitle: "记录系统任务时间",
      desc: "The system automatically mapped target accuracy values, task completion durations, and subtle hand tremor profiles.",
      zhDesc: "后台记录设备采集每个任务的最长耗时、动作误差偏离像素、手部生理颤抖频率等交互多通道数据。",
      icon: Watch
    },
    {
      num: "06",
      title: "Feedback Questionnaire",
      zhTitle: "主观体验问卷填写",
      desc: "After taking off the VR headset, participants filled out standardized cognitive load questionnaires and shared qualitative reflections.",
      zhDesc: "测试结束脱卸设备，填写 NASA-TLX 任务负荷指数主观量表，探讨不同听觉负载对个体专注和肌肉张力的隐性干涉。",
      icon: UserCheck
    }
  ];

  const storyboardFrames = [
    {
      id: 1,
      frame: "Frame 1",
      title: "Subject Lab Prep",
      zhTitle: "1. 实验室准备",
      desc: "The participant enters the school lab, receives instructions, and wears the VR headset and sensor-based controllers.",
      zhDesc: "参与者进入学校实验室，听取主试实验说明，佩戴VR眼镜和传感器手柄，调整瞳距与感应精度。",
      placeholderText: "Photo Placeholder: Wearing VR headset"
    },
    {
      id: 2,
      frame: "Frame 2",
      title: "Auditory Stimulation",
      zhTitle: "2. 声音情景注入",
      desc: "A background sound condition begins, simulating real-life soundscapes like café clutter, ocean waves, or rhythmic energy.",
      zhDesc: "高保真监听耳机开始注入不同的环境音。声波、节奏脉冲或是杂乱的人声在耳后立体盘旋，心理刺激开始生效。",
      placeholderText: "Photo Placeholder: Sensor-based controller"
    },
    {
      id: 3,
      frame: "Frame 3",
      title: "Task Performance",
      zhTitle: "3. 目标交互点击",
      desc: "The participant completes spatial tasks (shooting targets or connecting logical dots) while the system automatically tracks completion times.",
      zhDesc: "参与者在声音噪声侵扰或者静谧引导下，迅速用枪指射线瞄准漂浮靶心，或是寻找数字微型星轨进行有序连线。",
      placeholderText: "Photo Placeholder: VR task interface"
    },
    {
      id: 4,
      frame: "Frame 4",
      title: "Subjective Scoring",
      zhTitle: "4. 定量量表评估",
      desc: "After the session, the participant fills in a questionnaire and reflects on how the sound environment influenced focus, stress, and interaction rhythm.",
      zhDesc: "卸下头显，参与者进入定性与定量打分区，仔细记录自己在摇滚乐下的忙乱感以及在海浪音底下的专注心率呼吸比。",
      placeholderText: "Photo Placeholder: Questionnaire or feedback material"
    }
  ];

  const applicationScenarios = [
    {
      id: "app1",
      title: "VR Training Systems",
      zhTitle: "VR 高危情境训练系统",
      desc: "The study can inform VR training systems for emergency response, medical practice, safety training, or disaster simulations, where users need to perform tasks under stressful or noisy conditions.",
      zhDesc: "该研究为抢险急救、外科手术、工业抢修或高空排障等VR模拟训练提供了交互心理支持，训练操作员在高压强噪的极端负荷环境下保持心理肌肉平衡。"
    },
    {
      id: "app2",
      title: "Stress-aware UX Design",
      zhTitle: "压力感知型自适应界面",
      desc: "The experiment suggests possibilities for interfaces that adapt to users' stress levels, attention load, and interaction performance.",
      zhDesc: "启发了下一代智能系统的多模态交互自适应：当麦克风检测到周遭噪声飙升或可穿戴设备提示心率加剧，界面自动增大操作靶区，过滤手部抖动。"
    },
    {
      id: "app3",
      title: "Focus & Wellness Tools",
      zhTitle: "声学专注与健康冥想应用",
      desc: "Understanding how sound affects attention can support the design of focus tools, learning environments, relaxation apps, and mental wellness experiences.",
      zhDesc: "系统刻画了声音物理参数与人类微小注意力分布的敏感对应，从而为数字疗愈、舒缓节奏调节及专注力空间构建等日常办公工具赋能。"
    },
    {
      id: "app4",
      title: "Immersive Game Design",
      zhTitle: "沉浸式音频游戏机制机制",
      desc: "Sound intensity and emotional atmosphere can dynamically influence players' reaction, rhythm, and immersion in interactive games.",
      zhDesc: "帮助游戏开发者以环境音效、动态打击乐控制玩家的肾上腺素释放和瞄准误差，通过音频强度和情调深度编排极致沉浸的操作心流。"
    }
  ];

  const reflectionText = {
    en: "Through repeated participation in this VR experiment, I realized that HCI research is not only about whether an interface is usable, but also about how people interact with systems under different environmental and psychological conditions. Sound, stress, attention, and bodily control are closely connected, and experimental procedures, task design, and questionnaire feedback are essential for understanding user experience.",
    zh: "通过多次参与这个 VR 实验，我意识到人机交互（HCI）研究不仅关注软件界面是否好用，更关乎在不同的物理环境与多维心理负荷之下，人在系统面前的身心表现。声音、压力、注意力的集中以及周遭肌肉控制力之间存在着细微而复杂的系统耦合。这种从实验室第一人称亲身感悟的实验反馈与材料整理工作，极大地加深了我对于用户体验底层本质的认识与设计感知。"
  };

  // --- Game Mechanics ---
  const generateGameTargets = () => {
    // Gentle chime to begin the trial
    soundManager.playDreamyBell();
    setErrorCount(0);
    setTotalClicks(0);
    setCorrectClicks(0);
    setTimer(0);
    setShakeDotId(null);
    
    if (selectedTask === 'shooting') {
      // Generate 8 random Targets
      const newTargets: TargetPoint[] = [];
      for (let i = 0; i < 8; i++) {
        // Space targets out comfortably inside the grid
        const x = 15 + Math.random() * 70;
        const y = 20 + Math.random() * 60;
        newTargets.push({ id: i, x, y, isClicked: false });
      }
      setTargets(newTargets);
    } else {
      // Connect points 1 to 6 in a beautiful staggered layout
      const layoutPoints = [
        { id: 1, x: 25, y: 35, num: 1, isClicked: false },
        { id: 2, x: 42, y: 72, num: 2, isClicked: false },
        { id: 3, x: 60, y: 28, num: 3, isClicked: false },
        { id: 4, x: 75, y: 65, num: 4, isClicked: false },
        { id: 5, x: 82, y: 32, num: 5, isClicked: false },
        { id: 6, x: 48, y: 48, num: 6, isClicked: false },
      ];
      setTargets(layoutPoints);
      setNextNumberToClick(1);
    }
    
    setGameState('playing');
    
    // Start high-frequency interval timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    const startTime = Date.now();
    timerIntervalRef.current = setInterval(() => {
      setTimer((Date.now() - startTime) / 1000);
    }, 47);
  };

  const handleTargetClick = (target: TargetPoint, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent counting as background miss click!
    if (gameState !== 'playing') return;

    if (selectedTask === 'shooting') {
      if (target.isClicked) return;
      soundManager.playSparkle(); // Soft pulse sound
      
      const updated = targets.map(t => t.id === target.id ? { ...t, isClicked: true } : t);
      setTargets(updated);
      setTotalClicks(prev => prev + 1);
      setCorrectClicks(prev => prev + 1);
      
      if (updated.every(t => t.isClicked)) {
        finishGame();
      }
    } else {
      // Sequencing Task: Connect-the-dots
      if (target.num === nextNumberToClick) {
        soundManager.playSparkle(); // Sound indicator for correct match
        const updated = targets.map(t => t.num === target.num ? { ...t, isClicked: true } : t);
        setTargets(updated);
        setTotalClicks(prev => prev + 1);
        setCorrectClicks(prev => prev + 1);
        
        if (nextNumberToClick === 6) {
          finishGame();
        } else {
          setNextNumberToClick(nextNumberToClick + 1);
        }
      } else {
        // Wrong number in sequence clicked
        soundManager.playPaper(); // Buzz response
        setShakeDotId(target.id);
        setErrorCount(prev => prev + 1);
        setTotalClicks(prev => prev + 1);
        setTimeout(() => setShakeDotId(null), 400);
      }
    }
  };

  const handleCanvasBackgroundClick = () => {
    if (gameState !== 'playing') return;
    soundManager.playPaper(); // Play warning buzz
    setErrorCount(prev => prev + 1);
    setTotalClicks(prev => prev + 1);
  };

  const finishGame = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    soundManager.playBloom(); // Success chime
    setGameState('completed');
    setPlaygroundStep(4); // Automatically transition to results and survey
    setIsSurveySubmitted(false);
  };

  const resetGame = () => {
    soundManager.playClick();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setGameState('idle');
    setTargets([]);
    setTimer(0);
    setErrorCount(0);
    setTotalClicks(0);
    setCorrectClicks(0);
    setPlaygroundStep(1); // Go back to first step of design
  };

  const triggerSoundSample = (soundId: string, type: string) => {
    // Force soundManager to be active & initialized
    soundManager.enabled = true;
    soundManager.init();
    
    const ctx = soundManager.audioCtx;
    if (!ctx) return;

    // Safety resume check
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // High fidelity browser synthesizer utility helper
    const playLocalTone = (freq: number, oscType: OscillatorType, duration: number, volume: number) => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        // Ignore audio hardware constraints
      }
    };

    switch (soundId) {
      // --- Relaxing / Low-stress ---
      case 'ocean_waves': {
        // Ocean: Low, smooth rolling sweeps simulating rolling swells
        playLocalTone(150, 'sine', 1.8, 0.08);
        setTimeout(() => playLocalTone(180, 'sine', 1.5, 0.06), 200);
        setTimeout(() => playLocalTone(120, 'sine', 1.9, 0.05), 450);
        break;
      }
      case 'light_rain': {
        // Rain: Delicate, fast pitter-patter droplet frequencies
        playLocalTone(1300, 'sine', 0.04, 0.03);
        setTimeout(() => playLocalTone(1450, 'sine', 0.03, 0.02), 70);
        setTimeout(() => playLocalTone(1150, 'sine', 0.05, 0.025), 140);
        setTimeout(() => playLocalTone(1500, 'sine', 0.03, 0.015), 210);
        break;
      }
      case 'forest_birds': {
        // Forest birds: Dynamic realistic sliding tweets
        try {
          const chirp = (delay: number, baseFreq: number) => {
            setTimeout(() => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
              osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, ctx.currentTime + 0.12);
              gain.gain.setValueAtTime(0.035, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start();
              osc.stop(ctx.currentTime + 0.15);
            }, delay);
          };
          chirp(0, 1550);
          chirp(140, 1820);
        } catch (e) {}
        break;
      }
      case 'soft_piano': {
        // Piano: Elegant harmonious minor-major chord arpeggio
        playLocalTone(261.63, 'sine', 1.0, 0.06); // C4
        setTimeout(() => playLocalTone(329.63, 'sine', 0.9, 0.05), 100); // E4
        setTimeout(() => playLocalTone(392.00, 'sine', 0.8, 0.045), 200); // G4
        setTimeout(() => playLocalTone(493.88, 'sine', 0.9, 0.035), 300); // B4
        setTimeout(() => playLocalTone(523.25, 'sine', 1.1, 0.03), 400); // C5
        break;
      }
      case 'white_noise': {
        // White noise: Smooth layered broad frequency breeze
        playLocalTone(420, 'sine', 0.5, 0.02);
        playLocalTone(720, 'sine', 0.45, 0.015);
        playLocalTone(1250, 'sine', 0.4, 0.012);
        playLocalTone(2400, 'sine', 0.35, 0.008);
        break;
      }

      // --- Everyday / Neutral ---
      case 'cafe_noise': {
        // Cafe chatter: Clinking glasses and low warm hum
        playLocalTone(115, 'triangle', 0.6, 0.06);
        playLocalTone(175, 'triangle', 0.5, 0.04);
        setTimeout(() => playLocalTone(2450, 'sine', 0.07, 0.03), 280); // Quick mug click
        break;
      }
      case 'library_murmur': {
        // Library murmur: Extremely muted high-frequency rustles
        playLocalTone(105, 'sine', 0.4, 0.035);
        setTimeout(() => playLocalTone(145, 'sine', 0.35, 0.03), 60);
        break;
      }
      case 'office_keyboard': {
        // Office keyboard: Tactile clickety-clack of key caps
        playLocalTone(1050, 'triangle', 0.03, 0.03);
        setTimeout(() => playLocalTone(880, 'square', 0.02, 0.018), 40);
        setTimeout(() => playLocalTone(1150, 'triangle', 0.025, 0.025), 90);
        setTimeout(() => playLocalTone(920, 'square', 0.02, 0.018), 130);
        break;
      }
      case 'subway_interior': {
        // Subway: Sub-bass engine hum & squealing metal rail
        playLocalTone(52, 'triangle', 1.4, 0.09); // low cabin hum
        playLocalTone(108, 'sine', 1.2, 0.05);
        break;
      }
      case 'classroom_bg': {
        // Classroom murmur: Scattered student chats
        playLocalTone(210, 'triangle', 0.5, 0.04);
        playLocalTone(255, 'sine', 0.45, 0.03);
        setTimeout(() => playLocalTone(340, 'triangle', 0.4, 0.025), 110);
        break;
      }

      // --- High Stimulation / Intense ---
      case 'rock_music': {
        // Rock music: Aggressive double sawtooth riffs
        playLocalTone(110, 'sawtooth' as OscillatorType, 0.14, 0.04);
        setTimeout(() => playLocalTone(110, 'sawtooth' as OscillatorType, 0.14, 0.04), 140);
        setTimeout(() => playLocalTone(165, 'sawtooth' as OscillatorType, 0.28, 0.035), 280);
        break;
      }
      case 'edm_beat': {
        // EDM: Deep kicks followed by snappy hi-hat trigger
        playLocalTone(58, 'sine', 0.2, 0.11);
        setTimeout(() => playLocalTone(900, 'triangle', 0.1, 0.04), 110);
        break;
      }
      case 'traffic_noise': {
        // Traffic: Passing auto Doppler drop + honk
        try {
          const autoOsc = ctx.createOscillator();
          const autoGain = ctx.createGain();
          autoOsc.type = 'triangle';
          autoOsc.frequency.setValueAtTime(330, ctx.currentTime);
          autoOsc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.38);
          autoGain.gain.setValueAtTime(0.045, ctx.currentTime);
          autoGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
          autoOsc.connect(autoGain);
          autoGain.connect(ctx.destination);
          autoOsc.start();
          autoOsc.stop(ctx.currentTime + 0.38);
        } catch (e) {}

        setTimeout(() => {
          playLocalTone(435, 'sine', 0.18, 0.03); // Doppler car beep
        }, 160);
        break;
      }
      case 'construction_noise': {
        // Construction: Repeating rattle of jackhammers
        const hammer = (delay: number) => {
          setTimeout(() => playLocalTone(72, 'square', 0.035, 0.055), delay);
        };
        hammer(0);
        hammer(60);
        hammer(120);
        hammer(180);
        hammer(240);
        break;
      }
      case 'crowd_shouting': {
        // Chaotic loud room
        playLocalTone(280, 'sine', 0.55, 0.045);
        playLocalTone(360, 'sawtooth' as OscillatorType, 0.45, 0.015);
        playLocalTone(450, 'triangle', 0.4, 0.025);
        break;
      }
      case 'alarm_sound': {
        // Red sirens: High frequency warning swings
        playLocalTone(1000, 'sine', 0.2, 0.065);
        setTimeout(() => playLocalTone(800, 'sine', 0.22, 0.065), 180);
        break;
      }
      default: {
        // Fallback standard type playing
        if (type === 'pinknoise' || type === 'paper') {
          soundManager.playPaper();
        } else if (type === 'rock' || type === 'click' || type === 'sparkle') {
          soundManager.playPulse();
        } else if (type === 'waves' || type === 'wave') {
          soundManager.playWave();
        } else if (type === 'message') {
          soundManager.playMessage();
        } else {
          soundManager.playClick();
        }
      }
    }
  };

  const submitSubjectiveFeedback = () => {
    soundManager.playBloom();
    
    const accuracy = totalClicks > 0 ? Math.min(100, Math.round((correctClicks / totalClicks) * 100)) : 100;
    
    const newRecord = {
      id: Date.now().toString(),
      soundName: activeSoundInfo.name,
      soundCategory: activeSoundInfo.tag,
      taskTitle: selectedTask === 'shooting' ? "Target Shoot" : "Sequencing Dots",
      time: parseFloat(timer.toFixed(2)),
      accuracy: accuracy,
      errorCount: errorCount,
      subjectiveStress: subjectiveStress,
      subjectiveFocus: subjectiveFocus
    };
    
    setRoundsHistory(prev => [newRecord, ...prev]);
    setIsSurveySubmitted(true);
  };

  const handleStoryboardFileChange = (frameId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setStoryboardImages(prev => ({
            ...prev,
            [frameId]: event.target!.result as string
          }));
          soundManager.playSparkle();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryboardUrlSubmit = (frameId: number, url: string) => {
    if (url.trim()) {
      setStoryboardImages(prev => ({
        ...prev,
        [frameId]: url.trim()
      }));
      setActiveUrlPromptId(null);
      setTempUrlValue('');
      soundManager.playSparkle();
    }
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const getSimulatedAnalysis = () => {
    const isRelaxing = activeSoundInfo.tag === 'Low Stress';
    const isNeutral = activeSoundInfo.tag === 'Neutral';
    
    if (isRelaxing) {
      return "Relaxing sound conditions may help maintain stable attention. 以 " + activeSoundInfo.name + " (" + activeSoundInfo.zhName + ") 等声学自然声景为背底，在人机工程层面上可大幅辅助降低紧张负荷，舒缓自主神经紧张，减少受试者的生理手微震，从而能为 VR 精密交互和稳定空间校对创造良好的生理屏障。";
    } else if (isNeutral) {
      return "Everyday background noise may create moderate cognitive load. 日常声学背景如 " + activeSoundInfo.name + " (" + activeSoundInfo.zhName + ") 会给中枢系统带来中等程度的非预期认知干涉。大部分人虽然对其具备天然抗噪适应力，但在高强度的定位手势交互中，细微的音视频突刺或声场深度仍可能间接触发操作时延或细碎偏差。";
    } else {
      return "High-stimulation sounds may affect interaction rhythm and increase distraction. 高度的声音负载如 " + activeSoundInfo.name + " (" + activeSoundInfo.zhName + ") 将对人类听觉感觉通道产生强势的压合遮蔽及情绪唤醒（Arousing Aneuploidy）。操作者的神经传导、手眼定位节奏在突发强声信号惊扰下可能出现剧烈振荡，由此引发目标定位精度下滑、生理微颤红区过载以及决策分心概率。";
    }
  };

  const getSimulatedTelemetry = () => {
    if (gameState !== 'playing') {
      return {
        heartRate: "72 BPM",
        heartStatus: "Standby / 常态稳定",
        heartColor: "text-slate-400 font-bold",
        brainwave: "Alpha (α) waves: 74%",
        brainwaveStatus: "Standard Cognition / 常态自适",
        tremor: "< 1.0 mm",
        tremorStatus: "Controller Ready"
      };
    }
    
    // Dynamically scale parameters depending on the active sound condition category
    if (activeSoundInfo.tag === 'Low Stress') {
      return {
        heartRate: "63 BPM",
        heartStatus: "Resting Flow / 安定状态",
        heartColor: "text-emerald-400 font-bold",
        brainwave: "Alpha (α) Sync: 87%",
        brainwaveStatus: "Arousal Reduced / 舒缓脑波",
        tremor: "< 0.35 mm",
        tremorStatus: "Extremely Stable"
      };
    } else if (activeSoundInfo.tag === 'Neutral') {
      return {
        heartRate: "78 BPM",
        heartStatus: "Normal Load / 正常工作流",
        heartColor: "text-sky-400 font-bold",
        brainwave: "Beta (β) waves: 62%",
        brainwaveStatus: "Cognitive Focus / 中度自适",
        tremor: "0.85 mm",
        tremorStatus: "Within standard tolerances"
      };
    } else {
      return {
        heartRate: "104 BPM",
        heartStatus: "Arousal Spike / 应激度异常",
        heartColor: "text-rose-450 text-rose-400 font-bold animate-pulse",
        brainwave: "High Beta (β) Burst: 95%",
        brainwaveStatus: "Mental Warning / 严重过载",
        tremor: "3.25 mm",
        tremorStatus: "High Tremor Area"
      };
    }
  };

  const tele = getSimulatedTelemetry();

  return (
    <div className="relative overflow-hidden selection:bg-purple-100 selection:text-purple-900 leading-normal">
      
      {/* Background soft styling visuals (Soft tech, Calm theme, light background) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-brand-aliceblue/20 via-white to-brand-lavender/10">
        {/* Soft floating blur shapes */}
        <div className="absolute top-[10%] right-[8%] w-[380px] h-[380px] rounded-full bg-gradient-to-br from-purple-200/20 via-pink-100/15 to-transparent blur-[110px] opacity-80" />
        <div className="absolute bottom-[20%] left-[5%] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-sky-100/35 via-lavender-50/20 to-transparent blur-[120px] opacity-75" />
        
        {/* Subtle decorative medical signals and grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
          <path d="M 0,200 C 150,150 250,250 400,200 C 550,150 750,250 900,200 C 1050,150 1200,220 1400,180" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500" strokeDasharray="5,5" />
          <path d="M0 450 L350 450 L365 435 L380 465 L395 430 L410 470 L425 445 L440 450 L750 450" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pink-500" />
          <path d="M800 450 L1150 450 L1165 435 L1180 465 L1195 430 L1210 470 L1225 445 L1240 450 L1500 450" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-500" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 max-w-7xl relative pt-24 pb-16">
        
        {/* Navigation Switcher and Page Title Header */}
        <div className="flex flex-col lg:flex-row gap-12 mt-8 lg:mt-12">
          
          {/* LEFT SIDE: Navigation and Meta Column */}
          <div className="lg:w-1/3 flex flex-col space-y-8 lg:sticky lg:top-28 lg:h-[calc(100vh-170px)] justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span 
                  onMouseEnter={soundManager.playHover}
                  onClick={soundManager.playClick}
                  className="flex items-center gap-1.5 px-3 py-1 bg-purple-100/60 backdrop-blur-md border border-purple-200/50 rounded-full text-[10.5px] font-bold tracking-wider text-purple-800 hover:bg-purple-200 transition-colors uppercase cursor-pointer shadow-xs"
                >
                  <Brain size={11} className="text-purple-600" />
                  HCI Research Assist
                </span>
                <span 
                  onMouseEnter={soundManager.playHover}
                  onClick={soundManager.playClick}
                  className="flex items-center gap-1.5 px-3 py-1 bg-sky-100/60 backdrop-blur-md border border-sky-200/50 rounded-full text-[10.5px] font-bold tracking-wider text-sky-800 hover:bg-sky-200 transition-colors uppercase cursor-pointer shadow-xs"
                >
                  <Headphones size={11} className="text-sky-600 animate-pulse" />
                  VR User Study
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-purple-800 uppercase block mb-1">CHAPTER 04 / RESEARCH STUDY</span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[54px] font-medium tracking-tight leading-[1.1] text-brand-text">
                  VR Interaction Under Stress
                </h1>
                <p className="font-sans text-[14px] sm:text-[16px] font-medium text-brand-text/90 mt-3 leading-snug">
                  Task Performance in Multi-sensory Virtual Environments
                  <span className="block text-xs text-brand-muted font-light mt-1.5 border-l border-purple-550 border-purple-400 pl-3">
                    压力情境下的 VR 人机交互实验：基于声音刺激与任务表现的用户体验研究
                  </span>
                </p>
              </div>

              {/* Glassmorphic Section Switchers */}
              <div className="bg-white/45 backdrop-blur-md border border-white/60 p-2 rounded-3xl shadow-xs space-y-1">
                {[
                  { id: 'overview', label: '01 / Project Overview', zh: '研究概览与角色', icon: UserCheck },
                  { id: 'flow', label: '02 / Experiment Setup', zh: '实验背景与科学流程', icon: Cpu },
                  { id: 'playground', label: '03 / Stress Sound Lab', zh: '声音压力实验室 (交互游戏)', icon: Gamepad2 },
                  { id: 'storyboard', label: '04 / Storyboard & Vision', zh: '故事板与应用日常场景', icon: Glasses }
                ].map((sec) => {
                  const ItemIcon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => { soundManager.playClick(); setActiveSection(sec.id as any); }}
                      onMouseEnter={soundManager.playHover}
                      className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 flex items-center justify-between gap-3 ${
                        isActive 
                          ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-700 text-white font-medium shadow-[0_4px_15px_rgba(99,102,241,0.35)] border border-indigo-400/30' 
                          : 'text-brand-text hover:bg-white/35'
                      }`}
                    >
                      <div className="flex items-center gap-3 select-none">
                        <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-white/15 text-pink-300' : 'bg-slate-100 text-slate-500'}`}>
                          <ItemIcon size={14} className={isActive && sec.id === 'playground' ? 'animate-bounce' : ''} />
                        </div>
                        <div>
                          <p className="text-xs uppercase font-bold tracking-wider leading-none">{sec.label}</p>
                          <p className={`text-[10px] ${isActive ? 'text-purple-100/90' : 'text-brand-muted'} font-light mt-1`}>{sec.zh}</p>
                        </div>
                      </div>
                      {isActive && (
                        <motion.div layoutId="sidebar-four-active-dot" className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Human-Animal Co-living Ethic quote */}
            <div className="hidden lg:block bg-stone-50/60 backdrop-blur-xs border border-white/45 p-5 rounded-2xl">
              <Headphones size={15} className="text-purple-800 mb-2" />
              <p className="text-[10.5px] leading-relaxed text-brand-muted font-light">
                "HCI design goes beyond interface pixels; it examines our physical limits and nervous responses. Studying stress environments under audio stimulation teaches us deep, humble respect for somatic user boundaries."
              </p>
              <p className="text-[10px] text-purple-700 font-bold mt-2">— Experimental Lab Reflexive Notes</p>
            </div>
          </div>

          {/* RIGHT SIDE: Content Render Panels */}
          <div className="flex-1 w-full lg:min-h-[calc(100vh-170px)] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              
              {/* SECTION 1: HERO OVERVIEW & ROLE */}
              {activeSection === 'overview' && (
                <motion.div
                  key="four-overview"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Hero / Summary Callout Card */}
                  <div className="bg-white/50 backdrop-blur-md border border-white/85 rounded-[2rem] p-8 md:p-10 shadow-xs space-y-6">
                    <span className="text-[9.5px] font-bold tracking-[0.2em] text-purple-800 uppercase block mb-1">01 / PROJECT OVERVIEW</span>
                    <h2 className="text-2xl md:text-3xl font-serif text-brand-text">A Multi-sensory Virtual Reality HCI Experiment</h2>
                    
                    <p className="text-sm leading-relaxed text-brand-text/90 font-light font-sans">
                      {roleIntroduction.desc}
                    </p>

                    <p className="text-[13px] leading-relaxed text-brand-muted border-l-2 border-purple-400 pl-4 bg-purple-50/10 py-2 italic font-light">
                      {roleIntroduction.zhDesc}
                    </p>
                  </div>

                  {/* Metadata and Context breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/40 backdrop-blur-xs border border-white/70 p-6 rounded-3xl flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase block mb-1">THE RESEARCH CARD</span>
                        <h4 className="text-base font-bold font-serif italic text-brand-text">Experimental Context</h4>
                      </div>
                      <div className="space-y-3">
                        {metadata.slice(0, 3).map((meta, i) => {
                          const MetaIcon = meta.icon;
                          return (
                            <div key={i} className="border-b border-black/5 pb-2 text-xs flex items-start gap-3">
                              <div className="p-1.5 rounded-lg bg-purple-100/60 text-purple-750 mt-1 shrink-0">
                                <MetaIcon size={13} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-brand-muted block text-[9.5px] uppercase tracking-wider">{meta.label}</span>
                                <span className="font-bold text-slate-800 my-0.5 block leading-snug">{meta.value}</span>
                                <span className="text-[10px] text-slate-400 font-light block">{meta.zh}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white/40 backdrop-blur-xs border border-white/70 p-6 rounded-3xl flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase block mb-1">THE ENGAGEMENT CARD</span>
                        <h4 className="text-base font-bold font-serif italic text-brand-text">Role & Scope</h4>
                      </div>
                      <div className="space-y-3">
                        {metadata.slice(3).map((meta, i) => {
                          const MetaIcon = meta.icon;
                          return (
                            <div key={i} className="border-b border-black/5 pb-2 text-xs flex items-start gap-3">
                              <div className="p-1.5 rounded-lg bg-pink-100/60 text-pink-700 mt-1 shrink-0">
                                <MetaIcon size={13} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-brand-muted block text-[9.5px] uppercase tracking-wider">{meta.label}</span>
                                <span className="font-bold text-slate-800 my-0.5 block leading-snug">{meta.value}</span>
                                <span className="text-[10px] text-slate-400 font-light block">{meta.zh}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Photo Placeholders setup */}
                  <div className="bg-white/40 border border-white/75 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[#6B7280]">Photo Records & Lab Artifacts</h4>
                      <span className="text-[9.5px] text-[#9CA3AF] font-mono">School Lab environment</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <PlaceholderImage text="Wearing VR headset" className="aspect-square text-[9.5px] p-4 text-center leading-normal" />
                      <PlaceholderImage text="Sensor-based controller" className="aspect-square text-[9.5px] p-4 text-center leading-normal" />
                      <PlaceholderImage text="Experimental room" className="aspect-square text-[9.5px] p-4 text-center leading-normal hover:bg-brand-lavender/30 transition-colors" />
                    </div>
                  </div>

                </motion.div>
              )}

              {/* SECTION 2: EXPERIMENT FLOW */}
              {activeSection === 'flow' && (
                <motion.div
                  key="four-flow"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="bg-white/50 backdrop-blur-md border border-white/80 rounded-[2rem] p-8 shadow-xs space-y-4">
                    <span className="text-[9.5px] font-bold tracking-[0.2em] text-purple-800 uppercase block mb-1">02 / SCIENTIFIC BACKGROUND</span>
                    <h3 className="text-xl md:text-2xl font-serif text-brand-text">Multi-sensory Interference Paradigm</h3>
                    <p className="text-xs leading-relaxed text-slate-600 font-light">
                      How do background stimuli modify target precision, click delay, and physical fatigue in dynamic virtual setups? Participants wore high-fidelity audio monitors and fully tracked spatial controllers, executing sequential spatial aiming trials.
                    </p>
                    <p className="text-[11.5px] leading-relaxed text-brand-muted italic bg-purple-50/10 p-3.5 border-l-2 border-purple-300 rounded-r-2xl font-light">
                      不同的背景杂音通过听觉通路持续轰炸大脑神经网络。当用户在VR场景中用控制器发射定位射线去对准浮动的细小靶心时，声波的高振幅或高刺耳度会干扰对空间的预判，并诱发肌肉的极轻微颤抖，从而产生不一致的操作时延。
                    </p>
                  </div>

                  {/* Horizontal Interactive Step Process Indicator */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-xs uppercase font-bold tracking-widest text-[#6B7280]">THE USER JOURNEY PATH / 实验测试路径</span>
                      <span className="text-[10px] text-purple-700 bg-purple-100/60 px-2.5 py-0.5 rounded-full font-bold">6 Steps Flow</span>
                    </div>
                    
                    {/* Linear responsive layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {flowSteps.map((step, idx) => {
                        const StepIcon = step.icon;
                        return (
                          <div 
                            key={idx} 
                            className="bg-white/45 backdrop-blur-xs border border-white/70 p-5 rounded-3xl relative flex flex-col justify-between hover:bg-white/70 transition-all duration-300 group hover:shadow-xs hover:border-purple-300/60"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-mono font-bold text-purple-700">{step.num}</span>
                                {StepIcon && (
                                  <div className="p-1.5 rounded-xl bg-purple-50 text-purple-650 border border-purple-100/50 group-hover:bg-purple-100 group-hover:text-purple-750 transition-colors duration-300">
                                    <StepIcon size={13} className={idx === 0 || idx === 4 ? "animate-pulse" : ""} />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h5 className="text-[12.5px] font-bold text-slate-800 tracking-wide">{step.title}</h5>
                                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">{step.zhTitle}</p>
                              </div>
                            </div>
                            <div className="mt-4 space-y-1">
                              <p className="text-[10.5px] text-slate-500 leading-snug font-light">{step.desc}</p>
                              <p className="text-[9.5px] text-brand-muted/95 leading-normal font-light italic border-t border-black/5 pt-1.5 mt-1.5">{step.zhDesc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Flow Summary Vector Node Card */}
                  <div className="bg-gradient-to-tr from-purple-100/20 via-pink-100/10 to-indigo-100/20 rounded-3xl p-6 border border-white/80 text-center">
                    <span className="text-[9.5px] text-slate-400 uppercase font-bold tracking-widest block mb-2">Experimental Vector Sequence</span>
                    <div className="max-w-xl mx-auto flex flex-wrap justify-center items-center gap-2 text-xs text-slate-650 font-mono">
                      <span>Wear VR Headset</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span>Enter Scene</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span>Audio Stimulus</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span className="text-purple-700 font-bold">Perform Tasks</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span>Record Time</span>
                      <ChevronRight size={12} className="text-slate-400" />
                      <span>Scale Survey</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 3: INTERACTIVE MINI GAME - Stress Sound Lab */}
              {activeSection === 'playground' && (
                <motion.div
                  key="four-playground"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Dashboard Hero Block */}
                  <div className="bg-gradient-to-br from-purple-900/10 to-transparent backdrop-blur-md border border-white/80 rounded-[2rem] p-6 md:p-7 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <span className="text-[9.5px] font-bold tracking-[0.2em] text-[#6D28D9] uppercase block mb-1">STRESS SOUND LAB // AUDIO INTERACTIVE COGNITION TASK WORKBENCH</span>
                        <h3 className="text-xl font-serif text-brand-text">Simulated Auditory Stress Sandbox</h3>
                      </div>
                      <span className="text-[9.5px] text-purple-750 bg-purple-100/70 px-3 py-1 rounded-full font-bold uppercase tracking-wider block font-sans border border-purple-200/30">
                        HCI Interactive Portfolio Demo
                      </span>
                    </div>
                    <p className="text-xs text-slate-650 font-light leading-relaxed">
                      This sandbox replicates laboratory user testing of spatial tracking precision under structured environmental stress triggers. Follow the 4-step procedure below to set parameters, engage in the interactive reflex assessment, submit your subjective ratings, and compare responses in the Comparative Matrix.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/15 p-3 rounded-2xl flex items-start gap-2.5 text-amber-900">
                      <HelpCircle size={15} className="text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                      <div className="text-[10px] sm:text-[10.5px] leading-snug font-light text-left">
                        <strong className="font-bold">Disclaimer / 免责声明:</strong> This is an interactive demo for explaining the experiment process, not actual research data. 本模块旨在提供易懂的实验流动概念演示，使读者了解研究中的主客观实验流程，其产出的数据属模拟参数，不作为正式学术或真实现实结论。
                      </div>
                    </div>
                  </div>

                  {/* 4-STEPS INDICATOR WIZARD HEADER */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white/40 border border-white/60 p-1.5 rounded-2xl">
                    {[
                      { num: 1, title: "Choose Sound", subtitle: "选择声音声景" },
                      { num: 2, title: "Choose Task", subtitle: "选择操作任务" },
                      { num: 3, title: "Experiment Demo", subtitle: "模拟体验测评" },
                      { num: 4, title: "Results & Ratings", subtitle: "结果自评" }
                    ].map((step) => {
                      const isActive = playgroundStep === step.num;
                      const hasPlayed = gameState === 'completed';
                      // Step 4 is fully unlocked once a game has been completed.
                      // Step 3 can always be selected. Step 1 & 2 are always active.
                      const isSelectable = step.num < 3 || (step.num === 3 && gameState !== 'completed') || hasPlayed;
                      
                      return (
                        <button
                          key={step.num}
                          disabled={gameState === 'playing'}
                          onClick={() => {
                            soundManager.playClick();
                            setPlaygroundStep(step.num);
                          }}
                          className={`py-2 px-3 rounded-xl text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center border ${
                            isActive
                              ? 'bg-purple-800 border-purple-800 text-white shadow-xs'
                              : isSelectable
                              ? 'bg-white/40 border-transparent text-slate-700 hover:bg-white/70 hover:text-purple-800'
                              : 'bg-transparent border-transparent text-slate-300 cursor-not-allowed'
                          }`}
                        >
                          <span className="text-[10.5px] font-bold block">{step.num}. {step.title}</span>
                          <span className={`text-[8.5px] block font-light leading-none mt-0.5 ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>
                            {step.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* WORKBENCH PANELS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* LEFT WORKBENCH SIDE: Active Steps Configuration Panel */}
                    <div className="lg:col-span-5 flex flex-col justify-between bg-white/45 backdrop-blur-xs border border-white/80 p-5 rounded-3xl min-h-[420px]">
                      
                      <div className="space-y-4">
                        
                        {/* STEP 1: Choose Sound Condition */}
                        {playgroundStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block pb-1.5 border-b border-black/5 flex items-center gap-1">
                              <ListFilter size={11} className="text-purple-600" />
                              Step 1: Choose Auditory Conditions / 选择声音刺激
                            </label>

                            {/* Category Selector Tabs */}
                            <div className="flex gap-1 bg-slate-100 border border-slate-200/50 p-1 rounded-xl">
                              {soundCategories.map((cat) => {
                                const isSelected = activeSoundCategory === cat.id;
                                return (
                                  <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => {
                                      soundManager.playClick();
                                      setActiveSoundCategory(cat.id as any);
                                    }}
                                    className={`flex-1 text-center py-1.5 rounded-lg transition-all font-bold duration-300 text-[10px] sm:text-[10.5px] ${
                                      isSelected 
                                        ? 'bg-white text-purple-800 shadow-xs' 
                                        : 'text-slate-500 hover:text-purple-800 cursor-pointer'
                                    }`}
                                  >
                                    <span>{cat.id === 'relaxing' ? 'Relaxing' : cat.id === 'neutral' ? 'Everyday' : 'Stimulation'}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Active Category Sounds */}
                            {soundCategories.map((cat) => {
                              if (cat.id !== activeSoundCategory) return null;
                              return (
                                <div key={cat.id} className="space-y-2 text-left">
                                  <div className="flex justify-between items-center bg-purple-50/20 px-3 py-1.5 rounded-xl border border-purple-100/20">
                                    <span className="text-[10.5px] text-slate-650 font-medium">{cat.zhTitle} // {cat.title}</span>
                                    <span className={`text-[8.5px] font-mono border px-2 py-0.5 rounded-full ${cat.tagColor}`}>
                                      {cat.tag}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-1.5">
                                    {cat.sounds.map((sound) => {
                                      const isActive = selectedSound === sound.id;
                                      const IconComponent = sound.icon;
                                      
                                      return (
                                        <button
                                          key={sound.id}
                                          type="button"
                                          onClick={() => {
                                            setSelectedSound(sound.id);
                                            triggerSoundSample(sound.id, sound.soundType);
                                          }}
                                          className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-300 relative group truncate cursor-pointer ${
                                            isActive 
                                              ? 'bg-purple-800 text-white border-transparent shadow-[0_0_10px_rgba(109,40,217,0.25)]' 
                                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-purple-300'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 min-w-0">
                                            <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-white/10 text-white' : 'bg-purple-50 text-purple-755 group-hover:bg-purple-100'}`}>
                                              <IconComponent size={12} className={isActive ? 'animate-pulse' : ''} />
                                            </div>
                                            <div className="min-w-0">
                                              <span className="text-[11px] font-bold block truncate leading-tight">{sound.name}</span>
                                              <span className={`text-[9px] block truncate font-light leading-none mt-0.5 ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>{sound.zhName}</span>
                                            </div>
                                          </div>
                                          {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping absolute top-2.5 right-2.5" />
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                            
                            <div className="pt-3 border-t border-black/5 flex justify-end">
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(2);
                                }}
                                className="py-2 px-4 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                Step 2: Choose Task Type
                                <ArrowRight size={12} />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: Choose Task Type */}
                        {playgroundStep === 2 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block pb-1.5 border-b border-black/5 flex items-center gap-1">
                              Step 2: Choose VR Spatial Testing Task / 选择交互任务
                            </label>

                            <div className="space-y-2 text-left">
                              {[
                                {
                                  id: 'shooting',
                                  title: 'Task 1: Spatial Target Shooting',
                                  zh: '空间定位靶点点击',
                                  icon: Crosshair,
                                  desc: 'Rapid target shooting test. Click randomized spatial nodes (8 total targets) as fast as possible. Tests spatial motor calibration.',
                                  zhDesc: '空间靶点射击。画布上随意抖现 8 个空间定位靶。评估对环境声的分心耐受以及手脑微动校对阻能力。'
                                },
                                {
                                  id: 'connect',
                                  title: 'Task 2: Order Sequencing Dot Connection',
                                  zh: '数字散点循向按序连接',
                                  icon: ArrowRight,
                                  desc: 'Connect scattered nodes sequentially from 1 to 6 in numeric order. Accuracy penalties apply on wrong order clicking.',
                                  zhDesc: '数字按序点击连线。画布上标有1至6固定编号的按序圆点。点击时一旦发生颠倒，会触发失误偏离。'
                                }
                              ].map((t) => {
                                const Ticon = t.icon;
                                const isActive = selectedTask === t.id;
                                return (
                                  <button
                                    key={t.id}
                                    onClick={() => {
                                      soundManager.playClick();
                                      setSelectedTask(t.id as any);
                                    }}
                                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all duration-300 relative group cursor-pointer ${
                                      isActive 
                                        ? 'bg-purple-800 text-white border-transparent' 
                                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-purple-300'
                                    }`}
                                  >
                                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${isActive ? 'bg-white/10 text-white' : 'bg-purple-50 text-purple-755'}`}>
                                      <Ticon size={15} />
                                    </div>
                                    <div className="space-y-1 min-w-0 flex-1 scale-[0.98] origin-left">
                                      <h5 className="text-[11.5px] font-bold block truncate leading-tight">{t.title}</h5>
                                      <span className={`text-[9.5px] block font-light leading-none ${isActive ? 'text-purple-200' : 'text-slate-400'}`}>{t.zh}</span>
                                      <p className={`text-[10.5px] leading-tight font-light mt-1.5 ${isActive ? 'text-purple-100' : 'text-slate-550'}`}>{t.desc}</p>
                                      <p className={`text-[9.5px] italic leading-normal border-t mt-1.5 pt-1 ${isActive ? 'border-purple-700 text-indigo-200' : 'border-slate-100 text-slate-400'}`}>{t.zhDesc}</p>
                                    </div>
                                    {isActive && <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-pink-400" />}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="pt-3 border-t border-black/5 flex justify-between">
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(1);
                                }}
                                className="py-2 px-3.5 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 text-[11px] font-bold uppercase tracking-wider cursor-pointer font-bold"
                              >
                                Back to Step 1
                              </button>
                              
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(3);
                                }}
                                className="py-2 px-4 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                Step 3: Start Demo
                                <ArrowRight size={12} />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: Experiment Sandbox Demo Controller & Ready Card */}
                        {playgroundStep === 3 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block pb-1.5 border-b border-black/5 flex items-center gap-1">
                              Step 3: Active Experiment Trial Simulator / 实验交互演示
                            </label>

                            {gameState === 'idle' ? (
                              /* PRE-FLIGHT CHECKLIST CARD before playing */
                              <div className="bg-white/60 p-4 rounded-2xl border border-slate-100/50 space-y-4 text-left">
                                <div className="space-y-1">
                                  <h4 className="text-[11px] uppercase font-bold tracking-widest text-[#6B7280]">PRE-FLIGHT STRETCH CONSOLE</h4>
                                  <p className="text-[10px] text-slate-400 leading-none">请点击检查当前的试验设置参数</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[8.5px] uppercase text-slate-400 font-semibold block mb-1 font-mono">STIMULATOR ON:</span>
                                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-700">
                                      {React.createElement(activeSoundInfo.icon, { size: 12, className: "text-purple-600 shrink-0" })}
                                      <span className="truncate">{activeSoundInfo.name}</span>
                                    </div>
                                    <span className={`inline-block text-[8px] transform scale-90 origin-left border px-1.5 rounded-full mt-1 ${activeSoundInfo.tagColor}`}>
                                      {activeSoundInfo.tag}
                                    </span>
                                  </div>
                                  <div className="bg-white/80 p-2.5 rounded-xl border border-slate-100">
                                    <span className="text-[8.5px] uppercase text-slate-400 font-semibold block mb-1 font-mono">TASK TO ENGAGE:</span>
                                    <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-slate-700">
                                      <Crosshair size={11} className="text-purple-600 shrink-0" />
                                      <span className="truncate">{selectedTask === 'shooting' ? "Target Shoot" : "Sequencing Dots"}</span>
                                    </div>
                                    <span className="inline-block text-[8px] transform scale-90 origin-left font-mono text-zinc-500 mt-1">
                                      {selectedTask === 'shooting' ? "8 nodes unclicked" : "6 order connections"}
                                    </span>
                                  </div>
                                </div>

                                <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-[10.5px] text-purple-850 leading-relaxed space-y-1">
                                  <div className="flex items-center gap-1 font-bold">
                                    <HelpCircle size={12} className="text-purple-700 shrink-0" />
                                    <span>Interactive Goal / 试验操作要求:</span>
                                  </div>
                                  <p className="font-light">
                                    {selectedTask === 'shooting'
                                      ? "Switly target and click all 8 cyan spatial nodes floating in the VR link canvas. Background misses or clicking empty regions adds operational tremor errors."
                                      : "Connect numerical nodes sequentially from 1 to 6. Click on wrong target sequence numbers or canvas backgrounds will record an error."}
                                  </p>
                                </div>

                                <button
                                  onClick={generateGameTargets}
                                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-850 text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-md cursor-pointer transition-all hover:brightness-110"
                                >
                                  <Play size={11} className="fill-white" />
                                  Launch Simulated Sandbox / 开始仿真实验
                                </button>
                              </div>
                            ) : (
                              /* RUNNING ACTIVE INFORMATION CARD */
                              <div className="bg-zinc-900 border border-zinc-805 text-white p-4.5 rounded-2xl text-left space-y-4 shadow-inner">
                                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                                  <div className="flex items-center gap-1.5 text-[9.5px] tracking-wider text-purple-400 font-mono font-bold animate-pulse">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                                    <span>TRIAL SIMULATOR RECORDING</span>
                                  </div>
                                  <span className="text-[10px] uppercase text-zinc-400 font-mono font-bold font-sans">
                                    {timer.toFixed(2)}s
                                  </span>
                                </div>
                                
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between items-center bg-white/5 py-1.5 px-3 rounded-lg border border-white/5">
                                    <span className="text-zinc-400">Total Operational Clicks / 累计点击:</span>
                                    <span className="font-mono font-bold text-zinc-200">{totalClicks}</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-white/5 py-1.5 px-3 rounded-lg border border-white/5">
                                    <span className="text-zinc-400">Tremor Misses / 触空偏移:</span>
                                    <span className={`font-mono font-bold ${errorCount > 0 ? "text-rose-400 animate-pulse" : "text-zinc-200"}`}>{errorCount}</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-white/5 py-1.5 px-3 rounded-lg border border-white/5">
                                    <span className="text-zinc-400">Calculated Accuracy / 瞄准精度:</span>
                                    <span className="font-mono font-bold text-indigo-400">
                                      {totalClicks > 0 ? Math.min(100, Math.round((correctClicks / totalClicks) * 100)) : 100}%
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={resetGame}
                                  className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                >
                                  <RotateCcw size={11} />
                                  Interrupt Trial Setup / 中途撤销
                                </button>
                              </div>
                            )}

                            <div className="pt-2 border-t border-black/5 flex justify-start">
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(2);
                                }}
                                className="py-2 px-3.5 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                              >
                                Back to Step 2
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 4: Review Result & Reflection */}
                        {playgroundStep === 4 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4"
                          >
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block pb-1 border-b border-black/5 flex items-center gap-1">
                              Step 4: Review Result & Subjective Survey / 测评主客观打分
                            </label>

                            <div className="bg-purple-50 text-purple-900 border border-purple-100 p-4 rounded-2xl text-left text-xs leading-relaxed space-y-2">
                              <div className="flex items-center gap-1 font-bold">
                                <CheckCircle2 size={13} className="text-purple-700 shrink-0" />
                                <span>Simulated Run Complete! / 测试通过</span>
                              </div>
                              <p className="font-light">
                                Your simulated interactive data is locked. Make sure to complete the subjective self-assessment slider survey below to append your parameters into the Compare comparative log matrix.
                              </p>
                              <div className="flex justify-between items-center bg-white/60 p-2 rounded-xl mt-2 font-mono text-[10px]">
                                <span>Elapsed Duration: <strong className="text-purple-800">{timer.toFixed(2)}s</strong></span>
                                <span>Errors: <strong className="text-rose-600">{errorCount}</strong></span>
                              </div>
                            </div>
                            
                            <div className="pt-2 flex justify-between">
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(3);
                                }}
                                className="py-2 px-3.5 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 text-[11px] font-bold uppercase tracking-wider cursor-pointer"
                              >
                                Try Condition Again / 再试一次
                              </button>
                              
                              <button
                                onClick={() => {
                                  soundManager.playClick();
                                  setPlaygroundStep(1);
                                }}
                                className="py-2 px-3.5 rounded-xl bg-purple-100 text-purple-700 hover:bg-purple-200 text-[11px] font-bold uppercase tracking-wider cursor-pointer font-bold"
                              >
                                Choose Another Sound
                              </button>
                            </div>
                          </motion.div>
                        )}

                      </div>

                      {/* Interactive Telemetry Wearable Dashboard Panel - PERSISTENT AT BOTTOM LEFT */}
                      <div className="mt-5 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-white space-y-3 shadow-inner text-left">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-400 tracking-wider">
                            <Gauge size={12} className="text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
                            <span>VE PHYSIOLOGY MODULE / 生物传感监测</span>
                          </div>
                          <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">VE Sensor Shield</span>
                        </div>

                        {/* List of 3 biological sensors */}
                        <div className="space-y-2">
                          {/* Wearable sensor 1: Heart Rates */}
                          <div className="flex items-center justify-between text-xs gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                                <Watch size={12} className={gameState === 'playing' ? 'animate-pulse' : ''} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] text-zinc-400 block leading-none">Wearable HRV Sense / 心率震幅变异</span>
                                <span className="text-[10px] font-mono text-zinc-300">Rate: <strong className={tele.heartColor}>{tele.heartRate}</strong></span>
                              </div>
                            </div>
                            <span className="text-[8.5px] text-zinc-550 font-light truncate text-right leading-none shrink-0">{tele.heartStatus}</span>
                          </div>

                          {/* Wearable sensor 2: EEG spectrum */}
                          <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2 gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 shrink-0">
                                <Brain size={12} className={gameState === 'playing' ? 'animate-pulse' : ''} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] text-zinc-400 block leading-none">EEG Spectral channels / 主神经多频脑电波</span>
                                <span className="text-[10px] font-mono text-pink-300 truncate block">{tele.brainwave}</span>
                              </div>
                            </div>
                            <span className="text-[8.5px] text-zinc-550 font-light truncate text-right leading-none shrink-0">{tele.brainwaveStatus}</span>
                          </div>

                          {/* Wearable sensor 3: Controller Micro jitter tremor status */}
                          <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2 gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                                <Gamepad2 size={12} className={gameState === 'playing' ? 'animate-bounce' : ''} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] text-zinc-400 block leading-none">VR Controller Jitter / 实感六自由度颤离度</span>
                                <span className="text-[10px] font-mono text-cyan-300">Jitter: <strong>{tele.tremor}</strong></span>
                              </div>
                            </div>
                            <span className="text-[8.5px] text-zinc-550 font-light truncate text-right leading-none shrink-0">{tele.tremorStatus}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* RIGHT CANVAS VIEW: The Immersive VR Micro-Sandbox Screen */}
                    <div className="lg:col-span-7 flex flex-col justify-between bg-zinc-950 border border-zinc-800 rounded-[2rem] p-5 min-h-[360px] relative shadow-inner text-white overflow-hidden">
                      
                      {/* Grid overlay */}
                      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
                        <svg className="w-full h-full">
                          <rect width="100%" height="100%" fill="url(#v-grid)" />
                        </svg>
                      </div>

                      {/* Ambient background stress pulse color represent sound type */}
                      <div className={`absolute -right-24 -bottom-24 w-72 h-72 rounded-full blur-[90px] opacity-25 z-0 transition-colors duration-1000 ${
                        activeSoundInfo.tag === 'Low Stress' ? 'bg-emerald-500' : activeSoundInfo.tag === 'Neutral' ? 'bg-sky-500' : 'bg-rose-600'
                      }`} />

                      {/* Header System Metadata status line */}
                      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 text-[9.5px] font-mono leading-none">
                        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 p-1 px-2.5 rounded-md">
                          <span className={`w-1.5 h-1.5 rounded-full inline-block ${gameState === 'playing' ? 'bg-emerald-500 animate-ping' : 'bg-zinc-500'}`} />
                          <span className="text-zinc-400 uppercase tracking-widest">
                            {gameState === 'playing' ? "VR LINK SIMULATOR RECORDING" : "VR DEVICE WAITING"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-purple-400">
                            <Activity size={10} className="animate-pulse" />
                            <span>BOUND LEVEL: {activeSoundInfo.tag === 'Low Stress' ? "41 dBA" : activeSoundInfo.tag === 'Neutral' ? "64 dBA" : "86 dBA"}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white/10 p-1 px-2 rounded-md text-white font-bold font-sans">
                            <Timer size={10} className="text-pink-400" />
                            <span>
                              {timer.toFixed(2)}s
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CANVAS TASK CORE INTERACTIVE WINDOW */}
                      <div 
                        onClick={handleCanvasBackgroundClick}
                        className="relative flex-1 w-full my-4 flex items-center justify-center z-10 min-h-[220px] rounded-2xl overflow-hidden cursor-crosshair border border-white/5 bg-zinc-950/40 backdrop-blur-xs select-none"
                      >
                        
                        <AnimatePresence mode="wait">
                          
                          {/* Idle State: Instructions & Step redirect */}
                          {gameState === 'idle' && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              key="canvas-idle-view"
                              className="text-center p-4 max-w-sm space-y-3.5 z-10 select-none pointer-events-none"
                            >
                              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-zinc-400">
                                <Headphones size={20} className="animate-pulse" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-350">Simulated VR Core Active View</h4>
                                <p className="text-[10px] text-zinc-500 font-light leading-relaxed">
                                  {playgroundStep === 3 
                                    ? "Launch the trial on the left to activate visual nodes." 
                                    : "First complete Step 1 (Sound Conditions) and Step 2 (Task Type). Then proceed to Step 3 to start!"}
                                </p>
                              </div>
                              
                              {playgroundStep !== 3 && (
                                <button
                                  type="button"
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    soundManager.playClick();
                                    setPlaygroundStep(3);
                                  }}
                                  className="pointer-events-auto mt-2 inline-flex items-center gap-1 text-[9.5px] font-bold text-purple-400 uppercase tracking-wider border border-purple-500/20 px-3 py-1 rounded-lg bg-purple-500/5 hover:bg-purple-500/10 transition-colors"
                                >
                                  Go to Step 3 Sandbox
                                </button>
                              )}
                            </motion.div>
                          )}

                          {/* Playing State: Targets Drawing Board */}
                          {gameState === 'playing' && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              key="canvas-playing-view"
                              className="absolute inset-0 w-full h-full pointer-events-none"
                            >
                              
                              {/* Dynamic Audio Waves Oscillating Animation overlay */}
                              <div className="absolute inset-x-0 bottom-4 pointer-events-none z-0 flex flex-col items-center justify-center space-y-1 opacity-25">
                                <div className="flex items-end justify-center gap-1 h-14 w-52">
                                  {[...Array(15)].map((_, i) => {
                                    const isRelaxing = activeSoundInfo.tag === 'Low Stress';
                                    const isNeutral = activeSoundInfo.tag === 'Neutral';
                                    const heightRange = isRelaxing ? [10, 22, 10] : isNeutral ? [15, 36, 15] : [20, 72, 20];
                                    const animSpeed = isRelaxing ? 1.6 : isNeutral ? 1.1 : 0.55;
                                    
                                    return (
                                      <motion.div
                                        key={i}
                                        animate={{ height: heightRange }}
                                        transition={{
                                          duration: animSpeed,
                                          repeat: Infinity,
                                          repeatType: 'reverse',
                                          delay: i * 0.08,
                                          ease: 'easeInOut'
                                        }}
                                        className={`w-[3px] rounded-full ${
                                          isRelaxing 
                                            ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]' 
                                            : isNeutral 
                                            ? 'bg-sky-400' 
                                            : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse'
                                        }`}
                                        style={{ height: '12px' }}
                                      />
                                    );
                                  })}
                                </div>
                                <span className="text-[7.5px] font-mono tracking-[0.25em] text-zinc-500">DYNAMIC AUDITORY WAVE OSCILLATING</span>
                              </div>

                              {selectedTask === 'connect' && (
                                <>
                                  {/* Canvas Target Sequence prompt */}
                                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center text-[9px] font-bold text-pink-400 tracking-wider font-mono">
                                    CURRENT ORDER TARGET: {nextNumberToClick} → CONNECT TO 6
                                  </div>
                                  
                                  {/* SVG Connected lines drawn sequential */}
                                  <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible">
                                    {targets.map((t, idx) => {
                                      if (idx === 0) return null;
                                      const prev = targets[idx - 1];
                                      if (t.isClicked && prev.isClicked) {
                                        return (
                                          <motion.line
                                            key={idx}
                                            x1={`${prev.x}%`}
                                            y1={`${prev.y}%`}
                                            x2={`${t.x}%`}
                                            y2={`${t.y}%`}
                                            stroke="url(#connectGradient)"
                                            strokeWidth="3.2"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                            className="stroke-pink-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                                          />
                                        );
                                      }
                                      return null;
                                    })}
                                    <defs>
                                      <linearGradient id="connectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#f43f5e" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                      </linearGradient>
                                    </defs>
                                  </svg>
                                </>
                              )}

                              {/* Interactive Nodes */}
                              {targets.map((target) => {
                                const isShooter = selectedTask === 'shooting';
                                const isDotClickable = !isShooter && target.num === nextNumberToClick;
                                const isDotInactive = !isShooter && target.num !== nextNumberToClick && !target.isClicked;
                                const shakeMe = shakeDotId === target.id;
                                
                                return (
                                  <motion.button
                                    key={target.id}
                                    type="button"
                                    onClick={(ev) => handleTargetClick(target, ev)}
                                    whileHover={target.isClicked ? {} : { scale: 1.18 }}
                                    whileTap={target.isClicked ? {} : { scale: 0.88 }}
                                    animate={shakeMe ? { x: [-7, 7, -7, 7, -4, 4, 0] } : {}}
                                    transition={{ duration: 0.35 }}
                                    style={{ left: `${target.x}%`, top: `${target.y}%` }}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 pointer-events-auto cursor-pointer select-none border ${
                                      target.isClicked 
                                        ? 'bg-zinc-800/90 border-zinc-700 w-6 h-6 z-0 pointer-events-none text-zinc-550 text-[9px]'
                                        : isShooter
                                        ? 'bg-gradient-to-tr from-cyan-400 to-blue-600 text-white w-8 h-8 border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.45)] z-20'
                                        : isDotClickable
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-[11px] border-white/80 shadow-[0_0_12px_rgba(244,63,94,0.65)] w-8 h-8 z-30'
                                        : 'bg-zinc-800 border-zinc-650 text-zinc-400 text-[10px] w-7 h-7 z-10'
                                    }`}
                                  >
                                    {target.isClicked ? (
                                      <span className="font-bold">✔</span>
                                    ) : isShooter ? (
                                      <div className="relative flex items-center justify-center w-full h-full">
                                        <Crosshair size={12} className="text-cyan-100" />
                                        {/* Outer pulsing ring wave effect to draw attention */}
                                        <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
                                      </div>
                                    ) : (
                                      <div className="relative flex items-center justify-center w-full h-full">
                                        <span className="font-mono">{target.num}</span>
                                        {isDotClickable && (
                                          <span className="absolute inset-0 rounded-full bg-pink-400/20 animate-ping pointer-events-none" />
                                        )}
                                      </div>
                                    )}
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          )}

                          {/* Completed Screen: Success chime prompt */}
                          {gameState === 'completed' && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              key="canvas-completed-view"
                              className="text-center p-5 max-w-sm bg-zinc-900/95 border border-zinc-800 rounded-2xl space-y-3.5 z-10 leading-snug cursor-default shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={20} className="animate-bounce" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs uppercase font-bold tracking-widest text-emerald-400">Simulation Finished Successfully</h4>
                                <p className="text-[10px] text-zinc-400 font-light">
                                  Your completed time has been locked in database! Please look at Step 4 on the left to submit your NASA-TLX subjective self-assessment review.
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  soundManager.playClick();
                                  setPlaygroundStep(4);
                                }}
                                className="mt-1 w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-[10.5px] uppercase tracking-wider transition-colors"
                              >
                                Continue to Result & Ratings
                              </button>
                            </motion.div>
                          )}

                        </AnimatePresence>

                      </div>

                      {/* Footer logs status persistent */}
                      <div className="relative z-10 border-t border-white/10 pt-2.5 flex items-center justify-between text-[8px] text-zinc-550 font-mono tracking-wider">
                        <span>HCI LAB WORKSTATION v4.12</span>
                        <span>DEVICE TELEMETRY ACTIVE: OK</span>
                      </div>

                    </div>

                  </div>

                  {/* STEP 4 DETAILED PANEL: RESULTS ASSESSMENT VIEW, SUBJECTIVE SURVEY SLIDERS AND COMPARISON TABLE */}
                  {playgroundStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Results and specular performance card */}
                      <div className="bg-gradient-to-tr from-white/95 via-white/80 to-white/95 border border-white p-5 rounded-3xl shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/5 pb-3">
                          <div className="text-left">
                            <span className="text-[9px] uppercase tracking-widest text-[#6B7280] font-mono font-bold block mb-0.5">SIMULATOR COGNITIVE ANALYSIS WORKSHEET</span>
                            <h4 className="text-md font-serif text-slate-800 leading-none">Acoustic Testing Telemetry Evaluation Output</h4>
                          </div>
                          <div className="flex items-center gap-1 mt-2 sm:mt-0 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-purple-100 text-purple-700 font-sans border border-purple-200/25">
                            <CheckCircle2 size={10} className="shrink-0" />
                            <span>Trial Completeness</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left">
                            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-1 font-mono">Condition Preset</span>
                            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                              {React.createElement(activeSoundInfo.icon, { size: 12, className: "text-purple-600 shrink-0" })}
                              <span className="truncate">{activeSoundInfo.name}</span>
                            </div>
                            <span className={`inline-block text-[8px] font-mono border px-1.5 rounded-full mt-2 scale-90 origin-left ${activeSoundInfo.tagColor}`}>
                              {activeSoundInfo.tag}
                            </span>
                          </div>
                          
                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left">
                            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-1 font-mono">Duration Logged</span>
                            <span className="text-base font-bold text-emerald-600 font-mono block mt-1">{timer.toFixed(2)}s</span>
                            <span className="text-[8px] text-slate-400 font-light mt-1 block">Active completion time</span>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left">
                            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-1 font-mono">Tremor Penalty</span>
                            <span className={`text-base font-bold font-mono block mt-1 ${errorCount > 0 ? "text-rose-500" : "text-emerald-505 text-emerald-600"}`}>
                              {errorCount}
                            </span>
                            <span className="text-[8px] text-slate-400 font-light mt-1 block">Miss-clicks / offsets</span>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left">
                            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-1 font-mono">Precision Acc</span>
                            <span className="text-base font-bold text-indigo-600 font-mono block mt-1">
                              {totalClicks > 0 
                                ? Math.min(100, Math.round((correctClicks / totalClicks) * 100))
                                : 100}%
                            </span>
                            <span className="text-[8px] text-slate-400 font-light mt-1 block">Target clicking precision</span>
                          </div>
                        </div>
                        
                        <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100/30 text-left space-y-1.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 block">Speculative HCI Interpretation (cautious reflection):</span>
                          <p className="text-[11px] text-slate-650 leading-relaxed font-light">
                            {getSimulatedAnalysis()}
                          </p>
                          <p className="text-[9px] text-slate-400 font-sans italic border-t border-black/5 pt-1.5 mt-2 leading-normal">
                            *Disclaimer:* This is a simulated interactive trial designed solely for explaining experimental processes; these values are speculative and do not correspond to strict clinical or peer-reviewed empirical findings. (此测试结果属流程交互演示，不代表真实精确研究数据，请结合主客观科学原则作审慎性参考。)
                          </p>
                        </div>
                      </div>

                      {/* Subjective Questionnaire自评打分 Scale Slider Panel */}
                      <div className="bg-white/45 backdrop-blur-xs border border-white/80 p-5 rounded-3xl shadow-xs space-y-4">
                        <div className="border-b border-black/5 pb-2 text-left">
                          <span className="text-[9px] uppercase tracking-widest text-[#6B7280] font-mono font-bold block mb-0.5">SUBJECTIVE QUESTIONNAIRE EVALUATION MATRIX</span>
                          <h4 className="text-xs font-bold text-slate-800">Please provide your subjective assessment (NASA-TLX Simplified)</h4>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">请对本次实验声音条件下的心理负荷压力和专注度进行主观量度打分 (NASA-TLX 简化负荷自评)</p>
                        </div>
                        
                        {!isSurveySubmitted ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Stress slider */}
                              <div className="space-y-2 bg-white/55 border border-slate-100 p-3.5 rounded-xl text-left">
                                <div className="flex justify-between items-center">
                                  <label className="text-[11px] font-bold text-slate-700 block">Psychological Stress Trigger (1-5)</label>
                                  <span className="text-[10.5px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                                    Level {subjectiveStress} / 5
                                  </span>
                                </div>
                                <p className="text-[9px] text-slate-400 leading-tight">Rate the feeling of anxiety, speed stress, or direct auditory conflict (此声音环境带给您的不安度、心慌或压迫感)</p>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="5" 
                                  value={subjectiveStress} 
                                  onChange={(e) => {
                                    soundManager.playClick();
                                    setSubjectiveStress(parseInt(e.target.value));
                                  }}
                                  className="w-full accent-purple-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none my-1"
                                />
                                <div className="flex justify-between text-[9px] font-mono text-slate-400 select-none">
                                  <span>Serene / 舒然无压 (1)</span>
                                  <span>Intense / 重压焦悸 (5)</span>
                                </div>
                              </div>

                              {/* Focus slider */}
                              <div className="space-y-2 bg-white/55 border border-slate-100 p-3.5 rounded-xl text-left">
                                <div className="flex justify-between items-center">
                                  <label className="text-[11px] font-bold text-slate-700 block">Interactive Focus & Hand-eye Coordination (1-5)</label>
                                  <span className="text-[10.5px] font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                                    Level {subjectiveFocus} / 5
                                  </span>
                                </div>
                                <p className="text-[9px] text-slate-400 leading-tight">How easy was it to concentrate and direct target clicking path under noise (抗干扰聚焦，精准完成靶点锁定与运动稳定)</p>
                                <input 
                                  type="range" 
                                  min="1" 
                                  max="5" 
                                  value={subjectiveFocus} 
                                  onChange={(e) => {
                                    soundManager.playClick();
                                    setSubjectiveFocus(parseInt(e.target.value));
                                  }}
                                  className="w-full accent-indigo-700 cursor-pointer h-1.5 bg-slate-200 rounded-lg appearance-none my-1"
                                />
                                <div className="flex justify-between text-[9px] font-mono text-slate-400 select-none">
                                  <span>Distracted / 噪音难专注 (1)</span>
                                  <span>Locked Focus / 丝滑屏噪集中 (5)</span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={submitSubjectiveFeedback}
                              className="w-full py-2.5 px-4 rounded-xl bg-purple-800 text-white text-xs font-bold uppercase tracking-wider hover:bg-purple-900 transition-colors shadow-sm cursor-pointer"
                            >
                              Submit Trial Evaluation & Save Log / 提交主观评估存档
                            </button>
                          </div>
                        ) : (
                          <div className="p-5 bg-emerald-50/70 border border-emerald-100 text-emerald-850 rounded-2xl text-center space-y-2">
                            <CheckCircle2 size={16} className="mx-auto text-emerald-500 animate-bounce" />
                            <p className="text-xs font-bold">Subjective feedback evaluation saved successfully! / 主观评估报告已存档</p>
                            <p className="text-[9.5px] text-slate-400 font-light">
                              Your subjective metrics have been saved in the environment cache. Look at the Comparative Table below to compare all your test trials side-by-side!
                            </p>
                            <button
                              onClick={() => {
                                soundManager.playClick();
                                setPlaygroundStep(1);
                              }}
                              className="mt-2 text-[10px] font-bold text-purple-700 border border-purple-200 rounded-xl px-4 py-1.5 bg-white hover:bg-purple-50 transition-colors cursor-pointer"
                            >
                              Begin Next Test Condition / 挑选其它状态进行下一次测试
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Comparison Matrix & Historical Trials Log */}
                      <div className="bg-white/45 backdrop-blur-xs border border-white/80 p-5 rounded-3xl shadow-xs space-y-4">
                        <div className="border-b border-black/5 pb-2 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-widest text-[#6B7280] font-mono font-bold block">EXPERIMENT COMPARATIVE MATRIX</span>
                            <span className="text-[8.5px] text-purple-750 bg-purple-100 p-0.5 px-2 rounded font-bold border border-purple-200/20 font-mono tracking-tight shrink-0 scale-90">
                              SUBMITTED TRIALS: {roundsHistory.length}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800">Historical Comparison Mode / 各类声学环境对比表盘</h4>
                          <p className="text-[10px] text-slate-400 font-light mt-0.5">Compare reaction times, precision ratings, errors, and subjective scale feedback across environmental setups</p>
                        </div>
                        
                        {roundsHistory.length === 0 ? (
                          <div className="p-6 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-light">
                            No log submissions recorded yet. Run trials under different conditions on Step 3, then press &quot;Submit Trial Evaluation&quot; to populate your experimental comparative matrix.
                            <span className="block text-[10px] text-slate-4000 text-slate-405 mt-1 italic">（暂无评测存档。请多次选择不同声音、进入 Step 3 开始并成功完成演示，然后提交主观打分以激活对比表）</span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white/60">
                              <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                  <tr className="bg-slate-50 border-b border-slate-100 text-[9.5px] font-bold tracking-wider text-slate-450 uppercase font-mono">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Stimulus Environment</th>
                                    <th className="p-3">Task Profile</th>
                                    <th className="p-3">Completion Time</th>
                                    <th className="p-3">Precision Accuracy</th>
                                    <th className="p-3">Jitters / Errors</th>
                                    <th className="p-3 text-center">Subjective Stress</th>
                                    <th className="p-3 text-center">Subjective Focus</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {roundsHistory.map((row, index) => {
                                    const isLow = row.soundCategory === 'Low Stress';
                                    const isNeu = row.soundCategory === 'Neutral';
                                    const soundCatTag = isLow 
                                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 font-medium'
                                      : isNeu
                                      ? 'bg-blue-500/10 border-blue-500/25 text-blue-650'
                                      : 'bg-rose-500/10 border-rose-500/25 text-rose-650 font-bold';
                                    
                                    return (
                                      <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-3 font-mono text-purple-700 font-bold">{roundsHistory.length - index}</td>
                                        <td className="p-3 font-medium">
                                          <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-slate-800">{row.soundName}</span>
                                            <span className={`text-[8.5px] font-mono border px-1.5 py-0.5 rounded-full inline-block scale-90 ${soundCatTag}`}>
                                              {row.soundCategory}
                                            </span>
                                          </div>
                                        </td>
                                        <td className="p-3 font-mono text-slate-500 text-[10.5px]">{row.taskTitle}</td>
                                        <td className="p-3 font-mono font-bold text-emerald-600">{row.time}s</td>
                                        <td className="p-3 font-mono font-bold text-indigo-650">{row.accuracy}%</td>
                                        <td className={`p-3 font-mono font-bold ${row.errorCount > 0 ? "text-rose-500" : "text-emerald-600"}`}>
                                          {row.errorCount}
                                        </td>
                                        <td className="p-3 text-center font-bold text-purple-700 font-mono">{row.subjectiveStress} / 5</td>
                                        <td className="p-3 text-center font-bold text-indigo-750 font-mono">{row.subjectiveFocus} / 5</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            
                            <p className="text-[9px] text-slate-400 font-sans italic text-left leading-normal">
                              *Disclosure:* Compare Mode displays simulated research trials for educational process demonstration only. 这是用于说明实验流程的工作流对比模拟技术，并非正式学术结论。
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                </motion.div>
              )}

              {/* SECTION 4: STORYBOARD & STUDY APPLICATION */}
              {activeSection === 'storyboard' && (
                <motion.div
                  key="four-storyboard"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  
                  {/* Storyboard 4-panels layout */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-100/50 p-3 rounded-2xl border border-slate-205 border-slate-200">
                      <div className="space-y-0.5">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#4b5563] flex items-center gap-1.5">
                          <span className="w-1.5 h-3 bg-purple-600 rounded-xs" />
                          STORYBOARD COMIC STRIP / 4格实验分镜手稿
                        </span>
                        <p className="text-[10px] text-slate-400 font-medium">Click on any panel's slot below to upload or paste a custom photo/GIF animation!</p>
                      </div>
                      
                      {Object.keys(storyboardImages).length > 0 && (
                        <button 
                          onClick={() => {
                            setStoryboardImages({});
                            soundManager.playSwipe();
                          }}
                          className="px-3 py-1 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-slate-500 hover:text-red-650 rounded-xl text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                        >
                          <RotateCcw size={10} />
                          Reset to Defaults / 重置默认分镜
                        </button>
                      )}
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-[2rem] relative shadow-inner">
                      {storyboardFrames.map((frame) => {
                        const hasCustomImage = !!storyboardImages[frame.id];
                        const showUrlPrompt = activeUrlPromptId === frame.id;

                        return (
                          <div 
                            key={frame.id} 
                            className="bg-white border-2 border-slate-700 p-3.5 rounded-2xl flex flex-col justify-between space-y-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative group"
                          >
                            {/* Comic frame index marker */}
                            <div className="absolute -top-2.5 -left-2 bg-slate-800 text-white border-2 border-slate-700 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-md shadow-sm z-10">
                              PANEL #{frame.id}
                            </div>

                            <div className="space-y-0.5 pt-1">
                              <h5 className="text-[12.5px] font-extrabold text-slate-800 font-sans tracking-wide truncate">{frame.title}</h5>
                              <p className="text-[10px] text-purple-600 font-bold leading-none">{frame.zhTitle}</p>
                            </div>
 
                            {/* Interactive customizable Image/GIF slot container */}
                            <div className="relative aspect-[4/3] w-full rounded-xl border border-dashed border-slate-350 bg-slate-100 overflow-hidden group/slot">
                              {hasCustomImage ? (
                                <div className="w-full h-full relative">
                                  <img 
                                    src={storyboardImages[frame.id]} 
                                    alt={frame.title} 
                                    className="w-full h-full object-cover" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[8px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover/slot:opacity-100 transition-opacity">
                                    Custom Asset Active
                                  </div>
                                </div>
                              ) : (
                                /* Fallback beautiful high-fidelity preset sketch illustration */
                                <div className="w-full h-full relative flex items-center justify-center bg-zinc-50 border border-slate-200/40 p-2">
                                  {/* Comic book halftone grid effect overlay */}
                                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#6b21a8_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
                                  
                                  {frame.id === 1 && (
                                    <div className="flex flex-col items-center justify-center space-y-1 relative">
                                      <Glasses size={22} className="text-purple-600 animate-pulse" />
                                      <div className="absolute -inset-2 border border-dashed border-purple-300/40 rounded-full animate-[spin_12s_linear_infinity] opacity-50" />
                                      <span className="text-[7.5px] font-mono text-purple-650 bg-purple-50 px-1 py-0.5 rounded uppercase tracking-widest scale-90">VR STROLL</span>
                                    </div>
                                  )}
                                  {frame.id === 2 && (
                                    <div className="flex flex-col items-center justify-center space-y-1 relative w-full h-full">
                                      <div className="flex items-center gap-1 justify-center">
                                        <span className="w-0.5 h-2.5 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <span className="w-0.5 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <Headphones size={20} className="text-indigo-650 animate-pulse mx-0.5" />
                                        <span className="w-0.5 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                                        <span className="w-0.5 h-2.5 bg-indigo-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                      </div>
                                      <span className="text-[7.5px] font-mono text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded uppercase tracking-widest scale-90">AUDIO PULSE</span>
                                    </div>
                                  )}
                                  {frame.id === 3 && (
                                    <div className="flex flex-col items-center justify-center space-y-1 relative w-full h-full">
                                      <div className="relative flex items-center justify-center">
                                        <Crosshair size={20} className="text-pink-500 animate-[spin_18s_linear_infinity]" />
                                        <span className="absolute w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                                        <span className="absolute w-1.5 h-1.5 rounded-full bg-rose-600" />
                                      </div>
                                      <span className="text-[7.5px] font-mono text-pink-600 bg-pink-50 px-1 py-0.5 rounded uppercase tracking-widest scale-90">HCI SHOOTING</span>
                                    </div>
                                  )}
                                  {frame.id === 4 && (
                                    <div className="flex flex-col items-center justify-center space-y-1 relative w-full h-full">
                                      <div className="flex items-center gap-1 pb-0.5">
                                        <span className="px-1 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[6.5px] font-mono font-bold border border-emerald-250">NASA-TLX</span>
                                        <CheckCircle2 size={15} className="text-emerald-600 animate-bounce" />
                                      </div>
                                      <span className="text-[7.5px] font-mono text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded uppercase tracking-widest scale-90">EVALUATION</span>
                                    </div>
                                  )}
                                  
                                  <div className="absolute bottom-1 bg-white/90 border border-slate-200/50 rounded-md px-1.5 py-0.5 text-[8px] text-slate-400 opacity-60 group-hover/slot:opacity-100 transition-opacity">
                                    Preset Active
                                  </div>
                                </div>
                              )}

                              {/* Interactive Action Menu overlay onHover */}
                              <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex flex-col items-center justify-center p-3 space-y-2 opacity-0 group-hover/slot:opacity-100 transition-opacity duration-200 z-20">
                                <span className="text-[9.5px] font-bold text-white tracking-wide">CUSTOMIZE PANEL #{frame.id}</span>
                                
                                <div className="flex items-center gap-1.5">
                                  {/* Local File Selector Label */}
                                  <label 
                                    htmlFor={`st-upload-${frame.id}`} 
                                    className="p-1 px-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[9px] font-semibold tracking-wider flex items-center gap-1 shadow-xs hover:shadow-md cursor-pointer transition-colors"
                                  >
                                    <Upload size={10} />
                                    <span>Upload File/GIF</span>
                                  </label>
                                  
                                  {/* Link Paste Trigger */}
                                  <button 
                                    onClick={() => {
                                      setActiveUrlPromptId(showUrlPrompt ? null : frame.id);
                                      setTempUrlValue(storyboardImages[frame.id] || '');
                                    }}
                                    className="p-1 px-2 bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-500 rounded-lg text-[9px] tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                                  >
                                    <LinkIcon size={10} />
                                    <span>Paste URL</span>
                                  </button>
                                </div>

                                <span className="text-[7.5px] text-slate-350">Supports static PNG/JPEG & dynamic GIFs</span>
                              </div>

                              {/* URL Paste overlay field within slot */}
                              {showUrlPrompt && (
                                <div className="absolute inset-0 bg-white p-3 flex flex-col justify-between border border-slate-300 rounded-xl z-30 shadow-lg">
                                  <div className="space-y-1">
                                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest block">Insert Image / GIF link URL:</span>
                                    <input 
                                      type="text" 
                                      value={tempUrlValue}
                                      onChange={(e) => setTempUrlValue(e.target.value)}
                                      placeholder="https://..."
                                      className="w-full text-xs p-1 px-2 border border-slate-205 border-slate-300 rounded-lg focus:outline-hidden focus:border-purple-500 text-slate-750 font-mono"
                                    />
                                  </div>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button 
                                      onClick={() => setActiveUrlPromptId(null)}
                                      className="p-1 px-2 text-[9px] font-medium text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button 
                                      onClick={() => handleStoryboardUrlSubmit(frame.id, tempUrlValue)}
                                      className="p-1 px-2 bg-purple-600 text-white rounded-md text-[9px] font-bold shadow-xs hover:bg-purple-700 cursor-pointer"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>
                              )}
                              
                              {/* Hidden real file input */}
                              <input 
                                type="file" 
                                id={`st-upload-${frame.id}`} 
                                accept="image/*,image/gif"
                                onChange={(e) => handleStoryboardFileChange(frame.id, e)}
                                className="hidden" 
                              />
                            </div>
 
                            <div className="space-y-1 mt-1">
                              <p className="text-[10px] text-slate-500 leading-normal font-light">{frame.desc}</p>
                              <p className="text-[9.5px] text-slate-400 italic leading-snug border-t border-slate-100 pt-1.5 mt-1">{frame.zhDesc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Application Scenarios Callout List */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-bold tracking-widest text-[#6B7280]">PROSPECTIVE APPLICATIONS / 日常科技生活应用场景</span>
                      <div className="h-[1px] bg-black/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {applicationScenarios.map((app) => (
                        <div 
                          key={app.id} 
                          className="bg-white/45 backdrop-blur-xs border border-white/70 p-6 rounded-3xl space-y-3.5 hover:shadow-xs hover:border-purple-300 transition-all group"
                        >
                          <div className="space-y-1">
                            <h4 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest group-hover:text-purple-800 transition-colors">{app.id.toUpperCase()} // {app.title}</h4>
                            <p className="text-[10.5px] text-purple-600 font-semibold">{app.zhTitle}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <p className="text-[11.5px] text-slate-550 leading-relaxed font-light">{app.desc}</p>
                            <p className="text-[10px] text-brand-muted italic leading-normal border-t border-black/5 pt-2 font-light">{app.zhDesc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reflection Block (Section 6) */}
                  <div className="bg-gradient-to-tr from-purple-900/10 to-indigo-900/5 rounded-[2.5rem] p-8 border border-white/90 space-y-4">
                    <span className="text-[9.5px] text-purple-700 uppercase font-mono font-bold tracking-[0.25em] block">
                      06 / PERSONAL REFLECTION & LESSONS LEARNED
                    </span>
                    <h3 className="text-xl font-serif italic text-brand-text">What I Gathered in the Science Labs</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
                      <div className="lg:col-span-6">
                        <p className="text-xs text-slate-600 font-sans leading-relaxed font-light font-sans text-justify">
                          {reflectionText.en}
                        </p>
                      </div>
                      <div className="lg:col-span-6 border-l border-black/10 pl-5">
                        <p className="text-[11.5px] text-brand-muted leading-relaxed font-light italic font-sans text-justify">
                          {reflectionText.zh}
                        </p>
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
