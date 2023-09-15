import { checkPageNav, dashboardSelect, getNum } from "../../../../funcs";
import { adminLogin } from "../../../../logins";
import { dateAndTime } from "../../../../regex";

describe("view feedback", () => {
    it("tests view feedback", () => {

      //sets viewport and logs in
      adminLogin();

      //navigates to leave feedback
      dashboardSelect('View Feedback');

      cy.get('[data-qa="title"]').contains('Feedback').click();

      //checkPageNav();

      //check table format
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(6).contains(dateAndTime);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(8).contains(dateAndTime);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(5).find('span').eq(0).click();
      //cheks pop up
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(7).find('span').eq(0).click();
      //checks pop up 

      //check show closed works (fails if number of feedbacks does not increase when close is clicked)
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordClose"]').click();
      cy.wait(2000);
      cy.get('[data-qa="container.navigation"]').find('div').next().then(($div) => {

        const num = getNum($div)
        cy.get('[data-qa="button.showClosed"]').parent().click();
        cy.wait(2000);

        cy.get('[data-qa="container.navigation"]').find('div').next().then(($div2) => {

          const num2 = getNum($div2)

          if (num2 <= num) {
            throw new Error('Show Closed Did Not Work')
          } 
        })

      });
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordOpen"]').click();

      //tests search and filter
      cy.get('[data-qa="select.product"]').type('App').type('{enter}');
      //cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(1).contains('App');
      cy.get('[data-qa="select.type"]').type('Bug').type('{enter}');
      //cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(2).contains('Bug Report');
      cy.get('[data-qa="search"]').type('Test').type('{enter}');
      cy.get('button[class*="mdi-close"]').click();

      //uses select record options
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordClose"]').click();
      cy.wait(1000);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(9).contains('Yes');
      cy.wait(1000);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordOpen"]').click();
      cy.wait(1000);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(9).contains('No');

      //check view feedback title
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(3).then(($td) => {

        const text = $td.text() 

        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(10).click();

        cy.get('[data-qa="title.text"]').then(($div) => {

          const text2 = $div.text()

          if (text !== text2) {
            throw new Error('View feedback title is different to title shown in table')
          }

        })

      });

      //goes back to view feedback and check view feedback content
      dashboardSelect('View Feedback');
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(4).then(($td) => {

        const text = $td.text() 

        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(10).click();

        cy.get('[data-qa="textarea"]').then(($textarea) => {

          const str = $textarea.val()
          const text2 = str.substring(0, 50) + '...'

          if (text !== text2) {
            throw new Error('View feedback content substring is different to content substring shown in table')
          }

        })
      });

      //need to add in commenting on marking as closed and checkuing repoted and last action by 


    });
});
  