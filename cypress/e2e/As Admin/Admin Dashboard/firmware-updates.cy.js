import { adminLogin } from "../../../logins";

describe("firmware updates", () => {
    it("tests firmware updates", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to firmware updates
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('View active and historic inverter firmware updates').click();
    cy.get('div').contains('Firmware Update Records').click();

    //page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear();
    
    //checks table format
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().contains(/^[A-Za-z]{7,}\s[A-Z]{3,}/);
    cy.get('tr').find('td').first().next().next().next().contains(/^[0-9]{3,}/);
    cy.get('tr').find('td').first().next().next().next().next().next().next().next().next().next()
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
  