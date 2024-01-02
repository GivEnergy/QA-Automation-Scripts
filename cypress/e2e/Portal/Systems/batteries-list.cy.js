import { adminLogin } from "../../../logins";
import {
    dashboardSelect,
    checkPageNav,
    tableRegex,
    tableContains, tableClick
} from "../../../funcs";
import {dateAndTime, numOrDecimal, positiveNumber, serialNumber} from "../../../regex";

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
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //creates alias for battery list page API request
        cy.intercept('**/staging.givenergy.cloud/batteries').as('batteriesAPI');
        dashboardSelect('My Batteries');

        //waits for battery list page to load
        cy.wait('@batteriesAPI', {timeout: 30000});
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.get('[data-qa="title"]').should('be.visible').contains('My Batteries');

        checkPageNav();

        //checks battery list page is showing the correct data and that hover cards work
        tableRegex("Serial Number", serialNumber, "Error: serial number does not match format");
        tableRegex("Inverter Serial", serialNumber, "Error: serial number does not match format");
        tableClick("Inverter Serial");
        tableRegex("SOC %", positiveNumber, "Error: SOC % is not a positive number");
        tableRegex("First Seen", dateAndTime, "Error: first seen is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");
        tableRegex("Last Updated", dateAndTime, "Error: last updated is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");
        tableRegex("Module", positiveNumber, "Error: last updated is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");
        tableRegex("Design Capacity (Ah)", numOrDecimal, "Error: design capacity is now a whole number or a decimal number");
        tableRegex("Full Capacity (Ah)", numOrDecimal, "Error: full capacity is now a whole number or a decimal number");
        tableRegex("Remaining Capacity (Ah)", numOrDecimal, "Error: remaining capacity is now a whole number or a decimal number");
        tableRegex("Cell #", positiveNumber, "Error: cell # is not a positive number");
        tableRegex("Cycle Count", positiveNumber, "Error: cycle count is not a positive number");

        //checks capacity filter works
        cy.intercept('**//internal-api/paginate/battery?page=1&itemsPerPage=15').as('capacityRequest');
        cy.get('[data-qa="autocomplete.capacity"]').should('be.visible');
        cy.get('[data-qa="autocomplete.capacity"]').click();
        cy.get('div[class*="v-list-item"]').contains('186Ah').click();
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.wait('@capacityRequest', {timeout: 30000});
        tableContains("Design Capacity (Ah)", "186", "Error: filtering by design capacity did not work");

        //checks firmware filter works
        cy.get('[data-qa="autocomplete.firmware"]').as('firmware');
        cy.intercept('**//internal-api/paginate/battery?page=1&itemsPerPage=15').as('firmwareRequest');
        cy.get('@firmware').should('be.visible');
        cy.get('@firmware').click();
        cy.get('@firmware').type('3013');
        cy.get('div[class*="v-list-item"]').contains('3013').as("3013");
        cy.get('@3013').scrollIntoView();
        cy.get('@3013').click();
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.wait('@firmwareRequest', {timeout: 30000});
        tableContains("Firmware Version", "3013", "Error: filtering by firmware version did not work");

    });
});