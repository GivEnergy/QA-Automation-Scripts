import { checkMarkAsReadWorks, checksCounterIncreasesAndDecreases } from "../../../funcs";
import { adminLogin } from "../../../logins";
describe("Notifications centre", () => {
    it("tests Notifications centre", () => {

      cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
      adminLogin();
      //creates alias for dashboard API request

      cy.wait('@dashboardAPI', {timeout: 30000});
      //checks notifications tab opens and refresh and close buttons work
      cy.get('[data-qa="icon.notification"]').as('icon');
      cy.get('@icon').scrollIntoView();
      cy.get('@icon').click();
      cy.get('[data-qa="button.refresh"]').click();
      cy.get('[data-qa="button.close"]').click();
      cy.get('[data-qa="title.notifications"]').should('not.be.visible');
      cy.get('@icon').scrollIntoView();
      cy.get('@icon').click();
      cy.get('[data-qa="title.notifications"]').contains('Notifications');
      //checks notification reading updates counter
      cy.get('@icon').next().find('span[class*="v-badge__badge"]').then(($span): void  => {
        
        const text: string = $span.text()
        const num: number = Number(text)

        if (num !== 0) {

          checkMarkAsReadWorks(true);

        } else {

          checksCounterIncreasesAndDecreases();
          checkMarkAsReadWorks(false);

        }
      });
            
      //checks that archiving a notification will add it to the top of the archived list
      //gets the top notifications title and then archives it and navigate to the archived inbox
      cy.get('[data-qa="notification.title"]').eq(0).then(($div): void  => {

        const text: string = $div.text()

        cy.get('[data-qa="notification.archive"]').eq(0).click();
        cy.get('[data-qa="button.archiveToggle"]').click();

        //checks the top notifications title in the archived inbox to see if it is the same as before
        cy.get('[data-qa="notification.title"]').eq(0).then(($div2): void  => {

          const text2: string = $div2.text()
          if (text !== text2) {
            throw new Error('Newest notification was archived and was not found at the top of the list in archived.')
          }

          cy.get('[data-qa="notification.archive"]').eq(0).click();

        })

      });
      
    })
  });