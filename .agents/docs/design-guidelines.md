# Design Guidelines — Arcana

Status: Draft based on confirmed Figma values supplied by the design owner and PNG exports in `.agents/docs/design`.

Labels used in this document:

- **Confirmed**: supplied from Figma or visible in a named approved export.
- **Inferred**: implementation guidance derived from multiple confirmed sources.
- **Missing**: not represented or not measurable from the available sources.

## 1. Design Sources

### Confirmed

- The source of truth available to the repository is the PNG export set in `.agents/docs/design`; no Figma URL or node IDs are available.
- Main desktop frame: `desktop_main.png`, Figma frame `main`, `1920 x 1080`.
- Main mobile frame: `mobile_main.png`, Figma frame `main`, `402 x 874`.
- State exports:

| State | Desktop source | Mobile source |
|---|---|---|
| Idle | `desktop_main.png` | `mobile_main.png` |
| Win | `desktop_win.png` | Missing |
| Wheel of Fortune | `desktop_wheel.png` | `mobile_wheel.png` |
| Prophecy | `desktop_prophecy.png` | `mobile_prophecy.png` |
| Prophecy Win | `desktop_prophecy_win.png` | Missing |
| Risk All | `desktop_risk.png` | Missing |
| Bet Settings | `desktop_settings.png` | Missing |
| Onboarding | `desktop_onboarding_1.png` through `desktop_onboarding_5.png` | `mobile_onboarding_1.png` through `mobile_onboarding_5.png` |
| Win Free Spins | `desktop_win_free_spins.png` | `mobile_win_free_spins.png` |
| Big Win | `desktop_big_win.png` | `mobile_big_win.png` |
| Mega Win | `desktop_mega_win.png` | Missing |
| Paytable | `desktop_paytable.png` | `mobile_paytable.png` |
| Loading | `loader.png` | `loader.png` |

- Gameplay behavior: `.agents/docs/game-rules.md`.
- Rendering and ownership rules: `.agents/docs/architecture.md` and `AGENTS.md`.

### Missing

- Figma file URL, node IDs, layer/component names, variants, constraints, and prototype metadata.
- Inspectable effect styles and image fill/crop transforms.

## 2. Visual Identity

### Confirmed

- Arcana is a tarot-themed slot game centered on a 5-column by 4-row card grid. Sources: `.agents/docs/game-rules.md`, `desktop_main.png`, `mobile_main.png`.
- The game uses illustrated tarot cards, an ornamental board frame, layered panels, and high-contrast feature overlays. Sources: named state exports and component PNGs.
- The main scene background asset is `bg_main.png`; the board frame is `board_frame.png`.
- Tarot illustrations and ornamental UI must reuse supplied image assets rather than approximate them in CSS.

### Inferred

- The board and feature artwork establish visual hierarchy; HUD controls should remain subordinate except during user interaction.
- Desktop uses a cinematic landscape composition. Mobile uses a distinct portrait composition rather than a stretched desktop layout.

### Missing

- Background crop and focal-point rules for viewports outside the two reference frames.
- Blend modes, texture opacity, shadows, glows, and blur parameters not supplied as tokens.

## 3. Design Tokens

### Confirmed Colors

The following values were supplied from Figma. Original names are retained because semantic naming has not yet been approved.

```css
:root {
  --1: #ffffff;
  --black: #000000;
  --ellipse-13: #020302;
  --ellipse-15: #ffe6b4;
  --gemini-generated-image-e9y963e9y963e9y9-2-1: #ffcc84;
  --gemini-generated-image-qbkhbgqbkhbgqbkh-1: #c7bb51;
  --group: #e8ab55;
  --image-32: #2b1142;
  --loader: #000000;
  --main: #c7c7c7;
  --rectangle-10: #25120b;
  --rectangle-11: #cea244;
  --rectangle-12: #5a0620;
  --rectangle-13: #3f063d;
  --rectangle-14: #b76000;
  --rectangle-26: #0f0b0f;
  --rectangle-27: #d9d9d9;
  --rectangle-29: #09000d;
  --rectangle-44: #ff3c3f;
  --rectangle-46: #bb7400;
  --rectangle-47: #5a5a5a;
  --rectangle-6: #ff9e4f;
  --rectangle-9: #1f2120;
  --total-win: #4c0815;
  --white: #ffffff;
}
```

