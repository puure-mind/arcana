<script lang="ts">
  import { onMount } from 'svelte';
  import {
    REEL_COUNT,
    ROW_COUNT,
    SYMBOL_DEFINITIONS,
    type CellCoord,
    type MockVisualState,
    type SymbolId,
    type VerticalWildEvent
  } from '@grand-heist/contract';
  import { createLocalGameClient } from './lib/client/local-game-client.js';
  import {
    MOCK_STATE_IDS,
    MOCK_VISUAL_STATES,
    isMockStateId,
    type MockStateId
  } from './lib/fixtures/mock-states.js';

  import autoSpinButtonImage from './images/autoSpinBTN.png';
  import backgroundImage from './images/background.png';
  import balanceBetBackgroundImage from './images/balanceBetBG.png';
  import balanceBetColumnImage from './images/balanceBetColumn.png';
  import carImage from './images/car.png';
  import cashImage from './images/cash.png';
  import characterImage from './images/character.png';
  import clubsImage from './images/clubs.png';
  import copImage from './images/cop.png';
  import decreaseBetButtonImage from './images/decreaseBetBTN.png';
  import diamondsImage from './images/diamonds.png';
  import flamingoImage from './images/flamingo.png';
  import freeSpinImage from './images/freespin.png';
  import gangImage from './images/gang.png';
  import heartsImage from './images/hearts.png';
  import girlImage from './images/girl.png';
  import increaseBetButtonImage from './images/increaseBetBTN.png';
  import infoButtonImage from './images/infoBTN.png';
  import logoImage from './images/logo.png';
  import musicButtonImage from './images/musicBTN.png';
  import mobileBackgroundImage from './images/mobileBG.png';
  import mobilePanelBackgroundImage from './images/mobilePanelBG.png';
  import mobileBigScorePanelBackgroundImage from './images/mobilepanelBGBigScore.png';
  import gambleLockCenterCompositeImage from './images/lockpickingGamble.png';
  import sceneBgMostWanted from './images/MostWantedBG.png';
  import plateBgMostWanted from './images/freespinPanel.png';
  import reelGradientMostWanted from './images/redBlueLight.png';
  import bigScoreScreenBackgroundImage from './images/bigScoreBG.png';
  import bigScoreScreenFsPanelImage from './images/BigScoreFsLeft.png';
  import bigScoreScreenBottomPanelImage from './images/panelBGBigScore.png';
  import bigScoreScreenReelImage from './images/BigScoreslotBG.png';
  import bigScoreScreenCharacterImage from './images/characterBigScore.png';
  import mobileBalanceBetBackgroundImage from './images/mobileBalanceBetBG.png';
  import mobileBalanceBetColumnImage from './images/mobileBalanceBetColumn.png';
  import panelBackgroundImage from './images/panelBG.png';
  import mostWantedSpinPanelImage from './images/MostWantedspinPanel.png';
  import panelStrokeImage from './images/panelStroke.png';
  import phoneImage from './images/phone.png';
  import slotBackgroundImage from './images/slotBG.png';
  import slotColumnImage from './images/slotColumn.png';
  import soundButtonImage from './images/soundBTN.png';
  import spadesImage from './images/spades.png';
  import spinButtonImage from './images/SpinBTN.png';
  import bonusBuyImage from './images/bonusBuy.png';
  import mobileBonusBuyImage from './images/mobilebonusBuy.png';
  import bigscoreImage from './images/bigscore.png';
  import roadrageImage from './images/roadrage.png';
  import bonusroadImage from './images/bonusroad.png';
  import mostwantedImage from './images/mostwanted.png';
  import totalWinBackgroundImage from './images/totalWinBG.png';
  import wildImage from './images/wild.png';
  import onboardPanelImage from './images/onboardPanel.png';
  import crossImage from './images/cross.png';
  import lockpickerImage from './images/lockpicker.png';
  import screwdriverImage from './images/screwdriver.png';
  import carLockImage from './images/car lock.png';
  import carLockCoreImage from './images/car lock core.png';
  import star3Image from './images/star3.png';
  import star4Image from './images/star4.png';
  import mostwantedPanelImage from './images/mostwantedPanel.png';
  import infoCopStripImage from './images/copColumn.png';
  import infoDestroyedStripImage from './images/destroyed.png';
  import infoEscapedStripImage from './images/escaped.png';
  import infoGangStripImage from './images/gangColumn.png';
  import infoLineImage from './images/line.png';
  import infoBustedStripImage from './images/busted.png';
  import infoPanelBackgroundImage from './images/panelbgInfo.png';
  import infoTintBackgroundImage from './images/tintbg.png';
  import mostwantedIconsImage from './images/mostwantedIcons.png';
  import gambleIconsImage from './images/gambleIcons.png';
  import lines1Image from './images/lines1.png';
  import lines2Image from './images/lines2.png';
  import lines3Image from './images/lines3.png';
  import lines4Image from './images/lines4.png';
  import lines5Image from './images/lines5.png';
  import lines6Image from './images/lines6.png';
  import lines7Image from './images/lines7.png';
  import lines8Image from './images/lines8.png';
  import lines9Image from './images/lines9.png';
  import lines10Image from './images/lines10.png';
  import lines11Image from './images/lines11.png';
  import lines12Image from './images/lines12.png';
  import lines13Image from './images/lines13.png';
  import lines14Image from './images/lines14.png';
  import lines15Image from './images/lines15.png';
  import lines16Image from './images/lines16.png';
  import lines17Image from './images/lines17.png';
  import lines18Image from './images/lines18.png';
  import lines19Image from './images/lines19.png';
  import winEffectsImage from './images/FSBGart.png';
  import bigWinTitleImage from './images/big.png';
  import megaWinTitleImage from './images/mega.png';
  import epicWinTitleImage from './images/epic.png';
  import winWordImage from './images/win.png';
  import congratulationsWinImage from './images/congratulations.png';
  import youWinTitleImage from './images/youWin.png';
  import youWinEffectsImage from './images/youwinBgart.png';
  import gambleBackgroundImage from './images/gambleBG.png';
  import gamblePanelBackgroundImage from './images/gamblePanelBg.png';
  import gambleLockpickImage from './images/lockpick.png';




  const searchParams = new URLSearchParams(globalThis.location?.search ?? '');
  const initialMockStateId = resolveInitialMockState();
  const showDevTools = searchParams.get('dev') === '1';
  const client = createLocalGameClient(initialMockStateId);

  const symbolAssets: Record<string, string> = {
    car: carImage,
    sportscar: carImage,
    vehicle: carImage,
    cash: cashImage,
    money: cashImage,
    banknotes: cashImage,
    flamingo: flamingoImage,
    girl: girlImage,
    woman: girlImage,
    character: girlImage,
    driver: girlImage,
    drvr: girlImage,
    freespin: freeSpinImage,
    freespins: freeSpinImage,
    fs: freeSpinImage,
    heart: freeSpinImage,
    wild: wildImage,
    cop: copImage,
    police: copImage,
    gang: gangImage,
    gangster: gangImage,
    phone: phoneImage,
    mobile: phoneImage,
    clubs: clubsImage,
    club: clubsImage,
    spades: spadesImage,
    spade: spadesImage,
    diamonds: diamondsImage,
    diamond: diamondsImage
  };

  /*
   * The default READY screen uses the same visual arrangement as the supplied
   * 1920 × 1080 reference. Other mock states still use their own symbols.
   * The arrays are reel-major: five reels, each with five rows.
   */
  const referenceReadySymbols: string[][] = [
    [carImage, freeSpinImage, cashImage, carImage, cashImage],
    [carImage, cashImage, cashImage, copImage, clubsImage],
    [flamingoImage, girlImage, cashImage, gangImage, spadesImage],
    [girlImage, freeSpinImage, wildImage, phoneImage, flamingoImage],
    [carImage, carImage, freeSpinImage, flamingoImage, diamondsImage]
  ];


  /* 402 × 874 portrait reference, reel-major just like the desktop array. */
  const referenceMobileSymbols: string[][] = [
    [carImage, freeSpinImage, cashImage, carImage, flamingoImage],
    [carImage, cashImage, cashImage, phoneImage, diamondsImage],
    [flamingoImage, girlImage, cashImage, flamingoImage, cashImage],
    [girlImage, freeSpinImage, wildImage, clubsImage, girlImage],
    [carImage, carImage, freeSpinImage, spadesImage, girlImage]
  ];

  type OnboardingPageKind = 'free-spins' | 'road-rage' | 'most-wanted' | 'car-theft';

  type OnboardingPage = {
    title: string;
    subtitle: string;
    kind: OnboardingPageKind;
  };

  type InfoPageKind =
    | 'game-rules'
    | 'paytable'
    | 'special-symbols'
    | 'vertical-chase'
    | 'cop-chase'
    | 'gang-chase'
    | 'gamble-mini-game'
    | 'lines'
    | 'bonus-modes-overview'
    | 'bonus-modes-big-score'
    | 'bonus-modes-most-wanted';

  type InfoPage = {
    title: string;
    kind: InfoPageKind;
  };

  const infoPages: InfoPage[] = [
    { title: 'Game Rules', kind: 'game-rules' },
    { title: 'Paytable', kind: 'paytable' },
    { title: 'Special Symbols', kind: 'special-symbols' },
    { title: 'Vertical Chase Features', kind: 'vertical-chase' },
    { title: 'COP Chase', kind: 'cop-chase' },
    { title: 'GANG Chase', kind: 'gang-chase' },
    { title: 'THE GAMBLE MINI-GAME', kind: 'gamble-mini-game' },
    { title: 'Lines', kind: 'lines' },
    { title: 'BONUS MODES', kind: 'bonus-modes-overview' },
    { title: 'BONUS MODES', kind: 'bonus-modes-big-score' },
    { title: 'BONUS MODES', kind: 'bonus-modes-most-wanted' }
  ];

  type PaytableItem = {
    name: string;
    image: string;
    values: [string, string, string];
  };

  const paytableTop: PaytableItem[] = [
    { name: 'Girl', image: girlImage, values: ['$500', '$75', '$15'] },
    { name: 'Car', image: carImage, values: ['$300', '$60', '$12'] },
    { name: 'Cash', image: cashImage, values: ['$200', '$40', '$12'] },
    { name: 'Phone', image: phoneImage, values: ['$150', '$30', '$8'] }
  ];

  const paytableBottom: PaytableItem[] = [
    { name: 'Flamingo', image: flamingoImage, values: ['$100', '$20', '$6'] },
    { name: 'Spade', image: spadesImage, values: ['$50', '$12', '$4'] },
    { name: 'Heart', image: heartsImage, values: ['$40', '$10', '$3'] },
    { name: 'Club', image: clubsImage, values: ['$30', '$8', '$3'] },
    { name: 'Diamond', image: diamondsImage, values: ['$20', '$6', '$2'] }
  ];

  const linePatternImages = [
    lines1Image,
    lines2Image,
    lines3Image,
    lines4Image,
    lines5Image,
    lines6Image,
    lines7Image,
    lines8Image,
    lines9Image,
    lines10Image,
    lines11Image,
    lines12Image,
    lines13Image,
    lines14Image,
    lines15Image,
    lines16Image,
    lines17Image,
    lines18Image,
    lines19Image
  ];

  const onboardingPages: OnboardingPage[] = [
    {
      title: 'FREE SPINS',
      subtitle: 'CATCH THIS SYMBOL TO START BONUS GAME',
      kind: 'free-spins'
    },
    {
      title: 'ROAD RAGE',
      subtitle: 'Try to escape from COPS and GANGS',
      kind: 'road-rage'
    },
    {
      title: 'MOST WANTED',
      subtitle: 'Increase YOUR heat level in BONUS games',
      kind: 'most-wanted'
    },
    {
      title: 'CAR THEFT',
      subtitle: 'Try to open car lock with a screwdriver',
      kind: 'car-theft'
    }
  ];

  type BonusBuyCardId =
    | 'bonus-road-featurespins'
    | 'road-rage-featurespins'
    | 'ride-or-crash-featurespins'
    | 'bonus-road'
    | 'most-wanted-featurespins'
    | 'the-big-score';

  type BonusBuyCard = {
    id: BonusBuyCardId;
    title: string;
    description: string;
    priceMultiplier: number;
    actionLabel: 'ACTIVATE' | 'BUY';
    actionTone: 'activate' | 'buy';
  };

  const bonusBuyBetValues = [1, 2, 5, 10, 20, 50];
  const bonusBuyReferenceBalance = 10000;

  const bonusBuyCards: BonusBuyCard[] = [
    {
      id: 'bonus-road-featurespins',
      title: 'BONUS ROAD\nFEATURESPINS',
      description: 'Each spin is 10 times more likely to trigger a bonus game!',
      priceMultiplier: 5,
      actionLabel: 'ACTIVATE',
      actionTone: 'activate'
    },
    {
      id: 'road-rage-featurespins',
      title: 'ROAD RAGE\nFEATURESPINS',
      description:
        'Each spin guarantees that at least 2 COP, GANG, or a combination of both symbols land!',
      priceMultiplier: 100,
      actionLabel: 'ACTIVATE',
      actionTone: 'activate'
    },
    {
      id: 'ride-or-crash-featurespins',
      title: 'RIDE OR CRASH\nFEATURESPINS',
      description: 'Each spin guarantees that at least 1 GANG symbol lands!',
      priceMultiplier: 100,
      actionLabel: 'ACTIVATE',
      actionTone: 'activate'
    },
    {
      id: 'bonus-road',
      title: 'BONUS ROAD',
      description:
        'Choose between a Gamble or 10 free spins with Progressive WILD Multipliers!',
      priceMultiplier: 100,
      actionLabel: 'BUY',
      actionTone: 'buy'
    },
    {
      id: 'most-wanted-featurespins',
      title: 'MOST WANTED\nFEATURESPINS',
      description:
        'Choose between a Gamble or 10 free spins with a MOST WANTED Bar that awards GANG and COP symbols!',
      priceMultiplier: 200,
      actionLabel: 'BUY',
      actionTone: 'buy'
    },
    {
      id: 'the-big-score',
      title: 'THE BIG SCORE',
      description:
        '10 free spins, the first spin starts at DuelSpin Level 1 and GANG Multipliers are Progressive!',
      priceMultiplier: 1000,
      actionLabel: 'BUY',
      actionTone: 'buy'
    }
  ];


  type WinScreenKind = 'big' | 'mega' | 'epic' | 'free-spins' | 'free-spins-result';

  type WinScreen = {
    kind: WinScreenKind;
    titleImage?: string;
    amount: string;
    label: string;
    subtitle?: string;
  };

  const winScreens: WinScreen[] = [
    {
      kind: 'big',
      titleImage: bigWinTitleImage,
      amount: '150.00$',
      label: 'Big win'
    },
    {
      kind: 'mega',
      titleImage: megaWinTitleImage,
      amount: '15.00$',
      label: 'Mega win'
    },
    {
      kind: 'epic',
      titleImage: epicWinTitleImage,
      amount: '1,500.00$',
      label: 'Epic win'
    },
    {
      kind: 'free-spins',
      amount: '10 FREE SPINS',
      label: 'Ten free spins'
    },
    {
      kind: 'free-spins-result',
      amount: '150.00$',
      subtitle: 'IN 10 FREE SPINS',
      label: 'Free spins result'
    }
  ];

  let selectedMockStateId: MockStateId = initialMockStateId;
  let state: MockVisualState = client.getState();
  let isPlaying = false;
  let musicEnabled = true;
  let soundEnabled = true;
  let autoSpinEnabled = false;
  let isMobileLayout = false;
  let showOnboarding = true;
  let onboardingPageIndex = 0;
  let showInfo = false;
  let infoPageIndex = 0;
  let showBonusBuy = false;
  let bonusBuyStep: 'catalog' | 'confirm' = 'catalog';
  let bonusBuySelectedCard: BonusBuyCard | null = null;
  let bonusBuyBetIndex = 1;
  let showWinScreen = false;
  let winScreenIndex = 0;
  let showMostWantedBonus = false;
  let showGambleBonus = false;
  let showBigScoreBonus = false;
  let mostWantedFsLeft = 10;
  const bigScoreScreenFsLeft = 10;

  const mostWantedTopPlates = [
    { milestone: 2, copBonus: 2, gangBonus: 2, dimmed: false, crossed: true, starImage: star3Image },
    { milestone: 3, copBonus: 3, gangBonus: 3, dimmed: false, crossed: false, starImage: star3Image },
    { milestone: 4, copBonus: 4, gangBonus: 3, dimmed: false, crossed: false, starImage: star4Image },
    { milestone: 5, copBonus: 4, gangBonus: 4, dimmed: false, crossed: false, starImage: star4Image }
  ] as const;

  const bigScoreScreenSymbols = [
    [wildImage, carImage, flamingoImage, girlImage, carImage],
    [freeSpinImage, cashImage, wildImage, freeSpinImage, carImage],
    [cashImage, wildImage, wildImage, wildImage, freeSpinImage],
    [carImage, wildImage, flamingoImage, wildImage, spadesImage],
    [flamingoImage, diamondsImage, cashImage, girlImage, girlImage]
  ] as const;

  $: onboardingPage = onboardingPages[onboardingPageIndex];
  $: infoPage = infoPages[infoPageIndex];
  $: bonusBuyBet = bonusBuyBetValues[bonusBuyBetIndex];
  $: activeWinScreen = winScreens[winScreenIndex];


  onMount(() => {
    const media = window.matchMedia('(orientation: portrait) and (max-width: 767px)');

    const updateLayout = () => {
      isMobileLayout = media.matches;
    };

    updateLayout();
    media.addEventListener('change', updateLayout);

    return () => {
      media.removeEventListener('change', updateLayout);
    };
  });

  $: formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: state.currency,
    minimumFractionDigits: 2
  });
  $: winAmount = state.totalBet * state.winMultiplier;
  $: winFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: state.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: false
  });
  $: formattedWinAmount = winFormatter.format(winAmount);
  $: bonusBuyPriceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: state.currency,
    minimumFractionDigits: 2
  });
  $: bonusBuyBalanceFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function resolveInitialMockState(): MockStateId {
    const mockParam = searchParams.get('mock');
    return isMockStateId(mockParam) ? mockParam : 'ready';
  }

  function isSameCell(cell: CellCoord, reel: number, row: number): boolean {
    return cell.reel === reel && cell.row === row;
  }

  function isHighlighted(reel: number, row: number): boolean {
    return state.highlightedCells.some((cell) => isSameCell(cell, reel, row));
  }

  function isScatterCue(reel: number, row: number): boolean {
    return state.scatterCells.some((cell) => isSameCell(cell, reel, row));
  }

  function verticalWildFor(reel: number): VerticalWildEvent | undefined {
    return state.verticalWilds.find((event) => event.reel === reel);
  }

  function isVerticalWildCell(event: VerticalWildEvent | undefined, row: number): boolean {
    if (!event) return false;
    return (event.rows ?? [0, 1, 2, 3, 4]).includes(row);
  }

  function symbolFor(symbolId: SymbolId) {
    return SYMBOL_DEFINITIONS[symbolId];
  }

  function normalizeAssetKey(value: unknown): string {
    return String(value ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  }

  function symbolImageFor(symbolId: SymbolId, label: string, shortLabel: string): string | undefined {
    const candidates = [symbolId, label, shortLabel].map(normalizeAssetKey);

    for (const candidate of candidates) {
      if (symbolAssets[candidate]) return symbolAssets[candidate];

      const matchingKey = Object.keys(symbolAssets).find(
        (key) => candidate.includes(key) || key.includes(candidate)
      );
      if (matchingKey) return symbolAssets[matchingKey];
    }

    return undefined;
  }

  function visualSymbolImageFor(
    symbolId: SymbolId,
    label: string,
    shortLabel: string,
    reel: number,
    row: number
  ): string | undefined {
    if (selectedMockStateId === 'ready') {
      const referenceSymbols = isMobileLayout ? referenceMobileSymbols : referenceReadySymbols;
      return referenceSymbols[reel]?.[row];
    }

    return symbolImageFor(symbolId, label, shortLabel);
  }

  function chaseImageFor(event: VerticalWildEvent | undefined): string {
    const kind = normalizeAssetKey(event?.kind);
    return kind.includes('cop') || kind.includes('police') ? copImage : gangImage;
  }

  function selectMockState(event: Event) {
    const target = event.currentTarget as HTMLSelectElement;
    selectedMockStateId = isMockStateId(target.value) ? target.value : 'ready';
    state = client.selectState(selectedMockStateId);
  }

  async function playSelectedState() {
    if (isPlaying) return;

    isPlaying = true;
    try {
      state = await client.play({ mockStateId: selectedMockStateId });
    } finally {
      isPlaying = false;
    }
  }

  function nextOnboardingPage() {
    if (onboardingPageIndex < onboardingPages.length - 1) {
      onboardingPageIndex += 1;
      return;
    }

    showOnboarding = false;
  }

  function previousOnboardingPage() {
    if (onboardingPageIndex > 0) {
      onboardingPageIndex -= 1;
    }
  }

  function selectOnboardingPage(index: number) {
    onboardingPageIndex = Math.max(0, Math.min(index, onboardingPages.length - 1));
  }

  function restartOnboarding() {
    infoPageIndex = 0;
    showInfo = false;
    showMostWantedBonus = false;
    showGambleBonus = false;
    onboardingPageIndex = 0;
    showOnboarding = true;
  }

  function bonusBuyPrice(card: BonusBuyCard): number {
    return bonusBuyBet * card.priceMultiplier;
  }

  function openBonusBuy() {
    showOnboarding = false;
    showInfo = false;
    showMostWantedBonus = false;
    showGambleBonus = false;
    showBonusBuy = true;
    bonusBuyStep = 'catalog';
    bonusBuySelectedCard = null;
  }

  function closeBonusBuy() {
    showBonusBuy = false;
    bonusBuyStep = 'catalog';
    bonusBuySelectedCard = null;
  }

  function openBonusBuyConfirm(card: BonusBuyCard) {
    bonusBuySelectedCard = card;
    bonusBuyStep = 'confirm';
  }

  function cancelBonusBuyConfirm() {
    bonusBuyStep = 'catalog';
    bonusBuySelectedCard = null;
  }

  function confirmBonusBuy() {
    closeBonusBuy();
  }

  function decreaseBonusBuyBet() {
    bonusBuyBetIndex = Math.max(0, bonusBuyBetIndex - 1);
  }

  function increaseBonusBuyBet() {
    bonusBuyBetIndex = Math.min(bonusBuyBetValues.length - 1, bonusBuyBetIndex + 1);
  }

  function handleBonusBuyKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (bonusBuyStep === 'confirm') {
        cancelBonusBuyConfirm();
      } else {
        closeBonusBuy();
      }
    }
  }

  function openInfo() {
    infoPageIndex = 0;
    showMostWantedBonus = false;
    showGambleBonus = false;
    showInfo = true;
  }

  function closeInfo() {
    showInfo = false;
  }

  function previousInfoPage() {
    if (infoPageIndex > 0) {
      infoPageIndex -= 1;
    }
  }

  function nextInfoPage() {
    if (infoPageIndex < infoPages.length - 1) {
      infoPageIndex += 1;
    }
  }

  function handleInfoKeydown(event: KeyboardEvent) {
    if (!showInfo) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousInfoPage();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextInfoPage();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeInfo();
    }
  }

  function openWinScreens() {
    showOnboarding = false;
    showInfo = false;
    showBonusBuy = false;
    showMostWantedBonus = false;
    showGambleBonus = false;
    winScreenIndex = 0;
    showWinScreen = true;
  }

  function advanceWinScreen() {
    if (winScreenIndex < winScreens.length - 1) {
      winScreenIndex += 1;
      return;
    }

    showWinScreen = false;
    winScreenIndex = 0;
  }

  function handleWinScreenKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowRight') {
      event.preventDefault();
      advanceWinScreen();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      showWinScreen = false;
      winScreenIndex = 0;
    }
  }


  function openMostWantedBonus() {
    showOnboarding = false;
    showInfo = false;
    showBonusBuy = false;
    showWinScreen = false;
    showGambleBonus = false;
    showMostWantedBonus = true;
  }

  function closeMostWantedBonus() {
    showMostWantedBonus = false;
  }

  function toggleMostWantedBonus() {
    if (showMostWantedBonus) {
      closeMostWantedBonus();
      return;
    }

    openMostWantedBonus();
  }

  function openGambleBonus() {
    showOnboarding = false;
    showInfo = false;
    showBonusBuy = false;
    showWinScreen = false;
    showMostWantedBonus = false;
    showGambleBonus = true;
  }

  function closeGambleBonus() {
    showGambleBonus = false;
  }

  function toggleGambleBonus() {
    if (showGambleBonus) {
      closeGambleBonus();
      return;
    }

    openGambleBonus();
  }

  function openBigScoreBonus() {
    showOnboarding = false;
    showInfo = false;
    showBonusBuy = false;
    showWinScreen = false;
    showMostWantedBonus = false;
    showGambleBonus = false;
    showBigScoreBonus = true;
  }

  function closeBigScoreBonus() {
    showBigScoreBonus = false;
  }

  function toggleBigScoreBonus() {
    if (showBigScoreBonus) {
      closeBigScoreBonus();
      return;
    }

    openBigScoreBonus();
  }

  function handleOnboardingKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previousOnboardingPage();
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      nextOnboardingPage();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      showOnboarding = false;
    }
  }
</script>

<svelte:head>
  <title>Grand Heist</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Aldrich&family=Gantari:wght@300;400;800&family=Jost:wght@100..900&display=swap"
    rel="stylesheet"
  />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
  />
</svelte:head>

<main
  class={`game-shell scene-${state.scene}${
    showOnboarding ? ' onboarding-active' : ''
  }${showMostWantedBonus ? ' most-wanted-bonus-active' : ''}${showGambleBonus ? ' gamble-bonus-active' : ''}`}
  data-status={state.status}
