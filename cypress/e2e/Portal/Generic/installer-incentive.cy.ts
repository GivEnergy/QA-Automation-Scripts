import { dashboardSelect } from "../../../funcs";
import { engineerLogin } from "../../../logins";
import {positiveNumber} from "../../../regex";
import {voucherValues} from "../../../listOfValues";

describe("installer incentive", () => {
    it("tests engineer installer incentive page", () => {

        engineerLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/staging.givenergy.cloud/reward-points').as('rewardsAPI');
        dashboardSelect('Reward Scheme');
        cy.wait('@rewardsAPI', {timeout: 30000});

        cy.get('[data-qa="title"]').as('title');
        cy.get('@title').should('be.visible');
        cy.get('@title').contains('Installer Incentives Scheme');

        cy.get('[data-qa="graph.history"]').as('graph');
        cy.get('@graph').should('be.visible');
        cy.get('@graph').click();

        //checks titles are correct and points are all showing numbers
        cy.get('[data-qa="pointsBalanceInfo"]').as('pointsInfo');
        cy.get('[data-qa="pointsAmount"]').as('points');
        cy.get('@pointsInfo').eq(0).contains('Points Balance');
        cy.get('@pointsInfo').eq(1).contains('Points Earned This Month');
        cy.get('@pointsInfo').eq(2).contains('Points Earned Lifetime');
        cy.get('@points').eq(0).contains(positiveNumber);
        cy.get('@points').eq(1).contains(positiveNumber);
        cy.get('@points').eq(2).contains(positiveNumber);

        //checks list of products and amazon vouchers
        //checks product point values and amazon voucher values
        cy.get('[data-qa="list.values"]').as('list');
        cy.get('[data-qa="value"]').as('value');
        cy.get('@list').should('have.length', 15);
        cy.get('@list').contains('9.5kWh');
        cy.get('@list').contains('Single-Phase Hybrid');
        cy.get('@list').contains('Single-Phase AC Coupled');
        cy.get('@list').contains('Three-Phase Hybrid');
        cy.get('@list').contains('Three-Phase AC Coupled');
        cy.get('@list').contains('Gateway');
        cy.get('@list').contains('All-In-One');
        cy.get('@list').contains('2.6kWh');
        cy.get('@list').contains('5.2kWh');
        cy.get('@list').contains('8.2kWh');
        cy.get('@list').contains('100 points');
        cy.get('@list').contains('200 points');
        cy.get('@list').contains('300 points');
        cy.get('@list').contains('400 points');
        cy.get('@list').contains('500 points');
        cy.get('@value').eq(10).contains(voucherValues[0]);
        cy.get('@value').eq(11).contains(voucherValues[1]);
        cy.get('@value').eq(12).contains(voucherValues[2]);
        cy.get('@value').eq(13).contains(voucherValues[3]);
        cy.get('@value').eq(14).contains(voucherValues[4]);

        //navigates to history page and checks type filter and table
        cy.intercept('**/reward-points/history').as('historyAPI');
        cy.get('[data-qa="link.history"]').should('be.enabled');
        cy.get('[data-qa="link.history"]').click();

        cy.wait('@historyAPI', {timeout: 30000});
        cy.get('[data-qa="title.history"]').should('be.visible');
        cy.get('[data-qa="title.history"]').contains('History');
        cy.get('[data-qa="select.type"]').should('be.visible');
        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class="v-list-item__title"]').contains('Add');
        cy.get('div[class="v-list-item__title"]').contains('Deduct');
        cy.get('[data-qa="table"]').should('be.visible');

    });
});