/**
 * KABAS Statistics Calculator
 * 
 * @author Willy (ILikeLenny)
 * @module Module 2 - Analytics & Data Aggregation
 * @purpose Generate Statistical Distribution for team performance analysis
 * 
 * This module provides statistical analysis functions for:
 * - Mean (Average) calculations
 * - Standard Deviation
 * - Task distribution by status
 * - Percentile rankings
 * - Team performance comparisons
 */

class StatisticsCalculator {
    constructor() {
        this.data = [];
    }

    /**
     * Load an array of numeric values for analysis
     * @param {number[]} values - Array of numbers to analyze
     */
    loadData(values) {
        if (!Array.isArray(values)) {
            throw new Error("Data must be an array of numbers");
        }
        this.data = values.filter(v => typeof v === 'number' && !isNaN(v));
    }

    /**
     * Calculate the Mean (Average)
     * @returns {number} The arithmetic mean
     */
    calculateMean() {
        if (this.data.length === 0) return 0;
        const sum = this.data.reduce((acc, val) => acc + val, 0);
        return Number((sum / this.data.length).toFixed(4));
    }

    /**
     * Calculate the Median (Middle Value)
     * @returns {number} The median value
     */
    calculateMedian() {
        if (this.data.length === 0) return 0;

        const sorted = [...this.data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(4));
        }
        return sorted[mid];
    }

    /**
     * Calculate Standard Deviation
     * Measures how spread out the values are from the mean
     * @returns {number} The standard deviation
     */
    calculateStandardDeviation() {
        if (this.data.length === 0) return 0;

        const mean = this.calculateMean();
        const squaredDiffs = this.data.map(val => Math.pow(val - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((acc, val) => acc + val, 0) / this.data.length;

        return Number(Math.sqrt(avgSquaredDiff).toFixed(4));
    }

    /**
     * Calculate Variance
     * @returns {number} The variance (standard deviation squared)
     */
    calculateVariance() {
        const stdDev = this.calculateStandardDeviation();
        return Number((stdDev * stdDev).toFixed(4));
    }

    /**
     * Find Minimum Value
     * @returns {number} The smallest value
     */
    getMin() {
        if (this.data.length === 0) return 0;
        return Math.min(...this.data);
    }

    /**
     * Find Maximum Value
     * @returns {number} The largest value
     */
    getMax() {
        if (this.data.length === 0) return 0;
        return Math.max(...this.data);
    }

    /**
     * Calculate Range
     * @returns {number} Difference between max and min
     */
    getRange() {
        return this.getMax() - this.getMin();
    }

    /**
     * Calculate a specific percentile
     * @param {number} percentile - The percentile to calculate (0-100)
     * @returns {number} The value at that percentile
     */
    calculatePercentile(percentile) {
        if (this.data.length === 0) return 0;
        if (percentile < 0 || percentile > 100) {
            throw new Error("Percentile must be between 0 and 100");
        }

        const sorted = [...this.data].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);

        if (lower === upper) {
            return sorted[lower];
        }

        // Linear interpolation
        const fraction = index - lower;
        return Number((sorted[lower] + fraction * (sorted[upper] - sorted[lower])).toFixed(4));
    }

    /**
     * Get summary statistics
     * @returns {object} Object containing all key statistics
     */
    getSummary() {
        return {
            count: this.data.length,
            mean: this.calculateMean(),
            median: this.calculateMedian(),
            standardDeviation: this.calculateStandardDeviation(),
            variance: this.calculateVariance(),
            min: this.getMin(),
            max: this.getMax(),
            range: this.getRange(),
            p25: this.calculatePercentile(25),
            p50: this.calculatePercentile(50),
            p75: this.calculatePercentile(75)
        };
    }

    // =========================================================================
    // TASK DISTRIBUTION ANALYSIS
    // For analyzing Jira/GitHub task data
    // =========================================================================

    /**
     * Analyze task distribution by status
     * @param {object[]} tasks - Array of task objects with 'status' property
     * @returns {object} Distribution counts and percentages
     */
    static analyzeTaskDistribution(tasks) {
        if (!Array.isArray(tasks) || tasks.length === 0) {
            return { total: 0, distribution: {} };
        }

        const distribution = {};
        tasks.forEach(task => {
            const status = task.status || 'UNKNOWN';
            distribution[status] = (distribution[status] || 0) + 1;
        });

        // Calculate percentages
        const total = tasks.length;
        const percentages = {};
        for (const [status, count] of Object.entries(distribution)) {
            percentages[status] = {
                count: count,
                percentage: Number(((count / total) * 100).toFixed(2))
            };
        }

        return {
            total: total,
            distribution: percentages
        };
    }

    /**
     * Calculate team velocity statistics from task hours
     * @param {object[]} tasks - Array of task objects with 'hours' property
     * @returns {object} Velocity statistics
     */
    static analyzeVelocity(tasks) {
        if (!Array.isArray(tasks) || tasks.length === 0) {
            return { avgHoursPerTask: 0, totalHours: 0, taskCount: 0 };
        }

        const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
        const hours = completedTasks.map(t => t.hours || 0);

        const totalHours = hours.reduce((sum, h) => sum + h, 0);
        const avgHours = hours.length > 0 ? totalHours / hours.length : 0;

        return {
            taskCount: completedTasks.length,
            totalHours: Number(totalHours.toFixed(2)),
            avgHoursPerTask: Number(avgHours.toFixed(2)),
            tasksPerHour: totalHours > 0 ? Number((completedTasks.length / totalHours).toFixed(4)) : 0
        };
    }

    /**
     * Compare two teams' performance
     * @param {object} teamA - Team A velocity stats
     * @param {object} teamB - Team B velocity stats
     * @returns {object} Comparison results
     */
    static compareTeams(teamA, teamB) {
        const velocityDiff = teamA.tasksPerHour - teamB.tasksPerHour;
        const winner = velocityDiff > 0 ? 'Team A' : velocityDiff < 0 ? 'Team B' : 'Tie';

        return {
            teamA: teamA,
            teamB: teamB,
            velocityDifference: Number(Math.abs(velocityDiff).toFixed(4)),
            winner: winner,
            percentageDifference: teamB.tasksPerHour > 0
                ? Number(((velocityDiff / teamB.tasksPerHour) * 100).toFixed(2))
                : 0
        };
    }
}

