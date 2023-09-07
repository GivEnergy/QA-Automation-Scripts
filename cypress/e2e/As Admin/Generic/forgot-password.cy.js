describe("forgot password", () => {
    it("tests forgot password", () => {

      //visits page and sets viewport
      cy.visit("http://localhost/login");
      cy.viewport(1920, 1080);

      cy.get('[data-cy="login.link.forgotpw"]').click();
      cy.get("#input-40").click();
      cy.get("div.v-card__actions").click();
      cy.get("div.v-card__text").contains('This field is required')
      cy.get("#input-40").click();
      cy.get("#input-40").type("cbucaweouyvbvubewwovw");
      cy.get("div.container span").click();
      cy.get("p").contains('If this account exists, instructions on how to reset the password have been sent its registered email address.')
      cy.get("#input-40").click();
      cy.get("#input-40").type(Cypress.env('adminUsername'));
      cy.get("div.container span").click();
      cy.get("p").contains('If this account exists, instructions on how to reset the password have been sent its registered email address.')
    });
  });