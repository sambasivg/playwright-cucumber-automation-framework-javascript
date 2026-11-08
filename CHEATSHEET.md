# Cucumber + Playwright Cheatsheet

Quick reference and setup guide for this JavaScript framework.

## Step-by-step setup

### 1. Install and verify Node.js

Install Node.js 20 or newer, which includes npm. Open PowerShell in a new
terminal and confirm both commands are available:

```powershell
node --version
npm --version
```

### 2. Get the project

Clone the repository, then change into its folder:

```powershell
git clone https://github.com/sambasivg/playwright-cucumber-automation-framework-javascript.git
Set-Location playwright-cucumber-automation-framework-javascript
```

If you already have this project open in VS Code, skip the clone and
`Set-Location` commands. Open a terminal at the project root (the folder
containing `package.json`).

### 3. Install JavaScript dependencies

```powershell
npm ci
```

`npm ci` installs the exact dependency versions recorded in `package-lock.json`.
Use `npm install` instead if you are setting up a new project that does not yet
have a lockfile.

For a new project from an empty folder, initialize npm and install the
development dependencies:

```powershell
npm init -y
npm install --save-dev @cucumber/cucumber @playwright/test
New-Item -ItemType Directory -Force -Path features\step-definitions, pages, support
```

Add these scripts to the `scripts` section of `package.json`:

```json
{
  "scripts": {
    "test": "cucumber-js",
    "test:smoke": "cucumber-js --tags @smoke"
  }
}
```

Create `cucumber.js` at the project root so Cucumber loads the feature files,
hooks, page objects, and step definitions:

```js
"use strict";

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: [
      "support/**/*.js",
      "pages/**/*.js",
      "features/step-definitions/**/*.js"
    ],
    format: ["progress"],
    parallel: 1
  }
};
```

Add a browser lifecycle in `support/hooks.js` and expose its page through a
Cucumber World (see this project's `support/hooks.js` and `support/world.js`).
That gives each scenario its own browser context and page.

### 4. Install the Playwright browser

Playwright needs browser binaries in addition to its npm package. This
framework's hooks launch Chromium, so install it with:

```powershell
npx playwright install chromium
```

On Linux CI machines, install required operating-system packages as well:

```bash
npx playwright install --with-deps chromium
```

### 5. Know where framework code belongs

This project uses CommonJS JavaScript and Cucumber's `cucumber.js` config:

| File or folder | Responsibility |
| --- | --- |
| `cucumber.js` | Tells Cucumber where features and step/support files are located |
| `features/*.feature` | Gherkin scenarios describing user-visible behavior |
| `features/step-definitions/*.js` | Connects Gherkin steps to JavaScript functions |
| `pages/*.js` | Holds page locators and reusable UI actions |
| `support/world.js` | Defines scenario-scoped state, available as `this` in steps |
| `support/hooks.js` | Starts and closes browser resources around each scenario |
| `package.json` | Provides npm scripts and dependency declarations |

### 6. Run the existing scenarios

```powershell
npm test
```

The sample opens the public TodoMVC demo, so the machine needs internet access.
The `@smoke` tag selects the quick smoke scenario:

```powershell
npm run test:smoke
```

### 7. Point tests at your application

The hooks use `PLAYWRIGHT_BASE_URL`, falling back to the TodoMVC demo URL.
Set the environment variable in PowerShell before running tests:

```powershell
$env:PLAYWRIGHT_BASE_URL = "https://your-test-app.example"
npm test
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

To see the browser while debugging, set `HEADLESS` to `false`:

```powershell
$env:HEADLESS = "false"
npm test
Remove-Item Env:HEADLESS
```

### 8. Add a scenario for your application

1. Write a behavior-focused scenario in a `.feature` file under `features/`.
2. Add matching `Given`, `When`, and `Then` definitions under
   `features/step-definitions/`.
3. Use a page object under `pages/` for reusable locators and UI actions.
4. Access the current scenario's page through the Cucumber World
   (`this.page`); the `Before` hook creates it and the `After` hook closes it.
5. Run the feature and refine locators/assertions against the real UI.

For example, the existing `features/todo.feature` describes adding a todo,
`features/step-definitions/todo.steps.js` implements its steps, and
`pages/todo-page.js` contains its page interactions.

## Run scenarios

```powershell
npm test                                      # All scenarios
npm run test:smoke                            # Scenarios tagged @smoke
npx cucumber-js features/todo.feature         # One feature
npx cucumber-js features/todo.feature:7       # Scenario at a line
npx cucumber-js --tags "@smoke and not @wip"  # Tag expression
```

## Gherkin

```gherkin
Feature: Account settings
  As a signed-in user
  I want to update my profile
  So that my account details stay current

  @smoke
  Scenario: Update the display name
    Given I open the profile page
    When I change the display name to "Sam"
    Then I should see the display name "Sam"
```

- `Feature` groups related behavior.
- `Scenario` describes one example; `Scenario Outline` runs an example for each
  row in an `Examples` table.
- `Given` establishes context, `When` performs an action, and `Then` checks an
  outcome. `And` and `But` continue the preceding step type.
- Tags such as `@smoke` can be placed on features or scenarios and selected
  with `--tags`.
- Keep scenarios focused on observable behavior and use descriptive names.

## Step definitions

Match Gherkin text with Cucumber expressions and use a `function` when you need
the scenario World as `this`:

```js
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I open the profile page", async function () {
  await this.page.goto("/profile");
});

