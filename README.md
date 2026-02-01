# KABAS Analytics

> **Author**: Willy (ILikeLenny)  
> **Role**: Logic Analyst & Systems Architect  
> **Module**: Module 2 (Analytics & Data Aggregation)

This repository contains the core analytics logic for the KABAS (Kanban Board Assessment System) project. It processes raw Jira/GitHub data and transforms it into meaningful performance metrics for the dashboard.

---

## 🎯 What This Module Does

| Use Case | File | Purpose |
|----------|------|---------|
| **Calculate Efficiency Score** | `EfficiencyCalculator.js` | Measures team productivity (tasks per hour) |
| **Generate Statistical Distribution** | `StatisticsCalculator.js` | Calculates Mean, StdDev, Percentiles, Task Distribution |

---

## 📂 Repository Structure

### ⚡ JavaScript Implementation (Production)

| File | Description |
|------|-------------|
| `src/EfficiencyCalculator.js` | Calculates team velocity score using the modern formula |
| `src/StatisticsCalculator.js` | Statistical analysis: Mean, Median, StdDev, Percentiles, Task Distribution |
| `src/MockDataLoader.js` | Generates fake team data for testing |

### 🐍 Python Implementation (Legacy)

| File | Description |
|------|-------------|
| `src/efficiency_calculator.py` | Python version of efficiency calculator |
| `src/mock_data_loader.py` | Python version of mock data loader |

### 📚 Documentation

| File | Description |
|------|-------------|
| `docs/setup_guide.md` | Environment setup guide |
| `docs/meeting_script.md` | Team meeting presentation script |
| `docs/logic_analyst_playbook.md` | Complete strategy manual |
| `docs/architecture.md` | System architecture overview |

---

## 🚀 Quick Start

### Run the Efficiency Calculator
```bash
node src/EfficiencyCalculator.js
```
Shows the "Logic Audit" comparing Legacy vs Velocity formulas.

### Run the Statistics Calculator
```bash
node src/StatisticsCalculator.js
```
Demonstrates statistical analysis with sample data.

### Run the Mock Data Loader
```bash
node src/MockDataLoader.js
```
Generates fake team data for testing.

---

## 📊 StatisticsCalculator Features

| Function | Purpose |
|----------|---------|
| `calculateMean()` | Average of values |
| `calculateMedian()` | Middle value |
| `calculateStandardDeviation()` | Spread from mean |
| `calculatePercentile(n)` | Value at nth percentile |
| `getSummary()` | All stats in one object |
| `analyzeTaskDistribution(tasks)` | Count tasks by status (%) |
| `analyzeVelocity(tasks)` | Tasks per hour analysis |
| `compareTeams(teamA, teamB)` | Compare two teams' performance |

---

## 🔗 System Integration

```
┌─────────────────┐
│  Jira / GitHub  │  ← Raw Data
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  KABAS Analytics (This Module)          │
│  • EfficiencyCalculator.js              │
│  • StatisticsCalculator.js              │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Dashboard UI   │  ← Displays metrics
└─────────────────┘
```

---

## 📝 License

For educational purposes (ICT2505C Project).
