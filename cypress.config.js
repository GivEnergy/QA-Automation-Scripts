const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: 'cnw58p',
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        retries: {
            runMode: 2,
            openMode: 0
        },
        testIsolation: true,
    },
    env: {}
});
//