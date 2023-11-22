export function customerLogin(){
    cy.disableDebugBar();
    cy.visit("https://staging.givenergy.cloud/login");
    cy.get('[data-qa="field.username"]').type(Cypress.env('customerUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('customerPassword'));
    cy.get('[data-qa="button.login"]').click();
}

export function adminLogin(){
    cy.disableDebugBar();
    cy.visit("https://staging.givenergy.cloud/login");
    cy.get('[data-qa="field.username"]').type(Cypress.env('adminUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('adminPassword'));
    cy.get('[data-qa="button.login"]').click();
}

export function engineerLogin(){
    cy.disableDebugBar();
    cy.visit("https://staging.givenergy.cloud/login");
    cy.get('[data-qa="field.username"]').type(Cypress.env('engineerUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('engineerPassword'));
    cy.get('[data-qa="button.login"]').click();
}

