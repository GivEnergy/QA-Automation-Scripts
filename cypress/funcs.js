export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000);
    num.toString;
    return string + num + "@gmail.com";
}

export function dashboardSelect(navItem, adminItem) {
    cy.get('[data-qa="main.navbar"]').children().eq(0).click().contains(navItem).click();
    if (adminItem) {
        cy.get('[data-qa="title.text"]').contains(adminItem).click();
    }
}

export function checkPageNav() {
    cy.get('[data-qa="container.navigation"]').scrollIntoView();
    cy.get('[data-qa="container.navigation"]').find('li').last().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('16-30');
    cy.get('[data-qa="container.navigation"]').find('li').first().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('1-15');
    cy.get('[data-qa="container.navigation"]').find('li').first().next().next().next().click();
    cy.get('[data-qa="container.navigation"]').find('div').next().contains('31-45');
    cy.get('[data-qa="jumpToPage.input.page"]').type('1').type("{downArrow}").type("{enter}");
}

export function createAccount(username, clear) {
    if (!clear) {
        cy.get('[data-qa="button.creation"]').contains('Create Distributor Account').click();
        cy.get('[data-qa="form.field.email"]').prev().contains('Email');
        cy.get('[data-qa="form.field.email"]').type(addRNG('Distributor'));
        cy.get('[data-qa="form.field.postcode"]').prev().contains('Postcode');
        cy.get('[data-qa="form.field.postcode"]').type('T3ST');
        cy.get('[data-qa="form.field.address"]').prev().contains('Address Line 1');
        cy.get('[data-qa="form.field.address"]').type('123 test street');
        cy.get('[data-qa="form.field.phonenumber"]').prev().contains('Phone Number');
        cy.get('[data-qa="form.field.phonenumber"]').type('11111 111111');
    } else {
        cy.get('[data-qa="button.creation"]').click();
        cy.get('[data-qa="form.field.email"]').clear().type(addRNG('Distributor'));
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
        cy.get('[data-qa="form.field.firstName"]').clear().type('Ross');
        cy.get('[data-qa="form.field.surname"]').clear().type('Coates');
        cy.get('[data-qa="form.field.address"]').clear().type('GivEnergy');
        cy.get('[data-qa="form.field.postcode"]').clear().type('ST6');
        cy.get('[data-qa="form.field.phoneNumber"]').clear().type('01234567897');
        cy.get('[data-qa="form.field.email"]').clear().type('ross.coates@givenergy.co.uk');
        cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    } else {
        cy.get('[data-qa="form.field.firstName"]').type('s');
        cy.get('[data-qa="form.field.surname"]').type('s');
        cy.get('[data-qa="form.field.address"]').clear().type('Brymbo Road');
        cy.get('[data-qa="form.field.postcode"]').clear().type('ST9');
        cy.get('[data-qa="form.field.phoneNumber"]').type('7');
        cy.get('[data-qa="form.field.email"]').clear().type('ross.coates@givenergy.com');
        cy.get('[data-qa="form.button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    }
}

export function changePassword(current, newP, repeatP, order) {
    if (order === 'first') {
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').should('not.be.enabled');
        cy.get('[data-qa="form.field.repeat"]').parents('.v-input__control').find('.v-messages__message')
            .contains('This field must be the same as Password');
        dashboardSelect('Account Settings');
        cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
    } else if (order === 'second') {
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-alert"]').parent().find('p').contains('The current password is incorrect.');
        dashboardSelect('Account Settings');
        cy.get('[data-qa="link.button.security"]').contains('Manage Account Security').click();
    } else if (order === 'third'){
        cy.get('[data-qa="form.field.current"]').clear().type(current);
        cy.get('[data-qa="form.field.new"]').clear().type(newP);
        cy.get('[data-qa="form.field.repeat"]').clear().type(repeatP);
        cy.get('[data-qa="button.submit"]').contains('Submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Your password has been updated!');
    }
}

export function checkReturnsFormat() {
    cy.get('[data-qa="card.item"]').should('not.exist');
    
    cy.get('[data-qa="tableData.creator"]').first().click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    cy.get('[data-qa="title.header"]').click();
    cy.get('[data-qa="card.item"]').should('not.be.visible');

    cy.get('[data-qa="tableData.customer"]').first().click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    cy.get('[data-qa="title.header"]').click();
    cy.get('[data-qa="card.item"]').should('not.be.visible');

    cy.get('[data-qa="tableData.ticket"]').first().click();
    cy.get('[data-qa="card.item"]').should('be.visible');
    tableRegex('Created At', /^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}[:]\d{2,2}$/, 'Error: created at does not meet yyyy-mm-dd hh:mm:ss');
}

export function checkReturnsActions() {
    cy.get('i[class*="mdi-email-sync"]').first().click();
    cy.get('a[href*="admin/returns"]').first().click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-qa="button.cancel"]').contains('Cancel').click();
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

export function getNum(div) {
    const text = div.text();
    const str = text.split(' ')[2];
    const num = Number(str);
    return num
}

export function createReturnItem(serialNumber1, serialNumber2) {
    cy.get('[data-qa="button.create"]').contains('Create Return').should('not.be.enabled');
    cy.get('[data-qa=."autocomplete.typemodel"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.category"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).should('not.be.enabled');
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('[data-qa="autocomplete.typemodel"]').eq(1).click().type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).type('67GHET78D!');
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.validate"]').should('not.be.enabled');
    cy.get('div[class*="v-text-field__details"]').contains('This serial number is not valid');
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).clear().type(serialNumber1);
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="button.edit"]').eq(1).click();
    cy.get('[data-qa="autocomplete.idserialnumber"]').eq(1).clear().type(serialNumber2);
    cy.get('[data-qa="button.validate"]').click();
    cy.get('[data-qa="textarea.reason"]').eq(1).type('Dongle is broken.');
    cy.get('[data-qa="returnsbutton.createreturn"]').contains('Create Return').click();
}

