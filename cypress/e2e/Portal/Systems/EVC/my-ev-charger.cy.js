import { adminLogin } from "../../../../logins";
import {dashboardSelect, tableContains, tableRegex,} from "../../../../funcs";
import {dateAndTime} from "../../../../regex";


//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("ev charger", () => {
    it("tests ev charger card main page and general tab", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.get('[data-qa="alias"]').should('be.visible');
        cy.get('[data-qa="status"]').should('be.visible').then(($el) => {

            const text = $el.text();

            if (text !== "ONLINE" && text !== "OFFLINE") {
                throw new Error("Error: status is not online or offline");
            }
        });
        cy.get('[data-qa="button.edit.name"]').should('be.visible').click();
        cy.get('[data-qa="card.dialog.edit"]').should('be.visible');
        cy.get('[data-qa="alias"]').then(($el) => {

            const alias = $el.text();
            const newAlias = alias + "1";

            cy.get('[data-qa="button.edit.confirm"]').should('not.be.enabled');
            cy.get('[data-qa="field.name"]').type("1");
            cy.get('[data-qa="button.edit.confirm"]').should('be.enabled').click();
            cy.get('[data-qa="alias"]', {timeout: 1000}).then(($el2) => {
                console.log($el2.text() + "1");
                console.log(newAlias);
                if ($el2.text() + "1" !== newAlias) {
                    throw new Error("Error: alias did not update");
                }
            })
        });
        cy.get('[data-qa="img.evc"]').should('be.visible');
        cy.get('[data-qa="title.powerNow"]').should('be.visible');
        cy.get('[data-qa="powerNowValue"]').should('be.visible');
        cy.get('[data-qa="header.mode"]').should('be.visible').contains('Mode');
        cy.get('[data-qa="header.modeValue"]').should('be.visible').then(($el) => {
            console.log($el.text().trim());
            if ($el.text().trim() !== "Grid" && $el.text() !== "Solar" && $el.text() !== "Hybrid" && $el.text() !== "Inverter Control") {
                throw new Error("Error: displayed incorrect mode");
            }
        });
        cy.get('[data-qa="chip"]').should('be.visible').contains("Vehicle Not Plugged In");
        cy.get('[data-qa="button.status"]').should('be.visible');
        cy.get('[data-qa="header.energy"]').should('be.visible').contains('Energy Usage');
        cy.get('[data-qa="title.energy"]').eq(0).should('be.visible').contains('Last Charge Session');
        cy.get('[data-qa="title.energy"]').eq(0).should('be.visible').contains('Last Charge Session');
        cy.get('[data-qa="item.energyValue"]').eq(0).should('be.visible');
        cy.get('[data-qa="title.energy"]').eq(1).should('be.visible').contains('Today');
        cy.get('[data-qa="item.energyValue"]').eq(1).should('be.visible');
        cy.get('[data-qa="title.energy"]').eq(2).should('be.visible').contains('Total');
        cy.get('[data-qa="item.energyValue"]').eq(2).should('be.visible');


    });

    it("tests mode and schedule tab within evc card settings", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});
        cy.get('[data-qa="button.edit.name"]').should('be.visible').click();
        cy.get('[data-qa="field.name"]').clear();
        cy.get('[data-qa="field.name"]').type("545688 (13)");
        cy.get('[data-qa="button.edit.confirm"]').click();

        cy.get('div[class="v-tab"]').contains('Settings').should('be.visible').click();

        cy.get('[data-qa="card.mode"]').eq(0).should('be.visible').contains('Solar');
        cy.get('[data-qa="card.mode"]').eq(1).should('be.visible').contains('Hybrid');
        cy.get('[data-qa="card.mode"]').eq(2).should('be.visible').contains('Grid');
        cy.get('[data-qa="card.mode"]').eq(3).should('be.visible').contains('Inverter Control');

        cy.get('div[class="v-tab"]').contains('Schedule').should('be.visible').click();
        cy.get('[data-qa="select.schedule"]').should('be.visible').click();
        cy.get('div[class="v-list-item__title"]').contains('Please add a new schedule');
        cy.get('[data-qa="button.addSchedule"]').should('be.enabled').contains('Add a New Schedule').click();

        cy.get('[data-qa="button.cancel"]').should('be.enabled');
        cy.get('[data-qa="button.save"]').should('be.enabled');
        cy.get('[data-qa="field.scheduleName"]').should('be.visible');
        cy.get('[data-qa="field.scheduleName"]').clear();
        cy.get('[data-qa="field.scheduleName"]').type("Test Schedule");
        cy.get('[data-qa="checkbox.activate"]').click({force: true});
        cy.get('[data-qa="field.startTime"]').type('01:30');
        cy.get('[data-qa="field.duration"]').clear();
        cy.get('[data-qa="field.duration"]').type('04h30m');
        cy.get('[data-qa="selector.days"]').find('div[class="v-select__selections"]').contains('Everyday');
        cy.get('[data-qa="selector.days"]').eq(0).click();
        cy.get('div[class="v-list-item__title"]').contains('Sunday').scrollIntoView();
        cy.get('div[class="v-list-item__title"]').contains('Saturday').click();
        cy.get('div[class="v-list-item__title"]').contains('Sunday').click();
        cy.get('[data-qa="alias"]').click();
        cy.get('[data-qa="selector.days"]').find('div[class="v-select__selections"]').contains('Weekdays');
        cy.get('[data-qa="selector.days"]').eq(0).click();
        cy.get('div[class="v-list-item__title"]').contains('Saturday').click();
        cy.get('div[class="v-list-item__title"]').contains('Sunday').click();
        cy.get('div[class="v-list-item__title"]').contains('Monday').scrollIntoView();
        cy.get('div[class="v-list-item__title"]').contains('Monday').click();
        cy.get('div[class="v-list-item__title"]').contains('Tuesday').click();
        cy.get('div[class="v-list-item__title"]').contains('Wednesday').click();
        cy.get('div[class="v-list-item__title"]').contains('Thursday').click();
        cy.get('div[class="v-list-item__title"]').contains('Friday').click();
        cy.get('[data-qa="alias"]').click();
        cy.get('[data-qa="selector.days"]').find('div[class="v-select__selections"]').contains('Weekend');
        cy.get('[data-qa="input.chargeCurrent"]').type('{backspace}');
        cy.get('[data-qa="button.save"]').should('be.enabled').click();

        cy.get('[data-qa="card.schedule"]').should('be.visible').contains('01:30 to 06:00');
        cy.get('[data-qa="duration"]').contains('04h 30m');
        cy.get('[data-qa="chip.day"]').eq(0).contains('Sat');
        cy.get('[data-qa="chip.day"]').eq(1).contains('Sun');
        cy.get('[data-qa="chip.chargeLimit"]').contains('6 A');
        cy.get('[data-qa="button.edit"]').should('be.visible');
        cy.get('[data-qa="button.toggleActive"]').should('be.enabled').contains('Disable').click();
        cy.get('[data-qa="button.toggleActive"]').should('be.enabled').contains('Enable');
        cy.get('[data-qa="select.schedule"]').should('be.visible').click();
        cy.get('div[class="v-list-item__title"]').contains('Test Schedule');
        cy.get('[data-qa="button.delete"]').should('be.enabled').click();
        cy.get('[data-qa="title.deleteSchedule"]').should('be.visible');
        cy.get('[data-qa="text.deleteSchedule"]').should('be.visible');
        cy.get('[data-qa="button.deleteSchedule"]').click();

    })

    it("tests other and logs tab within evc card settings", () => {

        adminLogin();

        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        dashboardSelect('My EV Chargers');

        //creates alias for energy graph API request
        cy.intercept('**/ev-charger/11288853545688').as('evchargerAPI');
        cy.visit("https://staging.givenergy.cloud/ev-charger/11288853545688");
        cy.wait('@evchargerAPI', {timeout: 30000});

        cy.get('div[class="v-tab"]').contains('Settings').should('be.visible').click();
        cy.get('div[class="v-tab"]').contains('Other').should('be.visible').click();

        cy.get('[data-qa="switch.led"]').parent().next().as('ledLabel');
        cy.get('@ledLabel').then(($el) => {
            const text = $el.text();

            if (text === "Off") {
                cy.get('@ledLabel').contains('Off');
                cy.get('[data-qa="switch.led"]').click({force: true});
                cy.get('@ledLabel').contains('On');
                cy.get('[data-qa="switch.led"]').click({force: true});

            } else if (text === "On") {
                cy.get('@ledLabel').contains('On');
                cy.get('[data-qa="switch.led"]').click({force: true});
                cy.get('@ledLabel').contains('Off');
                cy.get('[data-qa="switch.led"]').click({force: true});
            } else {
                throw new Error("Error: LED label has a value that is not off or on");
            }
        });

        //cy.get('[data-qa="card.reset"]').should('be.visible').contains('Factory Reset EV Charger');

        cy.get('[data-qa="button.restart"]').should('be.visible');

        cy.get('[data-qa="switch.fuzeSize"]').then(($el) => {
           const enabled = $el.attr('aria-checked');
            console.log(enabled)
           if(enabled === "true") {
               cy.get('[data-qa="switch.fuzeSize"]').click({force: true});
               cy.get('[data-qa="switch.fuzeSize"]', {timeout: 1000}).then(($el2) => {
                   const enabled2 = $el2.attr('aria-checked');
                   console.log(enabled2)
                   if (enabled2 === "true") {
                       throw new Error("Error: fuze size switch should be disabled");
                   }
               });
           } else if (enabled === "false") {
               cy.get('[data-qa="switch.fuzeSize"]').click({force: true});
               cy.get('[data-qa="switch.fuzeSize"]', {timeout: 1000}).then(($el2) => {
                   const enabled2 = $el2.attr('aria-checked');
                   console.log(enabled2)
                   if (enabled2 === "false") {
                       throw new Error("Error: fuze size switch should be enabled");
                   }
               });
           }

        });

        cy.get('[data-qa="switch.plugAndGo"]').parent().next().as('plugAndGoLabel');
        cy.get('@plugAndGoLabel').then(($el) => {
            const value = $el.text();

            if (value === "Off"){
                cy.get('[data-qa="switch.plugAndGo"]').click({force: true});
                cy.get('@plugAndGoLabel').contains('On');
            } else if (value === "On") {
                cy.get('[data-qa="switch.plugAndGo"]').click({force: true});
                cy.get('@plugAndGoLabel').contains('Off');
            }
        });

        cy.get('[data-qa="switch.sessionLimit"]').then(($el) => {
            const enabled = $el.attr('aria-checked');

            if (enabled === "true"){
                cy.get('[data-qa="field.sessionLimit"]').clear();
                cy.get('[data-qa="field.sessionLimit"]').type('100');
                cy.get('[data-qa="switch.sessionLimit"]').click({force: true});
                cy.get('[data-qa="switch.sessionLimit"]', {timeout: 1000}).then(($el) => {
                    const enabled = $el.attr('aria-checked');

                    if (enabled === "true"){
                        throw new Error("Error: session limit switch should be disabled");
                    }
                });
            } else if (enabled === "false") {
                cy.get('[data-qa="switch.sessionLimit"]').click({force: true});
                cy.get('[data-qa="field.sessionLimit"]').type('100');
                cy.get('[data-qa="switch.sessionLimit"]', {timeout: 1000}).then(($el) => {
                    const enabled = $el.attr('aria-checked');

                    if (enabled === "false"){
                        throw new Error("Error: session limit switch should be enabled");
                    }
                });
            }
        });

        cy.get('[data-qa="button.unlock"]').should('be.visible');

        cy.get('div[class="v-tab"]').last().then(($el) => {
            const value = $el.text();

            if (value === "Logs") {
                cy.get('div[class="v-tab"]').last().click();
                cy.get('[data-qa="table"]').should('be.visible');
                cy.get('[data-qa="search.user"]').should('be.enabled');
                cy.get('[data-qa="autocomplete.command"]').click();
                cy.get('[data-qa="autocomplete.command"]').type('{downArrow}');
                cy.get('[data-qa="autocomplete.command"]').type('{downArrow}');
                cy.get('[data-qa="autocomplete.command"]').type('{enter}');
                tableContains("Setting", "Change Active Schedule", "Error: filtering by command did not work");
                tableRegex("Time", dateAndTime, "Error: date and time format in time column does not match format YYYY-MM-DD HH:MM:SS");

            }
        });

    })
});
