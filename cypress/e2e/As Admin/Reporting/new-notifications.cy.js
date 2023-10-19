import { dashboardSelect, reportingFilter } from "../../../funcs"
import { adminLogin } from "../../../logins";

describe("reporting new notifications filter", () => {
    it("tests reporting new notifications filter", () => {

        //sets viewport and logs in
        adminLogin();

        //navigates to leave feedback
        dashboardSelect('Reporting');

        //uses new notifications filter
        reportingFilter('New Notifications');
        cy.get('[data-qa="container"]').find('g[class*="highcharts-legend"]').should('have.lengthOf', 9); //try change this to greater than 1

        //uses distinct filter
        cy.get('[data-qa="autocomplete.filter"]').eq(0).type('Dongle Registered');
        cy.get('div[class*="v-list-item__content"]').contains('Dongle Registered').click();
        cy.get('[data-qa="autocomplete.filter"]').parent('[class*="v-select__selections"]').clear();
        cy.get('i[class*="mdi-refresh"]').eq(0).click();
        cy.get('g[class*="highcharts-legend-item"]').children().contains('Dongle Registered');
        cy.get('[data-qa="container"]').find('g[class*="highcharts-legend-item"]').should('have.lengthOf', 1);

        //checks x axis before changing date
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(11).contains(/^\d{4,4}[-]\d{2,2}/);

        //checks date selector
        cy.get('[data-qa="calendar.field.text"]').click();
        cy.get('div[class*="v-date-picker-header"]').find('button[label="Previous month"]').click();
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('7').click(); 
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('10').click();
        cy.get('[data-qa="calendar.button.cancel"]').click();
        cy.get('[data-qa="calendar.field.text"]').click();
        cy.get('div[class*="v-date-picker-header"]').find('button[label="Previous month"]').click();
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('1').click();
        cy.get('tbody').find('div[class*="v-btn__content"]').contains('28').click();
        cy.get('[data-qa="calendar.button.save"]').click();

        //checks bar chart
        cy.get('[data-qa="container"]').find('rect[class*="highcharts-point"]').should('be.visible');
        cy.get('[data-qa="container"]').find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').find('tspan').contains('No data to display');
        cy.get('[data-qa="container"]').find('g[class*="highcharts-legend-item"]').click();
        cy.get('[data-qa="container"]').find('rect[class*="highcharts-point"]').should('be.visible');
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(1).type('Day');
        cy.get('div[class*="v-list-item__content"]').contains('Day').click();
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(1).clear().type('Hour');
        cy.get('div[class*="v-list-item__content"]').contains('Hour').click();
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(0)
            .contains(/^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}/);
        cy.get('[data-qa="autocomplete.filter"]').eq(1).clear().type('Year');
        cy.get('div[class*="v-list-item__content"]').contains('Year').click();
        cy.get('[data-qa="container"]').find('g[class*="highcharts-xaxis-labels"]').eq(0).contains(/^\d{4,4}/);
        
    });
});
