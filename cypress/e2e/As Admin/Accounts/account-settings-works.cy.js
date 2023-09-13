import { adminLogin } from "../../../logins";
import { dashboardSelect, changeDetails, changePassword } from "../../../funcs";

describe("Account settings work", () => {
  it("tests Account settings", () => {

      //sets viewport and logs in
      cy.viewport(1920, 1080);
      adminLogin()

      //navigates to account settings page
      dashboardSelect('Account Settings');

      //changes details
      changeDetails(false);

      //changes details back
      cy.reload();
      changeDetails(true);

      //goes to manage security and changes password
      cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
      changePassword(Cypress.env('adminPassword'), 'password123!', 'password123456!', true, false);
      changePassword('notarealpassword?','password123!', 'password123!', false, true);
      changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), false, false);
    });
  });
  