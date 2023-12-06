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

describe("forgot password", () => {
    it("tests forgot password", () => {
      cy.failTestIfTooLong(40000);
      //Cypress.config('defaultCommandTimeout', 30000);
      //Cypress.config('requestTimeout', 30000);
      // //setups up temp email and inbox
      // cy.createInbox().then((inbox) => {
        
      // assert.isDefined(inbox)

      // let inboxId = inbox.id
      // let emailAddress = inbox.emailAddress;

      //visits page
      cy.visit("https://staging.givenergy.cloud/login"); //remove this when mailslurp is added

      //logs in and changes email to temp email
      // adminLogin();
      // dashboardSelect('Account Settings');
      // cy.get('[data-qa="form.field.email"]').clear().type(emailAddress);
      // cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
      // cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
      // dashboardSelect('Logout');

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