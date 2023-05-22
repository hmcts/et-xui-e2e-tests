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
    I.click('[href="cases"]');
    I.waitForElement(this.caseTypeDropdown, 30);
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.selectOption(this.caseTypeDropdown, option);
    I.click(this.applyButton);
  },

  searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    I.waitForInvisible('.spinner-container', 30);
    I.waitForElement(this.caseTypeDropdown, 30);
    //I.waitForElement(this.submissionReferenceLocator, 30);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.caseTypeDropdown, 55);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, '[value="5: Object"]');
          break;
        case 'Scotland':
        case 'Scotland - Singles':
          I.selectOption( this.caseTypeDropdown, '[value="2: Object"]');
          break;
        default:
          throw new Error('... check you options or add new option');

      }
    }catch (error) {
     console.error('invalid option', error.message);
    }
    I.selectOption(this.caseTypeDropdown, option);
    I.scrollPageToBottom();
    I.waitForVisible(this.submissionReferenceLocator,10)
    I.click(this.submissionReferenceLocator);
    console.log(submissionReference);
    I.fillField(this.submissionReferenceLocator, submissionReference);
    I.click(this.applyButton);
  },

  processCaseFromCaseList(submissionReference) {
    I.waitForText('Your cases', 30);
    let text = `/cases/case-details/${submissionReference}`;
    let caseNumber = I.grabTextFrom(`[href="${text}"]`);
    console.log('case number is' + caseNumber);
    I.click(`[href="${text}"]`);
    return caseNumber;
  },

  selectNextEvent(option) {
    //I.waitForElement(this.nextEventDropdown, 60);
    I.waitForEnabled(this.nextEventDropdown, 60);
    //await I.click(this.nextEventDropdown);
    I.selectOption(this.nextEventDropdown, option);
    I.wait(5);
    I.forceClick(this.submitEventButton);
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
