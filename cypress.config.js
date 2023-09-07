const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '19ve46',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    customerUsername: "viewer",
    customerPassword: "1",
    adminUsername: "admin",
    adminPassword: "1",
    incorrectUsername: 'NotARealUsername123',
    incorrectPassword: 'NotARealPassword123!'
  }
});
