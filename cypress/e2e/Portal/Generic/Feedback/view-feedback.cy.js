import { checkPageNav, dashboardSelect, tableRegex, tableContains,  } from "../../../../funcs";
import { adminLogin } from "../../../../logins";
import { dateAndTime } from "../../../../regex";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});

describe("view feedback", () => {
    it("tests view feedback table updates", () => {

      adminLogin();
      //creates alias for dashboard API request
      cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
      cy.intercept('**/staging.givenergy.cloud/feedback').as('feedbackAPI');
      //navigates to leave feedback
      dashboardSelect('View Feedback');
      cy.wait('@feedbackAPI', {timeout: 30000});
      cy.get('[data-qa="title"]').contains('Feedback').click();

      checkPageNav();

      //check table format
      tableRegex('Reported At', dateAndTime, 'Invalid date and time format');
      tableRegex('Last Action Time', dateAndTime, 'Invalid date and time format');

      //check show closed works (fails if number of feedbacks does not increase when show close is clicked)
      cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($el, index) => {

        const heading= $el.text();

        if (heading === "Title") {
          cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {

            const title = $td.text();

            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
            cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
            cy.get('[data-qa="button.recordClose"]').click();
            cy.intercept('**/paginate/feedback?page=1&itemsPerPage=15').as('tableUpdateAPI');
            cy.get('[data-qa="button.showClosed"]').parent().click();
            cy.wait('@tableUpdateAPI', {timeout: 30000});
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td2) => {

              const closedTitle = $td2.text();

              if (title !== closedTitle) {
                throw new Error("Error could not find closed feedback when show closed is enabled");
              }

            });
          });
        }
      });

      //tests product filter
      cy.get('[data-qa="select.product"]').click();
      cy.intercept('**/paginate/feedback?page=1&itemsPerPage=15').as('tableUpdateAPI');
      cy.get('div[class*="v-select-list"]').children().contains('App').click();
      cy.get('[data-qa="title"]').contains('Feedback').click();
      cy.wait('@tableUpdateAPI', {timeout: 30000});
      tableContains("Product", "App", "Error: expected product column to contain 'App'");
      cy.get('button[class*="mdi-close"]').click();

      //checks type filter works
      cy.get('[data-qa="select.type"]').click();
      cy.intercept('**/paginate/feedback?page=1&itemsPerPage=15').as('tableUpdateAPI');
      cy.get('div[class*="v-select-list"]').children().contains('Bug').click();
      cy.get('[data-qa="title"]').contains('Feedback').click();
      cy.wait('@tableUpdateAPI', {timeout: 30000});
      tableContains("Type", "Bug Report", "Error: expected Type column to contain 'Bug'");
    });

  it("tests viewing a feedback shows the same information as the table", () => {

    adminLogin();
    //creates alias for dashboard API request
    cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
    cy.intercept('**/staging.givenergy.cloud/feedback').as('feedbackAPI');
    //navigates to leave feedback
    dashboardSelect('View Feedback');
    cy.wait('@feedbackAPI', {timeout: 30000});
    cy.get('[data-qa="title"]').contains('Feedback').click();

    //check view feedback title
    cy.intercept('**/staging.givenergy.cloud/feedback/**').as('viewFeedbackAPI');
    cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().click();
    cy.wait('@viewFeedbackAPI', {timeout: 30000});
    cy.get('[data-qa="title.text"]').should('be.visible');
    cy.get('[data-qa="textarea"]').should('be.visible');

  });
});
  