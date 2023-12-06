import { adminLogin } from "../../../logins";
import { dashboardSelect, tableContains, tableRegex } from "../../../funcs";
import { YYYYMMDD } from "../../../regex";

describe("account list", () => {
  it("tests Account list", () => {
    cy.failTestIfTooLong(50000);
    //sets viewport and logins in as admin
    adminLogin();

    //opens account list and reloads page to hide nav bar
    dashboardSelect('Account List');

    //to be added in when search works
    //checks search, hover pop ups and account buttons
    // cy.get('[data-qa="field.search"]').click().type('Chemical Lane');
    // tableClick('Engineer', 'Dan Lambert');
    // tableClick('Company', 'GivEnergy03');
    // tableClick('Distributor', 'Givenergy02');
    // cy.reload();

    cy.get('[data-qa="input.filter"]').click();
    cy.get('div[class*="v-list-item"]').contains('Customer').click();
    tableContains('Type', 'Customer', 'Error when filtering by account type');
    tableRegex('Create Date', YYYYMMDD, 'Error: date does not match yyyy-mm-dd format');
    cy.get('i[class*="mdi-delete"]').first().scrollIntoView();
    cy.get('a[href*="new-dashboard"]').first().click();
    cy.get('a[href*="account-settings"]').first().click();
    cy.get('a[href*="legacy-dashboard"]').first().click();
    cy.get('i[class*="mdi-account-alert"]').first().click();
    cy.get('[data-qa="title.header"]').contains('Account Permissions');
    cy.get('[data-qa="button.update"]').contains('Update').click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-qa="button.change"]').then(($button) => {

      const text = $button.text().trim();

      if (text === "Enable") {
        cy.get('[data-qa="button.change"]').contains('Enable').click();
        cy.get('i[class*="mdi-delete"]').first().click();
        cy.get('[data-qa="button.change"]').contains('Disable').click();
      } else {
        cy.get('[data-qa="button.change"]').contains('Disable').click();
        cy.get('i[class*="mdi-delete"]').first().click();
        cy.get('[data-qa="button.change"]').contains('Enable').click();
      }
    })


  });
});