import { checkPageNav, checkReturnsActions, checkReturnsFormat, dashboardSelect, tableContains, tableClick, tableRegex } from "../../../funcs";
import { adminLogin } from "../../../logins";
import { dateAndTime } from "../../../regex";

const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("returns", () => {
    it("tests returns page", () => {
        cy.assignToGroup('group1');
    adminLogin();

    //navigates to returns
    dashboardSelect('Admin Dashboard', 'Returns');
    cy.get('[data-qa="title.header"]').contains('Returns');

    //checks page navigation
    checkPageNav();

    //checks format of table data
    checkReturnsFormat();
    
    checkReturnsActions();

    //check search, pop up, format
    // cy.get('[data-qa="field.search"]').type('Adam');
    // tableContains('Created By', 'Adam Reynolds', 'Error when searching for criteria')
    // checkReturnsFormat();

    // tableClick('Created By', 'Adam Reynolds');
    // checkReturnsActions();

    //use create new return
    cy.get('[data-qa="button.start"]').contains('Create New Return');
    cy.get('[data-qa="button.start"]').click();
    cy.get('[data-qa="button.check"]').should('be.disabled');
    cy.get('[data-qa="field.ticketInput"]').type('53431');
    cy.get('[data-qa="button.check"]').contains('Check Ticket #');
    cy.get('[data-qa="button.check"]').click();
    cy.get('[data-qa="button.confirm"]').contains('Confirm Ticket #');
    cy.get('[data-qa="button.confirm"]').click();
    cy.get('[data-qa="link.view"]').contains('View On Freshdesk');
    cy.get('[data-qa="link.view"]').click();
    cy.get('[data-qa="button.create"]').contains('Create Return');
    cy.get('[data-qa="button.create"]').should('not.be.enabled');
    cy.get('[data-qa="select.recipients"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Installer').click();
    cy.get('div[class*="v-list-item__title"]').contains('Customer').click();
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="search.customer"]').parent().find('label').next('input').click();
    cy.get('[data-qa="search.customer"]').eq(0).type('brymbo');
    cy.get('div[class*="v-list-item__title"]').contains('Brymbo Road | BrymboRoad').click();
    cy.get('[data-qa="search.installer"]').parent().find('label').next('input').click();
    cy.get('[data-qa="search.installer"]').eq(0).type('Dan');
    cy.get('div[class*="v-select-list"]').children().contains('Dan Lambert | ENGINEER').click();
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="form.create"]').should('be.visible');
    cy.get('[data-qa="checkbox.distributor"]').parent().click();
    cy.get('[data-qa="form.create"]').should('not.be.visible');
    cy.get('[data-qa="search.distributor"]').parent().find('label').next('input').click();
    cy.get('[data-qa="search.distributor"]').eq(0).type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy02 | OWNER').click();
    cy.get('[data-qa="form.create"]').should('be.visible');

    //creates first return item
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Dongle').click();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('WiFi').click();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').clear();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('WO2249G375');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').click();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').clear();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('WO2249G374');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').type('Dongle is broken.');
    cy.get('[data-qa="button.add"]').click();
    cy.get('[data-qa="button.delete"]').eq(1).click();
    cy.get('[data-qa="button.add"]').click();

    //creates a second return item
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').eq(1).click();
    cy.get('[data-qa="autocomplete.category"]').eq(1).type('{downArrow}');
    cy.get('[data-qa="autocomplete.category"]').eq(1).type('{downArrow}');
    cy.get('[data-qa="autocomplete.category"]').eq(1).type('{enter}');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').eq(1).click();
    cy.get('[data-qa="autocomplete.typeModel"]').eq(1).type('{downArrow}');
    cy.get('[data-qa="autocomplete.typeModel"]').eq(1).type('{downArrow}');
    cy.get('[data-qa="autocomplete.typeModel"]').eq(1).type('{enter}');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').eq(1).as('serialNumber2');
    cy.get('@serialNumber2').type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('@serialNumber2').clear();
    cy.get('@serialNumber2').type('WO2249G376');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').eq(1).click();
    cy.get('@serialNumber2').clear();
    cy.get('@serialNumber2').type('WO2249G377');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').eq(1).type('Dongle is broken.');
    cy.get('[data-qa="button.create"]').contains('Create Return').click();

    //verifies the return is created and is showing correct info in the table
    cy.get('i[class*="mdi-check-circle"]').parent().contains('Return created successfully!');
    tableContains('Created By', 'You', 'Error when checking returns data');
    tableClick('Customer', 'Brymbo Road');
    tableContains('Items', 'Dongle - WiFi - WO2249G374 Dongle - WiFi - WO2249G377 ', 'Error return items in created return are not listed');
    tableContains('Ticket #', '53431', 'Error returns ticket # is not correctly stated')
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

        const text = $th.text()

        if (text === 'Ticket #') {

            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).click()

        }
    });
    cy.get('[data-qa="card.item"]').find('div').find('span').contains('Ticket #53431');
    tableRegex('Created At', dateAndTime, 'Error created at does not match yyyy-mm--dd hh:mm:ss format')
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('i[class*="mdi-delete"]').click();
    cy.get('[data-qa="button.cancel"]').click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('i[class*="mdi-delete"]').click();
    cy.get('[data-qa="button.yes"]').click()
    });
});