Additional confirmed text colors:

- Button text: `#fde182`.
- Modal and feature title text: `#be9665`.

### Confirmed Spacing And Radius

```css
:root {
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --radius-none: 0rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --spacing-4: 0.25rem;
  --spacing-8: 0.5rem;
  --spacing-16: 1rem;
  --spacing-24: 1.5rem;
}
```

### Confirmed Typography

- Primary family: `Hanuman`.
- Secondary family: `DM Serif Text`.

| Usage | Family/style | Size | Weight | Line height | Letter spacing | Color |
|---|---|---:|---:|---:|---:|---|
| HUD labels | Hanuman Black | `14.28px` | `900` | `21px` | `0%` | `--total-win` |
| HUD values | Hanuman Black | `18.54px` | `900` | `27px` | `0%` | `--total-win` |
| Buttons | Hanuman Black | `20.37px` | `900` | `30px` | `0%` | `#fde182` |
| Win labels | Hanuman SemiBold | `25.5px` | `600` | `37px` | `0%` | `--total-win` |
| Modal/feature titles | DM Serif Text Regular | `32px` | `400` | `44px` | `0%` | `#be9665` |

### Implementation Rule

- Replace current scaffold fonts (`Geist`, `Geist_Mono`) for game UI with the confirmed families once font files or an approved loading source are available.
- Do not treat Figma-generated names such as `--rectangle-10` as final semantic API names. Create semantic aliases after confirming each color's role, while retaining one canonical value source shared by React UI and Pixi configuration.

### Missing

- Approved font files, font loading source, and supported character subsets.
- Semantic role mapping for most Figma-generated color names.
- Border widths, shadows, glows, and effect tokens.

## 4. Game Layout

All coordinates and dimensions below are Figma pixels relative to the named reference frame.

### Confirmed Desktop Layout

- Reference frame: `1920 x 1080`, `desktop_main.png`.
- Board: `x 410.26`, `y 46`, `w 1039.48`, `h 889.16`.
- Grid: 5 columns by 4 rows.
- Grid gaps: horizontal `31.04`, vertical `21.06`.
- Grid padding: horizontal `40`, vertical `14`.
- Card: `127.83 x 195.58`, radius `0`.
- Balance panel: `x 355`, `y 994`, `w 408.73`, `h 57.48`.
- Bet panel: `x 1481`, `y 856`, `w 338.47`, `h 207.27`.
- Win panel: `x 829`, `y 980.96`, `w 562.39`, `h 79.09`.
- Spin button: `x 1555`, `y 856`, `w 189.77`, `h 191.84`.

### Confirmed Mobile Layout

- Reference frame: `402 x 874`, `mobile_main.png`.
- Board: `x -29.49`, `y 224.06`, `w 460.49`, `h 393.9`.
- The negative board x-coordinate and width greater than the frame are intentional in the reference layout and imply horizontal visual cropping.
- Grid: 5 columns by 4 rows.
- Grid gaps: horizontal `13.7`, vertical `13`.
- Grid padding: horizontal `8`, vertical `16`.
- Card: `64.85 x 99.22`, radius `0`.
- Balance panel: `x 12`, `y 827`, `w 360`, `h 40`.
- Bet panel: `x 171`, `y 697.15`, `w 173.79`, `h 106.43`.
- Win panel: `x 98`, `y 642`, `w 206.85`, `h 29.09`.
- Spin button: `x 209`, `y 697.15`, `w 97.44`, `h 98.5`.

### Inferred

- Use the desktop and mobile frames as separate logical reference layouts, then uniformly scale and center the selected layout within the viewport.
- Preserve the intentional mobile board overflow rather than forcing the full board frame inside `402px`.
- HUD values must remain aligned to their source-frame positions under uniform scaling.

### Missing

