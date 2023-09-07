import { loginCheck } from "../../../funcs";

describe("Admin Sign In", () => {
    it("tests Admin Sign In", () => {

      //directs to local host and sets viewport
      cy.visit("http://localhost/login");
      cy.viewport(1920, 1080);

      //attempts login with incorrect username and password
      loginCheck(Cypress.env('incorrectUsername'), Cypress.env('incorrectPassword'), 'check');

      //attempts login with correct username and incorrect password, then checks error messages
      loginCheck(Cypress.env('adminUsername'), Cypress.env('incorrectPassword'), 'check');
      
      //attempts login with incorrect username and correct password and checks error messages
      loginCheck(Cypress.env('incorrectUsername'), Cypress.env('adminPassword'), 'check');

      //attempts login with admin username and password and checks dashboard loads
      loginCheck(Cypress.env('adminUsername'), Cypress.env('adminPassword'))
      cy.get('[data-cy="admin.heading.title"]').contains('Admin Navigation');
      
    });
  });