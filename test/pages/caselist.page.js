const { I } = inject();

module.exports = {
  caseListText: 'Case list',
  caseListLink: '[href="/cases"]',
  hideFilterButton: '[class="govuk-button hmcts-button--secondary"]',
  jurisdictionDropdown: '#wb-jurisdiction',
  caseTypeDropdown: '#wb-case-type',
  stateDropdown: '#wb-case-state',
  tribunalOffice: '#managingOffice',
  caseNumberInputField: '#ethosCaseReference',
  receiptDateDay: '#receiptDate-day',
  receiptDateMonth: '#receiptDate-month',
  receiptDateYear: '#receiptDate-year',
  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',

  searchCaseApplication(option) {
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.selectOption(this.caseTypeDropdown, option);
    I.click(this.applyButton);
  },

  searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    I.waitForInvisible('.spinner-container', 30);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.wait(7);
    I.selectOption(this.caseTypeDropdown, option);
    I.refreshPage();
    I.waitForElement(this.submissionReferenceLocator, 55);
    I.see(this.caseListText);
    I.fillField(this.submissionReferenceLocator, submissionReference);
    I.click(this.applyButton);
  },

  processCaseFromCaseList() {
    I.waitForText('Your cases', 30);
    let caseNumber = I.grabTextFrom(
      '//html[1]/body[1]/exui-root[1]/exui-case-home[1]/div[1]/exui-case-list[1]/exui-page-wrapper[1]/div[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[2]/ccd-search-result[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]/ccd-field-read[1]/div[1]/ccd-field-read-label[1]/div[1]/ng-component[1]/span[1]',
    );
    I.click(
      '//html[1]/body[1]/exui-root[1]/exui-case-home[1]/div[1]/exui-case-list[1]/exui-page-wrapper[1]/div[1]/div[1]/main[1]/div[1]/div[1]/div[2]/div[2]/ccd-search-result[1]/table[1]/tbody[1]/tr[1]/td[1]/a[1]/ccd-field-read[1]/div[1]/ccd-field-read-label[1]/div[1]/ng-component[1]/span[1]',
    );
    return caseNumber;
  },

  selectNextEvent(option) {
    //I.waitForElement(this.nextEventDropdown, 60);
    I.waitForEnabled(this.nextEventDropdown, 60);
    //await I.click(this.nextEventDropdown);
    I.selectOption(this.nextEventDropdown, option);
    I.click(this.submitEventButton);
  },

  verifyCaseDetailsPage(et1VettingFlag = false) {
    I.waitForText('Case Details', 30);
    I.see('Claimant');
    I.see('Respondent');
    I.see('Jurisdictions');
    I.see('Referrals');
    I.see('History');
    I.see('Documents');
    if (et1VettingFlag) {
      I.see('ET1Vetting');
    }
  },
};
