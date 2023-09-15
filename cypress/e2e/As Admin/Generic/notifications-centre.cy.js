import { dashboardSelect } from "../../../funcs";
import { customerLogin } from "../../../logins";

describe("Notifications centre", () => {
    it("tests Notifications centre", () => {
      cy.viewport(1920, 1080);
      customerLogin()
      
      dashboardSelect('Notifications');

      //checks notification centre opens, and marks all as read and checks title exists and notification counter is at 0
      cy.get('[data-qa="title.notifications"]').contains('Notifications');
      cy.get('[data-qa="button.allRead"]').click();
      cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').should('not.have.value');
      cy.get('[data-qa="notification.title"]').should('exist',);
      cy.get('[data-qa="notification.content"]').should('exist');

      //checks that the number of notifications increases and decreases with the notifications being read and unread
      cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-check-outline"]').click();
      cy.wait(1000);
      cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
        
        const text = $span.text()
        const num = Number(text)

        if (num === 0) {
          throw new Error('Notifications counter has not updated')
        }

        cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-outline"]').click();
        cy.wait(1000);
        cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
        
          const text2 = $span.text()
          const num2 = Number(text2)
  
          if (num2 !== 0) {
            throw new Error('Notifications counter has not updated')
          }
        })
      })
      cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-check-outline"]').click();

      
      //checks that archiving a notification will add it to the top of the archived list
      //gets the top notifications title and then archies it and navigate to the archived inbox
      cy.get('[data-qa="notification.title"]').eq(0).then(($div) => {

        const text = $div.text()

        cy.get('[data-qa="notification.archive"]').eq(0).click();
        cy.get('[data-qa="button.archiveToggle"]').click();

        //checks the top notifications title in the archived inbox to see if it is the same as before
        cy.get('[data-qa="notification.title"]').eq(0).then(($div2) => {

          const text2 = $div2.text()
          if (text !== text2) {
            throw new Error('Newest notification was archived and was not found at the top of the list in archived.')
          }

          cy.get('[data-qa="notification.archive"]').eq(0).click();
        })

      });


      //tests refresh and close button
      cy.get('[data-qa="button.refresh"]').click();
      cy.get('[data-qa="button.close"]').click();
      cy.get('[data-qa="title.notifications"]').should('not.be.visible');
    })
  });