import React from 'react';
import { FadeIn } from './FadeIn';
import { motion } from 'motion/react';
import { soundManager } from '../lib/sound';
import { 
  Compass, 
  Activity, 
  Layers, 
  Cpu, 
  Flower2, 
  Settings, 
  MessageSquare, 
  Sparkles, 
  HeartPulse, 
  ArrowRight,
  CircleDot
} from 'lucide-react';

interface MapNode {
  id: string;
  index: string;
  icon: React.ComponentType<any>;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  colorClass: string;
  shadowClass: string;
  badge?: string;
}

const MAP_NODES: MapNode[] = [
  {
    id: "chapter-one-background",
    index: "01",
    icon: Compass,
    titleEn: "Background & Challenge",
    titleZh: "项目背景与现实痛点",
    descEn: "Exploring physical isolation in long-distance relationships and emotional barriers.",
    descZh: "深度洞悉异地伴侣日常中的空间隔离、情绪表达迟钝及触觉缺失交互痛点。",
    colorClass: "text-[#FF5FA2]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(255,95,162,0.2)] hover:border-[#FF5FA2]/40"
  },
  {
    id: "chapter-one-research",
    index: "02",
    icon: Activity,
    titleEn: "Multi-sensory Research",
    titleZh: "学术论证与述梦图谱",
    descEn: "Analyzing dream recounts: colors, environments, and their physiological mappings.",
    descZh: "述梦过程的多维量化分析：探索心率起伏如何与梦境色彩和深空场景达成逻辑契合。",
    colorClass: "text-[#8BE8FF]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(139,232,255,0.2)] hover:border-[#8BE8FF]/40"
  },
  {
    id: "chapter-one-design",
    index: "03",
    icon: Layers,
    titleEn: "Concept & Modules",
    titleZh: "设计理念与三大模块",
    descEn: "The union of voice narrative decoded, tactile heart rates, and generative AI scenes.",
    descZh: "声音解密、心搏同步追踪、人工智能抽象星云织造：构建跨越次元的多维信息岛。",
    colorClass: "text-[#A978FF]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(169,120,255,0.2)] hover:border-[#A978FF]/40"
  },
  {
    id: "chapter-one-flow",
    index: "04",
    icon: Cpu,
    titleEn: "Interaction Journey Map",
    titleZh: "交互步骤与用户链路",
    descEn: "Step-by-step user behavior sequences tracking dream input to remote bloom response.",
    descZh: "用户心流历程全图：步步为营记录用户录音、测速、握紧情绪晶体和看花舒展的过程。",
    colorClass: "text-[#FF3F9E]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(255,63,158,0.2)] hover:border-[#FF3F9E]/40"
  },
  {
    id: "chapter-one-interactive-section",
    index: "05",
    icon: Flower2,
    titleEn: "Live Simulation Console",
    titleZh: "梦绽互动体验核 (仿真舱)",
    descEn: "Recount details, select warm colors, transmit bio-pulses, and actuate the hardware flower.",
    descZh: "交互主控台：模拟心率、述梦、录制并发送，触发远方花瓣折纸伺服器舒张开花！",
    colorClass: "text-[#FF5FA2]",
    shadowClass: "shadow-[0_0_20px_rgba(255,95,162,0.15)] hover:shadow-[0_0_35px_rgba(255,95,162,0.4)] border-[#FF5FA2]/40 bg-neutral-900/10",
    badge: "Interactive Core"
  },
  {
    id: "chapter-one-prototype",
    index: "06",
    icon: Settings,
    titleEn: "Physical Prototype",
    titleZh: "硬件外壳与技术总成",
    descEn: "Exquisite CAD layout specs, mechanical petals, custom printers, and sensory shell assembly.",
    descZh: "精密图纸、伺服电机轴组、热敏卷纸出单舱以及外壳工艺微细雕琢实景。",
    colorClass: "text-[#8BE8FF]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(139,232,255,0.2)] hover:border-[#8BE8FF]/40"
  },
  {
    id: "chapter-one-testing",
    index: "07",
    icon: MessageSquare,
    titleEn: "User Experiment Wall",
    titleZh: "主观可用性测试评价",
    descEn: "In-depth qualitative tests with real distant lovers showing significant bonding improvements.",
    descZh: "真实分居两地的情侣定性实验墙：显著提振伴侣安全感、降低孤独感与回弹亲和指数。",
    colorClass: "text-[#A978FF]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(169,120,255,0.2)] hover:border-[#A978FF]/40"
  },
  {
    id: "chapter-one-outcome",
    index: "08",
    icon: Sparkles,
    titleEn: "Final Design Gallery",
    titleZh: "成品最终摄影与场景图",
    descEn: "Indulge in studio-graded high-fidelity photos of the physical flower and printed bills.",
    descZh: "高保真棚拍场景组图：实物置于书桌、床边伴随夜光微弱斑斓的真实艺术摄影。",
    colorClass: "text-[#FF3F9E]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(255,63,158,0.2)] hover:border-[#FF3F9E]/40"
  },
  {
    id: "chapter-one-reflection",
    index: "09",
    icon: HeartPulse,
    titleEn: "Reflection & Multi-Live Vision",
    titleZh: "设计反思与双向多端拓展",
    descEn: "Privacy frameworks, massive dream registries, and bilateral actuators evolution blueprint.",
    descZh: "前瞻云端梦史、双向开合触感回路等全息物联网（IoT）多重伴侣拓展蓝图。",
    colorClass: "text-[#8BE8FF]",
    shadowClass: "hover:shadow-[0_0_25px_rgba(139,232,255,0.2)] hover:border-[#8BE8FF]/40"
  }
];

