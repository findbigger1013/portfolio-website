export class SoundManager {
  audioCtx: AudioContext | null = null;
  enabled = false;
  lastHoverTime = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dreamBloomSound');
      if (saved === 'enabled') {
        this.enabled = true;
      }
    }
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('dreamBloomSound', this.enabled ? 'enabled' : 'disabled');
    if (this.enabled) {
      this.init();
      this.playClick();
    }
  }

  private playTone(frequency: number, type: OscillatorType, duration: number, vol = 0.1) {
    if (!this.enabled || !this.audioCtx) return;

    try {
      const oscillator = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      oscillator.start();
      oscillator.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playClick = () => {
    this.init();
    this.playTone(800, 'sine', 0.1, 0.08);
    setTimeout(() => this.playTone(1200, 'sine', 0.15, 0.05), 50);
  }

  playHover = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(400, 'sine', 0.05, 0.02);
  }

  playSparkle = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(1500, 'sine', 0.1, 0.02);
    setTimeout(() => this.playTone(2000, 'sine', 0.2, 0.02), 80);
    setTimeout(() => this.playTone(2500, 'sine', 0.3, 0.01), 160);
  }

  playBloom = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 200) return;
    this.lastHoverTime = now;
    this.playTone(523.25, 'sine', 0.3, 0.04);
    setTimeout(() => this.playTone(659.25, 'sine', 0.4, 0.04), 100);
    setTimeout(() => this.playTone(783.99, 'sine', 0.5, 0.03), 250);
  }

  playPulse = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 200) return;
    this.lastHoverTime = now;
    this.playTone(200, 'sine', 0.3, 0.06);
    setTimeout(() => this.playTone(200, 'sine', 0.3, 0.04), 250);
  }

  playSwipe = () => {
    this.init();
    this.playTone(300, 'triangle', 0.2, 0.03);
    setTimeout(() => this.playTone(400, 'triangle', 0.2, 0.02), 100);
  }

  playDreamyBell = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(880, 'sine', 0.4, 0.04);
  }

  playWave = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(300, 'sine', 0.1, 0.03);
    setTimeout(() => this.playTone(350, 'sine', 0.2, 0.03), 50);
  }

  playPaper = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(150, 'square', 0.05, 0.01);
  }

  playMessage = () => {
    this.init();
    const now = Date.now();
    if (now - this.lastHoverTime < 100) return;
    this.lastHoverTime = now;
    this.playTone(600, 'sine', 0.1, 0.03);
    setTimeout(() => this.playTone(800, 'sine', 0.15, 0.03), 100);
  }
}

export const soundManager = new SoundManager();
