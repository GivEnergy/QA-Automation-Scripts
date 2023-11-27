import { checkPageNav, dashboardSelect, handleError } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("firmware updates", () => {
  it("tests firmware updates", () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return handleError(e, runnable);
    });
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to firmware updates
    dashboardSelect('Admin Dashboard', 
    'View active and historic inverter firmware updates',
    'Firmware Update Records');

    //page navigation
    checkPageNav();
    
    //checks table format
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').eq(1).contains(/^[A-Za-z]{7,}\s[A-Z]{3,}/);
    cy.get('tr').find('td').eq(3).contains(/^[0-9]{3,}/);
    cy.get('tr').find('td').eq(9)
      .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);

    //checks search and checks format again
    cy.get('label').contains('Search').next().type('CE');
    cy.get('tr').find('td').first().contains(/^[CE]\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().contains(/^[A-Za-z]{7,}\s[A-Z]{3,}/);
    cy.get('tr').find('td').first().next().next().next().contains(/^[0-9]{3,}/);
    cy.get('tr').find('td').first().next().next().next().next().next().next().next().next().next()
      .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    });
});
  