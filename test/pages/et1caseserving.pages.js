const { I } = inject();
const today = new Date();

module.exports = {
  locators: {
    //ET1 Vetting Pages...
    pre_accept_case_yes_option: { xpath: "//input[@id='preAcceptCase_caseAccepted_Yes']" },
    date_accepted_day: { css: '#dateAccepted-day' },
    date_accepted_month: { css: '#dateAccepted-month' },
    date_accepted_year: { css: '#dateAccepted-year' },
  },

  processET1CaseServingPages(caseNumber) {
    this.processAcceptRejectCase(caseNumber);
  },

  processAcceptRejectCase(caseNumber) {
    I.waitForVisible('#caseEditForm', 10);
    I.see('Accept/Reject Case');
    I.see('Pre-Acceptance');
    I.see('Case Number: ' + caseNumber);
    I.checkOption(this.locators.pre_accept_case_yes_option);
    I.fillField(this.locators.date_accepted_day, today.getDate());
    I.fillField(this.locators.date_accepted_month, today.getMonth());
    I.fillField(this.locators.date_accepted_year, today.getFullYear());
    I.waitForVisible("[type='submit']", 10);
    I.forceClick('[type="submit"]');
    I.wait(2);
    I.forceClick('[type="submit"]');
    //I.waitForElement('[class="alert-message"]', 15);
  },
};
