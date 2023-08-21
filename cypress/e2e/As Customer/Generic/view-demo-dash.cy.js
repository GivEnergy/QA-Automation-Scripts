describe("view demo dashboard", () => {
    it("tests view demo dashboard", () => {
      cy.visit("http://dev.givenergy.cloud/login");
      cy.viewport(1920, 1080);
      cy.get("p:nth-of-type(2) > a").click();
      cy.get("#app").click();
      cy.get("div.v-dialog__content div.v-card__text").click();
      cy.get("button.secondary > span").click();
      cy.get("p:nth-of-type(2) > a").click();
      cy.get("div.v-card__title").click();
      cy.get("div.v-dialog__content p:nth-of-type(1)").click();
      cy.get("button.primary > span").click();
      cy.get("div:nth-of-type(4) > div.v-list-group__items > div:nth-of-type(1) div.v-list-item__content > div").click();
      cy.get("#logout").click();
    });
  });
  