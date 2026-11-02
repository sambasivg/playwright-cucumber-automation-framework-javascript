"use strict";

const { World, setWorldConstructor } = require("@cucumber/cucumber");

class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.todoPage = undefined;
  }
}

setWorldConstructor(PlaywrightWorld);
