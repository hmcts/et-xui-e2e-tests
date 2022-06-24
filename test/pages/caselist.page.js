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
  submissionReference: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',

  async searchCaseApplication(option) {
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 60);
    I.selectOption(this.caseTypeDropdown, option);
    await I.click(this.applyButton);
  },

  async selectNextEvent(option) {
    I.waitForElement(this.nextEventDropdown, 60);
    I.waitForVisible(this.nextEventDropdown);
    await I.selectOption(this.nextEventDropdown, option);
    I.wait(5);
    await I.click(this.submitEventButton);
  },
};
