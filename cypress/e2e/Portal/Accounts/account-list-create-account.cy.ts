import { adminLogin } from "../../../logins";
import { createAccount, dashboardSelect, checkPageNav } from "../../../funcs";

describe("account list create account", () => {
  it("tests creating an account on the account list page", () => {

    adminLogin();
    //creates alias for dashboard API request
    cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
    cy.intercept('**/staging.givenergy.cloud/user').as('userAPI');
    dashboardSelect('Account List');
    cy.wait('@userAPI', {timeout: 30000});
    cy.get('[data-qa="input.filter"]').click();

    checkPageNav();

    //clicks create account and cancels it
    cy.get('[data-qa="button.creation"]').as('create');
    cy.get('@create').contains('Create');
    cy.get('@create').click();
    cy.get('[data-qa="title.text"]').as('title');
    cy.get('@title').contains('Create New Account');
    cy.get('@title').click();
    cy.get('[data-qa="button.cancel"]').as('cancel');
    cy.get('@cancel').contains('Cancel');
    cy.get('@cancel').click();

    //fills in details and cancels
    createAccount('TestDistributor', false);
    cy.get('@cancel').contains('Cancel');
    cy.get('@cancel').click();

    //fills in details again and clicks create
    createAccount('TestDistributor', true);
    cy.get('[data-qa="button.create"]').as('createAccount');
    cy.get('@createAccount').contains('Create');
    cy.get('@createAccount').click();

  });
});