const { I } = inject();

module.exports = {
  processStillWorkingJourney() {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation();
    this.stillWorkingForOrganisation();
    this.enterEmploymentJobTitle();
    this.enterEmploymentStartDate();
    this.selectYesNoticePeriod();
    this.selectNoticeType();
    this.enterNoticePeriodLength();
    this.enterAverageWeeklyHours();
    this.enterPay();
    this.enterPensionContribution();
    this.enterEmployeeBenefits();
    this.enterRespondentName();
    this.enterRespondentAddress();
    this.selectYesToWorkingAtRespondentAddress();
    this.selectNoToAcas();
    this.checkRespondentDetails();
    this.completeEmploymentAndRespondentDetails();
  },
  //clicks employment status link
  clickEmploymentStatusLink() {
    I.click('[href="/past-employer"]');
    I.waitForText('Did you work for the organisation or person you’re making your claim against?', 30);
  },

  //function to click yes worked for organisation on /past-employer page
  workedForOrganisation() {
    I.click('#past-employer');
    I.click('Save and continue');
  },
  //selects still working for respondent on /are-you-still-working page
  stillWorkingForOrganisation() {
    I.waitForText("Are you still working for the organisation or person you're making your claim against?", 30);
    I.click('#still-working');
    I.click('Save and continue');
  },
  //check page title and enter job title
  enterEmploymentJobTitle() {
    I.waitForText('Employment details', 30);
    I.seeElement('#jobTitle');
    I.fillField('#jobTitle', 'Tester');
    I.click('Save and continue');
  },
  //employment start date page
  enterEmploymentStartDate() {
    I.waitForText('Employment start date', 30);
    I.fillField('#startDate-day', '20');
    I.fillField('#startDate-month', '04');
    I.fillField('#startDate-year', '2014');
    I.click('Save and continue');
  },
  //select yes to notice period on /got-a-notice-period page
  selectYesNoticePeriod() {
    I.waitForText('Do you have a written contract with a notice period? (optional)', 30);
    I.checkOption('input[id=notice-period]');
    I.click('Save and continue');
  },
  //select weeks for notice type on /notice-type page
  selectNoticeType() {
    I.waitForText('Is your notice period in weeks or months? (optional)', 30);
    I.checkOption('input[id=notice-type]');
    I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  enterNoticePeriodLength() {
    I.waitForText('How many weeks in your notice period? (optional)', 30);
    I.fillField('input[id=notice-length]', '4');
    I.click('Save and continue');
  },
  //enter average weekly hours
  enterAverageWeeklyHours() {
    I.waitForText('What are your average weekly hours? (optional)', 30);
    I.fillField('#avg-weekly-hrs', '20');
    I.click('Save and continue');
  },
  //enters pay on the /pay page
  enterPay() {
    I.waitForText('Your pay (optional)', 30);
    I.fillField('#pay-before-tax', '40000');
    I.fillField('#pay-after-tax', '35000');
    I.checkOption('input[id=pay-interval]');
    I.click('Save and continue');
  },
  //enter Pension contribution on /pension page
  enterPensionContribution() {
    I.waitForText('Did the respondent make any ', 30);
    I.see('contributions to your');
    I.see('pension? (optional)');
    I.waitForElement('#pension', 30);
    I.checkOption('input[id=pension]');
    I.fillField('#pension-contributions', '200');
    I.click('Save and continue');
  },
  //enter employee benefits on /benefits page
  enterEmployeeBenefits() {
    I.waitForText('Do or did you receive any employee benefits? (optional)', 30);
    I.checkOption('input[id=employee-benefits]');
    I.click('Save and continue');
  },
  //verify user is on respondent-name page and then enters a respondent name
  enterRespondentName() {
    I.waitForText("What is the name of the respondent you're making the claim against?", 30);
    I.fillField('#respondentName', 'Henry Marsh');
    I.click('Save and continue');
  },
  //enters address for respondent
  enterRespondentAddress() {
    I.waitForText('What is the address of Henry Marsh?', 30);
    I.fillField('#postcode', 'LS7 4QE');
    I.click('#findAddressButton');
    I.waitForVisible('#selectAddressInput', 30);
    I.selectOption(
      '#selectAddressInput',
      '{"fullAddress":"7, VALLEY GARDENS, LEEDS, LS7 4QE","street1":"7 VALLEY GARDENS","street2":"","town":"LEEDS","county":"LEEDS","postcode":"LS7 4QE","country":"ENGLAND"}',
    );
    I.click('Save and continue');
  },
  //selects yes to working at respondent address
  selectYesToWorkingAtRespondentAddress() {
    I.waitForText('Did you work at 7 VALLEY GARDENS?', 30);
    I.checkOption('#work-address');
    I.click('Save and continue');
  },
  //selects no option for acas cerificate question on /acas-cer-num page
  selectNoToAcas() {
    I.waitForText('Do you have an Acas certificate number for Henry Marsh?', 30);
    I.checkOption('#acasCert-2');
    I.click('Save and continue');
    I.see('Why do you not have an Acas number?');
    I.checkOption('#no-acas-reason');
    I.click('Save and continue');
  },
  //check respondent details page
  checkRespondentDetails() {
    I.waitForText('Check the respondent details', 30);
    I.click('Save and continue');
  },
  //confirm completed section for employment and respondent details
  completeEmploymentAndRespondentDetails() {
    I.waitForText('Have you completed this section?', 30);
    I.waitForElement('#tasklist-check', 30);
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
  },
};
