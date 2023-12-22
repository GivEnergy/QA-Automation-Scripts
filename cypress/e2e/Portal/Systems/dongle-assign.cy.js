import {adminLogin, engineerLogin} from "../../../logins";
import {
    dashboardSelect,
    addRNG
} from "../../../funcs";

//this should prevent any tests from hanging
const time = 180000;
beforeEach(() => {
    setTimeout(() => {
        throw new Error(`Test failed: exceeded run time limit of ${time}ms`);
    }, time);
});
describe("my inverter page", () => {
    let customerUsername;
    it("creates a customer account", () => {

        //logs in as engineer first to create a customer account
        engineerLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/staging.givenergy.cloud/user').as('userAPI');
        dashboardSelect('Account List');
        cy.wait('@userAPI', {timeout: 30000});

        cy.get('[data-qa="field.search"]').click();
        cy.get('[data-qa="button.creation"]').contains('Create Customer Account').click();

        //creates alias'
        cy.get('[data-qa="form.field.email"]').as('email');
        cy.get('[data-qa="form.field.postcode"]').as('postcode');
        cy.get('[data-qa="form.field.address"]').as('address');
        cy.get('[data-qa="form.field.phonenumber"]').as('phoneNumber');
        cy.get('[data-qa="form.field.username"]').as('username');
        cy.get('[data-qa="form.field.firstName"]').as('firstName');
        cy.get('[data-qa="form.field.surname"]').as('surname');

        //creates customer account
        cy.get('@email').prev().contains('Email');
        cy.get('@email').type('fakeEmail@gmail.com');
        cy.get('@postcode').prev().contains('Postcode');
        cy.get('@postcode').type('T3ST');
        cy.get('@address').prev().contains('Address Line 1');
        cy.get('@address').type('123 test street');
        cy.get('@phoneNumber').prev().contains('Phone Number');
        cy.get('@phoneNumber').type('11111 111111');
        cy.get('@firstName').prev().contains('First Name');
        cy.get('@firstName').type('Test');
        cy.get('@surname').prev().contains('Surname');
        cy.get('@surname').type('Customer');
        cy.get('[data-qa="form.field.plantType"]').click();
        cy.get('div[class="v-list-item__title"]').contains('Single Inverter').click();
        cy.get('@username').then(() => {

            //sets username used for account as variable here
            customerUsername = addRNG('testCustomer');

            cy.get('@username').clear();
            cy.get('@username').type(customerUsername);
            cy.get('[data-qa="button.create"]').contains('Create').click();
        })
    })

    it("assigns dongle to newly created customer", () => {

        adminLogin();
        //creates alias for dashboard API request
        cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
        cy.intercept('**/staging.givenergy.cloud/inverter').as('inverterAPI');
        //opens my inverters and reloads page to hide nav bar
        dashboardSelect('My Inverters');
        cy.wait('@inverterAPI' , {timeout: 30000});
        cy.get('[data-qa="title.text"]').contains('My Inverters');
        cy.get('[data-qa="search"]').click();

        //opens register a dongle page and closes it
        cy.get('[data-qa="button.register"]').contains('Register a New Inverter').click();
        cy.get('[data-qa="title.assign"]').contains('Assign a Dongle');
        cy.get('[data-qa="button.cancel"]').click();

        //opens register a dongle page and enters the details
        cy.get('[data-qa="button.register"]').contains('Register a New Inverter').click();
        cy.get('[data-qa="search.user"]').parent('div[class*="v-select__slot"]').type('NotARealUsername123');
        cy.get('div[class="v-select-list"]').should('not.exist');
        cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('!!!!!!!!!!');
        cy.get('[data-qa="field.sn"]').parent().find('div[class*="v-messages__message"]').contains('This field can only contain alphanumeric characters');
        cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').clear();
        cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('WO2249G378');
        cy.get('[data-qa="search.user"]').parent('div[class*="v-select__slot"]').clear();

        //username used to create account is used here to assign dongle to
        cy.get('[data-qa="search.user"]').parent('div[class*="v-select__slot"]').type(customerUsername);
        cy.get('div[class*="v-list-item__title"]').contains(customerUsername).click();
        cy.get('[data-qa="field.vc"]').parent('div[class*="v-text-field__slot"]').type('F9237');
        cy.get('[data-qa="button.submit"]').contains('Submit').click();
        cy.get('div[class*="v-messages__message"]').contains('This dongle is already assigned to another user');
        cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('{backspace}');
        cy.get('[data-qa="field.sn"]').parent('div[class*="v-text-field__slot"]').type('7');
        cy.get('[data-qa="button.submit"]').contains('Submit').click();

        //deletes created dongle
        cy.get('i[class*="mdi-refresh"]').click();
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(1).click();
        cy.get('[data-qa="card.deleteDialog"]').should('be.visible');
        cy.get('[data-qa="button.cancel"]').eq(1).click();
        cy.get('[data-qa="card.deleteDialog"]').should('not.exist');
        cy.get('[data-qa="table"]').find('tr').eq(1).find('td').last().find('div').find('div').children().eq(1).click();
        cy.get('[data-qa="card.deleteDialog"]').should('be.visible');
        cy.get('[data-qa="button.delete"]').click();
        cy.get('[data-qa="container.navigation"]').find('li').first().next().next().next().click();
    })
});