import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { th } from "@faker-js/faker";

export default class RespondentRepPage extends BasePage {

  elements = {
    nonRegisteredLegalOrg: '#repCollection_0_myHmctsYesNo_No',
    registeredLegalOrg: this.page.locator('#repCollection_0_myHmctsYesNo_Yes'),
    searchForRegisteredOrg: this.page.locator('#search-org-text'),
    selectRespondent: this.page.locator('#repCollection_0_dynamic_resp_rep_name'),
    selectOrgFromSearchResult: this.page.locator('//a[contains(.,"Select")]'),
    respondentName: this.page.locator('#repCollection_0_name_of_representative'),
    respondentRepresentativeName: '#repCollection_0_name_of_representative',
    respondentRepresentativePhoneNumber: this.page.locator('#repCollection_0_representative_phone_number'),
    respondentRepresentativeEmailAddress: this.page.locator('#repCollection_0_representative_email_address'),
    respondentRepresentativeContactPreference: this.page.locator('#repCollection_0_representative_preference'), // '1: Email'
    //*[@id="mat-tab-label-0-5"]
  }
    async addRespondentRepresentative(regOption, orgName) {
      await this.page.locator('#repCollection_0_0').isVisible();
      await this.elements.selectRespondent.selectOption('Henry Marsh');
      await this.elements.respondentName.fill('Henry Marsh');  // add respondent name from case creation
      await this.elements.respondentRepresentativePhoneNumber.fill('01234657895');
      await this.elements.respondentRepresentativeEmailAddress.fill('et.tester@hmcts.net');
      await this.elements.respondentRepresentativeContactPreference.selectOption('1: Email');

      try {
        switch (regOption) {
          case 'registered':
            await this.elements.registeredLegalOrg.check();
            await expect(this.page.locator('ccd-write-organisation-field')).toContainText('Search for an organisation');
            await this.elements.searchForRegisteredOrg.fill(orgName);
            await this.elements.selectOrgFromSearchResult.click();
            await this.submit.isVisible();
            await this.submitButton();
            break;
          case 'notRegisteredSingle':
          case 'partResgisteredMultiple':
            break;
          default:
            throw new Error('... check you options or add new option');
        }
      } catch (e) {
        console.error('invalid option', e.message);
      }
    }
}
