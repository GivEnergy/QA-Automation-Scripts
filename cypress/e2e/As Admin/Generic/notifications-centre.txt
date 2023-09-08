import { adminLogin } from "../../../funcs";

describe("Notifications centre", () => {
    it("tests Notifications centre", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("div.my-5 span > span > span").click();
      cy.get("header span:nth-of-type(2) i").click();
      cy.get("div:nth-of-type(3) span:nth-of-type(2) i").click();
      cy.get("div > div > div:nth-of-type(2) span:nth-of-type(2) i").click();
      cy.get("div.v-menu__content > div > div > div > div:nth-of-type(1) span:nth-of-type(2) i").click();
      cy.get("div.v-menu__content > div > div > div > div:nth-of-type(1) div > span:nth-of-type(1) i").click();
      cy.get("div.v-menu__content > div > div > div > div:nth-of-type(1) div > span:nth-of-type(1) i").click();
      cy.get("div.v-menu__content > div > div > div > div:nth-of-type(1) div > span:nth-of-type(1) i").click();
    })
  });