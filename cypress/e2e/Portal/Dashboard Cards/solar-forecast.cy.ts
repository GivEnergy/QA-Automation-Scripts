import { adminLogin } from "../../../logins";
import {dashboardSelect} from "../../../funcs";
import {solarForecastDescription} from "../../../dashboardCards";

describe("solar forecast card", () => {
    it("tests solar forecast input card", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('Dashboard Cards');

        //creates alias for solar forecast API request
        cy.intercept('**/BrymboRoad/solar-forecast').as('forecastAPI');

        cy.get('[data-qa="card.title"]').each(($div2, index): void  => {

            const text: string = $div2.text();
            console.log(text);
            if (text === 'Solar Power Forecast') {
                cy.get('[data-qa="card.description"]').as('description');
                cy.get('@description').eq(index).contains(solarForecastDescription).as('target');
                cy.get('@target').click();
                cy.get('@target').scrollIntoView();
                cy.get('[data-qa="button.search"]').eq(index).click();
                cy.get('[data-qa="search"]').eq(1).type('brymbo');
                cy.get('div[class="v-list-item__title"]').contains('BrymboRoad').click();
                cy.get('[data-qa="button.view"]').click();
            }
        });

        //checks url contains /power-graph/
        //checks charts exist and are visible
        //waits for solar forecast API request to be successful
        cy.wait('@forecastAPI', {timeout: 30000});

        cy.get('[data-qa="link.solcast"]').should('be.visible');
        cy.get('[data-qa="description"]').should('be.visible');
        cy.get('[data-qa="form"]').should('be.visible');
        cy.get('[data-qa="field.key"]').should('be.visible');
        cy.get('[data-qa="field.id"]').should('be.visible');
        cy.get('[data-qa="select.history"]').should('be.visible');
        cy.get('[data-qa="select.forecast"]').should('be.visible');
        cy.get('[data-qa="button.submit"]').should('be.visible');

        cy.get('[data-qa="link.solcast"]').then(($el): void  => {

            const url: string = $el.attr('href');

            if (url !== 'https://toolkit.solcast.com.au/') {
                throw new Error("Error: solcast toolkit link is not correct")
            }
        });

        cy.get('[data-qa="button.submit"]').should('be.disabled');
        cy.get('[data-qa="field.key"]').type('1212');
        cy.get('[data-qa="field.id"]').type('1211111111111111111');
        cy.get('[data-qa="button.submit"]').should('be.enabled');

    })

    it("tests solar forecast card", (): void  => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('Dashboard Cards');

        //creates alias for solar forecast API request
        cy.intercept('**/BrymboPVTest/solar-forecast').as('forecastAPI');

        cy.get('[data-qa="card.title"]').each(($div2, index): void  => {

            const text: string = $div2.text();
            console.log(text);
            if (text === 'Solar Power Forecast') {
                cy.get('[data-qa="card.description"]').as('description');
                cy.get('@description').eq(index).contains(solarForecastDescription).as('target');
                cy.get('@target').click();
                cy.get('@target').scrollIntoView();
                cy.get('[data-qa="button.search"]').eq(index).click();
                cy.get('[data-qa="search"]').eq(1).type('brymbo');
                cy.get('div[class="v-list-item__title"]').contains('BrymboPVTest').click();
                cy.get('[data-qa="button.view"]').click();
            }
        });

        //checks url contains /power-graph/
        //checks charts exist and are visible
        //waits for solar forecast API request to be successful
        cy.wait('@forecastAPI', {timeout: 30000});

        cy.get('[data-qa="button.time"]').should('be.visible');
        cy.get('[data-qa="button.time"]').should('have.length', 7);
        cy.get('[data-qa="text.name"]').should('be.visible');
        cy.get('[data-qa="text.name"]').should('have.length', 3);
        cy.get('[data-qa="text.data"]').should('be.visible');
        cy.get('[data-qa="text.data"]').should('have.length', 3);
        cy.get('[data-qa="chart.solar"]').should('be.visible');
        cy.get('[data-qa="text.name"]').eq(0).contains('Estimated Generation');
        cy.get('[data-qa="text.name"]').eq(1).contains('Actual Generation');
        cy.get('[data-qa="text.name"]').eq(2).contains('Forecast Generation');

        cy.get('[data-qa="button.time"]').eq(0).click();
        cy.get('[data-qa="text.name"]').should('have.length', 2);
        cy.get('[data-qa="text.data"]').should('have.length', 2);
        cy.get('[data-qa="text.name"]').eq(0).contains('Estimated Generation');
        cy.get('[data-qa="text.name"]').eq(1).contains('Actual Generation');

        cy.get('[data-qa="button.time"]').last().click();
        cy.get('[data-qa="text.name"]').should('have.length', 1);
        cy.get('[data-qa="text.name"]').eq(0).contains('Forecast Generation');

    })
});