- Breakpoint for selecting desktop versus mobile composition.
- Tablet and landscape-mobile layouts.
- Safe-area adjustments and behavior for aspect ratios different from the references.
- Confirmed DOM-versus-Pixi ownership for each HUD element.

## 5. Tarot Cards

### Confirmed

- Desktop card size: `127.83 x 195.58`; mobile card size: `64.85 x 99.22`.
- Card radius is `0` in both main reference frames.
- Symbol IDs supplied by design:

| Game symbol | Asset ID |
|---|---|
| The Fool / Wild | `W` |
| The Sun / Scatter | `Sun` |
| The Tower / Risk trigger | `Tower` |
| The Prophecy | `Prophecy` |
| Swords | `swords` |
| Cups | `cups` |
| Star | `star` |
| Pentagram | `pentagram` |
| Wands | `wands` |
| Multiplier x2 | `M2` |
| Multiplier x5 | `M5` |
| Multiplier x20 | `M20` |
| Multiplier x50 | `M50` |
| Multiplier x100 | `M100` |

- Shared card-back asset: `card_back.png`.

### Inferred

- Render board cards as PixiJS sprites/containers and animate them through GSAP-owned timelines.
- Resolve design asset IDs through the AssetPack manifest; do not use magic file paths throughout rendering code.

### Missing

- File paths for the supplied symbol IDs and confirmation that all source files exist at production resolution.
- Normal, winning, highlighted, dimmed, selected, and disabled visual variants.
- Retina/export scale and texture-atlas requirements.

## 6. Game States

### Confirmed

- Idle: `desktop_main.png`, `mobile_main.png`.
- Win: `desktop_win.png`.
- Wheel of Fortune: `desktop_wheel.png`, `mobile_wheel.png`.
- Prophecy: `desktop_prophecy.png`, `mobile_prophecy.png`.
- Prophecy Win: `desktop_prophecy_win.png`.
- Risk All: `desktop_risk.png`.
- Bet Settings: `desktop_settings.png`.
- Onboarding: five sequential desktop exports and five sequential mobile exports.
- Win Free Spins: `desktop_win_free_spins.png`, `mobile_win_free_spins.png`.
- Big Win: `desktop_big_win.png`, `mobile_big_win.png`.
- Mega Win: `desktop_mega_win.png`.
- Paytable: `desktop_paytable.png`, `mobile_paytable.png`.
- Loading: `loader.png`.
- Risk All uses `card_back.png` for both initial face-down cards. The backend determines the winning side; the UI must not randomize it.
- Gameplay trigger and resolution rules remain authoritative in `.agents/docs/game-rules.md`.

### Missing

- Spinning frame/variant.
- Error and reconnect/recovery designs.
- Mobile Win, Prophecy Win, Risk All, Bet Settings, and Mega Win designs.
- Free Spins active HUD/counter, completion, pause, and resume designs. `Win Free Spins` confirms the award state only.
- Risk All revealed win/loss card faces and settlement state.
- Prophecy presentation for each possible authoritative reward beyond the supplied static frames.

## 7. Animation Guidelines

### Confirmed

- No motion specification or prototype timing data is available. Static PNG exports must not be used to invent durations or easing.
- Use GSAP for presentation timelines; animations never determine outcomes.
- Presentation order is board spin, winning clusters, local multiplier effects, Prophecy result, mandatory Risk All, and then Free Spins handling. Source: `.agents/docs/game-rules.md`.
- Timelines must support completion, interruption, skip where permitted, and cleanup. Correlate completion with `spinId` or `presentationId`.

### Inferred

- Animate PixiJS display properties directly rather than updating React state each frame.
- Keep spin, cluster, multiplier, Prophecy, Risk All, and feature transitions as separate orchestration stages.

### Missing

- Durations, easing, stagger, reel stop order, anticipation, particles, and reduced-motion behavior.
- Card flip/reveal timing for Risk All.
- Free Spins, Big Win, Mega Win, Wheel of Fortune, and Prophecy transition sequences.

## 8. Responsive Design

### Confirmed

