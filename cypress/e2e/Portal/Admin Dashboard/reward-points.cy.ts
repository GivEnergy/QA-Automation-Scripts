import {checkPageNav, dashboardSelect, tableRegex} from "../../../funcs";
import { adminLogin } from "../../../logins";
import {dateAndTime, positiveNumber} from "../../../regex";

describe("reward points", () => {
    it("tests reward points page", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/admin/reward-points').as('rewardPointsAPI');
        dashboardSelect('Admin Dashboard', 'Reward Points');
        cy.wait('@rewardPointsAPI', {timeout: 30000});
        cy.get('[data-qa="table.points"]').should('be.visible');

        checkPageNav();

        tableRegex("Points Gained This Month", positiveNumber, "Points Gained This Month has a value that is not a positive number");
        tableRegex("Points Used This Month", positiveNumber, "Points Used This Month has a value that is not a positive number");
        tableRegex("Redeemable Points", positiveNumber, "Reedemable Points has a value that is not a positive number");

        //finds engineer header in table
        //gets first engineer in the table and searches for this engineer
        //finds amount of records on first page and
        //then checks by that amount of records that the engineer name is same as was searched for
        //throws error if not
        cy.get('[data-qa="table"]').as('table');
        cy.get('@table').find('tr').eq(0).as('tableHeadings');

        cy.get('@tableHeadings').find('th').each(($th, index): void  => {

            const text: string = $th.text();

            if (text === 'Engineer') {
                cy.get('@table').find('tr').eq(1).find('td').eq(index).then(($el): void  => {

                    const engineer: string = $el.text();

                    cy.get('[data-qa="search.manage.engineer"]').eq(0).type(engineer);
                    cy.get('div[class="v-list-item__title"]').contains(engineer).click();
                    cy.wait(2000); //essential or it grabs 15 records
                    cy.get('div[class="v-data-footer__pagination"]').then(($el2): void  => {

                        const paginationRecords: string = $el2.text();

                        const numberOfRecords: number = Number(paginationRecords.split(' ')[0].split('-')[1]);
                        console.log("Records to loop through " + numberOfRecords);
                        for (var i = 1; i <= numberOfRecords; i++) {

                            cy.get('@table').find('tr').eq(i).find('td').eq(index).then(($td): void  => {

                                const engineerAfterSearch: string = $td.text();
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

        //visits engineers history page
        cy.get('@table').find('tr').eq(1).find('td').last().find('i[class*="mdi-magnify"]').parent().then(($a) : void  => {

            const url: string = $a.attr('href');

            cy.visit(url);

        });
        cy.get('[data-qa="title.history"]').contains('History');
        tableRegex("Time", dateAndTime, "Value showing in time column does not meet format, YYYY-MM-DD HH:MM:SS");
        tableRegex("Amount", positiveNumber, "Amount contains a value that is not a positive number");

        //finds type heading in table and
        //checks first data record in this column has a value of
        //either 'Add' or 'Deduct'
        cy.get('@tableHeadings').find('th').each(($th, index): void  => {

            const heading: string = $th.text();

            if (heading === "Type") {

                cy.get('@table').find('tr').eq(1).find('td').eq(index).then(($td): void  => {

                    const typeValue: string = $td.text().trim();
                    console.log(typeValue)
                    if (typeValue !== 'Add' && typeValue !== 'Deduct') {
                        throw new Error("Error: Type has value that is not add or deduct");
                    }

                })

            }

        });

        //checks type filter contains Add and Deduct values
        //checks both searches are visible
        cy.get('[data-qa="select.type"]').click();
        cy.get('div[class="v-list-item__title"]').contains('Add');
        cy.get('div[class="v-list-item__title"]').contains('Deduct');
        cy.get('[data-qa="search.engineer"]').should('be.visible');
        cy.get('[data-qa="field.search"]').should('be.visible');

        //finds amount of records on first page and
        //then checks by that amount of records that the via column
        //contains an anchor element that has an url that contains '/commission/'
        cy.get('div[class="v-data-footer__pagination"]').then(($el): void  => {

            const paginationRecords: string = $el.text();
            const numberOfRecords: number = Number(paginationRecords.split(' ')[0].split('-')[1]);
            console.log("Records to loop through " + numberOfRecords);
            cy.get('@tableHeadings').find('th').each(($th, index): void  => {

                const heading: string = $th.text();
                console.log(heading)
                if (heading === "Via") {
                    for (var i = 1; i < numberOfRecords; i++) {
                        cy.get('@table').find('tr').eq(i).find('td').eq(index).then(($td): void  => {
                            const value: string = $td.text();

                            if (value === "Commission") {
                                cy.get('@table').find('tr').eq(i).find('td').eq(index).find('a[href*="/commission/"]');
                            }
                        })
                    }
                }
            });
        });

    });
});