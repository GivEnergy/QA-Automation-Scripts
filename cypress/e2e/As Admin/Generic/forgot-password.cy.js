describe("forgot password", () => {
    it("tests forgot password", () => {

      //visits page and sets viewport
      cy.visit("http://localhost/login");
      cy.viewport(1920, 1080);

      cy.get('[data-cy="login.link.forgotpw"]').click();
      cy.get('[data-cy="forgotpassword.title.text"]').contains('Forgot your password?');
      cy.get('[data-cy="forgotform.field.username"]').click();
      cy.get('[data-cy="forgotform.button.submit"]').should('be.disabled');
      cy.get('[data-cy="forgotform.field.username"]').type('byvbuyebwsvuiev124');
      cy.get('[data-cy="forgotform.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
        .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');
        cy.get('[data-cy="forgotform.field.username"]').type(Cypress.env('adminUsername'));
        cy.get('[data-cy="forgotform.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
      .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');
    });
  });