import { adminLogin } from "../../../funcs";

//DOESNT WORK CAN'T CLICK CREATE NOTIFICATION
describe("Recording 22/08/2023 at 11:23:47", () => {
    it("tests Recording 22/08/2023 at 11:23:47", () => {
      cy.viewport(1920, 1080);
      cy.visit("https://givenergy.cloud/dashboard");
      adminLogin()
      cy.get("#admin\\.dashboard\\.index").click();
      cy.get("div:nth-of-type(2) div:nth-of-type(9) div.v-card__title").click();
      cy.get("div.col span").click();
      //HERE^
      cy.get("#input-559").click();
      cy.get("#list-item-590-1 > div > div").click();
      cy.get("#input-596").click();
      cy.get("#input-596").type("demo user");
      cy.get("#list-item-603-0 > div > div").click();
      cy.get("#input-564").click();
      cy.get("#input-564").type("Test");
      cy.get("#input-567").click();
      cy.get("#input-567").type("Hello!");
      cy.get("form > div > div:nth-of-type(4) span").click();
      cy.get("form > div > div:nth-of-type(4) button").click();
      cy.get("#input-571").click();
      cy.get("#input-571").type("Testing 123");
      cy.get("div.v-application--wrap div.v-card__actions span").click();
      cy.get("div.v-dialog__content button.secondary > span").click();
    });
  });
  