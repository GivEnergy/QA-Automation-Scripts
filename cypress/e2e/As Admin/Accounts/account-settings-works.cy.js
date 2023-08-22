import { adminLogin } from "../../../funcs";

//DOESNT WORK (INPUT ID CHANGES)
describe("Account settings work", () => {
    it("tests Account settings work", () => {
      cy.viewport(1920, 1080);
      //logs in
      adminLogin()
      //goes to account details and changes details
      cy.get("#account\\.settings\\.index").click();
      cy.get('label').contains('Username').next('input').clear().type('GivQA1');
      cy.get('label').contains('First Name').next('input').clear().type('Ross1');
      cy.get('label').contains('Surname').next('input').clear().type('Coates1');
      cy.get('label').contains('Address Line 1').next('input').clear().type('Brymbo Road');
      cy.get('label').contains('Postcode').next('input').clear().type('ST9');
      cy.get('label').contains('Telephone Number').next('input').clear().type('012345678977');
      cy.get('label').contains('Email Address').next('input').clear().type('ross.coates@givenergy.com');
      cy.get('button').contains('Submit').click();
      cy.get('p').contains('Account details updated successfully');
      //changes details back
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
      cy.get("#input-433").click();
      cy.get("#input-433").type(Cypress.env('adminPassword'));
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type("password");
      cy.get("#input-439").click();
      cy.get("#input-439").type("password123");
      cy.get("div.v-text-field__details > div > div > div").should('have.value', 'This field must be the same as Password');
      cy.get("#input-433").click();
      cy.get("#input-433").type('notARealPassword');
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type("password123!");
      cy.get("#input-439").click();
      cy.get("#input-439").type("password123!");
      cy.get("form span").click();
      cy.get("div:nth-of-type(2) p").should('have.value', 'The current password is incorrect.')
      cy.get("#input-433").click();
      cy.get("#input-433").type(Cypress.env('adminPassword'));
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type("password123!");
      cy.get("#input-439").click();
      cy.get("#input-439").type("password123!");
      cy.get("form span").click();
      cy.get("div.container > div > div > div:nth-of-type(2) > div > div > div > div").should('have.value', 'Your password has been updated!')  
      cy.get("#input-433").click();
      cy.get("#input-433").type('password123!');
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type(Cypress.env('adminPassword'));
      cy.get("#input-439").click();
      cy.get("#input-439").type(Cypress.env('adminPassword'));
      cy.get("form span").click();  

    });
  });
  