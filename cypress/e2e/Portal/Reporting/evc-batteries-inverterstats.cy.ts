import {checkBarChartXAxis, checkDateRangePicker, dashboardSelect, reportingFilter} from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("reporting tests", () => {
    it("tests reporting, new ev chargers", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/ev-chargers').as('reportingEVC');
        //navigates to leave feedback
        dashboardSelect('Reporting');
        cy.wait('@reportingEVC', {timeout: 30000});

        //uses new notifications filter
        cy.get('[data-qa="container.bar"]').should('be.visible');
        cy.get('[data-qa="span.name"]').contains("New EV Chargers");
        cy.get('[data-qa="span.name"]').contains('All Time # New EV Chargers');
        cy.get('[data-qa="span.name"]').contains('New EV Chargers in Date Range');
        cy.get('[data-qa="span.name"]').contains('New EV Chargers Past 30 Days');
        cy.get('[data-qa="span.name"]').contains('New EV Chargers Past 7 Days');
        cy.get('[data-qa="span.name"]').contains('New EV Chargers Today');

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

    });

    it("tests reporting, discovered batteries", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/batteries').as('reportingBatteries');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('Discovered Batteries', '@reportingBatteries');
        cy.get('[data-qa="container.bar"]').should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).parent().click();
        cy.get('[data-qa="autocomplete.filter"]').eq(0).parent().type('9.5kWh (186Ah)');
        cy.get('div[class="v-list-item__title"]').contains('9.5kWh (186Ah)').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('9.5kWh (186Ah)');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

    });

    it("tests reporting, inverter stats", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/inverter-stats').as('reportingInverterStats');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        cy.get('[data-qa="icon.button.filter"]').click();
        cy.get('[data-qa="nav.dropdown.filter"]').children().contains('Inverter Stats').click();
        cy.wait('@reportingInverterStats', {timeout: 30000});

        cy.get('[data-qa="span.name"]').contains('Current Generation');
        cy.get('[data-qa="span.name"]').contains('Combined Generation Today');
        cy.get('[data-qa="span.name"]').contains('Carbon Offset Today');
        cy.get('[data-qa="span.name"]').contains('Generation Total');
        cy.get('[data-qa="span.name"]').contains('Carbon Offset Total');
        cy.get('[data-qa="span.name"]').contains('Import Today');
        cy.get('[data-qa="span.name"]').contains('Import Total');
        cy.get('[data-qa="span.name"]').contains('Export Today');
        cy.get('[data-qa="span.name"]').contains('Export Total');
        cy.get('[data-qa="span.name"]').contains('Battery Throughput Total');
        cy.get('[data-qa="span.name"]').contains('Average Battery Percent');
        //add data checks

        //uses distinct filter
        // cy.get('[data-qa="autocomplete.filter"]').eq(0).parent().click();
        // cy.get('div[class="v-list-item__title"]').contains('All-In-One').click();

    });
});