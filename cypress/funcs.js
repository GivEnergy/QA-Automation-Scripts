export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000);
    num.toString;
    const newString = string + num
    return newString;
};

export function dashboardSelect(navItem, adminItem, adminMessage) {
    cy.get('[data-cy="main.navbar.side"]').click().get('div').contains(navItem).click();
    if (adminItem && adminMessage) {
        cy.get('[data-cy="navigation.title.card"]').contains(adminItem).click();
        cy.get('[data-cy="returns.title.header"]').contains(adminMessage).click();
    }
};

export function checkPageNav() {
    cy.get('[data-cy="footer.container.navigation"]').scrollIntoView();
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').last().click();
    cy.get('[data-cy="footer.container.navigation"]').find('div').next().contains('16-30');
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').first().click();
    cy.get('[data-cy="footer.container.navigation"]').find('div').next().contains('1-15');
    cy.get('[data-cy="navigation.buttoncontainer.pagenav"]').find('li').first().next().next().next().click();
    cy.get('[data-cy="footer-page-nav"]').find('div').next().contains('31-45');
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

export function changeDetails(correct) {
    if (correct) {
        cy.get('[data-cy="detailschange.input.username"]').clear().type('GivQA');
        cy.get('[data-cy="detailschange.input.firstname"]').clear().type('Ross');
        cy.get('[data-cy="detailschange.input.surname"]').clear().type('Coates');
        cy.get('[data-cy="detailschange.input.address"]').clear().type('GivEnergy');
        cy.get('[data-cy="detailschange.input.postcode"]').clear().type('ST6');
        cy.get('[data-cy="detailschange.input.phonenumber"]').clear().type('01234567897');
        cy.get('[data-cy="detailschange.input.email"]').clear().type('ross.coates@givenergy.co.uk');
        cy.get('[data-cy="detailschange.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    } else {
        cy.get('[data-cy="detailschange.input.username"]').type('1');
        cy.get('[data-cy="detailschange.input.firstname"]').type('s');
        cy.get('[data-cy="detailschange.input.surname"]').type('s');
        cy.get('[data-cy="detailschange.input.address"]').clear().type('Brymbo Road');
        cy.get('[data-cy="detailschange.input.postcode"]').clear().type('ST9');
        cy.get('[data-cy="detailschange.input.phonenumber"]').type('7');
        cy.get('[data-cy="detailschange.input.email"]').clear().type('ross.coates@givenergy.com');
        cy.get('[data-cy="detailschange.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    }
}

export function changePassword(current, newP, repeatP, first, second) {
    if (first) {
        cy.get('[data-cy="changeform.input.currentpassword"]').clear().type(current);
        cy.get('[data-cy="changeform.input.newpassword"]').clear().type(newP);
        cy.get('[data-cy="changeform.input.repeatpassword"]').clear().type(repeatP);
        cy.get('[data-cy="changeform.button.submit"]').contains('Submit').should('not.be.enabled');
        cy.get('[data-cy="changeform.input.repeatpassword"]').parents('.v-input__control').find('.v-messages__message')
            .contains('This field must be the same as Password');
        cy.reload();
    } else if (second) {
        cy.get('[data-cy="changeform.input.currentpassword"]').clear().type(current);
        cy.get('[data-cy="changeform.input.newpassword"]').clear().type(newP);
        cy.get('[data-cy="changeform.input.repeatpassword"]').clear().type(repeatP);
        cy.get('[data-cy="changeform.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-alert"]').parent().find('p').contains('The current password is incorrect.');
        cy.reload();
    } else {
        cy.get('[data-cy="changeform.input.currentpassword"]').clear().type(current);
        cy.get('[data-cy="changeform.input.newpassword"]').clear().type(newP);
        cy.get('[data-cy="changeform.input.repeatpassword"]').clear().type(repeatP);
        cy.get('[data-cy="changeform.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Your password has been updated!');
    }
}

export function checkReturnsFormat() {
    cy.get('tbody').children().eq(0).find('td').eq(5).contains(/^\d{4,}$/);
    cy.get('tbody').children().eq(0).find('td').eq(6).contains(/^[A-Za-z]{8,}$/);
    cy.get('tbody').children().eq(0).find('td').eq(7)
      .contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
}

export function checkReturnsActions() {
    cy.get('i[class*="mdi-email-sync"]').first().click();
    cy.get('a[href*="admin/returns labels"]').first().click();
    cy.get('i[class*="mdi-delete"]').first().click();
}