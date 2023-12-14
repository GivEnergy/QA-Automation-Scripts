import { adminLogin } from "../../../logins";
import {
  dashboardSelect,
  checkPageNav,
  tableRegex,
  tableContains
} from "../../../funcs";
import { serialNumber, YYYYMMDD } from "../../../regex";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});
describe("my inverter page", () => {
  it("tests my inverter page", () => {

    adminLogin();

    //opens my inverters and reloads page to hide nav bar
    dashboardSelect('My Inverters');
    cy.get('[data-qa="title.text"]').contains('My Inverters');
    cy.get('[data-qa="search"]').click();
    
    //checks page navigation
    checkPageNav();

    //check filters
    cy.get('[data-qa="auto.model"]').as('model');
    cy.get('@model').type('{downArrow}');
    cy.get('@model').type('{enter}');
    tableContains('Model', 'GIV-HY5.0', 'Error when filtering by inverter model')
    cy.get('[data-qa="title.text"]').contains('My Inverters').click();

    //checks table format and buttons
    tableRegex('Inverter SN', serialNumber, 'Not a valid inverter serial number');
    tableRegex('Dongle SN', serialNumber, 'Not a valid dongle serial number');
    tableRegex('Commission Date', YYYYMMDD, 'Not a valid date, should follow YYYYMMDD format');

    //checks warranty status updates when warranty void/validate button is clicked
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

      const text = $th.text()

      if (text === 'Warranty Status') {

        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Valid');
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('button').click({force: true});
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Void');
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('button').click({force: true});
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Valid');

      }

    })
    //checks other action buttons work
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(0).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(1).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(2).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(3).click();


   });
}); 