import { adminLogin } from "../../../logins";

describe("returns", () => {
    it("tests returns", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to returns
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('Returns').click();
    cy.get('div').contains('Returns').click();

    //checks page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear().type('1').type("{enter}");

    //checks format of table data
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').eq(5).contains(/^\d{5,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6).contains(/^[A-Za-z]{8,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(7)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    };
    //cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(0).click();
    cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(1).click();
    //cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(2).click();

    //check search, pop up, format
    cy.get('label').contains('Search').next().type('Adam');
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').eq(0).contains('Adam Reynolds');
        cy.get('tbody').children().eq(i).find('td').eq(5).contains(/^\d{4,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6).contains(/^[A-Za-z]{8,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(7)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    };
    cy.get('td').contains('Adam Reynolds').click();
    cy.get('b').contains('Username:').should('be.visible');
    //cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(0).click();
    cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(1).click();
    //cy.get('tbody').children().eq(0).find('td').last().find('div').find('div').children().eq(2).click();

    //use create new return
    cy.get('span').contains('Create New Return').click();
    cy.get('span').contains('Check Ticket #').parent().should('be.disabled');
    cy.get('label').contains('Ticket #').next().type('53142');
    cy.get('span').contains('Check Ticket #').click();
    cy.get('span').contains('Confirm Ticket #').click();
    cy.get('a').contains('View On Freshdesk').click();
    cy.get('label').contains('Send Email To').next().click();
    cy.get('span').contains('Create Return').parent().should('be.disabled');
    cy.get('.v-list-item__title').contains('Installer').click();
    cy.get('label').contains('Find Customer').next().type('Chemical Lane');
    cy.get('.v-list-item__title').contains('Chemical Lane | chemical_lane').click();
    cy.get('label').contains('Find Engineer or Installation Company').next().type('GivEnergy03');
    cy.get('.v-list-item__title').contains('GivEnergy03 | SUB_CONTRACTOR').click();
    cy.get('span').contains('Create Return').parent().should('be.disabled');
    cy.get('label').contains('Category').next().click();
    cy.get('.v-list-item__title').contains('Dongle').click();
    cy.get('label').contains('Type/Model').next().click();
    cy.get('.v-list-item__title').contains('WiFi').click();
    cy.get('span').contains('Validate').click();
    cy.get('div').contains('The identifier field is required.');
    cy.get('label').contains('ID/Serial Number').next().type('WZ2108G037');
    cy.get('span').contains('Validate').click();
    cy.get('span').contains('Edit Item').click();
    cy.get('label').contains('ID/Serial Number').next().clear().type('WZ2108G037');
    cy.get('span').contains('Validate').click();
    cy.get('span').contains('Create Return').parent().should('be.disabled');
    cy.get('label').contains('Reason for return').next().type('Broken');
    cy.get('span').contains('Create Return').click();
    

    });
});