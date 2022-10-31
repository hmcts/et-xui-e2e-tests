const { I } = inject();

module.exports = {
  async processStillWorkingJourney() {
    await this.clickEmploymentStatusLink();
    await this.workedForOrganisation();
    await this.stillWorkingForOrganisation();
    await this.enterEmploymentJobTitle();
    await this.enterEmploymentStartDate();
    await this.selectYesNoticePeriod();
    await this.selectNoticeType();
    await this.enterNoticePeriodLength();
    await this.enterAverageWeeklyHours();
    await this.enterPay();
    await this.enterPensionContribution();
    await this.enterEmployeeBenefits();
    await this.enterRespondentName();
    await this.enterRespondentAddress();
    await this.selectYesToWorkingAtRespondentAddress();
    await this.selectNoToAcas();
    await this.checkRespondentDetails();
    await this.completeEmploymentAndRespondentDetails();
  },
  //clicks employment status link
  async clickEmploymentStatusLink() {
    await I.click('[href="/past-employer"]');
    await I.see('Did you work for the organisation or person you’re making your claim against?');
  },
  //function to click yes worked for organisation on /past-employer page
  async workedForOrganisation() {
    await I.click('#past-employer');
    await I.click('Save and continue');
  },
  //selects still working for respondent on /are-you-still-working page
  async stillWorkingForOrganisation() {
    await I.see("Are you still working for the organisation or person you're making your claim against?");
    await I.click('#still-working');
    await I.click('Save and continue');
  },
  //check page title and enter job title
  async enterEmploymentJobTitle() {
    await I.see('Employment details');
    await I.seeElement('#jobTitle');
    await I.fillField('#jobTitle', 'Tester');
    await I.click('Save and continue');
  },
  //employment start date page
  async enterEmploymentStartDate() {
    await I.see('Employment start date');
    await I.fillField('#startDate-day', '20');
    await I.fillField('#startDate-month', '04');
    await I.fillField('#startDate-year', '2014');
    await I.click('Save and continue');
  },
  //select yes to notice period on /got-a-notice-period page
  async selectYesNoticePeriod() {
    await I.see('Do you have a written contract with a notice period? (optional)');
    await I.checkOption('input[id=notice-period]');
    await I.click('Save and continue');
  },
  //select weeks for notice type on /notice-type page
  async selectNoticeType() {
    await I.see('Is your notice period in weeks or months? (optional)');
    await I.checkOption('input[id=notice-type]');
    await I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  async enterNoticePeriodLength() {
    await I.see('How many weeks in your notice period? (optional)');
    await I.fillField('input[id=notice-length]', '4');
    await I.click('Save and continue');
  },
  //enter average weekly hours
  async enterAverageWeeklyHours() {
    await I.see('What are your average weekly hours? (optional)');
    await I.fillField('#avg-weekly-hrs', '20');
    await I.click('Save and continue');
  },
  //enters pay on the /pay page
  async enterPay() {
    await I.see('Your pay (optional)');
    await I.fillField('#pay-before-tax', '40000');
    await I.fillField('#pay-after-tax', '35000');
    await I.checkOption('input[id=pay-interval]');
    await I.click('Save and continue');
  },
  //enter Pension contribution on /pension page
  async enterPensionContribution() {
    await I.see('Did the respondent make any contributions to your pension? (optional)');
    await I.waitForElement('#pension', 30);
    await I.checkOption('input[id=pension]');
    await I.fillField('#pension-contributions', '200');
    await I.click('Save and continue');
  },
  //enter employee benefits on /benefits page
  async enterEmployeeBenefits() {
    await I.see('Do or did you receive any employee benefits? (optional)');
    await I.checkOption('input[id=employee-benefits]');
    await I.click('Save and continue');
  },
  //verify user is on respondent-name page and then enters a respondent name
  async enterRespondentName() {
    await I.see("What is the name of the respondent you're making the claim against?");
    await I.fillField('#respondentName', 'Henry Marsh');
    await I.click('Save and continue');
  },
  //enters address for respondent
  async enterRespondentAddress() {
    await I.see('What is the address of Henry Marsh?');
    await I.fillField('#postcode', 'LS7 4QE');
    await I.click('#findAddressButton');
    await I.waitForVisible('#selectAddressInput');
    await I.selectOption(
      '#selectAddressInput',
      '{"fullAddress":"7, VALLEY GARDENS, LEEDS, LS7 4QE","street1":"7 VALLEY GARDENS","street2":"","town":"LEEDS","county":"LEEDS","postcode":"LS7 4QE","country":"ENGLAND"}',
    );
    await I.click('Save and continue');
  },
  //selects yes to working at respondent address
  async selectYesToWorkingAtRespondentAddress() {
    await I.see('Did you work at 7 VALLEY GARDENS?');
    await I.checkOption('#work-address');
    await I.click('Save and continue');
  },
  //selects no option for acas cerificate question on /acas-cer-num page
  async selectNoToAcas() {
    await I.see('Do you have an Acas certificate number for Henry Marsh?');
    await I.checkOption('#acasCert-2');
    await I.click('Save and continue');
    await I.see('Why do you not have an Acas number?');
    await I.checkOption('#no-acas-reason');
    await I.click('Save and continue');
  },
  //check respondent details page
  async checkRespondentDetails() {
    await I.see('Check the respondent details');
    await I.click('Save and continue');
  },
  //confirm completed section for employment and respondent details
  async completeEmploymentAndRespondentDetails() {
    await I.see('Have you completed this section?');
    await I.seeElement('#tasklist-check');
    await I.checkOption('#tasklist-check');
    await I.click('Save and continue');
  },
};
