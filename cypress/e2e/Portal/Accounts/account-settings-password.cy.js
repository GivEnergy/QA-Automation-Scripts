Cypress.Commands.add('failTestIfTooLong', (timeout = 120000) => {

    let timeoutId;

    beforeEach(() => {
        timeoutId = setTimeout(() => {
            throw new Error(`Test failed: exceeded run time limit of ${timeout}ms`);
        }, timeout);
    });

    afterEach(() => {
        clearTimeout(timeoutId); // Clear the timeout at the end of each test
    });
});

import { adminLogin } from "../../../logins";
import { dashboardSelect, changePassword } from "../../../funcs";

describe("Account settings password", () => {
    it("tests changing the account settings password works", () => {
        cy.failTestIfTooLong(70000);
        //sets viewport and logs in
        adminLogin();

        //changes details back
        dashboardSelect('Account Settings');
        cy.wait(3000);

        //goes to manage security and changes password
        cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
        changePassword(Cypress.env('adminPassword'), 'NotARealPassword123!', 'NotARealPassword123!' + '456', 'first');
        changePassword('NotARealPassword123!', 'NotARealPassword123!', 'NotARealPassword123!', 'second');
        changePassword(Cypress.env('adminPassword'), Cypress.env('adminPassword'), Cypress.env('adminPassword'), 'third');
    });
});
