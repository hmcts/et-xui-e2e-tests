const { I } = inject();
const today = new Date();

module.exports = {
  et3ResponseReceivedYesButton: '#respondentCollection_0_responseReceived_Yes',
  respondentType: '#respondentCollection_0_respondentType-Organisation',
  businessName: '#respondentCollection_0_respondentOrganisation',
  et3RespondentAddresspostCodeInput: '#respondentCollection_0_responseRespondentAddress_responseRespondentAddress_postcodeInput',
  addressListDropdownOption: '#respondentCollection_0_respondent_address_respondent_address_addressList',
  checkEt3RepPhoneHearingOption: '[id="respondentCollection_0_et3ResponseHearingRepresentative-Phone hearings"]',
  checkEt3ResPhoneHearingOption: '[id="respondentCollection_0_et3ResponseHearingRespondent-Phone hearings"]',
  respondentNotContestingClaim:'#respondentCollection_0_et3ResponseRespondentContestClaim-No',
  respondentMakeEmploymentClaim: '#respondentCollection_0_et3ResponseEmployerClaim_Yes',
  respondentNeedSupportNoOption: '#respondentCollection_0_et3ResponseRespondentSupportNeeded-No',
  submitEt3UpdateButton: '[type="submit"]',
  uploadET3EccDoc: 'respondentCollection_0_et3ResponseEmployerClaimDocument',
  addComment: '#respondentCollection_0_et3ResponseEmployerClaimDetails',
  responseReceiptDay: '#responseReceivedDate-day',
  responseReceiptMonth: '#responseReceivedDate-month',
  responseReceiptYear: '#responseReceivedDate-year',

  updateET3ResponseOptionYes(respondentName, postCode) {
    let listDay = today.getDate() + 1;
    let listMonth = today.getMonth() + 1;
    let listYear = today.getFullYear();
    I.waitForElement(this.et3ResponseReceivedYesButton,10);
    I.checkOption(this.et3ResponseReceivedYesButton);
    I.checkOption(this.respondentType);
    I.fillField(this.businessName,respondentName);
    I.fillField(this.et3RespondentAddresspostCodeInput, postCode);
    I.selectOption(this.addressListDropdownOption, '1: Object');
    I.checkOption(this.checkEt3RepPhoneHearingOption);
    I.checkOption(this.checkEt3ResPhoneHearingOption);
    I.checkOption(this.respondentNotContestingClaim);
    I.checkOption(this.respondentMakeEmploymentClaim);
    I.checkOption(this.respondentNeedSupportNoOption);
    I.fillField(this.responseReceiptDay, `${listDay}`);
    I.fillField(this.responseReceiptMonth, `${listMonth}`);
    I.fillField(this.responseReceiptYear, `${listYear}`);
    I.attachFile(this.uploadET3EccDoc,'../data/RET_newBug.png');
    I.fillField(this.addComment, 'Test Respondent');
    I.click(this.submitEt3UpdateButton);
  }
}