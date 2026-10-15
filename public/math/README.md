# Arcana Math Status

## Current Candidate Metrics

These metrics are for the current frontend-RGS/dev candidate generated from `games/arcana`.

- RTP: `95.98735%`
- Hit rate: `22.479%`
- Max win observed in exported 100k books: `410.97x`
- Wincap / configured max win: `5000x`
- Books generated: `100,000`
- Lookup rows: `100,000`

The hit rate is measured before Tower Risk All, using `spinAward > 0`, as agreed in the Arcana spec.

## Bonus Frequencies

From the 100,000-spin statistics run:

- Tower 3+: `367 / 100,000` = `0.367%`
- Prophecy 3+: `385 / 100,000` = `0.385%`
- Prophecy +5 final multiplier: `198 / 100,000` = `0.198%`
- Prophecy +10 Free Spins: `187 / 100,000` = `0.187%`
- Average Free Spins awarded per spin: `0.0187`
- Tower Risk pending with win: `29 / 100,000` = `0.029%`

Sun trigger frequency in the last 100k stats output was not separately listed because no `sunTrigger` count appeared in that run output. Re-run `stats.py` to refresh all current trigger counters after reel/paytable changes.

## How It Was Checked

Statistics were checked with:

```bash
env/bin/python games/arcana/stats.py --spins 100000
```

Last recorded output:

```text
spins: 100000
preRiskRtp: 0.9598735000000786
settledRiskEvRtp: 0.9572074000000786
preRiskHitRate: 0.22479
riskRate: 0.00029
avgFreeSpinsAwarded: 0.0187
bonusCounts: {'tower3Plus': 367, 'freeSpins10': 187, 'prophecy3Plus': 385, 'finalMultiplierPlus5': 198}
```

Books and lookup tables were generated with:

```bash
make run GAME=arcana
```

Frontend export was generated with:

```bash
env/bin/python games/arcana/export_frontend.py
```

The generated frontend manifest is:

```text
games/arcana/library/frontend_export/manifest.json
```

The manifest reports:

```text
bookCount: 100000
rtpFromBooks: 0.9598735
hitRateFromBooks: 0.22479
maxPayoutMultiplier: 410.97
lookupWeightModel: uniform-sdk-weights
```

Lookup row counts were checked from:

```text
games/arcana/library/lookup_tables/lookUpTable_base.csv
games/arcana/library/lookup_tables/lookUpTableSegmented_base.csv
```

Both files contain `100,000` rows.

Cascade/tumble/refill tokens were checked in exported books with content search for:

```text
tumble|cascade|refill|explode
```

No matches were found in exported books.

## Important Notes

- This is a frontend-RGS/dev candidate, not real-money production settlement.
- Tower Risk All is represented as an interactive resolver contract. The frontend must use `winningSide` from the book event and must not use browser RNG.
- RTP target is `96% +/- 0.5%`; current candidate is inside the target range.
- Hit-rate target is `20-35%` before Risk; current candidate is inside the target range.
