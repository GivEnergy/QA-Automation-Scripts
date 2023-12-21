import {adminLogin} from "../../../../logins";
import {checkPageNav, dashboardSelect, tableClick, tableContains, tableRegex} from "../../../../funcs";
import {dateAndTime, positiveNumber, evcSerialNumber} from "../../../../regex";
//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("my evc page", () => {
    it("tests my evc page", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //opens my inverters and reloads page to hide nav bar
        dashboardSelect('My EV Chargers');
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.get('[data-qa="title"]').should('be.visible').contains('EV Chargers');

        checkPageNav();

        tableRegex("Serial Number", evcSerialNumber, "Error: serial number does not match format");
        tableRegex("Last Message Received", dateAndTime, "Error: first seen is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");
        tableRegex("Online Since", dateAndTime, "Error: last updated is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");

        cy.get('[data-qa="autocomplete.status"]').should('be.visible');
        cy.intercept('**/internal-api/paginate/ev-charger**').as('statusRequest');
        cy.get('[data-qa="autocomplete.status"]').click();
        cy.get('div[class*="v-list-item"]').contains('Available').click();
        cy.wait('@statusRequest', {timeout: 30000});
        cy.wait(2000);
        tableContains("Status", "Available", "Error: filtering by status did not work");

        cy.get('[data-qa="autocomplete.product"]').should('be.visible');
        cy.intercept('**/internal-api/paginate/ev-charger**').as('productRequest');
        cy.get('[data-qa="autocomplete.product"]').click();
        cy.get('div[class*="v-list-item"]').contains('SingleSocketCharger (WWWW)').click();
        cy.wait('@productRequest', {timeout: 30000});
        tableContains("Product", "SingleSocketCharger", "Error: filtering by product did not work");

    });
});