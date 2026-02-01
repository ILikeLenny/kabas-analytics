const EfficiencyCalculator = require('./EfficiencyCalculator');

class MockDataLoader {
    /**
     * KABAS Simulation Module (JavaScript Version)
     * 
     * Generates synthetic data to test the Efficiency Logic in isolation.
     * Use this to demonstrate the 'Velocity' formula even if the live API Scraper 
     * (Module 2a) is not yet connected.
     */

    static generateTeamData(teamName, numTasks = 20) {
        const calculator = new EfficiencyCalculator(teamName);

        // Simulate a 3-month capstone (90 days)
        calculator.setProjectDuration(90);

        console.log(`Generating Simulation for: ${teamName}`);

        for (let i = 0; i < numTasks; i++) {
            // Randomize task data
            // 80% chance of completion, 20% in progress
            const status = Math.random() > 0.2 ? "COMPLETED" : "IN_PROGRESS";

            // Hours spent: Random between 2 and 15 hours
            // Math.random() * (max - min) + min
            const hours = Number((Math.random() * (15.0 - 2.0) + 2.0).toFixed(1));

            calculator.addTask(i, hours, status);
        }

        return calculator;
    }
}

// DEMO RUN
if (require.main === module) {
    console.log(">>> KABAS LOGIC SIMULATION STARTED (JS) <<<\n");

    // 1. Simulate a High-Velocity Team
    const teamAlpha = MockDataLoader.generateTeamData("Team Alpha (Fast)", 50);
    console.log(`Team Alpha Velocity: ${teamAlpha.calculateVelocityScore()} tasks/hr`);

    // 2. Simulate a Low-Velocity Team
    const teamBeta = MockDataLoader.generateTeamData("Team Beta (Slow)", 10);
    console.log(`Team Beta Velocity: ${teamBeta.calculateVelocityScore()} tasks/hr`);

    console.log("\n>>> SIMULATION COMPLETE. LOGIC VALIDATED. <<<");
}
