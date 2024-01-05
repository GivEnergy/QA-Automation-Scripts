import { adminLogin } from "../../../logins";
import { dashboardSelect, selectDashboardCard, myInverterTab, inverterSoftwareCheck, myInverterNotificationsTable, myInverterTable } from "../../../funcs";
import { myInverterDescription } from "../../../dashboardCards";
import { YYYYMMDD, batteryFW, dateAndTime, inverterFW, serialNumber } from "../../../regex";

describe("my inverter card", () => {
  it("tests my inverter card", () => {

      adminLogin();
      //creates alias for dashboard API request
      cy.intercept('**/staging.givenergy.cloud/dashboard').as('dashboardAPI');
      dashboardSelect('Dashboard Cards');
      cy.intercept('**/admin/dashboard/cards/my-inverters/BrymboPVTest?only_large=1').as('inverterAPI');
      selectDashboardCard('My Inverter', myInverterDescription, 'brymbopvtest', 'BrymboPVTest');
      cy.wait('@inverterAPI', {timeout: 30000});
      //checks inverter info shows serial number of correct format
      cy.get('[data-qa="serialNumber"]').then(($el): void  => {

          const text: string = $el.text().trim();
          console.log(text);
          const result: boolean = serialNumber.test(text);

          console.log(result);

          if (!result) {
              throw new Error("Error: serial number does not match correct format.");
          }

      });

      cy.get('[data-qa="graph"]').should('be.visible');

      //checks each inverter info tab shows expected title name
      cy.get('[data-qa="general.title"]').each(($div, index): void  => {
        
        const text: string = $div.text()

        switch(index) {
          case 0:
            if (text === 'Inverter Model') {
              cy.log('Title is correct');
            } else {
              throw new Error('Inverter Model title is not correct');
            }
            break;
          case 1:
            if (text === 'Software Version') {
              cy.log('Title is correct');
            } else {
              throw new Error('Software Version title is not correct');
            }
            break;
          case 2:
            if (text === 'Wi-Fi Serial') {
              cy.log('Title is correct');
            } else {
              throw new Error('Wi-Fi Serial title is not correct');
            }
            break;
          case 3:
            if (text === 'Battery Type') {
              cy.log('Title is correct');
            } else {
              throw new Error('Battery Type title is not correct');
            }
            break;
          case 4:
            if (text === 'Battery Capacity') {
              cy.log('Title is correct');
            } else {
              throw new Error('Battery Capacity title is not correct');
            }
            break;
          case 5:
            if (text === 'Last Software Update') {
              cy.log('Title is correct');
            } else {
              throw new Error('Last Software Update title is not correct');
            }
            break;
          case 6:
            if (text === 'Last Online Time') {
              cy.log('Title is correct');
            } else {
              throw new Error('Last Online Time title is not correct');
            }
            break;    
          case 7:
            if (text === 'Warranty Expiry Date') {
              cy.log('Title is correct');
            } else {
              throw new Error('Warranty Expiry Date title is not correct');
            }
            break;
          case 8:
            if (text === 'Commission Date') {
              cy.log('Title is correct');
            } else {
              throw new Error('Commission Date title is not correct');
            }
            break;
          default:
            cy.log('New title detected please add a new case!')
            break;    
        }
      })

      //checks each inverter info tab shows expected subtitle description
      cy.get('[data-qa="general.subtitle"]').each(($div, index): void  => {
        
        const text: string = $div.text()

        switch(index) {
          case 2:
  
            const result = serialNumber.test(text);

            if (result) {
              cy.log('wifi serial number has correct format');
            } else {
              //throw new Error('incorrect wifi serial format');
            }
            break;
          case 6:

          const result1 = dateAndTime.test(text);
            
            if (result1) {
              cy.log('last online time has correct format');
            } else {
              throw new Error('last online time has incorrect format should be yyyy-mm-dd hh:mm:ss');
            }
            break;    
          case 7:

            const result3 = YYYYMMDD.test(text);

            if (result3) {
              cy.log('warranty expiry date has correct format');
            } else {
              throw new Error('warranty expiry date has incorrect format should be yyyy-mm-dd');
            }
            break;
          case 8:

            const result4 = YYYYMMDD.test(text);

            if (result4) {
              cy.log('commission date has correct format');
            } else {
              throw new Error('commission date has incorrect format should be yyyy-mm-dd');
            }
            break;
          default:
            break;    
        }
      })

      //please check functions for descriptions
      myInverterTab('Software');
      inverterSoftwareCheck(['Inverter Firmware Version', 'Last Update Time', 'Battery Firmware Version'],
                            [inverterFW, batteryFW]);
                        
      myInverterTab('Notifications');
      myInverterNotificationsTable(['Event', 'Raised At', 'Cleared At']);

      myInverterTab('System Data');
      myInverterTable(['Time', 'Solar Generation (W)', 'Grid Power (W)', 'Inverter Output Power (W)', 'Battery Power (W)', 
                        'Demanded Power (W)', 'Battery Percentage (%)']);
      cy.get('[data-qa="graph"]').should('be.visible');

      myInverterTab('PV Data');
      myInverterTable(['Time', 'String 1 Voltage (V)', 'String 2 Voltage (V)', 'String 1 Current (A)', 'String 2 Current (A)',
                        'String 1 Power (W)', 'String 2 Power (W)', 'Solar Generation (W)']);
      cy.get('[data-qa="graph"]').should('be.visible');

      myInverterTab('Battery Data');
      myInverterTable(['Time', 'Battery Voltage (V)', 'Battery Power (W)', 'Battery Temperature (°C)', 'Battery Percentage (%)']);
      cy.get('[data-qa="graph"]').should('be.visible');

      myInverterTab('Grid Data');
      myInverterTable(['Time', 'Grid Voltage (V)', 'Grid Frequency (Hz)', 'Grid Power (W)']);
      cy.get('[data-qa="graph"]').should('be.visible');

      myInverterTab('Inverter Data');
      myInverterTable(['Time', 'Inverter Output Power (W)', 'Inverter Temperature (°C)', 'Inverter Output Voltage (V)', 
                        'Inverter Output Frequency (Hz)', 'EPS Output Power (W)']);
      cy.get('[data-qa="graph"]').should('be.visible');

      myInverterTab('Meter Data');
      myInverterTable(['Time', 'Grid Import Today (kWh)', 'Grid Export Today (kWh)', 'PV Generation Today (kWh)', 
                        'Battery Charge Today (kWh)', 'Battery Discharge Today (kWh)', 'Grid Import Total (kWh)',
                        'Grid Export Total (kWh)', 'PV Generation Total (kWh)']);
      cy.get('[data-qa="graph"]').should('be.visible');                      

  })
});
  