import { adminLogin } from "../../../logins";
import { checkPageNav, dashboardSelect, handleError } from "../../../funcs";

describe("Auto firmware updates", () => {
  it("tests Auto firmware updates", () => {
    cy.on("uncaught:exception", (e, runnable) => {
      return handleError(e, runnable);
    });
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to auto update
    dashboardSelect('Admin Dashboard', 
    'Automatic Firmware Updates', 
    'Automatic Firmware Update Records');
      
    //page navigation
    checkPageNav();

    //check format of table
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').eq(2).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('tr').find('td').eq(7)
        .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/)
    //cy.get('tr').find('td').last().click(); not sure if this can be checked?
    
    //checks search
    cy.get('label').contains('Search').next().type('CE');
    cy.get('tr').find('td').first().contains(/^[CE]\w{5,}[0-9]{3,}/);
    cy.reload();

    cy.get('label').contains('Filter by User').next().type('DanLambert');
    cy.wait(500);
    cy.get('span').contains('DanLambert').click();
    cy.get('tr').find('td').first().contains(/^[A-Z]{2,}\w{5,}[0-9]{3,}/);
    cy.get('tr').find('td').first().next().contains('Dan Lambert');
    });
  });
  