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

  async getClaimantFirstName() {
    I.waitForElement('[aria-posinset="2"] > .mat-tab-label-content', 15);
    await I.click('[aria-posinset="2"] > .mat-tab-label-content');
    const firstName = await I.grabTextFrom(
      '#case-viewer-field-read--claimantIndType tr:nth-of-type(2) span:nth-of-type(1) span:nth-of-type(1)',
    );
    const lastName = await I.grabTextFrom(
      '#case-viewer-field-read--claimantIndType tr:nth-of-type(3) span:nth-of-type(1) span:nth-of-type(1)',
    );
    console.log(firstName);
    console.log(lastName);
    return {
      firstName,
      lastName,
    };
  },

  processAcceptRejectCase(caseNumber) {
    I.waitForElement('.govuk-heading-l', 15);
    I.see('Accept/Reject Case');
    I.see('Pre-Acceptance');
    I.see('Case Number: ' + caseNumber);
    I.checkOption(this.locators.pre_accept_case_yes_option);
    I.fillField(this.locators.date_accepted_day, today.getDate());
    I.fillField(this.locators.date_accepted_month, today.getMonth() + 1);
    I.fillField(this.locators.date_accepted_year, today.getFullYear());
    I.waitForVisible("[type='submit']", 10);
    I.forceClick('[type="submit"]');
    I.wait(2);
    I.forceClick('[type="submit"]');
    //I.waitForElement('[class="alert-message"]', 15);
    // The notification is no longer there and it takes around 12 sec for the page to load
    I.wait(15);
  },
};
