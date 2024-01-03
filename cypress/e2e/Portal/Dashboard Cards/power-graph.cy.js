import { adminLogin } from "../../../logins";
import {dashboardSelect} from "../../../funcs";
import {powerGraphDescription} from "../../../dashboardCards";
import {dateAndTime, YYYYMMDD} from "../../../regex";
import {powerGraphItems} from "../../../listOfValues";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("power graph card", () => {
    it("tests power graph card", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('Dashboard Cards');

        //creates alias for power graph API request
        cy.intercept('**/BrymboPVTest/power-graph').as('powerGraphAPI');

        cy.get('[data-qa="card.title"]').each(($div2, index) => {

            const text = $div2.text();
            console.log(text);
            if (text === 'Power Graph') {
                cy.get('[data-qa="card.description"]').as('description');
                cy.get('@description').eq(index).contains(powerGraphDescription).as('target');
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
        //waits for power graph API request to be successful
        cy.wait('@powerGraphAPI', {timeout: 30000});

        //check elements are visible
        cy.get('[data-qa="row.powerGraph"]').should('be.visible');
        cy.get('[data-qa="slot.datePicker"]').should('be.visible');
        cy.get('[data-qa="autocomplete.items"]').should('be.visible');
        cy.get('[data-qa="chart.power"]').should('be.visible');

        //checks date picker day shows current date and it matches yyyy-mm-dd format
        cy.get('[data-qa="slot.datePicker"]').find('label').then(($el) => {

            const text = $el.text();

            const date = new Date().toLocaleString();

            if (text !== date) {
                throw new Error("Error: date picker default day is not current day");
            }

            const result = YYYYMMDD.test(text);

            if (!result) {
                throw new Error("Error: date does not match format YYYY-MM-DD");
            }

        });

        //checks all the graph items are visible in the dropdown
        cy.get('[data-qa="autocomplete.items"]').click();
        cy.get('div[class="v-list-item__title"]').each(($el, index) => {

            const title = $el.text();

            if (title !== powerGraphItems[index]){
                throw new Error(`Error: ${powerGraphItems[index]} is not found`);
            }
        });


    })
});
