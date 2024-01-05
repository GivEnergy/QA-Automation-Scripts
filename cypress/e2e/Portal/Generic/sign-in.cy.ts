import { dashboardSelect, loginCheck } from "../../../funcs";

describe("Admin Sign In", () => {
    it("tests Admin Sign In", () => {

        //creates alias for login API request
        cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.visit("https://staging.givenergy.cloud/login");

        //waits for login API request to be successful
        cy.wait('@loginAPI', {timeout: 30000});

        cy.get('[data-qa="field.username"]').should('be.visible');
        cy.get('[data-qa="field.password"]').should('be.visible');

        //attempts login with incorrect username and password
        cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
        loginCheck('NotARealUsername123', 'NotARealPassword123!', true);

        cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
        //attempts login with correct username and incorrect password, then checks error messages
        loginCheck(Cypress.env('adminUsername'), 'NotARealPassword123!', true);

        cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
        //attempts login with incorrect username and correct password and checks error messages
        loginCheck('NotARealUsername123', Cypress.env('adminPassword'), true);

        //attempts login with admin username and password and checks dashboard loads
        loginCheck(Cypress.env('adminUsername'), Cypress.env('adminPassword'), false);

        //clicks logout on navbar to ensure that the page loads
        dashboardSelect('Logout');
      
    });
  });