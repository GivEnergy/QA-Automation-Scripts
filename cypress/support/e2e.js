// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on("uncaught:exception", (e, runnable) => {
    if (e.name === 'TypeError') {
        console.log(e.message);
        console.log("runnable", runnable);
        return false;
    } else {
        console.log(e.message);
        console.log("runnable", runnable);
        return true;
    }
});

const { MailSlurp } = require('mailslurp-client');

const apiKey = Cypress.env('mailslurpAPI')
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {

  const timeoutMillis = 30_000;
  return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
});

// Alternatively you can use CommonJS syntax:
// require('./commands')