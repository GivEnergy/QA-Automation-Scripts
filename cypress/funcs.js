export function addRNG(string) {
    let num = Math.floor(Math.random() * 100000); //generates a random number
    num.toString;
    return string + num; //concatenates this num onto a passed in string
}

export function dashboardSelect(navItem, adminItem) {
    //waits for dashboard api request to be successful
    cy.wait('@dashboardAPI', {timeout: 30000});
    cy.get('[data-qa="main.navbar"]').should('be.visible');

    if (adminItem) { //if it needs to navigate to admin dashboard it redirects to /admin rather than using navbar to reduce flakiness
        //creates alias for admin API request
        cy.intercept('**/staging.givenergy.cloud/admin').as('adminAPI');
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains(navItem).click();
        //waits for admin api request to be successful
        cy.wait('@adminAPI', {timeout: 30000});
        cy.get('[data-qa="title.text"]').as('title');
        cy.get('@title').should('be.visible');
        cy.get('@title').contains(adminItem).click();
    } else {
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains(navItem).click();
    }
}

export function checkPageNav() { //checks all the paginate navigations work
    cy.get('[data-qa="container.navigation"]').as('pagination');
    cy.get('@pagination').scrollIntoView();
    cy.get('@pagination').find('li').last().click();
    cy.get('@pagination').find('div').next().contains('16-30');
    cy.get('@pagination').find('li').first().click();
    cy.get('@pagination').find('div').next().contains('1-15');
    cy.get('@pagination').find('li').first().next().next().next().click();
    cy.get('@pagination').find('div').next().contains('31-45');
    cy.get('[data-qa="jumpToPage.input.page"]').as('pageInput');
    cy.get('@pageInput').type('1');
    cy.get('@pageInput').type("{downArrow}");
    cy.get('@pageInput').type("{enter}");
}

export function createAccount(username, clear) {
    //creates aliases
    cy.get('[data-qa="button.creation"]').as('create');
    cy.get('[data-qa="form.field.email"]').as('email');
    cy.get('[data-qa="form.field.postcode"]').as('postcode');
    cy.get('[data-qa="form.field.address"]').as('address');
    cy.get('[data-qa="form.field.phonenumber"]').as('phoneNumber');
    cy.get('[data-qa="form.field.username"]').as('username');
    if (!clear) {
        //enters details into create account form
        cy.get('@create').contains('Create Distributor Account');
        cy.get('@create').click();
        cy.get('@username').prev().contains('Username');
        cy.get('@username').type(addRNG(username));
        cy.get('@email').prev().contains('Email');
        cy.get('@email').type('fakeEmail@gmail.com');
        cy.get('@postcode').prev().contains('Postcode');
        cy.get('@postcode').type('T3ST');
        cy.get('@address').prev().contains('Address Line 1');
        cy.get('@address').type('123 test street');
        cy.get('@phoneNumber').prev().contains('Phone Number');
        cy.get('@phoneNumber').type('11111 111111');
    } else {
        //clears details in the form and enters details again
        cy.get('[data-qa="button.creation"]').click();
        cy.get('@username').clear();
        cy.get('@username').type(addRNG(username));
        cy.get('@email').clear()
        cy.get('@email').type('fakeEmail@gmail.com');
        cy.get('@postcode').clear()
        cy.get('@postcode').type('T3ST');
        cy.get('@address').clear()
        cy.get('@address').type('123 test street');
        cy.get('@phoneNumber').clear()
        cy.get('@phoneNumber').type('11111 111111');
    }
}

