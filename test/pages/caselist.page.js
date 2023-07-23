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
  tab: '[role="tab"] div:contains("Applications")',


  searchCaseApplication(option) {
    I.waitForElement(this.caseTypeDropdown, 30);
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.selectOption(this.caseTypeDropdown, option);
    I.click(this.applyButton);
  },

  searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    I.waitForElement(this.caseListLink, 30);
    I.click(this.caseListLink);
    I.waitForElement(this.caseTypeDropdown, 50);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.caseTypeDropdown, 55);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, '2: Object');
          break;
        case 'Scotland - Singles':
          I.selectOption(this.caseTypeDropdown, '5: Object');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.selectOption(this.caseTypeDropdown, option);
    I.scrollPageToBottom();
    I.waitForVisible(this.submissionReferenceLocator, 10);
    I.click(this.submissionReferenceLocator);
    I.fillField(this.submissionReferenceLocator, submissionReference);
    I.wait(3);
    I.click(this.applyButton);
  },

  processCaseFromCaseList(submissionReference) {
    I.waitForElement('#search-result-heading__text', 30);
    let text = `/cases/case-details/${submissionReference}`;
    let caseNumber = I.grabTextFrom(`[href="${text}"]`);
    console.log('case number is' + caseNumber);
    I.waitForVisible(`[href="${text}"]`, 30);
    I.wait(5);
    I.click(`[href="${text}"]`);
    return caseNumber;
  },

  selectNextEvent(option) {
    I.waitForEnabled(this.nextEventDropdown, 60);
    I.selectOption(this.nextEventDropdown, option);
    I.wait(5);
    I.forceClick(this.submitEventButton);
  },

  selectTab(title){
  I.wait(5);
  I.waitForClickable(`//div[@role='tab']/div[contains(text(), '${title}')]`, 30);
  I.forceClick(`//div[@role='tab']/div[contains(text(), '${title}')]`);
  },

 navigateToMakeAnApplication(submissionReference) {
  let makeAnApplicationLink = `/cases/case-details/${submissionReference}/trigger/respondentTSE/respondentTSE1`;
  I.wait(10);
  pause();
  I.forceClick(`[href="${makeAnApplicationLink}"]`);
 },

  verifyCaseDetailsPage(et1VettingFlag = false) {
    I.waitForElement('[tabindex="0"]', 30);
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