import { adminLogin } from "../../../logins";

describe("call queues", () => {
    it("tests call queues", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
      cy.get('div').contains('Call Queues').click();
      cy.get("div").contains('Current');
      cy.get("div").contains('Today');
    });
  });