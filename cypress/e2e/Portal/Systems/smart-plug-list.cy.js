import {adminLogin} from "../../../logins";
import {checkPageNav, dashboardSelect, deleteSmartPlug, tableRegex} from "../../../funcs";
import {deviceID, smartPlugSN, smartPLugUUID, dateAndTime} from "../../../regex";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});

let tableDataIndex = 1;

describe("my smart plugs", () => {
    it("tests my smart plugs page", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        //creates alias for smart plug list page API request
        cy.intercept('**/staging.givenergy.cloud/smart-plug').as('smartPlugAPI');
        dashboardSelect("My Smart Plugs");

        //waits for smart plug page to load
        cy.wait('@smartPlugAPI', {timeout: 30000});

        cy.get('[data-qa="search"]').should('be.visible');
        cy.get('[data-qa="title"]').should('be.visible').contains('My Smart Plugs');

        checkPageNav();
        //checks table is showing the correct data
        tableRegex("UUID", smartPLugUUID, "Error: UUID does not match format");
        tableRegex("Serial Number", smartPlugSN, "Error: smart plug serial number does not match format");
        tableRegex("Device ID", deviceID, "Error: device ID does not match format");
        tableRegex("Created At", dateAndTime, "Error: first seen is showing incorrect date format, should be YYYY-MM-DD HH:MM:SS");

        //checks smart plugs can be deleted using the action button
        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === "Actions") {
                deleteSmartPlug(tableDataIndex, index);
            }
        });

        //checks deleted at shows correct date and time format
        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === "Deleted At") {

                cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').eq(index).then(($td) => {

                    const text2 = $td.text();
                    console.log(text2)
                    const result = dateAndTime.test(text2);
                    console.log(result)
                    if (!result) {
                        throw new Error("Error: deleted at does not match date and time format, YYYY-MM-DD HH:MM:SS");
                    }
                });
            }
        });

        //assigns the dongle to an account and checks that this updates
        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === "Actions") {
                cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').eq(index).find('i[class*="mdi-account-search-outline"]').click();
            }
        });
        cy.get('[data-qa="title.assign"]').should('be.visible').contains('Assign Smart Plug');
        cy.get('[data-qa="search.user"]').eq(0).should('be.visible').type('CavansSmartPlugs');
        cy.get('div[class="v-list-item__title"]').contains('Cavan Beardmore | CavansSmartPlugs').click();
        cy.intercept('**/assign').as('assignAPI');
        cy.get('[data-qa="button.assign"]').should('be.enabled').click();
        cy.wait('@assignAPI', {timeout: 30000});
        cy.get('[data-qa="container.navigation"]').find('i[class*="mdi-refresh"]').click();
        cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {

            const text1 = $elm.text();

            if (text1 === "Registered To") {
                cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').eq(index).click();
                cy.get('[data-qa="card.item"]').should('be.visible').contains("CavansSmartPlugs");
            }
        });

    });
});