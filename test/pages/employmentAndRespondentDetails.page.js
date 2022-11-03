const { I } = inject();

module.exports = {
  //still working for organisation/person scenario
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
  //working notice period for organisation/person scenario
  processWorkingNoticePeriodJourney() {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation();
    this.workingNoticePeriodForOrganisation();
    this.enterEmploymentJobTitle();
    this.enterEmploymentStartDate();
    this.noticePeriodEndDate();
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
  //No longer working for organisation/person scenario
  processNoLongerWorkingForOrgJourney() {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation();
    this.noLongerWorkingForOrganisation();
    this.enterEmploymentJobTitle();
    this.enterEmploymentStartDate();
    this.enterEmploymentEndDate();
    this.selectYesNoticePeriodNoLongerWorking();
    this.selectNoticeTypeNoLongerWorking();
    this.enterNoticePeriodLengthNoLongerWorking();
    this.enterAverageWeeklyHours();
    this.enterPay();
    this.enterPensionContribution();
    this.enterEmployeeBenefits();
    this.newJob();
    this.enterNewJobStartDates();
    this.enterNewJobPay();
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
    I.waitForText('Did you work for the', 30);
    I.see('organisation or person you’re');
    I.see('making your claim against?');
  },
  //function to click yes worked for organisation on /past-employer page
  workedForOrganisation() {
    I.click('#past-employer');
    I.click('Save and continue');
  },
  //selects still working for respondent on /are-you-still-working page
  stillWorkingForOrganisation() {
    I.waitForText('Are you still working for the', 30);
    I.see("organisation or person you're");
    I.see('making your claim against?');
    I.click('#still-working');
    I.click('Save and continue');
  },
  //selects working notice period for respondent on /are-you-still-working page
  workingNoticePeriodForOrganisation() {
    I.see("Are you still working for the organisation or person you're making your claim against?");
    I.click('#still-working-2');
    I.click('Save and continue');
  },
  //selects i'm no longer working for respondent on /are-you-still-working page
  noLongerWorkingForOrganisation() {
    I.see("Are you still working for the organisation or person you're making your claim against?");
    I.click('#still-working-3');
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
    I.waitForText('Do you have a written', 30);
    I.see('contract with a notice');
    I.see('period? (optional)');
    I.checkOption('input[id=notice-period]');
    I.click('Save and continue');
  },
  //selects yes to did you have or work a notice period on /got-a-notice-period page
  selectYesNoticePeriodNoLongerWorking() {
    I.see('Did you have or work a notice period? (optional)');
    I.checkOption('input[id=notice-period]');
    I.click('Save and continue');
  },
  //enters notice period end date
  noticePeriodEndDate() {
    I.fillField('#notice-dates-day', '20');
    I.fillField('#notice-dates-month', '04');
    I.fillField('#notice-dates-year', '2024');
    I.click('Save and continue');
  },
  //Enters employment end date dates
  enterEmploymentEndDate() {
    I.fillField('#end-date-day', '20');
    I.fillField('#end-date-month', '04');
    I.fillField('#end-date-year', '2022');
    I.click('Save and continue');
  },
  //select weeks for notice type on /notice-type page
  selectNoticeType() {
    I.waitForText('Is your notice period in', 30);
    I.see('weeks or months? (optional)');
    I.checkOption('input[id=notice-type]');
    I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  enterNoticePeriodLength() {
    I.waitForText('How many weeks in your', 30);
    I.see('notice period? (optional)');
    I.fillField('input[id=notice-length]', '4');
    I.click('Save and continue');
  },
  //select yes for did you have or work a notice period question
  selectNoticeTypeNoLongerWorking() {
    I.see('Was your notice period in weeks or months? (optional)');
    I.checkOption('input[id=notice-type]');
    I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  enterNoticePeriodLengthNoLongerWorking() {
    I.see('How many weeks in your notice period? (optional)');
    I.fillField('input[id=notice-length]', '4');
    I.click('Save and continue');
  },
  //enter average weekly hours
  enterAverageWeeklyHours() {
    I.waitForText('What are your', 30);
    I.see('average weekly hours? (optional)');
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
    I.waitForText('Did the respondent make any', 30);
    I.see('contributions to your');
    I.see('pension? (optional)');
    I.waitForElement('#pension', 30);
    I.checkOption('input[id=pension]');
    I.fillField('#pension-contributions', '200');
    I.click('Save and continue');
  },
  //enter employee benefits on /benefits page
  enterEmployeeBenefits() {
    I.waitForText('Do or did you receive any', 30);
    I.see('employee benefits?');
    I.see('(optional)');
    I.checkOption('input[id=employee-benefits]');
    I.click('Save and continue');
  },
  //Selects yes to new job on /new-job page
  newJob() {
    I.seeElement('#new-job');
    I.checkOption('#new-job');
    I.click('Save and continue');
  },
  //enter start date for new job
  enterNewJobStartDates() {
    I.seeElement('#new-job-start-date-day');
    I.fillField('#new-job-start-date-day', '20');
    I.fillField('#new-job-start-date-month', '08');
    I.fillField('#new-job-start-date-year', '2024');
    I.click('Save and continue');
  },
  //enter new job pay
  enterNewJobPay() {
    I.seeElement('#new-pay-before-tax');
    I.fillField('#new-pay-before-tax', '50000');
    I.checkOption('#new-job-pay-interval-3');
    I.click('Save and continue');
  },
  //verify user is on respondent-name page and then enters a respondent name
  enterRespondentName() {
    I.waitForText('What is the name of the', 30);
    I.see("respondent you're making");
    I.see('the claim against?');
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
    I.waitForText('Do you have an Acas', 30);
    I.see('certificate number for Henry Marsh?');
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
    I.waitForText('Have you completed this', 30);
    I.see('section?');
    I.waitForElement('#tasklist-check', 30);
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
  },
};
