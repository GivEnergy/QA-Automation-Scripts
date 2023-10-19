import { dashboardSelect, loginCheck } from "../../../funcs";

describe("Admin Sign In", () => {
    it("tests Admin Sign In", () => {

      //directs to local host and sets viewport
      cy.visit("https://staging.givenergy.cloud/login");

      //attempts login with incorrect username and password
      loginCheck(Cypress.env('incorrectUsername'), Cypress.env('incorrectPassword'), 'check');

      //attempts login with correct username and incorrect password, then checks error messages
      loginCheck(Cypress.env('adminUsername'), Cypress.env('incorrectPassword'), 'check');

      //attempts login with incorrect username and correct password and checks error messages
      loginCheck(Cypress.env('incorrectUsername'), Cypress.env('adminPassword'), 'check');

      //attempts login with admin username and password and checks dashboard loads
      loginCheck(Cypress.env('adminUsername'), Cypress.env('adminPassword'));

      //clicks on admin dashboard to ensure that the page loads
      dashboardSelect('Admin Dashboard');
      
    });
  });