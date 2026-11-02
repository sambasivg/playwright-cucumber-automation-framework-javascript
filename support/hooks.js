"use strict";

const { After, Before, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");
const { TodoPage } = require("../pages/todo-page");

setDefaultTimeout(30_000);

const defaultBaseUrl = "https://demo.playwright.dev/todomvc";

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== "false"
  });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.todoPage = new TodoPage(
    this.page,
    process.env.PLAYWRIGHT_BASE_URL || defaultBaseUrl
  );
});

After(async function ({ result }) {
  try {
    if (result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");
    }
  } finally {
    try {
      if (this.context) {
        await this.context.close();
      }
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
});
