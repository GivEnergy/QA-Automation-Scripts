describe("sign in portal;", () => {

  it("tests sign in portal;", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://givenergy.cloud");
    cy.get("#input-22").click();
    cy.get("#input-22").type("chemical_lane");
    cy.get("#input-25").type("passwordplease!");
    cy.get("div:nth-of-type(5) span").click();
  });
});