export function tableCheck(heading, regex, errorMessage) {
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
  
            const text2 = $td.text();
          
            const result = regex.test(text2);

            if (!result) {
              throw new Error(errorMessage);
            }
          });
        }
    });
}

export function tableContains(heading, value, errorMessage) {
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
            
            const text2 = $td.text();

            if (text2 !== value) {
              throw new Error(errorMessage);
            }
          });
        }
    });
}

export function tableCSS(heading, expectedCSS, errorMessage) {
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('i').then(($i) => {
                
                const actualCSS = $i.css('color');
                
                if (actualCSS !== expectedCSS) {
                    throw new Error(errorMessage);
                }
          });
        }
    });
}

export function tableClick(heading, value) {
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

        const text1 = $th.text();

        if (text1 === heading) {
          cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('span').eq(0).click();
          cy.get('[data-qa="card.item"]').contains(value).should('be.visible');
        } 
      });
}

export function tableRegex(heading, regex, errorMessage) {
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
            
            const text2 = $td.text();

            const result = regex.test(text2);

            if (!result) {
              throw new Error(errorMessage);
            }
          });
        }
    });
}

export function selectDashboardCard(title, description, search, user) {
    cy.get('[data-qa="card"]').each(($div1, index) => {

        cy.get('[data-qa="card.title"]').eq(index).then(($div2) => {
  
            const text = $div2.text();

          if (text === title) {
            cy.get('[data-qa="card.description"]').eq(index).contains(description).click().scrollIntoView();
            cy.get('[data-qa="button.search"]').eq(index).click();
            cy.get('[data-qa="search"]').eq(1).type(search);
            cy.get('div[class="v-list-item__title"]').contains(user).click();
            cy.get('[data-qa="button.view"]').click();
          }
        });
    });
}

export function myInverterTab(tab) {
    cy.get('[data-qa="card.tab"]').contains(tab).click();
}

export function inverterSoftwareCheck(titles, subtitles) {
    for (var i = 0; i < titles.length; i++) {
        cy.get('[data-qa="tab.content"]').find('div[class="v-card__title"]').contains(titles[i]);
    }
    for (var i = 0; i < subtitles.length; i++) {
        cy.get('[data-qa="tab.content"]').find('div[class="v-card__subtitle"]').contains(subtitles[i]);
    }
}

export function myInverterNotificationsTable(header) {
    for (var i = 0; i < header.length; i++ ) {
        cy.get('[data-qa="table.notifications"]').find('th').contains(header[i]);
    }
}

export function myInverterTable(header) {
    for (var i = 0; i < header.length; i++ ) {
        cy.get('[data-qa="tab.content"]').find('th').contains(header[i]);
    }
}

