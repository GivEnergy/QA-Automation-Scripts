const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '19ve46',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
