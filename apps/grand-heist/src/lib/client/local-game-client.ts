import type { LocalGameClient, MockVisualState } from '@grand-heist/contract';
import { MOCK_VISUAL_STATES, type MockStateId, isMockStateId } from '../fixtures/mock-states.js';

export function createLocalGameClient(initialStateId: MockStateId = 'ready'): LocalGameClient {
  let currentStateId: MockStateId = initialStateId;

  function normalizeStateId(id: string | undefined): MockStateId {
    const candidate = id ?? null;
    return isMockStateId(candidate) ? candidate : currentStateId;
  }

  function stateFor(id: string | undefined): MockVisualState {
    return MOCK_VISUAL_STATES[normalizeStateId(id)];
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
      const nextState = stateFor(request?.mockStateId);
      currentStateId = nextState.id as MockStateId;
      return nextState;
    },
  };
}