export function checksCounterIncreasesAndDecreases() {
    cy.get('[data-qa="notification.title"]').should('exist');
    cy.get('[data-qa="notification.content"]').should('exist');

    //checks that the number of notifications increases and decreases with the notifications being read and unread
    cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-check-outline"]').click();
    cy.wait(3000); //necessary or error is thrown as notifications won't have updated
    cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
        
        const text = $span.text();
        const num = Number(text);

        if (num === 0) {
          throw new Error('Notifications counter has not updated');
        }

        cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-outline"]').click();

        cy.wait(3000); //necessary or error is thrown as notifications won't have updated
        cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
        
          const text2 = $span.text();
          const num2 = Number(text2);
  
          if (num2 !== 0) {
            throw new Error('Notifications counter has not updated');
          }
        })
    });

    cy.get('[data-qa="notification.read"]').eq(0).find('[class*="mdi-email-check-outline"]').click();
}

export function checkMarkAsReadWorks(withElse) {
    if (withElse) {
        cy.get('[data-qa="button.allRead"]').click();
        cy.wait(3000); //necessary or error is thrown as notifications won't have updated
        cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
      
          const text = $span.text();
          const num = Number(text);
  
          if (num !== 0) {
            throw new Error('Notifications counter has not updated');
          } else {
            checksCounterIncreasesAndDecreases();
          }
        })
    } else {
        cy.get('[data-qa="button.allRead"]').click();
        cy.wait(3000); //necessary or error is thrown as notifications won't have updated
        cy.get('[data-qa="icon.notification"]').next().find('span[class*="v-badge__badge"]').then(($span) => {
      
          const text = $span.text();
          const num = Number(text);
    
          if (num !== 0) {
            throw new Error('Notifications counter has not updated');
          }
        });
    }
}

export function updateWarrantyAndCheck(warranty, num, tableDataIndex) {
    cy.get('[data-qa="table"').find('tr').eq(tableDataIndex).find('[data-qa="button.warranty"]').click();
    cy.get('[data-qa="card.warranty"]').should('be.visible');
    cy.get('[data-qa="select.warranty"]').click();
    cy.get('div[class="v-list-item__title"]').contains(warranty).click();
    cy.get('[data-qa="button.confirm"]').click();
    cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').last().find('div').find('div').children().eq(1).find('a').then(($a) => {

      const url = $a.attr('href');
      cy.visit(url);

    });

    cy.get('[data-qa="general.title"]').contains('Commission Date').next('[data-qa="general.subtitle"]').then(($div) => {

      const text = $div.text();
      const splitString = text.split('-');

      splitString[0] = Number(splitString[0]) + num;
      splitString[0] = splitString[0].toString();

      const estimate = splitString.join("-");

      cy.get('[data-qa="general.title"]').contains('Warranty Expiry Date').next('[data-qa="general.subtitle"]').then(($div2) => {

        const text2 = $div2.text();

        if (estimate !== text2) {
            throw new Error('Error: warranty expiry date has not been correctly updated');
        } else {
            cy.log('Warranty correctly updated!');
        }

      })
    })
}

export function changeEnergyGraphData(type, dataTypes) {
    cy.get('[data-qa="graphSelected"]').click();
    cy.get('div[class="v-list-item__content"]').contains(type).click();

    for (var i = 0; i < dataTypes.length; i++) {
        cy.get('g[class*="highcharts-legend-item"]').eq(i).contains(dataTypes[i]);
    }
}

export function checkWarranty(headingIndex, tableDataIndex) {
    cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
    cy.get('[data-qa="field.search"]').click();
    cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').eq(headingIndex).then(($td) => {

        const text = $td.text().trim();

        if (text === 'Standard') {

            updateWarrantyAndCheck('Extended', 10, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Standard', 5, tableDataIndex);

        } else if (text === 'Extended') {

            updateWarrantyAndCheck('Standard', 5, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Extended', 10, tableDataIndex);

        } else if (text === 'Twelve_Years') {

            updateWarrantyAndCheck('Standard', 5, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Extended', 10, tableDataIndex);
            dashboardSelect('My Inverters');

            cy.get('[data-qa="auto.model"]').type('{downArrow}').type('{downArrow}').type('{downArrow}').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);

        } else {
            let index = tableDataIndex + 1;
            checkWarranty(headingIndex, index);
        }
    });
}