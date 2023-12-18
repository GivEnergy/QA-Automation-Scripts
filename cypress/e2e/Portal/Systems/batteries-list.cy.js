import { adminLogin } from "../../../logins";
import {
    dashboardSelect,
    checkPageNav,
    tableRegex,
    tableContains, tableClick
} from "../../../funcs";
import {dateAndTime, positiveNumber, serialNumber} from "../../../regex";

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
        //opens my inverters and reloads page to hide nav bar
        dashboardSelect('My Inverters');
        cy.get('[data-qa="title"]').should('be.visible').contains('My Batteries');
        cy.get('[data-qa="search"]').should('be.visible').click();

        checkPageNav();

        tableRegex("Serial Number", serialNumber, "Error: serial number does not match format");
        tableRegex("Inverter Serial", serialNumber, "Error: serial number does not match format");
        tableClick("Inverter Serial");
        tableRegex("SOC %", positiveNumber, "Error: SOC % is not a positive number");
        tableRegex("First Seen", dateAndTime, "Error: first seen is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");
        tableRegex("Last Updated", dateAndTime, "Error: last updated is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");

        cy.get('[data-qa="autocomplete.capacity"]').should('be.visible');
        cy.get('[data-qa="autocomplete.capacity"]').click();
        cy.get('div[class*="v-list-item"]').contains('186Ah').click();
        cy.wait(2000);
        tableContains("Design Capacity (Ah)", "186", "Error: filtering by design capacity did not work");

        cy.get('[data-qa="autocomplete.firmware"]').should('be.visible');
        cy.get('[data-qa="autocomplete.firmware"]').click();
        cy.get('div[class*="v-list-item"]').contains('3013').as("3013");
        cy.get('@3013').scrollIntoView();
        cy.get('@3013').click();
        tableContains("Firmware Version", "3013", "Error: filtering by firmware version did not work");

    });
});