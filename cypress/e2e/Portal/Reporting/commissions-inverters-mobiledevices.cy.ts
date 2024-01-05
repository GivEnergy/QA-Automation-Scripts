import {checkBarChartXAxis, checkDateRangePicker, dashboardSelect, reportingFilter} from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("more reporting tests", () => {
    it("tests reporting, new commissions", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/commissions').as('commissions');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Commissions', '@commissions');
        cy.get('[data-qa="container.bar"]').should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Yes');
        cy.get('div[class="v-list-item__title"]').contains('Yes').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('Completed');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);
        
    });

    it("tests reporting, new inverters", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/inverters').as('inverters');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Inverters', '@inverters');
        cy.get('[data-qa="container.bar"]').should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).click();
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('GIV');
        cy.get('div[class="v-list-item__title"]').contains('GIV-AC3.0').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('GIV-AC3.0');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

        cy.get('[data-qa="autocomplete.filter"]').eq(1).click();
        cy.get('div[class="v-list-item__title"]').contains('5.2kWh (102Ah)').click();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('GIV-AC3.0');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

    });

    it("tests reporting, new mobile app devices", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/mobile-device').as('mobileDevice');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Mobile App Devices', '@mobileDevice');
        cy.get('[data-qa="container.bar"]').should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('iOS');
        cy.get('div[class="v-list-item__title"]').contains('iOS').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('iOS');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

    });
});