import { adminLogin } from "../../../logins";
import {changeEnergyGraphData, dashboardSelect, selectDashboardCard} from "../../../funcs";
import { energyGraphDescription } from "../../../dashboardCards";
import {YYYYMMDD} from "../../../regex";
import { Months } from "../../../Enum";

describe("energy graph card", () => {
  it("tests energy graph card", () => {

      adminLogin();

      dashboardSelect('Dashboard Cards');

      selectDashboardCard('Energy Graph', energyGraphDescription, 'brymbo', 'Brymbo Road');
      cy.wait(5000);

      cy.get('[data-qa="chart.pie"]').should('be.visible');
      cy.get('[data-qa="chart.bar"]').should('be.visible');
      cy.get('[data-qa="datePicker"]').find('button').eq(1).should('not.be.enabled');
      //below makes sure that the datePicker has the correct format of date within its label
      //and that when you go back a day that it shows the correct date (today's date - 1 from day)
      cy.get('[data-qa="datePicker"]').find('label').then(($label) => {

          const date = $label.text();

          const result = YYYYMMDD.test(date);

          let splitString = date.split('-');
          splitString[2] = Number(splitString[2]) - 1;
          splitString[2] = splitString[2].toString();
          const estimate = splitString.join("-");

          if (!result) { throw new Error("Error: date in date picker does not match YYYY-MM-DD format"); }

          cy.get('[data-qa="datePicker"]').find('button').eq(0).click();
          cy.wait(2000);

          cy.get('[data-qa="datePicker"]').find('label').then(($label2) => {

              const date2 = $label.text();

              if (date2 !== estimate) { throw new Error("Error: updated date after going back a day isn't correct"); }
          })
      })

      cy.get('[data-qa="datePicker"]').click();
      cy.get('div[class="v-date-picker-header__value"]').find('button').then(($label) => {

          const text = $label.text().split(' ')[0];
          const currentMonthNum = Months[text];

          let previousMonthNum;

          if (currentMonthNum === 1) {
              previousMonthNum = 12;
          } else {
              previousMonthNum = currentMonthNum - 1;
          }

          const previousMonth = Object.keys(Months).find(
              key => Months[key] === previousMonthNum
          );


          cy.get('div[class*="v-picker__body"]').find('i[class*="mdi-skip-previous"]').click();
          cy.wait(500);

          cy.get('div[class="v-date-picker-header__value"]').find('button').then(($label2) => {

              const text2 = $label2.text().split(' ')[0];
              if (previousMonth !== text2) { throw new Error("Error: clicking back arrow did not show correct month"); }


          });
      });

      cy.get('tbody').find('button').first().click();
      cy.get('tbody').find('button').last().click();
      cy.get('span[class="v-btn__content"]').contains('Confirm').click();
      cy.wait(1000);
      cy.get('[data-qa="chart.pie"]').should('be.visible');
      cy.get('[data-qa="chart.bar"]').should('be.visible');

      cy.get('[data-qa="graphSelected"]').click();
      cy.get('div[class="v-list-item__content"]').contains('Grid In').click();
      cy.get('[data-qa="graphSelected"]').find('span').contains('Grid In');
      cy.get('g[class*="highcharts-legend-item"]').eq(0).contains('Grid To Home');
      cy.get('g[class*="highcharts-legend-item"]').eq(1).contains('Grid To Battery');

      changeEnergyGraphData('Grid In', ['Grid To Home', 'Grid To Battery']);
      changeEnergyGraphData('Home', ['Solar To Home', 'Grid To Home', 'Battery To Home']);
      changeEnergyGraphData('Generation', ['Solar To Home', 'Solar To Battery', 'Solar To Grid']);
      changeEnergyGraphData('Battery In', ['Solar To Battery', 'Grid To Battery']);
      changeEnergyGraphData('Battery Out', ['Battery To Home', 'Battery To Grid']);
      changeEnergyGraphData('Grid Out', ['Solar To Grid', 'Battery To Grid']);

  })
});
  