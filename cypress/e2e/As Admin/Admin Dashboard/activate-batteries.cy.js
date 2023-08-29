import { adminLogin } from "../../../logins";
import { dashboardSelect, checkPageNav, handleError } from "../../../funcs";

describe("activate batteries", () => {
    it("tests activate batteries", () => {
        cy.on("uncaught:exception", (e, runnable) => {
          return handleError(e, runnable);
        });
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to firmware updates
    dashboardSelect('Admin Dashboard', 'Activate Batteries', 'Activating Batteries')

    //checks show finished button and page navigation
    cy.get('label').contains('Show Finished').click();
    checkPageNav();
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').first().contains(/^[a-zA-Z]{2,}\w{5,}[0-9]{3,}/);
        cy.get('tbody').children().eq(i).find('td').eq(1).contains(/^[R][u][n][n][i][n][g]|^[C][a][n][c][e][l][l][e][d]$/);
        cy.get('tbody').children().eq(i).find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(3).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(5)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{3,}\s[a-z]{3,}[)]$/);
        cy.get('tbody').children().eq(i).find('td').last().contains(/^|^[a-zA-Z]{2,}\w{5,}[0-9]{3,}/);
    };
    cy.get('label').contains('Show Finished').click();
    
    //checks table data format
    for (var i = 0; i < 6; i++){
        cy.get('tbody').children().eq(i).find('td').first().contains(/^[a-zA-Z]{2,}\w{5,}[0-9]{3,}/);
        cy.get('tbody').children().eq(i).find('td').eq(1).contains('Running');
        cy.get('tbody').children().eq(i).find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(3).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(5)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(6)
            .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{4,}\s[a-z]{3,}[)]$/);
    };

    //checks search and data
    cy.get('label').contains('Inverter Serial').next().type('CE').type("{enter}");;
    cy.get('tbody').children().eq(0).find('td').first().contains(/^[C][E]\w{5,}[0-9]{3,}/);
    cy.get('tbody').children().eq(0).find('td').eq(1).contains('Running');
    cy.get('tbody').children().eq(0).find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tbody').children().eq(0).find('td').eq(3).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tbody').children().eq(0).find('td').eq(5)
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tbody').children().eq(0).find('td').eq(6)
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}\s[(]\d{1,}\s[a-z]{4,}\s[a-z]{3,}[)]$/);
    

    });
});