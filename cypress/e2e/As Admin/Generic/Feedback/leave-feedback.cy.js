import { adminLogin } from "../../../../funcs";

describe("leave feedback", () => {
    it("tests leave feedback", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("div:nth-of-type(7) > div.v-list-group__items > div:nth-of-type(2) div.v-list-item__content > div").click();
      cy.get("div:nth-of-type(7) > div.v-list-group__items > div:nth-of-type(2) div.v-list-item__content > div").click();
      cy.get("#input-452").click();
      cy.get("#input-452").type("F");
      cy.get("#input-452").type("Feedback test");
      cy.get("#input-455").click();
      cy.get("#input-455").type("vbuebsiuvbsivubuivbueoibwvbv vubwiuvbwovubwviwuvbwvwv");
      cy.get("#input-441").click();
      cy.get("#list-item-479-2").click();
      cy.get("#input-447").click();
      cy.get("#list-item-497-1").click();
      cy.get("div.container span").click();
      cy.get("p:nth-of-type(2) > a").click();
      cy.get("div.v-card__title > div > div:nth-of-type(1)").contains('Known Issues');
      cy.get("p:nth-of-type(3) > a").click();
      cy.get("div.justify-md-start").contains('Frequently Asked Questions');
    });
  });
  