import { dashboardSelect, loginCheck } from "../../../funcs";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
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
        loginCheck('NotARealUsername123', 'NotARealPassword123!', 'check');

        //attempts login with correct username and incorrect password, then checks error messages
        loginCheck(Cypress.env('adminUsername'), 'NotARealPassword123!', 'check');

        //attempts login with incorrect username and correct password and checks error messages
        loginCheck('NotARealUsername123', Cypress.env('adminPassword'), 'check');

        //attempts login with admin username and password and checks dashboard loads
        loginCheck(Cypress.env('adminUsername'), Cypress.env('adminPassword'));

        //clicks on admin dashboard to ensure that the page loads
        //creates alias for dashboard API request
        dashboardSelect('Logout');
      
    });
  });