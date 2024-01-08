import {
    checkPageNav,
    checkReturnsActions,
    checkReturnsFormat,
    dashboardSelect,
    tableContains,
    tableClick,
    tableRegex,
    isVisible
} from "../../../funcs";
import { adminLogin } from "../../../logins";
import { dateAndTime } from "../../../regex";

describe("returns", () => {
    it("tests returns page", () => {

    adminLogin();
    //creates alias for dashboard API request
    cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
    //creates alias for returns API request
    cy.intercept('**/admin/returns').as('returnsAPI');
    dashboardSelect('Admin Dashboard', 'Returns');
    //waits for return API request to be successful
    cy.wait('@returnsAPI', {timeout: 30000});
    cy.get('[data-qa="title.header"]').contains('Returns');

    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index): void  => {

        const text1: string = $th.text();

        if (text1 === "Created By") {
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($el) => {
                if ($el.text() === "You") {
                    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('i[class*="mdi-delete"]').click();
                    cy.get('[data-qa="button.yes"]').click()
                }
            })
        }
    });

    checkPageNav();
    checkReturnsFormat();
    checkReturnsActions();

    //creates a new return
    cy.get('[data-qa="button.start"]').contains('Create New Return');
    cy.get('[data-qa="button.start"]').click();
    cy.get('[data-qa="button.check"]').should('be.disabled');
    cy.get('[data-qa="field.ticketInput"]').type('53431');
    cy.get('[data-qa="button.check"]').contains('Check Ticket #');
    cy.get('[data-qa="button.check"]').click();
    cy.get('[data-qa="button.confirm"]').contains('Confirm Ticket #');
    cy.get('[data-qa="button.confirm"]').click();
    cy.get('[data-qa="link.view"]').contains('View On Freshdesk');
    cy.get('[data-qa="link.view"]').then(($el): void  => {
        const url: string = $el.attr('href');

        if (!url.includes('givenergy.freshdesk.com')){
            throw new Error("Error: ticket does not include freshdesk URL");
        }
    })
    cy.get('[data-qa="button.create"]').contains('Create Return');
    cy.get('[data-qa="button.create"]').should('not.be.enabled');
    cy.get('[data-qa="select.recipients"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Installer').then($el => $el.trigger("click"));
    cy.get('div[class*="v-list-item__title"]').contains('Customer').then($el => $el.trigger("click"));
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="search.customer"]').parent().find('label').next('input').click({force: true});
    cy.get('[data-qa="search.customer"]').eq(1).type('brymbo', {force: true});
    cy.get('div[class*="v-list-item__title"]').contains('Brymbo Road | BrymboRoad').click({force: true});
    cy.get('[data-qa="search.installer"]').parent().find('label').next('input').then($el => $el.trigger("click"));
    cy.get('[data-qa="search.installer"]').eq(1).type('Dan');
    cy.get('div[class*="v-select-list"]').children().contains('Dan Lambert | ENGINEER').then($el => $el.trigger("click"));
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="checkbox.distributor"]').parent().then($el => $el.trigger("click"));
    cy.get('[data-qa="search.distributor"]').parent().find('label').next('input').then($el => $el.trigger("click"));
    cy.get('[data-qa="search.distributor"]').eq(1).type('GivEnergy');
    cy.get('div[class*="v-select-list"]').children().contains('Givenergy02 | OWNER').then($el => $el.trigger("click"));

    //creates first return item
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('Dongle').then($el => $el.trigger("click"));
    cy.get('[data-qa="autocomplete.idSerialNumber"]').should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typeModel"]').click();
    cy.get('div[class*="v-select-list"]').children().contains('WiFi').then($el => $el.trigger("click"));
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is invalid');
    cy.get('[data-qa="autocomplete.idSerialNumber"]').clear();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('WO2249G375');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').click();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').clear();
    cy.get('[data-qa="autocomplete.idSerialNumber"]').type('WO2249G374');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').type('Dongle is broken.', {force: true});
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
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is invalid');
    cy.get('@serialNumber2').clear();
    cy.get('@serialNumber2').type('WO2249G376');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').eq(1).click();
    cy.get('@serialNumber2').clear();
    cy.get('@serialNumber2').type('WO2249G377');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').eq(1).type('Dongle is broken.', {force: true});
    cy.get('[data-qa="button.create"]').contains('Create Return').click();

    //verifies the return is created and is showing correct info in the table
    //then deletes created return
    cy.get('i[class*="mdi-check-circle"]').parent().contains('Return created successfully!');
    tableContains('Created By', 'You', 'Error when checking returns data');
    //tableClick('Customer', 'Brymbo Road');
    tableContains('Items', 'Dongle - WiFi - WO2249G374 Dongle - WiFi - WO2249G377', 'Error return items in created return are not listed');
    tableContains('Ticket #', '53431', 'Error returns ticket # is not correctly stated')
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index): void  => {

        const text: string = $th.text()

        if (text === 'Ticket #') {

            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).click()

        }
    });
    cy.get('[data-qa="card.item"]').find('div').find('span').contains('Ticket #53431');
    tableRegex('Created At', dateAndTime, 'Error created at does not match yyyy-mm--dd hh:mm:ss format')
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('i[class*="mdi-delete"]').click({force: true});
    cy.get('[data-qa="button.cancel"]').then($el => $el.trigger("click"));
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('i[class*="mdi-delete"]').click({force: true});
    cy.get('[data-qa="button.yes"]').then($el => $el.trigger("click"));
    });
});