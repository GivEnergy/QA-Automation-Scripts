import { dashboardSelect } from "../../../funcs";
import {customerLogin} from "../../../logins";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Frequently Asked Questions", () => {
    it("tests Frequently Asked Questions page", () => {

        customerLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //opens my inverters and reloads page to hide nav bar
        cy.intercept('**/staging.givenergy.cloud/faq').as('faqAPI');
        dashboardSelect('FAQ');
        cy.wait('@faqAPI', {timeout: 30000});
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.get('[data-qa="title"]').should('be.visible').contains('Frequently Asked Questions');
        cy.get('[data-qa="subtitle"]').should('be.visible');
        cy.get('[data-qa="link.communityForum"]').should('be.visible');
        cy.get('[data-qa="link.communityForum"]').should('have.attr', 'href').and('eq', 'https://community.givenergy.cloud');
        cy.get('[data-qa="link.feedback"]').should('be.visible');
        cy.get('[data-qa="link.feedback"]').should('have.attr', 'href').and('eq', 'https://staging.givenergy.cloud/feedback/create');

        cy.get('[data-qa="category.title"]').should('have.length', 3);
        cy.get('[data-qa="category.title"]').contains('My Account').should('be.visible');
        cy.get('[data-qa="category.title"]').contains('My System').should('be.visible');
        cy.get('[data-qa="category.title"]').contains('GivEnergy API').scrollIntoView();
        cy.get('[data-qa="category.title"]').contains('GivEnergy API').should('be.visible');

        cy.get('[data-qa="search"]').scrollIntoView();
        cy.get('[data-qa="search"]').type('System');
        cy.get('[data-qa="category.title"]').should('have.length', 1);
        cy.get('[data-qa="category.title"]').contains('My System').should('be.visible');

        cy.get('[data-qa="search"]').find('button[class*="mdi-close"]').click();
        cy.get('[data-qa="category.title"]').should('have.length', 3);
        cy.get('[data-qa="search"]').type('Account');
        cy.get('[data-qa="category.title"]').should('have.length', 1);
        cy.get('[data-qa="category.title"]').contains('My Account').should('be.visible');

        cy.get('[data-qa="search"]').find('button[class*="mdi-close"]').click();
        cy.get('[data-qa="category.title"]').should('have.length', 3);
        cy.get('[data-qa="search"]').type('GivEnergy API');
        cy.get('[data-qa="category.title"]').should('have.length', 1);
        cy.get('[data-qa="category.title"]').contains('GivEnergy API').should('be.visible');

    });
});