describe("view demo dashboard", () => {
    it("tests view demo dashboard", () => {
      cy.visit("http://dev.givenergy.cloud/login");
      cy.viewport(1920, 1080);
      cy.get("p:nth-of-type(2) > a").click();
      cy.get("button.secondary > span").click();
      cy.get("p:nth-of-type(2) > a").click();
      cy.get("button.primary > span").click();
      cy.get("div.col-lg-9").click();
    });
  });
  