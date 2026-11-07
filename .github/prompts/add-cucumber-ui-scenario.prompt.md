---
description: "Add a maintainable Playwright and Cucumber UI scenario to this JavaScript framework."
name: "Add Cucumber UI Scenario"
argument-hint: "Describe the user behavior to automate and expected outcome"
agent: "agent"
---

Add a Cucumber UI scenario for the user behavior described below:

${input:behavior:Describe the behavior and expected outcome}

Follow the project workflow in
[playwright-cucumber-development](../skills/playwright-cucumber-development/SKILL.md).
Inspect existing features, step definitions, and page objects first. Reuse
existing steps where appropriate, add reusable browser interactions to the page
object when needed, and keep assertions in step definitions. Follow the
repository's JavaScript style and use Playwright's accessible locators and
auto-waiting behavior.

After implementation, run the narrowest relevant test command available and
report the files changed and the exact validation result. Do not claim tests
passed if they could not be run.
