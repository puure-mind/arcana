# Game Rules — Tarot Cluster Slot

Status: **Draft v0.8** (confirmed rules + explicitly unresolved decisions)

## 1. Scope and authority

A 5-column × 4-row tarot-themed slot. This document defines player-visible behavior and domain contracts. Stake Math SDK is the **authoritative mathematical engine** for outcomes, awards, multipliers and risk results; the application must not independently randomize or award payouts. Verify the SDK's actual integration interface before implementing an adapter. Any examples here are illustrative, not an RTP or probability specification.

Terminology: **spin** = one resolved board; **base spin** = paid spin; **free spin** = spin without an additional bet debit; **feature session** = a sequence of awarded free spins; **risk session** = mandatory risk interaction for the current spin's award; **cluster** = connected group of eligible matching symbols.

## 2. Confirmed base rules

- Grid: **5 × 4** (20 positions).
- Win model: **Cluster Pays**, not paylines or ways.
- Minimum winning cluster: **6** matching eligible symbols.
- Adjacency: **orthogonal only** (up/down/left/right), not diagonal.
- **No cascades**: symbols do not disappear/refill after a win.
- **The Fool (Wild)** substitutes for ordinary symbols and participates in clusters. Same-type symbol regions connected via Wild form one cluster; a Wild may also contribute once to each of several distinct-symbol clusters.
- All other non-special tarot cards are ordinary symbols.
- The actual award for each cluster comes from Stake Math SDK / the configured paytable. The client does not derive financial awards from cluster size.

### Unresolved cluster edge cases

- Confirmed: a Wild can belong to multiple clusters of different ordinary symbol types; its cell is counted once per cluster, even if shared between clusters. Same-symbol regions connected through Wild cells form one connected cluster.
- **All-Wild groups never pay**, even if they contain 6 or more Wild cells. A payable cluster must include at least one ordinary symbol.
- **A multiplier adjacent to a shared Wild applies to every winning ordinary-symbol cluster containing that Wild**, once per multiplier card per cluster.
- Cluster overlap and tie-breaking must follow the math configuration; do not invent logic in the frontend.

## 3. Symbols

| Symbol                 | Role                     | Confirmed behavior                                                                        |
| ---------------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| The Fool               | Wild                     | Substitutes for ordinary symbols in clusters                                              |
| The Sun                | Scatter                  | 3+ trigger exactly 10 Free Spins                                                          |
| The Tower              | Risk trigger             | 3+ trigger mandatory Risk All if the spin has a positive award                            |
| The Prophecy           | Final multiplier trigger | 3+ trigger exactly one SDK-selected award: additive +×5 final multiplier OR 10 Free Spins |
| ×2, ×5, ×20, ×50, ×100 | Local multiplier cards   | Adjacent winning clusters receive their values; applicable values add                     |
| Other tarot cards      | Ordinary                 | Form clusters of 6+ matching symbols                                                      |

For Sun, Tower, and Prophecy, **three or more** copies trigger the feature exactly once per spin; additional copies confer no additional spins, attempts, rewards, or multiplier. Special symbols do not count as ordinary cluster symbols unless explicitly stated. Local multiplier cards do not themselves substitute for ordinary symbols.

## 4. Local multipliers

- Local multiplier cards can appear on the 5×4 board.
- A multiplier applies to **each orthogonally touching winning cluster**, once per cluster. A multiplier touching a Wild cell belonging to two or more winning clusters applies separately to every such cluster; the same multiplier card never counts twice within one cluster.
- Multiple multiplier cards touching the same cluster **add their values**, e.g. ×2 + ×5 = ×7 (not ×10).
- For different clusters, compute their applicable local multiplier totals independently.
- If no multiplier touches a cluster, its award remains at its base value (**effective ×1**, not ×0).
- A multiplier touching a non-winning group does not create a win.
- Stake Math SDK provides authoritative cluster payouts and applied multiplier details. The frontend only renders them.

## 5. The Prophecy

- **3 or more The Prophecy** on a resolved board activate a single reward selected by Stake Math SDK from:
  1. **Additive +×5 final multiplier** applied to the total eligible spin award after local cluster multipliers; or
  2. **10 Free Spins**.
- Reward selection is authoritative; the UI must not randomize or choose the reward.
- If the +×5 reward is selected, the final multiplier is applied **after local cluster multipliers**. The award adds **+5 to the existing final multiplier**: e.g. an existing ×3 becomes ×8, not ×15. The initial/default final multiplier and any other sources remain to be verified with the math configuration.
- No award means no payout solely from multiplying zero, unless SDK math explicitly defines another award.
- **Confirmed Free Spins interactions:** if a paid spin awards 10 spins from The Sun and 10 from The Prophecy, combine them into **one 20-spin session**. If The Prophecy awards 10 spins while a Free Spins session is already running, enqueue a **separate 10-spin session**, to begin after the current one ends (and after any mandatory Risk All). The Sun still does not retrigger during Free Spins. **Open:** reward probabilities and default final-multiplier baseline. Four or more Prophecy cards do not increase or duplicate the reward.