// Export for use in other files
module.exports = StatisticsCalculator;

// =============================================================================
// UNIT TEST / DEMONSTRATION
// Run with: node StatisticsCalculator.js
// =============================================================================
if (require.main === module) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`KABAS STATISTICS CALCULATOR - DEMO`);
    console.log(`${'='.repeat(60)}\n`);

    // -------------------------------------------------------------------------
    // TEST 1: Basic Statistics
    // -------------------------------------------------------------------------
    console.log(`[TEST 1: Basic Statistics]`);
    const calc = new StatisticsCalculator();
    calc.loadData([4, 8, 6, 5, 3, 7, 8, 9, 2, 5, 6, 7]);

    const summary = calc.getSummary();
    console.log(`Data: [4, 8, 6, 5, 3, 7, 8, 9, 2, 5, 6, 7]`);
    console.log(`Mean: ${summary.mean}`);
    console.log(`Median: ${summary.median}`);
    console.log(`Standard Deviation: ${summary.standardDeviation}`);
    console.log(`Range: ${summary.min} - ${summary.max}`);
    console.log(`25th Percentile: ${summary.p25}`);
    console.log(`75th Percentile: ${summary.p75}`);
    console.log('-'.repeat(40));

    // -------------------------------------------------------------------------
    // TEST 2: Task Distribution
    // -------------------------------------------------------------------------
    console.log(`\n[TEST 2: Task Distribution Analysis]`);
    const sampleTasks = [
        { id: 1, status: 'COMPLETED', hours: 5 },
        { id: 2, status: 'COMPLETED', hours: 3 },
        { id: 3, status: 'IN_PROGRESS', hours: 2 },
        { id: 4, status: 'COMPLETED', hours: 4 },
        { id: 5, status: 'TODO', hours: 0 },
        { id: 6, status: 'COMPLETED', hours: 6 },
        { id: 7, status: 'IN_PROGRESS', hours: 1 },
        { id: 8, status: 'COMPLETED', hours: 5 }
    ];

    const distribution = StatisticsCalculator.analyzeTaskDistribution(sampleTasks);
    console.log(`Total Tasks: ${distribution.total}`);
    for (const [status, data] of Object.entries(distribution.distribution)) {
        console.log(`  ${status}: ${data.count} tasks (${data.percentage}%)`);
    }
    console.log('-'.repeat(40));

    // -------------------------------------------------------------------------
    // TEST 3: Velocity Analysis
    // -------------------------------------------------------------------------
    console.log(`\n[TEST 3: Velocity Analysis]`);
    const velocity = StatisticsCalculator.analyzeVelocity(sampleTasks);
    console.log(`Completed Tasks: ${velocity.taskCount}`);
    console.log(`Total Hours: ${velocity.totalHours}`);
    console.log(`Avg Hours/Task: ${velocity.avgHoursPerTask}`);
    console.log(`Tasks/Hour: ${velocity.tasksPerHour}`);
    console.log('-'.repeat(40));

    // -------------------------------------------------------------------------
    // TEST 4: Team Comparison
    // -------------------------------------------------------------------------
    console.log(`\n[TEST 4: Team Comparison]`);
    const teamAlpha = { tasksPerHour: 0.22 };
    const teamBeta = { tasksPerHour: 0.15 };

    const comparison = StatisticsCalculator.compareTeams(teamAlpha, teamBeta);
    console.log(`Team Alpha: ${teamAlpha.tasksPerHour} tasks/hour`);
    console.log(`Team Beta: ${teamBeta.tasksPerHour} tasks/hour`);
    console.log(`Winner: ${comparison.winner} (+${comparison.percentageDifference}% faster)`);

    console.log(`\n${'='.repeat(60)}`);
    console.log(`DEMO COMPLETE`);
    console.log(`${'='.repeat(60)}\n`);
}
