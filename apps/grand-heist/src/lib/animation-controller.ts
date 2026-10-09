import { gsap } from 'gsap';
import type { CellCoord, LineWinRoundEvent, ReelGrid } from '@grand-heist/contract';

export type WinTier = 'big' | 'mega' | 'epic';

export type AnimationControllerTargets = {
  reels: HTMLElement[];
  symbols: HTMLElement[][];
  totalWin?: HTMLElement;
  winScreen?: HTMLElement;
  winScreenAmount?: HTMLElement;
};

export type BigWinOptions = {
  amount: number;
  totalBet: number;
  formatAmount(amount: number): string;
  onAmount(amount: string): void;
  onTier(tier: WinTier): void;
};

const MIN_SPIN_MS = 900;
const START_STAGGER = 0.08;
const STOP_STAGGER = 0.16;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function timelineDone(timeline: gsap.core.Timeline): Promise<void> {
  return new Promise((resolve) => {
    timeline.eventCallback('onComplete', resolve);
  });
}

export class AnimationController {
  private targets: AnimationControllerTargets = { reels: [], symbols: [] };
  private timelines: gsap.core.Timeline[] = [];
  private spinStartedAt = 0;
  private skipCurrent: (() => void) | null = null;
  private bigWinSkip: (() => void) | null = null;

  setTargets(targets: Partial<AnimationControllerTargets>): void {
    this.targets = { ...this.targets, ...targets };
  }

  startSpin(): void {
    this.killActive();
    this.spinStartedAt = performance.now();

    this.targets.reels.forEach((reel, index) => {
      const timeline = gsap.timeline({ delay: index * START_STAGGER, repeat: -1 });
      timeline
        .to(reel, { y: -10, duration: 0.12, ease: 'power2.out' })
        .to(reel, { y: 36, filter: 'blur(0 10px)', duration: 0.18, ease: 'none' })
        .set(reel, { y: -36 })
        .to(reel, { y: 36, filter: 'blur(0 10px)', duration: 0.24, ease: 'none' });
      this.timelines.push(timeline);
    });
  }

  async stopSpin(onReveal: () => void): Promise<void> {
    await wait(Math.max(0, MIN_SPIN_MS - (performance.now() - this.spinStartedAt)));
    this.killActive();
    onReveal();

    const timeline = gsap.timeline();
    this.targets.reels.forEach((reel, index) => {
      timeline.fromTo(
        reel,
        { y: -24, filter: 'blur(0 8px)' },
        { y: 0, filter: 'blur(0 0)', duration: 0.15, ease: 'back.out(1.8)' },
        index * STOP_STAGGER,
      );
      timeline.to(reel, { y: 10, duration: 0.08, ease: 'power1.out' }, index * STOP_STAGGER + 0.02);
      timeline.to(reel, { y: 0, duration: 0.15, ease: 'back.out(1.8)' }, index * STOP_STAGGER + 0.1);
    });

    this.timelines.push(timeline);
    await timelineDone(timeline);
  }

  async playLineWins(lineWins: readonly LineWinRoundEvent[], showLine: (lineWin: LineWinRoundEvent | null) => void): Promise<void> {
    if (lineWins.length === 0) return;

    let skipped = false;
    this.skipCurrent = () => {
      skipped = true;
      this.killActive();
    };

    for (const lineWin of lineWins) {
      if (skipped) break;
      showLine(lineWin);
      const symbols = this.symbolsForCells(lineWin.cells);
      const timeline = gsap.timeline({ repeat: 2 });
      timeline.to(symbols, { scale: 1.12, duration: 0.2, ease: 'power2.out' });
      timeline.to(symbols, { scale: 1, duration: 0.2, ease: 'power2.in' });
      this.timelines.push(timeline);
      await Promise.race([timelineDone(timeline), wait(1200)]);
    }

    if (skipped) {
      showLine(null);
    }

    this.skipCurrent = null;
  }

  async countPanelWin(from: number, to: number, onUpdate: (value: number) => void): Promise<void> {
    const counter = { value: from };
    const timeline = gsap.timeline();
    timeline.to(counter, {
      value: to,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => onUpdate(Math.round(counter.value)),
    });
    if (this.targets.totalWin) {
      timeline.fromTo(this.targets.totalWin, { scale: 1 }, { scale: 1.08, yoyo: true, repeat: 1, duration: 0.18 }, 0);
    }

    this.skipCurrent = () => {
      timeline.progress(1);
      onUpdate(to);
    };
    this.timelines.push(timeline);
    await timelineDone(timeline);
    this.skipCurrent = null;
  }

  async playBigWin(options: BigWinOptions): Promise<void> {
    const tiers: Array<{ tier: WinTier; threshold: number; duration: number }> = [
      { tier: 'big', threshold: 20, duration: 3 },
      { tier: 'mega', threshold: 40, duration: 5 },
      { tier: 'epic', threshold: 80, duration: 8 },
    ];
    const finalMultiplier = options.amount / 100 / options.totalBet;
    const reached = tiers.filter((tier) => finalMultiplier >= tier.threshold);
    const finalTier = reached[reached.length - 1];
    if (!finalTier) return;

    options.onTier(reached[0].tier);

    const counter = { value: 0 };
    const timeline = gsap.timeline();
    timeline.to(counter, {
      value: options.amount,
      duration: finalTier.duration,
      ease: 'power2.out',
      onUpdate: () => {
        const currentAmount = Math.round(counter.value);
        const currentMultiplier = currentAmount / 100 / options.totalBet;
        let currentTier: WinTier | undefined;
        for (const tier of reached) {
          if (currentMultiplier >= tier.threshold) currentTier = tier.tier;
        }
        if (currentTier) options.onTier(currentTier);
        options.onAmount(options.formatAmount(currentAmount));
      },
    });
    if (this.targets.winScreen) {
      timeline.fromTo(this.targets.winScreen, { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0);
      timeline.to(this.targets.winScreen, { filter: 'brightness(1.7)', yoyo: true, repeat: 1, duration: 0.12 }, 0.2);
    }

    let closeRequested = false;
    this.bigWinSkip = () => {
      if (timeline.progress() < 1) {
        timeline.progress(1);
        options.onAmount(options.formatAmount(options.amount));
        options.onTier(finalTier.tier);
        return;
      }

      closeRequested = true;
    };

    this.timelines.push(timeline);
    await timelineDone(timeline);
    while (!closeRequested) await wait(50);
    this.bigWinSkip = null;
  }

  skip(): boolean {
    if (this.bigWinSkip) {
      this.bigWinSkip();
      return true;
    }

    if (this.skipCurrent) {
      this.skipCurrent();
      return true;
    }

    return false;
  }

  destroy(): void {
    this.killActive();
  }

  private killActive(): void {
    this.timelines.forEach((timeline) => timeline.kill());
    this.timelines = [];
    const symbols: HTMLElement[] = [];
    for (const reel of this.targets.symbols) {
      for (const symbol of reel) symbols.push(symbol);
    }
    gsap.set([...this.targets.reels, ...symbols], { clearProps: 'transform,filter' });
  }

  private symbolsForCells(cells: readonly CellCoord[]): HTMLElement[] {
    const symbols: HTMLElement[] = [];
    for (const cell of cells) {
      const symbol = this.targets.symbols[cell.reel]?.[cell.row];
      if (symbol) symbols.push(symbol);
    }
    return symbols;
  }
}
