import { dashboardSelect } from "../../../funcs";
import { adminLogin } from "../../../logins";

describe("call queues", () => {
  it("tests call queues", () => {

    //sets viewport and logs in 
    adminLogin();

    dashboardSelect('Admin Dashboard', 'Call Queues');
    cy.get('[data-qa="text.title"]').contains('Current');
    cy.get('[data-qa="text.title"]').contains('Today');
    });
  });