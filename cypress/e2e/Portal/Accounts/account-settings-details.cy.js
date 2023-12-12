import { adminLogin } from "../../../logins";
import { dashboardSelect, changeDetails } from "../../../funcs";

const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Group 1", () => {
  it("tests changing the account settings details works", () => {

      //sets viewport and logs in
      adminLogin();

      //navigates to account settings page
      dashboardSelect('Account Settings');

      //changes details
      changeDetails(false);

      //changes details back
      cy.visit('https://staging.givenergy.cloud/account-settings');
      changeDetails(true);
    });
  });
  