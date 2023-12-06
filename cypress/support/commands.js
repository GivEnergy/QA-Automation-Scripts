// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('disableDebugBar', () => {

    cy.intercept('**https://staging.givenergy.cloud/**', (req) => {
      req.headers['X-DEBUGBAR-DISABLED'] = '1';
    }).as('disableDebugBar');

  });

Cypress.Commands.add('failTestIfTooLong', (timeout = 120000) => {

    beforeEach(() => {
        setTimeout(() => {
            throw new Error(`Test failed: exceeded run time limit of ${timeout}`)
        }, timeout );
    })

});