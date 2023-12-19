export function customerLogin(){
    cy.disableDebugBar();
    //creates alias for login API request
    cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
    cy.visit("https://staging.givenergy.cloud/login");

    //waits for login API request to be successful
    cy.wait('@loginAPI', {timeout: 30000});
    cy.get('[data-qa="field.username"]').should('be.visible').log("Username field is visible");
    cy.get('[data-qa="field.password"]').should('be.visible').log("Password field is visible");
    cy.get('[data-qa="field.username"]').type(Cypress.env('customerUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('customerPassword'));
    cy.get('[data-qa="button.login"]').click();
}

export function adminLogin(){
    cy.disableDebugBar();
    //creates alias for login API request
    cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
    cy.visit("https://staging.givenergy.cloud/login");

    //waits for login API request to be successful
    cy.wait('@loginAPI', {timeout: 30000});
    cy.get('[data-qa="field.username"]').should('be.visible').log("Username field is visible");
    cy.get('[data-qa="field.password"]').should('be.visible').log("Password field is visible");
    cy.get('[data-qa="field.username"]').type(Cypress.env('adminUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('adminPassword'));
    cy.get('[data-qa="button.login"]').click();
}

export function engineerLogin(){
    cy.disableDebugBar();
    //creates alias for login API request
    cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
    cy.visit("https://staging.givenergy.cloud/login");

    //waits for login API request to be successful
    cy.wait('@loginAPI', {timeout: 30000});
    cy.get('[data-qa="field.username"]').should('be.visible').log("Username field is visible");
    cy.get('[data-qa="field.password"]').should('be.visible').log("Password field is visible");
    cy.get('[data-qa="field.username"]').type(Cypress.env('engineerUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('engineerPassword'));
    cy.get('[data-qa="button.login"]').click();
}

