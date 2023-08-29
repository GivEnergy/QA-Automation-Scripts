import { adminLogin } from "../../../logins"


describe("dashboard search", () => {
    it("tests dashboard search", () => {
      cy.viewport(1920, 1080);
      adminLogin()

      //checks search for user
      cy.get('label').contains('Enter a User').next('input').type('chemical_lane');
      cy.get('.v-application--wrap').next().find('div').first().should('have.length', 1);
      cy.get('.v-application--wrap').next().find('div').first().find('span').contains('chemical_lane');

      //checks search for inverter
      cy.get('label').contains('Search for an inverter').next('input').type('FD2249G799');
      cy.get('.v-application--wrap').next().next().find('div').first().should('have.length', 1);
      cy.get('.v-application--wrap').next().next().find('div').first().find('span').contains('FD2249G799');
    });
  });

