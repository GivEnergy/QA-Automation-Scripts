import { adminLogin } from "../../../logins";
import {
  dashboardSelect,
  checkPageNav,
  tableCheck,
  tableContains,
  tableCSS,
} from "../../../funcs";
import { serialNumber, YYYYMMDD } from "../../../regex";

const time = 60000;
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
    cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{enter}');
    tableContains('Model', 'GIV-HY5.0', 'Error when filtering by inverter model')
    cy.get('[data-qa="select.status"]').click();
    cy.get('[data-qa="status"]').eq(1).click();
    tableCSS('Status', 'rgb(248, 221, 108)', 'Error when filtering by status');

    //checks table format and buttons
    tableCheck('Inverter SN', serialNumber, 'Not a valid inverter serial number');
    tableCheck('Dongle SN', serialNumber, 'Not a valid dongle serial number');
    tableCheck('Commission Date', YYYYMMDD, 'Not a valid date, should follow YYYYMMDD format');

    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

      const text = $th.text()

      if (text === 'Warranty Status') {

        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Valid');
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('button').click();
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Void');
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('button').click();
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).contains('Valid');

      }

    })
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(0).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(1).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(2).click();
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(3).click();

    // add back when search works 

    //checks search and account info hovers work
    // cy.get('[data-qa="search"]').type('Chemical Lane').type('{enter}');
    // tableClick('End User', 'Chemical Lane');
    // tableClick('Engineer', 'Dan Lambert');
    // tableClick('Company', 'GivEnergy03');

   });
}); 