export function loginCheck(username, password, check){
    //enters username and password and tries to log in
    cy.get('[data-qa="field.username"]').clear();
    cy.get('[data-qa="field.username"]').type(username);
    cy.get('[data-qa="field.password"]').clear();
    cy.get('[data-qa="field.password"]').type(password);
    cy.get('[data-qa="button.login"]').click();
    if (check) {
        //checks for invalid credentials message
        cy.get('[data-qa="field.username"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
        cy.get('[data-qa="field.password"]').parents('.v-input__control').find('.v-messages__message')
            .contains('These credentials do not match our records');
    }
}

export function changeDetails(correct) {
    //creates aliases
    cy.get('[data-qa="form.field.firstName"]').as('firstName');
    cy.get('[data-qa="form.field.surname"]').as('surname');
    cy.get('[data-qa="form.field.address"]').as('address');
    cy.get('[data-qa="form.field.postcode"]').as('postcode');
    cy.get('[data-qa="form.field.phoneNumber"]').as('phoneNumber');
    cy.get('[data-qa="form.field.email"]').as('email');
    cy.get('[data-qa="form.button.submit"]').as('submit');
    if (correct) {
        //clears fields and enters correct account details
        cy.get('@firstName').clear()
        cy.get('@firstName').type('Ross');
        cy.get('@surname').clear()
        cy.get('@surname').type('Coates');
        cy.get('@address').clear()
        cy.get('@address').type('GivEnergy');
        cy.get('@postcode').clear()
        cy.get('@postcode').type('ST6');
        cy.get('@phoneNumber').clear();
        cy.get('@phoneNumber').type('01234567897');
        cy.get('@email').clear()
        cy.get('@email').type('ross.coates@givenergy.co.uk');
        cy.get('@submit').contains('Submit');
        cy.get('@submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    } else {
        //clears field and enters incorrect details
        cy.get('@firstName').clear()
        cy.get('@firstName').type('s');
        cy.get('@surname').clear()
        cy.get('@surname').type('s');
        cy.get('@address').clear()
        cy.get('@address').type('Brymbo Road');
        cy.get('@postcode').clear()
        cy.get('@postcode').type('ST9');
        cy.get('@phoneNumber').clear();
        cy.get('@phoneNumber').type('7');
        cy.get('@email').clear();
        cy.get('@email').type('ross.coates@givenergy.com');
        cy.get('@submit').contains('Submit');
        cy.get('@submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Account details updated successfully');
    }
}

export function changePassword(current, newP, repeatP, order) {
    //creates aliases
    cy.get('[data-qa="form.field.current"]').as('current');
    cy.get('[data-qa="form.field.new"]').as('new');
    cy.get('[data-qa="form.field.repeat"]').as('repeat');
    cy.get('[data-qa="button.submit"]').as('submit');
    //function is executed three times with different results if blocks refer to which execution
    //first if is incorrect passwords
    if (order === 'first') {
        cy.get('@current').type(current);
        cy.get('@new').type(newP);
        cy.get('@repeat').type(repeatP);
        cy.get('@submit').contains('Submit');
        cy.get('@submit').should('not.be.enabled');
        cy.get('@repeat').parents('.v-input__control').find('.v-messages__message')
            .contains('This field must be the same as Password');
        cy.intercept('**/staging.givenergy.cloud/account-settings').as('accountSettingsAPI');
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains("Account Settings").click();
        cy.wait('@accountSettingsAPI', {timeout: 30000});
        cy.get('[data-qa="link.button.security"]').as('security');
        cy.get('@security').contains('Manage Account Security');
        cy.get('@security').click();
        //second if is incorrect passwords
    } else if (order === 'second') {
        cy.get('@current').type(current);
        cy.get('@new').type(newP);
        cy.get('@repeat').type(repeatP);
        cy.get('@submit').contains('Submit');
        cy.get('@submit').click();
        cy.get('i[class*="mdi-alert"]').parent().find('p').contains('The current password is incorrect.');
        cy.intercept('**/staging.givenergy.cloud/account-settings').as('accountSettingsAPI');
        cy.get('[data-qa="main.navbar"]').children().eq(0).click();
        cy.get('[data-qa="main.navbar"]').contains("Account Settings").click();
        cy.wait('@accountSettingsAPI', {timeout: 30000});
        cy.get('[data-qa="link.button.security"]').as('security');
        cy.get('@security').contains('Manage Account Security');
        cy.get('@security').click();
        //third if is correct passwords
    } else if (order === 'third'){
        cy.get('@current').type(current);
        cy.get('@new').type(newP);
        cy.get('@repeat').type(repeatP);
        cy.get('@submit').contains('Submit');
        cy.get('@submit').click();
        cy.get('i[class*="mdi-check-circle"]').parent().find('p').contains('Your password has been updated!');
    }
}

export function checkReturnsFormat() {
    //checks account cards can be viewed and checks table data
    cy.get('[data-qa="card.item"]').should('not.exist');

    tableClick('Created By');
    cy.get('[data-qa="title.header"]').click();
    cy.get('[data-qa="card.item"]').should('not.be.visible');

    tableClick('Customer');
    cy.get('[data-qa="title.header"]').click();
    cy.get('[data-qa="card.item"]').should('not.be.visible');

    tableClick('Customer');
    tableRegex('Created At', /^\d{4,4}[-]\d{2,2}[-]\d{2,2}\s\d{2,2}[:]\d{2,2}[:]\d{2,2}$/, 'Error: created at does not meet yyyy-mm-dd hh:mm:ss');
}

export function checkReturnsActions() {
    //checks action buttons in returns table
    cy.get('i[class*="mdi-email-sync"]').first().click();
    cy.get('a[href*="admin/returns"]').first().click();
    cy.get('i[class*="mdi-delete"]').first().click();
    cy.get('[data-qa="button.cancel"]').contains('Cancel');
    cy.get('[data-qa="button.cancel"]').click();
}

export function reportingFilter(filter, alias) {
    //used for reporting tests, currently deprecated
    cy.get('[data-qa="icon.button.filter"]').click();
    cy.get('[data-qa="nav.dropdown.filter"]').children().contains(filter).click();
    cy.wait(alias, {timeout: 30000});
    cy.get('[data-qa="span.name"]').contains(filter);
    cy.get('[data-qa="span.name"]').contains('All Time # ' + filter);
    cy.get('[data-qa="span.name"]').contains(filter + ' in Date Range');
    cy.get('[data-qa="span.name"]').contains(filter + ' Past 30 Days');
    cy.get('[data-qa="span.name"]').contains(filter + ' Past 7 Days');
    cy.get('[data-qa="span.name"]').contains(filter + ' Today');
}

export function getNum(div) {
    //retrieves number from a string
    const text = div.text();
    const str = text.split(' ')[2];
    const num = Number(str);
    return num
}

export function tableContains(heading, value, errorMessage) {
    //finds the index of a table header
    //finds 1st data record under this header, and checks if value is present
    //if not present throws error
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
            
            const text2 = $td.text().trim();
            console.log(text2);
            console.log(value);
            if (text2 !== value) {
              throw new Error(errorMessage);
            }
          });
        }
    });
}