## 6. The Sun / Free Spins

- **3 or more The Sun** trigger **10 Free Spins**.
- **No retrigger**: additional Sun symbols during Free Spins do not award more free spins.
- The stake used for all 10 Free Spins is **the stake of the paid spin that triggered the feature**; the player cannot change it during the feature.
- Free Spins require **no additional wager debit**.
- A Free Spins feature maintains `totalSpins` (10 or 20 for an initially combined award), `remainingSpins`, `lockedStake`, and an authoritative accumulated award. The feature manager also persists a FIFO queue of deferred sessions.
- The current feature ends after its allotted resolved free spins (subject to recovery from interruptions); then the next queued session starts, if any.
- Risk All **is permitted during Free Spins** and risks only the award of the particular free spin, not previous free-spin awards.
- After Risk All during Free Spins completes, return to the same Free Spins feature with its remaining count intact.
- **Open:** whether Free Spins auto-play or require user action, and the treatment of simultaneous Sun/Prophecy awards occurring during an existing Free Spins session (Sun grants none; Prophecy may enqueue a new session).

## 7. The Tower / Risk All

### Confirmed eligibility and stake

- **3 or more The Tower** trigger mandatory Risk All only if the current spin's final award is **greater than zero**.
- Risk All puts at risk **the entire final award of the current spin**, **after The Prophecy**, if active.
- Risk All may also occur during Free Spins; it never risks the full accumulated Free Spins feature award.
- When both 3 Tower and 3 Sun appear in a paid spin, **resolve/finish Risk All first**, then begin the awarded 10 Free Spins.
- If the current spin award is zero, skip Risk All even when 3 Tower appear; pending Free Spins still proceed.
- Completing a Risk All session must not destroy the pending Free Spins entitlement.

### Risk All mechanic — confirmed

- Risk All is **mandatory** when the Tower trigger is met and the current spin's final award is positive. There is no `Collect`, `Skip`, or decline action.
- Present **two face-down cards**, one on the left and one on the right. Exactly **one wins and one loses**.
- The player must choose **left or right**. Only **one attempt** is permitted per triggered Risk All session.
- On success, the entire risked award is paid at **×2**; on failure, the risked award becomes **zero**. The original wager is not refunded.
- The win/loss assignment and settlement are determined by the authoritative math/backend, never by frontend randomness or animation.
- The selected card and outcome are revealed after the authoritative response; then the risk session closes.
- If Free Spins are pending, they begin after the risk session closes, regardless of success or loss. A Risk All inside Free Spins returns to the existing feature with the remaining count unchanged.
- **Confirmed persistence:** an unresolved Risk All session is stored authoritatively. On return, show the same two face-down cards and require the player to choose. Do not reroll or bypass the session. Retry and settlement must be idempotent.
- **Open:** precise win/loss probability, whether the left/right assignment is committed before selection or resolved at selection, and the authoritative accounting/settlement API.

## 8. Resolution and presentation order

1. Player requests a base spin with an eligible stake, or starts the next free spin using its locked stake.
2. Authoritative math resolves the board, winning clusters, local multipliers, Prophecy final multiplier, final award and feature triggers.
3. Presentation animates the board, clusters, local multiplier effects, and Prophecy result **in that order**.
4. If 3 Tower and award > 0, resolve mandatory Risk All before proceeding.
5. If a paid spin awarded Free Spins from both Sun and Prophecy, combine them into one 20-spin session. Otherwise start the awarded 10-spin session. Always wait for mandatory Risk All to settle first.
6. If already in Free Spins, resume the remaining spins after Risk All; do not restart the feature. If Prophecy awarded +10 Free Spins, enqueue a distinct 10-spin session for after the current one.
7. Return to base game only after the active Free Spins session and all queued sessions complete.

**Important:** 'Finish Risk All session' means closing the risk interaction, not ending the overarching game runtime or discarding queued features.

## 9. Result contract (conceptual, not a claim about SDK shape)

The adapter should normalize the math result to domain data sufficient for presentation:

