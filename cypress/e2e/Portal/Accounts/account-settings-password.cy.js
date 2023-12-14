import { adminLogin } from "../../../logins";
import { dashboardSelect, changePassword } from "../../../funcs";

//this should prevent any tests from hanging
const time = 60000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Account settings password", () => {
    it("tests changing the account settings password works", () => {

        adminLogin();

        dashboardSelect('Account Settings');

        cy.get('[data-qa="link.button.security"]').as('security');
        cy.get('@security').contains('Manage Account Security');
        cy.get('@security').click();
        changePassword(Cypress.env('adminPassword'), 'NotARealPassword123!', 'NotARealPassword123!' + '456', 'first');
        changePassword('NotARealPassword123!', 'NotARealPassword123!', 'NotARealPassword123!', 'second');
        changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), 'third');
    });
});
