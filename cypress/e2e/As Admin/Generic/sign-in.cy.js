describe("Admin Sign In", () => {
    it("tests Admin Sign In", () => {
      cy.visit("http://dev.givenergy.cloud/login");
      cy.viewport(1920, 1080);
      cy.get("#input-22").click();
      cy.get("#input-22").type(process.env.CYPRESS_ADMIN-USERNAME);
      cy.get("div:nth-of-type(2) div.v-input__slot").click();
      cy.get("#input-25").type("dadagvbawfww542525!!");
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("div.v-card > div > div > div:nth-of-type(1) div.v-text-field__details > div > div > div").click();
      cy.get("div:nth-of-type(2) div.v-text-field__details > div > div > div").click();
      cy.visit("http://dev.givenergy.cloud/login");
      cy.get("#input-25").click();
      cy.get("#input-25").type(process.env.CYPRESS_ADMIN-PASSWORD);
      cy.get("#input-22").click();
      cy.get("#input-22").type("notarealaccount123");
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("div.v-card > div > div > div:nth-of-type(1) div.v-text-field__details > div > div > div").click();
      cy.get("div:nth-of-type(2) div.v-text-field__details > div > div > div").click();
      cy.visit("http://dev.givenergy.cloud/login");
      cy.get("#input-22").click();
      cy.get("#input-22").type(process.env.CYPRESS_ADMIN-USERNAME);
      cy.get("#input-25").click();
      cy.get("#input-25").type(process.env.CYPRESS_ADMIN-PASSWORD);
      cy.get("#app div:nth-of-type(5) span").click();
      cy.get("#new-dashboard\\.show").click();
    });
  });