import { customerLogin } from '../../../funcs.js'

describe("Customer Account Settings Page Works Correctly", () => {
    it("tests Customer Account Settings Page Works Correctly", () => {
      customerLogin()  
      cy.get("span:nth-of-type(5) i").click();
      cy.get("#input-399").click();
      cy.get("#input-399").type("chemical_laner");
      cy.get("#input-405").click();
      cy.get("#input-405").type("Chemicall");
      cy.get("#input-408").click();
      cy.get("#input-408").type("Laner");
      cy.get("#input-411").click();
      cy.get("#input-411").type("Newspaper House, Chemical Laner,");
      cy.get("div:nth-of-type(5) div.v-input__slot").click();
      cy.get("#input-414").type("ST6 4q");
      cy.get("#input-414").type("ST6 4qZ");
      cy.get("#input-427").click();
      cy.get("#input-427").type("013772528745");
      cy.get("#input-430").click();
      cy.get("#input-430").type("dan.lambert@givenergy.com");
      cy.get("div.v-card__actions > span span").click();
      cy.get("div.container > div > div > div:nth-of-type(3) button").click();
      cy.get("div.container > div > div > div:nth-of-type(2) > div > div span").click();
      cy.get("div.v-card__text > div > div:nth-of-type(1) div.v-input__slot > div").click();
      cy.get("#input-578").type("password!");
      cy.get("#input-581").click();
      cy.get("#input-581").type("passwordplease123!");
      cy.get("#input-584").click();
      cy.get("#input-584").type("passwordplease123!");
      cy.get("form span").click();
      cy.get("#input-704").click();
      cy.get("#input-704").type(process.env.CYPRESS_CUSTOMER-PASSWORD);
      cy.get("div:nth-of-type(3) div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-707").type("passwordplease123!");
      cy.get("div.container > div > div > div:nth-of-type(3) div.v-card__actions").click();
      cy.get("#input-710").click();
      cy.get("#input-710").type("passwordplease12!");
      cy.get("div.container > div > div > div:nth-of-type(3) div.v-card__actions").dblclick();
      cy.get("div.v-text-field__details > div > div > div").dblclick();
      cy.get("#input-710").click();
      cy.get("#input-710").type("passwordplease123!");
      cy.get("#input-710").type("passwordplease123!");
      cy.get("form span").click();
      cy.get("div.container div:nth-of-type(6) span").click();
      cy.visit("http://dev.givenergy.cloud/account-settings/security");
    });
  });
  