import { adminLogin } from "../../../logins";
import { createAccount, dashboardSelect, checkPageNav } from "../../../funcs";

describe("account list", () => {
  it("tests Account list", () => {

    //sets viewport and logins in as admin
    cy.viewport(1920, 1080);
    adminLogin()

    //opens account list and reloads page to hide nav bar
    dashboardSelect('Account List');
    
    //checks page navigation
    checkPageNav();

    //clicks create account and cancels it
    cy.get('[data-cy="actions.button.creation"]').contains('Create').click();
    cy.get("div").contains('Create New Account').click();
    cy.get('[data-cy="actions.button.cancel"]').contains('Cancel').click();

    //fills in details and cancels
    createAccount('TestBrand');
    cy.get('[data-cy="actions.button.cancel"]').contains('Cancel').click();

    //fills in details again and clicks create
    createAccount('TestBrand', 'clear');
    cy.get('[data-cy="actions.button.create"]').contains('Create').click();

   //checks search, hover pop ups and account buttons
    //cy.get('[data-cy="simplesearch.field.search"]').click().type('Chemical Lane');
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').first().next().next().next().click();
    cy.get('[data-cy="paginate.datatable.item"]').find('td').contains('Gordon Ross').click();
    cy.get('[data-cy="generic.card.item"]').contains('Username:').should('be.visible');
    // cy.get('[data-cy="paginate.datatable.item"]').find('td').contains('GivEnergy03').click();
    // cy.get('[data-cy="generic.card.item]').contains('Account Type:').should('be.visible');
    // cy.get('[data-cy="paginate.datatable.item"]').find('td').contains('Givenergy02').click();
    // cy.get('[data-cy="generic.card.item"]').contains('Email Address:').should('be.visible');
    cy.get('tbody').find('tr').first().find('td').eq(10).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}$/)
    cy.get('a[href*="new-dashboard"]').first().click();
    cy.get('a[href*="account-settings"]').first().click();
    cy.get('a[href*="legacy-dashboard"]').first().click();
    cy.get('i[class*="mdi-account-alert"]').first().click();
    cy.get('[data-cy="permissions.title.header"]').contains('Account Permissions');
    cy.get('[data-cy="permissions.button.update"]').contains('Update').click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-cy="account.button.change"]').contains('Disable').click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-cy="account.button.change"]').contains('Enable').click();

    //checks filter
    cy.get('[data-cy="userlist.input.filter"]').click();
    cy.get('div[class*="v-list-item"]').contains('Super Engineer').click();
    cy.get('tbody').find('tr').first().find('td').eq(3).contains('Super Engineer');
  });
});