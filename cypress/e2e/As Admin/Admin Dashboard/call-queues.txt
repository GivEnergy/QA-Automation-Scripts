import { dashboardSelect, handleError } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("call queues", () => {
  it("tests call queues", () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return handleError(e, runnable);
    });
      cy.viewport(1920, 1080);
      adminLogin()

      dashboardSelect('Admin Dashboard', 'Call Queues', 'Current')
    });
  });