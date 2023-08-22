import { adminLogin } from "../../../funcs";

describe("debug inverters", () => {
    it("tests debug inverters", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("#admin\\.dashboard\\.index").click();
      cy.get("div:nth-of-type(2) div:nth-of-type(6) div.v-card__subtitle").click();
      cy.get(".v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default secondary").click();
      cy.get("#input-6395").click();
      cy.get("#input-6395").type("SA2249G690");
      cy.get("#list-item-6408-0 > div > div").click();
      cy.get("button.primary > span").click();
      cy.get("tbody > tr:nth-of-type(1) i").click();
    });
  });
