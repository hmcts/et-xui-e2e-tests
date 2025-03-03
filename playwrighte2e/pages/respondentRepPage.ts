import { BasePage } from "./basePage";

export default class RespondentRepPage extends BasePage {

  elements = {
    nonRegisteredLegalOrg: '#repCollection_0_myHmctsYesNo_No',
    registeredLegalOrg: '#repCollection_0_myHmctsYesNo_Yes',
    searchForRegisteredOrg: '#search-org-text',
    selectRespondent: '#repCollection_0_dynamic_resp_rep_name',
    selectOrgFromSearchResult: '//a[contains(.,"Select")]',
    respondentName: '#repCollection_0_name_of_representative',
    respondentRepresentativeName: '#repCollection_0_name_of_representative',
    respondentRepresentativePhoneNumber: '#repCollection_0_representative_phone_number',
    respondentRepresentativeEmailAddress: '#repCollection_0_representative_email_address',
    respondentRepresentativeContactPreference: '#repCollection_0_representative_preference', // '1: Email'
    //*[@id="mat-tab-label-0-5"]
  }
    async addRespondentRepresentative(regOption, orgName) {
      await this.page.locator('#repCollection_0_0').isVisible();
      await this.webActions.selectByLabelFromDropDown(this.elements.selectRespondent, 'Henry Marsh');
      await this.webActions.fillField(this.elements.respondentName, 'Henry Marsh');
      await this.webActions.fillField(this.elements.respondentRepresentativePhoneNumber, '01234657895');
      await this.webActions.fillField(this.elements.respondentRepresentativeEmailAddress, 'et.tester@hmcts.net');
      await this.webActions.selectByOptionFromDropDown(this.elements.respondentRepresentativeContactPreference, '1: Email');

      try {
        switch (regOption) {
          case 'registered':
            await this.webActions.checkElementById(this.elements.registeredLegalOrg);
            await this.webActions.verifyElementContainsText(this.page.locator('ccd-write-organisation-field'), 'Search for an organisation');
            await this.webActions.fillField(this.elements.searchForRegisteredOrg, orgName);
            await this.webActions.clickElementByCss(this.elements.selectOrgFromSearchResult);
            // await this.submit.isVisible();
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
