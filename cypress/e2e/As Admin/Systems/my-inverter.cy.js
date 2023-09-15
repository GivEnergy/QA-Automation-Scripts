import { adminLogin } from "../../../logins";
import { dashboardSelect, checkPageNav } from "../../../funcs";
import { serialNumber, YYYYMMDD } from "../../../regex";

describe("account list", () => {
  it("tests Account list", () => {

    //sets viewport and logins in as admin
    adminLogin();

    //opens my inverters and reloads page to hide nav bar
    dashboardSelect('My Inverters');
    cy.get('[data-qa="title.text"]').contains('My Inverters');
    cy.get('[data-qa="search"]').click();
    
    //checks page navigation
    //checkPageNav();
    
    //opens register a dongle page and closes it
    cy.get('[data-qa="button.register"]').contains('Register a New Inverter').click();
    cy.get('[data-qa="title.assign"]').contains('Assign a Dongle');
    cy.get('[data-qa="button.cancel"]').click();

    //opens register a dongle page and enters the details
    // cy.get('[data-qa="button.register"]').contains('Register a New Inverter').click();
    // cy.get('[data-qa="search.user"]').parent('div[class*="v-select__slot"]').type(Cypress.env('incorrectUsername'));
    // cy.get('div[class="v-select-list"]').should('not.exist');
    // cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('!!!!!!!!!!');
    // cy.get('[data-qa="field.sn"]').parent().find('div[class*="v-messages__message"]').contains('This field can only contain alphanumeric characters');
    // cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').clear().type('WO2249G374');
    // cy.get('[data-qa="search.user"]').parent('div[class*="v-select__slot"]').clear().type('Cavan');
    // cy.get('div[class*="v-list-item__title"]').contains('Cavan | cAVAN BEARDMORE').click();
    // cy.get('[data-qa="field.vc"]').parent('div[class*="v-text-field__slot"]').type('53QV3');
    // cy.get('[data-qa="button.submit"]').contains('Submit').click();
    // cy.get('div[class*="v-messages__message"]').contains('The serial number and verification code did not match.');
    // cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('{backspace}').type('5');
    // cy.get('[data-qa="button.submit"]').contains('Submit').click();

    //checks table format and buttons
   //cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(1).contains(serialNumber);
    //cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(2).contains(serialNumber);
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(12).contains(YYYYMMDD);
    // cy.get('[data-qa="item.status"]').eq(0).contains('Valid');
    // cy.get('i[class*="mdi-delete"]').eq(0).click();
    // cy.get('[data-qa="item.status"]').eq(0).contains('Void');
    // cy.get('i[class*="mdi-delete"]').eq(0).click();
    // cy.get('[data-qa="item.status"]').eq(0).contains('Valid');
    // cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(0).click();
    // cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(1).click();
    // cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(2).click();
    // cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(3).click();

    //use filters
    cy.get('[data-qa="auto.model"]').type('HY5.0').type('{downArrow}').type('{enter}').clear();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(3).contains('GIV-HY5.0');
    cy.get('[data-qa="select.status"]').click();
    cy.get('[data-qa="status"]').eq(1).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0)
      .find('i[class*="mdi-monitor"]').should('have.css', 'color', 'rgb(248, 221, 108)');
    cy.get('[data-qa="auto.model"]').click().parent().next().find('button[class=*"mdi-close"]').click();
    cy.get('[data-qa="select.status"]').click().parent().next().find('button[class=*"mdi-close"]').click();

    //checks search and account info hovers work
    //cy.get('[data-qa="search"]').type('Chemical Lane').type('{enter}');
    //cy.get('[data-qa="table"]').find('td').contains('Dan Lambert').click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(5).find('span').contains('cAVAN BEARDMORE').click();
    cy.get('i[class*="mdi-account"]').parent().contains('cAVAN BEARDMORE').should('be.visible');
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(6).find('span').contains('Gordon Ross').click();
    cy.get('i[class*="mdi-account"]').parent().contains('Gordon Ross').should('be.visible');
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(7).find('span').contains('sub_contractor').click();
    cy.get('i[class*="mdi-account"]').parent().contains('sub_contractor').should('be.visible');

   });
}); 