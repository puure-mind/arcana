# AGENTS.md

## Project

Web-based slot machine game arcana.

The application must reproduce the approved design, game behavior, animations, and responsive layouts.

### Tech stack

- TypeScript
- Next.js (App Router)
- PixiJS — game rendering
- GSAP — animations and timelines
- AssetPack — asset processing and optimization
- Tailwind CSS — DOM UI styling

Use the existing project dependencies. Do not introduce new libraries without a clear technical reason.

## Architecture

Follow feature-based architecture.

- `src/app` — Next.js routing, layouts, application entry points.
- `src/features` — independent game features and their internal modules.
- `src/shared/ui` — reusable presentation components.
- `src/shared/lib` — reusable utilities and infrastructure.
- `src/shared/config` — shared configuration.

### Dependency rules

- Features may import from `shared`.
- `shared` must not import from `features`.
- Features must not directly import internal implementation details of other features.
- Cross-feature interaction must happen through explicit public APIs or application-level composition.
- Keep feature-specific types, state, logic, and components inside the owning feature.
- Do not create abstractions for hypothetical future requirements.

## Game logic

Separate game logic from rendering and animations.

- Game logic must not depend on PixiJS, GSAP, React, or DOM APIs.
- Game state must have an explicit owner and a single source of truth.
- Rendering must reflect the current game state.
- Animations must not determine game outcomes.
- Do not generate or modify gambling outcomes on the client when outcomes are provided by the server.
- Keep game rules, state transitions, and animation orchestration independently testable.

## Rendering

Use PixiJS for the slot machine game scene.

Use React and Tailwind CSS for application-level DOM interfaces where appropriate.

- Do not use React state to update PixiJS objects every frame.
- Create and destroy PixiJS resources through explicit lifecycle management.
- Handle resizing and device pixel ratio.
- Avoid unnecessary allocations during animation frames.
- Clean up listeners, textures, subscriptions, and other owned resources.

## Animations

Use GSAP for game animations.

- Separate animation orchestration from game rules.
- Prefer reusable timelines and animation functions.
- Animation functions must support completion and interruption.
- Avoid conflicting animations targeting the same properties.
- Ensure animations and timelines are cleaned up when no longer needed.
- Handle rapid user interactions and repeated spin requests safely.

## Assets

Use AssetPack as the asset-processing pipeline.

- Store original assets separately from generated assets.
- Do not manually edit generated AssetPack output.
- Use generated asset manifests or typed references where available.
- Prefer optimized textures and texture atlases where appropriate.
- Avoid duplicate asset loading.
- Follow existing asset naming conventions.

## Figma implementation

Figma is the primary visual reference.

- Inspect the relevant frames, components, dimensions, and assets before implementation.
- Reuse provided assets rather than recreating them in CSS or code.
- Preserve visual hierarchy, spacing, typography, and proportions.
- Do not invent missing visual states without documenting the assumption.
- Implement responsive behavior based on available designs and project rules.
- Validate the result against the reference design.

## TypeScript and code quality

- Use strict TypeScript.
- Avoid `any` unless justified.
- Prefer explicit types for public APIs.
- Keep functions small and focused.
- Avoid unnecessary complexity and premature abstractions.
- Follow existing naming and formatting conventions.
- Add comments for non-obvious decisions, not for self-explanatory code.

## Testing

Add or update tests for relevant behavior.

Prioritize:

- Game state transitions.
- Spin lifecycle.
- Outcome processing.
- Win combination presentation.
- Edge cases and invalid interactions.
- Animation orchestration where practical.

## Agent workflow

Before implementation:

1. Read relevant project documentation.
2. Inspect existing code and conventions.
3. Identify the feature responsible for the change.
4. Clarify missing requirements rather than inventing business rules.

During implementation:

1. Follow architecture and dependency rules.
2. Make focused changes.
3. Reuse existing utilities and components.
4. Keep game logic separate from presentation.

After implementation:

1. Run formatting.
2. Run linting.
3. Run TypeScript checks.
4. Run relevant tests.
5. Run a production build when applicable.
6. Fix errors introduced by the changes.
7. Summarize what changed, what was verified, and any remaining limitations.

Never claim that a check passed unless it was actually executed.

## Documentation

Read the following files when relevant:

- `docs/architecture.md` — detailed architecture.
- `docs/game-rules.md` — gameplay rules and state transitions.
- `docs/design-guidelines.md` — Figma and responsive implementation rules.
- `docs/adr/` — architectural decisions.

Do not duplicate detailed documentation inside AGENTS.md.
