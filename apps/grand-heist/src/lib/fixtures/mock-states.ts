import type { CellCoord, MockVisualState, ReelGrid, VerticalWildEvent } from '@grand-heist/contract';

const allRows = [0, 1, 2, 3, 4] as const;

const readyReels = [
  ['driver', 'club', 'sportsCar', 'heart', 'cashStacks'],
  ['spade', 'burnerPhone', 'flamingo', 'diamond', 'driver'],
  ['cashStacks', 'heart', 'sportsCar', 'club', 'burnerPhone'],
  ['diamond', 'driver', 'spade', 'cashStacks', 'flamingo'],
  ['sportsCar', 'flamingo', 'club', 'burnerPhone', 'heart'],
] as const satisfies ReelGrid;

const lossReels = [
  ['club', 'driver', 'spade', 'cashStacks', 'heart'],
  ['flamingo', 'diamond', 'burnerPhone', 'sportsCar', 'club'],
  ['cashStacks', 'heart', 'driver', 'spade', 'diamond'],
  ['burnerPhone', 'sportsCar', 'club', 'flamingo', 'cashStacks'],
  ['heart', 'spade', 'flamingo', 'diamond', 'sportsCar'],
] as const satisfies ReelGrid;

const lineWinReels = [
  ['sportsCar', 'club', 'driver', 'heart', 'cashStacks'],
  ['sportsCar', 'burnerPhone', 'flamingo', 'diamond', 'driver'],
  ['sportsCar', 'heart', 'cashStacks', 'club', 'burnerPhone'],
  ['diamond', 'driver', 'spade', 'cashStacks', 'flamingo'],
  ['club', 'flamingo', 'sportsCar', 'burnerPhone', 'heart'],
] as const satisfies ReelGrid;

const bigWinReels = [
  ['cashStacks', 'driver', 'spade', 'heart', 'club'],
  ['cashStacks', 'diamond', 'burnerPhone', 'sportsCar', 'flamingo'],
  ['cashStacks', 'heart', 'driver', 'spade', 'diamond'],
  ['cashStacks', 'sportsCar', 'club', 'flamingo', 'burnerPhone'],
  ['heart', 'spade', 'flamingo', 'diamond', 'sportsCar'],
] as const satisfies ReelGrid;

const scatterTriggerReels = [
  ['scatter', 'driver', 'spade', 'cashStacks', 'heart'],
  ['flamingo', 'diamond', 'burnerPhone', 'sportsCar', 'club'],
  ['cashStacks', 'scatter', 'driver', 'spade', 'diamond'],
  ['burnerPhone', 'sportsCar', 'club', 'scatter', 'cashStacks'],
  ['heart', 'spade', 'flamingo', 'diamond', 'sportsCar'],
] as const satisfies ReelGrid;

const copChaseReels = [
  ['driver', 'club', 'sportsCar', 'heart', 'cashStacks'],
  ['cop', 'cop', 'cop', 'cop', 'cop'],
  ['cashStacks', 'heart', 'sportsCar', 'club', 'burnerPhone'],
  ['diamond', 'driver', 'spade', 'cashStacks', 'flamingo'],
  ['sportsCar', 'flamingo', 'club', 'burnerPhone', 'heart'],
] as const satisfies ReelGrid;

const gangChaseReels = [
  ['driver', 'club', 'sportsCar', 'heart', 'cashStacks'],
  ['spade', 'burnerPhone', 'flamingo', 'diamond', 'driver'],
  ['gang', 'gang', 'gang', 'gang', 'gang'],
  ['diamond', 'driver', 'spade', 'cashStacks', 'flamingo'],
  ['sportsCar', 'flamingo', 'club', 'burnerPhone', 'heart'],
] as const satisfies ReelGrid;

const freeSpinsReels = [
  ['wild', 'club', 'sportsCar', 'heart', 'cashStacks'],
  ['spade', 'burnerPhone', 'scatter', 'diamond', 'driver'],
  ['cashStacks', 'heart', 'wild', 'club', 'burnerPhone'],
  ['diamond', 'driver', 'spade', 'cashStacks', 'flamingo'],
  ['sportsCar', 'flamingo', 'club', 'burnerPhone', 'heart'],
] as const satisfies ReelGrid;

const vaultReels = [
  ['wild', 'cashStacks', 'sportsCar', 'heart', 'driver'],
  ['cashStacks', 'wild', 'flamingo', 'diamond', 'sportsCar'],
  ['driver', 'cashStacks', 'wild', 'club', 'burnerPhone'],
  ['diamond', 'driver', 'cashStacks', 'wild', 'flamingo'],
  ['sportsCar', 'flamingo', 'driver', 'burnerPhone', 'wild'],
] as const satisfies ReelGrid;

const lineTop: CellCoord[] = [
  { reel: 0, row: 0 },
  { reel: 1, row: 0 },
  { reel: 2, row: 0 },
];

const fourOfKind: CellCoord[] = [
  { reel: 0, row: 0 },
  { reel: 1, row: 0 },
  { reel: 2, row: 0 },
  { reel: 3, row: 0 },
];

const scatterCells: CellCoord[] = [
  { reel: 0, row: 0 },
  { reel: 2, row: 1 },
  { reel: 3, row: 3 },
];

