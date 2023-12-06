Cypress.Commands.add('failTestIfTooLong', (timeout = 120000) => {

  let timeoutId;

  beforeEach(() => {
    timeoutId = setTimeout(() => {
      throw new Error(`Test failed: exceeded run time limit of ${timeout}ms`);
    }, timeout);
  });

  afterEach(() => {
    clearTimeout(timeoutId); // Clear the timeout at the end of each test
  });
});

import { adminLogin } from "../../../logins";
import { createAccount, dashboardSelect, checkPageNav } from "../../../funcs";

describe("account list create account", () => {
  it("tests Account list create account", () => {
    cy.failTestIfTooLong(120000);
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

  });
});