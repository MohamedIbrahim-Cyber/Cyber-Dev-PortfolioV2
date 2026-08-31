// Web Audio API Retro 8-Bit Synthesizer

class ChiptuneAudioEngine {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmIntervalId: number | null = null;
  private chargeOsc: OscillatorNode | null = null;
  private chargeGain: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Start rising pitch charge hum
  startChargeHum() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.stopChargeHum();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 1.5);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      this.chargeOsc = osc;
      this.chargeGain = gain;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Stop charge hum
  stopChargeHum() {
    if (this.chargeOsc) {
      try {
        this.chargeOsc.stop();
        this.chargeOsc.disconnect();
      } catch {}
      this.chargeOsc = null;
    }
    if (this.chargeGain) {
      try {
        this.chargeGain.disconnect();
      } catch {}
      this.chargeGain = null;
    }
  }

  // Play Level-Up completion fanfare
  playLevelUpFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopChargeHum();
    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0, dur: 0.1 },    // C5
      { freq: 659.25, time: 0.1, dur: 0.1 },  // E5
      { freq: 783.99, time: 0.2, dur: 0.1 },  // G5
      { freq: 1046.50, time: 0.3, dur: 0.35 }, // C6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + time);

      gain.gain.setValueAtTime(0.12, now + time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + time);
      osc.stop(now + time + dur);
    });
  }

  // Play retro laser SFX
  playLaser() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(990, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Play powerup / coin SFX
  playPowerup() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now); // B5
    osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Play glitch sound
  playGlitch() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.setValueAtTime(850, now + 0.04);
    osc.frequency.setValueAtTime(150, now + 0.08);
    osc.frequency.setValueAtTime(1200, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Toggle 8-bit BGM theme
  toggleBgm(onStateChange?: (playing: boolean) => void) {
    if (this.isBgmPlaying) {
      this.stopBgm();
      onStateChange?.(false);
    } else {
      this.startBgm();
      onStateChange?.(true);
    }
  }

  // Start 8-bit cyber chiptune loop
  startBgm() {
    const ctx = this.getContext();
    if (!ctx) return;

    this.stopBgm();
    this.isBgmPlaying = true;

    // Melody note frequencies
    const melody = [
      440.00, 440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 523.25,
      440.00, 440.00, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88,
      392.00, 392.00, 493.88, 587.33, 523.25, 493.88, 440.00, 392.00,
      440.00, 523.25, 659.25, 880.00, 783.99, 659.25, 587.33, 523.25,
    ];

    let noteIdx = 0;
    const stepDuration = 140; // ms per 16th note

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const t = this.ctx.currentTime;
      const freq = melody[noteIdx % melody.length];

      // Lead square voice
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);

      // Bass triangle voice (every 2 notes)
      if (noteIdx % 2 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(freq / 4, t);

        bassGain.gain.setValueAtTime(0.08, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        bassOsc.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        bassOsc.start(t);
        bassOsc.stop(t + 0.2);
      }

      noteIdx++;
    };

    playStep();
    this.bgmIntervalId = window.setInterval(playStep, stepDuration);
  }

  // Stop 8-bit BGM
  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      window.clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  // Clean up all resources
  cleanup() {
    this.stopChargeHum();
    this.stopBgm();
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }
}

export const chiptuneAudio = new ChiptuneAudioEngine();
