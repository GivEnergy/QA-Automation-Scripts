const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '19ve46',
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
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
    incorrectPassword: 'NotARealPassword123!',
    mailslurpAPI: "d085e69605e77b1e49315808233e544e9e67942d5877501f903899e53c0c3ad8"
  }
});
