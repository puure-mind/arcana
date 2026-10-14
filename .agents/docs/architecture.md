# Slot Game Architecture

Status: Proposed v1

## 1. Purpose and stack

Build a browser slot game from Figma using Next.js (App Router), TypeScript, PixiJS, GSAP, AssetPack, Tailwind CSS, Zustand Vanilla, an explicit FSM, and a typed EventBus backed by EventEmitter. The client presents outcomes returned by an authoritative game API; it never generates real-money outcomes or determines payouts.

## 2. Architectural invariants

1. Gameplay owns domain state and rules. Only gameplay controllers can mutate the domain store.
2. Gameplay imports no React, Next.js, PixiJS, GSAP, or DOM APIs.
3. The FSM owns legal gameplay phases and transitions. Controllers own business rules, effects, and orchestration.
4. Visual renders PixiJS objects. Animation owns GSAP timelines and presentation sequencing. Neither changes gameplay state.
5. React UI subscribes to a read-only store facade and dispatches commands; it never calls `setState`.
6. Cross-module commands and events use typed contracts and per-runtime EventBus instances; no global singleton bus.
7. Events represent occurrences, not the canonical current state. Late subscribers read a state snapshot.
8. Every spin and presentation request carries `spinId` (and where needed `presentationId`) to reject stale completions.
9. All modules have explicit initialization and disposal. Async work is cancellable or ignored when obsolete.
10. No arbitrary feature-to-feature imports of internals. Use public APIs and top-level composition.

## 3. Layers and ownership

- **GameRuntime / composition root:** creates per-game EventBus, gameplay, API adapter, Pixi scene, animation controller and UI-facing facade; wires subscriptions; calls start/dispose.
- **Gameplay:** `GameplayController`, `SpinController`, `BetController`, FSM, Zustand Vanilla store, domain types, and pure rule functions. Owns transitions and validates actions. Uses an injected `SpinGateway` to call the server.
- **Visual:** `SlotScene`, `ReelsView`, `SymbolsView`, `WinPresentationView`. Creates and renders Pixi display objects, handles pointer input and layout; emits user intent but has no game rules.
- **Animation:** `AnimationController`, reel and win timelines. Accepts presentation requests, controls Pixi view properties, emits completion/failure/cancellation with correlation IDs. Can be tested with fake views/timelines.
- **React UI:** balances, bet selector, spin button, settings, overlays; reads snapshots with `useSyncExternalStore` or Zustand's `useStore(vanillaStore, selector)` and sends commands. Never owns canonical game state.
- **Infrastructure:** typed EventBus adapter, server gateway, asset loader, logging, telemetry.

## 4. State and event contracts

### Canonical state

```ts
type Phase =
  | "booting"
  | "idle"
  | "requestingResult"
  | "spinning"
  | "presentingWins"
  | "recovering"
  | "error"
  | "disposed";

type GameState = Readonly<{
  phase: Phase;
  balance: number; // integer minor units, or decimal string per API contract
  bet: number;
  activeSpinId: string | null;
  result: SpinResult | null;
  error: string | null;
}>;
```

Do not use JS floating point for money calculations in domain rules. Prefer integer minor units where the API supports them.

### Event taxonomy

**Commands** (intent, may be rejected): `spin.request`, `bet.changeRequested`, `wins.skipRequested`.

**Domain events** (facts emitted by gameplay): `spin.accepted`, `spin.resultReceived`, `game.phaseChanged`, `bet.changed`, `spin.rejected`.

**Presentation requests** (commands for animation): `spin.presentationRequested`, `wins.presentationRequested`.

**Presentation outcomes** (facts emitted by animation): `spin.presentationCompleted`, `wins.presentationCompleted`, `presentation.failed`, `presentation.cancelled`.

Example typed contract:

