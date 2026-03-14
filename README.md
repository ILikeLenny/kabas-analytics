# KABAS Analytics

> **Author**: Willy Ang Zi Wei  
> **Module**: ICT2505C — Agile Development and UX Project (T2 AY2025/26)  
> **Role**: Logic Analyst & Module 2 (Analytics & Data Aggregation)

---

## What is this?

This repo contains the backend calculation logic for the KABAS project. My job is to take raw task data and calculate meaningful statistics like efficiency score, mean, and standard deviation. The results will then be passed to the dashboard team to display.

I do not touch the API or the frontend. My part is purely the calculation logic.

---

## How the system works

Our team split the work into 3 parts:

```
Step 1 — API Teammate
  → Pulls task data from Jira / GitHub
  → Example output: [{id: 1, hours: 5, status: 'COMPLETED'}, ...]

Step 2 — My Code (this repo)
  → Takes that data and runs the formulas
  → Returns: { mean: 5.8, stdDev: 2.0, velocity: 0.22, efficiency: 3.0 }

Step 3 — Li Wei's Dashboard
  → Displays the numbers as charts and graphs
```

---

## Files in this repo

| File | What it does |
|------|-------------|
| `src/EfficiencyCalculator.js` | Calculates team velocity score (tasks per hour) |
| `src/StatisticsCalculator.js` | Calculates mean, median, standard deviation, percentiles |
| `src/efficiency_formula.js` | KB-34/KB-35: Efficiency score formula with zero-value guards |
| `src/MockDataLoader.js` | Fake data for testing when API is not ready |
| `tests/test_efficiency_formula.js` | Unit tests for the efficiency formula (15 tests) |

---

## How to run

```bash
# Test the efficiency formula (15 unit tests)
node tests/test_efficiency_formula.js

# Run demo for EfficiencyCalculator
node src/EfficiencyCalculator.js

# Run demo for StatisticsCalculator
node src/StatisticsCalculator.js
```

No need to install anything. Uses plain Node.js only.

---

## What the efficiency formula does (KB-34)

```
Efficiency = (Complexity / Time Spent) × Lead Time Weight
```

The lead time weight is based on how fast the PR was merged:

| Lead Time | Weight | Meaning |
|-----------|--------|---------|
| < 24 hours | 1.2x | Fast — bonus |
| 24 to 48 hours | 1.0x | Normal |
| > 48 hours | 0.8x | Slow — penalty |

---

## Zero-value guards (KB-35)

Added safety checks so the system does not crash or return NaN when data is missing:

- If `Time Spent` is 0 or missing → return `0`
- If `Complexity` is null or undefined → default to `1`
- All guard triggers log a `[KABAS WARN]` in the console for debugging

---

## How the API teammate should use my code

```javascript
const EfficiencyCalculator = require('./src/EfficiencyCalculator');
const StatisticsCalculator = require('./src/StatisticsCalculator');
const { calculateEfficiency } = require('./src/efficiency_formula');

// 1. Load task data from your API
const tasks = await fetchFromJira(); // your code

// 2. Calculate velocity
const calc = new EfficiencyCalculator("Team Alpha");
tasks.forEach(t => calc.addTask(t.id, t.hours, t.status));
const velocity = calc.calculateVelocityScore(); // e.g. 0.22

// 3. Calculate statistics
const stats = new StatisticsCalculator();
stats.loadData(tasks.map(t => t.hours));
const summary = stats.getSummary(); // { mean, stdDev, median, ... }

// 4. Calculate efficiency for a single task
const score = calculateEfficiency(5, 2, 12); // 3.0

// 5. Pass everything to Li Wei's dashboard
dashboard.display(velocity, summary, score);
```

---

## Jira tickets completed

| Ticket | Description | Status |
|--------|-------------|--------|
| KB-33 | Normalise GitHub & Jira Timestamps | Done |
| KB-34 | Implement Efficiency Algorithm | Done |
| KB-35 | Implement Zero-Value Guards | Done |

---

*For educational purposes — ICT2505C Project*
