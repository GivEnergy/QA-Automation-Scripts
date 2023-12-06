Cypress.Commands.add('failTestIfTooLong', (timeout = 120000) => {

    let timeoutId;

    beforeEach(() => {
        timeoutId = setTimeout(() => {
            throw new Error(`Test failed: exceeded run time limit of ${timeout}ms`);
        }, timeout);
    });

    afterEach(() => {
        clearTimeout(timeoutId); // Clear the timeout at the end of each test
    });
});

import { adminLogin } from "../../../logins";
import {dashboardSelect, checkWarranty} from "../../../funcs";

let tableDataIndex = 1;

describe("warranty status", () => {
  it("tests updating warranty status", () => {
      cy.failTestIfTooLong(70000);
    //sets viewport and logins in as admin
    adminLogin();

    //opens my inverters and reloads page to hide nav bar
    dashboardSelect('My Inverters');
    cy.get('[data-qa="title.text"]').contains('My Inverters');
    cy.get('[data-qa="search"]').click();

    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

        const text1 = $elm.text()

        if (text1 === 'Warranty Type') {

            if (tableDataIndex > 3) {
                throw new Error('Error: no warranty type found');
            } else {
                checkWarranty(index, tableDataIndex);
            }

        }
    })




   });
}); 