import { adminLogin } from "../../../funcs"

//DOESNT WORK CANT FIND SEARCH
describe("dashboard search", () => {
    it("tests dashboard search", () => {
      cy.viewport(1920, 1080);
      adminLogin()
      cy.get("#input-8844").type('gary');
      //here^
      cy.get(".v-list v-select-list v-sheet theme--light theme--light").its('length').should('be.gt', 0)
    });
  });