```ts
type GameEvents = {
  "spin.request": { requestId: string };
  "spin.resultReceived": { spinId: string; result: SpinResult };
  "spin.presentationRequested": { spinId: string; result: SpinResult };
  "spin.presentationCompleted": { spinId: string };
  "wins.presentationRequested": { spinId: string; wins: Win[] };
  "wins.presentationCompleted": { spinId: string };
  "presentation.failed": { spinId: string; stage: "spin" | "wins"; reason: string };
  "game.phaseChanged": { phase: Phase };
};

interface EventBus<E> {
  emit<K extends keyof E>(type: K, payload: E[K]): void;
  on<K extends keyof E>(type: K, listener: (payload: E[K]) => void): () => void;
}
```

Use a typed adapter over EventEmitter, rather than importing PixiJS directly into gameplay. Prefer command/event names with explicit ownership and semantics. Document whether event dispatch is synchronous; listeners must not rely on hidden ordering. Avoid business logic in passive `store.subscribe` handlers.

## 5. Spin lifecycle

1. UI or Pixi pointer input emits `spin.request` with `requestId`.
2. Gameplay checks phase `idle`, bet validity, and in-flight status. Rejects duplicate/invalid requests; transitions to `requestingResult`.
3. `SpinController` calls injected `SpinGateway.spin(...)`. The server authoritatively returns `spinId`, reel stops, wins, balance, and other game effects.
4. Gameplay validates the response shape, updates its store atomically, transitions to `spinning`, emits `spin.presentationRequested`.
5. AnimationController starts reel timelines on the Pixi scene, stopping at supplied results; on success emits `spin.presentationCompleted(spinId)`.
6. Gameplay checks matching `activeSpinId` and expected phase. If wins exist, transition to `presentingWins` and emit `wins.presentationRequested`; otherwise return to `idle`.
7. AnimationController presents wins sequentially and emits `wins.presentationCompleted(spinId)`; gameplay verifies correlation and returns to `idle`.
8. On API failure: move to `error` or `idle` according to a documented recovery policy. On animation failure: cancel/clean timelines and render the authoritative final board; never reroll.

**Server result timing:** An optional anticipation animation may run during the request, but cannot imply a fabricated outcome. Handle slow requests and request timeout separately.

**Reentrancy:** Set phase before emitting external events; ignore duplicates and stale IDs. Event callbacks must not recursively advance multiple phases accidentally. Consider queueing orchestration intents if synchronous event reentrancy becomes an issue.

**Skipping:** `wins.skipRequested` asks animation to settle immediately; completion is still emitted once with the correct ID.

## 6. FSM

Implement a small explicit transition function (table or reducer) initially; use XState if nested bonus/free-spin modes or concurrency warrant it.

| From                      | Trigger                    | To                    |
| ------------------------- | -------------------------- | --------------------- |
| booting                   | initialized                | idle                  |
| idle                      | valid spin.request         | requestingResult      |
| requestingResult          | server result              | spinning              |
| requestingResult          | request failed             | error / idle          |
| spinning                  | spin.presentationCompleted | presentingWins / idle |
| presentingWins            | wins.presentationCompleted | idle                  |
| spinning / presentingWins | presentation.failed        | recovering            |
| recovering                | final board rendered       | idle                  |
| any active phase          | dispose                    | disposed              |

Guards validate phase, spin ID, funds, and result. Invalid transitions must be rejected or logged, not silently applied. Bonus modes and autospin require their own explicit rules and must not be inferred from animation callbacks.

## 7. Store strategy

Use a **single gameplay-owned Zustand Vanilla store** initially, created per runtime. Expose `getSnapshot`/`subscribe` or a read-only facade to consumers. Do not expose writable `setState` across module boundaries. Split into additional stores only when there is a genuine independent lifecycle/ownership boundary; avoid cross-store reactive orchestration.

React hooks may use `useStore(gameplay.readonlyStore, selector)` via a safe adapter. Pixi visuals can receive explicit render commands or subscribe through a dedicated presenter/adapter; never mutate store from Pixi. Presentation-only state such as animation progress, particle positions, and reel offsets lives in Pixi/GSAP, not the domain store.

## 8. Composition root

