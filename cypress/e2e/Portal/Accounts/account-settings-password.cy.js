import { adminLogin } from "../../../logins";
import { dashboardSelect, changePassword } from "../../../funcs";

const time = 60000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Account settings password", () => {
    it("tests changing the account settings password works", () => {

        //sets viewport and logs in
        adminLogin();

        //changes details back
        dashboardSelect('Account Settings');

        //goes to manage security and changes password
        cy.get('[data-qa="link.button.security"]').as('security');
        cy.get('@security').contains('Manage Account Security');
        cy.get('@security').click();
        changePassword(Cypress.env('adminPassword'), 'NotARealPassword123!', 'NotARealPassword123!' + '456', 'first');
        changePassword('NotARealPassword123!', 'NotARealPassword123!', 'NotARealPassword123!', 'second');
        changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), 'third');
    });
});
