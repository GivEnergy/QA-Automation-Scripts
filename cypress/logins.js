export function customerLogin(){
    cy.visit("http://localhost/login");
    cy.get('[data-cy="loginform.field.username"]').type(Cypress.env.customerUsername);
    cy.get('[data-cy="loginform.field.password"]').type(Cypress.env.customerPassword);
    cy.get('loginform.button.login"').click();
}

export function adminLogin(){
    cy.visit("http://localhost/login");
    cy.get('[data-cy="loginform.field.username"]').type(Cypress.env('adminUsername'));
    cy.get('[data-cy="loginform.field.password"]').type(Cypress.env('adminPassword'));
    cy.get('[data-cy="loginform.button.login"]').click();
}

