import { customerLogin } from "../../../funcs";

describe("FAQ Works Correctly", () => {
    it("tests FAQ Page", () => {
      cy.viewport(1920, 1080);
      customerLogin()
    cy.get("div:nth-of-type(8) > div.v-list-group__items > div:nth-of-type(1) div.v-list-item__content > div").click();
    cy.get("div.justify-md-start").click();
    cy.get("div.container span").click();
    cy.get("#input-2488").click();
    cy.get("#input-2488").type("portal");
    cy.get("div.v-card__title div:nth-of-type(3) button").click();
    cy.get("div.v-card__title div:nth-of-type(3) button").click();
    cy.get("div.v-expansion-panel--next-active h3").click();
    cy.get("div.v-expansion-panel--next-active h3").click();
    cy.get("div.v-expansion-panel--next-active li:nth-of-type(1) > p:nth-of-type(1)").click();
    cy.get("div.v-expansion-panel--next-active li:nth-of-type(1) > p:nth-of-type(1)").click();
    })
});