import { adminLogin } from "../../../funcs";

describe("call queues", () => {
    it("tests call queues", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("#admin\\.dashboard\\.index").click();
      cy.get("div.overflow-y-auto > div:nth-of-type(4) div.spacer").click();
      cy.get("div.container > div > div > div > div > div:nth-of-type(1)").contains('Current');
      cy.get("div.container div:nth-of-type(7)").contains('Today');
    });
  });