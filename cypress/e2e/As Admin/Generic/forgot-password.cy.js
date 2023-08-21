describe("forgot password", () => {
    it("tests forgot password", () => {
      cy.visit("http://dev.givenergy.cloud/login");
      cy.viewport(1920, 1080);
      cy.get("p:nth-of-type(1) > a").click();
      cy.get("#input-40").click();
      cy.get("#input-40").type("cbucaweouyvbvubewwovw");
      cy.get("div.container span").click();
      cy.get("div.v-alert > div").click();
      cy.get("div.v-card__text").click();
      cy.get("#input-40").click();
      cy.get("#input-40").type(process.env.CYPRESS_ADMIN-USERNAME);
      cy.get("div.container span").click();
      cy.get("div.v-alert > div").click();
      cy.get("div.v-card__text").click();
    });
  });