>
  <img
    class="adaptive-background desktop-adaptive-background"
    src={showGambleBonus ? gambleBackgroundImage : showMostWantedBonus ? sceneBgMostWanted : backgroundImage}
    alt=""
    draggable="false"
  />
  <img
    class="adaptive-background mobile-adaptive-background"
    src={showGambleBonus ? gambleBackgroundImage : showMostWantedBonus ? sceneBgMostWanted : mobileBackgroundImage}
    alt=""
    draggable="false"
  />
  <div class="adaptive-background-overlay" aria-hidden="true"></div>

  <div class="game-canvas">
    <img
      class="scene-background desktop-scene-background"
      src={showGambleBonus ? gambleBackgroundImage : showMostWantedBonus ? sceneBgMostWanted : backgroundImage}
      alt=""
      draggable="false"
    />
    <img
      class="scene-background mobile-scene-background"
      src={showGambleBonus ? gambleBackgroundImage : showMostWantedBonus ? sceneBgMostWanted : mobileBackgroundImage}
      alt=""
      draggable="false"
    />
    <div class="scene-shade" aria-hidden="true"></div>

    {#if showMostWantedBonus && !isMobileLayout}
      <img
        class="mw-standard-reel-gradient"
        src={reelGradientMostWanted}
        alt=""
        draggable="false"
      />
    {/if}

    <img class="game-logo" src={logoImage} alt="Grand Heist" draggable="false" />

    {#if showOnboarding}
      <section
        class="onboarding-screen"
        role="dialog"
        aria-modal="true"
        aria-label={`Onboarding: ${onboardingPage.title}`}
        tabindex="0"
        onclick={nextOnboardingPage}
        onkeydown={handleOnboardingKeydown}
      >
        <div class="onboarding-panel">
          <img
            class="onboarding-panel-background"
            src={onboardPanelImage}
            alt=""
            draggable="false"
          />

          <div class="onboarding-copy">
            <h1>{onboardingPage.title}</h1>
            <p>{onboardingPage.subtitle}</p>
          </div>

          <div class={`onboarding-art onboarding-art-${onboardingPage.kind}`} aria-hidden="true">
            {#if onboardingPage.kind === 'free-spins'}
              <img
                class="onboarding-free-spin"
                src={freeSpinImage}
                alt=""
                draggable="false"
              />
            {:else if onboardingPage.kind === 'road-rage'}
              <img class="onboarding-cop" src={copImage} alt="" draggable="false" />
              <img class="onboarding-gang" src={gangImage} alt="" draggable="false" />
            {:else if onboardingPage.kind === 'most-wanted'}
              <div class="mw-composition">
                <div class="mw-card mw-card-lower">
                  <img
                    class="mw-panel"
                    src={mostwantedPanelImage}
                    alt=""
                    draggable="false"
                  />

                  <div class="mw-star">
                    <img src={star3Image} alt="" draggable="false" />
                  </div>

                  <img class="mw-cop" src={copImage} alt="" draggable="false" />
                  <img class="mw-gang" src={gangImage} alt="" draggable="false" />
                </div>

                <div class="mw-card mw-card-upper">
                  <img
                    class="mw-panel"
                    src={mostwantedPanelImage}
                    alt=""
                    draggable="false"
                  />

                  <div class="mw-star">
                    <img src={star4Image} alt="" draggable="false" />
                  </div>

                  <img class="mw-cop" src={copImage} alt="" draggable="false" />
                  <img class="mw-gang" src={gangImage} alt="" draggable="false" />
                </div>

                <img
                  class="mw-cross"
                  src={crossImage}
                  alt=""
                  draggable="false"
                />
              </div>
            {:else}
              <div class="car-lock-composition">
                <img class="car-lock-ring" src={carLockImage} alt="" draggable="false" />
                <img class="car-lock-core" src={carLockCoreImage} alt="" draggable="false" />
                <img class="car-lock-picker" src={lockpickerImage} alt="" draggable="false" />
                <img class="car-lock-screwdriver" src={screwdriverImage} alt="" draggable="false" />
              </div>
            {/if}
          </div>

          <button
            class="onboarding-arrow onboarding-arrow-left"
            class:disabled={onboardingPageIndex === 0}
            type="button"
            aria-label="Previous onboarding page"
            disabled={onboardingPageIndex === 0}
            onclick={(event) => {
              event.stopPropagation();
              previousOnboardingPage();
            }}
          >
            <svg
              class="onboarding-arrow-icon"
              viewBox="0 0 52 52"
              aria-hidden="true"
            >
              <path d="M43.7 4.7C45.7 3.5 48 4.9 48 7.2V44.8C48 47.1 45.7 48.5 43.7 47.3L9.4 28.5C7.4 27.4 7.4 24.6 9.4 23.5L43.7 4.7Z" />
            </svg>
          </button>

          <button
            class="onboarding-arrow onboarding-arrow-right"
            class:disabled={onboardingPageIndex === onboardingPages.length - 1}
            type="button"
            aria-label="Next onboarding page"
            disabled={onboardingPageIndex === onboardingPages.length - 1}
            onclick={(event) => {
              event.stopPropagation();
              nextOnboardingPage();
            }}
          >
            <svg
              class="onboarding-arrow-icon"
              viewBox="0 0 52 52"
              aria-hidden="true"
            >
              <path d="M8.3 4.7C6.3 3.5 4 4.9 4 7.2V44.8C4 47.1 6.3 48.5 8.3 47.3L42.6 28.5C44.6 27.4 44.6 24.6 42.6 23.5L8.3 4.7Z" />
            </svg>
          </button>

          <div class="onboarding-dots" aria-label="Onboarding pages">
            {#each onboardingPages as page, index}
              <button
                class:active={index === onboardingPageIndex}
                type="button"
                aria-label={`Open ${page.title} page`}
                aria-current={index === onboardingPageIndex ? 'step' : undefined}
                onclick={(event) => {
                  event.stopPropagation();
                  selectOnboardingPage(index);
                }}
              ></button>
            {/each}
          </div>
        </div>

        <button
          class="onboarding-continue"
          type="button"
          onclick={(event) => {
            event.stopPropagation();
            nextOnboardingPage();
          }}
        >
          <svg
            class="onboarding-continue-svg"
            viewBox="0 0 620 108"
            role="img"
            aria-label="Click to continue"
          >
            <defs>
              <linearGradient id="onboardingTextFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFE6B5" />
                <stop offset="49.999%" stop-color="#FFE6B5" />
                <stop offset="50%" stop-color="#FD9D6D" />
                <stop offset="100%" stop-color="#FD9D6D" />
              </linearGradient>

              <linearGradient id="mwFsLabelStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3769EE" />
                <stop offset="100%" stop-color="#DB2453" />
              </linearGradient>
            </defs>

            <text
              class="onboarding-continue-main-text"
              x="310"
              y="82"
              text-anchor="middle"
              font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
              font-size="78"
              font-weight="400"
              style="font-kerning: none;"
              letter-spacing="0"
              fill="url(#onboardingTextFill)"
              stroke="url(#mwFsLabelStroke)"
              stroke-width="13"
              stroke-linejoin="miter"
              stroke-miterlimit="3"
              paint-order="stroke fill"
            >
              CLICK TO CONTINUE
            </text>
          </svg>
        </button>
      </section>
    {/if}

    {#if showDevTools && !showOnboarding}
      <button class="onboarding-debug-button" type="button" onclick={restartOnboarding}>
        ONBOARD
      </button>
    {/if}
  {#if (!showOnboarding && !showInfo && !showBonusBuy && !showWinScreen && !showMostWantedBonus && !showGambleBonus) || showBigScoreBonus}
    <button class="big-score-bonus-debug-button" type="button" onclick={toggleBigScoreBonus}>
      {showBigScoreBonus ? 'CLOSE BIG' : 'BIG SCORE'}
    </button>
  {/if}

  {#if (!showOnboarding && !showInfo && !showBonusBuy && !showWinScreen) || showGambleBonus}
    <button class="gamble-bonus-debug-button" type="button" onclick={toggleGambleBonus}>
      {showGambleBonus ? 'CLOSE GB' : 'GB BONUS'}
    </button>
  {/if}

  {#if (!showOnboarding && !showInfo && !showBonusBuy && !showWinScreen && !showGambleBonus) || showMostWantedBonus}
    <button class="mw-bonus-debug-button" type="button" onclick={toggleMostWantedBonus}>
      {showMostWantedBonus ? 'CLOSE MW' : 'MW BONUS'}
    </button>
  {/if}

  {#if !showOnboarding && !showInfo && !showBonusBuy && !showWinScreen && !showMostWantedBonus && !showGambleBonus}
    <button class="win-debug-button" type="button" onclick={openWinScreens}>
      WIN
    </button>
  {/if}

  {#if showGambleBonus}
    <section class="gamble-bonus-screen" aria-label="Gamble bonus screen">
      <div class="gamble-choice-panel">
        <img src={gamblePanelBackgroundImage} alt="" draggable="false" />
        {#each ['5FS', '5FS', 'BIG SCORE', '10FS', '5X'] as label, index}
          <div class={`gamble-choice gamble-choice-${index + 1}`}>
            <img src={gambleLockpickImage} alt="" draggable="false" />
            {#if label === 'BIG SCORE'}
              <svg
                class="gamble-choice-text-svg gamble-choice-text-svg-bigscore"
                viewBox="0 0 360 210"
                aria-hidden="true"
                overflow="visible"
              >
                <defs>
                  <linearGradient id={`gambleChoiceFillBig-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFBF42" />
                    <stop offset="49.999%" stop-color="#FFBF42" />
                    <stop offset="50%" stop-color="#E67B45" />
                    <stop offset="100%" stop-color="#E67B45" />
                  </linearGradient>
                  <linearGradient id={`gambleChoiceFillScore-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFBF42" />
                    <stop offset="49.999%" stop-color="#FFBF42" />
                    <stop offset="50%" stop-color="#E67B45" />
                    <stop offset="100%" stop-color="#E67B45" />
                  </linearGradient>
                  <linearGradient id={`gambleChoiceStroke-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3769EE" />
                    <stop offset="100%" stop-color="#DB2453" />
                  </linearGradient>
                </defs>
                <text
                  x="180"
                  y="88"
                  text-anchor="middle"
                  font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
                  font-size="112"
                  font-weight="400"
                  letter-spacing="0"
                  fill={`url(#gambleChoiceFillBig-${index})`}
                  stroke={`url(#gambleChoiceStroke-${index})`}
                  stroke-width="13"
                  stroke-linejoin="round"
                  paint-order="stroke fill"
                >
                  <tspan x="180" y="88">BIG</tspan>
                </text>
                <text
                  x="180"
                  y="186"
                  text-anchor="middle"
                  font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
                  font-size="112"
                  font-weight="400"
                  letter-spacing="0"
                  fill={`url(#gambleChoiceFillScore-${index})`}
                  stroke={`url(#gambleChoiceStroke-${index})`}
                  stroke-width="13"
                  stroke-linejoin="round"
                  paint-order="stroke fill"
                >
                  <tspan x="180" y="186">SCORE</tspan>
                </text>
              </svg>
              <svg
                class="gamble-choice-text-svg gamble-choice-text-svg-mobile-epic"
                viewBox="0 0 250 120"
                aria-hidden="true"
                overflow="visible"
              >
                <defs>
                  <linearGradient id={`gambleChoiceMobileEpicFill-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFE6B5" />
                    <stop offset="49.999%" stop-color="#FFE6B5" />
                    <stop offset="50%" stop-color="#FD9D6D" />
                    <stop offset="100%" stop-color="#FD9D6D" />
                  </linearGradient>
                  <linearGradient id={`gambleChoiceMobileEpicStroke-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3769EE" />
                    <stop offset="100%" stop-color="#DB2453" />
                  </linearGradient>
                </defs>
                <text
                  x="125"
                  y="90"
                  text-anchor="middle"
                  font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
                  font-size="92"
                  font-weight="400"
                  letter-spacing="0"
                  fill={`url(#gambleChoiceMobileEpicFill-${index})`}
                  stroke={`url(#gambleChoiceMobileEpicStroke-${index})`}
                  stroke-width="13"
                  stroke-linejoin="round"
                  paint-order="stroke fill"
                >EPIC</text>
              </svg>
            {:else}
              <svg
                class="gamble-choice-text-svg"
                viewBox="0 0 250 120"
                aria-hidden="true"
                overflow="visible"
              >
                <defs>
                  <linearGradient id={`gambleChoiceFill-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFE6B5" />
                    <stop offset="49.999%" stop-color="#FFE6B5" />
                    <stop offset="50%" stop-color="#FD9D6D" />
                    <stop offset="100%" stop-color="#FD9D6D" />
                  </linearGradient>
                  <linearGradient id={`gambleChoiceStroke-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#3769EE" />
                    <stop offset="100%" stop-color="#DB2453" />
                  </linearGradient>
                </defs>
                <text
                  x="125"
                  y="90"
                  text-anchor="middle"
                  font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
                  font-size="92"
                  font-weight="400"
                  letter-spacing="0"
                  fill={`url(#gambleChoiceFill-${index})`}
                  stroke={`url(#gambleChoiceStroke-${index})`}
                  stroke-width="13"
                  stroke-linejoin="round"
                  paint-order="stroke fill"
                >{label}</text>
              </svg>
            {/if}
          </div>
        {/each}
      </div>

      <div class="gamble-lock-assembly" aria-hidden="true">
        <img class="gamble-lock-composite" src={gambleLockCenterCompositeImage} alt="" draggable="false" />
      </div>
    </section>
  {/if}

  {#if showMostWantedBonus}
    <div class="mw-standard-hud" aria-label="Most Wanted bonus HUD">
      <div class="mw-standard-fs-card">
        <img src={plateBgMostWanted} alt="" draggable="false" />
        <div class="mw-standard-fs-copy">
          <svg
            class="mw-standard-fs-label"
            viewBox="0 0 230 88"
            preserveAspectRatio="xMinYMid meet"
            role="img"
            aria-label="FS LEFT"
            overflow="visible"
          >
            <defs>
              <linearGradient id="mwFsLabelFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFE6B5" />
                <stop offset="49.999%" stop-color="#FFE6B5" />
                <stop offset="50%" stop-color="#FD9D6D" />
                <stop offset="100%" stop-color="#FD9D6D" />
              </linearGradient>
              <linearGradient id="mwFsLabelStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3769EE" />
                <stop offset="100%" stop-color="#DB2453" />
              </linearGradient>
            </defs>
            <text
              x="6"
              y="67"
              font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
              font-size="80"
              font-weight="400"
              style="font-kerning: none;"
              letter-spacing="0"
              fill="url(#mwFsLabelFill)"
              stroke="url(#mwFsLabelStroke)"
              stroke-width="13"
              stroke-linejoin="miter"
              stroke-miterlimit="3"
              paint-order="stroke fill"
            ><tspan>FS</tspan><tspan dx="14">LEFT:</tspan></text>
          </svg>

          <svg
            class="mw-standard-fs-value"
            viewBox="0 0 86 92"
            role="img"
            aria-label={String(mostWantedFsLeft)}
            overflow="visible"
          >
            <defs>
              <linearGradient id="mwFsValueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFE6B5" />
                <stop offset="49.999%" stop-color="#FFE6B5" />
                <stop offset="50%" stop-color="#FD9D6D" />
                <stop offset="100%" stop-color="#FD9D6D" />
              </linearGradient>
              <linearGradient id="mwFsValueStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3769EE" />
                <stop offset="100%" stop-color="#DB2453" />
              </linearGradient>
            </defs>
            <text
              x="43"
              y="75"
              text-anchor="middle"
              font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
              font-size="102"
              font-weight="400"
              fill="url(#mwFsValueFill)"
              stroke="url(#mwFsValueStroke)"
              stroke-width="12.5"
              stroke-linejoin="miter"
              stroke-miterlimit="3"
              paint-order="stroke fill"
            >{mostWantedFsLeft}</text>
          </svg>
        </div>
      </div>

      <div class="mw-standard-top-plates" aria-hidden="true">
        {#each mostWantedTopPlates as plate}
          <div class:dimmed={plate.dimmed} class="mw-standard-top-plate">
            <img class="mw-standard-top-plate-bg" src={plateBgMostWanted} alt="" draggable="false" />

            <div class="mw-standard-top-star">
              <img src={plate.starImage} alt="" draggable="false" />
              <span>{plate.milestone}</span>
            </div>

            <div class="mw-standard-top-lane mw-standard-top-lane-cop">
              <span class="mw-standard-top-count">+{plate.copBonus}</span>
              <img src={copImage} alt="" draggable="false" />
            </div>

            <div class="mw-standard-top-lane mw-standard-top-lane-gang">
              <span class="mw-standard-top-count">+{plate.gangBonus}</span>
              <img src={gangImage} alt="" draggable="false" />
            </div>

          </div>
        {/each}
      </div>
    </div>
  {/if}

  <img class="hero-character" src={characterImage} alt="" draggable="false" />

  <section class="main-stage" aria-label="Main game screen">
    <section
      class:playing={isPlaying}
      class="board-shell"
      aria-label="Reel board"
    >
      <img class="slot-background" src={slotBackgroundImage} alt="" draggable="false" />

      <div
        class="reel-frame"
        role="grid"
        aria-label={`${REEL_COUNT} reels by ${ROW_COUNT} rows visual state`}
      >
        {#each state.reels as reel, reelIndex}
          {@const verticalWild = verticalWildFor(reelIndex)}
          <div class="reel" role="presentation">
            {#each reel as symbolId, rowIndex}
              {@const symbol = symbolFor(symbolId)}
              {@const wildCell = isVerticalWildCell(verticalWild, rowIndex)}
              {@const symbolImage = visualSymbolImageFor(
                symbolId,
                symbol.label,
                symbol.shortLabel,
                reelIndex,
                rowIndex
              )}
              <div
                class:highlighted={isHighlighted(reelIndex, rowIndex)}
                class:scatter-cue={isScatterCue(reelIndex, rowIndex)}
                class:vertical-wild-cell={wildCell}
                class={`symbol symbol-${symbol.category}`}
                role="gridcell"
                aria-label={wildCell ? (verticalWild?.label ?? symbol.label) : symbol.label}
              >
                <div class="symbol-glow" aria-hidden="true"></div>

                {#if wildCell}
                  <img
                    class="symbol-image chase-symbol"
                    src={chaseImageFor(verticalWild)}
                    alt=""
                    draggable="false"
                  />
                {:else if symbolImage}
                  <img class="symbol-image" src={symbolImage} alt="" draggable="false" />
                {:else}
                  <span class="symbol-fallback">{symbol.shortLabel}</span>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>

      <div class="slot-columns" aria-hidden="true">
        {#each [215, 390, 565, 740] as columnLeft}
          <img
            class="slot-column"
            src={slotColumnImage}
            alt=""
            draggable="false"
            style={`left: ${(columnLeft / 959) * 100}%`}
          />
        {/each}
      </div>

      {#if state.verticalWilds.length > 0}
        <div class="chase-stack" aria-label="Chase multipliers">
          {#each state.verticalWilds as event}
            <div class={`chase-badge chase-${event.kind} chase-level-${event.level ?? 1}`}>
              <span>{event.kind.toUpperCase()}</span>
              <strong>{event.multiplier}X</strong>
            </div>
          {/each}
        </div>
      {/if}
    </section>
  </section>

  <section class="control-deck" aria-label="Controls">
    <img class="panel-background" src={showMostWantedBonus ? mostWantedSpinPanelImage : panelBackgroundImage} alt="" draggable="false" />
    <img class="panel-stroke" src={panelStrokeImage} alt="" draggable="false" />
    <img
      class="mobile-panel-background"
      src={mobilePanelBackgroundImage}
      alt=""
      draggable="false"
    />

    <button
      class="bonus-buy-button image-button"
      type="button"
      aria-label="Buy bonus"
      onclick={openBonusBuy}
    >
      <img
        class="desktop-bonus-buy-image"
        src={bonusBuyImage}
        alt=""
        draggable="false"
      />
      <img
        class="mobile-bonus-buy-image"
        src={mobileBonusBuyImage}
        alt=""
        draggable="false"
      />
    </button>

    <div class="utility-controls">
      <div class="audio-controls">
        <button
          class:muted={!musicEnabled}
          class="icon-button small-icon-button music-button"
          type="button"
          aria-label={musicEnabled ? 'Mute music' : 'Enable music'}
          aria-pressed={!musicEnabled}
          onclick={() => (musicEnabled = !musicEnabled)}
        >
          <img src={musicButtonImage} alt="" draggable="false" />
        </button>

        <button
          class:muted={!soundEnabled}
          class="icon-button small-icon-button sound-button"
          type="button"
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          aria-pressed={!soundEnabled}
          onclick={() => (soundEnabled = !soundEnabled)}
        >
          <img src={soundButtonImage} alt="" draggable="false" />
        </button>
      </div>

      <button
        class="icon-button info-button"
        type="button"
        aria-label="Game information"
        onclick={openInfo}
      >
        <img src={infoButtonImage} alt="" draggable="false" />
      </button>
    </div>

    <div class="balance-bet-panel">
      <img
        src={balanceBetBackgroundImage}
        class="balance-bet-background desktop-balance-bet-background"
        alt=""
        draggable="false"
      />
      <img
        src={mobileBalanceBetBackgroundImage}
        class="balance-bet-background mobile-balance-bet-background"
        alt=""
        draggable="false"
      />
      <img
        src={balanceBetColumnImage}
        class="balance-bet-divider desktop-balance-bet-divider"
        alt=""
        draggable="false"
      />
      <img
        src={mobileBalanceBetColumnImage}
        class="balance-bet-divider mobile-balance-bet-divider"
        alt=""
        draggable="false"
      />

      <div class="stat stat-balance">
        <span>Balance</span>
        <strong>{formatter.format(state.balance)}</strong>
      </div>

      <div class="stat stat-bet">
        <span>Bet</span>
        <strong>{formatter.format(state.totalBet)}</strong>
      </div>
    </div>

    <div class="total-win-panel">
      <img src={totalWinBackgroundImage} alt="" draggable="false" />
      <div class="total-win-copy">
        <span>Total win</span>
        <strong>{formattedWinAmount}</strong>
      </div>
    </div>

    {#if showDevTools}
      <label class="state-picker">
        <span>State</span>
        <select value={selectedMockStateId} onchange={selectMockState}>
          {#each MOCK_STATE_IDS as id}
            <option value={id}>{MOCK_VISUAL_STATES[id].label}</option>
          {/each}
        </select>
      </label>
    {/if}

    <button
      class:playing={isPlaying}
      class:most-wanted-dimmed={showMostWantedBonus}
      class="mobile-spin-button image-button"
      type="button"
      disabled={isPlaying}
      aria-label={isPlaying ? 'Spinning' : 'Spin'}
      onclick={playSelectedState}
    >
      <img src={spinButtonImage} alt="" draggable="false" />
    </button>

    <button
      class:active={autoSpinEnabled}
      class="auto-spin-button image-button"
      type="button"
      aria-label="Toggle auto spin"
      aria-pressed={autoSpinEnabled}
      onclick={() => (autoSpinEnabled = !autoSpinEnabled)}
    >
      <img src={autoSpinButtonImage} alt="" draggable="false" />
    </button>

    <button class="bet-button decrease-button image-button" type="button" aria-label="Decrease bet">
      <img src={decreaseBetButtonImage} alt="" draggable="false" />
    </button>

    <button class="bet-button increase-button image-button" type="button" aria-label="Increase bet">
      <img src={increaseBetButtonImage} alt="" draggable="false" />
    </button>

    <button
      class:playing={isPlaying}
      class:most-wanted-dimmed={showMostWantedBonus}
      class="spin-button image-button"
      type="button"
      disabled={isPlaying}
      aria-label={isPlaying ? 'Spinning' : 'Spin'}
      onclick={playSelectedState}
    >
      <img src={spinButtonImage} alt="" draggable="false" />
    </button>
  </section>


  {#if showBonusBuy}
    <section
      class="bonus-buy-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={bonusBuyStep === 'catalog' ? 'Bonus buy' : 'Confirm bonus purchase'}
      tabindex="0"
      onkeydown={handleBonusBuyKeydown}
    >
      <img class="bonus-buy-tint-background" src={infoTintBackgroundImage} alt="" draggable="false" />

      <button
        class="bonus-buy-close-button"
        type="button"
        aria-label="Close bonus buy"
        onclick={closeBonusBuy}
      ></button>

      {#if bonusBuyStep === 'catalog'}
        <h1 class="bonus-buy-title">BONUS BUY</h1>

        <div class="bonus-buy-bet-widget">
          <div class="bonus-buy-bet-title">Bet</div>
          <div class="bonus-buy-bet-value">{bonusBuyPriceFormatter.format(bonusBuyBet)}</div>

          <div class="bonus-buy-bet-actions">
            <button
              class="bonus-buy-small-action"
              type="button"
              aria-label="Decrease bonus buy bet"
              disabled={bonusBuyBetIndex === 0}
              onclick={decreaseBonusBuyBet}
            >
              −
            </button>
            <button
              class="bonus-buy-small-action"
              type="button"
              aria-label="Increase bonus buy bet"
              disabled={bonusBuyBetIndex === bonusBuyBetValues.length - 1}
              onclick={increaseBonusBuyBet}
            >
              +
            </button>
          </div>

          <div class="bonus-buy-balance-line">
            Balance:
            <span>{bonusBuyBalanceFormatter.format(bonusBuyReferenceBalance)}</span>
          </div>
        </div>

        <div class="bonus-buy-cards">
          {#each bonusBuyCards as card}
            <button
              class={`bonus-buy-card bonus-buy-card-${card.id}`}
              type="button"
              aria-label={`${card.title.replace(/\n/g, ' ')} ${bonusBuyPriceFormatter.format(bonusBuyPrice(card))}`}
              onclick={() => openBonusBuyConfirm(card)}
            >
              <div class="bonus-buy-card-body">
                <h2>{card.title}</h2>
                <p>{card.description}</p>

                <div class={`bonus-buy-card-icons icons-${card.id}`} aria-hidden="true">
                  {#if card.id === 'bonus-road-featurespins'}
                    <img
                      class="bonus-buy-composite-image composite-free-spins"
                      src={freeSpinImage}
                      alt=""
                      draggable="false"
                    />
                  {:else if card.id === 'road-rage-featurespins'}
                    <img
                      class="bonus-buy-composite-image composite-road-rage"
                      src={roadrageImage}
                      alt=""
                      draggable="false"
                    />
                  {:else if card.id === 'ride-or-crash-featurespins'}
                    <img
                      class="bonus-buy-composite-image composite-ride-or-crash"
                      src={gangImage}
                      alt=""
                      draggable="false"
                    />
                  {:else if card.id === 'bonus-road'}
                    <img
                      class="bonus-buy-composite-image composite-bonus-road"
                      src={bonusroadImage}
                      alt=""
                      draggable="false"
                    />
                  {:else if card.id === 'most-wanted-featurespins'}
                    <img
                      class="bonus-buy-composite-image composite-most-wanted"
                      src={mostwantedImage}
                      alt=""
                      draggable="false"
                    />
                  {:else}
                    <img
                      class="bonus-buy-composite-image composite-big-score"
                      src={bigscoreImage}
                      alt=""
                      draggable="false"
                    />
                  {/if}
                </div>

                <div class="bonus-buy-card-price">{bonusBuyPriceFormatter.format(bonusBuyPrice(card))}</div>
              </div>

              <div class={`bonus-buy-card-action action-${card.actionTone}`}>{card.actionLabel}</div>
            </button>
          {/each}
        </div>
      {:else if bonusBuySelectedCard}
        <h1 class="bonus-buy-title">CONFIRM BUY</h1>

        <div class="bonus-buy-confirm-stage">
          <div
            class={`bonus-buy-card bonus-buy-card-confirm bonus-buy-card-${bonusBuySelectedCard.id}`}
            aria-label={`${bonusBuySelectedCard.title.replace(/\n/g, ' ')} ${bonusBuyPriceFormatter.format(
              bonusBuyPrice(bonusBuySelectedCard)
            )}`}
          >
            <div class="bonus-buy-card-body">
              <h2>{bonusBuySelectedCard.title}</h2>
              <p>{bonusBuySelectedCard.description}</p>

              <div
                class={`bonus-buy-card-icons icons-${bonusBuySelectedCard.id}`}
                aria-hidden="true"
              >
                {#if bonusBuySelectedCard.id === 'bonus-road-featurespins'}
                  <img
                      class="bonus-buy-composite-image composite-free-spins"
                      src={freeSpinImage}
                      alt=""
                      draggable="false"
                    />
                {:else if bonusBuySelectedCard.id === 'road-rage-featurespins'}
                  <img
                    class="bonus-buy-composite-image composite-road-rage"
                    src={roadrageImage}
                    alt=""
                    draggable="false"
                  />
                {:else if bonusBuySelectedCard.id === 'ride-or-crash-featurespins'}
                  <img
                      class="bonus-buy-composite-image composite-ride-or-crash"
                      src={gangImage}
                      alt=""
                      draggable="false"
                    />
                {:else if bonusBuySelectedCard.id === 'bonus-road'}
                  <img
                    class="bonus-buy-composite-image composite-bonus-road"
                    src={bonusroadImage}
                    alt=""
                    draggable="false"
                  />
                {:else if bonusBuySelectedCard.id === 'most-wanted-featurespins'}
                  <img
                    class="bonus-buy-composite-image composite-most-wanted"
                    src={mostwantedImage}
                    alt=""
                    draggable="false"
                  />
                {:else}
                  <img
                    class="bonus-buy-composite-image composite-big-score"
                    src={bigscoreImage}
                    alt=""
                    draggable="false"
                  />
                {/if}
              </div>

              <div class="bonus-buy-card-price">
                {bonusBuyPriceFormatter.format(bonusBuyPrice(bonusBuySelectedCard))}
              </div>
            </div>

            <div class={`bonus-buy-card-action action-${bonusBuySelectedCard.actionTone}`}>
              {bonusBuySelectedCard.actionLabel}
            </div>
          </div>

          <div class="bonus-buy-confirm-panel">
            <div class="bonus-buy-confirm-title">CONFIRM</div>
            <div class="bonus-buy-confirm-value">
              {bonusBuyPriceFormatter.format(bonusBuyPrice(bonusBuySelectedCard))}
            </div>

            <div class="bonus-buy-confirm-actions">
              <button class="bonus-buy-confirm-button purchase" type="button" onclick={confirmBonusBuy}>
                PURCHASE
              </button>
              <button class="bonus-buy-confirm-button cancel" type="button" onclick={cancelBonusBuyConfirm}>
                CANCEL
              </button>
            </div>

            <div class="bonus-buy-balance-line confirm-balance-line">
              Balance:
              <span>{bonusBuyPriceFormatter.format(bonusBuyReferenceBalance)}</span>
            </div>
          </div>
        </div>
      {/if}
    </section>
  {/if}

  {#if showInfo}
    <section
      class="info-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Game information: ${infoPage.title}`}
      tabindex="0"
      onkeydown={handleInfoKeydown}
    >
      <img class="info-tint-background" src={infoTintBackgroundImage} alt="" draggable="false" />
      <img class="info-panel-background" src={infoPanelBackgroundImage} alt="" draggable="false" />

      <button
        class="info-close-button"
        type="button"
        aria-label="Close game information"
        onclick={closeInfo}
      ></button>

      <div class={`info-page info-page-${infoPage.kind}`}>
        {#if infoPage.kind === 'game-rules'}
          <h1>Game Rules</h1>

          <div class="info-rules-copy">
            <p>
              Welcome to GRAND HEIST! This is a 5x5 high-stakes video slot where<br />
              neon lights meet high-speed chases. Spin the reels, outrun the cops,<br />
              and crack the vault to secure massive wins.
            </p>

            <h2>MAIN GAMEPLAY</h2>

            <ul>
              <li>The game is played on a 5x5 grid.</li>
              <li>
                Winning combinations and payouts are calculated based on the<br />
                active paylines.
              </li>
              <li>
                Simultaneous wins on different paylines are added together and<br />
                displayed sequentially..
              </li>
            </ul>
          </div>
        {:else if infoPage.kind === 'paytable'}
          <h1>Paytable</h1>

          <div class="paytable-row paytable-row-top">
            {#each paytableTop as item, index}
              <div class={`paytable-item paytable-item-top-${index + 1}`}>
                <div class="paytable-symbol">
                  <img src={item.image} alt={item.name} draggable="false" />
                </div>
                <div class="paytable-values">
                  <span>5x&nbsp; - &nbsp;<strong>{item.values[0]}</strong></span>
                  <span>4x&nbsp; - &nbsp;<strong>{item.values[1]}</strong></span>
                  <span>3x&nbsp; - &nbsp;<strong>{item.values[2]}</strong></span>
                </div>
              </div>
            {/each}
          </div>

          <img class="info-paytable-divider" src={infoLineImage} alt="" draggable="false" />

          <div class="paytable-row paytable-row-bottom">
            {#each paytableBottom as item, index}
              <div class={`paytable-item paytable-item-bottom-${index + 1}`}>
                <div class="paytable-symbol">
                  <img src={item.image} alt={item.name} draggable="false" />
                </div>
                <div class="paytable-values">
                  <span>5x&nbsp; - &nbsp;<strong>{item.values[0]}</strong></span>
                  <span>4x&nbsp; - &nbsp;<strong>{item.values[1]}</strong></span>
                  <span>3x&nbsp; - &nbsp;<strong>{item.values[2]}</strong></span>
                </div>
              </div>
            {/each}
          </div>
        {:else if infoPage.kind === 'special-symbols'}
          <h1>Special Symbols</h1>

          <div class="special-symbol special-symbol-wild">
            <img src={wildImage} alt="Wild" draggable="false" />
            <p>
              This is the WILD symbol. It<br />
              substitutes for all regular paying<br />
              symbols to help complete<br />
              winning combinations.
            </p>
          </div>

          <div class="special-symbol special-symbol-scatter">
            <img src={freeSpinImage} alt="Scatter" draggable="false" />
            <p>
              This is the SCATTER symbol. It<br />
              appears on all reels. Landing 3<br />
              or more symbols anywhere on<br />
              the grid triggers the Bonus<br />
              Game.
            </p>
          </div>

          <img class="special-symbol-divider" src={infoLineImage} alt="" draggable="false" />

          <div class="special-symbol special-symbol-cop">
            <img src={copImage} alt="Cop" draggable="false" />
            <p>
              This is the COP symbol. It<br />
              triggers a vertical police chase<br />
              animation on the reel.
            </p>
          </div>

          <div class="special-symbol special-symbol-gang">
            <img src={gangImage} alt="Gang" draggable="false" />
            <p>
              This is the GANG symbol. It<br />
              triggers an intense, multi-stage<br />
              vertical chase up to 3 waves<br />
              deep.
            </p>
          </div>
        {:else if infoPage.kind === 'vertical-chase'}
          <h1>Vertical Chase Features</h1>

          <p class="vertical-chase-description">
            When COP or GANG symbols land on the grid, they trigger unique Vertical Chase animations<br />
            that expand to cover the entire reel (1x5), turning it into a Multiplier Wild.
          </p>

          <div class="vertical-chase-strips">
            <img src={infoCopStripImage} alt="Cop chase reel" draggable="false" />
            <img src={infoGangStripImage} alt="Gang chase reel" draggable="false" />
            <img src={infoDestroyedStripImage} alt="Destroyed reel" draggable="false" />
            <img src={infoBustedStripImage} alt="Busted reel" draggable="false" />
            <img src={infoEscapedStripImage} alt="Escaped reel" draggable="false" />
          </div>
        {:else if infoPage.kind === 'cop-chase'}
          <h1>COP Chase</h1>

          <div class="chase-info-copy">
            <p>A police cruiser chases your red sports car.</p>
            <p>
              A crash occurs resulting in one of two<br />
              outcomes:
            </p>

            <ul>
              <li>
                BUSTED: The police win. The reel becomes a<br />
                Wild with the Police Multiplier.
              </li>
              <li class="empty-chase-bullet">&nbsp;</li>
              <li>
                ESCAPED: You win. The reel becomes a Wild<br />
                with the Red Car Multiplier.
              </li>
            </ul>
          </div>

          <div class="chase-info-strips">
            <img src={infoCopStripImage} alt="Cop chase reel" draggable="false" />
            <img src={infoBustedStripImage} alt="Busted reel" draggable="false" />
            <img src={infoEscapedStripImage} alt="Escaped reel" draggable="false" />
          </div>
        {:else if infoPage.kind === 'gang-chase'}
          <h1>GANG Chase</h1>

          <div class="chase-info-copy gang-chase-copy">
            <p>
              A brutal multi-stage chase against up to 3<br />
              enemy vans (Black, Blue, and Red).
            </p>

            <p>
              Wave Mechanics: Your car goes head-to-head<br />
              with a van. If you win, your multipliers are added<br />
              together, and you advance to the next wave<br />
              against a stronger van.
            </p>

            <p>
              DESTROYED: If a van wins during any wave, the<br />
              chase ends. The reel becomes a Wild using the<br />
              winning Van's Multiplier.
            </p>

            <p>
              ESCAPED: If you survive all 3 waves, the reel<br />
              becomes a Wild featuring the massive<br />
              accumulated total of all multipliers.
            </p>
          </div>

          <div class="chase-info-strips">
            <img src={infoGangStripImage} alt="Gang chase reel" draggable="false" />
            <img src={infoDestroyedStripImage} alt="Destroyed reel" draggable="false" />
            <img src={infoEscapedStripImage} alt="Escaped reel" draggable="false" />
          </div>
        {:else if infoPage.kind === 'gamble-mini-game'}
          <h1 class="gamble-page-title">THE GAMBLE MINI-GAME</h1>

          <div class="gamble-page-copy">
            <p>
              When choosing the Gamble option, you enter a<br />
              lockpick mini-game.
            </p>

            <ul>
              <li>
                You are given 5 attempts to pick a car lock.<br />
                The lock is 100% guaranteed to open<br />
                eventually.
              </li>
              <li>
                Each pick attempt contains a specific prize: 5<br />
                FS, 10 FS, a 5x Multiplier or The Big Score.
              </li>
              <li>
                If a pick breaks, that specific prize is crossed<br />
                out, and you move to the next attempt with<br />
                a new pick.
              </li>
              <li>
                Successfully picking the lock grants the<br />
                highlighted prize.
              </li>
            </ul>
          </div>

          <img
            class="gamble-page-icons"
            src={gambleIconsImage}
            alt="Gamble mini-game examples"
            draggable="false"
          />
        {:else if infoPage.kind === 'lines'}
          <h1>Lines</h1>

          <div class="lines-patterns lines-patterns-top">
            {#each linePatternImages.slice(0, 7) as lineImage, index}
              <img src={lineImage} alt={`Payline ${index + 1}`} draggable="false" />
            {/each}
          </div>

          <div class="lines-patterns lines-patterns-middle">
            {#each linePatternImages.slice(7, 14) as lineImage, index}
              <img src={lineImage} alt={`Payline ${index + 8}`} draggable="false" />
            {/each}
          </div>

          <div class="lines-patterns lines-patterns-bottom">
            {#each linePatternImages.slice(14, 19) as lineImage, index}
              <img src={lineImage} alt={`Payline ${index + 15}`} draggable="false" />
            {/each}
          </div>
        {:else if infoPage.kind === 'bonus-modes-overview'}
          <h1>BONUS MODES</h1>

          <div class="bonus-mode bonus-mode-road">
            <div class="bonus-mode-icons bonus-mode-icons-road">
              <img src={freeSpinImage} alt="Free spins" draggable="false" />
            </div>
            <div class="bonus-mode-copy">
              <h2>BONUS ROAD FEATURESPINS</h2>
              <ul>
                <li>
                  Each spin is 10 times more<br />
                  likely to trigger a Bonus Game<br />
                  (higher chance of SCATTER<br />
                  symbols).
                </li>
              </ul>
            </div>
          </div>

          <div class="bonus-mode bonus-mode-rage">
            <div class="bonus-mode-icons bonus-mode-icons-rage">
              <img src={copImage} alt="Cop" draggable="false" />
              <img src={gangImage} alt="Gang" draggable="false" />
            </div>
            <div class="bonus-mode-copy">
              <h2>ROAD RAGE FEATURESPINS</h2>
              <ul>
                <li>
                  Every spin guarantees that at<br />
                  least 2 COP symbols, 1 GANG<br />
                  symbol, or a combination of<br />
                  both will land on the grid.
                </li>
              </ul>
            </div>
          </div>

          <img class="bonus-modes-divider" src={infoLineImage} alt="" draggable="false" />

          <div class="bonus-mode bonus-mode-crash">
            <div class="bonus-mode-icons bonus-mode-icons-crash">
              <img src={gangImage} alt="Gang" draggable="false" />
            </div>
            <div class="bonus-mode-copy">
              <h2>RIDE OR CRASH FEATURESPINS</h2>
              <ul>
                <li>
                  Every spin guarantees that at<br />
                  least 1 GANG symbol will land<br />
                  on the grid.
                </li>
              </ul>
            </div>
          </div>

          <div class="bonus-mode bonus-mode-lock">
            <div class="bonus-mode-icons bonus-mode-icons-lock">
              <img src={carLockCoreImage} alt="Car lock" draggable="false" />
            </div>
            <div class="bonus-mode-copy">
              <h2>BONUS ROAD</h2>
              <ul>
                <li>
                  Choose between the Gamble<br />
                  mini-game OR 10 Free Spins<br />
                  featuring Progressive WILD<br />
                  Multipliers (multipliers grow<br />
                  with each successive spin).
                </li>
              </ul>
            </div>
          </div>
        {:else if infoPage.kind === 'bonus-modes-big-score'}
          <h1>BONUS MODES</h1>

          <div class="big-score-composition">
            <div class="big-score-art-row">
              <img class="big-score-wild" src={wildImage} alt="Wild" draggable="false" />
              <img class="big-score-gang" src={gangImage} alt="Gang" draggable="false" />
            </div>

            <div class="big-score-copy">
              <h2>THE BIG SCORE</h2>
              <ul>
                <li>
                  The ultimate heist. You receive 10 Free Spins. The first spin starts<br />
                  immediately at DuelSpin Level 1, and all GANG Multipliers are<br />
                  Progressive, accumulating throughout the entire bonus round for<br />
                  massive payout potential.
                </li>
              </ul>
            </div>
          </div>
        {:else}
          <h1>BONUS MODES</h1>

          <div class="most-wanted-page-content">
            <div class="most-wanted-mode">
              <img class="most-wanted-mode-fs" src={freeSpinImage} alt="Free spins" draggable="false" />

              <div class="most-wanted-mode-copy">
                <h2>MOST WANTED FEATURESPINS</h2>
              <ul>
                <li>
                  Choose between the Gamble mini-game OR 10 Free Spins featuring the<br />
                  MOST WANTED Bar. Defeating police fills the bar, guaranteeing<br />
                  additional GANG and COP symbols on the grid.
                </li>
              </ul>
            </div>

            <img
              class="most-wanted-mode-icons"
              src={mostwantedIconsImage}
              alt="Most Wanted progression"
              draggable="false"
            />
            </div>

            <img class="most-wanted-mode-divider" src={infoLineImage} alt="" draggable="false" />

            <div class="big-score-composition big-score-composition-lower">
              <div class="big-score-art-row">
                <img class="big-score-wild" src={wildImage} alt="Wild" draggable="false" />
                <img class="big-score-gang" src={gangImage} alt="Gang" draggable="false" />
              </div>

              <div class="big-score-copy">
              <h2>THE BIG SCORE</h2>
              <ul>
                <li>
                  The ultimate heist. You receive 10 Free Spins. The first spin starts<br />
                  immediately at DuelSpin Level 1, and all GANG Multipliers are<br />
                  Progressive, accumulating throughout the entire bonus round for<br />
                  massive payout potential.
                </li>
              </ul>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <div class="info-navigation" aria-label="Information page navigation">
        <button
          class="info-arrow info-arrow-left"
          class:disabled={infoPageIndex === 0}
          type="button"
          aria-label="Previous information page"
          disabled={infoPageIndex === 0}
          onclick={previousInfoPage}
        >
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <path d="M43.7 4.7C45.7 3.5 48 4.9 48 7.2V44.8C48 47.1 45.7 48.5 43.7 47.3L9.4 28.5C7.4 27.4 7.4 24.6 9.4 23.5L43.7 4.7Z" />
          </svg>
        </button>

        <button
          class="info-arrow info-arrow-right"
          class:disabled={infoPageIndex === infoPages.length - 1}
          type="button"
          aria-label="Next information page"
          disabled={infoPageIndex === infoPages.length - 1}
          onclick={nextInfoPage}
        >
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <path d="M8.3 4.7C6.3 3.5 4 4.9 4 7.2V44.8C4 47.1 6.3 48.5 8.3 47.3L42.6 28.5C44.6 27.4 44.6 24.6 42.6 23.5L8.3 4.7Z" />
          </svg>
        </button>
      </div>
    </section>
  {/if}

  {#if showWinScreen}
    <section
      class="win-screen-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={activeWinScreen.label}
      tabindex="0"
      onclick={advanceWinScreen}
      onkeydown={handleWinScreenKeydown}
    >
      <img
        class="win-screen-dim"
        src={infoTintBackgroundImage}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      {#if activeWinScreen.kind === 'free-spins' || activeWinScreen.kind === 'free-spins-result'}
        <div class="win-screen-artboard win-screen-artboard-you-win" aria-hidden="true">
          <img
            class="win-screen-you-win-effects"
            src={youWinEffectsImage}
            alt=""
            draggable="false"
          />
          <img
            class="win-screen-congratulations"
            src={congratulationsWinImage}
            alt=""
            draggable="false"
          />
          <img
            class="win-screen-you-win-title"
            src={youWinTitleImage}
            alt=""
            draggable="false"
          />
          <div class="win-screen-you-win-amount">{activeWinScreen.amount}</div>

          {#if activeWinScreen.subtitle}
            <div class="win-screen-you-win-subtitle">{activeWinScreen.subtitle}</div>
          {/if}

          <div class="win-screen-continue">PRESS ANY KEY TO CONTINUE</div>
        </div>
      {:else}
        <div class="win-screen-artboard" aria-hidden="true">
          <img
            class="win-screen-effects"
            src={winEffectsImage}
            alt=""
            draggable="false"
          />
          <img
            class={`win-screen-title win-screen-title-${activeWinScreen.kind}`}
            src={activeWinScreen.titleImage}
            alt=""
            draggable="false"
          />
          <img
            class="win-screen-word"
            src={winWordImage}
            alt=""
            draggable="false"
          />
          <div class="win-screen-amount">{activeWinScreen.amount}</div>
        </div>
      {/if}
    </section>
  {/if}
  {#if showBigScoreBonus}
    <section class="big-score-bonus-overlay" aria-label="Big Score bonus screen">
      <img
        class="big-score-bonus-background"
        src={bigScoreScreenBackgroundImage}
        alt=""
        draggable="false"
      />

      <img class="big-score-bonus-logo" src={logoImage} alt="Grand Heist" draggable="false" />

      <div class="big-score-bonus-fs-panel" aria-label="Free spins left">
        <img src={bigScoreScreenFsPanelImage} alt="" draggable="false" />
        <div class="big-score-bonus-fs-copy">
          <svg
            class="big-score-bonus-fs-label"
            viewBox="0 0 230 88"
            preserveAspectRatio="xMinYMid meet"
            aria-hidden="true"
            overflow="visible"
          >
            <defs>
              <linearGradient id="bigScoreOverlayLabelFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFE6B5" />
                <stop offset="49.999%" stop-color="#FFE6B5" />
                <stop offset="50%" stop-color="#FD9D6D" />
                <stop offset="100%" stop-color="#FD9D6D" />
              </linearGradient>
              <linearGradient id="bigScoreOverlayLabelStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3769EE" />
                <stop offset="100%" stop-color="#DB2453" />
              </linearGradient>
            </defs>
            <text
              x="6"
              y="67"
              font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
              font-size="80"
              font-weight="400"
              style="font-kerning: none;"
              letter-spacing="0"
              fill="url(#bigScoreOverlayLabelFill)"
              stroke="url(#bigScoreOverlayLabelStroke)"
              stroke-width="13"
              stroke-linejoin="miter"
              stroke-miterlimit="3"
              paint-order="stroke fill"
            ><tspan>FS</tspan><tspan dx="14">LEFT:</tspan></text>
          </svg>

          <svg
            class="big-score-bonus-fs-value"
            viewBox="0 0 86 92"
            aria-hidden="true"
            overflow="visible"
          >
            <defs>
              <linearGradient id="bigScoreOverlayValueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFE6B5" />
                <stop offset="49.999%" stop-color="#FFE6B5" />
                <stop offset="50%" stop-color="#FD9D6D" />
                <stop offset="100%" stop-color="#FD9D6D" />
              </linearGradient>
              <linearGradient id="bigScoreOverlayValueStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3769EE" />
                <stop offset="100%" stop-color="#DB2453" />
              </linearGradient>
            </defs>
            <text
              x="43"
              y="75"
              text-anchor="middle"
              font-family="'GTA Russian', 'Jost', Arial, Helvetica, sans-serif"
              font-size="102"
              font-weight="400"
              fill="url(#bigScoreOverlayValueFill)"
              stroke="url(#bigScoreOverlayValueStroke)"
              stroke-width="12.5"
              stroke-linejoin="miter"
              stroke-miterlimit="3"
              paint-order="stroke fill"
            >{bigScoreScreenFsLeft}</text>
          </svg>
        </div>
      </div>

      <div class="big-score-bonus-board" aria-label="Big Score reels">
        <img
          class="big-score-bonus-board-background"
          src={bigScoreScreenReelImage}
          alt=""
          draggable="false"
        />

        <div class="big-score-bonus-symbol-grid">
          {#each bigScoreScreenSymbols as row}
            {#each row as symbolImage}
              <div class="big-score-bonus-symbol-cell">
                <img src={symbolImage} alt="" draggable="false" />
              </div>
            {/each}
          {/each}
        </div>

        <div class="big-score-bonus-column-assets" aria-hidden="true">
          {#each [215, 390, 565, 740] as columnLeft}
            <img
              class="big-score-bonus-divider"
              src={slotColumnImage}
              alt=""
              draggable="false"
              style={`left: ${(columnLeft / 959) * 100}%`}
            />
          {/each}
        </div>
      </div>

      <img
        class="big-score-bonus-character"
        src={bigScoreScreenCharacterImage}
        alt=""
        draggable="false"
      />

      <div class="big-score-bonus-bottom-ui" aria-hidden="true">
        <img
          class="big-score-bonus-bottom-background"
          src={bigScoreScreenBottomPanelImage}
          alt=""
          draggable="false"
        />
        <img
          class="big-score-bonus-mobile-bottom-background"
          src={mobileBigScorePanelBackgroundImage}
          alt=""
          draggable="false"
        />
        <img
          class="big-score-bonus-panel-stroke"
          src={panelStrokeImage}
          alt=""
          draggable="false"
        />

        <button
          class="big-score-bonus-icon-button big-score-bonus-music-button"
          type="button"
          onclick={() => (musicEnabled = !musicEnabled)}
          aria-label="Toggle music"
        >
          <img src={musicButtonImage} alt="" draggable="false" />
        </button>

        <button
          class="big-score-bonus-icon-button big-score-bonus-sound-button"
          type="button"
          onclick={() => (soundEnabled = !soundEnabled)}
          aria-label="Toggle sound"
        >
          <img src={soundButtonImage} alt="" draggable="false" />
        </button>

        <button
          class="big-score-bonus-icon-button big-score-bonus-info-button"
          type="button"
          aria-label="Information"
        >
          <img src={infoButtonImage} alt="" draggable="false" />
        </button>

        <div class="big-score-bonus-balance-bet-panel">
          <img
            class="big-score-bonus-balance-bet-background"
            src={isMobileLayout ? mobileBalanceBetBackgroundImage : balanceBetBackgroundImage}
            alt=""
            draggable="false"
          />
          <img
            class="big-score-bonus-balance-bet-divider"
            src={isMobileLayout ? mobileBalanceBetColumnImage : balanceBetColumnImage}
            alt=""
            draggable="false"
          />

          <div class="big-score-bonus-stat big-score-bonus-stat-balance">
            <span>BALANCE</span>
            <strong>$1,000.00</strong>
          </div>

          <div class="big-score-bonus-stat big-score-bonus-stat-bet">
            <span>BET</span>
            <strong>$1.00</strong>
          </div>
        </div>

        <div class="big-score-bonus-total-win">
          <img src={totalWinBackgroundImage} alt="" draggable="false" />
          <div class="big-score-bonus-total-win-copy">
            <span>TOTAL WIN</span>
            <strong>$1500</strong>
          </div>
        </div>

        <button
          class="big-score-bonus-auto-button"
          type="button"
          onclick={() => (autoSpinEnabled = !autoSpinEnabled)}
          aria-label="Toggle auto spin"
        >
          <img src={autoSpinButtonImage} alt="" draggable="false" />
        </button>

        <button class="big-score-bonus-minus-button" type="button" aria-label="Decrease bet">
          <img src={decreaseBetButtonImage} alt="" draggable="false" />
        </button>

        <button
          class="big-score-bonus-spin-button"
          type="button"
          onclick={playSelectedState}
          aria-label="Spin"
        >
          <img src={spinButtonImage} alt="" draggable="false" />
        </button>

        <button class="big-score-bonus-plus-button" type="button" aria-label="Increase bet">
          <img src={increaseBetButtonImage} alt="" draggable="false" />
        </button>
      </div>
    </section>
  {/if}

  </div>
</main>

<style>
  @font-face {
    font-family: 'GTA Russian';
    src: url('./fonts/GTA Russian.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(html),
  :global(body),
  :global(#app) {
    width: 100%;
    min-width: 100%;
    height: 100%;
    min-height: 100%;
    margin: 0;
    overflow: hidden;
  }

  :global(body) {
    background: #170824;
    color: #ffffff;
    font-family: 'Jost', Arial, Helvetica, sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  :global(button),
  :global(select) {
    font: inherit;
  }

  :global(button) {
    -webkit-user-select: none;
    user-select: none;
  }

  /*
   * The outer shell always fills the browser. The blurred cover image fills
   * any space outside the 16:9 game canvas, so ultrawide and tall screens do
   * not get black bars.
   */
  .game-shell {
    position: relative;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    overflow: hidden;
    isolation: isolate;
    background: #28143d;
    user-select: none;
    font-family: 'Jost', Arial, Helvetica, sans-serif;
  }

  .adaptive-background,
  .adaptive-background-overlay {
    position: absolute;
    inset: -2.5%;
    width: 105%;
    height: 105%;
    pointer-events: none;
  }

  .adaptive-background {
    z-index: 0;
    object-fit: cover;
    object-position: center;
    filter: blur(clamp(5px, 0.55vw, 12px)) brightness(0.78) saturate(0.95);
  }

  .adaptive-background-overlay {
    z-index: 1;
    background: radial-gradient(circle at center, transparent 48%, rgba(18, 5, 31, 0.28) 100%);
  }

  .mobile-adaptive-background,
  .mobile-scene-background {
    display: none;
  }

  /* All percentages inside this block are based on the 1920 × 1080 layout. */
  .game-canvas {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: min(100vw, calc(100vh * 16 / 9));
    width: min(100vw, calc(100dvh * 16 / 9));
    height: min(100vh, calc(100vw * 9 / 16));
    height: min(100dvh, calc(100vw * 9 / 16));
    aspect-ratio: 16 / 9;
    container-type: size;
    container-name: game-canvas;
    overflow: hidden;
    transform: translate(-50%, -50%);
  }

  .scene-background,
  .scene-shade,
  .main-stage,
  .control-deck {
    position: absolute;
    inset: 0;
  }

  .scene-background {
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  /* The supplied background already contains all colour grading. */
  .scene-shade {
    z-index: 1;
    pointer-events: none;
    background: transparent;
  }

  .game-logo {
    position: absolute;
    z-index: 3;
    top: 14.537037%; /* 157 / 1080 */
    left: 2.135417%; /* 41 / 1920 */
    width: 18.802083%; /* 361 / 1920 */
    height: auto;
    pointer-events: none;
  }

  .hero-character {
    position: absolute;
    z-index: 4;
    top: 2.222222%; /* 24 / 1080 */
    right: 1.5625%; /* 30 / 1920 */
    width: 28.854167%; /* 554 / 1920 */
    height: auto;
    pointer-events: none;
  }

  .main-stage {
    z-index: 5;
    pointer-events: none;
  }

  .board-shell {
    position: absolute;
    top: 1.759259%; /* 19 / 1080 */
    left: 22.916667%; /* 440 / 1920 */
    width: 49.947917%; /* 959 / 1920 */
    aspect-ratio: 959 / 942;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
    pointer-events: auto;
  }

  .slot-background {
    position: absolute;
    z-index: 0;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  /* Exact 875 × 875 symbol area from the reference layout. */
  .reel-frame {
    position: absolute;
    z-index: 1;
    top: 4.670913%; /* 44 / 942 */
    left: 4.483837%; /* 43 / 959 */
    width: 91.240876%; /* 875 / 959 */
    height: 92.887473%; /* 875 / 942 */
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0;
    overflow: hidden;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .reel {
    position: relative;
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    gap: 0;
    min-width: 0;
    min-height: 0;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .slot-columns {
    position: absolute;
    z-index: 4;
    inset: 0;
    pointer-events: none;
  }

  .slot-column {
    position: absolute;
    top: 5.095541%; /* 48 / 942 */
    display: block;
    width: 0.312826%; /* 3 / 959 */
    height: 91.401274%; /* 861 / 942 */
    object-fit: fill;
    pointer-events: none;
  }

  .symbol {
    position: relative;
    display: grid;
    place-items: center;
    min-width: 0;
    min-height: 0;
    padding: 0;
    overflow: visible;
    background: transparent !important;
    border: 0 !important;
    border-radius: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
  }

  .symbol-glow {
    position: absolute;
    inset: 9%;
    z-index: 0;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0.82);
    background: radial-gradient(
      circle,
      rgba(255, 112, 231, 0.45),
      rgba(87, 60, 255, 0.17) 45%,
      transparent 72%
    );
    filter: blur(0.35vw);
    transition: opacity 180ms ease, transform 180ms ease;
  }

  .symbol-image {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
    transform: translateZ(0);
    transition: transform 180ms ease, filter 180ms ease, opacity 180ms ease;
  }

  .symbol-fallback {
    position: relative;
    z-index: 1;
    max-width: 90%;
    color: #ffffff;
    font-size: clamp(7px, 0.95vw, 21px);
    font-weight: 900;
    line-height: 1;
    text-align: center;
    text-shadow: 0 0.12em 0.15em #000000, 0 0 0.35em #a22cff;
  }

  .symbol.highlighted .symbol-glow,
  .symbol.scatter-cue .symbol-glow {
    opacity: 1;
    transform: scale(1.08);
  }

  .symbol.highlighted .symbol-image {
    z-index: 5;
    transform: scale(1.1);
    filter: brightness(1.18) saturate(1.2) drop-shadow(0 0 0.33vw rgba(255, 255, 255, 0.95))
      drop-shadow(0 0 0.68vw rgba(255, 45, 191, 0.9));
  }

  .symbol.scatter-cue::after {
    content: '';
    position: absolute;
    z-index: 4;
    inset: 7%;
    border: 0.16vw solid rgba(255, 82, 196, 0.92);
    border-radius: 50%;
    box-shadow: 0 0 0.7vw rgba(255, 40, 188, 0.82), inset 0 0 0.45vw rgba(255, 80, 214, 0.45);
    animation: scatterPulse 1.05s ease-in-out infinite alternate;
    pointer-events: none;
  }

  .vertical-wild-cell .symbol-image {
    transform: scale(1.03);
  }

  .chase-symbol {
    width: 100%;
    height: 100%;
  }

  .board-shell.playing .reel:nth-child(odd) .symbol-image {
    animation: reelBlur 300ms linear infinite;
  }

  .board-shell.playing .reel:nth-child(even) .symbol-image {
    animation: reelBlur 300ms 85ms linear infinite reverse;
  }

  .chase-stack {
    position: absolute;
    z-index: 8;
    top: 7%;
    right: -12.5%;
    display: grid;
    gap: 0.6vw;
    pointer-events: none;
  }

  .chase-badge {
    min-width: 5.8vw;
    padding: 0.42vw 0.65vw;
    border: 0.11vw solid rgba(255, 255, 255, 0.66);
    border-radius: 0.65vw;
    background: linear-gradient(135deg, rgba(42, 18, 70, 0.94), rgba(99, 17, 105, 0.92));
    box-shadow: 0 0.35vw 0.75vw rgba(21, 5, 34, 0.42), inset 0 0 0.35vw rgba(255, 255, 255, 0.22);
    text-align: center;
  }

  .chase-badge span,
  .chase-badge strong {
    display: block;
    line-height: 1;
  }

  .chase-badge span {
    margin-bottom: 0.2em;
    color: #f0b7ff;
    font-size: clamp(6px, 0.55vw, 12px);
    font-weight: 900;
    letter-spacing: 0.08em;
  }

  .chase-badge strong {
    color: #ffffff;
    font-size: clamp(10px, 1.15vw, 24px);
    text-shadow: 0 0 0.35em #ec34ff;
  }

  .control-deck {
    z-index: 20;
    pointer-events: none;
  }

  .mobile-panel-background,
  .mobile-balance-bet-background,
  .mobile-balance-bet-divider {
    display: none;
  }

  .panel-background,
  .panel-stroke {
    position: absolute;
    top: 74.444444%; /* 804 / 1080 */
    left: 0;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .panel-background {
    z-index: 0;
  }

  .panel-stroke {
    z-index: 1;
  }

  .utility-controls,
  .balance-bet-panel,
  .total-win-panel,
  .state-picker,
  .image-button {
    pointer-events: auto;
  }

  .utility-controls {
    position: absolute;
    z-index: 5;
    inset: 0;
  }

  .audio-controls {
    display: contents;
  }

  .icon-button,
  .image-button {
    appearance: none;
    position: absolute;
    display: grid;
    place-items: center;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;
    transition: transform 120ms ease, filter 120ms ease, opacity 120ms ease;
  }

  .icon-button img,
  .image-button img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  .music-button {
    top: 92.037037%; /* 994 / 1080 */
    left: 8.854167%; /* 170 / 1920 */
    width: 1.770833%; /* 34 / 1920 */
    aspect-ratio: 1;
  }

  .sound-button {
    top: 95.555556%; /* 1032 / 1080 */
    left: 8.854167%;
    width: 1.770833%;
    aspect-ratio: 1;
  }

  .info-button {
    top: 92.5%; /* 999 / 1080 */
    left: 11.5625%; /* 222 / 1920 */
    width: 3.229167%; /* 62 / 1920 */
    aspect-ratio: 1;
  }

  .icon-button:hover,
  .image-button:hover:not(:disabled) {
    transform: scale(1.05);
    filter: brightness(1.12);
  }

  .icon-button:active,
  .image-button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .icon-button.muted {
    opacity: 0.42;
    filter: grayscale(0.8);
  }

  .balance-bet-panel {
    position: absolute;
    z-index: 4;
    top: 93.055556%; /* 1005 / 1080 */
    left: 17.1875%; /* 330 / 1920 */
    width: 22.760417%; /* 437 / 1920 */
    aspect-ratio: 437 / 50;
  }

  .balance-bet-background,
  .total-win-panel > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .balance-bet-divider {
    position: absolute;
    z-index: 2;
    top: 18%; /* 9 / 50 */
    left: 53.318078%; /* 233 / 437 */
    width: 0.457666%; /* 2 / 437 */
    height: 72%; /* 36 / 50 */
    transform: none;
    pointer-events: none;
  }

  .stat {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .stat-balance {
    left: 0;
    width: 53.318078%;
  }

  .stat-bet {
    right: 0;
    width: 46.681922%;
  }

  .stat span {
    margin-bottom: 0.14em;
    color: #e4a3f5;
    font-size: clamp(6px, 0.68vw, 13px);
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 0.1em 0.2em rgba(31, 5, 48, 0.8);
  }

  .stat strong {
    color: #ffffff;
    font-size: clamp(8px, 0.95vw, 19px);
    font-weight: 900;
    white-space: nowrap;
    text-shadow: 0 0.1em 0.22em rgba(21, 2, 34, 0.9);
  }

  .total-win-panel {
    position: absolute;
    z-index: 4;
    top: 90.925926%; /* 982 / 1080 */
    left: 41.770833%; /* 802 / 1920 */
    width: 31.197917%; /* 599 / 1920 */
    aspect-ratio: 599 / 83;
  }

  .total-win-copy {
    position: absolute;
    z-index: 2;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.1%;
    padding-bottom: 0.4%;
    line-height: 1;
    text-transform: uppercase;
  }

  .total-win-copy span {
    color: #d96cff;
    font-size: clamp(9px, 1.25vw, 24px);
    font-weight: 950;
    text-shadow: 0 0 0.3em rgba(201, 53, 255, 0.65);
  }

  .total-win-copy strong {
    color: #ffffff;
    font-size: clamp(14px, 2.08vw, 40px);
    font-weight: 950;
    letter-spacing: -0.035em;
    text-shadow: 0 0.1em 0.2em rgba(24, 3, 37, 0.85);
  }

  .state-picker {
    position: absolute;
    z-index: 30;
    top: 1.2%;
    right: 1.2%;
    display: flex;
    align-items: center;
    gap: 0.45vw;
    padding: 0.38vw 0.5vw;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 0.45vw;
    background: rgba(29, 8, 46, 0.86);
    box-shadow: 0 0.35vw 0.8vw rgba(15, 2, 24, 0.35);
    backdrop-filter: blur(6px);
  }

  .state-picker span {
    color: #e1a8ff;
    font-size: clamp(7px, 0.65vw, 13px);
    font-weight: 800;
    text-transform: uppercase;
  }

  .state-picker select {
    max-width: 13vw;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.3vw;
    padding: 0.2vw 0.35vw;
    color: #ffffff;
    font-size: clamp(7px, 0.7vw, 14px);
    background: #3a1452;
  }

  .most-wanted-dimmed {
    opacity: 0.4;
  }

  .mobile-spin-button {
    display: none;
  }

  /*
   * BUY BONUS desktop.
   * Координаты сняты со скриншота 1920×1080:
   * x=134, y=497, размер=261×94.
   */
  .bonus-buy-button {
    z-index: 8;
    top: 46.018519%;
    left: 6.979167%;
    width: 13.59375%;
    aspect-ratio: 261 / 94;
  }

  .mobile-bonus-buy-image {
    display: none !important;
  }

  .desktop-bonus-buy-image {
    display: block;
  }

  .auto-spin-button {
    z-index: 8;
    top: 92.12963%; /* 995 / 1080 */
    left: 74.739583%; /* 1435 / 1920 */
    width: 3.75%; /* 72 / 1920 */
    aspect-ratio: 1;
  }

  .auto-spin-button.active {
    filter: brightness(1.3) drop-shadow(0 0 0.45vw rgba(216, 50, 255, 0.85));
  }

  .bet-button {
    z-index: 9;
    top: 84.074074%; /* 908 / 1080 */
    width: 3.177083%; /* 61 / 1920 */
    aspect-ratio: 1;
  }

  .decrease-button {
    left: 75.260417%; /* 1445 / 1920 */
  }

  .increase-button {
    left: 93.28125%; /* 1791 / 1920 */
  }

  .spin-button {
    z-index: 10;
    top: 75.925926%; /* 820 / 1080 */
    left: 79.53125%; /* 1527 / 1920 */
    width: 12.65625%; /* 243 / 1920 */
    aspect-ratio: 1;
  }

  .spin-button:hover:not(:disabled) {
    transform: scale(1.035);
    filter: brightness(1.1);
  }

  .spin-button:disabled {
    cursor: wait;
  }

  .spin-button.playing img,
  .mobile-spin-button.playing img {
    animation: spinControl 900ms linear infinite;
  }

  @keyframes scatterPulse {
    from {
      opacity: 0.62;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1.04);
    }
  }

  @keyframes reelBlur {
    0% {
      opacity: 0.72;
      transform: translateY(-2.5%) scaleY(1.04);
      filter: blur(0.08vw) brightness(1.04);
    }
    50% {
      opacity: 0.92;
      transform: translateY(2.5%) scaleY(1.08);
      filter: blur(0.18vw) brightness(1.16);
    }
    100% {
      opacity: 0.72;
      transform: translateY(-2.5%) scaleY(1.04);
      filter: blur(0.08vw) brightness(1.04);
    }
  }

  @keyframes spinControl {
    to {
      transform: rotate(360deg);
    }
  }


  /*
   * Desktop onboarding. The coordinates below are based on the supplied
   * 1920 × 1080 reference images, so the screen scales with the desktop
   * 16:9 canvas without changing its composition.
   */
  .onboarding-active .hero-character,
  .onboarding-active .main-stage,
  .onboarding-active .control-deck {
    visibility: hidden;
    pointer-events: none;
  }

  .onboarding-active .game-logo {
    z-index: 105;
    top: 4.166667%;
    left: 50%;
    width: 18.802083%;
    transform: translateX(-50%);
  }

  .onboarding-screen {
    position: absolute;
    z-index: 100;
    inset: 0;
    color: #ffffff;
    cursor: pointer;
    outline: none;
  }

  .onboarding-panel {
    position: absolute;
    top: 24.259259%;
    left: 10.416667%;
    width: 79.0625%;
    aspect-ratio: 1518 / 654;
    overflow: hidden;
  }

  .onboarding-panel-background {
    position: absolute;
    z-index: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .onboarding-copy {
    position: absolute;
    z-index: 4;
    top: 6.727829%;
    right: 4%;
    left: 4%;
    text-align: center;
    pointer-events: none;
  }

  .onboarding-copy h1,
  .onboarding-copy p {
    margin: 0;
    color: #ffffff;
    font-family: 'Gantari', Arial, Helvetica, sans-serif;
    font-style: normal;
    text-shadow: 0 0.08em 0.18em rgba(8, 2, 22, 0.32);
  }

  .onboarding-copy h1 {
    font-size: clamp(28px, 3.72vw, 72px);
    font-weight: 400;
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .onboarding-copy p {
    margin-top: 1.65%;
    font-size: clamp(17px, 2.08vw, 40px);
    font-weight: 300;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  .onboarding-art {
    position: absolute;
    z-index: 3;
    top: 31.8%;
    left: 50%;
    width: 44%;
    height: 45%;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .onboarding-art img {
    position: absolute;
    display: block;
    height: auto;
    object-fit: contain;
    pointer-events: none;
  }

  /*
   * FREE SPINS — положение по первому референсу.
   * Размер спрайта оставлен прежним, изменены только координаты.
   */
  .onboarding-free-spin {
    top: 22%;
    left: 52.4%;
    width: 34%;
    transform: translateX(-50%);
    filter: drop-shadow(0 0.3vw 0.4vw rgba(10, 1, 22, 0.34));
  }

  /*
   * ROAD RAGE.
   * Подвинул иконки под референс: GANG уходит правее и чуть выше,
   * COP остаётся слева, чтобы обе эмблемы читались раздельно.
   */
  .onboarding-cop {
    top: 9.5%;
    left: 50%;
    width: 34%;
    transform: translateX(-79%) rotate(-4deg);
    filter: drop-shadow(0 0.35vw 0.5vw rgba(3, 2, 24, 0.36));
  }

  .onboarding-gang {
    top: 8.8%;
    left: 50%;
    width: 34%;
    transform: translateX(-2%) rotate(4deg);
    filter: drop-shadow(0 0.35vw 0.5vw rgba(3, 2, 24, 0.36));
  }

  /*
   * MOST WANTED.
   *
   * Этот блок полностью переписан с нуля. Внутренняя система координат
   * совпадает с исходной onboarding-панелью 1518 × 654 из макета.
   * Размеры карточек и вложенных растровых ассетов заданы по их реальным
   * размерам: panel 267 × 96, star 89 × 91, icons 70 × 70,
   * cross 158 × 117.
   */
  .onboarding-art-most-wanted {
    inset: 0;
    width: 100%;
    height: 100%;
    transform: none;
  }

  .mw-composition {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }

  /*
   * Базовая карточка всегда имеет пропорции исходного mostwantedPanel.png.
   * Верхняя карточка отображается в размере 267 × 96 макетных пикселей.
   * Нижняя — та же карточка, равномерно уменьшенная до 72%.
   */
  .mw-card {
    position: absolute;
    width: 17.5889328063%; /* 267 / 1518 */
    aspect-ratio: 267 / 96;
    overflow: visible;
    transform-origin: 50% 50%;
    pointer-events: none;
  }

  /*
   * Макетные координаты верхней карточки:
   * left 664, top 314, rotate 23deg.
   *
   * После поворота её видимая рамка занимает примерно:
   * x 856–1139, y 528–720 на полном экране 1920 × 1080.
   */
  .mw-card-upper {
    z-index: 3;
    top: 48.0122324159%;  /* 314 / 654 */
    left: 43.7417654809%; /* 664 / 1518 */
    transform: rotate(23deg);
  }

  /*
   * Макетные координаты нижней карточки:
   * left 557, top 357, scale 0.72, rotate -15deg.
   *
   * После трансформации её видимая рамка занимает примерно:
   * x 789–993, y 609–726 на полном экране 1920 × 1080.
   */
  .mw-card-lower {
    z-index: 1;
    top: 54.5871559633%;  /* 357 / 654 */
    left: 36.6930171278%; /* 557 / 1518 */
    transform: rotate(-15deg) scale(0.72);
  }

  /*
   * Фоновая плашка. Сбрасываем все общие правила .onboarding-art img,
   * чтобы она не получала случайные размеры или смещения.
   */
  .mw-panel {
    position: absolute !important;
    z-index: 0;
    inset: 0 !important;
    display: block;
    width: 100% !important;
    height: 100% !important;
    max-width: none;
    object-fit: fill !important;
    transform: none !important;
    filter: none !important;
    pointer-events: none;
  }

  /*
   * Звезда: исходные 89 × 91 внутри карточки 267 × 96.
   * Обе карточки используют одну разметку, поэтому нижняя звезда
   * автоматически уменьшается и поворачивается вместе со своей плашкой.
   */
  .mw-star {
    position: absolute;
    z-index: 4;
    top: 2.0833333333%;   /* 2 / 96 */
    left: 2.9962546816%;  /* 8 / 267 */
    width: 33.3333333333%; /* 89 / 267 */
    aspect-ratio: 89 / 91;
    overflow: visible;
    pointer-events: none;
  }

  .mw-star > img {
    position: absolute !important;
    inset: 0 !important;
    display: block;
    width: 100% !important;
    height: 100% !important;
    max-width: none;
    object-fit: contain !important;
    transform: none !important;
    filter: none !important;
  }

  .mw-cop,
  .mw-gang {
    position: absolute !important;
    z-index: 3;
    top: 13.5416666667% !important; /* 13 / 96 */
    display: block;
    width: 26.2172284644% !important; /* 70 / 267 */
    height: auto !important;
    max-width: none;
    object-fit: contain !important;
    transform: none !important;
    filter: drop-shadow(0 0.08vw 0.11vw rgba(0, 0, 0, 0.3)) !important;
    pointer-events: none;
  }

  .mw-cop {
    left: 37.0786516854% !important; /* 99 / 267 */
  }

  .mw-gang {
    left: 63.6704119850% !important; /* 170 / 267 */
  }

  /*
   * Белый крест используется в родном размере 158 × 117.
   * Координаты в панели: left 612, top 348.
   */
  .mw-cross {
    position: absolute !important;
    z-index: 5;
    top: 53.2110091743% !important;  /* 348 / 654 */
    left: 40.3162055336% !important; /* 612 / 1518 */
    display: block;
    width: 10.4084321476% !important; /* 158 / 1518 */
    height: auto !important;
    max-width: none;
    object-fit: contain !important;
    transform: none !important;
    filter: drop-shadow(0 0.13vw 0.16vw rgba(4, 0, 20, 0.25)) !important;
    pointer-events: none;
  }

  .onboarding-art-car-theft {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: none;
  }

  .car-lock-composition {
    position: absolute;
    inset: 0;
  }

  /*
   * Exact positions measured from the supplied 1920 × 1080 reference.
   * All values are relative to the 1518 × 654 onboarding panel, so the
   * composition scales proportionally together with the desktop canvas.
   */
  .car-lock-ring {
    z-index: 2;
    top: 46.941896%;   /* 307 / 654 */
    left: 44.795784%;  /* 680 / 1518 */
    width: 10.869565%; /* 165 / 1518 */
    transform: none;
    filter: drop-shadow(0 0.32vw 0.45vw rgba(4, 0, 18, 0.38));
  }

  .car-lock-core {
    z-index: 4;
    top: 50.305810%;  /* 329 / 654 */
    left: 46.179183%; /* 701 / 1518 */
    width: 8.036890%; /* 122 / 1518 */
    transform: none;
  }

  .car-lock-picker {
    z-index: 5;
    top: 45.871560%;   /* 300 / 654 */
    left: 31.620553%;  /* 480 / 1518 */
    width: 19.301713%; /* 293 / 1518 */
    transform: none;
    transform-origin: center;
  }

  .car-lock-screwdriver {
    z-index: 6;
    top: 55.045872%;   /* 360 / 654 */
    left: 47.957839%;  /* 728 / 1518 */
    width: 20.816864%; /* 316 / 1518 */
    transform: none;
    transform-origin: center;
  }

  /*
   * Общие стрелки всех четырёх onboarding-страниц.
   * Координаты сняты с первого референса 1920 × 1080:
   * визуальные центры находятся примерно в x=739 и x=1181, y=661.
   */
  .onboarding-arrow {
    appearance: none;
    position: absolute;
    z-index: 8;
    top: 54.2%;
    display: grid;
    place-items: center;
    width: 5.8%;
    aspect-ratio: 1;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    transition: opacity 120ms ease, transform 120ms ease, filter 120ms ease;
  }

  .onboarding-arrow-left {
    left: 32.2%;
  }

  .onboarding-arrow-right {
    right: 32.2%;
  }

  .onboarding-arrow-icon {
    display: block;
    width: 61%;
    height: 61%;
    overflow: visible;
    color: #D9D9D9;
    fill: currentColor;
    filter: drop-shadow(0 0.16vw 0.2vw rgba(8, 2, 24, 0.3));
    pointer-events: none;
  }

  .onboarding-arrow-icon path {
    fill: currentColor;
  }

  .onboarding-arrow:not(:disabled):hover {
    transform: scale(1.08);
    filter: brightness(1.12);
  }

  .onboarding-arrow:not(:disabled):active {
    transform: scale(0.92);
  }

  .onboarding-arrow:disabled,
  .onboarding-arrow.disabled {
    cursor: default;
    opacity: 0.2;
  }

  /*
   * Общий слайдер всех четырёх страниц.
   * В референсе центры точек расположены с шагом около 47px,
   * а вся группа остаётся строго по центру панели.
   */
  .onboarding-dots {
    position: absolute;
    z-index: 9;
    bottom: 10.2%;
    left: 50%;
    display: flex;
    gap: 1.4vw;
    transform: translateX(-50%);
  }

  .onboarding-dots button {
    appearance: none;
    width: clamp(10px, 1.04vw, 20px);
    aspect-ratio: 1;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: rgba(217, 217, 217, 0.2);
    box-shadow: none;
    cursor: pointer;
    transition: transform 120ms ease, background 120ms ease;
  }

  .onboarding-dots button.active {
    background: #D9D9D9;
    transform: none;
  }

  .onboarding-continue {
    appearance: none;
    position: absolute;
    z-index: 110;
    top: 85.648148%; /* places the glyph fill at y ≈ 945 in the 1080px reference */
    left: 50%;
    width: 32.291667%; /* 620 / 1920 */
    aspect-ratio: 620 / 108;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    transform: translateX(-50%);
    transition: transform 120ms ease, filter 120ms ease;
  }

  .onboarding-continue-svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    filter: none;
    pointer-events: none;
  }

  .onboarding-continue-main-text {
    vector-effect: none;
    filter: none;
  }

  .onboarding-continue:hover {
    transform: translateX(-50%) scale(1.035);
    filter: brightness(1.06);
  }

  .onboarding-continue:active {
    transform: translateX(-50%) scale(0.965);
  }

  .onboarding-debug-button {
    appearance: none;
    position: absolute;
    z-index: 200;
    top: 1.2%;
    left: 1.2%;
    padding: 0.32vw 0.55vw;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 0.35vw;
    color: #ffffff;
    font-family: 'Jost', Arial, Helvetica, sans-serif;
    font-size: clamp(8px, 0.7vw, 14px);
    font-weight: 800;
    background: rgba(35, 8, 54, 0.82);
    cursor: pointer;
  }

  /*
   * Adaptive portrait mobile layout.
   *
   * Unlike the previous version, the whole 402 × 874 canvas is no longer
   * scaled as one image. Each visual group now has its own anchors:
   * - the desktop background covers the viewport and is cropped;
   * - the reel board is always centered and scaled proportionally;
   * - the character is anchored to the bottom and keeps its proportions;
   * - the lower bar stretches from left to right;
   * - controls and text remain undeformed.
   */


  /* Final fixed desktop BONUS BUY composition — 1920×1080 reference. */
  .bonus-buy-title {
    top: 10.45%;
    font-size: 3.15cqw;
  }

  .bonus-buy-bet-widget {
    top: 24.25%;
    width: 15.1%;
    height: 15.25%;
    min-width: 0;
    padding: 0.62cqw 0.82cqw 0.5cqw;
    box-sizing: border-box;
    border: 0.31cqw solid transparent;
    border-radius: 1.02cqw;
    background:
      linear-gradient(#f6f6f7, #f6f6f7) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 72%, #e4245b 100%) border-box;
  }

  .bonus-buy-bet-title {
    font-size: 1.42cqw;
  }

  .bonus-buy-bet-value {
    margin-top: 0.08cqw;
    font-size: 1.82cqw;
  }

  .bonus-buy-bet-actions {
    gap: 0.62cqw;
    margin-top: 0.38cqw;
  }

  .bonus-buy-small-action {
    min-width: 3.05cqw;
    padding: 0.27cqw 0.76cqw;
    border-radius: 0.48cqw;
    font-size: 1.45cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-balance-line {
    margin-top: 0.22cqw;
    font-size: 0.96cqw;
  }

  .bonus-buy-cards {
    left: 2.12%;
    right: 2.12%;
    top: 42.65%;
    bottom: 22.05%;
    grid-template-columns: repeat(6, 15.08%);
    justify-content: space-between;
    align-items: stretch;
  }

  .bonus-buy-cards .bonus-buy-card {
    height: 100%;
    min-height: 0;
    box-sizing: border-box;
    border: 0.31cqw solid transparent;
    border-radius: 1.02cqw;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 76%, #e4245b 100%) border-box;
    box-shadow: 0 0.72cqw 1.45cqw rgba(8, 4, 21, 0.24);
  }

  .bonus-buy-cards .bonus-buy-card-body {
    display: grid;
    grid-template-rows: 2.9cqw 4.05cqw minmax(0, 1fr) auto;
    align-items: start;
    justify-items: center;
    min-height: 0;
    padding: 0.82cqw 0.7cqw 0.42cqw;
  }

  .bonus-buy-cards .bonus-buy-card-body h2 {
    margin: 0;
    font-size: 1.08cqw;
    line-height: 1.04;
  }

  .bonus-buy-cards .bonus-buy-card-body p {
    margin: 0.42cqw 0 0;
    font-size: 0.81cqw;
    line-height: 1.15;
  }

  .bonus-buy-cards .bonus-buy-card-icons {
    align-self: stretch;
    min-height: 0;
    margin-top: 0.18cqw;
  }

  .bonus-buy-cards .bonus-buy-card-icons img {
    max-height: 6.25cqw;
  }

  .bonus-buy-cards .icons-bonus-road-featurespins .icon-fs {
    width: 4.75cqw;
    max-height: 5.75cqw;
  }

  .bonus-buy-cards .icons-road-rage-featurespins {
    gap: 0.08cqw;
  }

  .bonus-buy-cards .icons-road-rage-featurespins .icon-cop,
  .bonus-buy-cards .icons-road-rage-featurespins .icon-gang {
    width: 4.18cqw;
  }

  .bonus-buy-cards .icons-ride-or-crash-featurespins .icon-gang-solo {
    width: 4.55cqw;
  }

  .bonus-buy-cards .icons-bonus-road {
    gap: 0.12cqw;
  }

  .bonus-buy-cards .icons-bonus-road .icon-fs {
    width: 3.95cqw;
  }

  .bonus-buy-cards .icons-bonus-road .icon-lock {
    width: 4.1cqw;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins {
    min-height: 0;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lockpick {
    position: absolute;
    z-index: 1;
    width: 8.15cqw;
    transform: translate(-1.55cqw, -0.35cqw) rotate(0deg);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lock {
    position: absolute;
    z-index: 2;
    width: 4.25cqw;
    transform: translate(0.25cqw, 0.02cqw);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute;
    z-index: 3;
    width: 7.1cqw;
    transform: translate(1.75cqw, 0.48cqw) rotate(0deg);
  }

  .bonus-buy-cards .icons-the-big-score {
    gap: 0.05cqw;
  }

  .bonus-buy-cards .icons-the-big-score .icon-wild {
    width: 3.55cqw;
  }

  .bonus-buy-cards .icons-the-big-score .icon-gang {
    width: 4.05cqw;
  }

  .bonus-buy-cards .bonus-buy-card-price {
    padding-top: 0.22cqw;
    font-size: 1.38cqw;
  }

  .bonus-buy-cards .bonus-buy-card-action {
    min-height: 3.4cqw;
    font-size: 1.42cqw;
    border-radius: 0 0 0.67cqw 0.67cqw;
  }

  /* The confirmation card and confirmation panel use the same blue→pink contour. */
  .bonus-buy-card-confirm,
  .bonus-buy-confirm-panel {
    box-sizing: border-box;
    border-color: transparent;
    background:
      linear-gradient(#f6f6f7, #f6f6f7) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 74%, #e4245b 100%) border-box;
  }

  @media (orientation: portrait) and (max-width: 767px) {
    .game-shell {
      --mobile-panel-height: clamp(54px, 6.6dvh, 64px);
      --mobile-safe-bottom: env(safe-area-inset-bottom, 0px);
      --mobile-board-width: min(99.5vw, 51dvh, 470px);
    }

    /*
     * Use the wide desktop scene as a responsive crop. At the reference
     * 402 × 874 size, 16% shows the boat and the classic car behind the UI.
     */
    .desktop-adaptive-background,
    .desktop-scene-background {
      display: block;
    }

    .mobile-adaptive-background,
    .mobile-scene-background {
      display: none;
    }

    .adaptive-background {
      inset: -6%;
      width: 112%;
      height: 112%;
      object-fit: cover;
      object-position: 16% center;
      transform: scale(1.025);
      filter: blur(9px) brightness(0.72) saturate(0.98);
    }

    .adaptive-background-overlay {
      background:
        linear-gradient(to bottom, rgba(34, 21, 69, 0.14), transparent 24%),
        radial-gradient(circle at 50% 48%, transparent 40%, rgba(18, 5, 31, 0.24) 100%);
    }

    /*
     * The mobile canvas fills the real viewport. Children are positioned
     * independently instead of inheriting one global transform.
     */
    .game-canvas {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      aspect-ratio: auto;
      overflow: hidden;
      transform: none;
    }

    .scene-background {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 16% center;
      transform: scale(1.01);
      transform-origin: center;
    }

    .scene-shade {
      background:
        linear-gradient(to bottom, rgba(40, 26, 82, 0.08), transparent 26%),
        linear-gradient(to top, rgba(34, 6, 55, 0.13), transparent 31%);
    }

    /*
     * Top logo: centered, proportional and protected from notches.
     */
    .game-logo {
      top: max(calc(env(safe-area-inset-top, 0px) + 8px), 3.775dvh);
      left: 50%;
      width: clamp(156px, 44.527vw, 215px);
      height: auto;
      transform: translateX(-50%);
    }

    /*
     * Reel board: one proportional size, centered horizontally.
     * The height constraint keeps it from consuming compact screens.
     */
    .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 94px), 14.188dvh);
      left: 50%;
      width: var(--mobile-board-width);
      aspect-ratio: 959 / 942;
      transform: translateX(-50%);
    }

    /*
     * Character: proportional image anchored below the viewport, exactly
     * like the supplied reference where the legs continue behind the panel.
     */
    .hero-character {
      z-index: 6;
      top: auto;
      right: 0.75vw;
      bottom: clamp(-190px, -20dvh, -177px);
      left: auto;
      width: min(72.388vw, 41dvh, 360px);
      height: auto;
    }

    .chase-stack {
      top: max(calc(env(safe-area-inset-top, 0px) + 112px), 16dvh);
      right: 2vw;
      gap: clamp(4px, 1.2vw, 7px);
    }

    .chase-badge {
      min-width: clamp(58px, 16vw, 76px);
      padding: clamp(4px, 1vw, 6px) clamp(6px, 1.4vw, 8px);
      border-width: 1px;
      border-radius: clamp(7px, 1.6vw, 10px);
    }

    .chase-badge span {
      font-size: clamp(6px, 2vw, 9px);
    }

    .chase-badge strong {
      font-size: clamp(10px, 4vw, 18px);
    }

    .panel-background,
    .panel-stroke,
    .desktop-balance-bet-background,
    .desktop-balance-bet-divider {
      display: none;
    }

    .mobile-balance-bet-background,
    .mobile-balance-bet-divider {
      display: block;
    }

    /*
     * Stretchable lower bar. This raster is a simple horizontal gradient,
     * so independent horizontal stretching does not damage important edges.
     */
    .mobile-panel-background {
      position: absolute;
      z-index: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom));
      object-fit: fill;
      pointer-events: none;
    }

    /*
     * Panel controls are anchored to edges instead of to a reference canvas.
     */
    .music-button {
      top: auto;
      bottom: calc(var(--mobile-safe-bottom) + clamp(7px, 0.85dvh, 10px));
      left: clamp(10px, 3.2vw, 18px);
      width: clamp(29px, 8.1vw, 38px);
    }

    .sound-button {
      top: auto;
      bottom: calc(var(--mobile-safe-bottom) + clamp(7px, 0.85dvh, 10px));
      left: clamp(45px, 12.6vw, 61px);
      width: clamp(29px, 8.1vw, 38px);
    }

    .info-button {
      top: auto;
      right: clamp(10px, 3.2vw, 18px);
      bottom: calc(var(--mobile-safe-bottom) + clamp(7px, 0.85dvh, 10px));
      left: auto;
      width: clamp(30px, 8.35vw, 39px);
    }

    /*
     * Balance/bet sprite remains proportional and centered. Sized and placed
     * to match the reference bottom strip on mobile.
     */
    .balance-bet-panel {
      top: auto;
      bottom: calc(var(--mobile-safe-bottom) + clamp(2px, 0.3dvh, 5px));
      left: 55%;
      width: clamp(212px, 61.5vw, 278px);
      height: auto;
      aspect-ratio: 260 / 46;
      transform: translateX(-50%);
    }

    .mobile-balance-bet-background {
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .balance-bet-divider.mobile-balance-bet-divider {
      top: 13.043%;
      left: 58.846%;
      width: max(1px, 0.77%);
      height: 76.087%;
      object-fit: fill;
    }

    .stat-balance {
      left: 0;
      width: 58.846%;
    }

    .stat-bet {
      right: 0;
      width: 41.154%;
    }

    .stat {
      overflow: hidden;
      padding-inline: clamp(2px, 0.75vw, 4px);
    }

    .stat span,
    .stat strong {
      display: block;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      text-overflow: clip;
    }

    .stat span {
      margin-bottom: 1px;
      font-size: clamp(8px, 2.239vw, 10px);
      line-height: 1;
      letter-spacing: 0.02em;
    }

    .stat strong {
      font-size: clamp(13px, 3.731vw, 16px);
      line-height: 1;
      letter-spacing: 0;
    }

    .total-win-panel,
    .spin-button {
      display: none;
    }

    /*
     * BUY BONUS mobile. Kept near the left side of the playfield, above the
     * bottom control band and separate from the primary spin cluster.
     */
    .bonus-buy-button {
      z-index: 9;
      top: auto;
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(96px, 11.2dvh, 120px)
      );
      left: clamp(18px, 5.223881vw, 26px);
      display: grid;
      width: clamp(75px, 20.646766vw, 95px);
      aspect-ratio: 83 / 30;
    }

    .desktop-bonus-buy-image {
      display: none !important;
    }

    .mobile-bonus-buy-image {
      display: block !important;
    }

    /*
     * Mobile controls match the reference: auto-spin on the left, a large
     * central spin button, and bet +/- flanking the main spin button.
     */
    .auto-spin-button {
      z-index: 10;
      top: auto;
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(28px, 3.1dvh, 38px)
      );
      left: clamp(18px, 5vw, 28px);
      display: grid;
      width: clamp(42px, 11.3vw, 52px);
      aspect-ratio: 1;
    }

    .most-wanted-dimmed {
    opacity: 0.4;
  }

  .mobile-spin-button {
      z-index: 11;
      top: auto;
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(26px, 3.1dvh, 36px)
      );
      left: 50%;
      display: grid;
      width: clamp(90px, 24vw, 104px);
      aspect-ratio: 1;
      transform: translateX(-50%);
      transform-origin: center center;
    }

    .mobile-spin-button:hover:not(:disabled) {
      transform: translateX(-50%) scale(1.05);
    }

    .mobile-spin-button:active:not(:disabled) {
      transform: translateX(-50%) scale(0.95);
    }

    .bet-button {
      top: auto;
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(28px, 3.1dvh, 36px)
      );
      width: clamp(34px, 9.2vw, 40px);
      aspect-ratio: 1;
    }

    .decrease-button {
      left: calc(50% - clamp(104px, 26vw, 116px));
    }

    .increase-button {
      left: auto;
      right: calc(50% - clamp(104px, 26vw, 116px));
    }

    .state-picker {
      top: calc(env(safe-area-inset-top, 0px) + 8px);
      right: 8px;
      gap: 4px;
      padding: 4px 5px;
      border-radius: 6px;
    }

    .state-picker span,
    .state-picker select {
      font-size: clamp(7px, 2.2vw, 10px);
    }

    .state-picker select {
      max-width: 38vw;
      border-radius: 4px;
      padding: 3px 4px;
    }
  }

  /*
   * Extra-tall phones: show a little more of the left side of the desktop
   * scene and prevent the board from becoming disproportionately large.
   */
  @media (orientation: portrait) and (max-width: 767px) and (max-aspect-ratio: 9 / 20) {
    .game-shell {
      --mobile-board-width: min(99vw, 49dvh, 450px);
    }

    .adaptive-background,
    .scene-background {
      object-position: 13% center;
    }

    .hero-character {
      width: min(71vw, 39dvh, 350px);
    }
  }

  /*
   * Shorter / more square portrait screens: shrink and raise the upper
   * composition while keeping every raster sprite proportional.
   */
  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .game-shell {
      --mobile-board-width: min(96vw, 48dvh, 430px);
      --mobile-panel-height: clamp(50px, 6.2dvh, 58px);
    }

    .game-logo {
      top: max(calc(env(safe-area-inset-top, 0px) + 6px), 2.4dvh);
      width: clamp(145px, 40vw, 195px);
    }

    .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 82px), 12.8dvh);
    }

    .hero-character {
      right: -1vw;
      bottom: clamp(-190px, -19dvh, -177px);
      width: min(68vw, 38dvh, 330px);
    }

    .most-wanted-dimmed {
    opacity: 0.4;
  }

  .mobile-spin-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(22px, 2.5dvh, 28px)
      );
      width: clamp(86px, 22vw, 96px);
    }

    .auto-spin-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(24px, 2.7dvh, 30px)
      );
    }

    .bet-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(24px, 2.7dvh, 30px)
      );
    }
  }

  /*
   * Narrow devices: reserve more room around the central balance panel.
   */
  @media (orientation: portrait) and (max-width: 360px) {
    .balance-bet-panel {
      width: clamp(186px, 61vw, 220px);
    }

    .music-button,
    .sound-button {
      width: clamp(27px, 8vw, 32px);
    }

    .sound-button {
      left: clamp(42px, 13vw, 50px);
    }

    .info-button {
      width: clamp(29px, 8.4vw, 34px);
    }

    .stat span {
      font-size: clamp(7px, 2.15vw, 8px);
    }

    .stat strong {
      font-size: clamp(12px, 3.6vw, 14px);
    }
  }


  /*
   * DESKTOP INFO SCREEN — reference canvas 1920 × 1080.
   * This overlay is not rendered on the mobile layout.
   */
  .info-overlay {
    position: absolute;
    z-index: 300;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    color: #ffffff;
    font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif;
    container-type: size;
    outline: none;
  }

  .info-tint-background {
    position: absolute;
    z-index: 0;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: fill;
    pointer-events: none;
  }

  /*
   * panelbgInfo.png имеет исходный размер 1364 × 832.
   * Не растягиваем его независимо по двум осям: сохраняем родное
   * соотношение сторон и масштабируем относительно холста 1920 × 1080.
   */
  .info-panel-background {
    position: absolute !important;
    z-index: 1;
    top: 7.407407%;       /* 80 / 1080 */
    left: 50%;
    right: auto !important;
    bottom: auto !important;
    display: block;
    width: 71.041667%;    /* 1364 / 1920 */
    height: auto !important;
    max-width: none;
    max-height: 77.037037%; /* 832 / 1080 */
    aspect-ratio: 1364 / 832;
    object-fit: contain !important;
    object-position: center;
    transform: translateX(-50%) !important;
    pointer-events: none;
  }

  .info-page {
    position: absolute;
    z-index: 3;
    inset: 0;
    pointer-events: none;
  }

  .info-page h1 {
    position: absolute;
    top: 14.35%;
    left: 18.65%;
    margin: 0;
    color: #ffffff;
    font-size: 4.16cqw;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.035em;
    text-shadow: 0 0.07em 0.14em rgba(3, 1, 27, 0.28);
  }

  .info-close-button {
    appearance: none;
    position: absolute;
    z-index: 10;
    top: 12.28%;
    right: 15.72%;
    width: 3.28%;
    aspect-ratio: 1;
    margin: 0;
    padding: 0;
    border: 3px solid #ffffff;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: transform 120ms ease;
  }

  .info-close-button::before,
  .info-close-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 3px;
    border-radius: 2px;
    background: #ffffff;
    transform-origin: center;
  }

  .info-close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .info-close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .info-close-button:hover {
    transform: scale(1.06);
  }

  .info-close-button:active {
    transform: scale(0.95);
  }

  /*
   * Навигационные стрелки INFO-экрана.
   * Подогнаны под референс: те же пропорции и те же смещения,
   * что на дизайне — компактные светло-серые треугольники внизу справа.
   */
  /*
   * INFO navigation — copied from the supplied 1920 × 1080 design.
   * The group uses the full game-canvas coordinate system:
   * left triangle visual bounds ≈ x1469..1512;
   * right triangle visual bounds ≈ x1572..1615;
   * y ≈ 857..904.
   */
  .info-navigation {
    position: absolute;
    z-index: 10;
    right: 15.625%;  /* button right edge at x1620 */
    bottom: 16.203704%; /* button bottom edge at y905 */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2.65625cqw; /* 51px button gap; 60px between visible triangles */
    width: auto;
    height: auto;
    transform: none;
    pointer-events: none;
  }

  .info-arrow {
    appearance: none;
    position: relative;
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 2.708333cqw; /* 52px */
    aspect-ratio: 1;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    transition: opacity 120ms ease, transform 120ms ease, filter 120ms ease;
  }

  .info-arrow-left,
  .info-arrow-right {
    right: auto;
    bottom: auto;
  }

  .info-arrow svg {
    display: block;
    width: 61%;
    height: 61%;
    overflow: visible;
    color: #d9d9d9;
    fill: currentColor;
    filter: drop-shadow(0 0.16vw 0.2vw rgba(8, 2, 24, 0.3));
    pointer-events: none;
  }

  .info-arrow svg path {
    fill: currentColor;
  }

  .info-arrow:hover:not(:disabled) {
    transform: scale(1.08);
    filter: brightness(1.12);
  }

  .info-arrow:active:not(:disabled) {
    transform: scale(0.92);
  }

  .info-arrow:disabled,
  .info-arrow.disabled {
    cursor: default;
    opacity: 0.2;
  }

  /* GAME RULES */

  .info-rules-copy {
    position: absolute;
    top: 27.15%;
    left: 18.75%;
    width: 65%;
    font-size: 2.02cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.018em;
  }

  .info-rules-copy p,
  .info-rules-copy h2,
  .info-rules-copy ul {
    margin: 0;
  }

  .info-rules-copy h2 {
    margin-top: 2.45%;
    margin-bottom: 0.5%;
    font-size: 1em;
    font-weight: 300;
  }

  .info-rules-copy ul {
    padding-left: 3.25%;
    list-style-position: outside;
  }

  .info-rules-copy li {
    padding-left: 0.7%;
  }

  /* PAYTABLE */

  /*
   * PAYTABLE — exact desktop composition from the supplied 1920 × 1080
   * reference. The previous CSS grids were removed because their distributed
   * column widths changed the visual spacing. Every symbol now has its own
   * fixed centre inside the 16:9 game canvas.
   */
  .paytable-row {
    position: absolute;
    inset: 0;
    display: block;
    pointer-events: none;
  }

  .paytable-item {
    position: absolute;
    width: 8.333333cqw; /* 160px on the 1920px reference */
    min-width: 0;
    transform: translateX(-50%);
  }

  .paytable-row-top .paytable-item {
    top: 27.962963%; /* 302 / 1080 */
  }

  .paytable-row-bottom .paytable-item {
    top: 57.314815%; /* 619 / 1080 */
  }

  /* Top row centres: 648, 852, 1056 and 1260px. */
  .paytable-item-top-1 {
    left: 33.75%;
  }

  .paytable-item-top-2 {
    left: 44.375%;
  }

  .paytable-item-top-3 {
    left: 55%;
  }

  .paytable-item-top-4 {
    left: 65.625%;
  }

  /* Bottom row centres: 550, 755, 960, 1165 and 1370px. */
  .paytable-item-bottom-1 {
    left: 28.645833%;
  }

  .paytable-item-bottom-2 {
    left: 39.322917%;
  }

  .paytable-item-bottom-3 {
    left: 50%;
  }

  .paytable-item-bottom-4 {
    left: 60.677083%;
  }

  .paytable-item-bottom-5 {
    left: 71.354167%;
  }

  .paytable-symbol {
    display: grid;
    place-items: center;
    width: 100%;
    height: 12.314815cqh; /* 133px */
  }

  .paytable-symbol img {
    display: block;
    width: auto;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .paytable-values {
    position: absolute;
    top: 14.166667cqh; /* 153px below the item origin */
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.37037cqh; /* 4px */
    margin: 0;
    color: #ffffff;
    font-family: 'Gantari', Arial, Helvetica, sans-serif;
    font-size: 1.041667cqw; /* 20px */
    font-weight: 300;
    line-height: 1.2;
    white-space: nowrap;
    transform: translateX(-50%);
  }

  .paytable-values span {
    display: block;
    font-family: 'Gantari', Arial, Helvetica, sans-serif;
    font-weight: 300;
  }

  .paytable-values strong {
    font-family: 'Gantari', Arial, Helvetica, sans-serif;
    font-weight: 800;
  }

  .info-paytable-divider {
    position: absolute;
    top: 52.65%;
    left: 30.35%;
    display: block;
    width: 40.36%;
    height: auto;
    object-fit: fill;
  }

  /* SPECIAL SYMBOLS */

  .special-symbol {
    position: absolute;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 1.46cqw;
    font-weight: 300;
    line-height: 1.27;
    letter-spacing: -0.012em;
  }

  .special-symbol img {
    display: block;
    flex: 0 0 auto;
    object-fit: contain;
  }

  .special-symbol p {
    margin: 0;
  }

  .special-symbol-wild {
    top: 30%;
    left: 20.3%;
    width: 33%;
  }

  .special-symbol-wild img {
    width: 8.5cqw;
    margin-right: 1.4cqw;
  }

  .special-symbol-scatter {
    top: 28.3%;
    left: 50.9%;
    width: 31%;
  }

  .special-symbol-scatter img {
    width: 9.7cqw;
    margin-right: 1.25cqw;
  }

  .special-symbol-divider {
    position: absolute;
    top: 52.05%;
    left: 30.4%;
    width: 40.36%;
    height: auto;
    object-fit: fill;
  }

  .special-symbol-cop {
    top: 58.2%;
    left: 19.5%;
    width: 34%;
  }

  .special-symbol-cop img {
    width: 9.3cqw;
    margin-right: 1.5cqw;
  }

  .special-symbol-gang {
    top: 58.5%;
    left: 50.5%;
    width: 31%;
  }

  .special-symbol-gang img {
    width: 9.5cqw;
    margin-right: 1.15cqw;
  }

  /* VERTICAL CHASE */

  .vertical-chase-description {
    position: absolute;
    top: 25.6%;
    left: 18.7%;
    margin: 0;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.012em;
  }

  .vertical-chase-strips {
    position: absolute;
    top: 37.25%;
    left: 30.65%;
    display: grid;
    grid-template-columns: repeat(5, 4.74cqw);
    column-gap: 3.55cqw;
    align-items: start;
  }

  .vertical-chase-strips img,
  .chase-info-strips img {
    display: block;
    width: 4.74cqw;
    height: 40.28cqh;
    max-width: none;
    object-fit: fill;
  }

  /* COP / GANG CHASE */

  .chase-info-copy {
    position: absolute;
    top: 36.2%;
    left: 18.7%;
    width: 34%;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 300;
    line-height: 1.29;
    letter-spacing: -0.012em;
  }

  .chase-info-copy p,
  .chase-info-copy ul {
    margin: 0 0 1.8cqh;
  }

  .chase-info-copy ul {
    padding-left: 2.2cqw;
  }

  .chase-info-copy li {
    padding-left: 0.4cqw;
    margin-bottom: 0.55cqh;
  }

  .chase-info-copy .empty-chase-bullet {
    margin-top: -0.4cqh;
    margin-bottom: -0.2cqh;
  }

  .gang-chase-copy {
    top: 29.5%;
    width: 35%;
  }

  .gang-chase-copy p {
    margin-bottom: 2.75cqh;
  }

  .chase-info-strips {
    position: absolute;
    top: 31.9%;
    left: 54.75%;
    display: grid;
    grid-template-columns: repeat(3, 4.74cqw);
    column-gap: 3.85cqw;
    align-items: start;
  }

  /* ---------------------------------------------------------------------- */
  /* PAGE 7 — THE GAMBLE MINI-GAME                                          */
  /* ---------------------------------------------------------------------- */

  .gamble-page-title {
    white-space: nowrap;
  }

  .gamble-page-copy {
    position: absolute;
    top: 34.15%;
    left: 23.35%;
    width: 31.8%;
    color: #ffffff;
    font-size: 1.46cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.012em;
  }

  .gamble-page-copy p,
  .gamble-page-copy ul {
    margin: 0;
  }

  .gamble-page-copy ul {
    margin-top: 0.35cqh;
    padding-left: 2.15cqw;
  }

  .gamble-page-copy li {
    padding-left: 0.4cqw;
    margin-bottom: 0.55cqh;
  }

  .gamble-page-icons {
    position: absolute;
    top: 25.55%;
    left: 56.65%;
    display: block;
    width: 18.073%;
    height: auto;
    max-width: none;
    object-fit: contain;
  }

  /* ---------------------------------------------------------------------- */
  /* PAGE 8 — LINES                                                         */
  /* ---------------------------------------------------------------------- */

  .lines-patterns {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(7, 7.42cqw);
    column-gap: 1.17cqw;
  }

  .lines-patterns-top {
    top: 33%;
    left: 20.95%;
  }

  .lines-patterns-middle {
    top: 49.35%;
    left: 20.95%;
  }

  .lines-patterns-bottom {
    top: 65.65%;
    left: 30.02%;
    grid-template-columns: repeat(5, 7.42cqw);
  }

  .lines-patterns img {
    display: block;
    width: 7.42cqw;
    aspect-ratio: 1;
    max-width: none;
    object-fit: contain;
  }

  /* ---------------------------------------------------------------------- */
  /* PAGE 9 — BONUS MODES OVERVIEW                                          */
  /* ---------------------------------------------------------------------- */

  .bonus-mode {
    position: absolute;
    display: flex;
    align-items: flex-start;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.012em;
  }

  .bonus-mode-copy h2,
  .bonus-mode-copy ul {
    margin: 0;
  }

  .bonus-mode-copy h2 {
    font-size: 1em;
    font-weight: 300;
    white-space: nowrap;
  }

  .bonus-mode-copy ul {
    padding-left: 2.05cqw;
  }

  .bonus-mode-icons {
    position: relative;
    flex: 0 0 auto;
  }

  .bonus-mode-icons img {
    position: absolute;
    display: block;
    object-fit: contain;
  }

  .bonus-mode-road {
    top: 31.2%;
    left: 20.1%;
    width: 31%;
  }

  .bonus-mode-icons-road {
    width: 7.25cqw;
    height: 15cqh;
    margin-right: 1.55cqw;
  }

  .bonus-mode-icons-road img {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .bonus-mode-rage {
    top: 31.2%;
    left: 50.55%;
    width: 31%;
  }

  .bonus-mode-icons-rage {
    width: 7.8cqw;
    height: 15cqh;
    margin-right: 1.3cqw;
  }

  .bonus-mode-icons-rage img:first-child {
    top: -0.8cqh;
    left: 0;
    width: 66%;
  }

  .bonus-mode-icons-rage img:last-child {
    top: 6.5cqh;
    right: 0;
    width: 66%;
  }

  .bonus-modes-divider {
    position: absolute;
    top: 52.1%;
    left: 30.35%;
    width: 40.36%;
    height: auto;
    object-fit: fill;
  }

  .bonus-mode-crash {
    top: 59.5%;
    left: 19.4%;
    width: 31%;
  }

  .bonus-mode-icons-crash {
    width: 8.35cqw;
    height: 14cqh;
    margin-right: 1.45cqw;
  }

  .bonus-mode-icons-crash img {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .bonus-mode-lock {
    top: 56.4%;
    left: 50.4%;
    width: 32%;
  }

  .bonus-mode-icons-lock {
    width: 8.65cqw;
    height: 15.5cqh;
    margin-right: 1.25cqw;
  }

  .bonus-mode-icons-lock img {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* ---------------------------------------------------------------------- */
  /* PAGE 10 — THE BIG SCORE                                                */
  /* ---------------------------------------------------------------------- */

  .big-score-art-row,
  .most-wanted-page-content {
    display: contents;
  }

  .big-score-composition {
    position: absolute;
    top: 43.7%;
    left: 20.4%;
    width: 61.5%;
    height: 23%;
  }

  .big-score-wild,
  .big-score-gang {
    position: absolute;
    display: block;
    object-fit: contain;
  }

  .big-score-wild {
    top: 0;
    left: 0;
    width: 7.15cqw;
  }

  .big-score-gang {
    top: 8.1cqh;
    left: 4.35cqw;
    width: 7.55cqw;
  }

  .big-score-copy {
    position: absolute;
    top: 0.9cqh;
    left: 10.55cqw;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.012em;
  }

  .big-score-copy h2,
  .big-score-copy ul {
    margin: 0;
  }

  .big-score-copy h2 {
    font-size: 1em;
    font-weight: 300;
  }

  .big-score-copy ul {
    padding-left: 2.05cqw;
  }

  /* ---------------------------------------------------------------------- */
  /* PAGE 11 — MOST WANTED + THE BIG SCORE                                  */
  /* ---------------------------------------------------------------------- */

  .most-wanted-mode {
    position: absolute;
    top: 28.7%;
    left: 21.3%;
    width: 59.5%;
    height: 24%;
  }

  .most-wanted-mode-fs {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 7.25cqw;
    height: auto;
    object-fit: contain;
  }

  .most-wanted-mode-copy {
    position: absolute;
    top: 0.1cqh;
    left: 8.8cqw;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 300;
    line-height: 1.28;
    letter-spacing: -0.012em;
  }

  .most-wanted-mode-copy h2,
  .most-wanted-mode-copy ul {
    margin: 0;
  }

  .most-wanted-mode-copy h2 {
    font-size: 1em;
    font-weight: 300;
  }

  .most-wanted-mode-copy ul {
    padding-left: 2.05cqw;
  }

  .most-wanted-mode-icons {
    position: absolute;
    top: 15.15cqh;
    left: 8.6cqw;
    display: block;
    width: 43.073cqw;
    height: auto;
    object-fit: contain;
  }

  .most-wanted-mode-divider {
    position: absolute;
    top: 55.35%;
    left: 30.35%;
    width: 40.36%;
    height: auto;
    object-fit: fill;
  }

  .big-score-composition-lower {
    top: 61.1%;
    left: 20.4%;
  }

  /*
   * MOBILE INFO SCREEN
   * Reference viewport: 402 × 874.
   *
   * The background layers stretch independently because they are gradients.
   * Symbols, columns, line diagrams and text retain their own proportions and
   * are anchored separately for every page.
   */
  @media (orientation: portrait) and (max-width: 767px) {
    .info-overlay {
      position: absolute;
      z-index: 500;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      min-height: 100%;
      overflow: hidden;
      overscroll-behavior: none;
      touch-action: none;
      container-type: size;
    }

    .info-tint-background {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    /*
     * panelbgInfo is a smooth dark-to-purple backdrop, so it may safely be
     * stretched to the mobile viewport without deforming meaningful artwork.
     */
    /*
     * INFO-панель занимает пространство строго от верхней границы экрана
     * до верхней границы mobilePanelBG.
     */
    .info-panel-background {
      position: absolute !important;
      z-index: 1;
      top: 0;
      left: 0;
      right: 0 !important;
      bottom: auto !important;
      display: block;
      width: 100%;
      height: calc(
        100% -
        var(--mobile-panel-height) -
        var(--mobile-safe-bottom)
      ) !important;
      max-width: none;
      max-height: none;
      aspect-ratio: auto;
      object-fit: fill !important;
      object-position: center;
      border-radius: 0;
      transform: none !important;
      box-shadow: 0 0 22px rgba(5, 0, 28, 0.34);
    }

    .info-page {
      position: absolute;
      z-index: 3;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /*
     * Desktop line breaks are layout hints for 1920px. On mobile the text is
     * allowed to wrap naturally inside its own anchored text box.
     */
    .info-overlay br {
      display: none;
    }

    .info-page h1 {
      top: max(calc(env(safe-area-inset-top, 0px) + 28px), 5.2%);
      left: 6.7%;
      right: 17%;
      width: auto;
      margin: 0;
      font-size: clamp(31px, 10.2vw, 43px);
      font-weight: 400;
      line-height: 0.98;
      letter-spacing: -0.035em;
      text-wrap: balance;
    }

    .info-page-vertical-chase h1,
    .info-page-gamble-mini-game h1 {
      top: max(calc(env(safe-area-inset-top, 0px) + 30px), 5.35%);
      font-size: clamp(27px, 7.7vw, 34px);
      line-height: 1.02;
      white-space: normal;
    }

    .info-page-bonus-modes-overview h1,
    .info-page-bonus-modes-big-score h1,
    .info-page-bonus-modes-most-wanted h1 {
      font-size: clamp(32px, 9.7vw, 41px);
      white-space: nowrap;
    }

    .info-close-button {
      top: max(calc(env(safe-area-inset-top, 0px) + 18px), 3.1%);
      right: 4.4%;
      width: clamp(40px, 11.2vw, 47px);
      border-width: 2px;
    }

    .info-close-button::before,
    .info-close-button::after {
      width: 47%;
      height: 2px;
    }

    /*
     * Mobile navigation stays accessible at the lower left and right corners.
     * Each raster/text composition ends above this safe navigation zone.
     */
    /*
     * Нижней границей INFO-страницы считается верх mobilePanelBG.
     * Стрелки отталкиваются от этой границы, а не от низа экрана.
     */
    .info-navigation {
      position: absolute;
      z-index: 12;
      right: 0;
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        10px
      );
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0;
      width: 100%;
      height: auto;
      padding: 0 17px;
      transform: none;
      pointer-events: none;
    }

    .info-arrow {
      position: relative;
      flex: 0 0 auto;
      width: clamp(45px, 12.5vw, 54px);
      aspect-ratio: 1;
      pointer-events: auto;
    }

    .info-arrow svg {
      width: 72%;
      height: 62%;
      filter: drop-shadow(0 1px 2px rgba(8, 2, 24, 0.35));
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 1 — GAME RULES                                               */
    /* ------------------------------------------------------------------ */

    .info-rules-copy {
      top: 15.2%;
      left: 7%;
      width: 86%;
      font-size: clamp(14px, 4.05vw, 17px);
      font-weight: 300;
      line-height: 1.3;
      letter-spacing: -0.012em;
    }

    .info-rules-copy h2 {
      margin-top: 20px;
      margin-bottom: 5px;
      font-size: 1.04em;
    }

    .info-rules-copy ul {
      padding-left: 22px;
    }

    .info-rules-copy li {
      padding-left: 3px;
      margin-bottom: 5px;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 2 — PAYTABLE                                                 */
    /* ------------------------------------------------------------------ */

    .info-page-paytable h1 {
      top: max(calc(env(safe-area-inset-top, 0px) + 27px), 5%);
    }

    .paytable-row {
      position: absolute;
      inset: 0;
      display: block;
    }

    .paytable-item {
      position: absolute;
      width: min(32vw, 134px);
      transform: translateX(-50%);
    }

    /*
     * PAYTABLE mobile.
     *
     * Важно: здесь используются селекторы с той же или большей
     * специфичностью, чем у desktop-правил `.paytable-row-* .paytable-item`.
     * Ранее `top: auto` перекрывал координаты отдельных элементов, поэтому
     * все девять иконок складывались друг на друга у верхней границы.
     */
    .paytable-row-top .paytable-item-top-1,
    .paytable-row-top .paytable-item-top-2,
    .paytable-row-top .paytable-item-top-3 {
      top: 19%;
    }

    .paytable-row-top .paytable-item-top-4,
    .paytable-row-bottom .paytable-item-bottom-1,
    .paytable-row-bottom .paytable-item-bottom-2 {
      top: 43.8%;
    }

    .paytable-row-bottom .paytable-item-bottom-3,
    .paytable-row-bottom .paytable-item-bottom-4,
    .paytable-row-bottom .paytable-item-bottom-5 {
      top: 68.6%;
    }

    .paytable-item-top-1,
    .paytable-item-top-4,
    .paytable-item-bottom-3 {
      left: 17.5%;
    }

    .paytable-item-top-2,
    .paytable-item-bottom-1,
    .paytable-item-bottom-4 {
      left: 50%;
    }

    .paytable-item-top-3,
    .paytable-item-bottom-2,
    .paytable-item-bottom-5 {
      left: 82.5%;
    }

    .paytable-symbol {
      width: 100%;
      height: clamp(86px, 23.5vw, 102px);
    }

    .paytable-symbol img {
      width: auto;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .paytable-values {
      top: clamp(93px, 25.5vw, 110px);
      left: 50%;
      gap: clamp(2px, 0.55vw, 3px);
      font-size: clamp(11.5px, 3.3vw, 14px);
      line-height: 1.17;
      transform: translateX(-50%);
    }

    .info-paytable-divider {
      display: none;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 3 — SPECIAL SYMBOLS                                          */
    /* ------------------------------------------------------------------ */

    .special-symbol {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 43%;
      color: #ffffff;
      font-size: clamp(11px, 3.25vw, 14px);
      line-height: 1.2;
      text-align: center;
    }

    .special-symbol p {
      width: 100%;
      margin: 7px 0 0;
    }

    .special-symbol-wild,
    .special-symbol-scatter {
      top: 15.2%;
    }

    .special-symbol-cop,
    .special-symbol-gang {
      top: 51.7%;
    }

    .special-symbol-wild,
    .special-symbol-cop {
      left: 4.6%;
    }

    .special-symbol-scatter,
    .special-symbol-gang {
      left: 52.4%;
    }

    .special-symbol-wild img,
    .special-symbol-scatter img,
    .special-symbol-cop img,
    .special-symbol-gang img {
      width: auto;
      height: clamp(101px, 28vw, 122px);
      margin: 0;
      object-fit: contain;
    }

    .special-symbol-divider {
      display: none;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 4 — VERTICAL CHASE                                           */
    /* ------------------------------------------------------------------ */

    .vertical-chase-description {
      top: 14.4%;
      left: 7%;
      width: 86%;
      font-size: clamp(13px, 3.7vw, 15.5px);
      line-height: 1.28;
      text-align: left;
    }

    .vertical-chase-strips {
      top: 28.5%;
      left: 50%;
      display: flex;
      grid-template-columns: none;
      column-gap: 0;
      align-items: flex-start;
      justify-content: center;
      gap: 1.35vw;
      width: 92%;
      transform: translateX(-50%);
    }

    .vertical-chase-strips img {
      width: min(16.6vw, 69px);
      height: auto;
      max-height: 55dvh;
      object-fit: contain;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 5 — COP CHASE                                                */
    /* ------------------------------------------------------------------ */

    .info-page-cop-chase .chase-info-copy {
      top: 14.5%;
      left: 7%;
      width: 86%;
      font-size: clamp(13px, 3.7vw, 15.5px);
      line-height: 1.25;
    }

    .info-page-cop-chase .chase-info-copy p,
    .info-page-cop-chase .chase-info-copy ul {
      margin-bottom: 12px;
    }

    .chase-info-copy .empty-chase-bullet {
      display: none;
    }

    .info-page-cop-chase .chase-info-strips {
      top: 48.7%;
      left: 50%;
      display: flex;
      grid-template-columns: none;
      column-gap: 0;
      justify-content: center;
      gap: 5vw;
      width: 92%;
      transform: translateX(-50%);
    }

    .info-page-cop-chase .chase-info-strips img {
      width: min(16vw, 67px);
      height: auto;
      object-fit: contain;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 6 — GANG CHASE                                               */
    /* ------------------------------------------------------------------ */

    .info-page-gang-chase .gang-chase-copy {
      top: 13.8%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(11.4px, 3.25vw, 13.5px);
      line-height: 1.22;
    }

    .info-page-gang-chase .gang-chase-copy p {
      margin-bottom: 11px;
    }

    .info-page-gang-chase .chase-info-strips {
      top: 48.7%;
      left: 50%;
      display: flex;
      grid-template-columns: none;
      column-gap: 0;
      justify-content: center;
      gap: 8vw;
      width: 82%;
      transform: translateX(-50%);
    }

    .info-page-gang-chase .chase-info-strips img {
      width: min(16vw, 67px);
      height: auto;
      object-fit: contain;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 7 — GAMBLE MINI-GAME                                         */
    /* ------------------------------------------------------------------ */

    .gamble-page-copy {
      top: 14.2%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(11.2px, 3.18vw, 13.4px);
      line-height: 1.22;
    }

    .gamble-page-copy ul {
      margin-top: 3px;
      padding-left: 19px;
    }

    .gamble-page-copy li {
      padding-left: 2px;
      margin-bottom: 4px;
    }

    .gamble-page-icons {
      top: 35.8%;
      left: 50%;
      width: min(67vw, 278px);
      height: auto;
      transform: translateX(-50%);
      object-fit: contain;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 8 — LINES                                                    */
    /* ------------------------------------------------------------------ */

    .lines-patterns {
      left: 5%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      grid-template-columns: none;
      column-gap: 0;
      width: 90%;
      gap: 2.1vw;
    }

    .lines-patterns-top {
      top: 15.5%;
    }

    .lines-patterns-middle {
      top: 41.5%;
    }

    .lines-patterns-bottom {
      top: 67.5%;
    }

    .lines-patterns img {
      width: min(15.7vw, 66px);
      aspect-ratio: 1;
      object-fit: contain;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 9 — BONUS MODES OVERVIEW                                     */
    /* ------------------------------------------------------------------ */

    .bonus-mode {
      left: 6%;
      display: flex;
      align-items: center;
      width: 88%;
      height: 16.5%;
      font-size: clamp(10.8px, 3.12vw, 13px);
      line-height: 1.19;
    }

    .bonus-mode-copy {
      flex: 1 1 auto;
      min-width: 0;
    }

    .bonus-mode-copy h2 {
      font-size: 1em;
      line-height: 1.1;
      white-space: normal;
    }

    .bonus-mode-copy ul {
      margin-top: 3px;
      padding-left: 18px;
    }

    .bonus-mode-road {
      top: 13.8%;
    }

    .bonus-mode-rage {
      top: 32.2%;
    }

    .bonus-mode-crash {
      top: 50.6%;
    }

    .bonus-mode-lock {
      top: 69%;
    }

    .bonus-mode-icons-road,
    .bonus-mode-icons-rage,
    .bonus-mode-icons-crash,
    .bonus-mode-icons-lock {
      flex: 0 0 26vw;
      width: 26vw;
      height: 100%;
      margin-right: 2.8vw;
    }

    .bonus-mode-icons-road img {
      inset: 4% 0 auto;
      width: 100%;
      height: 100%;
    }

    .bonus-mode-icons-rage img:first-child {
      top: 1%;
      left: 2%;
      width: 62%;
    }

    .bonus-mode-icons-rage img:last-child {
      top: 43%;
      right: 1%;
      width: 62%;
    }

    .bonus-mode-icons-crash img {
      inset: 2% 0 auto;
      width: 100%;
      height: 100%;
    }

    .bonus-mode-icons-lock img {
      inset: 1% 0 auto;
      width: 94%;
      height: 94%;
    }

    .bonus-modes-divider {
      display: none;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 10 — THE BIG SCORE                                           */
    /* ------------------------------------------------------------------ */

    .big-score-composition {
      top: 12.6%;
      left: 3%;
      width: 94%;
      height: 73%;
    }

    .big-score-wild {
      top: 1.5%;
      left: 8%;
      width: min(35vw, 142px);
    }

    .big-score-gang {
      top: 7.2%;
      left: 31%;
      width: min(45vw, 182px);
    }

    .big-score-copy {
      top: 34%;
      left: 0;
      width: 100%;
      font-size: clamp(12.8px, 3.75vw, 15px);
      line-height: 1.22;
    }

    .big-score-copy h2 {
      margin-bottom: 5px;
      font-size: 1.02em;
      line-height: 1.06;
      letter-spacing: 0;
    }

    .big-score-copy ul {
      margin-top: 2px;
      padding-left: 15px;
    }

    /* ------------------------------------------------------------------ */
    /* PAGE 11 — MOST WANTED + BIG SCORE                                 */
    /* ------------------------------------------------------------------ */

    .most-wanted-mode {
      top: 29%;
      left: 4%;
      width: 92%;
      height: 41.8%;
    }

    .most-wanted-mode-fs {
      top: 0.2%;
      left: 0;
      width: min(24vw, 94px);
    }

    .most-wanted-mode-copy {
      top: 0;
      left: 24%;
      width: 76%;
      font-size: clamp(10.8px, 3.05vw, 12.2px);
      line-height: 1.2;
    }

    .most-wanted-mode-copy h2 {
      font-size: 0.96em;
      line-height: 1.06;
      white-space: normal;
      margin-bottom: 3px;
    }

    .most-wanted-mode-copy ul {
      margin-top: 2px;
      padding-left: 14px;
    }

    .most-wanted-mode-icons {
      top: 28.4%;
      left: 0;
      width: 104%;
      height: auto;
      transform: translateX(-2%);
    }

    .most-wanted-mode-divider {
      top: 49.7%;
      left: 8%;
      width: 84%;
    }

    .big-score-composition-lower {
      top: 52.2%;
      left: 4%;
      width: 92%;
      height: 27.6%;
    }

    .big-score-composition-lower .big-score-wild {
      top: 1%;
      left: 0;
      width: min(22vw, 88px);
    }

    .big-score-composition-lower .big-score-gang {
      top: 24%;
      left: 3%;
      width: min(19vw, 74px);
    }

    .big-score-composition-lower .big-score-copy {
      top: 0;
      left: 18%;
      width: 82%;
      font-size: clamp(10.7px, 3.02vw, 12px);
      line-height: 1.2;
    }

    .big-score-composition-lower .big-score-copy h2 {
      font-size: 0.96em;
      line-height: 1.05;
      margin-bottom: 2px;
    }

    .big-score-composition-lower .big-score-copy ul {
      margin-top: 2px;
      padding-left: 14px;
    }
  }

  /*
   * Extra-tall mobile screens: use the additional height for larger central
   * art without changing its aspect ratio.
   */
  @media (orientation: portrait) and (max-width: 767px) and (max-aspect-ratio: 9 / 20) {
    .vertical-chase-strips {
      top: 27.5%;
    }

    .vertical-chase-strips img {
      width: min(17.2vw, 72px);
    }

    .gamble-page-icons {
      top: 47.5%;
      width: min(69vw, 286px);
    }

    .lines-patterns-top {
      top: 15%;
    }

    .lines-patterns-middle {
      top: 40.8%;
    }

    .lines-patterns-bottom {
      top: 66.6%;
    }
  }

  /*
   * Shorter portrait screens: tighten vertical spacing while retaining
   * proportional raster assets.
   */
  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .info-page h1 {
      top: max(calc(env(safe-area-inset-top, 0px) + 22px), 4.4%);
      font-size: clamp(28px, 9.3vw, 38px);
    }

    .info-rules-copy {
      top: 13.8%;
      font-size: clamp(12.8px, 3.65vw, 15px);
    }

    .paytable-row-top .paytable-item-top-1,
    .paytable-row-top .paytable-item-top-2,
    .paytable-row-top .paytable-item-top-3 {
      top: 17.2%;
    }

    .paytable-row-top .paytable-item-top-4,
    .paytable-row-bottom .paytable-item-bottom-1,
    .paytable-row-bottom .paytable-item-bottom-2 {
      top: 42%;
    }

    .paytable-row-bottom .paytable-item-bottom-3,
    .paytable-row-bottom .paytable-item-bottom-4,
    .paytable-row-bottom .paytable-item-bottom-5 {
      top: 66.8%;
    }

    .paytable-item {
      width: min(30.5vw, 127px);
    }

    .paytable-symbol {
      height: clamp(80px, 22.2vw, 94px);
    }

    .paytable-values {
      top: clamp(87px, 24vw, 101px);
      font-size: clamp(11px, 3.15vw, 13px);
    }

    .special-symbol-wild,
    .special-symbol-scatter {
      top: 13.8%;
    }

    .special-symbol-cop,
    .special-symbol-gang {
      top: 49.2%;
    }

    .vertical-chase-description {
      top: 12.8%;
    }

    .vertical-chase-strips {
      top: 26.5%;
    }

    .info-page-cop-chase .chase-info-copy {
      top: 13%;
      font-size: clamp(12px, 3.45vw, 14px);
    }

    .info-page-cop-chase .chase-info-strips {
      top: 46.5%;
    }

    .info-page-gang-chase .gang-chase-copy {
      top: 12.5%;
      font-size: clamp(10.5px, 3vw, 12.2px);
    }

    .info-page-gang-chase .chase-info-strips {
      top: 55%;
    }

    .gamble-page-copy {
      top: 12.7%;
      font-size: clamp(10.4px, 2.95vw, 12px);
    }

    .gamble-page-icons {
      top: 46%;
      width: min(62vw, 258px);
    }

    .lines-patterns-top {
      top: 13.8%;
    }

    .lines-patterns-middle {
      top: 39.5%;
    }

    .lines-patterns-bottom {
      top: 65.2%;
    }

    .bonus-mode {
      font-size: clamp(10px, 2.87vw, 11.8px);
    }

    .big-score-copy {
      font-size: clamp(12px, 3.45vw, 14px);
    }
  }

  /*
   * MOBILE ONBOARDING
   * Reference canvas: 402 × 874.
   *
   * The screen is not stretched as one flattened image. The background,
   * gradient panel, typography, art, arrows, dots and CTA each use their
   * own anchors, so raster sprites keep their proportions on different
   * portrait phones.
   */
  @media (orientation: portrait) and (max-width: 767px) {
    .onboarding-active .hero-character,
    .onboarding-active .main-stage,
    .onboarding-active .control-deck {
      visibility: hidden;
      pointer-events: none;
    }

    /*
     * The same responsive desktop scene crop used by the mobile reel screen.
     * The onboarding gradient panel is layered above it.
     */
    .onboarding-active .desktop-adaptive-background,
    .onboarding-active .desktop-scene-background {
      display: block;
    }

    .onboarding-active .mobile-adaptive-background,
    .onboarding-active .mobile-scene-background {
      display: none;
    }

    .onboarding-active .adaptive-background,
    .onboarding-active .scene-background {
      object-position: 15% center;
    }

    .onboarding-active .scene-shade {
      background:
        linear-gradient(to bottom, rgba(35, 24, 77, 0.04), transparent 24%),
        linear-gradient(to top, rgba(34, 6, 55, 0.08), transparent 28%);
    }

    /*
     * Reference: logo bounds are approximately x=113..289, y=34..116.
     */
    .onboarding-active .game-logo {
      z-index: 105;
      top: max(calc(env(safe-area-inset-top, 0px) + 8px), 3.89dvh);
      left: 50%;
      width: min(43.8vw, 190px);
      height: auto;
      transform: translateX(-50%);
    }

    .onboarding-screen {
      position: absolute;
      z-index: 100;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      color: #ffffff;
      cursor: pointer;
      outline: none;
    }

    /*
     * Reference: panel y=157..754 on the 402 × 874 layout.
     * onboardPanel.png may stretch independently in both directions because
     * it is only a smooth dark-to-purple gradient.
     */
    .onboarding-panel {
      position: absolute;
      top: 17.963387%;
      left: 0;
      width: 100%;
      height: 68.306636%;
      aspect-ratio: auto;
      overflow: hidden;
    }

    .onboarding-panel-background {
      position: absolute;
      z-index: 0;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: fill;
      pointer-events: none;
    }

    /*
     * Shared mobile text layout for all four pages.
     */
    .onboarding-copy {
      z-index: 4;
      top: 12.9%;
      right: 4%;
      left: 4%;
      text-align: center;
    }

    .onboarding-copy h1 {
      font-size: clamp(36px, 10.7vw, 46px);
      font-weight: 400;
      line-height: 1;
      letter-spacing: -0.025em;
    }

    .onboarding-copy p {
      width: min(90%, 360px);
      margin: 5.1% auto 0;
      font-size: clamp(20px, 6.05vw, 26px);
      font-weight: 300;
      line-height: 1.25;
      letter-spacing: -0.02em;
      text-wrap: balance;
    }

    /*
     * Every page receives the complete panel coordinate space.
     */
    .onboarding-art,
    .onboarding-art-most-wanted,
    .onboarding-art-car-theft {
      position: absolute;
      z-index: 3;
      inset: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: none;
      pointer-events: none;
    }

    /*
     * FREE SPINS reference:
     * visible sprite around x=143..273, y=435..579.
     */
    .onboarding-free-spin {
      top: 46.4%;
      left: 50.5%;
      width: 32.4%;
      transform: translateX(-50%);
      filter: drop-shadow(0 2px 3px rgba(10, 1, 22, 0.34));
    }

    /*
     * ROAD RAGE: same visual centre and vertical band as FREE SPINS.
     */
    .onboarding-cop {
      top: 47.2%;
      left: 50%;
      width: 31.5%;
      transform: translateX(-79%) rotate(-4deg);
      filter: drop-shadow(0 2px 3px rgba(3, 2, 24, 0.36));
    }

    .onboarding-gang {
      top: 47.6%;
      left: 50%;
      width: 31.5%;
      transform: translateX(-21%) rotate(4deg);
      filter: drop-shadow(0 2px 3px rgba(3, 2, 24, 0.36));
    }

    /*
     * MOST WANTED uses the same correctly assembled desktop card internals,
     * but with a separate mobile composition and proportional scaling.
     */
    .mw-composition {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .mw-card {
      width: 64%;
      aspect-ratio: 267 / 96;
    }

    .mw-card-upper {
      top: 46.5%;
      left: 27%;
      transform: rotate(23deg);
    }

    .mw-card-lower {
      top: 56.8%;
      left: 10%;
      transform: rotate(-15deg) scale(0.72);
    }

    .mw-cross {
      top: 54.3% !important;
      left: 25.5% !important;
      width: 38% !important;
    }

    /*
     * CAR THEFT composition occupies the same central mobile band.
     */
    .car-lock-composition {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /*
     * CAR THEFT mobile composition.
     * Замок немного увеличен, а оба инструмента имеют одинаковый масштаб
     * и симметрично уходят за левый и правый края примерно на 2%.
     */
    .car-lock-ring {
      top: 46.4%;
      left: 50%;
      width: 30.5%;
      transform: translateX(-50%);
    }

    .car-lock-core {
      top: 49.15%;
      left: 50%;
      width: 22.8%;
      transform: translateX(-50%);
    }

    .car-lock-picker {
      top: 45.1%;
      left: 50%;
      width: 54%;
      transform: translateX(-96%);
      transform-origin: 100% 50%;
    }

    .car-lock-screwdriver {
      top: 52.75%;
      left: 50%;
      width: 54%;
      transform: translateX(-4%);
      transform-origin: 0 50%;
    }

    /*
     * Shared arrow anchors on all pages.
     * Reference visual centres: approximately (39, 520) and (363, 520).
     */
    .onboarding-arrow {
      top: 56.4%;
      display: grid;
      place-items: center;
      width: 13.45%;
      aspect-ratio: 1;
    }

    .onboarding-arrow-left {
      left: 3%;
    }

    .onboarding-arrow-right {
      right: 3%;
    }

    .onboarding-arrow-icon {
      width: 63%;
      height: 63%;
      filter: drop-shadow(0 1px 2px rgba(8, 2, 24, 0.3));
    }

    /*
     * Reference centres: x≈149, 183, 217, 251; y≈648.
     */
    .onboarding-dots {
      bottom: 16.45%;
      left: 50%;
      gap: 4.72vw;
      transform: translateX(-50%);
    }

    .onboarding-dots button {
      width: clamp(13px, 3.73vw, 16px);
      aspect-ratio: 1;
    }

    /*
     * Reference: CTA visible around x=43..359 and y=786..831.
     */
    .onboarding-continue {
      top: auto;
      bottom: calc(env(safe-area-inset-bottom, 0px) + 4.8%);
      left: 50%;
      width: min(79%, 340px);
      aspect-ratio: 620 / 108;
      transform: translateX(-50%);
    }

    .onboarding-continue-svg {
      width: 100%;
      height: 100%;
      filter: none;
    }

    .onboarding-debug-button {
      z-index: 200;
      top: calc(env(safe-area-inset-top, 0px) + 6px);
      left: 6px;
      padding: 4px 7px;
      border-radius: 5px;
      font-size: 9px;
    }
  }

  /*
   * Very tall phones: the panel remains anchored to the reference vertical
   * rhythm while the background crop reveals slightly more of the left side.
   */
  @media (orientation: portrait) and (max-width: 767px) and (max-aspect-ratio: 9 / 20) {
    .onboarding-active .adaptive-background,
    .onboarding-active .scene-background {
      object-position: 13% center;
    }

    .onboarding-panel {
      top: 17.7%;
      height: 68.7%;
    }

    .onboarding-copy {
      top: 12.4%;
    }

    .onboarding-continue {
      bottom: calc(env(safe-area-inset-bottom, 0px) + 4.3%);
    }
  }

  /*
   * Shorter / more square portrait phones: preserve the composition by
   * tightening vertical whitespace rather than deforming any raster sprite.
   */
  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .onboarding-active .game-logo {
      top: max(calc(env(safe-area-inset-top, 0px) + 6px), 2.6dvh);
      width: min(40vw, 178px);
    }

    .onboarding-panel {
      top: 16.8%;
      height: 69%;
    }

    .onboarding-copy {
      top: 10.8%;
    }

    .onboarding-copy h1 {
      font-size: clamp(32px, 9.6vw, 42px);
    }

    .onboarding-copy p {
      margin-top: 3.7%;
      font-size: clamp(18px, 5.4vw, 24px);
    }

    .onboarding-free-spin {
      top: 45.7%;
      width: 30.5%;
    }

    .onboarding-arrow {
      top: 55.7%;
    }

    .onboarding-dots {
      bottom: 15.2%;
    }

    .onboarding-continue {
      bottom: calc(env(safe-area-inset-bottom, 0px) + 3.3%);
      width: min(75%, 325px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* BONUS BUY desktop overlay */
  .bonus-buy-overlay {
    position: absolute;
    inset: 0;
    z-index: 26;
    font-family: 'Jost', Arial, Helvetica, sans-serif;
  }

  .bonus-buy-tint-background {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .bonus-buy-title {
    position: absolute;
    top: 7.2%;
    left: 50%;
    z-index: 2;
    margin: 0;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 4.05cqw;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }

  .bonus-buy-close-button {
    position: absolute;
    z-index: 4;
    top: 3.2%;
    right: 3.05%;
    width: 3.25%;
    min-width: 40px;
    aspect-ratio: 1;
    border: 0.15vw solid rgba(255, 255, 255, 0.95);
    border-radius: 999px;
    background: transparent;
    cursor: pointer;
    transition: transform 120ms ease, filter 120ms ease, opacity 120ms ease;
  }

  .bonus-buy-close-button::before,
  .bonus-buy-close-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 42%;
    height: 0.16vw;
    min-height: 2px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 999px;
    transform-origin: center;
  }

  .bonus-buy-close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .bonus-buy-close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .bonus-buy-close-button:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }

  .bonus-buy-close-button:active {
    transform: scale(0.95);
  }

  .bonus-buy-bet-widget {
    position: absolute;
    top: 20.7%;
    left: 50%;
    z-index: 4;
    display: grid;
    justify-items: center;
    width: 15%;
    min-width: 0;
    padding: 0.48cqw 0.72cqw 0.42cqw;
    border: 0.28cqw solid #4a77ef;
    border-radius: 0.92cqw;
    background: #f6f6f7;
    box-shadow: 0 0.45cqw 1.25cqw rgba(9, 4, 24, 0.28);
    color: #111111;
    transform: translateX(-50%);
  }

  .bonus-buy-bet-title,
  .bonus-buy-confirm-title {
    font-size: 1.28cqw;
    font-weight: 800;
    line-height: 1;
  }

  .bonus-buy-bet-value,
  .bonus-buy-confirm-value {
    margin-top: 0.05cqw;
    font-size: 1.72cqw;
    font-weight: 800;
    line-height: 1.06;
  }

  .bonus-buy-bet-actions,
  .bonus-buy-confirm-actions {
    display: flex;
    gap: 0.56cqw;
    align-items: center;
    justify-content: center;
    margin-top: 0.34cqw;
  }

  .bonus-buy-small-action,
  .bonus-buy-confirm-button {
    appearance: none;
    min-width: 2.9cqw;
    padding: 0.24cqw 0.72cqw;
    border: 0;
    border-radius: 0.46cqw;
    background: linear-gradient(180deg, #667eff 0%, #e53066 100%);
    color: #ffffff;
    font-size: 1.34cqw;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    transition: transform 120ms ease, filter 120ms ease, opacity 120ms ease;
  }

  .bonus-buy-small-action:hover:not(:disabled),
  .bonus-buy-confirm-button:hover {
    filter: brightness(1.05);
    transform: translateY(-0.04cqw);
  }

  .bonus-buy-small-action:active:not(:disabled),
  .bonus-buy-confirm-button:active {
    transform: scale(0.96);
  }

  .bonus-buy-small-action:disabled {
    opacity: 0.45;
    cursor: default;
  }

  .bonus-buy-balance-line {
    margin-top: 0.2cqw;
    font-size: 0.9cqw;
    font-weight: 500;
    line-height: 1.08;
    color: #111111;
  }

  .bonus-buy-balance-line span {
    margin-left: 0.32cqw;
    font-weight: 500;
  }

  .bonus-buy-cards {
    position: absolute;
    left: 2.1%;
    right: 2.1%;
    top: 36.8%;
    bottom: 33.1%;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(6, 15.08%);
    justify-content: space-between;
    align-items: stretch;
  }

  .bonus-buy-card {
    appearance: none;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    padding: 0;
    border: 0.28cqw solid #3f71f0;
    border-radius: 1.0cqw;
    background: #ffffff;
    box-shadow: 0 0.9cqw 1.9cqw rgba(8, 4, 21, 0.27);
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
  }

  .bonus-buy-card:hover {
    transform: none;
    box-shadow: 0 0.9cqw 1.9cqw rgba(8, 4, 21, 0.27);
    filter: none;
  }

  .bonus-buy-card:active {
    transform: none;
  }

  .bonus-buy-card-body {
    display: grid;
    flex: 1 1 auto;
    grid-template-rows: 3.65cqw 4.25cqw minmax(0, 1fr) auto;
    align-items: start;
    justify-items: center;
    padding: 0.78cqw 0.68cqw 0.3cqw;
    color: #111111;
  }

  .bonus-buy-card-body h2 {
    min-height: 0;
    margin: 0;
    font-size: 1.16cqw;
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    white-space: pre-line;
  }

  .bonus-buy-card-body p {
    min-height: 0;
    margin: 0.45cqw 0 0;
    font-size: 0.86cqw;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: -0.015em;
  }

  .bonus-buy-card-icons {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    width: 100%;
    min-height: 0;
    margin-top: 0.12cqw;
  }

  .bonus-buy-card-icons img {
    display: block;
    max-width: 100%;
    max-height: 5.4cqw;
    object-fit: contain;
  }

  .icons-bonus-road-featurespins .icon-fs {
    width: 5.2cqw;
    max-height: 6.35cqw;
  }

  .icons-road-rage-featurespins {
    gap: 0.2cqw;
  }

  .icons-road-rage-featurespins .icon-cop,
  .icons-road-rage-featurespins .icon-gang {
    width: 4.65cqw;
  }

  .icons-ride-or-crash-featurespins .icon-gang-solo {
    width: 4.95cqw;
  }

  .icons-bonus-road {
    gap: 0.2cqw;
  }

  .icons-bonus-road .icon-fs {
    width: 4.25cqw;
  }

  .icons-bonus-road .icon-lock {
    width: 4.1cqw;
  }

  .icons-most-wanted-featurespins {
    min-height: 8.3cqw;
  }

  .icons-most-wanted-featurespins .icon-lockpick {
    position: absolute;
    width: 5.1cqw;
    transform: translate(-0.08cqw, -0.02cqw) rotate(0deg);
  }

  .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute;
    width: 4.85cqw;
    transform: translate(0.08cqw, 0.18cqw) rotate(0deg);
  }

  .icons-the-big-score {
    gap: 0.1cqw;
  }

  .icons-the-big-score .icon-wild {
    width: 3.75cqw;
  }

  .icons-the-big-score .icon-gang {
    width: 4.25cqw;
  }

  .bonus-buy-card-price {
    margin-top: auto;
    padding-top: 0.18cqw;
    color: #111111;
    font-size: 1.48cqw;
    font-weight: 900;
    line-height: 1;
  }

  .bonus-buy-card-action {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3.05cqw;
    color: #ffffff;
    font-size: 1.42cqw;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }

  .bonus-buy-card-action.action-activate {
    background: #eb2158;
  }

  .bonus-buy-card-action.action-buy {
    background: #1b1cb0;
  }

  .bonus-buy-confirm-stage {
    position: absolute;
    left: 50%;
    top: 19.6%;
    z-index: 2;
    display: grid;
    justify-items: center;
    gap: 1.06cqw;
    transform: translateX(-50%);
  }

  .bonus-buy-card-confirm {
    width: 16.55cqw;
    height: 29.35cqw;
    min-height: 0;
    cursor: default;
  }

  .bonus-buy-card-confirm:hover,
  .bonus-buy-card-confirm:active {
    transform: none;
    filter: none;
    box-shadow: 0 0.9cqw 1.9cqw rgba(8, 4, 21, 0.27);
  }

  .bonus-buy-card-confirm .bonus-buy-card-body {
    grid-template-rows: 3.65cqw 4.25cqw minmax(0, 1fr) auto;
    padding: 0.78cqw 0.68cqw 0.3cqw;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body h2 {
    min-height: 0;
    font-size: 1.46cqw;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body p {
    min-height: 0;
    margin-top: 0.45cqw;
    font-size: 1.08cqw;
  }

  .bonus-buy-card-confirm .bonus-buy-card-icons {
    min-height: 0;
    margin-top: 0.12cqw;
  }

  .bonus-buy-card-confirm .bonus-buy-card-icons img {
    max-height: 7.75cqw;
  }

  .bonus-buy-card-confirm.icons-most-wanted-featurespins .icon-lockpick,
  .bonus-buy-card-confirm.icons-most-wanted-featurespins .icon-screwdriver {
    max-height: none;
  }

  .bonus-buy-card-confirm .bonus-buy-card-price {
    font-size: 1.96cqw;
  }

  .bonus-buy-card-confirm .bonus-buy-card-action {
    min-height: 3.98cqw;
    font-size: 1.82cqw;
  }

  .bonus-buy-confirm-panel {
    display: grid;
    justify-items: center;
    width: 16.0cqw;
    min-width: 228px;
    padding: 0.74cqw 0.94cqw 0.64cqw;
    border: 0.32cqw solid #4a77ef;
    border-radius: 1.02cqw;
    background: #f6f6f7;
    box-shadow: 0 0.55cqw 1.6cqw rgba(9, 4, 24, 0.3);
    color: #111111;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-title {
    font-size: 1.74cqw;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-value {
    margin-top: 0.08cqw;
    font-size: 2.05cqw;
  }

  .bonus-buy-confirm-button {
    min-width: 5.25cqw;
    font-size: 1.26cqw;
    font-weight: 700;
  }

  .confirm-balance-line {
    margin-top: 0.46cqw;
    font-size: 1.08cqw;
  }

  @media (orientation: portrait) and (max-width: 767px) {
    .bonus-buy-overlay {
      display: none;
    }
  }


  /* FINAL OVERRIDES: must stay at the very end of the stylesheet. */
  .bonus-buy-title {
    top: 10.45%;
    font-size: 3.15cqw;
  }

  .bonus-buy-bet-widget {
    top: 24.25%;
    width: 15.1%;
    height: 15.25%;
    min-width: 0;
    box-sizing: border-box;
    padding: 0.62cqw 0.82cqw 0.5cqw;
    border: 0.31cqw solid transparent;
    border-radius: 1.02cqw;
    background:
      linear-gradient(#f6f6f7, #f6f6f7) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 72%, #e4245b 100%) border-box;
    transform: translateX(-50%);
  }

  .bonus-buy-bet-widget .bonus-buy-bet-title {
    font-size: 1.42cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-bet-value {
    margin-top: 0.08cqw;
    font-size: 1.82cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-bet-actions {
    gap: 0.62cqw;
    margin-top: 0.38cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-small-action {
    min-width: 3.05cqw;
    padding: 0.27cqw 0.76cqw;
    border-radius: 0.48cqw;
    font-size: 1.45cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-balance-line {
    margin-top: 0.22cqw;
    font-size: 0.96cqw;
  }

  .bonus-buy-cards {
    left: 2.12%;
    right: 2.12%;
    top: 42.65%;
    bottom: 22.05%;
    grid-template-columns: repeat(6, 15.08%);
    justify-content: space-between;
    align-items: stretch;
  }

  .bonus-buy-cards .bonus-buy-card {
    height: 100%;
    min-height: 0;
    box-sizing: border-box;
    border: 0.31cqw solid transparent;
    border-radius: 1.02cqw;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 76%, #e4245b 100%) border-box;
    box-shadow: 0 0.72cqw 1.45cqw rgba(8, 4, 21, 0.24);
    overflow: hidden;
  }

  .bonus-buy-cards .bonus-buy-card-body {
    display: grid;
    flex: 1 1 auto;
    grid-template-rows: 2.9cqw 4.05cqw minmax(0, 1fr) auto;
    align-items: start;
    justify-items: center;
    min-height: 0;
    padding: 0.82cqw 0.7cqw 0.42cqw;
  }

  .bonus-buy-cards .bonus-buy-card-body h2 {
    min-height: 0;
    margin: 0;
    font-size: 1.08cqw;
    line-height: 1.04;
  }

  .bonus-buy-cards .bonus-buy-card-body p {
    min-height: 0;
    margin: 0.42cqw 0 0;
    font-size: 0.81cqw;
    line-height: 1.15;
  }

  .bonus-buy-cards .bonus-buy-card-icons {
    align-self: stretch;
    min-height: 0;
    margin-top: 0.18cqw;
  }

  .bonus-buy-cards .bonus-buy-card-icons img {
    max-height: 6.25cqw;
  }

  .bonus-buy-cards .icons-bonus-road-featurespins .icon-fs {
    width: 4.75cqw;
    max-height: 5.75cqw;
  }

  .bonus-buy-cards .icons-road-rage-featurespins {
    gap: 0.08cqw;
  }

  .bonus-buy-cards .icons-road-rage-featurespins .icon-cop,
  .bonus-buy-cards .icons-road-rage-featurespins .icon-gang {
    width: 4.18cqw;
  }

  .bonus-buy-cards .icons-ride-or-crash-featurespins .icon-gang-solo {
    width: 4.55cqw;
  }

  .bonus-buy-cards .icons-bonus-road {
    gap: 0.12cqw;
  }

  .bonus-buy-cards .icons-bonus-road .icon-fs {
    width: 3.95cqw;
  }

  .bonus-buy-cards .icons-bonus-road .icon-lock {
    position: static;
    width: 4.1cqw;
    transform: none;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins {
    min-height: 0;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lockpick {
    position: absolute;
    z-index: 1;
    width: 8.15cqw;
    max-height: none;
    transform: translate(-1.55cqw, -0.35cqw);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lock {
    position: absolute;
    z-index: 2;
    width: 4.25cqw;
    max-height: none;
    transform: translate(0.25cqw, 0.02cqw);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute;
    z-index: 3;
    width: 7.1cqw;
    max-height: none;
    transform: translate(1.75cqw, 0.48cqw);
  }

  .bonus-buy-cards .icons-the-big-score {
    gap: 0.05cqw;
  }

  .bonus-buy-cards .icons-the-big-score .icon-wild {
    width: 3.55cqw;
  }

  .bonus-buy-cards .icons-the-big-score .icon-gang {
    width: 4.05cqw;
  }

  .bonus-buy-cards .bonus-buy-card-price {
    margin-top: auto;
    padding-top: 0.22cqw;
    font-size: 1.38cqw;
  }

  .bonus-buy-cards .bonus-buy-card-action {
    min-height: 3.4cqw;
    font-size: 1.42cqw;
    border-radius: 0 0 0.67cqw 0.67cqw;
  }

  .bonus-buy-card-confirm,
  .bonus-buy-confirm-panel {
    box-sizing: border-box;
    border-color: transparent;
    background:
      linear-gradient(#f6f6f7, #f6f6f7) padding-box,
      linear-gradient(180deg, #4b79f3 0%, #4b79f3 74%, #e4245b 100%) border-box;
  }


  /* TOP BET PANEL ONLY — lower bonus cards are intentionally untouched. */
  .bonus-buy-bet-widget {
    display: grid;
    grid-template-rows: max-content max-content max-content max-content;
    align-content: center;
    justify-items: center;
    row-gap: 0.12cqw;
    overflow: hidden;
    padding-top: 0.42cqw;
    padding-bottom: 0.42cqw;
  }

  .bonus-buy-bet-widget .bonus-buy-bet-title {
    margin: 0;
    line-height: 1;
  }

  .bonus-buy-bet-widget .bonus-buy-bet-value {
    margin: 0;
    line-height: 1;
  }

  .bonus-buy-bet-widget .bonus-buy-bet-actions {
    margin: 0.18cqw 0 0;
  }

  .bonus-buy-bet-widget .bonus-buy-balance-line {
    margin: 0.12cqw 0 0;
    line-height: 1;
    white-space: nowrap;
  }


  /* TARGETED FIXES: bonus-road, most-wanted and confirm bottom panel. */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-body p {
    width: 92%;
    margin-top: 0.34cqw;
    font-size: 0.79cqw;
    line-height: 1.12;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-body p {
    width: 92%;
    margin-top: 0.32cqw;
    font-size: 0.76cqw;
    line-height: 1.1;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons {
    margin-top: 0.22cqw;
    min-height: 6.15cqw;
  }

  .bonus-buy-cards .icons-bonus-road {
    gap: 0.28cqw;
  }

  .bonus-buy-cards .icons-bonus-road .icon-fs {
    width: 3.72cqw;
    transform: translateY(0.1cqw);
  }

  .bonus-buy-cards .icons-bonus-road .icon-lock {
    width: 4.26cqw;
    transform: translateY(0.1cqw);
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons {
    min-height: 6.55cqw;
    margin-top: 0.16cqw;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lockpick {
    width: 7.55cqw;
    transform: translate(-1.42cqw, -0.18cqw) rotate(-2deg);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lock {
    width: 4.02cqw;
    transform: translate(0.26cqw, 0.08cqw);
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-screwdriver {
    width: 6.6cqw;
    transform: translate(1.54cqw, 0.36cqw) rotate(1deg);
  }

  .bonus-buy-confirm-panel {
    width: 15.35cqw;
    min-width: 0;
    padding: 0.58cqw 0.8cqw 0.44cqw;
    row-gap: 0.08cqw;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-title {
    font-size: 1.64cqw;
    line-height: 1;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-value {
    margin-top: 0.02cqw;
    font-size: 1.96cqw;
    line-height: 1;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-actions {
    margin-top: 0.22cqw;
    gap: 0.42cqw;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-button {
    min-width: 4.82cqw;
    padding: 0.18cqw 0.54cqw;
    border-radius: 0.42cqw;
    font-size: 1.08cqw;
    line-height: 1;
  }

  .bonus-buy-confirm-panel .confirm-balance-line {
    margin-top: 0.2cqw;
    font-size: 0.94cqw;
    line-height: 1;
    white-space: nowrap;
  }


  /* FINAL IMAGE LAYOUT FIXES: make bonus-road / most-wanted / big-score match reference 1:1 more closely. */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons,
  .bonus-buy-card-confirm .icons-bonus-road {
    position: relative;
    min-height: 6.0cqw;
    margin-top: 0.28cqw;
  }

  .bonus-buy-cards .icons-bonus-road,
  .bonus-buy-card-confirm .icons-bonus-road {
    gap: 0;
  }

  .bonus-buy-cards .icons-bonus-road .icon-fs,
  .bonus-buy-card-confirm .icons-bonus-road .icon-fs {
    position: absolute;
    left: 34%;
    top: 56%;
    width: 3.65cqw;
    max-height: none;
    transform: translate(-50%, -50%);
  }

  .bonus-buy-cards .icons-bonus-road .icon-lock,
  .bonus-buy-card-confirm .icons-bonus-road .icon-lock {
    position: absolute;
    left: 63%;
    top: 56%;
    width: 4.15cqw;
    max-height: none;
    transform: translate(-50%, -50%);
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons,
  .bonus-buy-card-confirm .icons-most-wanted-featurespins {
    position: relative;
    min-height: 6.2cqw;
    margin-top: 0.22cqw;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins,
  .bonus-buy-card-confirm .icons-most-wanted-featurespins {
    gap: 0;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lockpick,
  .bonus-buy-card-confirm .icons-most-wanted-featurespins .icon-lockpick {
    position: absolute;
    left: 26%;
    top: 48%;
    width: 5.15cqw;
    max-height: none;
    transform: translate(-50%, -50%) rotate(0deg);
    z-index: 1;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-lock,
  .bonus-buy-card-confirm .icons-most-wanted-featurespins .icon-lock {
    position: absolute;
    left: 54.5%;
    top: 50%;
    width: 3.95cqw;
    max-height: none;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .bonus-buy-cards .icons-most-wanted-featurespins .icon-screwdriver,
  .bonus-buy-card-confirm .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute;
    left: 66%;
    top: 57%;
    width: 5.45cqw;
    max-height: none;
    transform: translate(-50%, -50%) rotate(0deg);
    z-index: 3;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .bonus-buy-card-icons,
  .bonus-buy-card-confirm .icons-the-big-score {
    min-height: 6.0cqw;
    margin-top: 0.26cqw;
    gap: 0.34cqw;
  }

  .bonus-buy-cards .icons-the-big-score .icon-wild,
  .bonus-buy-card-confirm .icons-the-big-score .icon-wild {
    width: 3.6cqw;
    max-height: none;
    transform: translateY(0.02cqw);
  }

  .bonus-buy-cards .icons-the-big-score .icon-gang,
  .bonus-buy-card-confirm .icons-the-big-score .icon-gang {
    width: 4.0cqw;
    max-height: none;
    transform: translateY(0.02cqw);
  }


  /* DESKTOP FINAL OVERRIDES: fix the last three card images to match the reference placement. */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons,
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons,
  .bonus-buy-cards .bonus-buy-card-the-big-score .bonus-buy-card-icons {
    position: relative;
    overflow: visible;
  }

  /* 4th card: BONUS ROAD */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons {
    min-height: 6.25cqw !important;
    margin-top: 0.18cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.06cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-fs,
  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-lock {
    position: static !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    max-height: none !important;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-fs {
    width: 3.9cqw !important;
    margin-top: 0.35cqw;
    margin-right: 0.06cqw;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-lock {
    width: 4.2cqw !important;
    margin-top: 0.35cqw;
    margin-left: -0.02cqw;
  }

  /* 5th card: MOST WANTED FEATURESPINS */
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons {
    min-height: 6.45cqw !important;
    margin-top: 0.12cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins {
    display: block;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lockpick {
    position: absolute !important;
    left: 29% !important;
    top: 45% !important;
    width: 6.55cqw !important;
    transform: translate(-50%, -50%) rotate(0deg) !important;
    max-height: none !important;
    z-index: 1;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lock {
    position: absolute !important;
    left: 54% !important;
    top: 49% !important;
    width: 4.25cqw !important;
    transform: translate(-50%, -50%) !important;
    max-height: none !important;
    z-index: 2;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute !important;
    left: 67.5% !important;
    top: 58% !important;
    width: 6.85cqw !important;
    transform: translate(-50%, -50%) rotate(0deg) !important;
    max-height: none !important;
    z-index: 3;
  }

  /* 6th card: THE BIG SCORE */
  .bonus-buy-cards .bonus-buy-card-the-big-score .bonus-buy-card-icons {
    min-height: 6.15cqw !important;
    margin-top: 0.16cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.24cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-wild,
  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-gang {
    position: static !important;
    left: auto !important;
    top: auto !important;
    transform: none !important;
    max-height: none !important;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-wild {
    width: 3.95cqw !important;
    margin-top: 0.28cqw;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-gang {
    width: 4.1cqw !important;
    margin-top: 0.24cqw;
  }


  /* FINAL DESKTOP OVERRIDES — last three bonus-buy cards match the approved onboard composition */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons,
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons,
  .bonus-buy-cards .bonus-buy-card-the-big-score .bonus-buy-card-icons {
    position: relative !important;
    overflow: visible !important;
  }

  /* 4th card — BONUS ROAD */
  .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-icons {
    min-height: 5.35cqw !important;
    height: 5.35cqw !important;
    margin-top: 0.12cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-fs,
  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-lock {
    position: absolute !important;
    max-height: none !important;
    transform: translate(-50%, -50%) !important;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-fs {
    left: 40.5% !important;
    top: 57% !important;
    width: 3.45cqw !important;
    z-index: 1;
  }

  .bonus-buy-cards .bonus-buy-card-bonus-road .icons-bonus-road .icon-lock {
    left: 61.8% !important;
    top: 57% !important;
    width: 3.75cqw !important;
    z-index: 2;
  }

  /* 5th card — MOST WANTED FEATURESPINS */
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-icons {
    min-height: 5.55cqw !important;
    height: 5.55cqw !important;
    margin-top: 0.10cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lockpick,
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lock,
  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-screwdriver {
    position: absolute !important;
    max-height: none !important;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lockpick {
    left: 26.5% !important;
    top: 55.5% !important;
    width: 4.95cqw !important;
    transform: translate(-50%, -50%) !important;
    z-index: 1;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-lock {
    left: 49.2% !important;
    top: 56.2% !important;
    width: 3.65cqw !important;
    transform: translate(-50%, -50%) !important;
    z-index: 2;
  }

  .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .icons-most-wanted-featurespins .icon-screwdriver {
    left: 66.8% !important;
    top: 59% !important;
    width: 5.25cqw !important;
    transform: translate(-50%, -50%) !important;
    z-index: 3;
  }

  /* 6th card — THE BIG SCORE */
  .bonus-buy-cards .bonus-buy-card-the-big-score .bonus-buy-card-icons {
    min-height: 5.3cqw !important;
    height: 5.3cqw !important;
    margin-top: 0.12cqw !important;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-wild,
  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-gang {
    position: absolute !important;
    max-height: none !important;
    transform: translate(-50%, -50%) !important;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-wild {
    left: 40.5% !important;
    top: 57.2% !important;
    width: 3.55cqw !important;
    z-index: 1;
  }

  .bonus-buy-cards .bonus-buy-card-the-big-score .icons-the-big-score .icon-gang {
    left: 62.2% !important;
    top: 57.2% !important;
    width: 3.8cqw !important;
    z-index: 2;
  }


  /* FINAL COMPOSITE CARD ART — keep all ready-made PNGs inside the icon zone so they never drop into the price/action area. */
  .bonus-buy-cards .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
    position: relative !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: center !important;
    overflow: hidden !important;
    width: 100% !important;
    min-height: 5.45cqw !important;
    height: 5.45cqw !important;
    margin-top: 0.06cqw !important;
    padding-top: 0.10cqw !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
    position: relative !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: center !important;
    overflow: hidden !important;
    width: 100% !important;
    min-height: 8.0cqw !important;
    height: 8.0cqw !important;
    padding-top: 0.18cqw !important;
  }

  .bonus-buy-composite-image {
    position: static !important;
    display: block !important;
    flex: 0 0 auto !important;
    max-width: none !important;
    max-height: none !important;
    margin: 0 !important;
    object-fit: contain !important;
    transform-origin: center top !important;
  }

  .bonus-buy-cards .composite-road-rage {
    width: 8.55cqw !important;
    transform: translateY(-0.10cqw) !important;
  }

  .bonus-buy-cards .composite-bonus-road {
    width: 7.55cqw !important;
    transform: translateY(-0.56cqw) !important;
  }

  .bonus-buy-cards .composite-most-wanted {
    width: 9.45cqw !important;
    transform: translateY(-0.62cqw) !important;
  }

  .bonus-buy-cards .composite-big-score {
    width: 8.10cqw !important;
    transform: translateY(-0.44cqw) !important;
  }

  .bonus-buy-card-confirm .composite-road-rage {
    width: 10.85cqw !important;
    transform: translateY(-0.12cqw) !important;
  }

  .bonus-buy-card-confirm .composite-bonus-road {
    width: 10.05cqw !important;
    transform: translateY(-0.40cqw) !important;
  }

  .bonus-buy-card-confirm .composite-most-wanted {
    width: 12.55cqw !important;
    transform: translateY(-0.48cqw) !important;
  }

  .bonus-buy-card-confirm .composite-big-score {
    width: 10.70cqw !important;
    transform: translateY(-0.28cqw) !important;
  }


  /* OVERLAY FIX: keep card containers and text layout intact,
     but take the ready-made composite PNGs out of the internal flow
     and place them over the card art area so they never drop into
     the price/action region. */
  .bonus-buy-card,
  .bonus-buy-card-confirm {
    position: relative !important;
  }

  .bonus-buy-cards .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
    position: absolute !important;
    left: 0.55cqw !important;
    right: 0.55cqw !important;
    top: 10.9cqw !important;
    height: 5.45cqw !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;
    overflow: visible !important;
    pointer-events: none !important;
    z-index: 2 !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
    position: absolute !important;
    left: 0.85cqw !important;
    right: 0.85cqw !important;
    top: 13.1cqw !important;
    height: 7.4cqw !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;
    overflow: visible !important;
    pointer-events: none !important;
    z-index: 2 !important;
  }

  .bonus-buy-composite-image {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    display: block !important;
    max-width: none !important;
    max-height: none !important;
    margin: 0 !important;
    object-fit: contain !important;
    transform-origin: center center !important;
  }

  /* 1st card: BONUS ROAD FEATURESPINS */
  .bonus-buy-cards .composite-free-spins {
    width: 7.2cqw !important;
    transform: translate(-55%, -100%) !important;
  }

  /* 2nd card: ROAD RAGE FEATURESPINS */
  .bonus-buy-cards .composite-road-rage {
    width: 10.25cqw !important;
    transform: translate(-60%, -90%) !important;
  }

  /* 3rd card: RIDE OR CRASH FEATURESPINS */
  .bonus-buy-cards .composite-ride-or-crash {
    width: 6.95cqw !important;
    transform: translate(-60%, -100%) !important;
  }

  .bonus-buy-cards .composite-bonus-road {
    width: 10.05cqw !important;
    transform: translate(-60%, -110%) !important;
  }

  .bonus-buy-cards .composite-most-wanted {
    width: 12.0cqw !important;
    transform: translate(-54%, -100%) !important;
  }

  .bonus-buy-cards .composite-big-score {
    width: 10.65cqw !important;
    transform: translate(-60%, -100%) !important;
  }

  /* Confirm card: BONUS ROAD FEATURESPINS */
  .bonus-buy-card-confirm .composite-free-spins {
    width: 7.2cqw !important;
    transform: translate(-55%, -100%) !important;
  }

  /* Confirm card: ROAD RAGE FEATURESPINS */
  .bonus-buy-card-confirm .composite-road-rage {
    width: 10.25cqw !important;
    transform: translate(-60%, -90%) !important;
  }

  /* Confirm card: RIDE OR CRASH FEATURESPINS */
  .bonus-buy-card-confirm .composite-ride-or-crash {
    width: 6.95cqw !important;
    transform: translate(-60%, -100%) !important;
  }

  .bonus-buy-card-confirm .composite-bonus-road {
    width: 10.05cqw !important;
    transform: translate(-60%, -110%) !important;
  }

  .bonus-buy-card-confirm .composite-most-wanted {
    width: 12.0cqw !important;
    transform: translate(-54%, -100%) !important;
  }

  .bonus-buy-card-confirm .composite-big-score {
    width: 10.65cqw !important;
    transform: translate(-60%, -100%) !important;
  }


  /* FINAL CONFIRM BUY LAYOUT — matched to Frame 334 reference.
     Image width/transform controls below are intentionally untouched. */
  .bonus-buy-overlay:has(.bonus-buy-confirm-stage) .bonus-buy-title {
    top: 10.45% !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 2.82cqw !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.025em !important;
  }

  .bonus-buy-confirm-stage {
    top: 22.04% !important;
    gap: 2.66cqw !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
  }

  /* The selected card scales proportionally instead of stretching vertically. */
  .bonus-buy-card-confirm {
    width: 17.55cqw !important;
    height: auto !important;
    min-height: 0 !important;
    aspect-ratio: 337 / 443 !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body {
    grid-template-rows: 3.45cqw 4.05cqw minmax(0, 1fr) 2.15cqw !important;
    padding: 1.55cqw 1.08cqw 0.45cqw !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body h2 {
    margin: 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.18cqw !important;
    font-weight: 800 !important;
    line-height: 1.08 !important;
    letter-spacing: -0.018em !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body p {
    width: 100% !important;
    margin: 0.34cqw 0 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 0.88cqw !important;
    font-weight: 400 !important;
    line-height: 1.18 !important;
    letter-spacing: 0 !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-price {
    align-self: end !important;
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.58cqw !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.015em !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-action {
    min-height: 4.05cqw !important;
    height: 4.05cqw !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.55cqw !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.012em !important;
  }

  /* Lower confirmation panel. */
  .bonus-buy-confirm-panel {
    width: 19.7cqw !important;
    height: 9.65cqw !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    grid-template-rows: max-content max-content max-content max-content !important;
    align-content: center !important;
    justify-items: center !important;
    row-gap: 0 !important;
    padding: 0.72cqw 1.15cqw 0.62cqw !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-title {
    margin: 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.34cqw !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.012em !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-value {
    margin: 0.18cqw 0 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.5cqw !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    letter-spacing: -0.012em !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-actions {
    width: 100% !important;
    margin: 0.55cqw 0 0 !important;
    gap: 1.38cqw !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-button {
    width: 7.25cqw !important;
    min-width: 7.25cqw !important;
    height: 1.85cqw !important;
    padding: 0 !important;
    border-radius: 0.48cqw !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 1.02cqw !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-button.purchase {
    background: linear-gradient(180deg, #667eff 0%, #e53066 100%) !important;
  }

  .bonus-buy-confirm-panel .bonus-buy-confirm-button.cancel {
    background: #e72458 !important;
  }

  .bonus-buy-confirm-panel .confirm-balance-line {
    margin: 0.64cqw 0 0 !important;
    font-family: 'Gantari', Arial, Helvetica, sans-serif !important;
    font-size: 0.94cqw !important;
    font-weight: 400 !important;
    line-height: 1 !important;
    letter-spacing: 0 !important;
    white-space: nowrap !important;
  }

  .bonus-buy-confirm-panel .confirm-balance-line span {
    margin-left: 0.42cqw !important;
    font-weight: 400 !important;
  }



  /* CONFIRM CARD ONLY — lower the title/description and lift the artwork slightly. */
  .bonus-buy-card-confirm .bonus-buy-card-body h2 {
    transform: translateY(0.50cqw) !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-body p {
    transform: translateY(0.38cqw) !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
    top: 11.60cqw !important;
  }


  /* CONFIRM CARD ONLY — pin the price directly above the bottom action bar. */
  .bonus-buy-card-confirm {
    position: relative !important;
  }

  .bonus-buy-card-confirm .bonus-buy-card-price {
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 4.48cqw !important;
    z-index: 4 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
  }


  /* ================================================================
     BONUS BUY — MOBILE 402 × 874 REFERENCE
     Desktop values above stay untouched. All mobile geometry is tied
     to the portrait game canvas through cqw/cqh.
     ================================================================ */
  @media (orientation: portrait) and (max-width: 767px) {
    .bonus-buy-overlay {
      display: block !important;
      position: absolute !important;
      inset: 0 !important;
      overflow: hidden !important;
      container-type: size;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
    }

    .bonus-buy-tint-background {
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    .bonus-buy-title,
    .bonus-buy-overlay:has(.bonus-buy-confirm-stage) .bonus-buy-title {
      top: 2.72cqh !important;
      left: 50% !important;
      width: max-content !important;
      max-width: 72cqw !important;
      margin: 0 !important;
      transform: translateX(-50%) !important;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
      font-size: 7.55cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      letter-spacing: -0.045em !important;
      white-space: nowrap !important;
    }

    .bonus-buy-close-button {
      top: 2.25cqh !important;
      right: 3.72cqw !important;
      width: 10.05cqw !important;
      min-width: 0 !important;
      border-width: 0.38cqw !important;
    }

    .bonus-buy-close-button::before,
    .bonus-buy-close-button::after {
      width: 44% !important;
      height: 0.42cqw !important;
      min-height: 0 !important;
    }

    /* Six cards: exact two-column / three-row portrait composition. */
    .bonus-buy-cards {
      position: absolute !important;
      left: 7.70cqw !important;
      right: auto !important;
      top: 8.70cqh !important;
      bottom: auto !important;
      width: 84.60cqw !important;
      height: 76.55cqh !important;
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      grid-template-rows: repeat(3, minmax(0, 1fr)) !important;
      column-gap: 3.72cqw !important;
      row-gap: 1.48cqh !important;
      align-items: stretch !important;
      justify-content: stretch !important;
    }

    .bonus-buy-cards .bonus-buy-card {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      border: 0.72cqw solid transparent !important;
      border-radius: 2.55cqw !important;
      background:
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(180deg, #4b79f3 0%, #4b79f3 76%, #e4245b 100%) border-box !important;
      box-shadow: 0 0.75cqw 1.8cqw rgba(7, 3, 24, 0.28) !important;
      overflow: hidden !important;
      transform: none !important;
    }

    .bonus-buy-cards .bonus-buy-card:hover,
    .bonus-buy-cards .bonus-buy-card:active {
      transform: none !important;
      filter: none !important;
    }

    .bonus-buy-cards .bonus-buy-card-body {
      position: relative !important;
      display: block !important;
      flex: 1 1 auto !important;
      width: 100% !important;
      min-height: 0 !important;
      padding: 1.48cqh 1.15cqw 0.55cqh !important;
      box-sizing: border-box !important;
    }

    .bonus-buy-cards .bonus-buy-card-body h2 {
      width: 100% !important;
      min-height: 3.05cqh !important;
      margin: 0 !important;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
      font-size: 2.36cqw !important;
      font-weight: 800 !important;
      line-height: 1.04 !important;
      letter-spacing: -0.035em !important;
      white-space: pre-line !important;
    }

    .bonus-buy-cards .bonus-buy-card-body p,
    .bonus-buy-cards .bonus-buy-card-bonus-road .bonus-buy-card-body p,
    .bonus-buy-cards .bonus-buy-card-most-wanted-featurespins .bonus-buy-card-body p {
      width: 96% !important;
      min-height: 4.55cqh !important;
      margin: 0.18cqh auto 0 !important;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
      font-size: 1.62cqw !important;
      font-weight: 400 !important;
      line-height: 1.14 !important;
      letter-spacing: -0.018em !important;
    }

    /* Artwork is layered over the dedicated card art zone, outside text flow. */
    .bonus-buy-cards .bonus-buy-card-icons,
    .bonus-buy-cards .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      top: 9.08cqh !important;
      width: 100% !important;
      height: 7.35cqh !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      pointer-events: none !important;
      z-index: 2 !important;
    }

    .bonus-buy-cards .bonus-buy-composite-image {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      object-fit: contain !important;
      transform-origin: center !important;
    }

    /* Individual mobile artwork controls. */
    .bonus-buy-cards .composite-free-spins {
      width: 15.65cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .composite-road-rage {
      width: 23.15cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .composite-ride-or-crash {
      width: 15.90cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .composite-bonus-road {
      width: 24.80cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .composite-most-wanted {
      width: 34.10cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .composite-big-score {
      width: 26.60cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-cards .bonus-buy-card-price {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0.64cqh !important;
      z-index: 4 !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
      font-size: 3.62cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      letter-spacing: -0.025em !important;
      text-align: center !important;
    }

    .bonus-buy-cards .bonus-buy-card-action {
      flex: 0 0 4.34cqh !important;
      width: 100% !important;
      min-height: 4.34cqh !important;
      height: 4.34cqh !important;
      border-radius: 0 0 1.82cqw 1.82cqw !important;
      font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif !important;
      font-size: 3.72cqw !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      letter-spacing: -0.02em !important;
    }

    /* Bet panel under the card grid, matching the supplied mobile frame. */
    .bonus-buy-bet-widget {
      top: 86.62cqh !important;
      left: 50% !important;
      width: 42.30cqw !important;
      height: 11.10cqh !important;
      min-width: 0 !important;
      padding: 0.72cqh 2.0cqw 0.58cqh !important;
      border: 0.72cqw solid transparent !important;
      border-radius: 2.48cqw !important;
      background:
        linear-gradient(#f6f6f7, #f6f6f7) padding-box,
        linear-gradient(180deg, #4b79f3 0%, #4b79f3 70%, #e4245b 100%) border-box !important;
      box-shadow: 0 0.75cqw 1.8cqw rgba(7, 3, 24, 0.28) !important;
      grid-template-rows: max-content max-content max-content max-content !important;
      align-content: center !important;
      row-gap: 0.10cqh !important;
      transform: translateX(-50%) !important;
      overflow: hidden !important;
    }

    .bonus-buy-bet-widget .bonus-buy-bet-title {
      font-size: 4.05cqw !important;
      font-weight: 700 !important;
      line-height: 1 !important;
    }

    .bonus-buy-bet-widget .bonus-buy-bet-value {
      margin: 0.08cqh 0 0 !important;
      font-size: 3.82cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
    }

    .bonus-buy-bet-widget .bonus-buy-bet-actions {
      gap: 3.10cqw !important;
      margin: 0.50cqh 0 0 !important;
    }

    .bonus-buy-bet-widget .bonus-buy-small-action {
      width: 10.05cqw !important;
      min-width: 10.05cqw !important;
      height: 2.42cqh !important;
      padding: 0 !important;
      border-radius: 1.25cqw !important;
      font-size: 4.10cqw !important;
      font-weight: 500 !important;
      line-height: 1 !important;
    }

    .bonus-buy-bet-widget .bonus-buy-balance-line {
      margin: 0.35cqh 0 0 !important;
      font-size: 2.18cqw !important;
      font-weight: 400 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    .bonus-buy-bet-widget .bonus-buy-balance-line span {
      margin-left: 1.25cqw !important;
    }

    /* ------------------------------------------------------------
       CONFIRM BUY — portrait layout
       ------------------------------------------------------------ */
    .bonus-buy-overlay:has(.bonus-buy-confirm-stage) .bonus-buy-title {
      top: 2.72cqh !important;
      font-size: 7.15cqw !important;
    }

    .bonus-buy-confirm-stage {
      top: 50% !important;
      left: 50% !important;
      width: 100% !important;
      display: grid !important;
      justify-items: center !important;
      gap: 2.20cqh !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm {
      position: relative !important;
      width: 72.50cqw !important;
      height: auto !important;
      min-height: 0 !important;
      aspect-ratio: 337 / 443 !important;
      border: 0.82cqw solid transparent !important;
      border-radius: 3.35cqw !important;
      background:
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(180deg, #4b79f3 0%, #4b79f3 76%, #e4245b 100%) border-box !important;
      overflow: hidden !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-body {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 0 !important;
      padding: 4.1cqh 4.0cqw 1.5cqh !important;
      box-sizing: border-box !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-body h2 {
      min-height: 5.7cqh !important;
      margin: 0 !important;
      transform: none !important;
      font-size: 5.25cqw !important;
      font-weight: 800 !important;
      line-height: 1.08 !important;
      letter-spacing: -0.025em !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-body p {
      width: 100% !important;
      min-height: 7.0cqh !important;
      margin: 1.0cqh auto 0 !important;
      transform: none !important;
      font-size: 3.35cqw !important;
      font-weight: 400 !important;
      line-height: 1.17 !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-icons,
    .bonus-buy-card-confirm .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      top: 20.5cqh !important;
      width: 100% !important;
      height: 13.4cqh !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      pointer-events: none !important;
    }

    .bonus-buy-card-confirm .bonus-buy-composite-image {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      max-width: none !important;
      max-height: none !important;
      margin: 0 !important;
      object-fit: contain !important;
      transform-origin: center !important;
    }

    .bonus-buy-card-confirm .composite-free-spins {
      width: 31cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .composite-road-rage {
      width: 43cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .composite-ride-or-crash {
      width: 31cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .composite-bonus-road {
      width: 44cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .composite-most-wanted {
      width: 57cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .composite-big-score {
      width: 46cqw !important;
      transform: translate(-50%, -50%) !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-price {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 6.55cqh !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 6.15cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
      text-align: center !important;
    }

    .bonus-buy-card-confirm .bonus-buy-card-action {
      position: absolute !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 6.05cqh !important;
      min-height: 6.05cqh !important;
      font-size: 5.5cqw !important;
      font-weight: 800 !important;
      border-radius: 0 0 2.35cqw 2.35cqw !important;
    }

    .bonus-buy-confirm-panel {
      width: 72.50cqw !important;
      height: 15.0cqh !important;
      min-width: 0 !important;
      padding: 1.35cqh 3.3cqw 1.05cqh !important;
      border: 0.82cqw solid transparent !important;
      border-radius: 3.0cqw !important;
      background:
        linear-gradient(#f6f6f7, #f6f6f7) padding-box,
        linear-gradient(180deg, #4b79f3 0%, #4b79f3 70%, #e4245b 100%) border-box !important;
      grid-template-rows: max-content max-content max-content max-content !important;
      align-content: center !important;
      row-gap: 0 !important;
    }

    .bonus-buy-confirm-panel .bonus-buy-confirm-title {
      font-size: 4.45cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
    }

    .bonus-buy-confirm-panel .bonus-buy-confirm-value {
      margin-top: 0.28cqh !important;
      font-size: 4.85cqw !important;
      font-weight: 800 !important;
      line-height: 1 !important;
    }

    .bonus-buy-confirm-panel .bonus-buy-confirm-actions {
      width: 100% !important;
      gap: 3.15cqw !important;
      margin-top: 0.88cqh !important;
    }

    .bonus-buy-confirm-panel .bonus-buy-confirm-button {
      width: 27.8cqw !important;
      min-width: 27.8cqw !important;
      height: 3.45cqh !important;
      padding: 0 !important;
      border-radius: 1.38cqw !important;
      font-size: 3.6cqw !important;
      font-weight: 700 !important;
      line-height: 1 !important;
    }

    .bonus-buy-confirm-panel .bonus-buy-confirm-button.cancel {
      background: #e72458 !important;
    }

    .bonus-buy-confirm-panel .confirm-balance-line {
      margin-top: 0.80cqh !important;
      font-size: 2.8cqw !important;
      font-weight: 400 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }
  }


  /* ================================================================
     MOBILE IMAGE ANCHOR FIX
     Composite artwork is anchored to each card itself. The artwork
     zone uses card-relative percentages, so images cannot drift with
     viewport height or overlap the price, action button or confirm UI.
     ================================================================ */
  @media (orientation: portrait) and (max-width: 767px) {
    .bonus-buy-cards .bonus-buy-card,
    .bonus-buy-card-confirm {
      position: relative !important;
      isolation: isolate !important;
    }

    .bonus-buy-cards .bonus-buy-card-body,
    .bonus-buy-card-confirm .bonus-buy-card-body {
      position: relative !important;
      overflow: hidden !important;
    }

    /* Regular 2 × 3 mobile cards. */
    .bonus-buy-cards .bonus-buy-card-icons,
    .bonus-buy-cards .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
      position: absolute !important;
      left: 4% !important;
      right: 4% !important;
      top: 39% !important;
      width: 92% !important;
      height: 31% !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      z-index: 2 !important;
      contain: layout paint !important;
    }

    .bonus-buy-cards .bonus-buy-composite-image {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 94% !important;
      margin: 0 !important;
      object-fit: contain !important;
      transform: translate(-50%, -50%) !important;
      transform-origin: center !important;
    }

    .bonus-buy-cards .composite-free-spins {
      width: 42% !important;
    }

    .bonus-buy-cards .composite-road-rage {
      width: 62% !important;
    }

    .bonus-buy-cards .composite-ride-or-crash {
      width: 43% !important;
    }

    .bonus-buy-cards .composite-bonus-road {
      width: 66% !important;
    }

    .bonus-buy-cards .composite-most-wanted {
      width: 88% !important;
    }

    .bonus-buy-cards .composite-big-score {
      width: 70% !important;
    }

    /* Confirm-buy card. The zone is relative to the confirm card,
       not the viewport, and is clipped before the price area. */
    .bonus-buy-card-confirm .bonus-buy-card-icons,
    .bonus-buy-card-confirm .bonus-buy-card-icons:has(.bonus-buy-composite-image) {
      position: absolute !important;
      left: 6% !important;
      right: 6% !important;
      top: 43% !important;
      width: 88% !important;
      height: 31% !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      z-index: 2 !important;
      contain: layout paint !important;
    }

    .bonus-buy-card-confirm .bonus-buy-composite-image {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      height: auto !important;
      max-width: 100% !important;
      max-height: 94% !important;
      margin: 0 !important;
      object-fit: contain !important;
      transform: translate(-50%, -50%) !important;
      transform-origin: center !important;
    }

    .bonus-buy-card-confirm .composite-free-spins {
      width: 48% !important;
    }

    .bonus-buy-card-confirm .composite-road-rage {
      width: 67% !important;
    }

    .bonus-buy-card-confirm .composite-ride-or-crash {
      width: 48% !important;
    }

    .bonus-buy-card-confirm .composite-bonus-road {
      width: 69% !important;
    }

    .bonus-buy-card-confirm .composite-most-wanted {
      width: 88% !important;
    }

    .bonus-buy-card-confirm .composite-big-score {
      width: 72% !important;
    }

    .bonus-buy-cards .bonus-buy-card-price,
    .bonus-buy-card-confirm .bonus-buy-card-price,
    .bonus-buy-cards .bonus-buy-card-action,
    .bonus-buy-card-confirm .bonus-buy-card-action {
      z-index: 4 !important;
    }
  }


  /* WIN SCREENS ---------------------------------------------------------- */
  .win-debug-button {
    position: absolute;
    z-index: 120;
    top: 0.72cqh;
    left: 0.72cqw;
    min-width: 2.55cqw;
    height: 1.45cqw;
    padding: 0 0.48cqw;
    border: 1px solid rgba(255, 255, 255, 0.78);
    border-radius: 0.3cqw;
    background: rgba(8, 5, 36, 0.82);
    color: #ffffff;
    font-size: 0.58cqw;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.08em;
    cursor: pointer;
    box-shadow: 0 0.12cqw 0.42cqw rgba(0, 0, 0, 0.34);
  }

  .win-debug-button:hover {
    background: rgba(61, 28, 92, 0.94);
  }

  .win-screen-overlay {
    position: absolute;
    z-index: 110;
    inset: 0;
    overflow: hidden;
    outline: none;
    cursor: pointer;
    touch-action: manipulation;
  }

  .win-screen-dim {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    max-width: none;
    object-fit: fill;
    pointer-events: none;
  }

  /*
   * The supplied effect artwork is 1920 × 1498. It is intentionally taller
   * than the 16:9 game canvas and is centred vertically, matching the supplied
   * references where the particles extend beyond the game image.
   */
  .win-screen-artboard {
    position: absolute;
    left: 50%;
    /* Raise the whole win composition by 100 px on the 1920 px reference canvas. */
    top: calc(50% - 5.208333cqw);
    width: 100cqw;
    height: 78.020833cqw;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .win-screen-effects {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .win-screen-title,
  .win-screen-word {
    position: absolute;
    display: block;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0.22cqw 0.2cqw rgba(32, 2, 50, 0.35));
  }

  /* Native positions measured directly from the supplied 1920 × 1498 refs. */
  .win-screen-title-big {
    left: 30.989583%;
    top: 33.978638%;
    width: 37.708333%;
  }

  .win-screen-title-mega {
    left: 25.625%;
    top: 35.914553%;
    width: 48.802083%;
  }

  .win-screen-title-epic {
    left: 29.375%;
    top: 33.444593%;
    width: 40.260417%;
  }

  .win-screen-word {
    left: 33.645833%;
    top: 51.935915%;
    width: 32.708333%;
  }

  .win-screen-amount {
    position: absolute;
    left: 50%;
    top: 74.57%;
    width: 35%;
    transform: translate(-50%, -50%);
    color: #e2ca68;
    font-family: 'Aldrich', 'Jost', Arial, Helvetica, sans-serif;
    font-size: 3.65cqw;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.035em;
    text-align: center;
    white-space: nowrap;
    text-shadow:
      0 0 0.22cqw rgba(226, 202, 104, 0.42),
      0 0.12cqw 0.2cqw rgba(0, 0, 0, 0.72);
  }

  /*
   * Pages 4–5 use the supplied 1920 × 1206 composition. They are positioned
   * 100 px lower than the previous version on the 1920 px reference canvas.
   */
  .win-screen-artboard-you-win {
    top: calc(50% - 3.28125cqw);
    width: 100cqw;
    height: 62.8125cqw;
  }

  .win-screen-you-win-effects {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .win-screen-congratulations,
  .win-screen-you-win-title {
    position: absolute;
    display: block;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0.22cqw 0.2cqw rgba(32, 2, 50, 0.35));
  }

  /* Positions measured from the supplied 1920 × 1206 references. */
  .win-screen-congratulations {
    left: 24.84375%;
    top: 28.524046%;
    width: 49.6875%;
  }

  .win-screen-you-win-title {
    left: 19.6875%;
    top: 44.278607%;
    width: 60%;
  }

  .win-screen-you-win-amount {
    position: absolute;
    left: 50%;
    top: 74.129353%;
    width: 34%;
    transform: translate(-50%, -50%);
    color: #e2ca68;
    font-family: 'Aldrich', 'Jost', Arial, Helvetica, sans-serif;
    font-size: 3.15cqw;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.035em;
    text-align: center;
    white-space: nowrap;
    text-shadow:
      0 0 0.22cqw rgba(226, 202, 104, 0.42),
      0 0.12cqw 0.2cqw rgba(0, 0, 0, 0.72);
  }

  .win-screen-you-win-subtitle {
    position: absolute;
    left: 50%;
    top: 84.079602%;
    width: 48%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-family: 'Aldrich', 'Jost', Arial, Helvetica, sans-serif;
    font-size: 2.65cqw;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.055em;
    text-align: center;
    white-space: nowrap;
    text-shadow: 0 0.12cqw 0.2cqw rgba(0, 0, 0, 0.72);
  }

  .win-screen-continue {
    position: absolute;
    left: 50%;
    top: 90.13267%;
    width: 48%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-family: 'Gantari', 'Jost', Arial, Helvetica, sans-serif;
    font-size: 1.42cqw;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.025em;
    text-align: center;
    white-space: nowrap;
    text-shadow: 0 0.1cqw 0.18cqw rgba(0, 0, 0, 0.72);
  }

  @media (orientation: portrait) and (max-width: 767px) {
    .win-debug-button {
      top: max(8px, env(safe-area-inset-top));
      left: 8px;
      min-width: 46px;
      height: 25px;
      padding: 0 9px;
      border-radius: 6px;
      font-size: 10px;
    }

    /* Keep the desktop composition intact and crop it naturally on portrait. */
    .win-screen-artboard {
      width: 178vw;
      height: calc(178vw * 1498 / 1920);
    }

    .win-screen-artboard-you-win {
      width: 178vw;
      height: calc(178vw * 1206 / 1920);
    }

    .win-screen-amount {
      font-size: 6.5vw;
    }

    .win-screen-you-win-amount {
      font-size: 5.6vw;
    }

    .win-screen-you-win-subtitle {
      font-size: 4.7vw;
    }

    .win-screen-continue {
      font-size: 2.55vw;
    }
  }


  /* ================================================================
   * WIN SCREENS — PORTRAIT MOBILE LAYOUT
   * Reference viewport: 402 × 874.
   * The artwork remains proportional; only its crop/anchor changes.
   * ================================================================ */
  @media (orientation: portrait) and (max-width: 767px) {
    .win-screen-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      isolation: isolate;
    }

    .win-screen-dim {
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      object-position: center;
    }

    /* BIG / MEGA / EPIC ------------------------------------------------ */
    .win-screen-artboard:not(.win-screen-artboard-you-win) {
      left: 50%;
      top: 45.3dvh;
      width: min(170vw, 77dvh);
      height: calc(min(170vw, 77dvh) * 1498 / 1920);
      transform: translate(-50%, -50%);
    }

    .win-screen-effects {
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .win-screen-title,
    .win-screen-word {
      height: auto;
      max-width: none;
      filter: drop-shadow(0 1px 2px rgba(32, 2, 50, 0.38));
    }

    /* Individual title sizes preserve the visual weight from the mockup. */
    .win-screen-title-big {
      left: 29.5%;
      top: 34.2%;
      width: 40.5%;
    }

    .win-screen-title-mega {
      left: 24.1%;
      top: 35.7%;
      width: 51.8%;
    }

    .win-screen-title-epic {
      left: 28.2%;
      top: 33.8%;
      width: 43.5%;
    }

    .win-screen-word {
      left: 32.1%;
      top: 51.1%;
      width: 35.8%;
    }

    .win-screen-amount {
      left: 50%;
      top: 74.55%;
      width: 39%;
      transform: translate(-50%, -50%);
      font-size: clamp(21px, 6.2vw, 29px);
      letter-spacing: 0.035em;
      text-shadow:
        0 0 2px rgba(226, 202, 104, 0.45),
        0 1px 2px rgba(0, 0, 0, 0.76);
    }

    /* CONGRATULATIONS / YOU WIN -------------------------------------- */
    .win-screen-artboard-you-win {
      left: 50%;
      top: 43.8dvh;
      width: min(164vw, 75dvh);
      height: calc(min(164vw, 75dvh) * 1206 / 1920);
      transform: translate(-50%, -50%);
    }

    .win-screen-you-win-effects {
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
    }

    .win-screen-congratulations {
      left: 23.7%;
      top: 28.1%;
      width: 52.6%;
    }

    .win-screen-you-win-title {
      left: 18.2%;
      top: 43.8%;
      width: 63.6%;
    }

    .win-screen-you-win-amount {
      left: 50%;
      top: 74.05%;
      width: 39%;
      transform: translate(-50%, -50%);
      font-size: clamp(20px, 5.65vw, 27px);
      letter-spacing: 0.035em;
      text-shadow:
        0 0 2px rgba(226, 202, 104, 0.45),
        0 1px 2px rgba(0, 0, 0, 0.76);
    }

    .win-screen-you-win-subtitle {
      left: 50%;
      top: 84.15%;
      width: 69%;
      transform: translate(-50%, -50%);
      font-size: clamp(17px, 4.65vw, 23px);
      line-height: 1;
      letter-spacing: 0.045em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.76);
    }

    .win-screen-continue {
      left: 50%;
      top: 91.0%;
      width: 72%;
      transform: translate(-50%, -50%);
      font-size: clamp(10px, 2.85vw, 14px);
      line-height: 1;
      letter-spacing: 0.02em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.76);
    }
  }

  /* Slightly compact portrait phones: keep the complete amount panel visible. */
  @media (orientation: portrait) and (max-width: 767px) and (max-aspect-ratio: 9 / 18) {
    .win-screen-artboard:not(.win-screen-artboard-you-win) {
      top: 44.5dvh;
      width: min(160vw, 73dvh);
      height: calc(min(160vw, 73dvh) * 1498 / 1920);
    }

    .win-screen-artboard-you-win {
      top: 43dvh;
      width: min(156vw, 71dvh);
      height: calc(min(156vw, 71dvh) * 1206 / 1920);
    }
  }

  /* Very tall phones: keep the composition visually tied to the reel board. */
  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 21) {
    .win-screen-artboard:not(.win-screen-artboard-you-win) {
      top: 44.8dvh;
    }

    .win-screen-artboard-you-win {
      top: 43.4dvh;
    }
  }

  .mw-bonus-debug-button {
    position: absolute;
    z-index: 66;
    top: 80px;
    left: 18px;
    min-width: 82px;
    padding: 10px 12px;
    border: 1px solid rgba(255, 255, 255, 0.42);
    border-radius: 10px;
    background: rgba(13, 10, 31, 0.86);
    color: #ffffff;
    font-family: 'Jost', 'Gantari', Arial, sans-serif;
    font-size: 12px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    backdrop-filter: blur(7px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
  }

  .mw-bonus-overlay-screen {
    position: absolute;
    inset: 0;
    z-index: 55;
    overflow: hidden;
    background: #050716;
  }

  .mw-bonus-scene,
  .mw-bonus-vignette,
  .mw-bonus-overlay-content {
    position: absolute;
    inset: 0;
  }

  .mw-bonus-scene {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mw-bonus-vignette {
    background:
      linear-gradient(180deg, rgba(7, 10, 29, 0.18) 0%, rgba(7, 10, 29, 0.26) 100%),
      radial-gradient(circle at 50% 55%, rgba(82, 16, 132, 0.08) 0%, rgba(6, 6, 17, 0.42) 100%);
    pointer-events: none;
  }

  .mw-bonus-overlay-content {
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: clamp(28px, 2.6vw, 46px) clamp(26px, 2.7vw, 52px) clamp(34px, 3.1vw, 62px);
    box-sizing: border-box;
    pointer-events: none;
  }

  .mw-top-strip {
    width: min(1160px, 84vw);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: clamp(18px, 2vw, 34px);
    margin-top: clamp(8px, 1vw, 16px);
  }

  .mw-fs-left-card {
    position: relative;
    width: min(320px, 23vw);
    aspect-ratio: 320 / 108;
    flex: 0 0 auto;
  }

  .mw-fs-left-card > img,
  .mw-top-plate-bg,
  .mw-reel-gradient {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
    user-select: none;
    pointer-events: none;
  }

  .mw-fs-left-copy {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 28px;
    box-sizing: border-box;
  }

  .mw-fs-left-label,
  .mw-fs-left-value {
    font-family: 'GTA Russian', 'Gantari', Arial, sans-serif;
    color: #ffffff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.85), 0 0 14px rgba(255, 0, 170, 0.28);
  }

  .mw-fs-left-label {
    font-size: clamp(18px, 1.45vw, 28px);
    letter-spacing: 0.02em;
  }

  .mw-fs-left-value {
    font-size: clamp(30px, 2.4vw, 46px);
    line-height: 1;
  }

  .mw-top-plates {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: clamp(18px, 1.4vw, 28px);
    flex: 1 1 auto;
  }

  .mw-top-plate {
    position: relative;
    width: min(320px, 23vw);
    aspect-ratio: 320 / 108;
    filter: drop-shadow(0 10px 18px rgba(5, 4, 21, 0.34));
  }

  .mw-top-plate-left {
    transform: rotate(-2deg);
  }

  .mw-top-plate-right {
    transform: rotate(2deg);
  }

  .mw-top-star {
    position: absolute;
    left: 10px;
    top: 8px;
    width: 98px;
    height: 92px;
  }

  .mw-top-star > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .mw-top-star > span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    color: rgba(217, 217, 217, 0.5);
    font-family: 'GTA Russian', 'Gantari', Arial, sans-serif;
    font-size: 19px;
    line-height: 1;
    -webkit-text-stroke: 1px #000000;
    text-shadow: 0 0 1px #000000;
  }

  .mw-top-plate-column {
    position: absolute;
    top: 12px;
    width: 74px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }

  .mw-top-plate-cop {
    left: 138px;
  }

  .mw-top-plate-gang {
    left: 220px;
  }

  .mw-top-plate-label {
    color: #ffffff;
    font-family: 'GTA Russian', 'Gantari', Arial, sans-serif;
    font-size: 16px;
    line-height: 1;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.85);
  }

  .mw-top-plate-column > img {
    width: 58px;
    height: 58px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.28));
  }

  .mw-reel-stage {
    position: relative;
    width: min(1100px, 72vw);
    margin-top: clamp(26px, 2.25vw, 40px);
    padding-bottom: clamp(18px, 1.8vw, 32px);
  }

  .mw-reel-gradient {
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 18px;
    width: calc(100% + 180px);
    height: calc(100% - 12px);
    transform: translateX(-50%);
    opacity: 0.9;
  }

  .mw-reel-board {
    position: relative;
    z-index: 2;
    width: 100%;
    aspect-ratio: 1.82 / 1;
    border-radius: clamp(20px, 1.9vw, 34px);
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.42);
    background: linear-gradient(180deg, rgba(6, 16, 60, 0.86) 0%, rgba(0, 4, 21, 0.92) 100%);
    box-shadow: 0 24px 55px rgba(5, 7, 25, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.07), inset 0 -55px 90px rgba(255, 0, 157, 0.08), inset 0 55px 90px rgba(47, 132, 255, 0.08);
  }

  .mw-reel-board-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%), linear-gradient(90deg, rgba(255, 53, 53, 0.14) 0%, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0) 78%, rgba(46, 94, 255, 0.14) 100%);
    pointer-events: none;
  }

  .mw-reel-grid {
    position: absolute;
    inset: clamp(20px, 2vw, 30px);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(12px, 1vw, 18px);
  }

  .mw-reel-column {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: clamp(12px, 1vw, 18px);
  }

  .mw-symbol-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: clamp(14px, 1.2vw, 22px);
    background: linear-gradient(180deg, rgba(20, 30, 87, 0.76) 0%, rgba(4, 10, 34, 0.88) 100%);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 22px rgba(0, 0, 0, 0.16);
  }

  .mw-symbol {
    width: 72%;
    height: 72%;
    object-fit: contain;
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.24));
  }

  @media (max-width: 1280px) {
    .mw-top-strip {
      width: min(1100px, 92vw);
    }

    .mw-reel-stage {
      width: min(1020px, 86vw);
    }
  }

  @media (orientation: portrait), (max-width: 767px) {
    .mw-bonus-debug-button {
      top: 56px;
      left: 10px;
      min-width: 72px;
      padding: 7px 9px;
      font-size: 11px;
    }

    .mw-bonus-overlay-content {
      padding: 56px 14px 20px;
    }

    .mw-top-strip {
      width: min(402px, 100%);
      flex-direction: column;
      gap: 10px;
      align-items: center;
      margin-top: 0;
    }

    .mw-fs-left-card {
      width: min(286px, 78vw);
    }

    .mw-top-plates {
      width: 100%;
      gap: 8px;
      justify-content: center;
    }

    .mw-top-plate {
      width: min(188px, 46vw);
    }

    .mw-top-star {
      left: 6px;
      top: 5px;
      width: 58px;
      height: 54px;
    }

    .mw-top-star > span {
      font-size: 12px;
    }

    .mw-top-plate-column {
      top: 6px;
      width: 38px;
      gap: 0;
    }

    .mw-top-plate-cop {
      left: 82px;
    }

    .mw-top-plate-gang {
      left: 128px;
    }

    .mw-top-plate-label {
      font-size: 9px;
    }

    .mw-top-plate-column > img {
      width: 31px;
      height: 31px;
    }

    .mw-fs-left-copy {
      padding: 0 20px 0 18px;
    }

    .mw-fs-left-label {
      font-size: 16px;
    }

    .mw-fs-left-value {
      font-size: 28px;
    }

    .mw-reel-stage {
      width: min(402px, 100%);
      margin-top: 14px;
    }

    .mw-reel-gradient {
      width: calc(100% + 34px);
      top: 10px;
      height: calc(100% - 6px);
    }

    .mw-reel-board {
      aspect-ratio: 0.86;
      border-radius: 18px;
    }

    .mw-reel-grid {
      inset: 10px;
      gap: 8px;
    }

    .mw-reel-column {
      gap: 8px;
    }

    .mw-symbol-cell {
      border-radius: 10px;
    }

    .mw-symbol {
      width: 78%;
      height: 78%;
    }
  }


  /* MOST WANTED BONUS: use the unchanged standard game layout. */
  .mw-standard-reel-gradient {
    position: absolute;
    z-index: 2;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
    object-fit: fill;
    opacity: 1;
    pointer-events: none;
  }

  .mw-standard-hud {
    position: absolute;
    inset: 0;
    z-index: 24;
    pointer-events: none;
  }

  .mw-standard-top-plates {
    position: absolute;
    top: 1.7%;
    left: 25.95%;
    width: 44.85%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.93%;
    z-index: 3;
  }

  .mw-standard-top-plate {
    position: relative;
    width: 23.55%;
    aspect-ratio: 338 / 118;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.32));
  }

  .mw-standard-top-plate.dimmed {
    opacity: 0.46;
  }

  .mw-standard-top-plate-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .mw-standard-top-star {
    position: absolute;
    top: 8%;
    left: 4.2%;
    width: 29%;
    height: 78%;
  }

  .mw-standard-top-star > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .mw-standard-top-star > span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1%;
    font-family: 'GTA Russian', 'Jost', Arial, Helvetica, sans-serif;
    font-size: 1.12cqw;
    line-height: 1;
    color: #D9D9D9;
    -webkit-text-stroke: 1px #000000;
    paint-order: stroke fill;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.95);
  }

  .mw-standard-top-lane {
    position: absolute;
    top: 7%;
    width: 22.5%;
    height: 82%;
  }

  .mw-standard-top-lane-cop {
    left: 42.5%;
  }

  .mw-standard-top-lane-gang {
    left: 67.7%;
  }

  .mw-standard-top-count {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'GTA Russian', 'Jost', Arial, Helvetica, sans-serif;
    color: #ffffff;
    line-height: 1;
    white-space: nowrap;
    text-shadow:
      0 1px 0 rgba(0, 0, 0, 0.95),
      0 0 2px rgba(0, 0, 0, 0.8);
  }

  .mw-standard-top-count {
    top: 0%;
    font-size: 1.05cqw;
  }

  .mw-standard-top-lane > img {
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    width: 100%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
  }


  .mw-standard-fs-card {
    position: absolute;
    top: 29.15%;
    left: 6.28%;
    width: 15.66%;
    aspect-ratio: 300 / 104;
  }

  .mw-standard-fs-card > img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .mw-standard-fs-copy {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8.8% 0 8.1%;
    transform: translateY(0px);
  }

  .mw-standard-fs-label,
  .mw-standard-fs-value {
    display: block;
    flex: 0 0 auto;
    overflow: visible;
    filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.88));
  }

  .mw-standard-fs-label {
    width: 75.5%;
    height: 86%;
  }

  .mw-standard-fs-value {
    width: 28.5%;
    height: 92%;
  }

  .mw-standard-fs-label text {
    vector-effect: non-scaling-stroke;
  }

  .mw-standard-fs-value text {
    vector-effect: none;
  }

  .most-wanted-bonus-active .game-logo,
  .most-wanted-bonus-active .bonus-buy-button {
    display: none !important;
  }

  .most-wanted-bonus-active .scene-shade {
    background: transparent !important;
  }

  /* The debug trigger must remain tiny and must not alter the game layout. */
  .mw-bonus-debug-button {
    top: 1.45% !important;
    left: 1.1% !important;
    min-width: 0 !important;
    padding: 7px 9px !important;
    border-radius: 8px !important;
    font-size: 10px !important;
  }

  @media (orientation: portrait) and (max-width: 767px) {
    .mw-standard-reel-gradient {
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .mw-standard-top-plates {
      top: 2.6%;
      left: 25.8%;
      width: 44.5%;
      gap: 0.7%;
    }

    .mw-standard-top-star > span {
      font-size: 2.2cqw;
    }

    .mw-standard-top-count {
      font-size: 1.7cqw;
    }

    .mw-standard-fs-card {
      top: 59.2%;
      left: 5.5%;
      width: 44%;
    }

  }


  @media (orientation: portrait) and (max-width: 767px) {
    .most-wanted-bonus-active .game-logo {
      display: block !important;
      z-index: 26;
      top: max(calc(env(safe-area-inset-top, 0px) + 10px), 2.8dvh);
      left: 50%;
      width: clamp(170px, 47vw, 205px);
      height: auto;
      transform: translateX(-50%);
    }

    .most-wanted-bonus-active .mw-standard-hud {
      z-index: 25;
    }

    .most-wanted-bonus-active .mw-standard-top-plates {
      top: max(calc(env(safe-area-inset-top, 0px) + 102px), 13.4dvh);
      left: 3.2%;
      width: 93.6%;
      gap: 1.1%;
      justify-content: space-between;
    }

    .most-wanted-bonus-active .mw-standard-top-plate {
      width: 24.15%;
    }

    .most-wanted-bonus-active .mw-standard-top-star > span {
      font-size: clamp(10px, 2.75vw, 13px);
    }

    .most-wanted-bonus-active .mw-standard-top-count {
      top: 0%;
      font-size: clamp(10px, 2.8vw, 13px);
    }

    .most-wanted-bonus-active .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 112px), 16.2dvh);
      left: 50%;
      width: min(96.3vw, 423px);
      transform: translateX(-50%);
    }

    .most-wanted-bonus-active .hero-character {
      z-index: 6;
      top: auto;
      right: 0.75vw;
      bottom: clamp(-190px, -20dvh, -177px);
      left: auto;
      width: min(72.388vw, 41dvh, 360px);
      height: auto;
    }

    .most-wanted-bonus-active .mw-standard-fs-card {
      z-index: 27;
      top: auto;
      left: 4.2%;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 108px);
      width: min(35.8vw, 152px);
    }

    .most-wanted-bonus-active .mw-standard-fs-copy {
      align-items: center;
      padding: 0 8.6% 0 7.6%;
      transform: translateY(0px);
    }

    .most-wanted-bonus-active .mw-standard-fs-label {
      width: 75.2%;
      height: 88%;
    }

    .most-wanted-bonus-active .mw-standard-fs-value {
      width: 29.5%;
      height: 94%;
    }

    .most-wanted-bonus-active .auto-spin-button {
      z-index: 12;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 20px);
      left: clamp(16px, 4.2vw, 24px);
    }

    .most-wanted-bonus-active .mobile-spin-button {
      display: none;
    }

    .most-wanted-bonus-active .spin-button {
      display: none;
    }

    .most-wanted-bonus-active .bet-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 24px);
    }

    .most-wanted-bonus-active .decrease-button {
      left: calc(50% - clamp(96px, 24vw, 106px));
    }

    .most-wanted-bonus-active .increase-button {
      right: calc(50% - clamp(96px, 24vw, 106px));
    }

    .most-wanted-bonus-active .balance-bet-panel {
      z-index: 10;
    }

    .most-wanted-bonus-active .mw-bonus-debug-button {
      z-index: 40;
      top: max(calc(env(safe-area-inset-top, 0px) + 8px), 1.1dvh) !important;
      left: 8px !important;
      padding: 6px 8px !important;
      font-size: 9px !important;
    }
  }


  /* GAMBLE BONUS SCREEN */
  .gamble-bonus-screen {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }

  .gamble-bonus-active .main-stage,
  .gamble-bonus-active .hero-character,
  .gamble-bonus-active .bonus-buy-button {
    display: none !important;
  }

  .gamble-bonus-active .scene-shade {
    background: transparent !important;
  }

  .gamble-choice-panel {
    position: absolute;
    top: 5.2%;
    left: 22.45%;
    width: 55.1%;
    aspect-ratio: 1058 / 380;
  }

  .gamble-choice-panel > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .gamble-choice {
    position: absolute;
    top: 4.8%;
    width: 19.0%;
    height: 94%;
  }

  .gamble-choice-1 { left: 1.2%; }
  .gamble-choice-2 { left: 19.7%; }
  .gamble-choice-3 { left: 38.4%; }
  .gamble-choice-4 { left: 59.2%; }
  .gamble-choice-5 { left: 77.6%; }

  .gamble-choice > img {
    position: absolute;
    top: -6.5%;
    left: 50%;
    width: 84%;
    height: 118%;
    object-fit: contain;
    transform: translateX(-50%);
    transform-origin: center;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.35));
  }

  .gamble-choice-text-svg {
    position: absolute;
    top: 28.8%;
    left: 50%;
    width: 86%;
    height: 28%;
    transform: translateX(-50%) rotate(-5deg);
    overflow: visible;
    filter: drop-shadow(0 0.28vw 0.16vw rgba(20, 12, 57, 0.36));
  }

  .gamble-choice-text-svg-bigscore {
    top: 7.8%;
    width: 148%;
    height: 66%;
  }

  .gamble-choice-text-svg-mobile-epic {
    display: none;
  }

  .gamble-lock-assembly {
    position: absolute;
    top: 13.2%;
    left: -1.2%;
    width: 103.8%;
    aspect-ratio: 1518 / 654;
    pointer-events: none;
  }

  .gamble-lock-composite {
    position: absolute;
    z-index: 6;
    top: 36.4%;
    left: 17.1%;
    width: 62.8%;
    height: auto;
    object-fit: contain;
    transform: none;
    transform-origin: center;
    filter: drop-shadow(0 0.48vw 0.62vw rgba(4, 0, 18, 0.38));
  }

  .gamble-bonus-debug-button {
    position: absolute;
    z-index: 120;
    top: 1.45%;
    left: 6.3%;
    min-width: 0;
    padding: 7px 9px;
    border: 1px solid rgba(255,255,255,.55);
    border-radius: 8px;
    background: rgba(12, 11, 39, .88);
    color: #fff;
    font-family: 'GTA Russian', 'Jost', Arial, sans-serif;
    font-size: 10px;
    cursor: pointer;
  }

  .gamble-bonus-active .spin-button,
  .gamble-bonus-active .mobile-spin-button {
    opacity: .4;
  }


  /* BIG SCORE BONUS — isolated overlay. Existing screens are not restyled. */
  .big-score-bonus-debug-button {
    position: absolute;
    z-index: 260;
    top: 1.45%;
    left: 11.4%;
    min-width: 0;
    padding: 7px 9px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    border-radius: 8px;
    background: rgba(47, 8, 15, 0.9);
    color: #ffffff;
    font-family: 'GTA Russian', 'Jost', Arial, sans-serif;
    font-size: 10px;
    line-height: 1;
    cursor: pointer;
  }

  .big-score-bonus-overlay {
    position: absolute;
    z-index: 220;
    inset: 0;
    overflow: hidden;
    container-type: size;
    pointer-events: auto;
    isolation: isolate;
  }

  .big-score-bonus-background {
    position: absolute;
    z-index: 0;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .big-score-bonus-logo {
    position: absolute;
    z-index: 5;
    top: 15.1%;
    left: 2.05%;
    width: 18.25%;
    height: auto;
    object-fit: contain;
    pointer-events: none;
  }

  .big-score-bonus-fs-panel {
    position: absolute;
    z-index: 7;
    top: 31.15%;
    left: 5.5%;
    width: 15.65%;
    aspect-ratio: 300 / 108;
    pointer-events: none;
  }

  .big-score-bonus-fs-panel > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .big-score-bonus-fs-copy {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8.4% 0 8%;
    transform: translateY(1px);
  }

  .big-score-bonus-fs-label {
    width: 70%;
    height: 82%;
    overflow: visible;
  }

  .big-score-bonus-fs-value {
    width: 25.5%;
    height: 88%;
    overflow: visible;
  }

  .big-score-bonus-fs-label text {
    vector-effect: non-scaling-stroke;
  }

  .big-score-bonus-fs-value text {
    vector-effect: none;
  }

  .big-score-bonus-board {
    position: absolute;
    z-index: 4;
    top: 1.759259%;
    left: 22.916667%;
    width: 49.947917%;
    aspect-ratio: 959 / 942;
    pointer-events: none;
  }

  .big-score-bonus-board-background {
    position: absolute;
    z-index: 1;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .big-score-bonus-symbol-grid {
    position: absolute;
    z-index: 3;
    top: 4.670913%;
    left: 4.483837%;
    width: 91.240876%;
    height: 92.887473%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }

  .big-score-bonus-symbol-cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 0;
  }

  .big-score-bonus-symbol-cell > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 0.52cqw rgba(255, 0, 112, 0.28));
  }

  .big-score-bonus-column-assets {
    position: absolute;
    z-index: 4;
    inset: 0;
    pointer-events: none;
  }

  .big-score-bonus-divider {
    position: absolute;
    top: 5.095541%;
    display: block;
    width: 0.312826%;
    height: 91.401274%;
    object-fit: fill;
    pointer-events: none;
  }

  .big-score-bonus-character {
    position: absolute;
    z-index: 6;
    top: 4.05%;
    right: 1.2%;
    width: 28.85%;
    height: auto;
    object-fit: contain;
    pointer-events: none;
  }

  .big-score-bonus-bottom-ui {
    position: absolute;
    z-index: 8;
    inset: 0;
    pointer-events: none;
  }

  .big-score-bonus-bottom-background,
  .big-score-bonus-mobile-bottom-background,
  .big-score-bonus-panel-stroke {
    position: absolute;
    left: 0;
    top: 74.444444%;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .big-score-bonus-bottom-background {
    z-index: 0;
  }

  .big-score-bonus-mobile-bottom-background {
    display: none;
    z-index: 0;
  }

  .big-score-bonus-panel-stroke {
    z-index: 1;
  }

  .big-score-bonus-icon-button,
  .big-score-bonus-auto-button,
  .big-score-bonus-spin-button,
  .big-score-bonus-minus-button,
  .big-score-bonus-plus-button {
    position: absolute;
    z-index: 3;
    border: 0;
    padding: 0;
    background: transparent;
    color: #ffffff;
    pointer-events: auto;
    cursor: pointer;
  }

  .big-score-bonus-icon-button > img,
  .big-score-bonus-auto-button > img,
  .big-score-bonus-spin-button > img,
  .big-score-bonus-minus-button > img,
  .big-score-bonus-plus-button > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .big-score-bonus-music-button {
    top: 92.037037%;
    left: 8.854167%;
    width: 1.770833%;
    aspect-ratio: 1;
  }

  .big-score-bonus-sound-button {
    top: 95.555556%;
    left: 8.854167%;
    width: 1.770833%;
    aspect-ratio: 1;
  }

  .big-score-bonus-info-button {
    top: 92.5%;
    left: 11.5625%;
    width: 3.229167%;
    aspect-ratio: 1;
  }

  .big-score-bonus-balance-bet-panel {
    position: absolute;
    z-index: 4;
    top: 93.055556%;
    left: 17.1875%;
    width: 22.760417%;
    aspect-ratio: 437 / 50;
    font-family: 'Jost', 'Gantari', Arial, sans-serif;
  }

  .big-score-bonus-balance-bet-background,
  .big-score-bonus-total-win > img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }

  .big-score-bonus-balance-bet-divider {
    position: absolute;
    z-index: 2;
    top: 18%;
    left: 53.318078%;
    width: 0.457666%;
    height: 72%;
    pointer-events: none;
  }

  .big-score-bonus-stat {
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  .big-score-bonus-stat-balance {
    left: 0;
    width: 53.318078%;
  }

  .big-score-bonus-stat-bet {
    right: 0;
    width: 46.681922%;
  }

  .big-score-bonus-stat span {
    margin-bottom: 0.14em;
    color: #e4a3f5;
    font-size: clamp(6px, 0.68cqw, 13px);
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 0.1em 0.2em rgba(31, 5, 48, 0.8);
  }

  .big-score-bonus-stat strong {
    color: #ffffff;
    font-size: clamp(8px, 0.95cqw, 19px);
    font-weight: 900;
    white-space: nowrap;
    text-shadow: 0 0.1em 0.22em rgba(21, 2, 34, 0.9);
  }

  .big-score-bonus-total-win {
    position: absolute;
    z-index: 4;
    top: 90.925926%;
    left: 41.770833%;
    width: 31.197917%;
    aspect-ratio: 599 / 83;
    font-family: 'Jost', 'Gantari', Arial, sans-serif;
  }

  .big-score-bonus-total-win-copy {
    position: absolute;
    z-index: 2;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.1%;
    padding-bottom: 0.4%;
    line-height: 1;
    text-transform: uppercase;
  }

  .big-score-bonus-total-win-copy span {
    color: #d96cff;
    font-size: clamp(9px, 1.25cqw, 24px);
    font-weight: 950;
    text-shadow: 0 0 0.3em rgba(201, 53, 255, 0.65);
  }

  .big-score-bonus-total-win-copy strong {
    color: #ffffff;
    font-size: clamp(14px, 2.08cqw, 40px);
    font-weight: 950;
    letter-spacing: -0.035em;
    text-shadow: 0 0.1em 0.2em rgba(24, 3, 37, 0.85);
  }

  .big-score-bonus-auto-button {
    top: 92.12963%;
    left: 74.739583%;
    width: 3.75%;
    aspect-ratio: 1;
    opacity: 0.4;
  }

  .big-score-bonus-spin-button {
    top: 75.925926%;
    left: 79.53125%;
    width: 12.65625%;
    aspect-ratio: 1;
    opacity: 0.4;
  }

  .big-score-bonus-minus-button,
  .big-score-bonus-plus-button {
    top: 84.074074%;
    width: 3.177083%;
    aspect-ratio: 1;
    opacity: 0.4;
  }

  .big-score-bonus-minus-button { left: 75.260417%; }
  .big-score-bonus-plus-button { left: 93.28125%; }



  /* GAMBLE BONUS: restore the dedicated portrait layout without touching other screens. */
  @media (orientation: portrait) and (max-width: 767px) {
    .gamble-bonus-active .scene-background {
      object-fit: cover;
      object-position: 50% center;
      transform: none;
    }

    .gamble-bonus-active .game-logo {
      z-index: 14;
      top: max(calc(env(safe-area-inset-top, 0px) + 28px), 3.75dvh);
      left: 50%;
      width: min(44.1vw, 178px);
      height: auto;
      transform: translateX(-50%);
    }

    .gamble-bonus-active .gamble-bonus-screen {
      z-index: 13;
    }

    .gamble-bonus-active .gamble-choice-panel {
      top: max(calc(env(safe-area-inset-top, 0px) + 214px), 24.49dvh);
      left: 50%;
      width: min(94.03vw, 378px);
      aspect-ratio: 1058 / 380;
      transform: translateX(-50%);
    }

    .gamble-bonus-active .gamble-choice {
      top: 2.8%;
      width: 19.2%;
      height: 96%;
    }

    .gamble-bonus-active .gamble-choice-1 { left: 0.7%; }
    .gamble-bonus-active .gamble-choice-2 { left: 20.1%; }
    .gamble-bonus-active .gamble-choice-3 { left: 40.3%; }
    .gamble-bonus-active .gamble-choice-4 { left: 60.5%; }
    .gamble-bonus-active .gamble-choice-5 { left: 79.8%; }

    .gamble-bonus-active .gamble-choice > img {
      top: -5%;
      left: 50%;
      width: 79%;
      height: 111%;
      transform: translateX(-50%);
    }

    .gamble-bonus-active .gamble-choice-text-svg {
      top: 28.5%;
      left: 50%;
      width: 90%;
      height: 30%;
      transform: translateX(-50%);
      filter: drop-shadow(0 2px 1px rgba(20, 12, 57, 0.34));
    }

    .gamble-bonus-active .gamble-choice-text-svg-bigscore {
      display: none;
    }

    .gamble-bonus-active .gamble-choice-text-svg-mobile-epic {
      display: block;
    }

    .gamble-bonus-active .gamble-lock-assembly {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      aspect-ratio: auto;
    }

    .gamble-bonus-active .gamble-lock-composite {
      top: 55.5%;
      left: 50%;
      width: min(130vw, 523px);
      height: auto;
      transform: translateX(-50%);
      filter: drop-shadow(0 4px 5px rgba(4, 0, 18, 0.34));
    }

    .gamble-bonus-active .auto-spin-button,
    .gamble-bonus-active .mobile-spin-button,
    .gamble-bonus-active .spin-button,
    .gamble-bonus-active .bet-button,
    .gamble-bonus-active .total-win-panel {
      display: none !important;
    }

    .gamble-bonus-active .control-deck {
      z-index: 20;
    }

    .gamble-bonus-active .balance-bet-panel,
    .gamble-bonus-active .utility-controls {
      z-index: 22;
    }

    .gamble-bonus-active .gamble-bonus-debug-button {
      z-index: 40;
      top: max(calc(env(safe-area-inset-top, 0px) + 7px), 0.8dvh);
      left: 7px;
      padding: 5px 7px;
      font-size: 8px;
    }
  }


  /* BIG SCORE: isolated portrait layout. Other screens are intentionally untouched. */
  @media (orientation: portrait) and (max-width: 767px) {
    .big-score-bonus-overlay {
      width: 100%;
      height: 100%;
      min-height: 100dvh;
    }

    .big-score-bonus-background {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }

    .big-score-bonus-debug-button {
      z-index: 280;
      top: max(calc(env(safe-area-inset-top, 0px) + 6px), 0.8dvh);
      left: 7px;
      padding: 5px 7px;
      font-size: 8px;
    }

    .big-score-bonus-logo {
      z-index: 8;
      top: max(calc(env(safe-area-inset-top, 0px) + 27px), 3.1dvh);
      left: 50%;
      width: min(45vw, 181px);
      height: auto;
      transform: translateX(-50%);
    }

    .big-score-bonus-board {
      z-index: 4;
      top: max(calc(env(safe-area-inset-top, 0px) + 130px), 14.9dvh);
      left: 50%;
      width: min(98.4vw, 424px);
      height: auto;
      transform: translateX(-50%);
    }

    .big-score-bonus-symbol-grid {
      top: 4.670913%;
      left: 4.483837%;
      width: 91.240876%;
      height: 92.887473%;
    }

    .big-score-bonus-symbol-cell > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0 1.25vw rgba(255, 0, 112, 0.3));
    }

    .big-score-bonus-column-assets {
      z-index: 4;
    }

    .big-score-bonus-divider {
      top: 5.095541%;
      width: 0.312826%;
      height: 91.401274%;
      object-fit: fill;
    }

    .big-score-bonus-fs-panel {
      z-index: 27;
      top: auto;
      left: 4.2%;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 108px);
      width: min(35.8vw, 152px);
      aspect-ratio: 300 / 108;
    }

    .big-score-bonus-fs-copy {
      padding: 0 8.4% 0 8%;
      transform: translateY(0);
    }

    .big-score-bonus-fs-label {
      width: 70%;
      height: 84%;
    }

    .big-score-bonus-fs-value {
      width: 26.5%;
      height: 90%;
    }

    .big-score-bonus-character {
      z-index: 7;
      top: max(calc(env(safe-area-inset-top, 0px) + 525px), 60dvh);
      right: -1.8%;
      width: min(62vw, 264px);
      height: auto;
      object-fit: contain;
    }

    .big-score-bonus-bottom-ui {
      z-index: 10;
    }

    .big-score-bonus-bottom-background {
      display: none;
    }

    .big-score-bonus-mobile-bottom-background {
      display: block;
      top: auto;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: calc(55px + env(safe-area-inset-bottom, 0px));
      object-fit: fill;
    }

    .big-score-bonus-panel-stroke {
      display: none;
    }

    .big-score-bonus-balance-bet-panel {
      top: auto;
      left: 55%;
      bottom: calc(3px + env(safe-area-inset-bottom, 0px));
      width: min(61vw, 260px);
      aspect-ratio: 287 / 49;
      transform: translateX(-50%);
    }

    .big-score-bonus-balance-bet-divider {
      top: 10%;
      left: 54.2%;
      width: 0.9%;
      height: 80%;
      object-fit: fill;
    }

    .big-score-bonus-stat span {
      margin-bottom: 0.12em;
      font-size: clamp(9px, 2.45vw, 11px);
    }

    .big-score-bonus-stat strong {
      font-size: clamp(14px, 4.25vw, 18px);
    }

    .big-score-bonus-stat-balance {
      width: 54.2%;
    }

    .big-score-bonus-stat-bet {
      width: 45.8%;
    }

    .big-score-bonus-total-win {
      display: none;
    }

    .big-score-bonus-music-button {
      top: auto;
      left: 3.2%;
      bottom: calc(10px + env(safe-area-inset-bottom, 0px));
      width: clamp(27px, 7.5vw, 32px);
    }

    .big-score-bonus-sound-button {
      top: auto;
      left: 12.9%;
      bottom: calc(10px + env(safe-area-inset-bottom, 0px));
      width: clamp(27px, 7.5vw, 32px);
    }

    .big-score-bonus-info-button {
      top: auto;
      left: auto;
      right: 2.8%;
      bottom: calc(8px + env(safe-area-inset-bottom, 0px));
      width: clamp(31px, 8.6vw, 37px);
    }

    .big-score-bonus-auto-button {
      top: auto;
      left: 5.8%;
      bottom: calc(89px + env(safe-area-inset-bottom, 0px));
      width: clamp(48px, 13.2vw, 56px);
      opacity: 1;
    }

    .big-score-bonus-minus-button {
      top: auto;
      left: 24.7%;
      bottom: calc(69px + env(safe-area-inset-bottom, 0px));
      width: clamp(29px, 7.9vw, 34px);
      opacity: 1;
    }

    .big-score-bonus-spin-button,
    .big-score-bonus-plus-button {
      display: none;
    }
  }



  /* BIG SCORE: on shorter / more square portrait screens, keep the FS LEFT
   * plaque at the same fixed vertical level as the working Most Wanted layout. */
  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .big-score-bonus-fs-panel {
      top: min(73.8dvh, 740px) !important;
      bottom: auto !important;
    }
  }


  /* Mobile: the shared character must use exactly the same geometry as the
   * character on the Big Score screen on every scene where it is visible. */
  @media (orientation: portrait) and (max-width: 767px) {
    .hero-character {
      z-index: 7 !important;
      top: max(calc(env(safe-area-inset-top, 0px) + 525px), 60dvh) !important;
      right: -1.8% !important;
      bottom: auto !important;
      left: auto !important;
      width: min(62vw, 264px) !important;
      height: auto !important;
      object-fit: contain !important;
      transform: none !important;
    }
  }


  /*
   * Compact portrait scaling.
   * 425 × 812 and larger mobile references keep the original geometry.
   * Below 720px of viewport height the main scene scales down proportionally;
   * below 600px it switches to the 320 × 568 composition.
   */
  @media (orientation: portrait) and (max-width: 600px) and (max-height: 720px) {
    .game-shell {
      --mobile-panel-height: clamp(46px, 7dvh, 52px);
      --mobile-board-width: min(94vw, 49dvh, 350px);
    }

    .game-logo,
    .most-wanted-bonus-active .game-logo,
    .gamble-bonus-active .game-logo,
    .big-score-bonus-logo {
      top: max(calc(env(safe-area-inset-top, 0px) + 6px), 1.3dvh) !important;
      width: min(39vw, 165px) !important;
      height: auto !important;
    }

    .board-shell,
    .most-wanted-bonus-active .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 74px), 10.8dvh) !important;
      width: var(--mobile-board-width) !important;
      height: auto !important;
      aspect-ratio: 959 / 942;
    }

    .most-wanted-bonus-active .mw-standard-top-plates {
      top: max(calc(env(safe-area-inset-top, 0px) + 72px), 10.4dvh) !important;
      left: 3.5% !important;
      width: 93% !important;
    }

    .most-wanted-bonus-active .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 101px), 14.8dvh) !important;
    }

    .hero-character,
    .most-wanted-bonus-active .hero-character,
    .big-score-bonus-character {
      z-index: 7 !important;
      top: max(calc(env(safe-area-inset-top, 0px) + 376px), 57dvh) !important;
      right: -1.2% !important;
      bottom: auto !important;
      left: auto !important;
      width: min(56vw, 225px) !important;
      height: auto !important;
      object-fit: contain !important;
      transform: none !important;
      transform-origin: top right !important;
    }

    .bonus-buy-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(76px, 11.4dvh, 94px)
      ) !important;
      width: clamp(66px, 18vw, 80px) !important;
    }

    .auto-spin-button,
    .most-wanted-bonus-active .auto-spin-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(14px, 2.4dvh, 22px)
      ) !important;
      width: clamp(38px, 10.4vw, 46px) !important;
    }

    .mobile-spin-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(12px, 2.1dvh, 20px)
      ) !important;
      width: clamp(78px, 21vw, 88px) !important;
    }

    .bet-button,
    .most-wanted-bonus-active .bet-button {
      bottom: calc(
        var(--mobile-panel-height) +
        var(--mobile-safe-bottom) +
        clamp(14px, 2.4dvh, 22px)
      ) !important;
      width: clamp(31px, 8.4vw, 36px) !important;
    }

    .decrease-button,
    .most-wanted-bonus-active .decrease-button {
      left: calc(50% - clamp(82px, 23vw, 96px)) !important;
    }

    .increase-button,
    .most-wanted-bonus-active .increase-button {
      right: calc(50% - clamp(82px, 23vw, 96px)) !important;
    }

    .big-score-bonus-board {
      top: max(calc(env(safe-area-inset-top, 0px) + 74px), 10.8dvh) !important;
      width: var(--mobile-board-width) !important;
      height: auto !important;
    }

    .big-score-bonus-mobile-bottom-background {
      height: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom)) !important;
    }

    .big-score-bonus-auto-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 29px) !important;
      width: clamp(40px, 11vw, 48px) !important;
    }

    .big-score-bonus-minus-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 10px) !important;
      width: clamp(27px, 7.4vw, 32px) !important;
    }

    .gamble-bonus-active .gamble-choice-panel {
      top: max(calc(env(safe-area-inset-top, 0px) + 94px), 15dvh) !important;
      width: min(92vw, 345px) !important;
    }

    .gamble-bonus-active .gamble-lock-composite {
      top: 37% !important;
      width: min(112vw, 390px) !important;
    }
  }

  /* Mobile S: exact compact composition for 320 × 568 and similar screens. */
  @media (orientation: portrait) and (max-width: 340px) and (max-height: 600px) {
    .game-shell {
      --mobile-panel-height: 46px;
      --mobile-board-width: min(92vw, 49dvh, 292px);
    }

    .game-logo,
    .most-wanted-bonus-active .game-logo,
    .gamble-bonus-active .game-logo,
    .big-score-bonus-logo {
      top: max(calc(env(safe-area-inset-top, 0px) + 4px), 0.8dvh) !important;
      width: min(38vw, 132px) !important;
    }

    .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 62px), 10.6dvh) !important;
      width: var(--mobile-board-width) !important;
    }

    .most-wanted-bonus-active .mw-standard-top-plates {
      top: max(calc(env(safe-area-inset-top, 0px) + 60px), 10.2dvh) !important;
    }

    .most-wanted-bonus-active .board-shell {
      top: max(calc(env(safe-area-inset-top, 0px) + 83px), 14.2dvh) !important;
      width: var(--mobile-board-width) !important;
    }

    .hero-character,
    .most-wanted-bonus-active .hero-character,
    .big-score-bonus-character {
      top: max(calc(env(safe-area-inset-top, 0px) + 314px), 56dvh) !important;
      right: -1.5% !important;
      width: min(54vw, 178px) !important;
    }

    .most-wanted-bonus-active .mw-standard-fs-card,
    .big-score-bonus-fs-panel {
      top: auto !important;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 104px) !important;
      width: min(34vw, 116px) !important;
    }

    .big-score-bonus-board {
      top: max(calc(env(safe-area-inset-top, 0px) + 62px), 10.6dvh) !important;
      width: var(--mobile-board-width) !important;
    }

    .bonus-buy-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 72px) !important;
      width: 64px !important;
    }

    .auto-spin-button,
    .most-wanted-bonus-active .auto-spin-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 11px) !important;
      width: 38px !important;
    }

    .mobile-spin-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 10px) !important;
      width: 72px !important;
    }

    .bet-button,
    .most-wanted-bonus-active .bet-button {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 12px) !important;
      width: 30px !important;
    }

    .decrease-button,
    .most-wanted-bonus-active .decrease-button {
      left: calc(50% - 72px) !important;
    }

    .increase-button,
    .most-wanted-bonus-active .increase-button {
      right: calc(50% - 72px) !important;
    }

    .balance-bet-panel,
    .big-score-bonus-balance-bet-panel {
      width: min(58vw, 186px) !important;
    }

    .gamble-bonus-active .gamble-choice-panel {
      top: max(calc(env(safe-area-inset-top, 0px) + 76px), 13.4dvh) !important;
      width: 92vw !important;
    }

    .gamble-bonus-active .gamble-lock-composite {
      top: 35.5% !important;
      width: min(108vw, 346px) !important;
    }
  }


  /* INFO mobile polish for dense pages: prevent overlaps on portrait phones */
  @media (orientation: portrait) and (max-width: 767px) {
    .info-page-vertical-chase h1,
    .info-page-gang-chase h1,
    .info-page-gamble-mini-game h1,
    .info-page-bonus-modes-big-score h1,
    .info-page-bonus-modes-most-wanted h1 {
      top: max(calc(env(safe-area-inset-top, 0px) + 22px), 4.8%);
      right: 8%;
      line-height: 0.98;
    }

    .info-page-vertical-chase h1 {
      font-size: clamp(23px, 7.1vw, 31px);
    }

    .info-page-vertical-chase .vertical-chase-description {
      top: 16.8%;
      left: 7%;
      width: 86%;
      font-size: clamp(12px, 3.35vw, 14px);
      line-height: 1.26;
    }

    .info-page-vertical-chase .vertical-chase-strips {
      top: 31.8%;
      width: 94%;
      gap: 1.2vw;
    }

    .info-page-vertical-chase .vertical-chase-strips img {
      width: min(15.5vw, 66px);
      max-height: 54svh;
      height: auto;
      object-fit: contain;
    }

    .info-page-gang-chase h1 {
      font-size: clamp(24px, 7.6vw, 32px);
    }

    .info-page-gang-chase .gang-chase-copy {
      top: 14.4%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(10.5px, 2.95vw, 12.3px);
      line-height: 1.22;
    }

    .info-page-gang-chase .gang-chase-copy p {
      margin-bottom: 10px;
    }

    .info-page-gang-chase .chase-info-strips {
      top: auto;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 84px);
      left: 50%;
      width: 86%;
      gap: 5vw;
      transform: translateX(-50%);
    }

    .info-page-gang-chase .chase-info-strips img {
      width: min(16.5vw, 68px);
      height: auto;
      object-fit: contain;
    }

    .info-page-gamble-mini-game h1 {
      font-size: clamp(22px, 7vw, 30px);
      line-height: 0.96;
    }

    .info-page-gamble-mini-game .gamble-page-copy {
      top: 15.2%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(10.5px, 2.95vw, 12.1px);
      line-height: 1.22;
    }

    .info-page-gamble-mini-game .gamble-page-copy ul {
      padding-left: 18px;
    }

    .info-page-gamble-mini-game .gamble-page-icons {
      top: auto;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 82px);
      left: 50%;
      width: min(62vw, 250px);
      transform: translateX(-50%);
      object-fit: contain;
    }

    .info-page-bonus-modes-big-score h1,
    .info-page-bonus-modes-most-wanted h1 {
      font-size: clamp(31px, 9.1vw, 39px);
      white-space: nowrap;
    }

    .info-page-bonus-modes-big-score .big-score-composition {
      top: 17.2%;
      left: 6%;
      width: 88%;
      height: auto;
    }

    .info-page-bonus-modes-big-score .big-score-wild,
    .info-page-bonus-modes-big-score .big-score-gang,
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-wild,
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-gang {
      position: relative;
      top: auto;
      left: auto;
      display: block;
      margin-left: auto;
      margin-right: auto;
      transform: none;
    }

    .info-page-bonus-modes-big-score .big-score-wild {
      width: min(31vw, 128px);
      margin-bottom: -6px;
    }

    .info-page-bonus-modes-big-score .big-score-gang {
      width: min(40vw, 164px);
    }

    .info-page-bonus-modes-big-score .big-score-copy {
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      margin-top: 14px;
      font-size: clamp(11px, 3.05vw, 12.6px);
      line-height: 1.22;
    }

    .info-page-bonus-modes-big-score .big-score-copy h2,
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy h2,
    .info-page-bonus-modes-most-wanted .most-wanted-mode-copy h2 {
      margin-bottom: 4px;
      font-size: 0.98em;
      line-height: 1.05;
      white-space: normal;
    }

    .info-page-bonus-modes-big-score .big-score-copy ul,
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy ul,
    .info-page-bonus-modes-most-wanted .most-wanted-mode-copy ul {
      margin-top: 0;
      padding-left: 14px;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode {
      top: 16.8%;
      left: 6%;
      width: 88%;
      height: 34.5%;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-fs {
      top: 0;
      left: 0;
      width: min(20vw, 78px);
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-copy {
      top: 0;
      left: 22%;
      width: 78%;
      font-size: clamp(10px, 2.82vw, 11.5px);
      line-height: 1.19;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-icons {
      position: absolute;
      top: 34%;
      left: 0;
      width: 100%;
      transform: none;
      height: auto;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-divider {
      top: 52.6%;
      left: 8%;
      width: 84%;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower {
      top: 58.6%;
      left: 6%;
      width: 88%;
      height: 20.5%;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-wild {
      width: min(19vw, 76px);
      margin-bottom: -3px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-gang {
      width: min(17vw, 66px);
      margin-bottom: 2px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy {
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      font-size: clamp(9.9px, 2.78vw, 11.4px);
      line-height: 1.18;
      text-align: left;
    }
  }

  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .info-page-vertical-chase .vertical-chase-description {
      top: 15.6%;
      font-size: clamp(11.2px, 3.1vw, 12.8px);
    }

    .info-page-vertical-chase .vertical-chase-strips {
      top: 29.8%;
    }

    .info-page-gang-chase .gang-chase-copy {
      top: 13.4%;
      font-size: clamp(9.8px, 2.72vw, 11.2px);
    }

    .info-page-gang-chase .chase-info-strips {
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 70px);
    }

    .info-page-gamble-mini-game .gamble-page-copy {
      top: 13.9%;
      font-size: clamp(9.8px, 2.72vw, 11.2px);
    }

    .info-page-gamble-mini-game .gamble-page-icons {
      width: min(57vw, 226px);
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 72px);
    }

    .info-page-bonus-modes-big-score .big-score-composition {
      top: 16.3%;
    }

    .info-page-bonus-modes-big-score .big-score-copy {
      font-size: clamp(10.2px, 2.85vw, 11.8px);
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode {
      top: 16%;
      height: 33.5%;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-copy {
      font-size: clamp(9.3px, 2.6vw, 10.7px);
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-icons {
      top: 35%;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower {
      top: 57.8%;
      height: 20%;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy {
      font-size: clamp(9.2px, 2.58vw, 10.6px);
    }
  }

  /* Final mobile corrections for info pages 7, 10 and 11. */
  @media (orientation: portrait) and (max-width: 767px) {
    /* PAGE 7: reduce only the lock-picking composite; keep its anchor unchanged. */
    .info-page-gamble-mini-game .gamble-page-icons {
      width: min(43vw, 174px);
    }

    /* PAGE 10: keep WILD and GANG in one desktop-like artwork row. */
    .info-page-bonus-modes-big-score .big-score-composition {
      top: 15.6%;
      left: 6%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 88%;
      height: auto;
    }

    .info-page-bonus-modes-big-score .big-score-art-row {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(8px, 3vw, 14px);
      width: 100%;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-wild,
    .info-page-bonus-modes-big-score .big-score-art-row .big-score-gang {
      position: relative;
      top: auto;
      left: auto;
      flex: 0 0 auto;
      margin: 0;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-wild {
      width: min(27vw, 108px);
      transform: translateY(-3%);
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-gang {
      width: min(35vw, 140px);
      transform: translateY(3%);
    }

    .info-page-bonus-modes-big-score .big-score-copy {
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      margin-top: 10px;
    }

    /* PAGE 11: all content flows from the top instead of being spread vertically. */
    .info-page-bonus-modes-most-wanted .most-wanted-page-content {
      position: absolute;
      top: 14.3%;
      left: 5%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 90%;
      box-sizing: border-box;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode {
      position: relative;
      top: auto;
      left: auto;
      display: grid;
      grid-template-columns: min(20vw, 78px) minmax(0, 1fr);
      grid-template-areas:
        "fs copy"
        "icons icons";
      align-items: start;
      column-gap: 8px;
      row-gap: 7px;
      width: 100%;
      height: auto;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-fs {
      grid-area: fs;
      position: relative;
      top: auto;
      left: auto;
      width: min(20vw, 78px);
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-copy {
      grid-area: copy;
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-icons {
      grid-area: icons;
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      height: auto;
      transform: none;
    }

    .info-page-bonus-modes-most-wanted .most-wanted-mode-divider {
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      height: auto;
      margin: 8px 0 6px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower {
      position: relative;
      top: auto;
      left: auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      height: auto;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-wild,
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-gang {
      position: relative;
      top: auto;
      left: auto;
      flex: 0 0 auto;
      margin: 0;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-wild {
      width: min(19vw, 76px);
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-gang {
      width: min(19vw, 76px);
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy {
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      margin-top: 5px;
    }
  }



  /* Mobile follow-up: preserve the restored page structure and make only small visual adjustments. */
  @media (orientation: portrait) and (max-width: 767px) {
    /* THE GAMBLE MINI-GAME — reduce the combined illustration only. */
    .info-page-gamble-mini-game .gamble-page-icons {
      width: min(38vw, 154px);
    }

    /* THE BIG SCORE — retain the existing mobile layout; only reduce the gap. */
    .info-page-bonus-modes-big-score .big-score-art-row {
      gap: 4px;
    }

    /* MOST WANTED + THE BIG SCORE — retain the existing mobile flow; only reduce the gap. */
    .info-page-bonus-modes-most-wanted
      .big-score-composition-lower
      .big-score-art-row {
      gap: 4px;
    }

    /* Preserve the previous Paytable correction: all content remains above the arrows. */
    .info-page-paytable .paytable-item {
      width: min(27.5vw, 112px);
    }

    .info-page-paytable .paytable-row-top .paytable-item-top-1,
    .info-page-paytable .paytable-row-top .paytable-item-top-2,
    .info-page-paytable .paytable-row-top .paytable-item-top-3 {
      top: 17.5%;
    }

    .info-page-paytable .paytable-row-top .paytable-item-top-4,
    .info-page-paytable .paytable-row-bottom .paytable-item-bottom-1,
    .info-page-paytable .paytable-row-bottom .paytable-item-bottom-2 {
      top: 38.9%;
    }

    .info-page-paytable .paytable-row-bottom .paytable-item-bottom-3,
    .info-page-paytable .paytable-row-bottom .paytable-item-bottom-4,
    .info-page-paytable .paytable-row-bottom .paytable-item-bottom-5 {
      top: 60%;
    }

    .info-page-paytable .paytable-symbol {
      height: clamp(76px, 20.5vw, 92px);
    }

    .info-page-paytable .paytable-values {
      top: clamp(81px, 22vw, 97px);
      gap: 1px;
      font-size: clamp(10.4px, 2.95vw, 12.3px);
      line-height: 1.1;
    }

    /* Preserve the previous Chase correction without touching their structure. */
    .info-page-cop-chase .chase-info-copy {
      top: 13.6%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(10.4px, 2.95vw, 12px);
      line-height: 1.21;
    }

    .info-page-gang-chase .gang-chase-copy {
      top: 13.2%;
      left: 6.5%;
      width: 87%;
      font-size: clamp(10px, 2.82vw, 11.5px);
      line-height: 1.2;
    }

    .info-page-cop-chase .chase-info-strips,
    .info-page-gang-chase .chase-info-strips {
      top: auto;
      bottom: calc(var(--mobile-panel-height) + var(--mobile-safe-bottom) + 88px);
      left: 50%;
      width: 78%;
      gap: 4.25vw;
      transform: translateX(-50%);
      justify-content: center;
      align-items: end;
    }

    .info-page-cop-chase .chase-info-strips img,
    .info-page-gang-chase .chase-info-strips img {
      width: min(15.4vw, 61px);
      max-height: 31svh;
      height: auto;
      object-fit: contain;
    }
  }



  /* Fine-tune BONUS MODES icon placement to match the approved mobile reference. */
  @media (orientation: portrait) and (max-width: 767px) {
    /* PAGE 10 — restore the compact diagonal composition from the reference. */
    .info-page-bonus-modes-big-score .big-score-art-row {
      justify-content: flex-start;
      align-items: flex-start;
      width: max-content;
      margin-left: 12px;
      gap: 0;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-wild {
      width: min(24vw, 96px);
      transform: none;
      margin-top: 4px;
      margin-right: -6px;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-gang {
      width: min(34vw, 136px);
      transform: none;
      margin-top: 22px;
      margin-left: -2px;
    }

    .info-page-bonus-modes-big-score .big-score-copy {
      margin-top: 8px;
    }

    /* PAGE 11 — same icon composition, but nudged slightly further left. */
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row {
      justify-content: flex-start;
      align-items: flex-start;
      width: max-content;
      margin-left: 8px;
      gap: 0;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-wild {
      width: min(18vw, 72px);
      margin-top: 2px;
      margin-right: -4px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-gang {
      width: min(17vw, 68px);
      margin-top: 18px;
      margin-left: -1px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-copy {
      margin-top: 4px;
    }
  }



  /* Micro-adjustment: make BONUS MODES WILD + GANG match the desktop spacing more closely. */
  @media (orientation: portrait) and (max-width: 767px) {
    /* PAGE 11 lower block — pull the two icons closer, keeping the existing left-side placement. */
    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row {
      gap: 0;
      margin-left: 6px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-wild {
      margin-right: -12px;
    }

    .info-page-bonus-modes-most-wanted .big-score-composition-lower .big-score-art-row .big-score-gang {
      margin-left: -2px;
      margin-top: 16px;
    }

    /* PAGE 10 — same tighter spacing, but center the icon pair horizontally. */
    .info-page-bonus-modes-big-score .big-score-art-row {
      justify-content: center;
      width: 100%;
      margin-left: 0;
      gap: 0;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-wild {
      margin-right: -14px;
      margin-top: 4px;
    }

    .info-page-bonus-modes-big-score .big-score-art-row .big-score-gang {
      margin-left: -3px;
      margin-top: 20px;
    }
  }



  /* Mobile character anchor: derive its vertical position from the reel board
   * instead of the viewport so it cannot sink on different aspect ratios. */
  @media (orientation: portrait) and (max-width: 767px) {
    .game-shell {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 94px), 14.188dvh);
      --character-board-width: var(--mobile-board-width);
    }

    .game-shell.most-wanted-bonus-active {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 112px), 16.2dvh);
      --character-board-width: min(96.3vw, 423px);
    }

    .hero-character,
    .most-wanted-bonus-active .hero-character {
      top: calc(var(--character-board-top) + var(--character-board-width)) !important;
      bottom: auto !important;
      transform-origin: top right !important;
    }
  }

  @media (orientation: portrait) and (max-width: 767px) and (min-aspect-ratio: 10 / 19) {
    .game-shell {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 82px), 12.8dvh);
    }
  }

  @media (orientation: portrait) and (max-width: 600px) and (max-height: 720px) {
    .game-shell {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 74px), 10.8dvh);
      --character-board-width: var(--mobile-board-width);
    }

    .game-shell.most-wanted-bonus-active {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 101px), 14.8dvh);
      --character-board-width: var(--mobile-board-width);
    }
  }

  @media (orientation: portrait) and (max-width: 340px) and (max-height: 600px) {
    .game-shell {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 62px), 10.6dvh);
      --character-board-width: var(--mobile-board-width);
    }

    .game-shell.most-wanted-bonus-active {
      --character-board-top: max(calc(env(safe-area-inset-top, 0px) + 83px), 14.2dvh);
      --character-board-width: var(--mobile-board-width);
    }
  }



  /* Mobile logo fit: keep the full logo inside the free space above the reels/HUD.
   * It keeps its normal size on tall screens and shrinks only when the available
   * vertical gap is too small. */
  @media (orientation: portrait) and (max-width: 767px) {
    .game-shell {
      --mobile-logo-top: max(calc(env(safe-area-inset-top, 0px) + 8px), 2.2dvh);
      --mobile-logo-obstacle-top: var(--character-board-top);
    }

    .game-shell.most-wanted-bonus-active {
      --mobile-logo-top: max(calc(env(safe-area-inset-top, 0px) + 10px), 2.8dvh);
      --mobile-logo-obstacle-top: max(calc(env(safe-area-inset-top, 0px) + 102px), 13.4dvh);
    }

    .game-logo,
    .most-wanted-bonus-active .game-logo,
    .gamble-bonus-active .game-logo {
      top: var(--mobile-logo-top) !important;
      left: 50% !important;
      width: auto !important;
      height: auto !important;
      max-width: min(44.527vw, 215px) !important;
      max-height: calc(
        var(--mobile-logo-obstacle-top) -
        var(--mobile-logo-top) -
        6px
      ) !important;
      object-fit: contain !important;
      transform: translateX(-50%) !important;
      transform-origin: top center !important;
    }

    .most-wanted-bonus-active .game-logo {
      max-width: min(47vw, 205px) !important;
    }
  }

  @media (orientation: portrait) and (max-width: 600px) and (max-height: 720px) {
    .game-shell {
      --mobile-logo-top: max(calc(env(safe-area-inset-top, 0px) + 6px), 1.3dvh);
    }

    .game-shell.most-wanted-bonus-active {
      --mobile-logo-obstacle-top: max(calc(env(safe-area-inset-top, 0px) + 72px), 10.4dvh);
    }
  }

  @media (orientation: portrait) and (max-width: 340px) and (max-height: 600px) {
    .game-shell {
      --mobile-logo-top: max(calc(env(safe-area-inset-top, 0px) + 4px), 0.8dvh);
    }

    .game-shell.most-wanted-bonus-active {
      --mobile-logo-obstacle-top: max(calc(env(safe-area-inset-top, 0px) + 60px), 10.2dvh);
    }
  }



  /* Popout S and nearby small 16:9 windows: only scale the bottom HUD typography.
   * The rest of the desktop composition remains unchanged. */
  @media (orientation: landscape) and (max-width: 520px) and (max-height: 320px) {
    .stat {
      justify-content: center;
      line-height: 0.58;
    }

    .stat span {
      margin-bottom: -0.42em;
      font-size: 0.68cqw;
      line-height: 0.58;
      transform: translateY(0.14em);
    }

    .stat strong {
      font-size: 0.95cqw;
      line-height: 0.58;
      transform: translateY(-0.14em);
    }

    /* Big Score: keep the original text sizes, but increase the line spacing further. */
    .big-score-bonus-stat {
      justify-content: center;
      line-height: 0.96;
    }

    .big-score-bonus-stat span {
      margin-bottom: 0.28em;
      font-size: 0.68cqw;
      line-height: 0.96;
      transform: translateY(-0.12em);
    }

    .big-score-bonus-stat strong {
      font-size: 0.95cqw;
      line-height: 0.96;
      transform: translateY(0.08em);
    }

    .total-win-copy span,
    .big-score-bonus-total-win-copy span {
      font-size: 1.25cqw;
      line-height: 1;
    }

    .total-win-copy strong,
    .big-score-bonus-total-win-copy strong {
      font-size: 2.08cqw;
      line-height: 1;
    }
  }



  /* Compact landscape onboarding: reduce copy size on all intro pages so the
   * first screen and the rest stay balanced on smaller desktop/popout sizes. */
  @media (orientation: landscape) and (min-width: 768px) and ((max-width: 1280px) or (max-height: 720px)) {
    .onboarding-copy {
      top: 8.1%;
      right: 6.6%;
      left: 6.6%;
    }

    .onboarding-copy h1 {
      font-size: clamp(18px, 2.28vw, 34px);
      line-height: 0.98;
      letter-spacing: -0.02em;
    }

    .onboarding-copy p {
      width: min(78%, 620px);
      margin: 0.65% auto 0;
      font-size: clamp(10px, 1.32vw, 18px);
      line-height: 1.01;
      letter-spacing: -0.015em;
      text-wrap: balance;
    }
  }



  /* Popout S / very small landscape onboarding: the top copy must look much
   * closer to the 1920×1080 reference, so shrink it aggressively. */
  @media (orientation: landscape) and (max-width: 520px) and (max-height: 320px) {
    .onboarding-copy {
      top: 8.8%;
      right: 9%;
      left: 9%;
    }

    .onboarding-copy h1 {
      font-size: clamp(12px, 1.95vw, 20px);
      line-height: 0.98;
      letter-spacing: -0.015em;
    }

    .onboarding-copy p {
      width: min(72%, 245px);
      margin: 0.45% auto 0;
      font-size: clamp(7px, 1.08vw, 11px);
      line-height: 0.96;
      letter-spacing: -0.01em;
      text-wrap: balance;
    }
  }

</style>
