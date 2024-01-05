import { adminLogin } from "../../../logins";
import { dashboardSelect, changePassword } from "../../../funcs";

describe("Account settings password", () => {
    it("tests changing the account settings password works", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/staging.givenergy.cloud/account-settings').as('accountSettingsAPI');
        dashboardSelect('Account Settings');
        cy.wait('@accountSettingsAPI', {timeout: 30000});


        cy.get('[data-qa="link.button.security"]').as('security');
        cy.get('@security').contains('Manage Account Security');
        cy.get('@security').click();
        changePassword(Cypress.env('adminPassword'), 'NotARealPassword123!', 'NotARealPassword123!456', 'first');
        changePassword('NotARealPassword123!', 'NotARealPassword123!', 'NotARealPassword123!', 'second');
        changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), 'third');
    });
});
