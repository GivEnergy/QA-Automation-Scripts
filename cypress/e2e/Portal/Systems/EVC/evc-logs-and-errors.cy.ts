import { adminLogin } from "../../../../logins";
import { dashboardSelect, } from "../../../../funcs";
import {dateAndTime, evcSerialNumber} from "../../../../regex";

describe("evc error and logs", () => {
    it("tests evc errors page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for ev charger API request
        cy.intercept('**/ev-charger/87023906857014').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/87023906857014");
        //waits for ev charger page to load
        cy.wait('@evchargerAPI', {timeout: 30000});

        //waits for errors page to load
        cy.intercept('**/internal-api/paginate/ocpp-error**').as('errorsRequest');
        cy.get('div[class="v-tab"]').contains('Errors').should('be.visible').click();
        cy.wait('@errorsRequest', {timeout: 30000});

        //checks table is showing the correct data
        cy.get('[data-qa="table"]').should("be.visible");
        cy.get('[data-qa="table"]').find('th').each(($th, index): void  => {
            if ($th.text() === "Timestamp") {
                console.log(index)
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td): void  => {
                    const text: string = $td.text();
                    const result: boolean = dateAndTime.test(text);

                    if(!result) {
                        throw new Error("Error: date and time in does not match format YYYY-MM-DD HH:MM:SS");
                    }
                })
            }
        });
        cy.get('[data-qa="table"]').find('th').each(($th, index): void  => {
            if ($th.text() === "Cleared At") {
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td): void  => {
                    const text: string = $td.text();
                    const result: boolean = dateAndTime.test(text);

                    if(!result) {
                        throw new Error("Error: date and time in does not match format YYYY-MM-DD HH:MM:SS");
                    }
                })
            }
        });
        cy.get('[data-qa="table"]').find('th').each(($th, index): void  => {
            if ($th.text() === "Serial Number") {
                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
                    const text: string = $td.text().trim();
                    const result: boolean = evcSerialNumber.test(text);
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
        cy.intercept('**/ev-charger/87023906857014').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/87023906857014");
        cy.wait('@evchargerAPI', {timeout: 30000});

        //checks table and filters are visible
        cy.get('div[class="v-tab"]').contains('Logs').should('be.visible').click();
        cy.get('[data-qa="autocomplete.action"]').should('be.visible').click();
        cy.get('div[class*="v-select-list"]').should('be.visible');
        cy.get('[data-qa="autocomplete.type"]').should('be.visible').click();
        cy.get('div[class*="v-select-list"]').should('be.visible');
        cy.get('[data-qa="table.logs"]').should('be.visible');

    });
});