export function tableCSS(heading, expectedCSS, errorMessage) {
    //finds the index of a table header
    //finds 1st data record under this header, and checks css of element in this data record
    //if css is not as expected it throws an error
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
    //finds the index of a table header
    //finds 1st data record under this header, and clicks element in this data record
    //if card is not visible after click test should fail
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($th, index) => {

        const text1 = $th.text();

        if (text1 === heading) {
          cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).find('span').eq(0).click();
          if (value) {
              cy.get('[data-qa="card.item"]').contains(value);
          }
          cy.get('[data-qa="card.item"]').should('be.visible');
        } 
      });
}

export function tableRegex(heading, regex, errorMessage) {
    //finds the index of a table header
    //finds 1st data record under this header, and checks if value matches regex
    //if it doesn't match regex it throws an error
    cy.get('[data-qa="table"]').find('tr').eq(0).find('th').each(($elm, index) => {
      
        const text1 = $elm.text();
  
        if (text1 === heading) {
  
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(index).then(($td) => {
            
            const text2 = $td.text();
            console.log(text2)
            const result = regex.test(text2);
            console.log(result)
            if (!result) {
              throw new Error(errorMessage);
            }
          });
        }
    });
}

export function selectDashboardCard(title, description, search, user) {
    //finds a dashboard card that matches title and description and searches for and selects a user
    cy.get('[data-qa="card.title"]').each(($div2, index) => {

        const text = $div2.text();
        console.log(text);
        if (text === title) {
            cy.get('[data-qa="card.description"]').as('description');
            cy.get('@description').eq(index).contains(description).as('target');
            cy.get('@target').click();
            cy.get('@target').scrollIntoView();
            cy.get('[data-qa="button.search"]').eq(index).click();
            cy.get('[data-qa="search"]').eq(1).type(search);
            cy.get('div[class="v-list-item__title"]').contains(user).click();
            cy.get('[data-qa="button.view"]').click();
        }
    });
}

export function myInverterTab(tab) {
    //clicks a specific tab on inverter info page
    cy.get('[data-qa="card.tab"]').contains(tab).click();
}

export function inverterSoftwareCheck(titles, subtitles) {
    //checks each title and subtitle on the inverter info software tab
    for (var i = 0; i < titles.length; i++) {
        cy.get('[data-qa="tab.content"]').find('div[class="v-card__title"]').contains(titles[i]);
    }
    for (var i = 0; i < subtitles.length; i++) {
        cy.get('[data-qa="tab.content"]').find('div[class="v-card__subtitle"]').contains(subtitles[i]);
    }
}

export function myInverterNotificationsTable(header) {
    //checks each title in inverter info notifications tab
    for (var i = 0; i < header.length; i++ ) {
        cy.get('[data-qa="table.notifications"]').find('th').contains(header[i]);
    }
}

export function myInverterTable(header) {
    //checks each table header on inverter info page
    for (var i = 0; i < header.length; i++ ) {
        cy.get('[data-qa="tab.content"]').find('th').contains(header[i]);
    }
}

