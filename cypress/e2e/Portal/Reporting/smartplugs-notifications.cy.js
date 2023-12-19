import {checkBarChartXAxis, checkDateRangePicker, dashboardSelect, reportingFilter} from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("reporting new notifications filter", () => {
    it("tests reporting new notifications filter", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/notifications').as('notifications');
        cy.intercept('**/notifications/widget/primary_ymd_data').as('barChart');

        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Notifications', '@notifications');
        cy.wait('@barChart', {timeout: 30000});
        cy.get('[data-qa="container.bar"]').eq(0).should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Commission Completed');
        cy.get('div[class="v-list-item__title"]').contains('Commission Completed').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('Commission Completed');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);
        
    });

    it("tests reporting, new users filter", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/smart-plugs').as('smartPlugs');
        cy.intercept('**/notifications/widget/primary_ymd_data').as('barChart');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('Registered Smart Plugs', '@smartPlugs');
        cy.get('[data-qa="container.bar"]').eq(0).should('be.visible');

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

    });

});