When("I change the display name to {string}", async function (name) {
  await this.profilePage.setDisplayName(name);
});

Then("I should see the display name {string}", async function (name) {
  await expect(this.profilePage.displayName).toHaveText(name);
});
```

Common Cucumber expression parameters include `{string}`, `{int}`, `{float}`,
and `{word}`. The captured values are passed to the step function in order.
Use `async`/`await` for browser actions and assertions.

## Playwright locators and actions

Prefer accessible roles and labels; locators are resolved when used and
Playwright auto-waits for actions and web-first assertions.

```js
const saveButton = page.getByRole("button", { name: "Save" });
const emailInput = page.getByLabel("Email");
const heading = page.getByRole("heading", { name: "Profile" });

await emailInput.fill("sam@example.com");
await page.getByRole("checkbox", { name: "Subscribe" }).check();
await saveButton.click();

await expect(heading).toBeVisible();
await expect(page.getByText("Changes saved")).toBeVisible();
await expect(emailInput).toHaveValue("sam@example.com");
```

Useful locator patterns:

```js
page.getByRole("link", { name: "Settings" });
page.getByPlaceholder("Search");
page.getByText("Welcome back");
page.locator("[data-testid='results']");
page.getByRole("listitem").filter({ hasText: "Buy groceries" });
```

Useful actions:

```js
await locator.fill("text");       // Replace input contents
await locator.press("Enter");
await locator.click();
await locator.check();
await locator.uncheck();
await page.goto("https://example.com");
```

Useful assertions:

```js
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText("Done");
await expect(locator).toContainText("Done");
await expect(locator).toHaveValue("Sam");
await expect(locator).toBeChecked();
await expect(page).toHaveURL(/\/profile/);
```

Use web-first assertions instead of reading a value once and asserting on it;
they retry until the condition is met or the assertion times out.

## Page objects and scenario World

Keep reusable selectors and UI actions in page objects. Keep scenario steps
readable and focused on behavior:

```js
class ProfilePage {
  constructor(page) {
    this.page = page;
    this.displayName = page.getByTestId("display-name");
    this.nameInput = page.getByLabel("Display name");
  }

  async setDisplayName(name) {
    await this.nameInput.fill(name);
    await this.page.getByRole("button", { name: "Save" }).click();
  }
}
```

The Cucumber World is isolated per scenario. The framework's `Before` hook
creates `this.browser`, `this.context`, `this.page`, and `this.todoPage`.
Use regular `function` expressions in steps and hooks to access these properties
through `this`; arrow functions have a different `this`.

## Hooks and debugging

- `Before` runs before each scenario; use it for scenario setup.
- `After` runs after each scenario, including failed scenarios; use `finally`
  for browser and context cleanup.
- Attach useful failure artifacts in `After`, such as screenshots:

  ```js
  const screenshot = await this.page.screenshot({ fullPage: true });
  await this.attach(screenshot, "image/png");
  ```

- This framework sets a 30-second Cucumber step timeout with
  `setDefaultTimeout(30_000)`.
- Prefer waiting for a real UI condition with a locator or assertion. Avoid
  fixed sleeps such as `page.waitForTimeout(...)`.
- Use `HEADLESS=false` to watch a run and inspect failure screenshots attached
  by the hook.

## Quick checklist

- Use accessible, user-facing locators where possible.
- Give each scenario independent setup and unique test data.
- Assert the resulting UI state, not just that an action did not throw.
- Put shared UI behavior in page objects and scenario state in the World.
- Avoid coupling scenarios through order or shared browser state.
