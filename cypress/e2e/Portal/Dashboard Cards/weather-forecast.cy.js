import { adminLogin } from "../../../logins";
import {dashboardSelect} from "../../../funcs";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("weather forecast card", () => {
    it("tests weather forecast card", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('Dashboard Cards');

        //creates alias for weather forecast API request
        cy.intercept('**/BrymboPVTest/weather').as('weatherAPI');

        cy.get('[data-qa="card.title"]').each(($div2, index) => {

            const text = $div2.text();
            console.log(text);
                if (text === 'Weather Forecast') {
                cy.wrap($div2).as('target');
                cy.get('@target').scrollIntoView();
                cy.get('[data-qa="button.search"]').eq(index).click();
                cy.get('[data-qa="search"]').eq(1).type('brymbo');
                cy.get('div[class="v-list-item__title"]').contains('BrymboPVTest').click();
                cy.get('[data-qa="button.view"]').click();
            }
        });

        //checks url contains /power-graph/
        //checks charts exist and are visible
        //waits for weather forecast API request to be successful
        cy.wait('@weatherAPI', {timeout: 30000});

        //checks elements are visible
        cy.get('[data-qa="text.locationAndDate"]').should('be.visible');
        cy.get('[data-qa="text.temperature"]').should('be.visible');
        cy.get('[data-qa="text.status"]').should('be.visible');
        cy.get('[data-qa="img.weatherIcon"]').should('be.visible');

        cy.get('[data-qa="text.day"]').should('have.length', 7);
        cy.get('[data-qa="img.smallWeatherIcon"]').should('have.length', 7);
        cy.get('[data-qa="text.cloudCover"]').should('have.length', 7);
        cy.get('[data-qa="img.overcast"]').should('have.length', 7);

    })
});
