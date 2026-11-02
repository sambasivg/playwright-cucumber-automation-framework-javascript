"use strict";

module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["support/**/*.js", "pages/**/*.js", "features/step-definitions/**/*.js"],
    format: ["progress"],
    parallel: 1
  }
};
