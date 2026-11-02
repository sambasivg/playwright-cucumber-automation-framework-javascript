"use strict";

class TodoPage {
  constructor(page, baseUrl) {
    this.page = page;
    this.baseUrl = baseUrl;
    this.newTodoInput = page.getByRole("textbox", {
      name: "What needs to be done?"
    });
  }

  async open() {
    await this.page.goto(this.baseUrl);
  }

  async addTodo(title) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      throw new Error("Todo title must not be empty.");
    }

    await this.newTodoInput.fill(normalizedTitle);
    await this.newTodoInput.press("Enter");
  }

  todoItem(title) {
    return this.page.getByRole("listitem").filter({ hasText: title });
  }

  todoCheckbox(title) {
    return this.todoItem(title).getByRole("checkbox");
  }

  async completeTodo(title) {
    await this.todoCheckbox(title).check();
  }
}

module.exports = { TodoPage };
