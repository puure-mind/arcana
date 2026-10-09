import type {
  LineWinRoundEvent,
  LocalGameClient,
  MockVisualState,
  RevealRoundEvent,
  RoundEvent,
  RoundResult,
  TotalWinRoundEvent,
} from '@grand-heist/contract';
import {
  MOCK_VISUAL_STATES,
  type MockStateId,
  isMockStateId,
} from '../fixtures/mock-states.js';

export function createLocalGameClient(initialStateId: MockStateId = 'ready'): LocalGameClient {
  let currentStateId: MockStateId = initialStateId;

  function normalizeStateId(id: string | undefined): MockStateId {
    const candidate = id ?? null;
    return isMockStateId(candidate) ? candidate : currentStateId;
  }

  function isRevealEvent(event: RoundEvent): event is RevealRoundEvent {
    return event.type === 'reveal' && 'reels' in event;
  }

  function isLineWinEvent(event: RoundEvent): event is LineWinRoundEvent {
    return event.type === 'lineWin' && 'cells' in event;
  }

  function isTotalWinEvent(event: RoundEvent): event is TotalWinRoundEvent {
    return event.type === 'totalWin' && typeof event.amount === 'number';
  }

  function totalWinAmount(events: readonly RoundEvent[]): number {
    for (let index = events.length - 1; index >= 0; index -= 1) {
      const event = events[index];
      if (isTotalWinEvent(event)) return event.amount;
    }

    return 0;
  }

  function finalStateForEvents(events: readonly RoundEvent[]): MockVisualState {
    const state: MockVisualState = {
      ...MOCK_VISUAL_STATES[currentStateId],
      id: 'api-play',
      label: 'API Play',
      highlightedCells: [],
      scatterCells: [],
      verticalWilds: [],
      message: 'No Win',
      detail: 'No winning combinations.',
    };

    for (const event of events) {
      if (isTotalWinEvent(event)) break;

      if (isRevealEvent(event)) {
        state.reels = event.reels;
        state.highlightedCells = [];
        state.scatterCells = [];
        state.verticalWilds = [];
        state.status = 'ready';
        state.message = 'Revealed';
        state.detail = 'Reels stopped.';
      }

      if (isLineWinEvent(event)) {
        state.highlightedCells = event.cells;
        state.status = 'lineWin';
        state.message = 'Line Win';
        state.detail = `Line ${event.line} pays.`;
      }
    }

    const totalWin = totalWinAmount(events);
    state.winMultiplier = totalWin / 100 / state.totalBet;

    if (totalWin <= 0) {
      state.status = 'loss';
      state.message = 'No Win';
      state.detail = 'No winning combinations.';
    }

    return state;
  }

  function roundFromEvents(events: readonly RoundEvent[]): RoundResult {
    return {
      id: 'api-play',
      events,
      finalState: finalStateForEvents(events),
    };
  }

  return {
    kind: 'local-mock',
    getState() {
      return MOCK_VISUAL_STATES[currentStateId];
    },
    selectState(id: string) {
      if (isMockStateId(id)) {
        currentStateId = id;
      }

      return MOCK_VISUAL_STATES[currentStateId];
    },
    async play(request) {
      const response = await fetch('/api/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ betAmount: request?.betAmount }),
      });

      if (!response.ok) {
        throw new Error(`Play request failed with status ${response.status}`);
      }

      return roundFromEvents((await response.json()) as RoundEvent[]);
    },
  };
}
