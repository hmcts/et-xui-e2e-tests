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
    I.see('Did you work for the organisation or person you’re making your claim against?');
  },
  //function to click yes worked for organisation on /past-employer page
  workedForOrganisation() {
    I.click('#past-employer');
    I.click('Save and continue');
  },
  //selects still working for respondent on /are-you-still-working page
  stillWorkingForOrganisation() {
    I.see("Are you still working for the organisation or person you're making your claim against?");
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
    I.see('Employment details');
    I.seeElement('#jobTitle');
    I.fillField('#jobTitle', 'Tester');
    I.click('Save and continue');
  },
  //employment start date page
  enterEmploymentStartDate() {
    I.see('Employment start date');
    I.fillField('#startDate-day', '20');
    I.fillField('#startDate-month', '04');
    I.fillField('#startDate-year', '2014');
    I.click('Save and continue');
  },
  //select yes to notice period on /got-a-notice-period page
  selectYesNoticePeriod() {
    I.see('Do you have a written contract with a notice period? (optional)');
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
    I.see('Is your notice period in weeks or months? (optional)');
    I.checkOption('input[id=notice-type]');
    I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  enterNoticePeriodLength() {
    I.see('How many weeks in your notice period? (optional)');
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
    I.see('What were your average weekly hours? (optional)');
    I.fillField('#avg-weekly-hrs', '20');
    I.click('Save and continue');
  },
  //enters pay on the /pay page
  enterPay() {
    I.see('Your pay (optional)');
    I.fillField('#pay-before-tax', '40000');
    I.fillField('#pay-after-tax', '35000');
    I.checkOption('input[id=pay-interval]');
    I.click('Save and continue');
  },
  //enter Pension contribution on /pension page
  enterPensionContribution() {
    I.see('Did the respondent make any contributions to your pension? (optional)');
    I.seeElement('#pension');
    I.checkOption('input[id=pension]');
    I.fillField('#pension-contributions', '200');
    I.click('Save and continue');
  },
  //enter employee benefits on /benefits page
  enterEmployeeBenefits() {
    //I.see('Do or did you receive any employee benefits? (optional)');
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
    I.see("What is the name of the respondent you're making the claim against?");
    I.fillField('#respondentName', 'Henry Marsh');
    I.click('Save and continue');
  },
  //enters address for respondent
  enterRespondentAddress() {
    I.see('What is the address of Henry Marsh?');
    I.fillField('#postcode', 'LS7 4QE');
    I.click('#findAddressButton');
    I.waitForVisible('#selectAddressInput');
    I.selectOption(
      '#selectAddressInput',
      '{"fullAddress":"7, VALLEY GARDENS, LEEDS, LS7 4QE","street1":"7 VALLEY GARDENS","street2":"","town":"LEEDS","county":"LEEDS","postcode":"LS7 4QE","country":"ENGLAND"}',
    );
    I.click('Save and continue');
  },
  //selects yes to working at respondent address
  selectYesToWorkingAtRespondentAddress() {
    I.see('Did you work at 7 VALLEY GARDENS?');
    I.checkOption('#work-address');
    I.click('Save and continue');
  },
  //selects no option for acas certificate question on /acas-cer-num page
  selectNoToAcas() {
    I.see('Do you have an Acas certificate number for Henry Marsh?');
    I.checkOption('#acasCert-2');
    I.click('Save and continue');
    I.see('Why do you not have an Acas number?');
    I.checkOption('#no-acas-reason');
    I.click('Save and continue');
  },
  //check respondent details page
  checkRespondentDetails() {
    I.see('Check the respondent details');
    I.click('Save and continue');
  },
  //confirm completed section for employment and respondent details
  completeEmploymentAndRespondentDetails() {
    I.see('Have you completed this section?');
    I.seeElement('#tasklist-check');
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
  },
};
