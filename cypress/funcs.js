export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000);
    num.toString;
    const newString = string + num
    return newString;
};

export function dashboardSelect(navItem, adminItem, adminMessage) {
    cy.get('[data-cy="main.navbar.side"]').click().get('div').contains(navItem).click();
    if (adminItem && adminMessage) {
        cy.get('div').contains(adminItem).click();
        cy.get('div').contains(adminMessage).click();
    }
};

export function checkPageNav() {
    cy.get('[data-cy="footer.container.navigation"]').scrollIntoView();
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').last().click();
    cy.get('[data-cy="footer.container.navigation"]').find('div').next().contains('16-30');
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').first().click();
    cy.get('[data-cy="footer.container.navigation"]').find('div').next().contains('1-15');
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').first().next().next().next().click();
    //cy.get('[data-cy="footer-page-nav"]').find('div').next().contains('31-45');
    cy.get('[data-cy="navigation.input.page"]').type('1').type("{downArrow}").type("{enter}");;
};

export function createAccount(username, clear) {
    if (!clear) {
        cy.get('[data-cy="actions.button.creation"]').click();
        cy.get('[data-cy="createform.input.username"]').type(addRNG(username));
        cy.get('[data-cy="createform.input.email"]').type('test@test.test');
        cy.get('[data-cy="createform.input.postcode"]').type('T3ST');
        cy.get('[data-cy="createform.input.address"]').type('123 test street');
        cy.get('[data-cy="createform.input.phonenumber"]').type('11111 111111');
    } else {
        cy.get('[data-cy="actions.button.creation"]').click();
        cy.get('[data-cy="createform.input.username"]').clear().type(addRNG(username));
        cy.get('[data-cy="createform.input.email"]').clear().type('test@test.test');
        cy.get('[data-cy="createform.input.postcode"]').clear().type('T3ST');
        cy.get('[data-cy="createform.input.address"]').clear().type('123 test street');
        cy.get('[data-cy="createform.input.phonenumber"]').clear().type('11111 111111');
    }
}

export function loginCheck(username, password, check){
    cy.get('[data-cy="loginform.field.username"]').clear().type(username);
    cy.get('[data-cy="loginform.field.password"]').clear().type(password);
    cy.get('[data-cy="loginform.button.login"]').click();
    if (check) {
        cy.get('[data-cy="loginform.field.username"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
        cy.get('[data-cy="loginform.field.password"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
    }
}