```ts
interface ResolvedSpin {
  spinId: string;
  mode: "base" | "free";
  stake: string; // decimal minor-unit strategy TBD
  board: readonly string[][]; // agree on row/column indexing
  clusters: readonly {
    id: string;
    symbol: string;
    cells: readonly { row: number; col: number }[];
    baseAward: string;
    multiplierCells: readonly { row: number; col: number; value: number }[];
    localMultiplier: number;
    finalClusterAward: string;
  }[];
  prophecy?: {
    cells: readonly { row: number; col: number }[];
    reward: { type: "final_multiplier"; additiveValue: 5 } | { type: "free_spins"; count: 10 };
  };
  totalAward: string;
  riskEligible: boolean;
  freeSpinsAwarded: number; // 0, 10, or 20 in a paid spin under confirmed rules
  // Deferred Free Spins sessions are tracked by the authoritative feature-session state.
}
```

This is a **target application DTO**, not an asserted Stake Math SDK API. Actual SDK payloads must be inspected and mapped. Financial values should use exact decimal/minor-unit representation, not floating-point money arithmetic.

## 10. Gameplay state and invariants

- Gameplay owns authoritative domain state and phases; PixiJS and GSAP only present it.
- No new base spin while a spin, risk interaction, or free-spin sequence is unresolved.
- No bet changes while Free Spins are active or pending (including queued sessions). All sessions spawned by a free spin inherit the original triggering paid spin's locked stake.
- The current Free Spins session and deferred sessions must be persisted authoritatively, with stable IDs and FIFO ordering.
- Awarding a deferred session must be idempotent; retries cannot add the same 10 spins twice.
- Each math outcome and settlement is associated with a unique spin/session ID; duplicate callbacks must be idempotent.
- An animation completion is a presentation signal, **not proof of financial settlement**.
- On reload/interruption, restore pending risk/free-spin state from the authoritative service rather than re-rolling a result.
- A pending Free Spins entitlement survives Risk All success, loss, skip, and session close.

## 11. Acceptance examples

1. Six same ordinary symbols joined only orthogonally: one winning cluster; five: not a win.
2. Six same symbols touching only diagonally: not a connected six-symbol cluster.
3. Winning cluster touched by ×2 and ×5: effective local ×7.
4. One ×20 touches two winning clusters: each eligible cluster receives ×20 once.
5. Three Prophecy: SDK selects either additive +×5 final multiplier or 10 Free Spins; UI presents only the authoritative selected reward.
6. Three Sun in a base spin: award exactly ten free spins at the triggering spin's locked stake.
7. Sun during Free Spins: no retrigger.
8. Three Tower with zero award: no Risk All offer.
9. Three Tower + three Sun with positive award: mandatory one-choice Risk All first, then Free Spins, regardless of risk outcome.
10. Tower during Free Spins: only current free-spin award is risked; previously accumulated awards and remaining free spins remain intact.
11. Mandatory Risk All: two face-down cards, exactly one winning; one left/right selection; win pays ×2, loss pays zero; no Collect/Skip and no second attempt.
12. Disconnect before selection: restore the same pending Risk All session and do not generate a new outcome.
13. Two same-symbol regions connected only through Wild cells are one cluster; Wild positions are unique within it.
14. A Wild adjacent to different ordinary symbol types may contribute once to each distinct-symbol cluster.
15. Prophecy selects the 10-Free-Spins reward: no final +×5 award is assumed for that trigger.
16. Paid spin with 3 Sun and 3 Prophecy selecting Free Spins: exactly one 20-spin session at the locked stake.
17. Prophecy selects Free Spins during a Free Spins session: current remaining count is unchanged; a distinct 10-spin session is queued and begins after the current one.
18. Existing final multiplier ×3 plus Prophecy additive +5 gives ×8 (not ×15).
19. Reload during a queued feature: restore the active and queued sessions without duplicating any awards.
20. Six or more Wild cards with no ordinary card: no payable cluster.
21. A multiplier orthogonally adjacent to a Wild shared by two distinct winning symbol clusters applies once to each cluster.
22. Three, four, or five Sun cards each award exactly ten Free Spins in a paid spin, never more for extra copies; equivalent one-trigger-only behavior applies to Tower and Prophecy.

## 12. Open decisions before implementation

1. **Risk All:** win/loss probability, authoritative side assignment, timeout/recovery and settlement contract (choice, one attempt, ×2/zero and mandatory participation are confirmed).
2. **Clusters/Wild:** verify that SDK math can express non-paying all-Wild groups, shared Wild membership, and multiplier propagation through a shared Wild as specified.
3. **Prophecy:** reward probabilities, initial final-multiplier baseline, and payout eligibility. Additive +5, at-least-three threshold with no extra award for 4+, and Free Spins queue behavior are confirmed.
4. **Free Spins UX:** manual vs automatic advance; pause/resume; feature completion screen.
5. **Stake Math SDK:** actual APIs, math configuration, server integration, return schemas, reproducibility and test fixtures.
6. **Accounting:** currency/minor units, payout rounding, when the stake is debited, and how pending wins are settled.

No open decision should be silently treated as approved by an implementation agent.
