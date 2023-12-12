import { adminLogin } from "../../../logins";
import { createAccount, dashboardSelect, checkPageNav } from "../../../funcs";

const time = 180000;
beforeEach(() => {
  setTimeout(() => {
    throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
  }, time);
});
describe("account list create account", () => {
  it("tests creating an account on the account list page", () => {

    //sets viewport and logins in as admin
    adminLogin();

    //opens account list and reloads page to hide nav bar
    dashboardSelect('Account List');
    cy.get('[data-qa="input.filter"]').click();
    
    //checks page navigation
    checkPageNav();

    //clicks create account and cancels it
    cy.get('[data-qa="button.creation"]').as('create');
    cy.get('@create').contains('Create');
    cy.get('@create').click();
    cy.get('[data-qa="title.text"]').as('title');
    cy.get('@title').contains('Create New Account');
    cy.get('@title').click();
    cy.get('[data-qa="button.cancel"]').as('cancel');
    cy.get('@cancel').contains('Cancel');
    cy.get('@cancel').click();

    //fills in details and cancels
    createAccount('TestDistributor');
    cy.get('@cancel').contains('Cancel');
    cy.get('@cancel').click();

    //fills in details again and clicks create
    createAccount('TestDistributor', 'clear');
    cy.get('[data-qa="button.create"]').as('createAccount');
    cy.get('@createAccount').contains('Create');
    cy.get('@createAccount').click();

  });
});