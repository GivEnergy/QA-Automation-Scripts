import { adminLogin } from "../../../logins";

//doesnt work search input cannot be selected
describe("my inverter card", () => {
    it("tests my inverter card", () => {
      cy.viewport(1920, 1080);
      adminLogin()

      cy.get(".v-navigation-drawer__content").click().get('div').contains('Dashboard Cards').click();
      cy.get('nav').next().find('.v-card__title').contains('My Inverter')
        .parent().children().eq(4).find('button').click();
      cy.get('.v-card__title').children().eq(0).contains('Inspect')
        .children().eq(0).contains('My Inverter');
      cy.get('span').contains('View').should('be.disabled');
      cy.get('label').contains('Search for a User').next().type('Chemical Lane');
      cy.get('span').contains('Chemical Lane').click();
      cy.get('span').contains('View').click();
      cy.get('span').contains('EMS2234010').click();
      cy.get('span').contains('Chemical Lane').click();

      //needs to check if display as standalone works
      
    });
  });
  