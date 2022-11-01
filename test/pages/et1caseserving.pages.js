const { I } = inject();

module.exports = {
  locators: {
    //ET1 Vetting Pages...
    pre_accept_case_yes_option: { xpath: "//input[@id='preAcceptCase_caseAccepted_Yes']" },
    date_accepted_day: { css: '#dateAccepted-day' },
    date_accepted_month: { css: '#dateAccepted-month' },
    date_accepted_year: { css: '#dateAccepted-year' },
  },

  async processET1CaseServingPages(caseNumber) {
    await this.processPreAcceptancePage(caseNumber);
    await this.processAcceptRejectCase(caseNumber);
  },

  async processPreAcceptancePage(caseNumber) {
    I.waitForText('Accept/Reject Case', 30);
    I.see('Pre-Acceptance');
    I.see('Case Number: ' + caseNumber);
    I.checkOption(this.locators.pre_accept_case_yes_option);
    I.fillField(this.locators.date_accepted_day, '27');
    I.fillField(this.locators.date_accepted_month, '10');
    I.fillField(this.locators.date_accepted_year, '2022');
    I.click('Continue');
  },

  async processAcceptRejectCase(caseNumber) {
    I.waitForText('Case Number: ' + caseNumber, 30);
    I.waitForElement("[type='submit']", 30);
    I.click('Submit');
  },
};
