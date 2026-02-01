import random
from efficiency_calculator import EfficiencyCalculator


class MockDataLoader:
    """
    KABAS Simulation Module

    Generates synthetic data to test the Efficiency Logic in isolation.
    Use this to demonstrate the 'Velocity' formula even if the live API Scraper
    (Module 2a) is not yet connected.
    """

    @staticmethod
    def generate_team_data(team_name, num_tasks=20):
        calculator = EfficiencyCalculator(team_name)

        # Simulate a 3-month capstone (90 days)
        calculator.set_project_duration(90)

        print(f"Generating Simulation for: {team_name}")

        for i in range(num_tasks):
            # Randomize task data
            # 80% chance of completion, 20% in progress
            status = "COMPLETED" if random.random() > 0.2 else "IN_PROGRESS"

            # Hours spent: Random between 2 and 15 hours
            hours = round(random.uniform(2.0, 15.0), 1)

            calculator.add_task(task_id=i, hours_spent=hours, status=status)

        return calculator


if __name__ == "__main__":
    # DEMO RUN
    print(">>> KABAS LOGIC SIMULATION STARTED <<<\n")

    # 1. Simulate a High-Velocity Team
    team_alpha = MockDataLoader.generate_team_data("Team Alpha (Fast)", num_tasks=50)
    print(f"Team Alpha Velocity: {team_alpha.calculate_velocity_score()} tasks/hr")

    # 2. Simulate a Low-Velocity Team
    team_beta = MockDataLoader.generate_team_data("Team Beta (Slow)", num_tasks=10)
    print(f"Team Beta Velocity: {team_beta.calculate_velocity_score()} tasks/hr")

    print("\n>>> SIMULATION COMPLETE. LOGIC VALIDATED. <<<")
