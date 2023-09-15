import { adminLogin } from "../../../logins";
import { dashboardSelect, changeDetails, changePassword } from "../../../funcs";

describe("Account settings work", () => {
  it("tests Account settings", () => {

      //sets viewport and logs in
      adminLogin();

      //navigates to account settings page
      dashboardSelect('Account Settings');

      //changes details
      changeDetails(false);

      //changes details back
      cy.reload();
      changeDetails(true);

      //goes to manage security and changes password
      cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
      changePassword(Cypress.env('adminPassword'), Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword') + '456', true, false);
      changePassword(Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword'), false, true);
      changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), false, false);
    });
  });
  