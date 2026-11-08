# Playwright Cucumber Automation Framework (JavaScript)

A starter UI automation framework using JavaScript, Playwright, and Cucumber's Gherkin feature
files. It demonstrates browser lifecycle hooks, a small Page Object Model, readable scenarios,
and Playwright assertions.

## Requirements

- Node.js 20 or newer
- npm

## Setup

Install dependencies and the Chromium browser:

```powershell
npm install
npx playwright install chromium
```

Run all scenarios:

```powershell
npm test
```

Run smoke tests only:

```powershell
npm run test:smoke
```

See the [Cucumber + Playwright cheatsheet](CHEATSHEET.md) for Gherkin syntax,
step definitions, locators, assertions, hooks, and debugging commands.

Run with a visible browser from PowerShell:

```powershell
$env:HEADLESS = "false"
npm test
Remove-Item Env:HEADLESS
```

Set a different application URL:

```powershell
$env:PLAYWRIGHT_BASE_URL = "https://your-test-app.example"
npm test
```

The sample scenario uses the public TodoMVC demo by default, so it needs internet access.

## Project structure

```text
features/
  todo.feature                 Gherkin scenarios
  step-definitions/
    todo.steps.js              Maps Gherkin steps to browser behavior
pages/
  todo-page.js                 Reusable page locators and actions
support/
  hooks.js                     Starts and closes browser resources
  world.js                     Per-scenario browser state
cucumber.js                    Cucumber CLI configuration
```

## Framework design

- **Feature files** describe behavior in business-readable Gherkin.
- **Step definitions** connect Gherkin steps to application interactions and assertions.
- **Page objects** keep locators and reusable page actions in one place.
- **World state** is scenario-scoped, so each scenario gets an isolated page and context.
- **Hooks** own the browser lifecycle and attach a screenshot when a scenario fails.
- **Playwright locators** use accessible roles and labels where possible and auto-wait for actions.

Keep scenario assertions in step definitions, and keep reusable UI behavior in page objects.
Use unique test data and avoid fixed sleeps; assert on the expected UI state instead.

## AI-assisted development

This repository includes project-specific GitHub Copilot customizations to
support a consistent AI-assisted workflow:

- [Playwright and Cucumber development skill](.github/skills/playwright-cucumber-development/SKILL.md)
  provides the workflow for creating and maintaining scenarios in this framework.
- [Add Cucumber UI scenario prompt](.github/prompts/add-cucumber-ui-scenario.prompt.md)
  is a reusable prompt for adding a user behavior as an automated scenario.

Review AI-generated changes and run the relevant scenarios before relying on
them.
