import { adminLogin } from "../../../../funcs";

//doesnt work can't click community tab
describe("Community tab", () => {
    it("tests Community tab", () => {
      cy.viewport(1920, 1080);
      adminLogin();
      cy.get("div:nth-of-type(7) > div.v-list-group__items > div:nth-of-type(1) div.v-list-item__content > div").click();
      cy.get(".Hero-title").contains('Welcome to GivEnergy');
    });
  });
  