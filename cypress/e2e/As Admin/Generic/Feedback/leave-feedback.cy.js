import { dashboardSelect } from "../../../../funcs";
import { adminLogin } from "../../../../logins";

describe("leave feedback", () => {
    it("tests leave feedback", () => {

      //sets viewport and logs in
      cy.viewport(1920, 1080);
      adminLogin();

      //navigates to leave feedback
      dashboardSelect('Leave Feedback');

      cy.get('[data-qa="title.text"]').contains('Leave Feedback');
      cy.get('[data-qa="link.faq"]').click();
      cy.get('[data-qa="link.knownissues"]').click();
      cy.get('[data-qa="text.contact"]').contains('support@givenergy.co.uk')
      cy.get('[data-qa="text.contact"]').contains('01377 254 874')
  
      //create feedback
      cy.get('[data-qa="select.product"]').click();
      cy.get('div[class*="v-menu__content"]').children().contains('App').click();
      cy.get('[data-qa="select.feedbacktype"]').click();
      cy.get('div[class*="v-menu__content"]').children().contains('Bug Report').click();
      cy.get('[data-qa="field.title"]').type('Feedback Test');
      cy.get('[data-qa="field.content"]').type('Test content.');
      cy.get('[data-qa="checkbox.contacted"]').parent().click();
      cy.get('[data-qa="checkbox.contacted"]').parent().click();
      cy.get('[data-qa="checkbox.mentioned"]').parent().click();
      cy.get('[data-qa="checkbox.mentioned"]').parent().click();
      cy.get('[data-qa="button.submit"').click();
      cy.get('i[class*="mdi-check-circle"]').parent().contains('Your feedback has been successfully submitted!');

    });
  });
  