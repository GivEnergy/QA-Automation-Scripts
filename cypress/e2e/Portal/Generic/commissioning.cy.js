import { adminLogin } from "../../../logins";
import { checkPageNav, dashboardSelect, tableCheck } from "../../../funcs";
import { dateAndTime } from "../../../regex";

describe("commissions", () => {
    it("tests commissions", () => {

        adminLogin();

        dashboardSelect('Commissions');

        //initial check of page and clicks on create commission
        cy.get('[data-qa="search"]').should('be.visible').click();
        checkPageNav();

        cy.get('[data-qa="card.commissions"]').should('be.visible');
        cy.get('[data-qa="title.commissions"]').contains('Commissions');
        cy.get('[data-qa="button.create"]').contains('Create Commission').click();
        cy.get('[data-qa="search.account"]').should('be.visible');

        dashboardSelect('Commissions');
        cy.get('[data-qa="search"]').should('be.visible').click();

        //check table and deletes created commission
        tableCheck('Started At', dateAndTime, 'Error: Started At time and date using incorrect format');
        tableCheck('Last Updated At', dateAndTime, 'Error: Last Updated At time and date using incorrect format');

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

        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === 'Actions') {

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-clipboard"]').click();

                cy.get('[data-qa="search.account"]').should('be.visible');
                dashboardSelect('Commissions');
                cy.get('[data-qa="search"]').should('be.visible').click();

                cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i[class*="mdi-magnify"]').click();

                cy.get('[data-qa="title.viewCommission"]').should('be.visible');
                dashboardSelect('Commissions');
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
