import { adminLogin } from "../../../logins";
import { dashboardSelect, tableContains, tableRegex } from "../../../funcs";
import { YYYYMMDD } from "../../../regex";


//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});
describe("account list", () => {
  it("tests Account list", () => {

    adminLogin();
    //creates alias for dashboard api request
    cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
    cy.intercept('**/staging.givenergy.cloud/user').as('userAPI');
    dashboardSelect('Account List');
    cy.wait('@userAPI', {timeout: 30000});

    //filters account by customer
    cy.get('[data-qa="input.filter"]').click();
    cy.intercept('**/internal-api/paginate/account**').as('tableAccountRequest');
    cy.get('div[class*="v-list-item"]').contains('Customer').as('listCustomer');
    cy.get('@listCustomer').click();
    cy.wait('@tableAccountRequest', {timeout: 30000});
    tableContains('Type', 'Customer', 'Error when filtering by account type');
    tableRegex('Create Date', YYYYMMDD, 'Error: date does not match yyyy-mm-dd format');
    //checks first data records action buttons
    cy.get('i[class*="mdi-delete"]').first().scrollIntoView();
    cy.get('a[href*="new-dashboard"]').first().click();
    cy.get('a[href*="account-settings"]').first().click();
    cy.get('a[href*="legacy-dashboard"]').first().click();
    cy.get('i[class*="mdi-account-alert"]').first().click();
    cy.get('[data-qa="title.header"]').contains('Account Permissions');
    cy.get('[data-qa="button.update"]').as('update');
    cy.get('@update').contains('Update');
    cy.intercept('**/internal-api/account/delegate/**').as('updateAPI');
    cy.get('@update').click({force: true});
    cy.wait('@updateAPI', {timeout: 30000});
    cy.get('i[class*="mdi-delete"]').first().click();
    //checks enable and disable button and dialog works
    cy.get('[data-qa="button.change"]').then(($button) => {

      const text = $button.text().trim();

      cy.get('[data-qa="button.change"]').as('change');
      cy.get('i[class*="mdi-delete"]').as('delete');

      if (text === "Enable") {
        cy.get('@change').contains('Enable');
        cy.get('@change').click();
        cy.get('@delete').first().click();
        cy.get('@change').contains('Disable');
        cy.get('@change').click();
      } else {
        cy.get('@change').contains('Disable');
        cy.get('@change').click();
        cy.get('@delete').first().click();
        cy.get('@change').contains('Enable');
        cy.get('@change').click();
      }
    })


  });
});