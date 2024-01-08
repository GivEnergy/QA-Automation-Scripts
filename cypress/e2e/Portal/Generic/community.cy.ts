import {adminLogin} from "../../../logins";

describe("Community", () => {
    it("tests community nav bar link", () => {

        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        adminLogin();
        //creates alias for dashboard API request
        cy.wait('@dashboardAPI', {timeout: 30000});
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains("Community").as('communityTab');
        cy.get('@communityTab').should('be.visible');
        cy.get('@communityTab').then(($el) : void => {

            const url: string = $el.attr('href');

            if (url !== "https://community.givenergy.cloud") {
                throw new Error("Error: community nav bar item does not have correct community forum URL");
            } else {
                cy.log("Community tab URL is correct");
            }
        });

    });
});