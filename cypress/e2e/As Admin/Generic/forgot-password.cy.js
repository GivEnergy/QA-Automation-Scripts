import { dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("forgot password", () => {
    it("tests forgot password", () => {
      //Cypress.config('defaultCommandTimeout', 30000);
      //Cypress.config('requestTimeout', 30000);
      // //setups up temp email and inbox
      // cy.createInbox().then((inbox) => {
        
      // assert.isDefined(inbox)

      // let inboxId = inbox.id
      // let emailAddress = inbox.emailAddress;

      //visits page
      cy.visit("http://localhost/login"); //remove this when mailslurp is added

      //logs in and changes email to temp email
      // adminLogin();
      // dashboardSelect('Account Settings');
      // cy.get('[data-qa="form.field.email"]').clear().type(emailAddress);
      // cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
      // cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
      // cy.visit('https://staging.givenergy.cloud/login');

      cy.get('[data-qa="link.forgotpw"]').click();
      cy.get('[data-qa="form.link.back"]').click();
      cy.get('[data-qa="link.forgotpw"]').click();
      cy.get('[data-qa="title.text"]').contains('Forgot your password?');
      cy.get('[data-qa="form.field.username"]').click();
      cy.get('[data-qa="form.button.submit"]').should('be.disabled');
      cy.get('[data-qa="form.field.username"]').type(Cypress.env('incorrectUsername'));
      cy.get('[data-qa="form.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
        .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');
        cy.get('[data-qa="form.field.username"]').type(Cypress.env('adminUsername'));
        cy.get('[data-qa="form.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
      .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');

      // cy.waitForLatestEmail(inboxId).then(email => {
        
      //   assert.isDefined(email);
        
      //   console.log(email, email.body);

            //changes email back
      //   cy.get('[data-qa="form.link.back"]').click();
      //   adminLogin();
      //   dashboardSelect('Account Settings');
      //   cy.get('[data-qa="form.field.email"]').clear().type(Cypress.env('adminEmail'));
      //   cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
      //   cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
      //});
    //});
  });
});