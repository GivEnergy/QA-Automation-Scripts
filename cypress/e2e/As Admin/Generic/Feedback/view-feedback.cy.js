import { dashboardSelect } from "../../../../funcs";
import { adminLogin } from "../../../../logins";

describe("view feedback", () => {
    it("tests view feedback", () => {

      //sets viewport and logs in
      cy.viewport(1920, 1080);
      adminLogin();

      //navigates to leave feedback
      dashboardSelect('View Feedback');

      

    });
});
  