- Desktop logical reference: `1920 x 1080`.
- Mobile logical reference: `402 x 874`.
- Main layouts have independently measured board, grid, card, and HUD geometry as documented in section 4.
- PixiJS must handle resizing and device pixel ratio. Source: `AGENTS.md`.

### Inferred

- Select a logical layout, apply one uniform scale factor, and preserve its aspect ratio.
- Center the logical scene in available space unless safe-area rules require an offset.
- Avoid independent x/y scaling, because it would distort cards and artwork.

### Missing

- Desktop/mobile breakpoint and viewport support matrix.
- Letterbox/crop policy for intermediate aspect ratios.
- Safe-area insets and minimum interactive target size.
- Tablet-specific composition.

## 9. Implementation Guidelines

### Confirmed

- PixiJS owns the game scene, board, cards, reel/spin presentation, win highlights, and frame-level effects.
- React/Tailwind owns suitable application UI, accessible controls, settings, and overlays; the final HUD ownership split remains unresolved.
- GSAP owns animation timelines, not game rules.
- AssetPack processes original assets into generated runtime assets. Generated output must not be edited manually.
- Gameplay state and authoritative outcomes are independent of React, PixiJS, GSAP, and DOM APIs.
- Confirmed UI assets:

| Element | Asset |
|---|---|
| Main background | `bg_main.png` |
| Board frame | `board_frame.png` |
| Card back | `card_back.png` |
| Spin button | `spin_button.png` |
| Bet settings | `bet_settings.png` |
| Balance panel | `panel.png` |
| Win panel | `panel.png` |
| Risk All left card | `card_back.png` |
| Risk All right card | `card_back.png` |
| Loader | `loader.png` |

### Inferred

- Keep source design assets separate from generated AssetPack output.
- Generate typed asset references or a manifest and resolve symbol IDs through it.
- Maintain one canonical token module or generated token source consumable by both CSS/Tailwind and Pixi configuration.

### Missing

- AssetPack configuration, generated manifest, and final public asset paths.
- Exact React-versus-Pixi ownership of Spin button, balance, bet, and win panels.
- Font asset loading implementation.

## 10. Missing Designs & Open Questions

| Element | What is missing | What must be clarified |
|---|---|---|
| Figma metadata | URL, node IDs, component variants, constraints | Keep PNG-only workflow or provide inspect metadata later |
| Color semantics | Roles for Figma-generated names | Map raw names to semantic tokens |
| Typography assets | Font files/loading source | Provide approved Hanuman and DM Serif Text sources |
| Responsive policy | Breakpoint, intermediate aspect ratios, safe areas | Define layout-selection and crop/letterbox rules |
| Mobile states | Win, Prophecy Win, Risk All, Bet Settings, Mega Win | Provide exports or confirm desktop-derived behavior |
| Spinning | Static and motion representation | Provide approved spin/reel behavior |
| Card states | Win/highlight/dim/disabled variants | Provide assets or effect values |
| Risk All reveal | Fronts, winner/loser styling, settlement screen | Provide state exports and authoritative copy |
| Free Spins active state | Counter, locked stake, active/complete states | Provide approved feature HUD and completion design |
| Error/recovery | Error, retry, reconnect, restored session | Provide approved screens and copy |
| Motion | Timings, easing, sequences, reduced motion | Provide motion specification; do not infer from PNGs |
| Asset pipeline | Source paths, manifest, output conventions | Confirm AssetPack configuration |
| HUD ownership | DOM versus Pixi per element | Decide based on accessibility and animation needs |

## Verification Notes

### Confirmed

- The document is aligned with the 5 by 4 board, cluster pays, special symbols, feature order, and authoritative-result constraints in `.agents/docs/game-rules.md`.
- Supplied frame, layout, typography, token, state, and asset values are recorded as confirmed.
- Every named PNG in the state and UI asset mappings was checked against `.agents/docs/design`; `desktop_bg_main.png` was corrected to the existing `bg_main.png`.
- No motion durations, easing values, breakpoints, or missing visual variants are invented.

### Limitations

- Analysis remains limited to PNG exports, supplied Figma measurements, and repository documentation.
- Exact visual effects and responsive behavior outside the two reference frames require additional design input.
