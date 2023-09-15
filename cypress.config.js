const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cnw58p',
  defaultCommandTimeout: 5000,
  requestTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1080,
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
    mailslurpAPI: "d085e69605e77b1e49315808233e544e9e67942d5877501f903899e53c0c3ad8",
    adminEmail: "ross.coates@givenergy.co.uk"
  }
});
