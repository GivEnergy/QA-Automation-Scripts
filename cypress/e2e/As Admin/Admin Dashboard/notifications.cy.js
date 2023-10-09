import { dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("notifications", () => {
  it("tests notifications", () => {

      //set viewport and login
      adminLogin();

      //navigates to notifications and checks page loads
      dashboardSelect('Admin Dashboard', 'Notifications');
      cy.get('[data-qa="title.heading"]').contains('Pending Notifications');

      //send notification to specific account
      cy.get('[data-qa="button.create"]').contains('Create Notification').click();
      cy.get('[data-qa="title.heading"]').contains('Generate Notification');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="select.sendto"]').click();
      cy.get('div[class*="v-select-list"]').children().contains('Specific Account').click();
      cy.get('[data-qa="search.user"]').parent().find('label').next().type('GivEnergy');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('div[class*="v-select-list"]').click().type('{downArrow}').type('{enter}').click();
      cy.get('[data-qa="field.subject"]').type('Test subject');
      cy.get('[data-qa="field.greeting"]').type('Hello!');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="button.addaction"]').click();
      cy.get('[data-qa="field.actiontext"]').type('test link');
      cy.get('[data-qa="field.actionurl"]').type('https://givenergy.cloud/login');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="textarea.paragraph"]').type('Test paragraph');
      cy.get('[data-qa="button.submit"]').click();
      cy.get('[data-qa="button.cancel"]').click();
      cy.get('[data-qa="button.submit"]').click();
      cy.get('[data-qa="button.send"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent()
        .contains('Notification Created Successfully! Someone else will need to validate it for you before it is sent');

      //send notification to accounts of certain type
      cy.get('[data-qa="button.create"]').contains('Create Notification').click();
      cy.get('[data-qa="title.heading"]').contains('Generate Notification');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="select.sendto"]').click();
      cy.get('div[class*="v-select-list"]').children().contains('All Accounts of a Certain Type').click();
      cy.get('[data-qa="select.type"]').parent().type('Super Engineer');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="field.subject"]').type('Test subject');
      cy.get('[data-qa="field.greeting"]').type('Hello!');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="button.addaction"]').click();
      cy.get('[data-qa="field.actiontext"]').type('test link');
      cy.get('[data-qa="field.actionurl"]').type('https://givenergy.cloud/login');
      cy.get('[data-qa="button.submit"]').should('not.be.enabled');
      cy.get('[data-qa="textarea.paragraph"]').type('Test paragraph');
      cy.get('[data-qa="button.submit"]').click();
      cy.get('[data-qa="button.cancel"]').click();
      cy.get('[data-qa="button.submit"]').click();
      cy.get('[data-qa="button.send"]').click();
      cy.get('i[class*="mdi-check-circle"]').parent()
        .contains('Notification Created Successfully! Someone else will need to validate it for you before it is sent');
      
    });
  });
  