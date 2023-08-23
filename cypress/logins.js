export function customerLogin(){
    cy.visit("http://dev.givenergy.cloud/login");
    cy.get("#input-22").click();
    cy.get("#input-22").type(Cypress.env.customerUsername);
    cy.get("#input-25").click();
    cy.get("#input-25").type(Cypress.env.customerPassword);
    cy.get("#app div:nth-of-type(5) span").click();
}

export function adminLogin(){
    cy.visit("https://givenergy.cloud/login");
    cy.get("#input-22").click();
    cy.get("#input-22").type(Cypress.env('adminUsername'));
    cy.get("#input-25").click();
    cy.get("#input-25").type(Cypress.env('adminPassword'));
    cy.get("#app div:nth-of-type(5) span").click();
    cy.get("div.d-flex div.v-responsive__content").click();
}

