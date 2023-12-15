import { adminLogin } from "../../../logins";
import { dashboardSelect, changeDetails } from "../../../funcs";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("Account settings details", () => {
  it("tests changing the account settings details works", () => {

      adminLogin();
      //creates alias for dashboard API request
      cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
      dashboardSelect('Account Settings');

      changeDetails(false);

      cy.visit('https://staging.givenergy.cloud/account-settings');
      changeDetails(true);
    });
  });
  