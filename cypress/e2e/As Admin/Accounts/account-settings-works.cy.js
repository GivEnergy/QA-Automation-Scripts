import { adminLogin } from "../../../funcs";

describe("Account settings work", () => {
    it("tests Account settings work", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("#account\\.settings\\.index").click();
      cy.get("#input-364").click();
      cy.get("#input-364").type("NotARealUsername");
      cy.get("#input-916").click();
      cy.get("#input-916").type("Rossa");
      cy.get("#input-919").click();
      cy.get("#input-919").type("Coatesa");
      cy.get("#input-925").click();
      cy.get("#input-925").type("ST9");
      cy.get("#input-938").click();
      cy.get("#input-938").type("000000000000");
      cy.get("#input-941").click();
      cy.get("#input-941").type("notarealemail@givenergy.com");
      cy.get("div.v-card__actions > span span").click();
      cy.get("#input-1016").click();
      cy.get("#input-1047").click();
      cy.get("#input-1047").click();
      cy.get("#input-1047").click();
      cy.get("div.container > div > div > div:nth-of-type(2) > div > div span").click();
      cy.get("#input-433").click();
      cy.get("#input-433").type(process.env.CYPRESS_ADMIN-PASSWORD);
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
      cy.get("#input-433").type(process.env.CYPRESS_ADMIN-PASSWORD);
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type("password123!");
      cy.get("#input-439").click();
      cy.get("#input-439").type("password123!");
      cy.get("form span").click();
      cy.get("div.container > div > div > div:nth-of-type(2) > div > div > div > div").should('have.value', 'Your password has been updated!')  
      cy.get("#input-433").click();
      cy.get("#input-433").type('password123!');
      cy.get("div:nth-of-type(2) div.v-input__slot > div").click();
      cy.get("#input-436").type(process.env.CYPRESS_ADMIN-PASSWORD);
      cy.get("#input-439").click();
      cy.get("#input-439").type(process.env.CYPRESS_ADMIN-PASSWORD);
      cy.get("form span").click();  

    });
  });
  