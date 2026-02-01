class EfficiencyCalculator {
    /**
     * KABAS Efficiency Logic Module (JavaScript Version)
     * 
     * This class handles the core business logic for calculating Team Performance Metrics.
     * It implements both the Legacy (Duration-based) and Modern (Velocity-based) formulas.
     */
    constructor(teamName) {
        this.teamName = teamName;
        this.tasks = []; // Array of objects: {id, hours, status}
        this.projectDurationDays = 0;
    }

    /**
     * Ingest task data from GitHub/Jira
     * @param {number|string} taskId 
     * @param {number} hoursSpent 
     * @param {string} status 
     */
    addTask(taskId, hoursSpent, status = "COMPLETED") {
        this.tasks.push({
            id: taskId,
            hours: hoursSpent,
            status: status
        });
    }

    /**
     * Set the Total Project Duration (denominator for legacy formula)
     * @param {number} days 
     */
    setProjectDuration(days) {
        this.projectDurationDays = days;
    }

    getTotalHours() {
        return this.tasks.reduce((sum, task) => sum + task.hours, 0);
    }

    getCompletedTaskCount() {
        return this.tasks.filter(task => task.status === "COMPLETED").length;
    }

    // =========================================================================
    // [DEPRECATED] LEGACY FORMULA
    // Logic: (Avg Time / Duration) * 100
    // Flaw: Inverse correlation with Duration (Longer Duration = Better Score)
    // =========================================================================
    calculateLegacyEfficiencyScore() {
        if (this.projectDurationDays <= 0) return 0.0;

        const totalTasks = this.getCompletedTaskCount();
        if (totalTasks === 0) return 0.0;

        const avgTimePerTask = this.getTotalHours() / totalTasks;

        // The Flaw: Dividing by Duration rewards procrastination
        const score = (avgTimePerTask / this.projectDurationDays) * 100;
        return Number(score.toFixed(4));
    }

    // =========================================================================
    // [RECOMMENDED] VELOCITY PROTOCOL
    // Logic: Tasks / Man-Hours
    // Benefit: Measures throughput. Rewards speed and volume.
    // =========================================================================
    calculateVelocityScore() {
        const totalHours = this.getTotalHours();
        const totalTasks = this.getCompletedTaskCount();

        if (totalHours === 0) return 0.0;

        // Score = Tasks delivered per hour of effort
        const velocity = totalTasks / totalHours;
        return Number(velocity.toFixed(4));
    }
}

// Export for use in other files
module.exports = EfficiencyCalculator;

// =============================================================================
// UNIT TEST / LOGIC PROOF
// Run this file with `node EfficiencyCalculator.js` to prove the flaw.
// =============================================================================
if (require.main === module) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`KABAS LOGIC AUDIT: EFFICIENCY METRIC COMPARISON (JS VERSION)`);
    console.log(`${'='.repeat(60)}\n`);

    // SCENARIO A: The "Sprinters" (Fast Team)
    // 10 Tasks, 50 Hours total, Finished in 5 Days
    const teamFast = new EfficiencyCalculator("Team Alpha (Sprinters)");
    teamFast.setProjectDuration(5);
    for (let i = 0; i < 10; i++) {
        teamFast.addTask(i, 5); // 10 tasks, 5 hours each
    }

    // SCENARIO B: The "Stallers" (Slow Team)
    // Exact same work (10 Tasks, 50 Hours), but they dragged it out for 100 Days
    const teamSlow = new EfficiencyCalculator("Team Beta (Stallers)");
    teamSlow.setProjectDuration(100);
    for (let i = 0; i < 10; i++) {
        teamSlow.addTask(i, 5);
    }

    // COMPARISON
    console.log(`[${teamFast.teamName}]`);
    console.log(` - Work Done: 10 Tasks in 50 Hours`);
    console.log(` - Project Duration: 5 Days`);
    console.log(` - Legacy Score (Lower is Better): ${teamFast.calculateLegacyEfficiencyScore()}`);
    console.log(` - Velocity Score (Higher is Better): ${teamFast.calculateVelocityScore()}`);
    console.log("-".repeat(30));

    console.log(`[${teamSlow.teamName}]`);
    console.log(` - Work Done: 10 Tasks in 50 Hours`);
    console.log(` - Project Duration: 100 Days`);
    console.log(` - Legacy Score (Lower is Better): ${teamSlow.calculateLegacyEfficiencyScore()}`);
    console.log(` - Velocity Score (Higher is Better): ${teamSlow.calculateVelocityScore()}`);
    console.log("-".repeat(30));

    // VERDICT
    const legacyWinner = (teamSlow.calculateLegacyEfficiencyScore() < teamFast.calculateLegacyEfficiencyScore()) ? teamSlow : teamFast;
    const velocityWinner = (teamFast.calculateVelocityScore() > teamSlow.calculateVelocityScore()) ? teamFast : teamSlow;

    console.log(`\n[AUDIT CONCLUSION]`);
    console.log(`Legacy Formula Winner: ${legacyWinner.teamName} (THE FLAW)`);
    console.log(`Velocity Formula Winner: ${velocityWinner.teamName} (THE FIX)`);

    if (legacyWinner === teamSlow) {
        console.log("\nCRITICAL ALERT: Legacy formula incentivizes delaying project submission.");
    }
}
