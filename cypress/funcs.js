export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000);
    num.toString;
    const newString = string + num
    return newString;
};

export function dashboardSelect(navItem, adminItem) {
    cy.get('[data-qa="main.navbar"]').click().get('div').contains(navItem).click();
    if (adminItem) {
        cy.get('[data-qa="title.text"]').contains(adminItem).click();
    }
};

export function checkPageNav() {
    cy.get('[data-qa="container.navigation"]').scrollIntoView();
    cy.get('[data-qa="buttoncontainer.navigation"]').find('li').last().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('16-30');
    cy.get('[data-qa="buttoncontainer.navigation"]').find('li').first().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('1-15');
    cy.get('[data-qa="buttoncontainer.navigation"]').find('li').first().next().next().next().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('31-45');
    cy.get('[data-qa="jumptopage.input.page"]').type('1').type("{downArrow}").type("{enter}");;
};

export function createAccount(username, clear) {
    if (!clear) {
        cy.get('[data-qa="button.creation"]').click();
        cy.get('[data-qa="form.field.username"]').type(addRNG(username));
        cy.get('[data-qa="form.field.email"]').type('test@test.test');
        cy.get('[data-qa="form.field.postcode"]').type('T3ST');
        cy.get('[data-qa="form.field.address"]').type('123 test street');
        cy.get('[data-qa="form.field.phonenumber"]').type('11111 111111');
    } else {
        cy.get('[data-qa="button.creation"]').click();
        cy.get('[data-qa="form.field.username"]').clear().type(addRNG(username));
        cy.get('[data-qa="form.field.email"]').clear().type('test@test.test');
        cy.get('[data-qa="form.field.postcode"]').clear().type('T3ST');
        cy.get('[data-qa="form.field.address"]').clear().type('123 test street');
        cy.get('[data-qa="form.field.phonenumber"]').clear().type('11111 111111');
    }
}

export function loginCheck(username, password, check){
    cy.get('[data-qa="field.username"]').clear().type(username);
    cy.get('[data-qa="field.password"]').clear().type(password);
    cy.get('[data-qa="button.login"]').click();
    if (check) {
        cy.get('[data-qa="field.username"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
        cy.get('[data-qa="field.password"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
    }
}

export function changeDetails(correct) {
    if (correct) {
        cy.get('[data-qa="form.field.username"]').clear().type('GivQA');
        cy.get('[data-qa="form.field.firstname"]').clear().type('Ross');
        cy.get('[data-qa="form.field.surname"]').clear().type('Coates');
        cy.get('[data-qa="form.field.address"]').clear().type('GivEnergy');
        cy.get('[data-qa="form.field.postcode"]').clear().type('ST6');
        cy.get('[data-qa="form.field.phonenumber"]').clear().type('01234567897');
        cy.get('[data-qa="form.field.email"]').clear().type('ross.coates@givenergy.co.uk');
        cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    } else {
        cy.get('[data-qa="form.field.username"]').type('1');
        cy.get('[data-qa="form.field.firstname"]').type('s');
        cy.get('[data-qa="form.field.surname"]').type('s');
        cy.get('[data-qa="form.field.address"]').clear().type('Brymbo Road');
        cy.get('[data-qa="form.field.postcode"]').clear().type('ST9');
        cy.get('[data-qa="form.field.phonenumber"]').type('7');
        cy.get('[data-qa="form.field.email"]').clear().type('ross.coates@givenergy.com');
        cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    }
}

export function changePassword(current, newP, repeatP, first, second) {
    if (first) {
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').should('not.be.enabled');
        cy.get('[data-qa="form.field.repeat"]').parents('.v-input__control').find('.v-messages__message')
            .contains('This field must be the same as Password');
        cy.reload();
    } else if (second) {
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-alert"]').parent().find('p').contains('The current password is incorrect.');
        cy.reload();
    } else {
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Your password has been updated!');
    }
}

export function checkReturnsFormat() {
    cy.get('[data-qa="tabledata.creator"]').click();
    cy.get('[data-qa="tabledata.creator"]').should('be.visible');
    cy.get('[data-qa="tabledata.customer"]').click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    cy.get('[data-qa="tabledata.installer"]').click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    cy.get('[data-qa="tabledata.distributor"]').click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    cy.get('[data-qa="tabledata.ticket"]').click();
    cy.get('[data-qa="card.item"]').should('be.visible');
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

export function reportingFilter(filter) {
    cy.get('[data-qa="icon.button.filter"]').click();
    cy.get('[data-qa="nav.dropdown.filter"]').children().contains(filter).click();
    cy.get('[data-qa="span.name"]').contains('All Time # ' + filter);
    cy.get('[data-qa="span.name"]').contains(filter + ' in Date Range');
    cy.get('[data-qa="span.name"]').contains(filter + ' Past 30 Days');
    cy.get('[data-qa="span.name"]').contains(filter + ' Past 7 Days');
    cy.get('[data-qa="span.name"]').contains(filter + ' Today');
}
