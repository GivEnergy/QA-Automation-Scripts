import { dashboardSelect, reportingFilter } from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("reporting new notifications filter", () => {
    it("tests reporting new notifications filter", () => {

        //sets viewport and logs in
        adminLogin();

        //navigates to leave feedback
        dashboardSelect('Reporting');

        //uses new feedback filter
        reportingFilter('New Feedback');
        //cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-legend-item highcharts-column-series"]').should('have.lengthOf', 3);
        //cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-legend-item highcharts-column-series"]').should('have.lengthOf', 7);

        //uses feedback type filter
        //filters for bug reports and checks the feedback by type graph has responded correctly 
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Bug Report');
        cy.get('div[class*="v-list-item__content"]').contains('Bug Report').click();
        cy.get('[data-qa="autocomplete.filter"]').eq(0).parent('[class*="v-select__selections"]').clear();
        cy.get('g[class*="highcharts-legend-item"]').eq(0).children().contains('Bug Report');
        cy.get('[data-qa="button.refresh"]').eq(0).click();
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

        //uses product type filter
        //filters for bug reports and checks the feedback by type graph has responded correctly 
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('App');
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('{downArrow}').type('{enter}');
        cy.get('[data-qa="autocomplete.filter"]').eq(1).parent('[class*="v-select__selections"]').clear();
        cy.get('g[class*="highcharts-legend-item"]').eq(1).children().contains('App');
        cy.get('[data-qa="button.refresh"]').eq(0).click();
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1); 

        //checks x axis before changing date feedback by type bar chart
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        //cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(11).contains(/^\d{4,4}[-]\d{2,2}/);

        //checks x axis before changing date feedback by product bar chart
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        //cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(11).contains(/^\d{4,4}[-]\d{2,2}/);

        //checks date selector, enters value and then cancels
        cy.get('[data-qa="calendar.field.text"]').click();
        //cy.get('div[class*="v-date-picker-header"]').find('button[label="Previous month"]').click();
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('8').click(); //needs to be 1 
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('11').click(); //needs to be 28
        cy.get('[data-qa="calendar.button.cancel"]').click();

        //enters value and then saves
        cy.get('[data-qa="calendar.field.text"]').click();
        //cy.get('div[class*="v-date-picker-header"]').find('button[label="Previous month"]').click();
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('8').click(); //needs to be 1
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('11').click(); //needs to be 28
        cy.get('[data-qa="calendar.button.save"]').click();

        //checks feedback by type bar chart
        //toggles the type on the by type graph and checks the graph changes with this
        cy.get('[data-qa="container"]').eq(0).find('rect[class*="highcharts-point"]').should('be.visible');
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').eq(0).find('tspan').contains('No data to display');
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').eq(0).find('rect[class*="highcharts-point"]').should('be.visible');

        //changes group graby by and checks date shown on x axis
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(2).type('Day');
        cy.get('div[class*="v-list-item__content"]').contains('Day').click();
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(2).clear().type('Hour');
        cy.get('div[class*="v-list-item__content"]').contains('Hour').click();
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(0)
            .contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(2).clear().type('Year');
        cy.get('div[class*="v-list-item__content"]').contains('Year').click();
        cy.get('[data-qa="container"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}/);

        //checks feedback by product bar chart
        //toggles the product on the by product graph and checks the graph changes with this
        cy.get('[data-qa="container"]').eq(1).find('rect[class*="highcharts-point"]').should('be.visible');
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').eq(1).find('tspan').contains('No data to display');
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').eq(1).find('rect[class*="highcharts-point"]').should('be.visible');

        //changes group graby by and checks date shown on x axis
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(3).type('Day');
        cy.get('[data-qa="autocomplete.filter"]').eq(3).type('{downArrow}').type('{enter}');
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(3).clear().type('Hour');
        cy.get('[data-qa="autocomplete.filter"]').eq(3).type('{downArrow}').type('{enter}');
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(0)
            .contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(3).clear().type('Year');
        cy.get('[data-qa="autocomplete.filter"]').eq(3).type('{downArrow}').type('{enter}');
        cy.get('[data-qa="container"]').eq(1).find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}/);

        //clears filters
        //changes group graph by back to month and removes feedback type value
        cy.get('[data-qa="autocomplete.filter"]').eq(2).clear().type('Month');
        cy.get('div[class*="v-list-item__content"]').contains('Month').click();
        cy.get('[data-qa="autocomplete.filter"]').eq(3).clear().type('Month');
        cy.get('[data-qa="autocomplete.filter"]').eq(3).type('{downArrow}').type('{enter}');
        cy.get('[data-qa="autocomplete.filter"]').eq(0).clear();
        cy.get('[data-qa="autocomplete.filter"]').eq(1).click().clear();
        cy.get('[data-qa="button.refresh"]').eq(0).click();
        
    });
});