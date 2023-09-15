export function customerLogin(){
    cy.visit("http://localhost/login");
    cy.get('[data-qa="field.username"]').type(Cypress.env('customerUsername'));
    cy.get('[data-qa="field.password"]').type(Cypress.env('customerPassword'));
    cy.get('[data-qa="button.login"]').click();
}

export function adminLogin(){
    cy.visit("http://localhost/login");
    cy.get('[data-qa="field.username"]').type('admin');
    cy.get('[data-qa="field.password"]').type('1');
    cy.get('[data-qa="button.login"]').click();
}

