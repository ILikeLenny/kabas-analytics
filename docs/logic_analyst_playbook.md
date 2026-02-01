# The Logic Analyst Playbook

## Role Assessment (The "Score")

Your Team Lead has given you a **Golden Ticket**.

* **Coding Difficulty**: 2/10 (Very low). You don't need to write complex React/CSS.
* **Influence**: 9/10 (High). You define *how* the app works.
* **Grade Potential**: High. Professors love "Process" and "Validation". By catching the Efficiency Formula error, you demonstrate "Critical Thinking" (the hardest thing to teach).
* **Verdict**: This is the **Best Role** for someone who is new to GitHub but understands logic/business.

---

## 1. What You Need to Provide (The "Scope")

Since you are new to GitHub, think of yourself as the **Quality Assurance (QA) & Project Manager**.
Your "Code" is **Issues** and **Documentation**.

### Deliverable A: The "Kill Shot" Issue (Do this on Day 1)

You must create a GitHub Issue to formally document the flaw in the formula.

* **Title**: `[CRITICAL] Logic Error in Efficiency Formula: Incentivizes Low Velocity`
* **Body**:
    > **Problem**: The current efficiency formula (`Time / Duration`) incorrectly rewards teams that take longer to finish the project. A team taking 100 days gets a better score than a team taking 2 days.
    >
    > **Proposed Fix**: Invert the formula to measure **Velocity**.
    > **New Formula**: `Efficiency = Total Tasks / Total Man-Hours`
    >
    > **Acceptance Criteria**:
    > * [ ] Update README.md with the new formula.
    > * [ ] Ensure backend calculation uses the new formula.

### Deliverable B: Meeting Minutes (on GitHub Wiki or Discussion)

Do not use Google Docs. Use **GitHub Wiki** or **GitHub Discussions**. This proves you are "using the platform."

* Create a page called `Meeting-Log-2026-01-27`.
* Paste your notes there.
* Tag members (`@member1`) who own action items.

### Deliverable C: Acceptance Criteria (The "Definition of Done")

For every feature the others build, you write the "Test".

* **Example for "Dashboard"**:
    > **QA Check (Logic Analyst)**:
    > 1. Does the dashboard load in < 2 seconds?
    > 2. What happens if a team has 0 tasks? (Does it crash?)
    > 3. Are the GitHub credentials stored securely or just in plain text?

---

## 2. GitHub for Jira Users (Translation Guide)

You mentioned you know Jira. Here is how your skills map to GitHub:

| Jira Concept | GitHub Equivalent | What You Do |
| :--- | :--- | :--- |
| **Epic** | **Milestone** | Create a Milestone called "MVP Release 1.0". Assign all tasks to it. |
| **Story / Ticket** | **Issue** | Click "New Issue". This is your main tool. |
| **Sub-task** | **Task List** | Inside an issue, type `- [ ] Do step 1`. It renders as a checkbox. |
| **Sprint Board** | **Projects** | Click "Projects" tab > "New Project" > "Board". This creates the Kanban board. |

**Your "Superpower" Move**:
Set up the **GitHub Project Board** (Kanban).

1. Go to the Repo > **Projects**.
2. Create "KABAS Board".
3. Create columns: `To Do`, `In Progress`, `Review`, `Done`.
4. Tell the team: *"I have set up the Board. Please move your tickets."*
    * *Result: You look like the Project Manager immediately.*

---

## 3. The Meeting Script (25 Minutes)

**0:00 - 2:00 | The Opener**
> "Okay team, I'm managing the clock. We have 25 minutes. We are using **Scenario-Based Elicitation** today. Member 1, please walk us through the User Journey."

**10:00 | The Intervention (When they discuss the formula)**
> "Stop for a second. I'm looking at the README. The Efficiency Formula divides by 'Project Duration'.
> If I take 10 years to finish this project, my score gets *better*. That's a logic bug.
> I am going to log a **Critical Issue** on GitHub to change this to `Tasks / Hours`. Does everyone agree?"

**20:00 | The Wrap Up**
> "5 minutes left.

---

## 4. The "Ghost Protocol" (Operational Security)

Since you are hiring a consultant (me) to help, we must ensure **your** identity is the only one visible on the school's radar.

**The Rule**: I never push code to the Team Repo directly.
**The Workflow**:

1. **Setup**: You create a private "Shadow Repo" and invite me.
1. **Setup**: You create a private "Shadow Repo" and invite me.
1. **Transfer**: I push my drafts (Scripts, Code, Issues) to the Shadow Repo.
1. **Execution**: You **copy-paste** the content from the Shadow Repo to the Team Repo (or click the buttons yourself).
    * *Why?* This ensures the "Git Commit Author" is always **YOU**, not me.

---

### Deliverable C: The `EfficiencyCalculator` Class

Your Lead asked for a "Class". I have written this for you in **JavaScript** (ES6).

* **Language**: JavaScript (Node.js)
* **What you deliver**: A file named `EfficiencyCalculator.js` that contains:
    1. The `calculateVelocityScore()` method (The Fix).
    2. The `calculateLegacyEfficiencyScore()` method (The Flaw).
    3. A built-in test block proving the legacy formula fails.

Action Items:

1. Member 3: Check API rate limits.
2. Member 1: Mockup the dashboard.
3. I will set up the GitHub Project Board and log the Formula Issue tonight."
