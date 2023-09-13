import { checkPageNav, checkReturnsActions, checkReturnsFormat, dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("returns", () => {
    it("tests returns", () => {
    cy.viewport(1920, 1080);
    adminLogin()

    //navigates to returns
    dashboardSelect('Admin Dashboard', 'Returns');
    cy.get('[data-qa="title.header"]').contains('Returns');

    //checks page navigation
    //checkPageNav();

    //checks format of table data
    //checkReturnsFormat();
    
    //checkReturnsActions();

    // //check search, pop up, format
    // cy.get('label').contains('Search').next().type('Adam');
    // cy.get('tbody').find('td').eq(0).contains('Adam Reynolds');
    // checkReturnsFormat();

    // cy.get('td').contains('Adam Reynolds').click();
    // cy.get('b').contains('Username:').should('be.visible');
    // checkReturnsActions();

    //use create new return
    cy.get('[data-qa="button.start"]').contains('Create New Return').click();
    cy.get('[data-qa="button.check"]').should('be.disabled');
    cy.get('[data-qa="field.ticketinput"]').type('53142');
    cy.get('[data-qa="button.check"]').contains('Check Ticket #').click();
    cy.get('[data-qa="button.confirm"]').contains('Confirm Ticket #').click();
    cy.get('[data-qa="link.view"]').contains('View On Freshdesk').click();
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="select.recipients"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Installer').click();
    cy.get('div[class*="v-select-list"]').children().contains('Customer').click();
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="search.customer"]').parent().find('label').next('input').click().type('brymboroad');
    cy.get('div[class*="v-select-list"]').children().contains('Brymbo Road | BrymboRoad').click();
    cy.get('[data-qa="search.installer"]').parent().find('label').next('input').click().type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy engineer3 | ENGINEER').click();
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="form.create"]').should('be.visible');
    cy.get('[data-qa="checkbox.distributor"]').parent().click();
    cy.get('[data-qa="form.create"]').should('not.be.visible');
    cy.get('[data-qa="search.distributor"]').parent().find('label').next('input').click().type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy02 | OWNER').click();
    cy.get('[data-qa="form.create"]').should('be.visible');

    //creates first return item
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typemodel"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idserialnumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Dongle').click();
    cy.get('[data-qa="autocomplete.idserialnumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typemodel"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('WiFi').click();
    cy.get('[data-qa="autocomplete.idserialnumber"]').type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-qa="autocomplete.idserialnumber"]').clear().type('WO2249G375');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').click();
    cy.get('[data-qa="autocomplete.idserialnumber"]').clear().type('WO2249G374');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').type('Dongle is broken.');
    cy.get('[data-qa="button.add"]').click();
    cy.get('[data-qa="button.delete"]').eq(1).click();
    cy.get('[data-qa="button.add"]').click();

    //creates a second return item
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa=."autocomplete.typemodel"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typemodel"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).clear().type('WO2249G376');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').eq(1).click();
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).clear().type('WO2249G377');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').eq(1).type('Dongle is broken.');
    cy.get('[data-qa="returnsbutton.createreturn"]').contains('Create Return').click();

    });
});