export function ChapterOneOverview() {
  const handleScrollToNode = (id: string) => {
    soundManager.init();
    soundManager.playClick();
    
    const element = document.getElementById(id);
    if (element) {
      // Offset a bit down to account for floating chapter header
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 relative z-10 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 my-12 shadow-[0_12px_40px_rgba(205,183,246,0.1)]">
      {/* Background soft gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
        <div className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-soft-cyan/30 blur-[80px]" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-neon-pink/30 blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-neon-pink/10 to-glow-purple/10 border border-glow-purple/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-glow-purple mb-4 uppercase">
            <CircleDot size={10} className="text-neon-pink animate-pulse" /> Active Navigation Hub
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-brand-text mb-4">
            Chapter 1 Map & Index
          </h3>
          <p className="text-sm md:text-base text-brand-muted font-light max-w-3xl mx-auto leading-relaxed">
            Quickly preview or teleport to any module of the "Bloom" prototype journey. Select a visual card below to navigate directly to its design documentation, user evaluations, or play the interactive console.
            <br />
            <span className="text-[12px] opacity-85 mt-2.5 block text-brand-muted/90">
              极速传送导览：多级联动，点击磁贴卡片后即可无缝滚动至学术机制、交互链路或交互体验舱。
            </span>
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MAP_NODES.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.id}
                onClick={() => handleScrollToNode(node.id)}
                onMouseEnter={soundManager.playHover}
                className={`p-6 rounded-[2rem] border bg-white/50 backdrop-blur-lg flex flex-col justify-between transition-all duration-300 relative cursor-pointer group hover:-translate-y-2 select-none ${node.shadowClass}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Floating Index Node Background */}
                <div className="absolute top-4 right-6 text-4xl lg:text-5xl font-serif font-black italic text-brand-muted/5 group-hover:text-brand-muted/12 transition-colors duration-300 select-none pointer-events-none">
                  {node.index}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center ${node.colorClass}`}>
                      <Icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {node.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-neon-pink/15 text-neon-pink border border-neon-pink/20 animate-pulse">
                        {node.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-base font-serif italic text-brand-text flex items-center gap-1 group-hover:text-glow-purple transition-colors duration-300">
                      {node.titleEn}
                    </h4>
                    <p className="text-[11px] font-mono text-brand-muted font-light uppercase tracking-wider">
                      {node.titleZh}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-brand-muted/10">
                    <p className="text-[12.5px] leading-relaxed text-brand-muted font-light">
                      {node.descEn}
                    </p>
                    <p className="text-[11px] leading-relaxed text-brand-muted/80 font-light border-l border-glow-purple/20 pl-2">
                      {node.descZh}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex justify-end items-center text-[10px] font-bold text-brand-muted/65 group-hover:text-[#A978FF] transition-all duration-300 gap-1 uppercase tracking-widest mt-auto">
                  <span>Explore Module</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
