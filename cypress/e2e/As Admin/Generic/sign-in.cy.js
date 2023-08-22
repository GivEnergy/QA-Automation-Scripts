import { adminUsername, adminPassword } from "../../../variables";
import { adminLogin } from "../../../funcs";

describe("Admin Sign In", () => {
    it("tests Admin Sign In", () => {
      cy.visit("http://dev.givenergy.cloud/login");
      cy.viewport(1920, 1080);
      cy.get("#input-22").click();
      cy.get("#input-22").type(adminUsername);
      cy.get("div:nth-of-type(2) div.v-input__slot").click();
      cy.get("#input-25").type("dadagvbawfww542525!!");
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("div.v-card > div > div > div:nth-of-type(1) div.v-text-field__details > div > div > div").contains('These credentials do not match our records');
      cy.get("div:nth-of-type(2) div.v-text-field__details > div > div > div").contains('These credentials do not match our records');
      cy.visit("http://dev.givenergy.cloud/login");
      cy.get("#input-25").click();
      cy.get("#input-25").type(adminPassword);
      cy.get("#input-22").click();
      cy.get("#input-22").type("notarealaccount123");
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("div.v-card > div > div > div:nth-of-type(1) div.v-text-field__details > div > div > div").contains('These credentials do not match our records');
      cy.get("div:nth-of-type(2) div.v-text-field__details > div > div > div").contains('These credentials do not match our records');
      cy.visit("http://dev.givenergy.cloud/login");
      cy.get("#input-22").click();
      cy.get("#input-22").type(adminUsername);
      cy.get("#input-25").click();
      cy.get("#input-25").type(adminPassword);
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("#new-dashboard\\.show").click();
    });
  });