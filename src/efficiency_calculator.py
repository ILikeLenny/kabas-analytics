import statistics


class EfficiencyCalculator:
    """
    KABAS Efficiency Logic Module

    This class handles the core business logic for calculating Team Performance Metrics.
    It implements both the Legacy (Duration-based) and Modern (Velocity-based) formulas
    to allow for comparative analysis during the transition phase.
    """

    def __init__(self, team_name):
        self.team_name = team_name
        self.tasks = []  # List of dicts: {'id': int, 'hours': float, 'status': str}
        self.project_start_date = None
        self.project_end_date = None

    def add_task(self, task_id, hours_spent, status="COMPLETED"):
        """Ingest task data from GitHub/Jira."""
        self.tasks.append({"id": task_id, "hours": hours_spent, "status": status})

    def set_project_duration(self, days):
        """Set the Total Project Duration (denominator for legacy formula)."""
        self.project_duration_days = days

    def get_total_hours(self):
        return sum(t["hours"] for t in self.tasks)

    def get_completed_task_count(self):
        return len([t for t in self.tasks if t["status"] == "COMPLETED"])

    # =========================================================================
    # [DEPRECATED] LEGACY FORMULA
    # Logic: (Avg Time / Duration) * 100
    # Flaw: Inverse correlation with Duration (Longer Duration = Better Score)
    # =========================================================================
    def calculate_legacy_efficiency_score(self):
        if self.project_duration_days <= 0:
            return 0.0

        total_tasks = self.get_completed_task_count()
        if total_tasks == 0:
            return 0.0

        avg_time_per_task = self.get_total_hours() / total_tasks

        # The Flaw: Dividing by Duration rewards procrastination
        score = (avg_time_per_task / self.project_duration_days) * 100
        return round(score, 4)

    # =========================================================================
    # [RECOMMENDED] VELOCITY PROTOCOL
    # Logic: Tasks / Man-Hours
    # Benefit: Measures throughput. Rewards speed and volume.
    # =========================================================================
    def calculate_velocity_score(self):
        total_hours = self.get_total_hours()
        total_tasks = self.get_completed_task_count()

        if total_hours == 0:
            return 0.0

        # Score = Tasks delivered per hour of effort
        velocity = total_tasks / total_hours
        return round(velocity, 4)


# =============================================================================
# UNIT TEST / LOGIC PROOF
# Run this block to demonstrate the flaw in the Legacy Formula.
# =============================================================================
if __name__ == "__main__":
    print(f"\n{'=' * 60}")
    print(f"KABAS LOGIC AUDIT: EFFICIENCY METRIC COMPARISON")
    print(f"{'=' * 60}\n")

    # SCENARIO A: The "Sprinters" (Fast Team)
    # 10 Tasks, 50 Hours total, Finished in 5 Days
    team_fast = EfficiencyCalculator("Team Alpha (Sprinters)")
    team_fast.set_project_duration(5)
    for i in range(10):
        team_fast.add_task(i, 5)  # 10 tasks, 5 hours each

    # SCENARIO B: The "Stallers" (Slow Team)
    # Exact same work (10 Tasks, 50 Hours), but they dragged it out for 100 Days
    team_slow = EfficiencyCalculator("Team Beta (Stallers)")
    team_slow.set_project_duration(100)
    for i in range(10):
        team_slow.add_task(i, 5)

    # COMPARISON
    print(f"[{team_fast.team_name}]")
    print(f" - Work Done: 10 Tasks in 50 Hours")
    print(f" - Project Duration: 5 Days")
    print(
        f" - Legacy Score (Lower is Better): {team_fast.calculate_legacy_efficiency_score()}"
    )
    print(
        f" - Velocity Score (Higher is Better): {team_fast.calculate_velocity_score()}"
    )
    print("-" * 30)

    print(f"[{team_slow.team_name}]")
    print(f" - Work Done: 10 Tasks in 50 Hours")
    print(f" - Project Duration: 100 Days")
    print(
        f" - Legacy Score (Lower is Better): {team_slow.calculate_legacy_efficiency_score()}"
    )
    print(
        f" - Velocity Score (Higher is Better): {team_slow.calculate_velocity_score()}"
    )
    print("-" * 30)

    # VERDICT
    legacy_winner = (
        team_slow
        if team_slow.calculate_legacy_efficiency_score()
        < team_fast.calculate_legacy_efficiency_score()
        else team_fast
    )
    velocity_winner = (
        team_fast
        if team_fast.calculate_velocity_score() > team_slow.calculate_velocity_score()
        else team_slow
    )

    print(f"\n[AUDIT CONCLUSION]")
    print(f"Legacy Formula Winner: {legacy_winner.team_name} (THE FLAW)")
    print(f"Velocity Formula Winner: {velocity_winner.team_name} (THE FIX)")

    if legacy_winner == team_slow:
        print(
            "\nCRITICAL ALERT: Legacy formula incentivizes delaying project submission."
        )
