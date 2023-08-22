import { adminLogin } from "../../../funcs";

//doesnt work search input cannot be selected
describe("my inverter card", () => {
    it("tests my inverter card", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.visit("https://givenergy.cloud/admin/dashboard/cards");
      cy.get("div.container div:nth-of-type(3) i").click();
      cy.get("#input-9500").click();
      //here^
      cy.get("#input-9500").type("chemical_lane");
      cy.type("{enter}");
      cy.get("div.v-dialog__content div.v-card__actions button").click();
      cy.get("div:nth-of-type(2) > span").click();
    });
  });
  