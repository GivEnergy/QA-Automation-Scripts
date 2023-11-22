import { adminLogin } from "../../../logins";
import { dashboardSelect, changePassword } from "../../../funcs";

describe("Account settings password", () => {
    it("tests changing the account settings password works", () => {

        //sets viewport and logs in
        adminLogin();

        //changes details back
        dashboardSelect('Account Settings');
        cy.wait(3000);

        //goes to manage security and changes password
        cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
        changePassword(Cypress.env('adminPassword'), Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword') + '456', 'first');
        changePassword(Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword'), Cypress.env('incorrectPassword'), 'second');
        changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), 'third');
    });
});
