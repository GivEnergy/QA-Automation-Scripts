import { adminLogin } from "../../../logins";

describe("soc calibrations", () => {
    it("tests soc calibrations", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to firmware updates
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('SOC Calibrations').click();
    cy.get('div').contains('SOC Calibrations').click();

    //checks page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear();

    //checks format of table data
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().next().contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tr').find('td').first().next().next().next().contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tr').find('td').first().next().next().next().next().next()
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tr').find('td').first().next().next().next().next().next().next()
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{5,}\s[a-z]{3,}[)]$/);
        
    //searches and filters and checks format again
    cy.get('label').contains('Filter By Status').next().click();
    cy.wait(500);
    cy.get('.v-list-item__title').contains('Start/Discharging').parent().click();
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
        cy.get('tbody').children().eq(i).find('td').eq(1).contains('Start/Discharging');
        cy.get('tbody').children().eq(i).find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(3).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(5)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{5,}\s[a-z]{3,}[)]$/);
    };
    cy.visit('https://givenergy.cloud/admin/soc');
    cy.get('label').contains('Inverter Serial').next().type('CE');
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').first().contains(/^[C][E]\w{5,}[0-9]{3,}/);
        cy.get('tbody').children().eq(i).find('td').eq(1).contains('Start/Discharging');
        cy.get('tbody').children().eq(i).find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(3).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(5)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{4,}\s[a-z]{3,}[)]$/);
    };
    });
});
  