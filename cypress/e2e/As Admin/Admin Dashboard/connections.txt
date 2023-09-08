import { dashboardSelect, handleError } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("connections", () => {
  it("tests connections", () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return handleError(e, runnable);
    });
      cy.viewport(1920, 1080);
      adminLogin()
      //navigates to connections
      dashboardSelect('Admin Dashboard', 'View active connections to comms', 'Connections');

      //checks table is showing correct data
      cy.get('tr').find('td').first().contains(/^[0-9]{3,}/);
      cy.get('tr').find('td').eq(2).contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);

      //checks page navigation
      cy.get('ul').find('li').last().click();
      cy.get('.spacer').next().contains('16-30');
      cy.get('ul').find('li').first().click();
      cy.get('.spacer').next().contains('1-15');
      cy.get('ul').find('li').first().next().next().next().click();
      cy.get('.spacer').next().contains('31-45');
      cy.get('label').contains('Jump to Page').next().clear().type('1').type("{enter}");;

      //check actions
      //cy.get('tr').find('td').last().find('span').first().next().click(); drops connection
      cy.get('tr').find('td').last().find('span').first().click();
      cy.get('div').contains('Server Logs');
      cy.reload()

      //unticks established connections only
      cy.get('div').find('label').contains('Established Connections Only').click();
      cy.get('tr').find('td').first().next().contains('--');

      //needs a search function but no dongle is constantly on??

      //checks dropdown filter
      cy.get('label').contains('Server IDs').next().next().next().click();
      cy.get('.v-application--wrap').next().find('div').last().click();
      cy.get('td').contains('No data available');
    });
  });
  