---
name: playwright-cucumber-development
description: "Create, extend, or debug JavaScript UI automation in this Playwright and Cucumber repository. Use when working with Gherkin features, step definitions, page objects, browser hooks, or Cucumber scenarios."
---

# Playwright and Cucumber Development

Use this workflow for changes to the framework's UI automation.

## Workflow

1. Inspect the related feature file, step definitions, page object, hooks, and
   Cucumber configuration before changing code.
2. Follow the repository's CommonJS JavaScript style and existing Cucumber and
   Playwright patterns.
3. Keep scenarios focused on observable user behavior. Reuse matching steps
   where appropriate and avoid duplicate or ambiguous step definitions.
4. Put reusable locators and browser actions in page objects. Keep scenario
   assertions in step definitions, consistent with the project README.
5. Prefer accessible Playwright locators and auto-waiting assertions. Do not
   introduce fixed sleeps or unnecessary selectors.
6. Preserve scenario isolation and browser lifecycle behavior. Use unique test
   data when adding scenarios.
7. Run the narrowest relevant Cucumber command available. Use `npm test` for
   the full suite or `npm run test:smoke` for the tagged smoke scenario. If
   execution is blocked, report the reason instead of claiming the test passed.
8. Summarize the files changed and the validation command and result.
