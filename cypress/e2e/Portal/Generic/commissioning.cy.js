import { adminLogin } from "../../../logins";
import { checkPageNav, dashboardSelect, tableRegex } from "../../../funcs";
import { dateAndTime } from "../../../regex";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("commissions", () => {
    it("tests commissions", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/staging.givenergy.cloud/commission').as('commissionAPI');
        dashboardSelect('Commissions');
        cy.wait('@commissionAPI', {timeout: 30000});

        cy.get('[data-qa="search"]').should('be.visible').click();
        checkPageNav();

        //checks create commission button directs to commission process
        cy.get('[data-qa="card.commissions"]').should('be.visible');
        cy.get('[data-qa="title.commissions"]').contains('Commissions');
        cy.get('[data-qa="button.create"]').contains('Create Commission').click();
        cy.get('[data-qa="search.account"]').should('be.visible');

        //navigates back to commissions
        cy.intercept('**/staging.givenergy.cloud/commission').as('commissionAPI');
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains('Commissions').click();
        cy.wait('@commissionAPI', {timeout: 30000});
        cy.get('[data-qa="search"]').should('be.visible').click();

        tableRegex('Started At', dateAndTime, 'Error: Started At time and date using incorrect format');
        tableRegex('Last Updated At', dateAndTime, 'Error: Last Updated At time and date using incorrect format');

        //checks account hovers work
        cy.get('[data-qa="createdFor"]').eq(0).click();
        cy.get('[data-qa="card.item"]').should('be.visible');
        cy.get('[data-qa="search"]').click();
        cy.get('[data-qa="inverter.serials"]').eq(0).click();
        cy.get('[data-qa="card.item"]').should('be.visible');
        cy.get('[data-qa="search"]').click();
        cy.get('[data-qa="createdBy"]').eq(0).click();
        cy.get('[data-qa="card.item"]').should('be.visible');
        cy.get('[data-qa="search"]').click();

        //checks show completed
        cy.get('div[class="v-data-footer__pagination"]').then(($div) => {

            const text = $div.text();
            const num = Number(text);

            cy.get('[data-qa="checkbox.completed"]').parent().click();

            cy.get('div[class="v-data-footer__pagination"]').then(($div2) => {

                const text2 = $div2.text();
                const num2 = Number(text2);

                if (num >= num2) {
                    throw new Error('Error: Clicking show complete did not load more results');
                }

                cy.get('[data-qa="checkbox.completed"]').parent().click();
            })
        })

        //checks show deleted
        cy.get('div[class="v-data-footer__pagination"]').then(($div) => {

            const text = $div.text();
            const num = Number(text);

            cy.get('[data-qa="checkbox.deleted"]').parent().click();

            cy.get('div[class="v-data-footer__pagination"]').then(($div2) => {

                const text2 = $div2.text();
                const num2 = Number(text2);

                if (num >= num2) {
                    throw new Error('Error: Clicking show deleted did not load more results');
                }

                cy.get('[data-qa="checkbox.deleted"]').parent().click();
            })
        })

        //checks commissions table action buttons work as expected
        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === 'Actions') {

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-clipboard"]').click();

                cy.get('[data-qa="search.account"]').should('be.visible');
                cy.intercept('**/staging.givenergy.cloud/commission').as('commissionAPI');
                cy.get('[data-qa="main.navbar"]').children().eq(0).click();
                cy.get('[data-qa="main.navbar"]').contains('Commissions').click();
                cy.wait('@commissionAPI', {timeout: 30000});
                cy.get('[data-qa="search"]').should('be.visible').click();

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-magnify"]').click();

                cy.get('[data-qa="title.viewCommission"]').should('be.visible');
                cy.intercept('**/staging.givenergy.cloud/commission').as('commissionAPI');
                cy.get('[data-qa="main.navbar"]').children().eq(0).click();
                cy.get('[data-qa="main.navbar"]').contains('Commissions').click();
                cy.wait('@commissionAPI', {timeout: 30000});
                cy.get('[data-qa="search"]').should('be.visible').click();

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-delete"]').click();

                cy.get('[data-qa="card.delete"]').should('be.visible').contains('Delete Commission');
                cy.get('[data-qa="button.cancel"]').click();
                cy.get('[data-qa="card.delete"]').should('not.be.visible');

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-delete"]').click();
                cy.get('[data-qa="card.delete"]').should('be.visible').contains('Delete Commission');
                cy.get('[data-qa="button.delete"]').click();

                cy.get('div[class="v-snack__content"]').should('be.visible');

            }
        });

    })
});
