import { adminLogin } from "../../../logins";
import { createAccount, dashboardSelect, checkPageNav, tableClick, tableContains, tableRegex } from "../../../funcs";
import { YYYYMMDD } from "../../../regex";

describe("account list", () => {
  it("tests Account list", () => {

    //sets viewport and logins in as admin
    adminLogin();

    //opens account list and reloads page to hide nav bar
    dashboardSelect('Account List');
    cy.get('[data-qa="input.filter"]').click();
    
    //checks page navigation
    checkPageNav();

    //clicks create account and cancels it
    cy.get('[data-qa="button.creation"]').contains('Create').click();
    cy.get('[data-qa="title.text"]').contains('Create New Account').click();
    cy.get('[data-qa="button.cancel"]').contains('Cancel').click();

    //fills in details and cancels
    createAccount('TestDistributor');
    cy.get('[data-qa="button.cancel"]').contains('Cancel').click();

    //fills in details again and clicks create
    createAccount('TestDistributor', 'clear');
    cy.get('[data-qa="button.create"]').contains('Create').click();

    //to be added in when search works
    //checks search, hover pop ups and account buttons
    // cy.get('[data-qa="field.search"]').click().type('Chemical Lane');
    // tableClick('Engineer', 'Dan Lambert');
    // tableClick('Company', 'GivEnergy03');
    // tableClick('Distributor', 'Givenergy02');
    // cy.reload();

    tableRegex('Create Date', YYYYMMDD, 'Error: date does not match yyyy-mm-dd format')
    cy.get('i[class*="mdi-delete"]').first().scrollIntoView();
    cy.get('a[href*="new-dashboard"]').first().click();
    cy.get('a[href*="account-settings"]').first().click();
    cy.get('a[href*="legacy-dashboard"]').first().click();
    cy.get('i[class*="mdi-account-alert"]').first().click();
    cy.get('[data-qa="title.header"]').contains('Account Permissions');
    cy.get('[data-qa="button.update"]').contains('Update').click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-qa="button.change"]').contains('Disable').click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-qa="button.change"]').contains('Enable').click();

    //checks filter
    cy.get('[data-qa="input.filter"]').click();
    cy.get('div[class*="v-list-item"]').contains('Super Engineer').click();
    tableContains('Type', 'Super Engineer', 'Error when filtering by account type')
  });
});