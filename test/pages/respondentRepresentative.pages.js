const { I } = inject();

module.exports = {
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

  addRespondentRepresentative(regOption,orgName) {
    I.waitForElement(this.nonRegisteredLegalOrg, 20);
    I.see('Respondent Representative');
    I.selectOption(this.selectRespondent, 'Henry Marsh'); // add respondent name from case creation
    I.fillField(this.respondentRepresentativeName, 'Henry Marsh');
    I.fillField(this.respondentRepresentativePhoneNumber, '01234657895');
    I.fillField(this.respondentRepresentativeEmailAddress, 'et.tester@hmcts.net');
    I.selectOption(this.respondentRepresentativeContactPreference, '1: Email');
    try {
      switch (regOption) {
        case 'registered':
          I.checkOption(this.registeredLegalOrg);
          I.waitForElement(this.searchForRegisteredOrg, 10);
          I.fillField(this.searchForRegisteredOrg, orgName);
          I.click(this.selectOrgFromSearchResult);
          I.waitForElement('[type="submit"]', 10);
          I.click('[type="submit"]');
          I.waitForVisible('.alert-message', 10);
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
  },
};
