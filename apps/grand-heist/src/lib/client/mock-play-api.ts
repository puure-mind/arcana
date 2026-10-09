import type { RoundEvent } from '@grand-heist/contract';
import { MOCK_ROUNDS, MOCK_STATE_IDS } from '../fixtures/mock-states.js';

type PlayRequestBody = {
  betAmount?: number;
};

const PLAY_API_PATH = '/api/play';

let nextRoundIndex = 0;
let isInstalled = false;

function isPlayApiRequest(input: RequestInfo | URL, init?: RequestInit): boolean {
  const method = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase();
  const url = typeof input === 'string' || input instanceof URL ? new URL(input, window.location.href) : new URL(input.url);

  return method === 'POST' && url.pathname === PLAY_API_PATH;
}

async function parsePlayRequestBody(input: RequestInfo | URL, init?: RequestInit): Promise<PlayRequestBody> {
  const rawBody = init?.body ?? (input instanceof Request ? await input.clone().text() : undefined);

  if (typeof rawBody !== 'string' || rawBody.length === 0) return {};

  try {
    return JSON.parse(rawBody) as PlayRequestBody;
  } catch {
    return {};
  }
}

function nextMockRoundEvents(): readonly RoundEvent[] {
  const playableIds = MOCK_STATE_IDS.filter((id) => id !== 'ready');
  const id = playableIds[nextRoundIndex % playableIds.length] ?? 'loss';
  nextRoundIndex += 1;
  console.debug("/api/play response:", MOCK_ROUNDS[id].events);
  return MOCK_ROUNDS[id].events;
}

export function installMockPlayApi(): void {
  if (isInstalled) return;
  isInstalled = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    if (!isPlayApiRequest(input, init)) {
      return originalFetch(input, init);
    }

    await parsePlayRequestBody(input, init);

    return Response.json(nextMockRoundEvents());
  };
}
