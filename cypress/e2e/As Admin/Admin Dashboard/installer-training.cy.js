import { adminLogin } from "../../../logins";

describe("installer training", () => {
    it("tests installer training", () => {
      cy.viewport(1920, 1080);
      adminLogin()

    //navigates to firmware updates
    cy.get(".v-navigation-drawer__content").click().get('div').contains('Admin Dashboard').click();
    cy.get('div').contains('Installer Training').click();
    cy.get('div').contains('Previous Events').click();
    cy.get('div').contains('Next Event').click();

    //checks page navigation
    cy.get('ul').find('li').last().click();
    cy.get('.spacer').next().contains('16-30');
    cy.get('ul').find('li').first().click();
    cy.get('.spacer').next().contains('1-15');
    cy.get('ul').find('li').first().next().next().next().click();
    cy.get('.spacer').next().contains('31-45');
    cy.get('label').contains('Jump to Page').next().clear();

    //checks format
    for (var i = 0; i < 15; i++){
        cy.get('tbody').children().eq(i).find('td').first().contains(/^[A-Za-z]{1,}\s[A-Za-z]{1,}/);
        cy.get('tbody').children().eq(i).find('td').eq(1).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(2).contains(/^[E][x][p][i][r][e][d]|^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
        cy.get('tbody').children().eq(i).find('td').eq(3).click();
    };


    //checks link
    cy.get('a').contains('View on Eventbrite').click();

    //checks attendee page
    cy.get('tbody').children().eq(0).find('td').last()
        .find('div').find('span').find('span').find('span').find('button').click();
    cy.get('div').contains('Confirmed Attendees');
    cy.get('div').contains('Unconfirmed Attendees');
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('table').find('tbody')
        .children().eq(0).find('td').first().contains(/^[A-Za-z]{1,}\s[A-Za-z]{1,}$/);
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('table').find('tbody')
        .children().eq(0).find('td').eq(4).contains(/^\d{4,}[-]\d{2,}[-]\d{2,}\s\d{2,}[:]\d{2,}[:]\d{2,}$/);
    cy.get('.v-card__title').contains('Unconfirmed Attendees').parent().find('table').find('tbody')
        .children().eq(0).find('td').first().contains(/^[A-Za-z]{1,}\s[A-Za-z]{1,}$/);
    cy.get('.v-card__title').contains('Unconfirmed Attendees').parent().find('table').find('tbody')
        .children().eq(0).find('td').last().find('button').click();

    //checks navigation on attendee page
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('nav').find('ul')
        .children().last().click();
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('nav').find('ul')
        .children().first().click();
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('nav').find('ul')
        .children().eq(3).click();
    cy.get('.v-card__title').contains('Confirmed Attendees').parent().find('nav').next().find('div')
        .find('label').contains('Jump to Page').next().clear();
    cy.get('.v-card__title').contains('Unconfirmed Attendees').parent().find('.v-data-footer')
        .find('.v-data-footer__icons-after').find('button').click();
    cy.get('.v-card__title').contains('Unconfirmed Attendees').parent().find('.v-data-footer')
        .find('.v-data-footer__icons-before').find('button').click();
    });
});
  