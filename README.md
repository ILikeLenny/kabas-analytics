# KABAS Analytics

> **Author**: Willy (ILikeLenny)  
> **Role**: Logic Analyst & Systems Architect  
> **Module**: Module 2 (Analytics & Data Aggregation)

---

## 🤔 What Is This?

This is the **brain** of the KABAS system. It takes raw task data and calculates meaningful numbers for the dashboard.

**I provide the LOGIC (formulas). The API teammate provides the DATA.**

---

## 👥 How We Work Together

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: API Teammate                                        │
│  ────────────────────                                        │
│  • Pulls task data from Jira/GitHub                         │
│  • Example: [{id: 1, hours: 5, status: 'COMPLETED'}, ...]   │
└─────────────────────┬───────────────────────────────────────┘
                      │ passes data to
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: MY CODE (This Repo)                                 │
│  ───────────────────────────                                 │
│  • EfficiencyCalculator.js → Calculates velocity score      │
│  • StatisticsCalculator.js → Calculates mean, stddev, etc   │
│  • Returns: { mean: 5.8, stdDev: 2.0, velocity: 0.22 }      │
└─────────────────────┬───────────────────────────────────────┘
                      │ sends numbers to
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Li Wei's Dashboard                                  │
│  ──────────────────────────                                  │
│  • Displays the numbers as charts and graphs                │
│  • Shows: "Team Alpha: 85% efficient"                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 What's In This Repo

| File | What It Does | My Job? |
|------|--------------|---------|
| `src/EfficiencyCalculator.js` | Calculates team efficiency score | ✅ Done |
| `src/StatisticsCalculator.js` | Calculates Mean, StdDev, Percentiles | ✅ Done |
| `src/MockDataLoader.js` | Fake data for testing | ✅ Done |

---

## 🚀 How To Use (Demo Mode)

Run these to see the demo output:

```bash
# Test the Efficiency Calculator
node src/EfficiencyCalculator.js

# Test the Statistics Calculator
node src/StatisticsCalculator.js
```

**This uses FAKE data to prove the logic works.**

---

## 🔌 How To Use (Integration Mode)

When API teammate is ready, they call my code like this:

```javascript
// 1. API teammate fetches real data
const tasks = await fetchFromJira();  // Their code

// 2. Use MY EfficiencyCalculator
const EfficiencyCalculator = require('./EfficiencyCalculator');
const calc = new EfficiencyCalculator("Team Alpha");
tasks.forEach(t => calc.addTask(t.id, t.hours, t.status));
const velocityScore = calc.calculateVelocityScore();
// Returns: 0.22 (tasks per hour)

// 3. Use MY StatisticsCalculator
const StatisticsCalculator = require('./StatisticsCalculator');
const stats = new StatisticsCalculator();
stats.loadData(tasks.map(t => t.hours));
const summary = stats.getSummary();
// Returns: { mean: 5.8, stdDev: 2.0, median: 6, ... }

// 4. Send to Li Wei's dashboard
dashboard.display(velocityScore, summary);
```

---

## 📊 What My Code Calculates

### EfficiencyCalculator

| Method | Returns | Example |
|--------|---------|---------|
| `calculateVelocityScore()` | Tasks per hour | `0.22` |
| `getTotalHours()` | Sum of all hours | `50` |
| `getCompletedTaskCount()` | Number completed | `10` |

### StatisticsCalculator

| Method | Returns | Example |
|--------|---------|---------|
| `calculateMean()` | Average | `5.83` |
| `calculateMedian()` | Middle value | `6` |
| `calculateStandardDeviation()` | Spread | `2.03` |
| `calculatePercentile(75)` | 75th percentile | `7.25` |
| `analyzeTaskDistribution(tasks)` | % by status | `{COMPLETED: 62%, IN_PROGRESS: 25%}` |

---

## ✅ Summary

| Question | Answer |
|----------|--------|
| What do I provide? | The **formulas** (calculation logic) |
| What does API teammate provide? | The **data** (from Jira/GitHub) |
| What does Li Wei do? | **Displays** the results |
| Is my work done? | ✅ Yes! Logic is ready |

---

## 📝 License

For educational purposes (ICT2505C Project).
