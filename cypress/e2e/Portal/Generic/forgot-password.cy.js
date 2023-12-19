//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});
describe("forgot password", () => {
    it("tests forgot password", () => {
      //commented code is for an additional check that checks received email works to reset password
      //may be added in if staging emails work

      //Cypress.config('defaultCommandTimeout', 30000);
      //Cypress.config('requestTimeout', 30000);
      // //setups up temp email and inbox
      // cy.createInbox().then((inbox) => {
        
      // assert.isDefined(inbox)

      // let inboxId = inbox.id
      // let emailAddress = inbox.emailAddress;

      //visits page
      //creates alias for login API request
      cy.intercept('**/staging.givenergy.cloud/login').as('loginAPI');
      cy.visit("https://staging.givenergy.cloud/login");

      //waits for login API request to be successful
      cy.wait('@loginAPI', {timeout: 30000});

      //logs in and changes email to temp email
      // adminLogin();
      // dashboardSelect('Account Settings');
      // cy.get('[data-qa="form.field.email"]').clear().type(emailAddress);
      // cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
      // cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
      // dashboardSelect('Logout');

      //navigates to forgot password page
      //checks you can enter an incorrect username and get confirmation
      //checks you can enter a correct username and get confirmation
      cy.location('pathname').should('include', '/login');
      cy.get('[data-qa="link.forgotPW"]').should('be.visible');
      cy.get('[data-qa="link.forgotPW"]').click();
      cy.get('[data-qa="form.link.back"]').click();
      cy.get('[data-qa="link.forgotPW"]').click();
      cy.get('[data-qa="title.text"]').contains('Forgot your password?');
      cy.get('[data-qa="form.field.username"]').click();
      cy.get('[data-qa="form.button.submit"]').should('be.disabled');
      cy.get('[data-qa="form.field.username"]').type('NotARealUsername123');
      cy.get('[data-qa="form.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
        .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');
      cy.get('[data-qa="form.link.back"]').click();
      cy.get('[data-qa="link.forgotPW"]').click();
      cy.get('[data-qa="form.field.username"]').type(Cypress.env('adminUsername'));
      cy.get('[data-qa="form.button.submit"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent().find('p')
      .contains('If this account exists, instructions on how to reset the password have been sent its registered email address.');

      // cy.waitForLatestEmail(inboxId).then(email => {

      //   assert.isDefined(email);

      //   console.log(email, email.body);

      /* follows link in email and changes password to Cypress.env('adminPassword') and then logs
      in using this password and then changes the email back to what it should be*/

            //changes email back
      //   cy.get('[data-qa="form.link.back"]').click();
      //   adminLogin();
      //   dashboardSelect('Account Settings');
      //   cy.get('[data-qa="form.field.email"]').clear().type());
      //   cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
      //   cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
      //});
    //});
  });
});