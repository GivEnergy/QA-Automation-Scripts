import { adminLogin } from "../../../funcs";

//DOESNT WORK CANNOT SELECT INPUT FIELD TO SEARCH
describe("connections", () => {
    it("tests connections on admin dashboard", () => {
      cy.viewport(1920, 1080);
      cy.visit("https://givenergy.cloud/dashboard");
      adminLogin()
      cy.get("div:nth-of-type(4) > div.v-list-group__items > div:nth-of-type(4) i").click();
      cy.get("div:nth-of-type(2) div:nth-of-type(5) div.v-card__subtitle").click();
      cy.get("#input-167").type("WO2249");
      //HERE^
      cy.type("{enter}");
      cy.get("#input-171").click();
      cy.get("#list-item-861-98 > div.v-list-item__content > div").click();
      cy.get("#main > div > div.container > div > div:nth-of-type(1)").click();
      cy.get("tr:nth-of-type(1) > td:nth-of-type(1)").click();
      cy.get("div.v-card__text > div > div:nth-of-type(2) button").click();
      cy.get("div:nth-of-type(3) div.v-input__slot > div > div").click();
      cy.get("tr:nth-of-type(1) > td:nth-of-type(2)").click();
      cy.get("tr:nth-of-type(1) > td:nth-of-type(3)").click();
      cy.get("div:nth-of-type(3) div.v-input__slot > div > div").click();
      cy.get("div.menuable__content__active div.v-card__title").click();
      cy.get("tr:nth-of-type(1) > td:nth-of-type(3)").click();
      cy.get("tr:nth-of-type(1) div > span:nth-of-type(1) i").click();
      cy.get("div.v-dialog__content > div > div > div > div:nth-of-type(1)").click();
      cy.get("div.v-dialog__content > div > div > div > div:nth-of-type(3)").click();
      cy.get("#app > div.v-overlay > div.v-overlay__scrim").click();
      cy.get("li:nth-of-type(12) i").click();
      cy.get("li:nth-of-type(12) i").click();
    });
  });
  