import { adminLogin } from "../../../../logins";
import { dashboardSelect, } from "../../../../funcs";
import {dateAndTime, evcSerialNumber} from "../../../../regex";


//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("evc error and logs", () => {
    it("tests evc errors page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.intercept('**/internal-api/paginate/ocpp-error**').as('errorsRequest');
        cy.get('div[class="v-tab"]').contains('Errors').should('be.visible').click();
        cy.wait('@errorsRequest');

        cy.get('[data-qa="table"]').should("be.visible");
        cy.get('[data-qa="table"]').find('th').each(($th, index) => {
            if ($th.text() === "Timestamp") {
                console.log(index)
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
                    const text = $td.text();
                    const result = dateAndTime.test(text);

                    if(!result) {
                        throw new Error("Error: date and time in does not match format YYYY-MM-DD HH:MM:SS");
                    }
                })
            }
        });
        cy.get('[data-qa="table"]').find('th').each(($th, index) => {
            if ($th.text() === "Cleared At") {
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
                    const text = $td.text();
                    const result = dateAndTime.test(text);

                    if(!result) {
                        throw new Error("Error: date and time in does not match format YYYY-MM-DD HH:MM:SS");
                    }
                })
            }
        });
        cy.get('[data-qa="table"]').find('th').each(($th, index) => {
            if ($th.text() === "Serial Number") {
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
                    const text = $td.text().trim();
                    const result = evcSerialNumber.test(text);
                    console.log(result);
                    console.log(text);
                    if(!result) {
                        throw new Error("Error: serial number does not match EVC serial number format");
                    }
                })
            }
        });


    });

    it("tests evc logs page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.get('div[class="v-tab"]').contains('Logs').should('be.visible').click();
        cy.get('[data-qa="autocomplete.action"]').should('be.visible').click();
        cy.get('div[class*="v-select-list"]').should('be.visible');
        cy.get('[data-qa="autocomplete.type"]').should('be.visible').click();
        cy.get('div[class*="v-select-list"]').should('be.visible');
        cy.get('[data-qa="table.logs"]').should('be.visible');

    });
});