```ts
function createGameRuntime(deps: {
  host: HTMLElement;
  gateway: SpinGateway;
  assets: AssetLoader;
}): GameRuntime {
  const bus = createTypedEventBus<GameEvents>();
  const gameplay = createGameplay({ bus, gateway: deps.gateway });
  const scene = createSlotScene({ host: deps.host, assets: deps.assets, bus });
  const animation = createAnimationController({ bus, scene });

  // Each module subscribes during start() and owns its unsubscribers.
  return {
    state: gameplay.readonlyState,
    start: async () => {
      await scene.init();
      animation.start();
      gameplay.start();
    },
    dispose: () => {
      gameplay.dispose();
      animation.dispose();
      scene.dispose();
      bus.dispose();
    },
  };
}
```

This is illustrative pseudocode: actual asynchronous start/dispose must handle partial startup failures and React Strict Mode mount/unmount cycles. In Next.js, create Pixi only inside a client component/effect after the host element exists. Do not instantiate the runtime during SSR or module import. Avoid a global runtime singleton. The UI obtains a runtime instance through a scoped provider/context.

## 9. Feature-based directory proposal

```text
src/
  app/                         # Next.js routes and client bootstrap
  features/
    slot-game/
      runtime/                 # composition root, lifecycle, provider
      gameplay/                # controllers, fsm, state, rules, contracts
      visual/                  # Pixi scene, views, resize, input adapters
      animation/               # GSAP timeline controllers
      ui/                      # React HUD, controls, overlays
      api/                     # SpinGateway implementation
      index.ts                 # public API
  shared/
    lib/event-bus/             # generic typed bus implementation
    lib/pixi/                  # reusable Pixi infrastructure only
    ui/                        # generic React components
    config/
raw-assets/                    # source assets
public/assets/                # generated, per AssetPack configuration
assetpack.config.ts
```

Keep feature-specific assets and contracts owned by the slot-game feature when practical. No mandatory `entities` layer. If a subfeature becomes independent, extract it with a clear public API rather than prematurely splitting everything.

## 10. Animation and rendering rules

- AnimationController exclusively owns GSAP timelines that mutate scene view properties. Avoid simultaneous competing tweens for the same property.
- Timeline API should support `play`, `skip`, `cancel`, and `dispose`, with at-most-once completion emission.
- Scene handles Pixi Application lifecycle, textures, resize and input listeners. Animation receives a narrow scene interface rather than reaching into private display objects.
- Render at a fixed logical design resolution with controlled scaling initially; establish responsive rules from Figma frames. Keep UI hit targets usable on mobile.
- AssetPack processes source assets; generated output must not be manually edited. Load once and release resources according to ownership.
- Handle tab backgrounding, context loss, reduced-motion settings, and aborted/disposed runtime explicitly.

## 11. Testing and quality gates

- Unit-test pure rules, guards, transition tables, bet validation, and controller command handling.
- Integration-test gameplay with a fake `SpinGateway`, fake EventBus or event recorder, and deterministic IDs/results.
- Test duplicates, stale completion IDs, slow API, API failure, animation interruption, skip, and disposal.
- Test AnimationController with fake scene/timeline implementations. Add a browser smoke test for Pixi initialization and responsive layout.
- Before completion run formatter, linter, TypeScript checks, relevant tests, and production build where applicable. Report what was actually run.

## 12. Open decisions

1. Exact game API schema and authority for balance, bet, wins and bonus features.
2. Whether Spin button/HUD are DOM or Pixi; choose by Figma behavior and accessibility.
3. Responsive scale policy for portrait/landscape and safe areas.
4. Bonus/free-spin modes and interruption rules.
5. Error recovery and reconnect strategy, including authoritative session reconciliation.
6. Autospin, turbo mode, reduced motion, and tab-background behavior.

## 13. AI agent implementation guidance

Before modifying code, read this document and the applicable gameplay/Figma specification. Identify module ownership, events, state transitions, and cleanup requirements. Never add a direct import from gameplay to Pixi/GSAP/React. Never use an EventBus event as a replacement for canonical state. For each feature, specify commands, resulting domain events, presentation requests, completion events, FSM transitions, and tests. Document any new cross-module contract. Do not invent undocumented gambling rules or payouts.
