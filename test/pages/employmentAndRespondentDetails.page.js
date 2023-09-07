const { I } = inject();

module.exports = {
  //still working for organisation/person scenario
  processStillWorkingJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation('Yes');
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
    this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    this.selectNoToAcas();
    this.checkRespondentDetails();
    this.completeEmploymentAndRespondentDetails();
  },
  //working notice period for organisation/person scenario
  processWorkingNoticePeriodJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation('Yes');
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
    this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    this.selectNoToAcas();
    this.checkRespondentDetails();
    this.completeEmploymentAndRespondentDetails();
  },
  //No longer working for organisation/person scenario
  processNoLongerWorkingForOrgJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation('Yes');
    this.noLongerWorkingForOrganisation();
    this.enterEmploymentJobTitle();
    this.enterEmploymentStartDate();
    this.enterEmploymentEndDate();
    this.selectYesNoticePeriodNoLongerWorking();
    this.selectNoticeTypeNoLongerWorking();
    this.enterNoticePeriodLengthNoLongerWorking();
    this.enterAverageWeeklyHoursNoLongerWorking();
    this.enterPay();
    this.enterPensionContribution();
    this.enterEmployeeBenefitsForNoLongerWorking();
    this.newJob();
    this.enterNewJobStartDates();
    this.enterNewJobPay();
    this.enterRespondentName();
    this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    this.selectNoToAcas();
    this.checkRespondentDetails();
    this.completeEmploymentAndRespondentDetails();
  },
  //Did not work for organisation scenario
  processDidNotWorkForOrganisationMakingClaimAgainst(workPostcode, selectedWorkAddress) {
    this.clickEmploymentStatusLink();
    this.workedForOrganisation('No');
    this.enterRespondentName();
    this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    this.selectNoToAcas();
    this.checkRespondentDetails();
    this.completeEmploymentAndRespondentDetails();
  },
  //clicks employment status link
  clickEmploymentStatusLink() {
    I.click('[href="/past-employer?lng=en"]');
    I.waitForVisible('#main-form', 5);
    I.see('Did you work for the');
    I.see('organisation or person you’re');
    I.see('making your claim against?');
  },
  //function to click yes worked for organisation on /past-employer page
  workedForOrganisation(workedForOrg) {
    if (workedForOrg === 'Yes') {
      I.click('#past-employer');
    } else if (workedForOrg === 'No') {
      I.click('#past-employer-2');
    }
    I.click('Save and continue');
  },
  //selects still working for respondent on /are-you-still-working page
  stillWorkingForOrganisation() {
    I.waitForVisible('#main-form', 5);
    I.waitForText('Are you still working for the', 30);
    I.see("organisation or person you're");
    I.see('making your claim against?');
    I.click('#still-working');
    I.click('Save and continue');
  },
  //selects working notice period for respondent on /are-you-still-working page
  workingNoticePeriodForOrganisation() {
    I.waitForVisible('#main-form', 5);
    I.see('Are you still working for the');
    I.see("organisation or person you're");
    I.see('making your claim against?');
    I.click('#still-working-2');
    I.click('Save and continue');
  },
  //selects i'm no longer working for respondent on /are-you-still-working page
  noLongerWorkingForOrganisation() {
    I.waitForVisible('#main-form', 5);
    I.see('Are you still working for the');
    I.see("organisation or person you're");
    I.see('making your claim against?');
    I.click('#still-working-3');
    I.click('Save and continue');
  },
  //check page title and enter job title
  enterEmploymentJobTitle() {
    I.waitForVisible('#main-form', 5);
    I.see('Employment details');
    I.seeElement('#jobTitle');
    I.fillField('#jobTitle', 'Tester');
    I.click('Save and continue');
  },
  //employment start date page
  enterEmploymentStartDate() {
    I.waitForVisible('#main-form', 5);
    I.see('Employment start date');
    I.fillField('#startDate-day', '20');
    I.fillField('#startDate-month', '04');
    I.fillField('#startDate-year', '2014');
    I.click('Save and continue');
  },
  //select yes to notice period on /got-a-notice-period page
  selectYesNoticePeriod() {
    I.waitForVisible('#main-form', 5);
    I.see('Do you have a written');
    I.see('contract with a notice');
    I.see('period? (optional)');
    I.checkOption('input[id=notice-period]');
    I.click('Save and continue');
  },
  //selects yes to did you have or work a notice period on /got-a-notice-period page
  selectYesNoticePeriodNoLongerWorking() {
    I.waitForVisible('#main-form', 5);
    I.see('Did you have or work a notice period? (optional)');
    I.checkOption('input[id=notice-period]');
    I.click('Save and continue');
  },
  //enters notice period end date
  noticePeriodEndDate() {
    I.waitForVisible('#main-form', 5);
    I.fillField('#notice-dates-day', '20');
    I.fillField('#notice-dates-month', '04');
    I.fillField('#notice-dates-year', '2024');
    I.click('Save and continue');
  },
  //Enters employment end date dates
  enterEmploymentEndDate() {
    I.waitForVisible('#main-form', 5);
    I.fillField('#end-date-day', '20');
    I.fillField('#end-date-month', '04');
    I.fillField('#end-date-year', '2022');
    I.click('Save and continue');
  },
  //select weeks for notice type on /notice-type page
  selectNoticeType() {
    I.waitForVisible('#main-form', 5);
    I.waitForText('Is your notice period in', 30);
    I.see('weeks or months? (optional)');
    I.checkOption('input[id=notice-type]');
    I.click('Save and continue');
  },
  //enter notice length on /notice-length page
  enterNoticePeriodLength() {
    I.waitForVisible('#main-form', 5);
    I.see('How many weeks in your');
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
    I.waitForVisible('#main-form', 5);
    I.see('What are your average weekly hours? (optional)');
    I.fillField('#avg-weekly-hrs', '20');
    I.click('Save and continue');
  },
  //enter average weekly hours for no longer working
  enterAverageWeeklyHoursNoLongerWorking() {
    I.waitForVisible('#main-form', 5);
    I.see('What were your average weekly hours? (optional)');
    I.fillField('#avg-weekly-hrs', '20');
    I.click('Save and continue');
  },
  //enters pay on the /pay page
  enterPay() {
    I.waitForVisible('#main-form', 5);
    I.see('Your pay (optional)');
    I.fillField('#pay-before-tax', '40000');
    I.fillField('#pay-after-tax', '35000');
    I.checkOption('input[id=pay-interval]');
    I.click('Save and continue');
  },
  //enter Pension contribution on /pension page
  enterPensionContribution() {
    I.waitForVisible('#main-form', 5);
    I.see('Did the respondent make any');
    I.see('contributions to your');
    I.see('pension? (optional)');
    I.waitForElement('#pension', 30);
    I.checkOption('input[id=pension]');
    I.fillField('#pension-contributions', '200');
    I.click('Save and continue');
  },
  //enter employee benefits on /benefits page
  enterEmployeeBenefits() {
    I.waitForVisible('#main-form', 5);
    I.see('Do you or did you receive any employee benefits? (optional)');
    I.checkOption('input[id=employee-benefits]');
    I.click('Save and continue');
  },
  //enter employment benefir for no longer working different to flow on R1.1.2
  enterEmployeeBenefitsForNoLongerWorking() {
    I.waitForVisible('#main-form', 5);
    I.see('Did you receive any employee benefits? (optional)');
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
    I.see('What is the name of the');
    I.see("respondent you're making");
    I.see('the claim against?');
    I.fillField('#respondentName', 'Henry Marsh');
    I.click('Save and continue');
  },
  //enters address for respondent
  enterRespondentAddress(workPostcode, selectedWorkAddress) {
    I.waitForVisible('#main-form', 10);
    //pause();
    I.see('Enter a UK postcode');
    I.fillField('#respondentEnterPostcode', workPostcode);
    I.click('Save and continue');
    I.waitForVisible('#main-content', 15);
    I.see('Select an address');
    I.selectOption("#respondentAddressTypes", selectedWorkAddress);
    I.click('Save and continue');
    I.see('This should be the same respondent address given to Acas.');
    I.click('Save and continue');
  },
  //selects yes to working at respondent address
  selectYesToWorkingAtRespondentAddress(firstLineOfAddress) {
    I.waitForVisible('#main-form', 5);
    I.see(firstLineOfAddress);
    I.checkOption('#work-address');
    I.click('Save and continue');
  },
  //selects no option for acas cerificate question on /acas-cer-num page
  selectNoToAcas() {
    I.waitForVisible('#main-form', 5);
    I.see('Do you have an Acas');
    I.see('certificate number for Henry Marsh?');
    I.checkOption('#acasCert-2');
    I.click('Save and continue');
    I.see('Why do you not have an Acas number?');
    I.checkOption('#no-acas-reason');
    I.click('Save and continue');
  },
  //check respondent details page
  checkRespondentDetails() {
    I.waitForVisible('#main-form', 5);
    I.see('Check the respondent details');
    I.click('Save and continue');
  },
  //confirm completed section for employment and respondent details
  completeEmploymentAndRespondentDetails() {
    I.waitForVisible('#main-form', 5);
    I.see('Have you completed this');
    I.see('section?');
    I.waitForElement('#tasklist-check', 30);
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
  },
};
