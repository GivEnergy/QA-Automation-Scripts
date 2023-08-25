import { adminLogin } from "../../../logins";

describe("debug inverters", () => {
    it("tests debug inverters", () => {
      cy.viewport(1920, 1080);
      adminLogin()

      //navigates to the debug inverter page
      cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
      cy.get('div').contains('Debug Inverters').click();

      //checks first entry in table and ensure format is correct and button works
      cy.get('div').contains('Debug Inverters');
      cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
      cy.get('tr').find('td').eq(1).contains(/^[0-9]{1,2}\s[a-zA-Z]{7,}/);
      cy.get('tr').find('td').eq(2).contains(/^[a-zA-Z]{1,}\s[a-zA-Z]{1,}/);
      cy.get('tr').find('td').eq(4)
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{5,}\s[a-z]{3,}[)]/);
      cy.get('tr').find('td').eq(5)
        .contains(/^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{7,}\s[a-z]{4,}\s[a-z]{3,}[)]|^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{7,}\s[a-z]{3,}[)]/);
      cy.get('tr').find('td').eq(6)
        .contains(/^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
      cy.get('tr').find('td').last().click();

      //checks add another
      cy.get('div').contains('Add Another').click();
      cy.get('div').contains('Add Another Debug Inverter');
      cy.get('label').contains('Search for an Inverter...').next().type('ED2253G566');
      cy.wait(1500);
      cy.get("span").contains('ED2253G566').click();
      cy.get("span").contains('Cancel').click();
      cy.get('div').contains('Add Another').click();
      cy.get("span").contains('Confirm').click();

      //checks search and checks format again
      cy.get('label').contains('Search').next().type('ED2253G566');
      cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
      cy.get('tr').find('td').first().next().contains(/^[0-9]{1,2}\s[a-zA-Z]{7,}/);
      cy.get('tr').find('td').first().next().next().contains(/^[a-zA-Z]{1,}\s[a-zA-Z]{1,}/);
      cy.get('tr').find('td').first().next().next().next().next()
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{5,}\s[a-z]{3,}[)]/);
      cy.get('tr').find('td').first().next().next().next().next().next()
        .contains(/^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{7,}\s[a-z]{4,}\s[a-z]{3,}[)]|^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{7,}\s[a-z]{3,}[)]/);
      cy.get('tr').find('td').first().next().next().next().next().next().next()
        .contains(/^\w{5,}|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
      cy.get('tr').find('td').last().click();
    });
  });