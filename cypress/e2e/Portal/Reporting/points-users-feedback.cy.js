import {checkBarChartXAxis, checkDateRangePicker, dashboardSelect, reportingFilter} from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("more reporting tests", () => {
    it("tests reporting, new feedback filter", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/feedback').as('feedback');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Feedback', '@feedback');
        cy.get('[data-qa="container.bar"]').eq(0).should('be.visible');
        cy.get('[data-qa="container.bar"]').eq(1).scrollIntoView();
        cy.get('[data-qa="container.bar"]').eq(1).should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).scrollIntoView();
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Bug');
        cy.get('div[class="v-list-item__title"]').contains('Bug Report').click();

        //checks x axis before changing date
        checkBarChartXAxis();
        cy.get('[data-qa="container.bar"]').eq(1).scrollIntoView();
        cy.get('[data-qa="container.bar"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').find('text').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        cy.get('[data-qa="container.bar"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').find('text').eq(11).contains(/^\d{4,4}[-]\d{2,2}/);

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').eq(0).children().contains('Bug Report');
        cy.get('[data-qa="container.bar"]').eq(0).click();
        cy.get('[data-qa="container.bar"]').eq(0).find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

        cy.get('[data-qa="autocomplete.filter"]').eq(1).scrollIntoView();
        cy.get('[data-qa="autocomplete.filter"]').eq(1).click();
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('{downArrow}');
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('{downArrow}');
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('{downArrow}');
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('{enter}');

        checkDateRangePicker();

        cy.get('[data-qa="container.bar"]').eq(1).scrollIntoView();
        cy.get('g[class*="highcharts-legend-item"]').eq(1).children().contains('App');
        cy.get('[data-qa="container.bar"]').eq(1).click();
        cy.get('[data-qa="container.bar"]').eq(1).find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);
        
    });

    it("tests reporting, new users filter", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/users').as('users');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        reportingFilter('New Users', '@users');
        cy.get('[data-qa="container.bar"]').eq(0).should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Customer');
        cy.get('div[class="v-list-item__title"]').contains('Customer').click();

        //checks x axis before changing date
        checkBarChartXAxis();

        //checks date selector
        checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('Customer');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

    });

    it("tests reporting, reward points filter", () => {

        //sets viewport and logs in
        adminLogin();
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/reporting/reward-points').as('rewardPoints');
        //navigates to leave feedback
        dashboardSelect('Reporting');

        cy.get('[data-qa="icon.button.filter"]').click();
        cy.get('[data-qa="nav.dropdown.filter"]').children().contains('Reward Points Balance').click();
        cy.wait('@rewardPoints', {timeout: 30000});
        cy.get('[data-qa="span.name"]').contains('Reward Points Balance');
        cy.get('[data-qa="span.name"]').contains('All Time # ' + 'Reward Points Balance');
        cy.get('[data-qa="span.name"]').contains('Reward Points Balance' + ' in Date Range');
        cy.get('[data-qa="span.name"]').contains('Reward Points Balance' + ' Past 30 Days');
        cy.get('[data-qa="span.name"]').contains('Reward Points Balance' + ' Past 7 Days');
        cy.get('[data-qa="span.name"]').contains('Reward Points Balance' + ' Today');
        cy.get('[data-qa="span.name"]').contains('Points Earned');
        cy.get('[data-qa="span.name"]').contains('Unclaimed Points');
        cy.get('[data-qa="span.name"]').contains('Claimed Points');
        cy.get('[data-qa="container.bar"]').eq(0).should('be.visible');
        //add pie chart check

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Earned');
        cy.get('div[class="v-list-item__title"]').contains('Earned').click();

        //checks date selector
        //checkDateRangePicker();

        cy.get('g[class*="highcharts-legend-item"]').children().contains('Earned');
        cy.get('[data-qa="container.bar"]').click();
        cy.get('[data-qa="container.bar"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

    });

});