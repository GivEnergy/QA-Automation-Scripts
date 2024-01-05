import { adminLogin } from "../../../../logins";
import { dashboardSelect, } from "../../../../funcs";
import {dateAndTime} from "../../../../regex";

describe("evc graphs", () => {
    it("tests evc power graph page", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/87023906857014').as('evchargerAPI');
        cy.visit("https://givenergy.cloud/ev-charger/87023906857014");
        //waits for ev charger page to load
        cy.wait('@evchargerAPI', {timeout: 30000});

        //navigates to power graph
        cy.get('div[class="v-tab"]').contains('Power').should('be.visible').click();

        //checks graph, date picker and refresh button are visible
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
        cy.intercept('**/ev-charger/87023906857014').as('evchargerAPI');
        cy.visit("https://givenergy.cloud/ev-charger/87023906857014");
        //waits for ev charger page to load
        cy.wait('@evchargerAPI', {timeout: 30000});

        //navigates to energy graph page
        cy.get('div[class="v-tab"]').contains('Energy').should('be.visible').click();

        //checks energy graph, date picker, date range and refresh button are visible
        cy.get('[data-qa="datePicker"]').should('be.visible');
        cy.get('[data-qa="energyGraph"]').should('be.visible');
        cy.get('[data-qa="dateRange"]').should('be.visible')
        cy.get('[data-qa="button.energy.refresh"]').should('be.enabled').click();

    });
});
