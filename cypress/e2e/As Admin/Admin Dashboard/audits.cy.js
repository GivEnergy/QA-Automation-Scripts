import { adminLogin } from "../../../logins";

describe("audits", () => {
    it("tests audits", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to audits
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('Audits').click();
    cy.get('div').contains('Audits').click();

    //checks page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear().type('1').type("{enter}");

    //checks table data format
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').eq(6).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    };

    //check search, filters, pop up and format
    cy.get('label').contains('Search by User').next().type('DanLambert');
    cy.get('span').contains('DanLambert').click();
    cy.get('label').contains('Record Type').next().click();
    cy.get('span').contains('Account').click();
    cy.get('label').contains('Events').next().click();
    cy.get('.v-list-item__content').find('div').contains('Created').click();
    for (var i = 0; i < 9; i++){
        cy.get('tbody').children().eq(i).find('td').eq(6).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    };
    cy.get('tbody').children().eq(0).find('td').eq(0).click();
    cy.get('td').contains('user_role').should('be.visible');
    cy.get('tbody').children().eq(0).find('td').eq(2).click();
    cy.get('b').contains('Username:').should('be.visible');
    cy.get('tbody').children().eq(0).find('td').eq(5).click();
    cy.get('b').contains('Account Type:').should('be.visible');
    });
});