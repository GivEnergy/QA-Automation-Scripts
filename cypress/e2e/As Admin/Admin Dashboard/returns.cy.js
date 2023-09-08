import { checkPageNav, checkReturnsActions, checkReturnsFormat, dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("returns", () => {
    it("tests returns", () => {
    cy.viewport(1920, 1080);
    adminLogin()

    //navigates to returns
    dashboardSelect('Admin Dashboard', 'Returns', 'Returns');

    //checks page navigation
    checkPageNav();

    //checks format of table data
    checkReturnsFormat();
    
    checkReturnsActions();

    //check search, pop up, format
    cy.get('label').contains('Search').next().type('Adam');
    cy.get('tbody').find('td').eq(0).contains('Adam Reynolds');
    checkReturnsFormat();

    cy.get('td').contains('Adam Reynolds').click();
    cy.get('b').contains('Username:').should('be.visible');
    checkReturnsActions();

    //use create new return
    cy.get('[data-cy="returns.button.create"]').contains('Create New Return').click();
    cy.get('[data-cy="freshdeskform.button.checkticket"]').should('be.disabled');
    cy.get('[data-cy="freshdeskform.field.ticketinput"]').type('53142');
    cy.get('[data-cy="freshdeskform.button.checkticket"]').contains('Check Ticket #').click();
    cy.get('[data-cy="freshdeskform.button.confirmticket"]').contains('Confirm Ticket #').click();
    cy.get('[data-cy="freshdeskform.link.viewticket"]').contains('View On Freshdesk').click();
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-cy="returns.select.recipients"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Installer').click();
    cy.get('div[class*="v-select-list"]').children().contains('Customer').click();
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-cy="returns.search.customer"]').parent().find('label').next('input').click();
    cy.get('div[class*="v-select-list"]').children().contains('Brymbo Road | BrymboRoad').click();
    cy.get('[data-cy="return.search.installer"]').parent().find('label').next('input').click().type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy engineer3 | ENGINEER').click();
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-cy="returns.form.create"]').should('be.visible');
    cy.get('[data-cy="returns.checkbox.distributor"]').parent().click();
    cy.get('[data-cy="returns.form.create"]').should('not.be.visible');
    cy.get('[data-cy="returns.search.distributor"]').parent().find('label').next('input').click().type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy02 | OWNER').click();
    cy.get('[data-cy="returns.form.create"]').should('be.visible');

    //creates first return item
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.typemodel"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.category"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Dongle').click();
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.typemodel"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('WiFi').click();
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').type('67GHET78D!');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').clear().type('WO2249G375');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.button.edit"]').click();
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').clear().type('WO2249G374');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.textarea.reason"]').type('Dongle is broken.');
    cy.get('[data-cy="returnitems.button.add"]').click();
    cy.get('[data-cy="returnitems.button.delete"]').eq(1).click();
    cy.get('[data-cy="returnitems.button.add"]').click();

    //creates a second return item
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.typemodel"]').eq(1).should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.category"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('[data-cy="createreturn.dropdownfield.typemodel"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').eq(1).type('67GHET78D!');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').eq(1).clear().type('WO2249G376');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.button.edit"]').eq(1).click();
    cy.get('[data-cy="createreturn.dropdownfield.idserialnumber"]').eq(1).clear().type('WO2249G377');
    cy.get('[data-cy="createreturn.button.validate"]').click();
    cy.get('[data-cy="createreturn.textarea.reason"]').eq(1).type('Dongle is broken.');
    cy.get('[data-cy="returns.button.createreturn"]').contains('Create Return').click();

    });
});