const copChase: VerticalWildEvent = {
  kind: 'cop',
  reel: 1,
  multiplier: 3,
  label: 'COP x3',
  rows: allRows,
};

const gangLevel = (level: 1 | 2 | 3, multiplier: number): VerticalWildEvent => ({
  kind: 'gang',
  reel: 2,
  level,
  multiplier,
  label: `GANG L${level} x${multiplier}`,
  rows: allRows,
});

export const MOCK_VISUAL_STATES = {
  ready: {
    id: 'ready',
    label: 'Ready',
    status: 'ready',
    scene: 'base',
    reels: readyReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 0,
    balance: 1240,
    currency: 'USD',
    message: 'Ready',
    detail: 'Crew staged for the next score.',
  },
  loss: {
    id: 'loss',
    label: 'Loss',
    status: 'loss',
    scene: 'base',
    reels: lossReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 0,
    balance: 1238,
    currency: 'USD',
    message: 'No Win',
    detail: 'The streets go quiet this spin.',
  },
  lineWin: {
    id: 'lineWin',
    label: 'Line Win',
    status: 'lineWin',
    scene: 'base',
    reels: lineWinReels,
    highlightedCells: lineTop,
    scatterCells: [],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 4,
    balance: 1246,
    currency: 'USD',
    message: 'Line Win',
    detail: 'Clean hit across the top line.',
  },
  bigWin: {
    id: 'bigWin',
    label: 'Big Win',
    status: 'bigWin',
    scene: 'base',
    reels: bigWinReels,
    highlightedCells: fourOfKind,
    scatterCells: [],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 25,
    balance: 1290,
    currency: 'USD',
    message: 'Big Win',
    detail: 'Cash stacks connect for a bigger haul.',
  },
  scatterTrigger: {
    id: 'scatterTrigger',
    label: 'Scatter Trigger',
    status: 'scatterTrigger',
    scene: 'base',
    reels: scatterTriggerReels,
    highlightedCells: scatterCells,
    scatterCells,
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 0,
    balance: 1238,
    currency: 'USD',
    message: 'Free Spins Trigger',
    detail: 'Three FS symbols light the route.',
  },
  copChase: {
    id: 'copChase',
    label: 'COP Chase',
    status: 'copChase',
    scene: 'base',
    reels: copChaseReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [copChase],
    totalBet: 2,
    winMultiplier: 12,
    balance: 1262,
    currency: 'USD',
    message: 'COP Chase',
    detail: 'Police pressure turns a full reel wild.',
  },
  gangChaseLevel1: {
    id: 'gangChaseLevel1',
    label: 'GANG Level 1',
    status: 'gangChase',
    scene: 'base',
    reels: gangChaseReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [gangLevel(1, 2)],
    totalBet: 2,
    winMultiplier: 8,
    balance: 1254,
    currency: 'USD',
    message: 'GANG Chase',
    detail: 'Crew van locks the first chase level.',
  },
  gangChaseLevel2: {
    id: 'gangChaseLevel2',
    label: 'GANG Level 2',
    status: 'gangChase',
    scene: 'base',
    reels: gangChaseReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [gangLevel(2, 5)],
    totalBet: 2,
    winMultiplier: 18,
    balance: 1274,
    currency: 'USD',
    message: 'GANG Chase',
    detail: 'The chase climbs and the multiplier grows.',
  },
  gangChaseLevel3: {
    id: 'gangChaseLevel3',
    label: 'GANG Level 3',
    status: 'gangChase',
    scene: 'base',
    reels: gangChaseReels,
    highlightedCells: [],
    scatterCells: [],
    verticalWilds: [gangLevel(3, 10)],
    totalBet: 2,
    winMultiplier: 42,
    balance: 1322,
    currency: 'USD',
    message: 'GANG Chase',
    detail: 'Final chase level with the strongest column.',
  },
  freeSpins: {
    id: 'freeSpins',
    label: 'Free Spins',
    status: 'freeSpins',
    scene: 'freeSpins',
    reels: freeSpinsReels,
    highlightedCells: [
      { reel: 0, row: 0 },
      { reel: 2, row: 2 },
    ],
    scatterCells: [{ reel: 1, row: 2 }],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 16,
    balance: 1270,
    currency: 'USD',
    message: 'Night Miami',
    detail: 'Night mode takes over the reels.',
  },
  vault: {
    id: 'vault',
    label: 'Vault Breaker',
    status: 'vault',
    scene: 'vault',
    reels: vaultReels,
    highlightedCells: [
      { reel: 0, row: 0 },
      { reel: 1, row: 1 },
      { reel: 2, row: 2 },
      { reel: 3, row: 3 },
      { reel: 4, row: 4 },
    ],
    scatterCells: [],
    verticalWilds: [],
    totalBet: 2,
    winMultiplier: 100,
    balance: 1440,
    currency: 'USD',
    message: 'The Big Score',
    detail: 'The vault opens for The Big Score.',
  },
} as const satisfies Record<string, MockVisualState>;

export type MockStateId = keyof typeof MOCK_VISUAL_STATES;

export const MOCK_STATE_IDS = Object.keys(MOCK_VISUAL_STATES) as MockStateId[];

export function isMockStateId(value: string | null): value is MockStateId {
  return value !== null && value in MOCK_VISUAL_STATES;
}
