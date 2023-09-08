import { dashboardSelect } from "../../../../funcs";
import { adminLogin } from "../../../../logins";

describe("leave feedback", () => {
    it("tests leave feedback", () => {

      //sets viewport and logs in
      cy.viewport(1920, 1080);
      adminLogin();

      //navigates to leave feedback
      dashboardSelect('Leave Feedback');

      cy.get('[data-cy="create.title.feedback"]').contains('Leave Feedback');
      cy.get('[data-cy="feedback.link.faq"]').click();
      cy.get('[data-cy="feedback.link.knownissues"]').click();
      cy.get('[data-cy="feedback.text.contact"]').contains('support@givenergy.co.uk')
      cy.get('[data-cy="feedback.text.contact"]').contains('01377 254 874')
  
      //create feedback
      cy.get('[data-cy="feedbackform.select.product"]').click();
      cy.get('div[class*="v-menu__content"]').children().contains('App').click();
      cy.get('[data-cy="feedbackform.select.feedbacktype"]').click();
      cy.get('div[class*="v-menu__content"]').children().contains('Bug Report').click();
      cy.get('[data-cy="feedbackform.field.title"]').type('Feedback Test');
      cy.get('[data-cy="feedbackform.field.content"]').type('Test content.');
      cy.get('[data-cy="feedbackform.checkbox.contacted"]').parent().click();
      cy.get('[data-cy="feedbackform.checkbox.contacted"]').parent().click();
      cy.get('[data-cy="feedbackform.checkbox.mentioned"]').parent().click();
      cy.get('[data-cy="feedbackform.checkbox.mentioned"]').parent().click();
      cy.get('[data-cy="feedbackform.button.submit"').click();
      cy.get('i[class*="mdi-check-circle"]').parent().contains('Your feedback has been successfully submitted!');

    });
  });
  