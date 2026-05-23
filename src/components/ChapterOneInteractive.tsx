import React, { useState, useEffect, useRef } from 'react';
import { FadeIn } from './FadeIn';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/sound';
import { 
  Flower2, 
  HeartPulse, 
  Mic, 
  Printer, 
  Sparkles, 
  RefreshCw, 
  Send, 
  Scissors, 
  BookOpen, 
  Activity,
  Layers,
  Sparkle,
  CircleDot
} from 'lucide-react';

interface DreamTicket {
  id: string;
  timestamp: string;
  dreamText: string;
  dreamTextZh: string;
  vibe: string;
  color: string;
  bpm: number;
}

const DREAM_PRESETS = [
  {
    id: "nebula",
    label: "🌌 Starry Nebula",
    labelZh: "星云飞跃",
    text: "I was flying together with you in deep indigo space, drifting past neon dust and humming galaxies. We had no gravity, only warmth.",
    textZh: "我正同你一起飞越深邃的靛蓝色太空，飘过霓虹般的星云和低鸣的星系。我们没有重力，只有彼此指尖微弱的温度。",
    color: "#A978FF", // purple
    colorSecondary: "#FF5FA2", // Pink/Coral complimentary
    bpm: 72,
    vibe: "Serene Cosmos / 宁静寰宇"
  },
  {
    id: "ocean",
    label: "🌊 Deep Ocean Coral",
    labelZh: "深海珊瑚",
    text: "Breathing effortlessly underwater, swimming with ancient jellyfish that glowed like organic lamps. You called from the ocean floor.",
    textZh: "在水下毫不费力地自如呼吸，身旁游过如风琴灯盏亮起的老水母。我听见你从静水深流的海底深处呼唤我的声音。",
    color: "#8BE8FF", // cyan
    colorSecondary: "#3B82F6", // Deep ocean blue
    bpm: 65,
    vibe: "Deep Tranquility / 静谧沧海"
  },
  {
    id: "forest",
    label: "🌲 Misty Redwood",
    labelZh: "红杉迷雾",
    text: "Walking on damp velvet moss, finding a small golden key hidden under a giant root. The forest smelled of rain, cedar, and old books.",
    textZh: "赤脚踩在潮湿的天鹅绒绿苔上，在万年古木的隆起盘根下寻到一枚亮金铜匙。林子里有落雨、雪松与旧书卷的气息。",
    color: "#10B981", // green
    colorSecondary: "#EAB308", // Golden moss yellow
    bpm: 88,
    vibe: "Whispering Woods / 密林低语"
  },
  {
    id: "sunlight",
    label: "🍊 Sun-drenched Garden",
    labelZh: "橘色暖阳",
    text: "Sitting in an infinite library that had oranges growing on shelves. Warm sunlight was streaming through tall glass panes as we read in silence.",
    textZh: "坐在一座无尽的书香殿堂中，书格间竟结出了金黄的香橙。大片暖洋洋的橘色日光从挑高彩窗倾泻下来，我们无言并肩看书。",
    color: "#FF5FA2", // pink
    colorSecondary: "#F59E0B", // Sunlight Orange
    bpm: 98,
    vibe: "Nostalgic Sun / 橘色乡愁"
  },
  {
    id: "neonCity",
    label: "⚡ Violet Neon City",
    labelZh: "霓虹幻市",
    text: "Running down glowing endless cyber rooftops under violet rain. Suddenly the music stopped, and we looked at the sunset above smog clouds.",
    textZh: "在紫雨倾盆的闪闪烁烁霓虹楼顶无路狂奔。突然耳旁的电子低音炮静止了，我们并肩望见重度尘烟之上升起橙红的太阳。",
    color: "#FF3F9E", // Hot pink
    colorSecondary: "#818CF8", // Midnight indigo
    bpm: 115,
    vibe: "Ecstatic Beats / 赛博悸动"
  },
  {
    id: "nightmare",
    label: "💀 Midnight Nightmare",
    labelZh: "午夜深渊",
    text: "I was falling down an endless dark vertical shaft where shadows whispered riddles. The ticking of backwards clock gears mirrored my racing heart.",
    textZh: "我正坠入一口无星无光的墨黑色万丈深渊，四周掠过的诡异黑影低语着幽冥谜题。倒退旋转的巨型古钟齿轮声仿佛紧咬着我狂动狂跳的心搏。",
    color: "#E11D48", // Crimson red
    colorSecondary: "#4C0519", // Midnight deep wine black
    bpm: 135,
    vibe: "Midnight Abyss / 幽邃噩梦"
  }
];

