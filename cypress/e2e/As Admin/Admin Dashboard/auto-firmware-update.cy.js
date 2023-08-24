import { adminLogin } from "../../../logins";

describe("Auto firmware updates", () => {
    it("tests Auto firmware updates", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to auto update
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('Automatic Firmware Updates').click();
    cy.get('div').contains('Automatic Firmware Update Records');
      
    //page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear();

    //check format of table
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().next().contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tr').find('td').first().next().next().next().next().next().next().next()
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/)
    //cy.get('tr').find('td').last().click(); not sure if this can be checked?
    
    //checks search
    cy.get('label').contains('Search').next().type('CE');
    cy.get('tr').find('td').first().contains(/^[CE]\w{5,}[0-9]{3,}/);
    cy.visit('https://givenergy.cloud/admin/firmware/auto');

    cy.get('label').contains('Filter by User').next().type('DanLambert');
    cy.wait(500);
    cy.get('span').contains('DanLambert').click();
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().contains('Dan Lambert');
    });
  });
  