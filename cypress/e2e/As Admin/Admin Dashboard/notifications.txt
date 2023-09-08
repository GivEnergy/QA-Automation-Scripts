import { dashboardSelect, handleError } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("notifications", () => {
  it("tests notifications", () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return handleError(e, runnable);
    });
      cy.viewport(1920, 1080);
      adminLogin()

      //navigates to notifications
      dashboardSelect('Admin Dashboard',
      'Send an letterheaded email to one or more customers via the portal',
      'Pending Notifications');

      //send notification
      cy.get('span').contains('Create Notification').click();
      cy.get('div').contains('Generate Notification');
      cy.get('label').contains('Send To').next().click();
      cy.get('div').contains('Specific Account').click();
      cy.get('label').contains('Search for Account').next().type('Cavan Beardmore');
      cy.get('.v-application--wrap').next().next().next().find('div').find('div').first().click();
      cy.get('label').contains('Subject').next().type('Test Subject');
      cy.get('label').contains('Greeting (Optional)').next().type('Test Greeting');
      cy.get('span').contains('Add Action').click();
      cy.get('label').contains('Action Text').next().type('Test');
      cy.get('label').contains('Action URL').next().type('https://givenergy.cloud/dashboard');
      cy.get('label').contains('Paragraph 1').next().type('Test Paragraph');
      cy.get('span').contains('Submit').click();
      cy.get('span').contains('Cancel').click();
      cy.get('span').contains('Submit').click();
      cy.get('span').contains('Send Notification').click();
    });
  });
  