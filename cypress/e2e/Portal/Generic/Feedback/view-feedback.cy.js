import { checkPageNav, dashboardSelect, getNum, tableRegex, tableContains, tableClick, closeFeedback } from "../../../../funcs";
import { adminLogin } from "../../../../logins";
import { dateAndTime } from "../../../../regex";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});

let trIndex= 1;

describe("view feedback", () => {
    it("tests view feedback", () => {

      adminLogin();
      //creates alias for dashboard API request
      cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
      cy.intercept('**/staging.givenergy.cloud/feedback').as('feedbackAPI');
      //navigates to leave feedback
      dashboardSelect('View Feedback');
      cy.wait('@feedbackAPI', {timeout: 30000});
      cy.get('[data-qa="title"]').contains('Feedback').click();

      //check function description
      cy.get('[data-qa="table"]').find('th').each(($el, index) => {

        const heading = $el.text()

        if (heading === 'Last Action By') {

          closeFeedback(trIndex, index);

        }
      })

      checkPageNav();

      //check table format
      tableRegex('Reported At', dateAndTime, 'Invalid date and time format');
      tableRegex('Last Action Time', dateAndTime, 'Invalid date and time format');
      tableClick('Reported By', 'Username:');
      tableClick('Last Action By', 'Account Type:');

      //check show closed works (fails if number of feedbacks does not increase when show close is clicked)
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordClose"]').click();
      cy.get('[data-qa="container.navigation"]').find('div').next().then(($div) => {

        const num = getNum($div);
        cy.get('[data-qa="button.showClosed"]').parent().click();
        cy.wait(2000);//this is necessary or error will be thrown when comparing amount of records

        cy.get('[data-qa="container.navigation"]').find('div').next().then(($div2) => {

          const num2 = getNum($div2);
          console.log('records before closed ' + num, 'records after closed ' + num2);
          if (num2 <= num) {
            throw new Error('Show Closed Did Not Work')
          } 
        })

      });
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordOpen"]').click();

      //tests search and filter
      cy.get('[data-qa="select.product"]').click();
      cy.get('div[class*="v-select-list"]').children().contains('App').click();
      cy.get('[data-qa="title"]').contains('Feedback').click();
      cy.wait(2000);
      cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
        
          const text1 = $elm.text()
    
          if (text1 === 'Product') {
    
              cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
              
              const text2 = $td.text().split(' ')[2]

              if (text2 !== 'App') {
                throw new Error('Error found when using product filter')
              }
            })
          }
      })
      cy.get('button[class*="mdi-close"]').click();

      //checks type filter works
      cy.get('[data-qa="select.type"]').click();
      cy.get('div[class*="v-select-list"]').children().contains('Bug').click();
      cy.get('[data-qa="title"]').contains('Feedback').click();
      cy.wait(2000);
      cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
        
          const text1 = $elm.text()
    
          if (text1 === 'Type') {
    
              cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
              
              const text2 = $td.text().split(' ')[2]

              if (text2 !== 'Bug') {
                throw new Error('Error found when using type filter')
              }
            })
          }
      })
      cy.get('button[class*="mdi-close"]').click();

      //uses select record options and checks if closing feedback works
      cy.get('[data-qa="container.navigation"]').find('li').first().next().click();
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordClose"]').click();
      cy.wait(1000);
      tableContains('Closed', 'Yes', 'Error found when checking if a ticket shows if it is closed 1');
      cy.wait(1000);
      cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
      cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
      cy.get('[data-qa="button.recordOpen"]').click();
      cy.wait(1000);
      tableContains('Closed', 'No', 'Error found when checking if a ticket shows if it is closed 2');

      //check view feedback title
      cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

        const text = $th.text()

        if (text === 'Title') {

          cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {

            const text1 = $td.text()

            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().click();

            cy.get('[data-qa="title.text"]').then(($div) => {

              const text2 = $div.text()
    
              if (text1 !== text2) {
                throw new Error('View feedback title is different to title shown in table')
              }
    
            })

          })
        }
      });

      //goes back to view feedback and check view feedback content
      cy.get('[data-qa="main.navbar"]').children().eq(0).click();
      cy.get('[data-qa="main.navbar"]').contains('View Feedback').click();
      cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

        const text = $th.text()

        if (text === 'Content') {

          cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {

            const text1 = $td.text()

            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().click();

            cy.get('[data-qa="textarea"]').then(($textarea) => {

              
              const str = $textarea.val()
              const text2 = str.substring(0, 50).trimEnd() + '...'
              console.log('substring from table ' + text1, 'created substring when viewing feedback ' + text2);
              if (text1 !== text2) {
                throw new Error('View feedback content substring is different to content substring shown in table')
              }
    
            })

          })
        }
      });

    });
});
  