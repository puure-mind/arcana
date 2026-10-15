import type { RoundEvent, RoundResult } from '@grand-heist/contract';

export type KnownRoundEventType = 'reveal' | 'lineWin' | 'totalWin';

export type RoundEventHandler = (event: RoundEvent, signal: AbortSignal) => Promise<void> | void;

export type RoundPlayerAdapter = Partial<Record<KnownRoundEventType, RoundEventHandler>>;

export type RoundPlayerState = 'idle' | 'playing';

export class RoundPlayer {
  private controller: AbortController | null = null;
  private state: RoundPlayerState = 'idle';

  constructor(private readonly adapter: RoundPlayerAdapter) {}

  get isPlaying(): boolean {
    return this.state === 'playing';
  }

  skipCurrentEvent(): void {
    this.controller?.abort();
  }

  async play(round: RoundResult): Promise<void> {
    if (this.isPlaying) {
      throw new Error('Round is already playing');
    }

    this.state = 'playing';

    try {
      for (const event of round.events) {
        const handler = this.handlerFor(event);
        if (!handler) continue;

        this.controller = new AbortController();

        try {
          await handler(event, this.controller.signal);
        } catch (error) {
          if (!this.controller.signal.aborted) throw error;
        } finally {
          this.controller = null;
        }
      }
    } finally {
      this.controller = null;
      this.state = 'idle';
    }
  }

  private handlerFor(event: RoundEvent): RoundEventHandler | undefined {
    if (event.type === 'reveal' || event.type === 'lineWin' || event.type === 'totalWin') {
      return this.adapter[event.type];
    }

    return undefined;
  }
}

export async function collectRoundEventTypes(round: RoundResult): Promise<string[]> {
  const eventTypes: string[] = [];
  const player = new RoundPlayer({
    reveal(event) {
      eventTypes.push(event.type);
    },
    lineWin(event) {
      eventTypes.push(event.type);
    },
    totalWin(event) {
      eventTypes.push(event.type);
    },
  });

  await player.play(round);
  return eventTypes;
}

export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) return Promise.resolve();

  return new Promise((resolve) => {
    const timeout = window.setTimeout(resolve, ms);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeout);
        resolve();
      },
      { once: true },
    );
  });
}
