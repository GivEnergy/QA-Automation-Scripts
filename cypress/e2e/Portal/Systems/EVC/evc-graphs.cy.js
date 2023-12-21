import { adminLogin } from "../../../../logins";
import { dashboardSelect, } from "../../../../funcs";
import {dateAndTime} from "../../../../regex";


//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("evc graphs", () => {
    it("tests evc power graph page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.get('div[class="v-tab"]').contains('Power').should('be.visible').click();

        cy.get('[data-qa="singleDatePicker"]').should('be.visible');
        cy.get('[data-qa="powerGraph"]').should('be.visible');
        cy.get('[data-qa="button.power.refresh"]').should('be.enabled').click();

    });

    it("tests evc energy graph page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.get('div[class="v-tab"]').contains('Energy').should('be.visible').click();

        cy.get('[data-qa="datePicker"]').should('be.visible');
        cy.get('[data-qa="energyGraph"]').should('be.visible');
        cy.get('[data-qa="dateRange"]').should('be.visible')
        cy.get('[data-qa="button.energy.refresh"]').should('be.enabled').click();

    });
});
