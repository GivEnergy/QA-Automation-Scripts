import { dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Known Issues", () => {
    it("tests creating a known issue", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //opens my inverters and reloads page to hide nav bar
        cy.intercept('**/staging.givenergy.cloud/known-issues').as('knownIssuesAPI');
        dashboardSelect('Known Issues');
        cy.wait('@knownIssuesAPI', {timeout: 30000});
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.get('[data-qa="title"]').should('be.visible').contains('Known Issues');

        cy.intercept('**/known-issues/create').as('createAPI');
        cy.get('[data-qa="link.create"]').should('be.visible').click();
        cy.wait('@createAPI', {timeout: 30000});

        cy.get('[data-qa="title"]').should('be.visible').contains('Create Known Issue');
        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class*="v-list-item"]').contains('Portal').click();
        cy.get('[data-qa="select.status"]').click();
        cy.get('div[class*="v-list-item"]').contains('Investigating').click();
        cy.get('[data-qa="field.title"]').then(($el) => {

            const title = "Lorem Ipsum";
            const content = "Lorem ipsum dolor sit amet.";

            cy.wrap($el).type(title);
            cy.get('[data-qa="textarea.content"]').type(content);

            cy.intercept('**/staging.givenergy.cloud/known-issues').as('knownIssuesAPI');
            cy.get('[data-qa="button.submit"]').should('be.enabled').click();
            cy.wait('@knownIssuesAPI', {timeout: 30000});
            cy.get('div[class="v-alert__content"]').should('be.visible').contains('Known Issue Created Successfully');
            cy.get('[data-qa="card.knownIssue"]').eq(0).contains(title);
            cy.get('[data-qa="card.knownIssue"]').eq(0).contains(content);
            cy.get('[data-qa="card.knownIssue"]').find('[data-qa="chip.issue.type"]').should('be.visible').contains('PORTAL');
            cy.get('[data-qa="card.knownIssue"]').find('[data-qa="chip.issue.status"]').should('be.visible').contains('INVESTIGATING');

        })

    });

    it("tests known issue index", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //opens my inverters and reloads page to hide nav bar
        cy.intercept('**/staging.givenergy.cloud/known-issues').as('knownIssuesAPI');
        dashboardSelect('Known Issues');
        cy.wait('@knownIssuesAPI', {timeout: 30000});
        cy.get('[data-qa="search"]').should('be.visible').click();
        cy.get('[data-qa="title"]').should('be.visible').contains('Known Issues');

        cy.get('[data-qa="card.knownIssue"]').should('have.length.above', 1);
        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class*="v-list-item"]').contains('App').click();
        cy.get('[data-qa="card.knownIssue"]').eq(0).find('[data-qa="chip.issue.type"]').contains('APP');
        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class*="v-list-item"]').contains('Portal').click();
        cy.get('[data-qa="card.knownIssue"]').eq(0).find('[data-qa="chip.issue.type"]').contains('PORTAL');
        cy.get('[data-qa="select.type"]').parent().next().find('button[class*="mdi-close"]').click();

        cy.get('[data-qa="search"]').type('Local Monitoring not Working on App');
        cy.get('[data-qa="card.knownIssue"]').should('have.length', 1);
        cy.get('[data-qa="card.knownIssue"]').contains('Local Monitoring not Working on App');
        cy.get('[data-qa="card.knownIssue"]').find('[data-qa="chip.issue.type"]').contains('APP');
        cy.get('[data-qa="card.knownIssue"]').find('[data-qa="chip.issue.status"]').contains('RESOLVED');

    });
});