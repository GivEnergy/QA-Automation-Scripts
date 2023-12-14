import {checkPageNav, dashboardSelect, tableRegex} from "../../../funcs";
import { adminLogin } from "../../../logins";
import {dateAndTime, positiveNumber} from "../../../regex";

const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("reward points", () => {
    it("tests reward points page", () => {

        adminLogin();

        //navigates to rewards
        dashboardSelect('Admin Dashboard', 'Reward Points');
        cy.get('[data-qa="table.points"]').should('be.visible');

        //checks page navigation
        checkPageNav();

        tableRegex("Points Gained This Month", positiveNumber, "Points Gained This Month has a value that is NaN");
        tableRegex("Points Used This Month", positiveNumber, "Points Used This Month has a value that is NaN");
        tableRegex("Redeemable Points", positiveNumber, "Reedemable Points has a value that is NaN");

        //creates alias
        cy.get('[data-qa="table"]').as('table');
        cy.get('@table').find('tr').eq(0).as('tableHeadings');

        cy.get('@tableHeadings').find('th').each(($th, index) => {

            const text = $th.text();

            if (text === 'Engineer') {
                cy.get('@table').find('tr').eq(1).find('td').eq(index).then(($el) => {

                    const engineer = $el.text();

                    cy.get('[data-qa="search.manage.engineer"]').eq(0).type(engineer);
                    cy.get('div[class="v-list-item__title"]').contains(engineer).click();
                    cy.wait(2000); //essential or it grabs 15 records
                    cy.get('div[class="v-data-footer__pagination"]').then(($el2) => {

                        const paginationRecords = $el2.text();

                        const numberOfRecords = Number(paginationRecords.split(' ')[0].split('-')[1]);
                        console.log("Records to loop through " + numberOfRecords);
                        for (var i = 1; i <= numberOfRecords; i++) {

                            cy.get('@table').find('tr').eq(i).find('td').eq(index).then(($td) => {

                                const engineerAfterSearch = $td.text();
                                console.log("Number of records " + numberOfRecords);
                                console.log("Engineer found in table after search " + engineerAfterSearch)
                                console.log("Engineer searched for " + engineer)
                                if (engineerAfterSearch.trim() !== engineer.trim()) {
                                    throw new Error("Error: searching for engineer yields other engineers results");
                                }
                            })
                        }

                        cy.get('@table').find('tr').eq(1).find('td').eq(index).find('span').eq(1).click();
                        cy.get('[data-qa="card.item"]').should('be.visible');
                    })
                })
            }
        });

        cy.get('@table').find('tr').eq(1).find('td').last().find('i[class*="mdi-magnify"]').parent().then(($a) => {

            const url = $a.attr('href');

            cy.visit(url);

        });

        cy.get('[data-qa="title.history"]').contains('History');
        tableRegex("Time", dateAndTime, "Value showing in time column does not meet format, YYYY-MM-DD HH:MM:SS");
        tableRegex("Amount", positiveNumber, "Amount contains a value that is not a positive number");

        //needs a check to see if via has a commissioning url as a href

        cy.get('@tableHeadings').find('th').each(($th, index) => {

            const heading = $th.text();

            if (heading === "Type") {

                cy.get('@table').find('tr').eq(1).find('td').eq(index).then(($td) => {

                    const typeValue = $td.text().trim();
                    console.log(typeValue)
                    if (typeValue !== 'Add' && typeValue !== 'Deduct') {
                        throw new Error("Error: Type has value that is not add or deduct");
                    }

                })

            }

        });

        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class="v-list-item__title"]').contains('Add');
        cy.get('div[class="v-list-item__title"]').contains('Deduct');
        cy.get('[data-qa="search.engineer"]').should('be.visible');
        cy.get('[data-qa="field.search"]').should('be.visible');

    });
});