const PRESET_BUTTON_STYLES: Record<string, { selected: string, unselected: string }> = {
  nebula: {
    selected: "bg-gradient-to-tr from-[#A978FF]/20 to-[#FF5FA2]/15 border-[#A978FF]/60 text-[#8B5CF6] shadow-[0_0_12px_rgba(169,120,255,0.25)]",
    unselected: "bg-[#A978FF]/5 hover:bg-[#A978FF]/15 border-[#A978FF]/25 text-brand-text/90"
  },
  ocean: {
    selected: "bg-gradient-to-tr from-[#8BE8FF]/25 to-[#3B82F6]/15 border-[#3b82f6]/60 text-[#0284c7] shadow-[0_0_12px_rgba(139,232,255,0.25)]",
    unselected: "bg-[#8BE8FF]/5 hover:bg-[#8BE8FF]/15 border-[#8BE8FF]/25 text-[#3b82f6]"
  },
  forest: {
    selected: "bg-gradient-to-tr from-[#10B981]/20 to-[#EAB308]/15 border-[#10B981]/60 text-[#059669] shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    unselected: "bg-[#10B981]/5 hover:bg-[#10B981]/15 border-[#10B981]/25 text-[#10b981]"
  },
  sunlight: {
    selected: "bg-gradient-to-tr from-[#FF5FA2]/20 to-[#F59E0B]/15 border-[#FF5FA2]/60 text-[#db2777] shadow-[0_0_12px_rgba(255,95,162,0.25)]",
    unselected: "bg-[#FF5FA2]/5 hover:bg-[#FF5FA2]/15 border-[#FF5FA2]/25 text-[#db2777]"
  },
  neonCity: {
    selected: "bg-gradient-to-tr from-[#FF3F9E]/20 to-[#818CF8]/15 border-[#FF3F9E]/60 text-[#ff3f9e] shadow-[0_0_12px_rgba(255,63,158,0.25)]",
    unselected: "bg-[#FF3F9E]/5 hover:bg-[#FF3F9E]/15 border-[#FF3F9E]/25 text-[#ff3f9e]"
  },
  nightmare: {
    selected: "bg-gradient-to-tr from-[#E11D48]/25 to-[#4C0519]/25 border-[#E11D48]/70 text-[#be123c] font-bold shadow-[0_0_12px_rgba(225,29,72,0.3)]",
    unselected: "bg-[#E11D48]/8 hover:bg-[#E11D48]/20 border-[#E11D48]/30 text-[#e11d48]"
  }
};

const PRESET_UPGRADES_META: Record<string, {
  gardGradientDesc: string,
  gradGradientDescZh: string,
  breathFreq: string,
  breathFreqZh: string,
  kinetics: string,
  kineticsZh: string,
  iconBg: string,
  mechanicalStyle: string,
  mechanicalStyleZh: string
}> = {
  nebula: {
    gardGradientDesc: "Starry Violet to Neon Pink Coral",
    gradGradientDescZh: "深邃星云紫 至 霓虹珊瑚粉 奢华变彩渐变",
    breathFreq: "3.6s Relaxed Cosmic Cycle / 3.6秒徐缓太息",
    breathFreqZh: "徐缓沉稳，模拟深梦状态下的优雅脑电舒张律动",
    kinetics: "Slow orbital floating with harmonic, warm pulsing filaments and ambient stardust trail",
    kineticsZh: "外张内旋律动，伴随温润如金、徐徐放散的丝缕孢子与微型星尘流",
    iconBg: "from-[#A978FF] to-[#FF5FA2]",
    mechanicalStyle: "Cosmic Floating / 星辰悬浮",
    mechanicalStyleZh: "平缓如重力微重力轨道，静水流声"
  },
  ocean: {
    gardGradientDesc: "Cyan Lagoon to Deep Atlantic Blue",
    gradGradientDescZh: "清澈蔚蓝泻湖 至 幽邃大西洋蓝 双色水溶波光",
    breathFreq: "4.8s Meditative Tidal Deep Sync / 4.8秒冥想深呼吸",
    breathFreqZh: "超慢节频，配合静水深流脉搏，带来高耦合的安定能量",
    kinetics: "Gentle wavy expansion with wave filaments resembling bioluminescent jellies",
    kineticsZh: "水母开合式流线舒张，幽蓝光能自边缘向中央核心逐渐溢流",
    iconBg: "from-[#8BE8FF] to-[#3B82F6]",
    mechanicalStyle: "Abyssal Swell / 沧海脉动",
    mechanicalStyleZh: "波浪式涟漪，层层扩散，深海呼吸"
  },
  forest: {
    gardGradientDesc: "Misty Emerald Leaf to Golden Moss Amber",
    gradGradientDescZh: "青冷松绿 至 琥珀林野金 森林晨曦散落",
    breathFreq: "3.8s Oxygenating Redwood Cycle / 3.8秒富氧森系韵律",
    breathFreqZh: "稳重松弛，贴合大自然潮湿泥土与远古呼唤的舒畅节律",
    kinetics: "Organic crisp flexing with filaments glowing like forest fireflies",
    kineticsZh: "有机韧性开合，嫩绿与琥珀交融，发光花药点宛如森林萤火虫闪动",
    iconBg: "from-[#10B981] to-[#EAB308]",
    mechanicalStyle: "Sylvan Breeze / 林间吐纳",
    mechanicalStyleZh: "轻柔弹性振颤，叶脉及花基稳固舒放"
  },
  sunlight: {
    gardGradientDesc: "Cosmic Peach to Sun-drenched Saffron",
    gradGradientDescZh: "暖和蜜桃粉 至 暖阳郁金橘 橘色乡愁余色",
    breathFreq: "2.6s Warm Receptive Pulse / 2.6秒温暖欣喜中频",
    breathFreqZh: "轻快和煦，心跳微微升温，表达传递温存的记忆热度",
    kinetics: "Bright, radiant petals flexing with filaments scattering golden warmth",
    kineticsZh: "向阳式蓬勃舒放，丝缕花蕊溢出大片融融金橙暖光",
    iconBg: "from-[#FF5FA2] to-[#F59E0B]",
    mechanicalStyle: "Solarium Radiance / 向阳舒展",
    mechanicalStyleZh: "蓬勃向外翻卷，饱满绽放的高端工艺张力"
  },
  neonCity: {
    gardGradientDesc: "Intense Cyber Violet to Electric Indigo",
    gradGradientDescZh: "极高饱和赛博玫红 至 耀速电光紫 像素高能变彩",
    breathFreq: "1.8s High-stamina Excitement / 1.8秒高能兴奋波动",
    breathFreqZh: "紧凑动感，心率奔逸状态下多级伺服轴强力交织开合",
    kinetics: "Stuttering high-rate rotations with crystalline neon pulses",
    kineticsZh: "频闪式工业美感，花瓣伴有微小定格颤步，彰显前卫数字律动",
    iconBg: "from-[#FF3F9E] to-[#818CF8]",
    mechanicalStyle: "Kinetic Strobe / 电核频闪",
    mechanicalStyleZh: "强劲短促开合，电磁极速，感官撞击"
  },
  nightmare: {
    gardGradientDesc: "Crimson Blood Spill to Abyssal Velvet Maroon",
    gradGradientDescZh: "恶梦惊悚猩红 至 深渊夜黑玛瑙 战栗电磁极化",
    breathFreq: "0.85s Anxious Jittery Flutter / 0.85秒极速焦躁急颤",
    breathFreqZh: "惊悚震颤，惊惶不宁，完美重现噩梦、下坠、惊悸状态下的紧绷缩憋",
    kinetics: "Convulsive, jittery trembling with crimson core flare spikes",
    kineticsZh: "神经质快速肌肉阵挛开合，花脉极度收缩紧绷与急促颤抖",
    iconBg: "from-[#E11D48] to-[#4C0519]",
    mechanicalStyle: "Abyssal Tremor / 战栗痉挛",
    mechanicalStyleZh: "不规则、高敏短促高频振颤，如触电般拉伸"
  }
};

export function ChapterOneInteractive() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("nebula");
  const [customDreamText, setCustomDreamText] = useState<string>("");
  const [customDreamTextZh, setCustomDreamTextZh] = useState<string>("");

  // States
  const [heartBpm, setHeartBpm] = useState<number>(72);
  const [selectedColor, setSelectedColor] = useState<string>("#A978FF");
  const [selectedColorSecondary, setSelectedColorSecondary] = useState<string>("#FF5FA2");

  const getSecondaryColor = (hex: string): string => {
    switch(hex.toLowerCase()) {
      case "#a978ff": return "#ff5fa2"; // purple -> pink
      case "#ff5fa2": return "#f59e0b"; // pink -> orange
      case "#8be8ff": return "#3b82f6"; // cyan -> deep blue
      case "#10b981": return "#eab308"; // green -> gold
      case "#ff3f9e": return "#818cf8"; // hot pink -> midnight indigo
      case "#e11d48": return "#4c0519"; // crimson red -> deep maroon shadow
      case "#f59e0b": return "#ef4444"; // amber -> red
      case "#6366f1": return "#ec4899"; // indigo -> intense pink
      default: return "#ffffff";
    }
  };

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [syncedPercent, setSyncedPercent] = useState<number>(0);
  const [hasSynthesized, setHasSynthesized] = useState<boolean>(false);
  const [isBlooming, setIsBlooming] = useState<boolean>(false);
  
  // Printer Queue
  const [printedTicket, setPrintedTicket] = useState<DreamTicket | null>(null);
  const [isTearing, setIsTearing] = useState<boolean>(false);
  const [archives, setArchives] = useState<DreamTicket[]>([]);
  const [viewingArchiveId, setViewingArchiveId] = useState<string | null>(null);

  // Sound tapping helper
  const hoverSound = () => soundManager.playHover();
  const clickSound = () => soundManager.playClick();

  // Active inputs
  const currentPreset = DREAM_PRESETS.find(p => p.id === selectedPresetId) || DREAM_PRESETS[0];
  const activeDream = customDreamText ? customDreamText : currentPreset.text;
  const activeDreamZh = customDreamTextZh ? customDreamTextZh : currentPreset.textZh;

  const getBreathDuration = (): number => {
    if (selectedPresetId === "nightmare" || selectedColor.toLowerCase() === "#e11d48") {
      return 0.85; // extremely rapid 0.85s jittery breathing
    }
    if (heartBpm >= 110) {
      return 1.8; // exciting neon rhythm
    }
    if (heartBpm >= 90) {
      return 2.5; // warm blushing garden
    }
    if (heartBpm >= 70) {
      return 3.6; // cosmic relaxed breathing
    }
    return 4.8; // deep ocean slow sync
  };

  const breathDuration = getBreathDuration();
  const isNightmare = selectedPresetId === "nightmare" || selectedColor.toLowerCase() === "#e11d48";

  // Sound effects based on preset selection
  const selectPreset = (id: string) => {
    soundManager.init();
    clickSound();
    setSelectedPresetId(id);
    const preset = DREAM_PRESETS.find(p => p.id === id);
    if (preset) {
      setHeartBpm(preset.bpm);
      setSelectedColor(preset.color);
      setSelectedColorSecondary(preset.colorSecondary || getSecondaryColor(preset.color));
      setCustomDreamText("");
      setCustomDreamTextZh("");
      setHasSynthesized(false);
      setPrintedTicket(null);
    }
  };

  // Recording audio simulation
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      soundManager.playWave();
      setRecordProgress(0);
      interval = setInterval(() => {
        setRecordProgress(prev => {
          if (prev >= 100) {
            setIsRecording(false);
            clearInterval(interval);
            // Auto transcribe custom spoken dream simulated in Chinese-English
            setCustomDreamText("A silver moon melted into a cup of chamomile tea, and when I drank it, I started floating upwards into a neon-colored cloud...");
            setCustomDreamTextZh("银色的月亮融化进一杯洋甘菊茶里，当我将它饮尽时，我开始向上飘浮，坠入一朵泛着霓虹微光的温热云团中...");
            setSelectedPresetId("");
            setHasSynthesized(false);
            soundManager.playMessage();
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleRecordToggle = () => {
    soundManager.init();
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  };

  // Heartbeat tap detection
  const handleHeartTap = () => {
    soundManager.init();
    soundManager.playPulse();
    // Simulate slight heartbeat increase
    setHeartBpm(prev => {
      const next = prev + 3;
      return next > 150 ? 55 : next;
    });
  };

  // AI image synthesis
  const triggerImageSynthesis = () => {
    soundManager.init();
    soundManager.playSparkle();
    setIsSynthesizing(true);
    setSyncedPercent(0);
    const interval = setInterval(() => {
      setSyncedPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSynthesizing(false);
          setHasSynthesized(true);
          soundManager.playDreamyBell();
          return 100;
        }
        return prev + 8;
      });
    }, 150);
  };

  // Blooming trigger
  const triggerDeviceBloom = () => {
    soundManager.init();
    soundManager.playBloom();
    setIsBlooming(true);

    // After 2.5s, mechanical blooming completes and ticket prints
    setTimeout(() => {
      soundManager.playPaper();
      const code = `DB-${2026}-${Math.floor(1000 + Math.random() * 9000)}`;
      setPrintedTicket({
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        dreamText: activeDream,
        dreamTextZh: activeDreamZh,
        vibe: currentPreset ? currentPreset.vibe : "Uncharted Dreamscape / 未知幻夜",
        color: selectedColor,
        bpm: heartBpm
      });
      setIsBlooming(false);
    }, 2800);
  };

  // Tear-off document action
  const handleTearOff = () => {
    if (!printedTicket) return;
    soundManager.init();
    soundManager.playPaper();
    setIsTearing(true);

    setTimeout(() => {
      setArchives(prev => [printedTicket, ...prev]);
      setPrintedTicket(null);
      setIsTearing(false);
    }, 800);
  };

  // Color selection update
  const selectColorHex = (hex: string) => {
    clickSound();
    setSelectedColor(hex);
    setSelectedColorSecondary(getSecondaryColor(hex));
  };

  // Derived variables
  const currentEmotionLabel = () => {
    if (heartBpm <= 70) return { title: "Deep Calm", titleZh: "静谧沉思", desc: "Lavender cool state", color: "text-[#A978FF]" };
    if (heartBpm <= 90) return { title: "Serene Wonder", titleZh: "安然奇旅", desc: "Teal relaxed pulse", color: "text-soft-cyan" };
    if (heartBpm <= 110) return { title: "Warm Nostalgia", titleZh: "温柔思念", desc: "Warm blushing heart", color: "text-neon-pink" };
    return { title: "Vivid Ecstasy", titleZh: "悸动狂欢", desc: "Solar heat excitement", color: "text-red-400" };
  };

  const activeEmotionIndex = currentEmotionLabel();

  return (
    <section id="chapter-one-interactive-section" className="py-24 relative z-10 overflow-hidden bg-white/5 backdrop-blur-sm border-t border-b border-white/30 my-8">
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 transition-colors duration-1000">
        {/* Dynamic decorative auras based on dream active mode */}
        {isNightmare ? (
          <>
            <motion.div 
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.1, 1] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[25%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-r from-[#E11D48] to-[#4C0519] blur-[110px]" 
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#4C0519] to-[#EF4444] blur-[130px]" 
            />
          </>
        ) : (
          <>
            <div className="absolute top-[25%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-r from-glow-purple/20 to-neon-pink/10 blur-[100px]" />
            <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-soft-cyan/20 to-glow-purple/10 blur-[120px]" />
          </>
        )}
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <FadeIn className="text-center mb-16">
          <div className="mb-2 uppercase text-[10px] tracking-[0.25em] font-bold text-neon-pink opacity-80">
            05 / Interactive Simulator
          </div>
          <h3 className="text-4xl lg:text-5xl font-serif italic text-brand-text mb-4">
            Dream Bloom Device console
          </h3>
          <p className="text-sm md:text-base text-brand-muted font-light max-w-3xl mx-auto leading-relaxed">
            Experience the multi-sensory dream transmission. Set your emotional heart rate, input dream vocal codes, weave abstract neural artwork, and send waves to bloom the physical flower device.
            <br />
            <span className="text-[12px] opacity-85 mt-2.5 block">体验多感官梦境传递：调节情感心率、录入梦境语篇，织造抽象神经星图，发送波纹让远方的花朵装置默契绽放。</span>
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: 7 COLS STAGED CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STAGE 1: DREAM RECORD */}
            <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgba(205,183,246,0.12)] space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neon-pink/10 flex items-center justify-center font-mono text-[10px] text-neon-pink font-bold">1</span>
                  <h4 className="text-lg font-serif italic text-brand-text tracking-wide">Recount & Record your dream</h4>
                </div>
                <div className="text-[11px] font-mono text-brand-muted uppercase">述梦录谱</div>
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {DREAM_PRESETS.map((preset) => {
                  const style = PRESET_BUTTON_STYLES[preset.id] || PRESET_BUTTON_STYLES.nebula;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => selectPreset(preset.id)}
                      className={`px-2.5 py-2.5 rounded-2xl text-[10.5px] font-bold tracking-wide transition-all duration-300 relative border flex flex-col items-center gap-1 leading-snug cursor-pointer ${
                        selectedPresetId === preset.id ? style.selected : style.unselected
                      }`}
                    >
                      <span className="block">{preset.label.split(" ")[0]}</span>
                      <span className="text-[9.5px] opacity-85 block">{preset.labelZh}</span>
                    </button>
                  );
                })}
              </div>

              {/* Text display panel & Recording indicator */}
              <div className="relative bg-white/50 backdrop-blur-md rounded-3xl border border-white/80 p-5 min-h-[110px] flex flex-col justify-between group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-glow-purple/2 pointer-events-none" />
                {isRecording ? (
                  <div className="flex flex-col items-center justify-center py-4 space-y-3 w-full">
                    {/* Animated Waveform */}
                    <div className="flex items-center gap-1 h-8">
                      {[...Array(14)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          animate={{ height: [8, Math.random() * 26 + 6, 8] }}
                          transition={{ duration: 0.5 + Math.random() * 0.4, repeat: Infinity, ease: "easeInOut" }}
                          className="w-[3px] bg-gradient-to-t from-neon-pink to-glow-purple rounded-full"
                        />
                      ))}
                    </div>
                    <div className="text-[11px] font-mono text-neon-pink tracking-[0.2em] uppercase animate-pulse">
                      Recording Neural Waveform... {Math.floor(recordProgress)}%
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[13.5px] text-brand-text leading-released font-light italic">
                      "{activeDream}"
                    </p>
                    <p className="text-[12px] text-brand-muted/80 leading-relaxed font-light">
                      {activeDreamZh}
                    </p>
                  </div>
                )}

                {/* Reset Custom button if customized */}
                {customDreamText && !isRecording && (
                  <button
                    onClick={() => { clickSound(); setCustomDreamText(""); setCustomDreamTextZh(""); setSelectedPresetId("nebula"); }}
                    className="absolute top-3 right-3 text-brand-muted/50 hover:text-neon-pink transition-colors cursor-pointer"
                    title="Reset to preset"
                  >
                    <RefreshCw size={13} />
                  </button>
                )}
              </div>

              {/* Vocal input bar */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRecordToggle}
                  className={`px-5 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${isRecording ? 'bg-neon-pink border-neon-pink text-white animate-pulse shadow-md' : 'bg-white/80 border-white/60 hover:bg-white text-neon-pink'}`}
                  onMouseEnter={hoverSound}
                >
                  <Mic size={14} className={isRecording ? 'animate-bounce' : ''} />
                  <span>{isRecording ? "Stop Recording" : "Voice Tap (语音录入)"}</span>
                </button>
                
                <span className="text-[11px] text-brand-muted/70 font-light hidden sm:inline border-l border-brand-muted/25 pl-4">
                  Hold simulated voice recording or pick an evocative preset dream-theme.
                </span>
              </div>

              {/* ADVANCED MULTI-SENSORY HARDWARE UPGRADE PANEL */}
              <div className="border-t border-brand-muted/10 pt-5 mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-glow-purple animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-glow-purple">
                      Sensory Profile Diagnostic / 实体感知技术汇总
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-glow-purple/10 text-glow-purple border border-glow-purple/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Actuator v1.8 Dynamic
                  </span>
                </div>

                {(() => {
                  const meta = PRESET_UPGRADES_META[selectedPresetId] || PRESET_UPGRADES_META.nebula;
                  return (
                    <div className="grid sm:grid-cols-2 gap-4 bg-white/30 rounded-3xl border border-white p-4 text-[12px] leading-relaxed relative overflow-hidden shadow-xs">
                      {/* Sub-gradient background aura matching selected color */}
                      <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-20 pointer-events-none" style={{ backgroundColor: selectedColor }} />
                      
                      <div className="space-y-3">
                        {/* Multicolor Gradient Showcase */}
                        <div>
                          <span className="text-[10px] uppercase font-mono text-brand-muted/80 block">🌈 Multi-Core Color Palette / 双色变彩织造</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="w-5 h-5 rounded-full shrink-0 border border-white shadow-xs inline-block animate-pulse" style={{ backgroundColor: selectedColor }} />
                            <span className="text-[11px] font-mono text-neutral-400">→</span>
                            <span className="w-5 h-5 rounded-full shrink-0 border border-white shadow-xs inline-block" style={{ backgroundColor: selectedColorSecondary }} />
                            <div className="leading-snug">
                              <span className="font-bold text-brand-text block text-[11.5px]">{meta.gardGradientDesc}</span>
                              <span className="text-[10px] text-brand-muted block font-light">{meta.gradGradientDescZh}</span>
                            </div>
                          </div>
                        </div>

                        {/* Breathing rhythm details */}
                        <div>
                          <span className="text-[10px] uppercase font-mono text-brand-muted/80 block">💓 Breathing Reciprocation / 呼吸驱动振幅</span>
                          <div className="mt-0.5 leading-snug">
                            <span className="font-bold text-brand-text block text-[11.5px]">{meta.breathFreq}</span>
                            <span className="text-[10.5px] text-brand-muted block font-light">{meta.breathFreqZh}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 sm:border-l sm:border-brand-muted/10 sm:pl-4">
                        {/* Mechanical Actuator kinetics style */}
                        <div>
                          <span className="text-[10px] uppercase font-mono text-brand-muted/80 block">⚙️ Robotic Kinetic Assembly / 伺服电机开合工艺</span>
                          <div className="mt-0.5 leading-snug">
                            <span className="font-bold text-glow-purple block text-[11.5px]">{meta.mechanicalStyle}</span>
                            <span className="text-[10.5px] text-brand-muted block font-light">{meta.mechanicalStyleZh}</span>
                          </div>
                        </div>

                        {/* Space mapping or ambient influence */}
                        <div>
                          <span className="text-[10px] uppercase font-mono text-brand-muted/80 block">✨ Bio-Pulser & Anthers / 微型铜丝花蕊与流萤花药</span>
                          <div className="mt-0.5 leading-snug">
                            <p className="font-light text-brand-text/90 text-[11px] leading-relaxed">
                              {meta.kinetics}
                            </p>
                            <p className="text-[10.5px] text-brand-muted font-light leading-relaxed border-l border-glow-purple/20 pl-2 mt-1">
                              {meta.kineticsZh}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* STAGE 2: HEART-RATE & ENERGY LEVEL */}
            <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgba(205,183,246,0.12)] grid md:grid-cols-2 gap-6">
              
              {/* Left Column: BPM adjust */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-glow-purple/10 flex items-center justify-center font-mono text-[10px] text-glow-purple font-bold">2</span>
                  <h4 className="text-lg font-serif italic text-brand-text tracking-wide">Sync emotional heartbeat</h4>
                </div>
                
                <div className="flex items-center gap-5 pt-2">
                  <button
                    onClick={handleHeartTap}
                    className="relative w-16 h-16 rounded-full bg-white border border-white shadow-md flex items-center justify-center text-neon-pink group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
                    onMouseEnter={hoverSound}
                    title="Tap to pulse heart rate"
                  >
                    {/* Ring aura */}
                    <div className="absolute inset-0 rounded-full border border-neon-pink/40 animate-ping opacity-45" style={{ animationDuration: `${60 / heartBpm}s` }} />
                    <HeartPulse size={26} className="text-neon-pink animate-pulse" style={{ animationDuration: `${60 / heartBpm}s` }} />
                  </button>

                  <div>
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className="text-4xl font-serif italic font-bold text-brand-text tracking-tighter">{heartBpm}</span>
                      <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider">BPM</span>
                    </div>
                    <span className="text-[11px] text-brand-muted font-light">Interactive Heart rate variability</span>
                  </div>
                </div>

                <div className="pt-2">
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={heartBpm}
                    onChange={(e) => { setHeartBpm(Number(e.target.value)); soundManager.playHover(); }}
                    className="w-full accent-neon-pink h-1 rounded-lg bg-neutral-200"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-brand-muted/70 mt-1 uppercase">
                    <span>50 REST (静息)</span>
                    <span>150 ECSTATIC (悸动)</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mood Color matching */}
              <div className="space-y-4 md:border-l md:border-brand-muted/15 md:pl-6">
                <div className="flex items-center justify-between">
                  <h5 className="text-[12.5px] font-medium tracking-wide text-brand-text">Calibrated Emotional Spectrum</h5>
                  <span className="text-[10px] font-mono text-brand-muted uppercase">情绪谱系</span>
                </div>

                <div className="p-3 bg-white/40 border border-white/60 rounded-2xl flex items-center gap-4">
                  <div className={`w-3.5 h-3.5 rounded-full border border-white/80 shrink-0 shadow-sm animate-pulse bg-current ${activeEmotionIndex.color}`} />
                  <div>
                    <div className={`text-[12px] font-bold uppercase tracking-wider ${activeEmotionIndex.color}`}>
                      {activeEmotionIndex.title} / {activeEmotionIndex.titleZh}
                    </div>
                    <p className="text-[10.5px] text-brand-muted font-light">{activeEmotionIndex.desc}</p>
                  </div>
                </div>

                {/* Color crystals selection */}
                <div className="space-y-1.5">
                  <span className="text-[10.5px] text-brand-muted font-light">Select sensory projection color:</span>
                  <div className="flex gap-2">
                    {[
                      { hex: "#A978FF", label: "Nebula" }, // Cyber Lilac/Purple
                      { hex: "#FF5FA2", label: "Coral" }, // Cosmo Pink
                      { hex: "#8BE8FF", label: "Aqua" }, // Deep Ocean Cyan
                      { hex: "#10B981", label: "Moss" }, // Forest Green
                      { hex: "#FF3F9E", label: "Passion" }, // Hot pink/magenta
                      { hex: "#E11D48", label: "Crimson" }, // Nightmare Crimson
                      { hex: "#F59E0B", label: "Saffron" }, // Saffron Amber
                      { hex: "#6366F1", label: "Indigo" } // Cosmic Indigo
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => selectColorHex(c.hex)}
                        title={c.label}
                        className={`w-7 h-7 rounded-full transition-all duration-300 relative border flex items-center justify-center cursor-pointer ${selectedColor === c.hex ? 'ring-2 ring-offset-2 ring-glow-purple border-white scale-110 shadow-md' : 'border-white/60 opacity-60 hover:opacity-100 hover:scale-105'}`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.hex && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE 3: AI DREAM IMAGE GENERATOR */}
            <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgba(205,183,246,0.12)] space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-soft-cyan/10 flex items-center justify-center font-mono text-[10px] text-soft-cyan font-bold">3</span>
                  <h4 className="text-lg font-serif italic text-brand-text tracking-wide">Weave AI dream illustration</h4>
                </div>
                <div className="text-[11px] font-mono text-brand-muted uppercase">织造梦相</div>
              </div>

              <div className="grid md:grid-cols-12 gap-6 items-center">
                
                {/* Simulated rendering frame (Compact design) */}
                <div className="md:col-span-3 aspect-square w-full max-w-[145px] mx-auto md:mx-0 bg-white/70 border border-white/80 rounded-3xl overflow-hidden relative shadow-inner flex flex-col items-center justify-center">
                  
                  {isSynthesizing ? (
                    <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center p-4">
                      {/* Generative scanner line animation */}
                      <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-soft-cyan to-transparent shadow-[0_0_10px_#8BE8FF] z-20"
                      />
                      
                      {/* Shimmering randomized pixels */}
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-800 to-transparent flex flex-wrap gap-1 p-2 overflow-hidden justify-center items-center">
                        {[...Array(60)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.1, 0.9, 0.1] }}
                            transition={{ duration: 0.8 + Math.random() * 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: selectedColor }}
                          />
                        ))}
                      </div>

                      <div className="text-[10px] font-mono text-soft-cyan z-10 text-center uppercase tracking-widest mt-2">
                        Synthesizing...
                        <div className="text-[13px] font-bold mt-1 text-white">{Math.floor(syncedPercent)}%</div>
                      </div>
                    </div>
                  ) : hasSynthesized ? (
                    <div className="absolute inset-0 flex items-center justify-center relative overflow-hidden bg-white/90">
                      {/* Dynamic Abstract Art generated using selection keys, showing real SVG compositions */}
                      <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                        {/* Beautiful generated abstract SVG map */}
                        <svg className="w-full h-full p-2 scale-105" viewBox="0 0 200 200">
                          {/* Stars */}
                          {[...Array(24)].map((_, i) => (
                            <circle
                              key={i}
                              cx={30 + Math.sin(i * 123) * 70 + 70}
                              cy={30 + Math.cos(i * 342) * 70 + 70}
                              r={0.6 + (i % 3 === 0 ? 0.8 : 0)}
                              fill="#FFFFFF"
                              opacity={0.4 + (i % 2 === 0 ? 0.4 : 0)}
                            />
                          ))}
                          
                          {/* Dream Bloom core blob */}
                          <defs>
                            <radialGradient id="dream-glow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={selectedColor} stopOpacity="0.8" />
                              <stop offset="60%" stopColor={selectedColor} stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          <circle cx="100" cy="100" r="90" fill="url(#dream-glow)" />

                          {/* Interactive paths based on BPM */}
                          <motion.path
                            d={`M 20,100 Q 60,${100 - heartBpm / 2} 100,100 T 180,100`}
                            fill="none"
                            stroke={selectedColor}
                            strokeWidth="1.2"
                            opacity="0.8"
                            animate={{ strokeWidth: [1, 2.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <motion.path
                            d={`M 20,105 Q 60,${100 + heartBpm / 3} 100,105 T 180,105`}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="0.8"
                            opacity="0.5"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />

                          {/* Decorative spiral nebula center based on selection */}
                          <motion.g 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="origin-[100px_100px]"
                          >
                            <circle cx="100" cy="100" r="6" fill="#FFFFFF" filter="blur(1px)" />
                            <path d="M 100,100 Q 115,90 120,60" fill="none" stroke={selectedColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                            <path d="M 100,100 Q 85,110 80,140" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                            <circle cx="120" cy="60" r="4" fill={selectedColor} filter="blur(1px)" />
                            <circle cx="80" cy="140" r="3" fill="#8BE8FF" filter="blur(1.5px)" strokeWidth="0.5" />
                          </motion.g>
                        </svg>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 bg-neutral-900/60 backdrop-blur-md py-1.5 px-3 rounded-xl border border-white/10 flex justify-between items-center z-10">
                        <span className="text-[9px] font-mono text-white/90 tracking-wider">PROJECTED SCENE</span>
                        <Sparkles size={11} className="text-star-yellow animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <Layers size={28} className="text-brand-muted/40 mx-auto mb-2" />
                      <span className="text-[11px] text-brand-muted italic block">Illustration awaiting synthesis</span>
                    </div>
                  )}
                  
                </div>

                {/* Synthesis prompts and status */}
                <div className="md:col-span-9 space-y-3">
                  <div className="text-[12.5px] font-medium text-brand-text">Aesthetic Dream Rendering Engine</div>
                  <p className="text-[11.5px] text-brand-muted font-light leading-relaxed">
                    Our machine model translates voice frequency profiles and heart rate values into localized vector illustrations. This provides tangible dream shapes for faraway partners to witness.
                  </p>
                  
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={triggerImageSynthesis}
                      disabled={isSynthesizing}
                      className={`px-5 py-2.5 rounded-full flex items-center gap-2 cursor-pointer border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${hasSynthesized ? 'bg-white border-glow-purple/40 text-glow-purple hover:bg-neutral-50' : 'bg-gradient-to-r from-glow-purple to-neon-pink text-white shadow-md hover:-translate-y-0.5'}`}
                      onMouseEnter={hoverSound}
                    >
                      <RefreshCw size={12} className={isSynthesizing ? 'animate-spin' : ''} />
                      <span>{hasSynthesized ? "Re-synthesize Vector" : "Synthesize Scene (织造梦境)"}</span>
                    </button>
                    {hasSynthesized && (
                      <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 font-bold">
                        ● MODEL STABLE / 织绘完毕
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* SEND / BLOOM BUTTON */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-neutral-950 to-neutral-900 border border-neutral-800 p-6 rounded-[2.5rem] shadow-xl text-white gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-[14px] font-bold tracking-wide flex items-center gap-2 justify-center sm:justify-start">
                  <Sparkles size={14} className="text-star-yellow animate-pulse" />
                  Transmit to Remote Partner Flower
                </div>
                <p className="text-[11.5px] text-neutral-400 font-light">
                  Pushing color wave patterns, bio-pulse strings, and rendered scene to partners.
                </p>
              </div>

              <button
                onClick={triggerDeviceBloom}
                disabled={!hasSynthesized || isBlooming || isTearing}
                className={`px-7 py-4.5 rounded-full flex items-center gap-2 font-bold tracking-widest text-xs uppercase transition-all duration-300 cursor-pointer ${!hasSynthesized ? 'bg-neutral-800 border-neutral-700 text-neutral-500 cursor-not-allowed' : isBlooming ? 'bg-amber-600 animate-pulse text-white' : 'bg-gradient-to-r from-neon-pink via-glow-purple to-soft-cyan text-white shadow-[0_0_20px_rgba(169,120,255,0.4)] hover:shadow-[0_0_35px_rgba(255,95,162,0.65)] hover:-translate-y-0.5'}`}
                onMouseEnter={hoverSound}
              >
                <Send size={13} className={isBlooming ? 'animate-ping' : ''} />
                <span>{isBlooming ? "Blooming Device..." : "Send & Transmit (发送并开花)"}</span>
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: 5 COLS VIRTUAL FLOWER DEVICE & PRINTER */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-start">
            
            {/* VIRTUAL DEVICE STAGE */}
            <div className="bg-gradient-to-b from-stone-900/95 to-neutral-950/95 border border-stone-800/90 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[350px]">
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,95,162,0.1),transparent_75%)] pointer-events-none" />
              
              {/* Device Label */}
              <div className="w-full flex justify-between items-center text-[10px] font-mono text-neutral-400 tracking-widest uppercase z-10 border-b border-white/5 pb-3">
                <span className="flex items-center gap-1.5"><CircleDot className="text-neon-pink w-2 h-2 animate-pulse" /> TARGET DEVICE SYNC</span>
                <span>DB-CORE-v1</span>
              </div>

              {/* FLOWER STAGE CANVAS */}
              <div className="my-6 relative w-56 h-56 flex items-center justify-center">
                
                {/* Radial energy wave emission under Bloom */}
                <AnimatePresence>
                  {isBlooming && (
                    <>
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0.8 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute w-28 h-28 rounded-full border border-dashed pointer-events-none"
                        style={{ borderColor: selectedColor, borderWidth: '2px' }}
                      />
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 2.3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
                        className="absolute w-28 h-28 rounded-full border pointer-events-none"
                        style={{ borderColor: selectedColor, opacity: 0.5 }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Soft background aura glow */}
                <motion.div
                  animate={{
                    scale: isBlooming ? [1, 1.4, 1.2] : [1, 1.05, 1],
                    opacity: isBlooming ? [0.6, 0.9, 0.7] : [0.3, 0.45, 0.3],
                    filter: isBlooming ? "blur(35px)" : "blur(25px)"
                  }}
                  transition={{ duration: isBlooming ? 1.4 : 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-36 h-36 rounded-full opacity-40 blur-3xl pointer-events-none"
                  style={{ backgroundColor: selectedColor }}
                />

                {/* THE FLOWER SVG */}
                <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(255,var(--primary-glow-rgb,95),162,0.25)] z-10" viewBox="0 0 200 200">
                  {/* High-tech Holographic Radar Reticle Background */}
                  <g className="opacity-45">
                    {/* Concentric Calibration Orbits */}
                    <circle cx="100" cy="105" r="92" fill="none" stroke={selectedColor} strokeWidth="0.4" strokeOpacity="0.15" strokeDasharray="3, 7" />
                    <circle cx="100" cy="105" r="76" fill="none" stroke={selectedColor} strokeWidth="0.5" strokeOpacity="0.25" />
                    <circle cx="100" cy="105" r="56" fill="none" stroke="#FFFFFF" strokeWidth="0.4" strokeOpacity="0.2" strokeDasharray="5, 3" />
                    <circle cx="100" cy="105" r="34" fill="none" stroke={selectedColorSecondary} strokeWidth="0.3" strokeOpacity="0.3" />
                    
                    {/* Reticle axis lines */}
                    <line x1="100" y1="8" x2="100" y2="22" stroke={selectedColor} strokeWidth="0.6" strokeOpacity="0.4" />
                    <line x1="100" y1="188" x2="100" y2="202" stroke={selectedColor} strokeWidth="0.6" strokeOpacity="0.4" />
                    <line x1="8" y1="105" x2="22" y2="105" stroke={selectedColor} strokeWidth="0.6" strokeOpacity="0.4" />
                    <line x1="188" y1="105" x2="202" y2="105" stroke={selectedColor} strokeWidth="0.6" strokeOpacity="0.4" />
                    
                    {/* Micro graduation ticks */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <line
                        key={`tick-${deg}`}
                        x1="100"
                        y1="10"
                        x2="100"
                        y2="14"
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="0.5"
                        transform={`rotate(${deg} 100 105)`}
                      />
                    ))}
                  </g>

                  {/* Floating pollen/spores particles around the flower */}
                  {[...Array(8)].map((_, idx) => {
                    const radius = 64 + (idx % 2 === 0 ? 12 : -8);
                    const speed = 3 + (idx % 3) * 2;
                    const angle = idx * 45;
                    return (
                      <motion.circle
                        key={`pollen-${idx}`}
                        cx={100 + Math.cos(angle * Math.PI / 180) * radius}
                        cy={105 + Math.sin(angle * Math.PI / 180) * radius}
                        r={1.2 + (idx % 3) * 0.5}
                        fill={idx % 2 === 0 ? "#FCD34D" : selectedColor}
                        animate={{
                          y: [0, -12, 0],
                          opacity: [0.15, 0.85, 0.15],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: speed,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.4
                        }}
                      />
                    );
                  })}

                  {/* Stem & Leaves support with Calyx cups (Sleek Technical Carbon-Slate Metallic, No Green!) */}
                  <g className="opacity-95">
                    {/* Glowing holographic glass stem light tube */}
                    <path d="M 100,105 Q 88,145 100,185" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="6" strokeLinecap="round" />
                    {/* Curved elegant architectural steel stem */}
                    <path d="M 100,105 Q 88,145 100,185" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                    {/* Center luminescent neon fiber vein in stem pulsing dynamically with active color */}
                    <path d="M 100,105 Q 88,145 100,185" fill="none" stroke={selectedColor} strokeWidth="1" strokeLinecap="round" strokeDasharray="3, 5" className="animate-pulse" />
                    
                    {/* Curved Leaf 1 with digital circuit trace overlay (Slate Technical Plate, NO GREEN) */}
                    <g>
                      <path d="M 94,142 Q 65,130 55,145 Q 75,155 92,148" fill="#1E293B" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
                      {/* Leaf circuit vein line */}
                      <path d="M 94,142 Q 72,136 60,143" fill="none" stroke={selectedColorSecondary} strokeWidth="0.6" strokeOpacity="0.75" />
                      <circle cx="60" cy="143" r="1.2" fill="#FFFFFF" />
                    </g>
                    
                    {/* Curved Leaf 2 with digital circuit trace overlay (Slate Technical Plate, NO GREEN) */}
                    <g>
                      <path d="M 96,160 Q 125,150 135,165 Q 120,175 98,166" fill="#1E293B" stroke="#475569" strokeWidth="1" strokeLinecap="round" />
                      {/* Leaf circuit vein line */}
                      <path d="M 96,160 Q 118,154 130,162" fill="none" stroke={selectedColorSecondary} strokeWidth="0.6" strokeOpacity="0.75" />
                      <circle cx="130" cy="162" r="1.2" fill="#FFFFFF" />
                    </g>

                    {/* Symmetrical Calyx Sepals Base supporting the flower petals from behind (Graphite Metal Clips) */}
                    <g className="origin-[100px_105px]">
                      {/* Left Calyx sepal */}
                      <path d="M 100,105 C 80,108 68,118 76,128 C 84,124 92,114 100,105" fill="#334155" stroke="#1E293B" strokeWidth="0.8" />
                      {/* Right Calyx sepal */}
                      <path d="M 100,105 C 120,108 132,118 124,128 C 116,124 108,114 100,105" fill="#334155" stroke="#1E293B" strokeWidth="0.8" />
                      {/* Central Calyx sepal cup */}
                      <path d="M 90,113 Q 100,121 110,113 Q 100,104 90,113" fill="#1E293B" stroke="#0F172A" strokeWidth="0.8" />
                    </g>
                  </g>

                  {/* ROTATING OUTER PETAL GROUP (LOTUS LAYER 1 - 8 PETALS) */}
                  <motion.g
                    animate={{
                      rotate: isBlooming ? 180 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isNightmare ? 190 : (isBlooming ? 30 : 60),
                      damping: isNightmare ? 7 : (isBlooming ? 12 : 14),
                      duration: isNightmare ? 0.85 : 3
                    }}
                    className="origin-[100px_105px]"
                  >
                    {/* Overlapping pointed outer lotus petals (8 petals) */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45;
                      
                      const scaleVal = isBlooming 
                        ? [1.02, 1.20, 1.12] 
                        : [0.82, 0.90, 0.82];
                      
                      const pulseDuration = breathDuration;

                      return (
                        <motion.g
                          key={`outer-${i}`}
                          transform={`rotate(${angle} 100 105)`}
                          animate={{
                            scale: scaleVal,
                            opacity: isBlooming ? [0.75, 1.0, 0.9] : [0.4, 0.52, 0.4]
                          }}
                          transition={{ 
                            duration: pulseDuration, 
                            repeat: Infinity,
                            ease: isNightmare ? "linear" : "easeInOut",
                            delay: i * 0.10
                          }}
                          className="origin-[100px_105px]"
                        >
                          <path
                            d="M 100,105 C 68,72 60,34 100,10 C 140,34 132,72 100,105"
                            fill="url(#outer-petal-grad)"
                            stroke={selectedColorSecondary}
                            strokeWidth="0.6"
                            strokeOpacity="0.55"
                          />
                          {/* Inner glowing technical fiber veins */}
                          <path
                            d="M 100,105 Q 85,60 100,28"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.55)"
                            strokeWidth="0.55"
                            strokeDasharray="1, 4"
                          />
                          <path
                            d="M 100,105 Q 115,60 100,28"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.55)"
                            strokeWidth="0.55"
                            strokeDasharray="1, 4"
                          />
                        </motion.g>
                      );
                    })}
                  </motion.g>

                  {/* ROTATING INTERMEDIARY PETAL GROUP (LOTUS LAYER 2 - 8 PETALS) */}
                  <motion.g
                    animate={{
                      rotate: isBlooming ? -135 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isNightmare ? 170 : (isBlooming ? 35 : 55),
                      damping: isNightmare ? 6 : (isBlooming ? 10 : 15),
                      duration: isNightmare ? 0.85 : 3
                    }}
                    className="origin-[100px_105px]"
                  >
                    {/* Pointed middle lotus petals, interlaced in-between outer petals (8 petals) */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45 + 22.5; // perfectly interlaced offset
                      const scaleVal = isBlooming 
                        ? [0.98, 1.14, 1.06] 
                        : [0.76, 0.84, 0.76];
                      
                      const pulseDuration = breathDuration;

                      return (
                        <motion.g
                          key={`mid-${i}`}
                          transform={`rotate(${angle} 100 105)`}
                          animate={{
                            scale: scaleVal,
                            opacity: isBlooming ? [0.72, 0.98, 0.88] : [0.35, 0.46, 0.35]
                          }}
                          transition={{ 
                            duration: pulseDuration, 
                            repeat: Infinity,
                            ease: isNightmare ? "linear" : "easeInOut",
                            delay: i * 0.08
                          }}
                          className="origin-[100px_105px]"
                        >
                          <path
                            d="M 100,105 C 72,75 66,42 100,20 C 134,42 128,75 100,105"
                            fill="url(#outer-petal-grad)"
                            stroke={selectedColor}
                            strokeWidth="0.5"
                            strokeOpacity="0.45"
                          />
                          {/* Searing tech axis centerline */}
                          <line
                            x1="100"
                            y1="105"
                            x2="100"
                            y2="30"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="0.5"
                            strokeDasharray="2, 2"
                          />
                        </motion.g>
                      );
                    })}
                  </motion.g>

                  {/* ROTATING INNER PETAL GROUP (LOTUS LAYER 3 - 8 PETALS) */}
                  <motion.g
                    animate={{
                      rotate: isBlooming ? -90 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isNightmare ? 220 : 45,
                      damping: isNightmare ? 8 : 12,
                      duration: isNightmare ? 0.85 : 2.5
                    }}
                    className="origin-[100px_105px]"
                  >
                    {/* Concentrated pointed inner lotus petals (8 petals) */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45 + 11.25;
                      const scaleVal = isBlooming 
                        ? [1.02, 1.18, 1.10] 
                        : [0.75, 0.82, 0.75];
                        
                      const pulseDuration = breathDuration;

                      return (
                        <motion.g
                          key={`inner-${i}`}
                          transform={`rotate(${angle} 100 105)`}
                          className="origin-[100px_105px]"
                          animate={{
                            scale: scaleVal,
                            opacity: isBlooming ? [0.75, 1.0, 0.9] : [0.3, 0.42, 0.3]
                          }}
                          transition={{ 
                            duration: pulseDuration, 
                            repeat: Infinity, 
                            ease: isNightmare ? "linear" : "easeInOut",
                            delay: i * 0.1
                          }}
                        >
                          <path
                            d="M 100,105 C 78,80 74,52 100,32 C 126,52 122,80 100,105"
                            fill="url(#inner-petal-grad)"
                            stroke="rgba(255, 255, 255, 0.5)"
                            strokeWidth="0.5"
                          />
                          {/* Inside Glowing LED Track Line */}
                          <line
                            x1="100"
                            y1="105"
                            x2="100"
                            y2="32"
                            stroke={selectedColor}
                            strokeWidth="0.8"
                            strokeOpacity="0.7"
                          />
                          <circle
                            cx="100"
                            cy="32"
                            r="1.2"
                            fill="#FFFFFF"
                            className="shadow-md"
                          />
                        </motion.g>
                      );
                    })}
                  </motion.g>

                  {/* ELEGANT STAMEN FILAMENTS AND GLOWING AMBER ANTHERS */}
                  <g className="origin-[100px_105px]">
                    {[...Array(5)].map((_, i) => {
                      const angle = i * 72 + 18; // Offset rotated from petals
                      const scaleVal = isBlooming 
                        ? [0.93, 1.18, 1.05] 
                        : [0.65, 0.75, 0.65];
                      const filamentPulseDur = breathDuration;

                      return (
                        <motion.g
                          key={`filament-${i}`}
                          transform={`rotate(${angle} 100 105)`}
                          animate={{
                            scale: scaleVal,
                            opacity: isBlooming ? [0.75, 1.0, 0.85] : [0.32, 0.48, 0.32]
                          }}
                          transition={{
                            duration: filamentPulseDur,
                            repeat: Infinity,
                            ease: isNightmare ? "linear" : "easeInOut",
                            delay: i * 0.06
                          }}
                          className="origin-[100px_105px]"
                        >
                          {/* Graceful copper-clad metallic filament stem */}
                          <path
                            d="M 100,105 Q 93,82 86,72"
                            fill="none"
                            stroke="#EBC49F"
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity="0.9"
                          />
                          {/* Rich gold/amber glowing pollen tip/anther */}
                          <circle
                            cx="86"
                            cy="72"
                            r="2.5"
                            fill="#FCD34D"
                            stroke="#FFFFFF"
                            strokeWidth="0.4"
                            className="drop-shadow-[0_0_6px_rgba(252,211,77,0.85)]"
                          />
                        </motion.g>
                      );
                    })}
                  </g>

                  {/* CENTRAL PISTIL STRUCTURE WITH GOLDEN CORE AND GLOW HALO */}
                  <g className="origin-[100px_105px]">
                    {/* Ring of rotating pollen dots at core border */}
                    <motion.g
                      animate={{ rotate: 360 }}
                      transition={{ duration: isNightmare ? 4 : 12, repeat: Infinity, ease: "linear" }}
                      className="origin-[100px_105px]"
                    >
                      {[...Array(6)].map((_, idx) => {
                        const angle = idx * 60;
                        const px = 100 + Math.cos(angle * Math.PI / 180) * 15;
                        const py = 105 + Math.sin(angle * Math.PI / 180) * 15;
                        return (
                          <motion.circle
                            key={`pollen-core-${idx}`}
                            cx={px}
                            cy={py}
                            r="1.8"
                            fill="#FCD34D"
                            stroke="#ffffff"
                            strokeWidth="0.4"
                            animate={{ scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 60/heartBpm, repeat: Infinity, delay: idx * 0.1 }}
                          />
                        );
                      })}
                    </motion.g>

                    {/* Outer soft glowing halo sphere */}
                    <circle 
                      cx="100" 
                      cy="105" 
                      r="14" 
                      fill="url(#dream-glow)" 
                      className="pointer-events-none" 
                    />

                    {/* Pure velvet physical hub of the pistil */}
                    <motion.circle
                      cx="100"
                      cy="105"
                      r="11"
                      fill={selectedColor}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      animate={{
                        scale: [0.93, 1.12, 0.93],
                      }}
                      transition={{
                        duration: 60 / heartBpm,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="origin-[100px_105px] cursor-pointer drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      onClick={handleHeartTap}
                    />

                    {/* Golden central sparkle crown */}
                    <motion.path
                      d="M 100,100 L 102,103 L 105,105 L 102,107 L 100,110 L 98,107 L 95,105 L 98,103 Z"
                      fill="#FCD34D"
                      className="pointer-events-none origin-[100px_105px]"
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 45, 0]
                      }}
                      transition={{
                        duration: 60 / heartBpm,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </g>

                  {/* Gradients definitions inside SVG */}
                  <defs>
                    <linearGradient id="outer-petal-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={selectedColor} />
                      <stop offset="60%" stopColor={selectedColorSecondary} />
                      <stop offset="100%" stopColor="#0B090A" />
                    </linearGradient>
                    <linearGradient id="inner-petal-grad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="45%" stopColor={selectedColor} />
                      <stop offset="100%" stopColor={selectedColorSecondary} stopOpacity="0.75" />
                    </linearGradient>
                    <radialGradient id="dream-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="40%" stopColor={selectedColor} stopOpacity="0.9" />
                      <stop offset="80%" stopColor={selectedColorSecondary} stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#090506" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

              </div>

              {/* Status prompt */}
              <div className="text-center z-10 w-full bg-stone-900/40 p-3 rounded-2xl border border-white/5">
                {isBlooming ? (
                  <div className="space-y-1">
                    <span className="text-[12px] font-bold text-neon-pink tracking-widest uppercase animate-pulse flex items-center justify-center gap-1.5">
                      <Flower2 size={13} className="animate-spin" style={{ animationDuration: '3s' }} /> DEVICE UNFOLDING Servo On
                    </span>
                    <p className="text-[10px] text-neutral-400 font-light">
                      Fibers activating remote physical gears and motor.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider block">
                      {isBlooming ? "ACTIVATING..." : "FLOWER DEVICE STANDBY"}
                    </span>
                    <p className="text-[9.5px] text-neutral-500 font-light">
                      Pulse glow matches active BPM. Transmit to actuate petals.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* PRINTER TICKET DISPENSER */}
            <div className="relative pt-2">
              
              {/* Slot line representation */}
              <div className="h-2 bg-neutral-900 rounded-lg relative z-20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-neutral-800">
                <div className="absolute top-1/2 left-3 right-3 h-[2px] bg-neutral-950 -translate-y-1/2" />
              </div>

              {/* TICKET DRAWER PREVIEW */}
              <AnimatePresence>
                {printedTicket && (
                  <motion.div
                    initial={{ y: -180, opacity: 0.3 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={isTearing ? { y: 250, opacity: 0, rotate: 5, filter: "blur(3px)" } : { y: -180, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 14 }}
                    className="relative z-10 mx-4 max-w-sm mt-[2px]"
                  >
                    {/* The Ticket Graphic itself */}
                    <div className="bg-white text-stone-950 font-mono text-[11px] p-6 rounded-b-xl shadow-2xl relative border-x border-b border-stone-200">
                      
                      {/* Thermal jagged edge top */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-[radial-gradient(circle,transparent_4px,#ffffff_4px)] bg-repeat-x bg-[length:12px_8px] -translate-y-1 z-30" />
                      
                      {/* Receipt Header details */}
                      <div className="text-center border-b border-stone-300 pb-4 space-y-1.5">
                        <div className="text-[14px] font-sans italic font-bold tracking-tight text-center">DREAM MEMORY LOG</div>
                        <div className="text-[9px] text-stone-500 uppercase tracking-widest leading-none">Multi-sensory Recipient Record</div>
                        <div className="text-[9.5px] text-stone-600 bg-stone-100 py-1 px-2.5 rounded inline-block mt-1">CODE: {printedTicket.vibe.split(" / ")[0]}</div>
                      </div>

                      {/* Content parameters */}
                      <div className="py-4 space-y-3.5 border-b border-dashed border-stone-300">
                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase tracking-wide">Logged Sync time</span>
                          <span className="font-bold text-stone-800">{printedTicket.timestamp} // 2026-05-21</span>
                        </div>

                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase tracking-wide">Sensory pulse</span>
                          <span className="font-bold text-stone-800 tracking-wide">{printedTicket.bpm} BPM / {currentEmotionLabel().titleZh}</span>
                        </div>

                        <div>
                          <span className="text-stone-400 block text-[9px] uppercase tracking-wide">Calibrated Palette Swatch / 共振色卡</span>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex border border-stone-200 rounded overflow-hidden shadow-xs shrink-0">
                              <span className="w-5.5 h-7 inline-block" style={{ backgroundColor: printedTicket.color }} title="Primary" />
                              <span className="w-5.5 h-7 inline-block opacity-75" style={{ backgroundColor: printedTicket.color }} title="Halftone 1" />
                              <span className="w-5.5 h-7 inline-block" style={{ backgroundColor: getSecondaryColor(printedTicket.color) }} title="Secondary" />
                              <span className="w-5.5 h-7 inline-block bg-stone-100 flex items-center justify-center font-mono text-[8px] text-stone-500 font-bold border-l border-stone-200">26</span>
                            </div>
                            <div className="leading-tight pl-1">
                              <span className="font-bold text-stone-800 font-mono text-[10px] uppercase block leading-none">{printedTicket.color}</span>
                              <span className="text-[8.5px] text-stone-400 block font-sans mt-0.5">Dual-wave spectral gradient</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-1.5 space-y-1 text-stone-800 font-sans leading-relaxed">
                          <span className="text-stone-400 block font-mono text-[9px] uppercase tracking-wide">Vocal Decoded narrative</span>
                          <p className="text-[11.5px] italic font-light">"{printedTicket.dreamText}"</p>
                          <p className="text-[10px] font-light text-stone-600 border-l border-stone-300 pl-2 mt-1">{printedTicket.dreamTextZh}</p>
                        </div>
                      </div>

                      {/* Receipt footer barcode representation */}
                      <div className="pt-4 text-center space-y-3">
                        <div className="flex justify-center items-center gap-0.5 h-10 w-44 mx-auto overflow-hidden">
                          {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6].map((w, idx) => (
                            <div key={idx} className="bg-stone-950 h-full" style={{ width: `${w * 0.7 + 1}px` }} />
                          ))}
                        </div>
                        <div className="text-[9px] text-stone-400 uppercase tracking-[0.2em]">DB-SYSTEMS-MESSENGER</div>
                      </div>

                      {/* Tear buttons overlay on hover */}
                      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-b-xl flex flex-col items-center justify-center p-4 text-white space-y-2 relative z-30">
                        <button
                          onClick={handleTearOff}
                          className="px-4 py-2 border border-white hover:bg-white hover:text-stone-950 font-bold uppercase text-[10px] tracking-widest rounded-full transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Scissors size={12} />
                          Tear off Ticket (撕下纸条)
                        </button>
                        <p className="text-[9.5px] text-stone-400 font-light text-center">Tear and save printed log into your dream archive desk drawer.</p>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* PERSISTED DRAWER ARCHIVES */}
            {archives.length > 0 && (
              <div className="bg-white/45 backdrop-blur-xl border border-white/60 p-5 rounded-[2rem] shadow-md space-y-3.5 mt-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-brand-muted uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><BookOpen size={12} /> Dream Ticket Archives</span>
                  <span>{archives.length} logged</span>
                </div>
                
                <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
                  {archives.map((a, idx) => (
                    <button
                      key={a.id}
                      onClick={() => { clickSound(); setViewingArchiveId(viewingArchiveId === a.id ? null : a.id); }}
                      className={`px-3 py-2 border rounded-xl text-[10.5px] font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${viewingArchiveId === a.id ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white/50 border-white hover:bg-white hover:shadow-xs'}`}
                    >
                      🎟️ Log {archives.length - idx}
                    </button>
                  ))}
                </div>

                {/* Expanded viewing of archive */}
                <AnimatePresence>
                  {viewingArchiveId !== null && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {(() => {
                        const arch = archives.find(x => x.id === viewingArchiveId);
                        if (!arch) return null;
                        return (
                          <div className="bg-white/70 border border-white p-4.5 rounded-2xl text-[12px] text-brand-text space-y-2 leading-relaxed">
                            <div className="flex justify-between items-center text-[10px] text-brand-muted uppercase font-mono pb-1 border-b border-brand-muted/10">
                              <span>Archive Details // {arch.timestamp}</span>
                              <span className="px-1.5 py-0.5 bg-brand-muted/10 rounded font-mono font-bold text-[9px]">{arch.bpm} BPM</span>
                            </div>
                            <p className="font-light italic text-brand-text">"{arch.dreamText}"</p>
                            <p className="text-[11px] text-brand-muted font-light">{arch.dreamTextZh}</p>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
