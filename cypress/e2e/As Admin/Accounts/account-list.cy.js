import { adminLogin } from "../../../logins";
import { addRNG } from "../../../funcs";

describe("account list", () => {
    it("tests account list", () => {
      cy.viewport(1920, 1080);
      //logs in as admin
      adminLogin()
      
      //opens account list and reloads page to hide nav bar
      cy.get(".v-navigation-drawer__content").click().get('div').contains('Account List').click();
      cy.visit('https://givenergy.cloud/user');
      
      //clicks create account and cancels it
      cy.get("button").contains('Create Distributor Account').click();
      cy.get("div").contains('Create New Account').click();
      cy.get("button").contains('Cancel').click();

      //fills in details and cancels
      cy.get("button").contains('Create Distributor Account').click();
      cy.get('label').contains('Username').next('input').type(addRNG('QATestDistributor'));
      cy.get('label').contains('Email Address').next('input').type('test@test.test');
      cy.get('label').contains('Postcode').next('input').type('T3ST');
      cy.get('label').contains('Address Line 1').next('input').type('123 test street');
      cy.get('label').contains('Phone Number').next('input').type('11111 111111');
      cy.get("button").contains('Cancel').click();

      //fills in details again and clicks create
      cy.get("button").contains('Create Distributor Account').click();
      cy.get('label').contains('Username').next('input').clear().type(addRNG('QATestDistributor'));
      cy.get('label').contains('Email Address').next('input').clear().type('test@test.test');
      cy.get('label').contains('Postcode').next('input').clear().type('T3ST');
      cy.get('label').contains('Address Line 1').next('input').clear().type('123 test street');
      cy.get('label').contains('Phone Number').next('input').clear().type('11111 111111');
     // cy.get("button").contains('Create').click(); //needs to be added in when dev works
      cy.get("button").contains('Cancel').click();

      //checks search and hover pop ups
      cy.get('label').contains('Search').next('input').type('Chemical Lane');
      cy.get('span').contains('Dan Lambert').click();
      cy.get('b').contains('Username:').should('be.visible');
      cy.get('span').contains('GivEnergy03').click();
      cy.get('b').contains('Account Type:').should('be.visible');
      cy.get('span').contains('Givenergy02').click();
      cy.get('b').contains('Email Address:').should('be.visible');

      //checks filter and page nav
      cy.get('label').contains('Filter By Account Type').next('div').contains('input').click();
    });
  });