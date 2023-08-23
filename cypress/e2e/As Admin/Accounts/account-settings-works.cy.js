import { adminLogin } from "../../../logins";

describe("Account settings work", () => {
      it("Uncaught Exception - Due to application error", () => {
        cy.on("uncaught:exception", (e, runnable) => {
        console.log("error", e);
        console.log("runnable", runnable);
        return false;
        });
      cy.viewport(1920, 1080);
      //logs in
      adminLogin()
      //goes to account details and changes details
      cy.get("#account\\.settings\\.index").click();
      cy.get('label').contains('Username').next('input').type('1');
      cy.get('label').contains('First Name').next('input').type('1');
      cy.get('label').contains('Surname').next('input').type('1');
      cy.get('label').contains('Address Line 1').next('input').clear().type('Brymbo Road');
      cy.get('label').contains('Postcode').next('input').clear().type('ST9');
      cy.get('label').contains('Telephone Number').next('input').type('7');
      cy.get('label').contains('Email Address').next('input').clear().type('ross.coates@givenergy.com');
      cy.get('button').contains('Submit').click();
      cy.get('p').contains('Account details updated successfully');
      //changes details back
      cy.visit('https://givenergy.cloud/account-settings')
      cy.get('label').contains('Username').next('input').clear().type('GivQA');
      cy.get('label').contains('First Name').next('input').clear().type('Ross');
      cy.get('label').contains('Surname').next('input').clear().type('Coates');
      cy.get('label').contains('Address Line 1').next('input').clear().type('GivEnergy');
      cy.get('label').contains('Postcode').next('input').clear().type('ST6');
      cy.get('label').contains('Telephone Number').next('input').clear().type('01234567897');
      cy.get('label').contains('Email Address').next('input').clear().type('ross.coates@givenergy.co.uk');
      cy.get('button').contains('Submit').click();
      cy.get('p').contains('Account details updated successfully');
      //goes to manage security and changes password
      cy.get('button').contains('Manage Account Security').click();
      cy.get('label').contains('Current Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('label').contains('New Password').next('input').clear().type('password123!');
      cy.get('label').contains('Repeat Password').next('input').clear().type('password123456!');
      cy.get('div').contains('This field must be the same as Password');
      cy.get('label').contains('Current Password').next('input').clear().type('notarealpassword?');
      cy.get('label').contains('New Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('label').contains('Repeat Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('div').contains('This field must be the same as Password');
      cy.get('label').contains('Current Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('label').contains('New Password').next('input').clear().type('TestPasswordPlease!');
      cy.get('label').contains('Repeat Password').next('input').clear().type('TestPasswordPlease!');
      cy.get('button').contains('Submit').click();
      cy.get('p').contains('Your password has been updated!');
      cy.visit('https://givenergy.cloud/account-settings/security')
      cy.get('label').contains('Current Password').next('input').clear().type('TestPasswordPlease!');
      cy.get('label').contains('New Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('label').contains('Repeat Password').next('input').clear().type(Cypress.env('adminPassword'));
      cy.get('button').contains('Submit').click();
      cy.get('p').contains('Your password has been updated!');
    });
  });
  