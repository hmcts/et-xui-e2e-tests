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
    I.waitForElement(
      '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Claimant"]',
      15,
    );
    await I.click(
      '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Claimant"]',
    );
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
    I.waitForElement('.govuk-heading-l', 25);
    I.waitForText('Accept/Reject Case', 10);
    I.see('Case Number: ' + caseNumber);
    I.checkOption(this.locators.pre_accept_case_yes_option);
    I.waitForElement(this.locators.date_accepted_day, 5);
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