export function checksCounterIncreasesAndDecreases() {
    //will read and unread notifications and check that the notifications counter updates accordingly
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
    //checks mark as read works and notifications counter updates
    //if block execution depends on if there are any unread notifications to begin with
    //uses the check counter increases and decreases function to use DRY and to shorten function size to improve readability
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
    //updates an inverters warranty in my inverter table
    //then visits the inverter info page and checks that the warranty expiry date has updated according to new warranty
    //calculates expected warranty expiry date, if not equal to actual expiry date then throws an error
    cy.get('[data-qa="table"').find('tr').eq(tableDataIndex).find('[data-qa="button.warranty"]').click({force: true});
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
    //changes type of data shown in energy graph
    cy.get('[data-qa="graphSelected"]').click();
    cy.get('div[class="v-list-item__content"]').contains(type).click();

    for (var i = 0; i < dataTypes.length; i++) {
        cy.get('g[class*="highcharts-legend-item"]').eq(i).contains(dataTypes[i]);
    }
}

export function checkWarranty(headingIndex, tableDataIndex) {
    //uses the update warranty and check function due to size and to improved readability
    //first filters for specific inverter type to ensure checks can be done (removes only dongles from table)
    //checks table headers to find warranty column
    //checks existing warranty type and checks the other types
    //if 1st data record has no warranty showing then it increments tableDataIndex and calls itself
    //if tableDataIndex > 3 test will fail
    cy.get('[data-qa="auto.model"]').as('model');
    cy.get('@model').type('{downArrow}');
    cy.get('@model').type('{downArrow}');
    cy.get('@model').type('{downArrow}');
    cy.get('@model').type('{enter}');
    cy.get('[data-qa="field.search"]').click();
    cy.get('[data-qa="table"]').find('tr').eq(tableDataIndex).find('td').eq(headingIndex).then(($td) => {

        const text = $td.text().trim();

        if (text === 'Standard') {

            updateWarrantyAndCheck('Extended', 10, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Standard', 5, tableDataIndex);

        } else if (text === 'Extended') {

            updateWarrantyAndCheck('Standard', 5, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Extended', 10, tableDataIndex);

        } else if (text === 'Twelve_Years') {

            updateWarrantyAndCheck('Standard', 5, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Extended', 10, tableDataIndex);
            cy.get('[data-qa="main.navbar"]').children().eq(0).click();
            cy.get('[data-qa="main.navbar"]').contains('My Inverters').click();

            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{downArrow}');
            cy.get('@model').type('{enter}');
            cy.get('[data-qa="field.search"]').click();
            updateWarrantyAndCheck('Twelve years', 12, tableDataIndex);

        } else {
            let index = tableDataIndex++;
            checkWarranty(headingIndex, index);
        }
    });
}

export function closeFeedback(trIndex, headingIndex) {
    //if feedback is created/updated by 'You'
    //increments trIndex until created/updated isn't 'You'
    //ensures other checks don't fail unnecessarily
    console.log(trIndex);
    cy.get('[data-qa="table"]').find('tr').eq(trIndex).find('td').eq(headingIndex).then(($td) => {

        const text = $td.text()

        if (text === 'You') {

            cy.get('[data-qa="container.navigation"]').find('li').first().next().click();
            cy.get('[data-qa="table"]').find('tr').eq(1).find('td').eq(0).click();
            cy.get('[data-qa="text.selected"]').contains('1 record(s) selected');
            cy.get('[data-qa="button.recordClose"]').click();
            cy.wait(1000);
            trIndex++;

            closeFeedback(trIndex, headingIndex);
        }
    })
}

export function checkBarChartXAxis() {
    cy.get('[data-qa="container.bar"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').find('text').eq(0).contains(/^\d{4,4}[-]\d{2,2}/);
    cy.get('[data-qa="container.bar"]').eq(0).find('g[class*="highcharts-xaxis-labels"]').find('text').eq(11).contains(/^\d{4,4}[-]\d{2,2}/);
}

export function checkDateRangePicker() {
    cy.get('[data-qa="calendar.field.text"]').click();
    cy.get('div[class*="v-date-picker-header"]').find('button').eq(0).click();
    cy.get('tbody').find('div[class*="v-btn__content"]').contains('7').click();
    cy.get('tbody').find('div[class*="v-btn__content"]').contains('10').click();
    cy.get('[data-qa="calendar.button.cancel"]').click();
    cy.get('[data-qa="calendar.field.text"]').click();
    cy.get('tbody').find('div[class*="v-btn__content"]').contains('1').click();
    cy.get('tbody').find('div[class*="v-btn__content"]').contains('28').click();
    cy.get('[data-qa="calendar.button.save"]').click();
}