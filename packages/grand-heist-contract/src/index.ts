export const GAME_ID = 'grand_heist';
export const GAME_SLUG = 'grand-heist';
export const GAME_TITLE = 'GRAND HEIST';
export const GAME_VERSION = '0.1.0';
export const REEL_COUNT = 5;
export const ROW_COUNT = 5;

export const SYMBOL_IDS = [
  'wild',
  'scatter',
  'cop',
  'gang',
  'driver',
  'sportsCar',
  'cashStacks',
  'burnerPhone',
  'club',
  'spade',
  'heart',
  'diamond',
  'flamingo',
] as const;

export type SymbolId = (typeof SYMBOL_IDS)[number];

export type SymbolDefinition = {
  id: SymbolId;
  label: string;
  shortLabel: string;
  assetName: string;
  category: 'high' | 'low' | 'special';
};

export const SYMBOL_DEFINITIONS: Record<SymbolId, SymbolDefinition> = {
  wild: {
    id: 'wild',
    label: 'Wild',
    shortLabel: 'WILD',
    assetName: 'symbol-wild.png',
    category: 'special',
  },
  scatter: {
    id: 'scatter',
    label: 'Free Spins',
    shortLabel: 'FS',
    assetName: 'symbol-scatter.png',
    category: 'special',
  },
  cop: {
    id: 'cop',
    label: 'Cop Chase',
    shortLabel: 'COP',
    assetName: 'symbol-cop.png',
    category: 'special',
  },
  gang: {
    id: 'gang',
    label: 'Gang Van',
    shortLabel: 'GANG',
    assetName: 'symbol-gang.png',
    category: 'special',
  },
  driver: {
    id: 'driver',
    label: 'Driver',
    shortLabel: 'DRVR',
    assetName: 'symbol-driver.png',
    category: 'high',
  },
  sportsCar: {
    id: 'sportsCar',
    label: 'Sports Car',
    shortLabel: 'CAR',
    assetName: 'symbol-sports-car.png',
    category: 'high',
  },
  cashStacks: {
    id: 'cashStacks',
    label: 'Cash Stacks',
    shortLabel: 'CASH',
    assetName: 'symbol-cash-stacks.png',
    category: 'high',
  },
  burnerPhone: {
    id: 'burnerPhone',
    label: 'Burner Phone',
    shortLabel: 'CALL',
    assetName: 'symbol-burner-phone.png',
    category: 'high',
  },
  club: {
    id: 'club',
    label: 'Club',
    shortLabel: 'CLUB',
    assetName: 'symbol-club.png',
    category: 'low',
  },
  spade: {
    id: 'spade',
    label: 'Spade',
    shortLabel: 'SPADE',
    assetName: 'symbol-spade.png',
    category: 'low',
  },
  heart: {
    id: 'heart',
    label: 'Heart',
    shortLabel: 'HEART',
    assetName: 'symbol-heart.png',
    category: 'low',
  },
  diamond: {
    id: 'diamond',
    label: 'Diamond',
    shortLabel: 'DIAM',
    assetName: 'symbol-diamond.png',
    category: 'low',
  },
  flamingo: {
    id: 'flamingo',
    label: 'Flamingo',
    shortLabel: 'FLMG',
    assetName: 'symbol-flamingo.png',
    category: 'low',
  },
};

export type CellCoord = {
  reel: number;
  row: number;
};

export type ReelGrid = readonly (readonly SymbolId[])[];

export type VisualScene = 'base' | 'freeSpins' | 'lockpick' | 'vault';

export type VisualStateStatus =
  | 'ready'
  | 'loss'
  | 'lineWin'
  | 'bigWin'
  | 'scatterTrigger'
  | 'copChase'
  | 'gangChase'
  | 'freeSpins'
  | 'vault';

export type VerticalWildEvent = {
  kind: 'cop' | 'gang';
  reel: number;
  multiplier: number;
  level?: 1 | 2 | 3;
  label: string;
  rows?: readonly number[];
};

export type MockVisualState = {
  id: string;
  label: string;
  status: VisualStateStatus;
  scene: VisualScene;
  reels: ReelGrid;
  highlightedCells: readonly CellCoord[];
  scatterCells: readonly CellCoord[];
  verticalWilds: readonly VerticalWildEvent[];
  totalBet: number;
  winMultiplier: number;
  balance: number;
  currency: string;
  message: string;
  detail: string;
};

export type LocalPlayRequest = {
  mockStateId?: string;
};

export type LocalGameClient = {
  readonly kind: 'local-mock';
  getState(): MockVisualState;
  selectState(id: string): MockVisualState;
  play(request?: LocalPlayRequest): Promise<MockVisualState>;
};
