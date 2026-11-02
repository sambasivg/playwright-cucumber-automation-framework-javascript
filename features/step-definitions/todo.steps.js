"use strict";

const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I open the TodoMVC application", async function () {
  await this.todoPage.open();
});

When("I add a todo named {string}", async function (title) {
  await this.todoPage.addTodo(title);
});

Then("I should see the todo named {string}", async function (title) {
  await expect(this.todoPage.todoItem(title)).toBeVisible();
});

When("I complete the todo named {string}", async function (title) {
  await this.todoPage.completeTodo(title);
});

Then("the todo named {string} should be completed", async function (title) {
  await expect(this.todoPage.todoCheckbox(title)).toBeChecked();
});
