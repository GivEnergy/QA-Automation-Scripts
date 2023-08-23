import { customerLogin } from "../../../funcs";

describe("Notifications centre Works Correctly", () => {
    it("tests Notifications centre", () => {
      cy.viewport(1920, 1080);
      customerLogin()
      cy.get("div.my-5 i").click();
      cy.get("header span:nth-of-type(2) i").click();
      cy.get("div.v-menu__content > div > div span:nth-of-type(3) i").click();
    })
  });