import { BasePage } from "./basePage";
import { expect } from '@playwright/test';

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
    respondentTypeInd: '#respondentCollection_0_respondentType-Individual',
    respFirstName: '#respondentCollection_0_respondentFirstName',
    respLastName: '#respondentCollection_0_respondentLastName',
    respReceivedYes: '#respondentCollection_0_responseReceived_Yes',
    respFullName: '#respondentCollection_0_responseRespondentName',
    respStatusDropDown: '#respondentCollection_0_response_status',
    respClaimYes: '#respondentCollection_0_responseToClaim_Yes',
    respReceivedDay: '#responseReceivedDate-day',
    respReceivedMonth: '#responseReceivedDate-month',
    respReceivedYear: '#responseReceivedDate-year',
    respPostCode: '#respondentCollection_0_responseRespondentAddress_responseRespondentAddress_postcodeInput',
    respAddressDropDown: '#respondentCollection_0_responseRespondentAddress_responseRespondentAddress_addressList',
    respEccYes: '#respondentCollection_0_respondentEcc_Yes',
    respEccReplyYes: '#respondentCollection_0_respondentEccReply_Yes',
    //*[@id="mat-tab-label-0-5"]
  };

  async addRespondentRepresentative(regOption: string, orgName: string) {
    await this.page.locator('#repCollection_0_0').isVisible();
    await this.webActions.selectByLabelFromDropDown(this.elements.selectRespondent, 'Henry Marsh');
    await this.webActions.fillField(this.elements.respondentName, 'Henry Marsh');
    await this.webActions.fillField(this.elements.respondentRepresentativePhoneNumber, '01234657895');
    await this.webActions.fillField(this.elements.respondentRepresentativeEmailAddress, 'et.tester@hmcts.net');
    await this.webActions.selectByOptionFromDropDown(
      this.elements.respondentRepresentativeContactPreference,
      '1: Email',
    );

    try {
      switch (regOption) {
        case 'registered':
          await this.webActions.checkElementById(this.elements.registeredLegalOrg);
          await this.webActions.verifyElementContainsText(
            this.page.locator('ccd-write-organisation-field'),
            'Search for an organisation',
          );
          await this.webActions.fillField(this.elements.searchForRegisteredOrg, orgName);
          await this.webActions.clickElementByCss(this.elements.selectOrgFromSearchResult);
          // await this.submit.isVisible();
          await this.clickSubmitButton();
          break;
        case 'notRegisteredSingle':
        case 'partResgisteredMultiple':
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (e) {
      console.error('invalid option', e);
    }
  }

  async enterRespType() {
    await this.webActions.clickElementByCss(this.elements.respondentTypeInd);
    await this.webActions.fillField(this.elements.respFirstName, 'Mark');
    await this.webActions.fillField(this.elements.respLastName, 'Gill');
    await this.webActions.clickElementByCss(this.elements.respReceivedYes);
    await this.webActions.fillField(this.elements.respFullName, 'Mark Gill');
    await this.webActions.selectByLabelFromDropDown(this.elements.respStatusDropDown, 'Accepted');
    await this.webActions.clickElementByCss(this.elements.respClaimYes);

    await this.webActions.fillField(this.elements.respReceivedDay, '01');
    await this.webActions.fillField(this.elements.respReceivedMonth, '03');
    await this.webActions.fillField(this.elements.respReceivedYear, '2025');

    await this.webActions.fillField(this.elements.respPostCode, 'EX1 3DD');
    await this.webActions.clickElementByCss(
      '#respondentCollection_0_responseRespondentAddress_responseRespondentAddress_postcodeLookup button',
    );
    await this.delay(2000);
    await this.webActions.selectByLabelFromDropDown(this.elements.respAddressDropDown, '68 East Wonford Hill, Exeter');
    await this.delay(2000);

    await this.webActions.clickElementByCss(this.elements.respEccYes);
    await this.delay(2000);
    await this.webActions.clickElementByCss(this.elements.respEccReplyYes);
    await this.clickSubmitButton();
  }

  async validateRespondentRepDetail() {
    await expect(this.page.locator('#case-viewer-field-read--repCollection')).toContainText(
      'et.legalrep.superuser@gmail.com',
    );
  }
}
