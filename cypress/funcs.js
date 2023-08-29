export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000);
    num.toString;
    const newString = string + num
    return newString;
};

export function handleError(e, runnable) {
    if (e.name === 'TypeError') {
        console.log(e);
        console.log("runnable", runnable);
        return false;
    } else {
        console.log(e);
        console.log("runnable", runnable);
        return true;
    }
};

export function dashboardSelect(navItem, adminItem, adminMessage) {
    cy.get(".v-navigation-drawer__content").click().get('div').contains(navItem).click();
    if (adminItem && adminMessage) {
        cy.get('div').contains(adminItem).click();
        cy.get('div').contains(adminMessage).click();
    }
};

export function checkPageNav() {
    cy.get('.v-data-footer').scrollIntoView();
    cy.get('.pt-2').find('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear().type('1').type("{enter}");;
};