import { adminLogin } from "../../../logins";
import {dashboardSelect, checkWarranty} from "../../../funcs";

let tableDataIndex = 1;

describe("warranty status", () => {
  it("tests updating warranty status", () => {

    //sets viewport and logins in as admin
    adminLogin();
    //creates alias for dashboard API request
    cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
    //creates alias for my inverter page API request
    cy.intercept('**/staging.givenergy.cloud/inverter').as('inverterAPI');

    dashboardSelect('My Inverters');
    //waits for my inverter page to load
    cy.wait('@inverterAPI', {timeout: 30000});
    cy.get('[data-qa="title.text"]').contains('My Inverters');
    cy.get('[data-qa="search"]').click();

    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index): void  => {

        const text1: string = $elm.text()

        if (text1 === 'Warranty Type') {
            //please check function descriptions
            if (tableDataIndex > 3) {
                throw new Error('Error: no warranty type found');
            } else {
                checkWarranty(index, tableDataIndex);
            }

        }
    })




   });
}); 