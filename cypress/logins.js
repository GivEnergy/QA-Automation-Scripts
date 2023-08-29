export function customerLogin(){
    cy.visit("http://portal-staging-php-82.eba-4mx3xijd.eu-west-2.elasticbeanstalk.com/dashboard");
    cy.get("#input-22").click();
    cy.get("#input-22").type(Cypress.env.customerUsername);
    cy.get("#input-25").click();
    cy.get("#input-25").type(Cypress.env.customerPassword);
    cy.get('button').find('span').contains('Login').click();
}

export function adminLogin(){
    cy.visit("https://staging.givenergy.cloud");
    cy.get("#input-22").click();
    cy.get("#input-22").type(Cypress.env('adminUsername'));
    cy.get("#input-25").click();
    cy.get("#input-25").type(Cypress.env('adminPassword'));
    cy.get('button').find('span').contains('Login').click();
}

