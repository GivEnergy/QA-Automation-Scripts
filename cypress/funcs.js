export function customerLogin(){
    cy.visit("http://dev.givenergy.cloud/login");
    cy.get("#input-22").click();
    cy.get("#input-22").type(process.env.CYPRESS_CUSTOMER-USERNAME);
    cy.get("#input-25").click();
    cy.get("#input-25").type(process.env.CYPRESS_CUSTOMER-PASSWORD);
    cy.get("#app div:nth-of-type(5) span").click();
}

export function adminLogin(){
    cy.visit("http://dev.givenergy.cloud/login");
    cy.get("#input-22").click();
    cy.get("#input-22").type(process.env.CYPRESS_ADMIN-USERNAME);
    cy.get("#input-25").click();
    cy.get("#input-25").type(process.env.CYPRESS_ADMIN-PASSWORD);
    cy.get("#app div:nth-of-type(5) span").click();
}

