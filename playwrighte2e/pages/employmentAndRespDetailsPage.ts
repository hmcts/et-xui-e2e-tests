import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const today = new Date();
const listDay = today.getDate() + 1;
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear() + 1;
let inNoticePeriod: boolean = true; 

export default class EmploymentAndRespDetailsPage extends BasePage{
  //still working for organisation/person scenario
  async processStillWorkingJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    await this.clickEmploymentStatusLink();
   await this.workedForOrganisation('Yes');
   await this.stillWorkingForOrganisation();
   await this.enterEmploymentJobTitle();
   await this.enterEmploymentStartDate();
   await this.selectYesNoticePeriod();
   await this.selectNoticeType();
   await this.enterNoticePeriodLength(!inNoticePeriod);
   await this.enterAverageWeeklyHours();
   await this.enterPay();
   await this.enterPensionContribution();
   await this.enterEmployeeBenefits();
   await this.enterRespondentName();
   await this.enterRespondentAddress(workPostcode, selectedWorkAddress);
   await this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    //this.selectNoToAcas();
   await this.selectYesToAcas();
   await this.checkRespondentDetails();
   await this.completeEmploymentAndRespondentDetails();
  }
  
  //working notice period for organisation/person scenario
  async processWorkingNoticePeriodJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    await this.clickEmploymentStatusLink();
    await this.workedForOrganisation('Yes');
    await this.workingNoticePeriodForOrganisation();
    await this.enterEmploymentJobTitle();
    await this.enterEmploymentStartDate();
    await this.noticePeriodEndDate();
    await this.selectNoticeType();
    await this.enterNoticePeriodLength(inNoticePeriod);
    await this.enterAverageWeeklyHours();
    await this.enterPay();
    await this.enterPensionContribution();
    await this.enterEmployeeBenefits();
    await this.enterRespondentName();
    await this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    await this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    await this.selectYesToAcas();
    await this.checkRespondentDetails();
    await this.completeEmploymentAndRespondentDetails();
  }
  // //No longer working for organisation/person scenario
  async processNoLongerWorkingForOrgJourney(workPostcode, selectedWorkAddress, firstLineOfAddress) {
    await this.clickEmploymentStatusLink();
    await this.workedForOrganisation('Yes');
    await this.noLongerWorkingForOrganisation();
    await this.enterEmploymentJobTitle();
    await this.enterEmploymentStartDate();
    await this.enterEmploymentEndDate();
    await this.selectYesNoticePeriodNoLongerWorking();
    await this.selectNoticeTypeNoLongerWorking();
    await this.enterNoticePeriodLengthNoLongerWorking();
    await this.enterAverageWeeklyHoursNoLongerWorking();
    await this.enterPay();
    await this.enterPensionContribution();
    await this.enterEmployeeBenefitsForNoLongerWorking();
    await this.newJob();
    await this.enterNewJobStartDates();
    await this.enterNewJobPay();
    await this.enterRespondentName();
    await this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    await this.selectYesToWorkingAtRespondentAddress(firstLineOfAddress);
    await this.selectNoToAcas();
    await this.checkRespondentDetails();
    await this.completeEmploymentAndRespondentDetails();
  }

  // //Did not work for organisation scenario
  async processDidNotWorkForOrganisationMakingClaimAgainst(workPostcode, selectedWorkAddress) {
    await this.clickEmploymentStatusLink();
    await this.workedForOrganisation('No');
    await this.enterRespondentName();
    await this.enterRespondentAddress(workPostcode, selectedWorkAddress);
    await this.selectNoToAcas();
    await this.checkRespondentDetails();
    await this.completeEmploymentAndRespondentDetails();
  }
  //clicks employment status link
  async clickEmploymentStatusLink() {
    await this.page.locator('[href="/past-employer?lng=en"]').click();
    await expect(this.page.locator('h1')).toContainText('Did you work for the organisation or person you’re making your claim against?');
  }
  //function to click yes worked for organisation on /past-employer page
  async workedForOrganisation(workedForOrg) {
    if (workedForOrg === 'Yes') {
      await this.page.locator('#past-employer').click();
    } else if (workedForOrg === 'No') {
      await this.page.locator('#past-employer-2').click();
    }
    await this.saveAndContinueButton();
  }
  //selects still working for respondent on /are-you-still-working page
  async stillWorkingForOrganisation() {
    await expect(this.page.locator('h1')).toContainText('Are you still working for the organisation or person you\'re making your claim against?');
    await this.page.locator('#still-working').check();
    await this.saveAndContinueButton();
  }
  //selects working notice period for respondent on /are-you-still-working page
  async workingNoticePeriodForOrganisation() {
    await expect(this.page.locator('h1')).toContainText('Are you still working for the organisation or person you\'re making your claim against?');
    await this.page.locator('#still-working-2').check();
    await this.saveAndContinueButton();
  }
  // //selects i'm no longer working for respondent on /are-you-still-working page
  async noLongerWorkingForOrganisation() {
    await expect(this.page.locator('h1')).toContainText('Are you still working for the organisation or person you\'re making your claim against?');
    await this.page.locator('#still-working-3').check();
    await this.saveAndContinueButton();
  }
  //check page title and enter job title
  async enterEmploymentJobTitle() {
    await expect(this.page.locator('h1')).toContainText('Employment details');
    await this.page.locator('#jobTitle').fill('Tester');
    await this.saveAndContinueButton();
  }
  //employment start date page
  async enterEmploymentStartDate() {
    await expect(this.page.locator('h1')).toContainText('Employment start date');

    await this.page.locator('#startDate-day').fill( '20');
    await this.page.locator('#startDate-month').fill( '04');
    await this.page.locator('#startDate-year').fill( '2014');
    await this.saveAndContinueButton();
  }
  //select yes to notice period on /got-a-notice-period page
  async selectYesNoticePeriod() {
    await expect(this.page.locator('legend')).toContainText('Do you have a written contract with a notice period? (optional)');
    await this.page.locator('input[id=notice-period]').check();
    await this.saveAndContinueButton();
  }
  //selects yes to did you have or work a notice period on /got-a-notice-period page
  async selectYesNoticePeriodNoLongerWorking() {
    await expect(this.page.locator('legend')).toContainText('Did you have or work a notice period? (optional)');
    await this.page.locator('input[id=notice-period]').check();
    await this.saveAndContinueButton();
  }
  //enters notice period end date
  async noticePeriodEndDate() {
    await expect(this.page.locator('h1')).toContainText('End of notice period');
    await this.page.locator('#notice-dates-day').fill(String(listDay));
    await this.page.locator('#notice-dates-month').fill(String(listMonth));
    await this.page.locator('#notice-dates-year').fill(String(listYear));
    await this.saveAndContinueButton();
  }
  // //Enters employment end date dates
  async enterEmploymentEndDate() {
    await expect(this.page.locator('h1')).toContainText('Employment end date');
    await this.page.locator('#end-date-day').fill('20');
    await this.page.locator('#end-date-month').fill('04');
    await this.page.locator('#end-date-year').fill('2022');
    await this.saveAndContinueButton();
  }
  //select weeks for notice type on /notice-type page
  async selectNoticeType() {
    await expect(this.page.locator('h1')).toContainText('Is your notice period in weeks or months? (optional)');
    await this.page.locator('input[id=notice-type]').check();
    await this.saveAndContinueButton();
  }
  //enter notice length on /notice-length page
  async enterNoticePeriodLength(inNoticePeriod) {

    const noticePeriodText = inNoticePeriod 
      ? 'How many weeks of your notice period are you being paid for? (optional)' 
      : 'How many weeks in your notice period? (optional)';

    await expect(this.page.locator('h1')).toContainText(noticePeriodText);
    await this.page.locator('input[id=notice-length]').fill( '4');
    await this.saveAndContinueButton();
  }
  //select yes for did you have or work a notice period question
  async selectNoticeTypeNoLongerWorking() {
    await expect(this.page.locator('h1')).toContainText('Was your notice period in weeks or months? (optional)');
    await this.page.locator('input[id=notice-type]').check();
    await this.saveAndContinueButton();
  }
  //enter notice length on /notice-length page
  async enterNoticePeriodLengthNoLongerWorking() {
    await expect(this.page.locator('h1')).toContainText('How many weeks in your notice period? (optional)');
    await this.page.locator('input[id=notice-length]').fill('4');
    await this.saveAndContinueButton();
  }
  //enter average weekly hours
  async enterAverageWeeklyHours() {
    await expect(this.page.locator('h1')).toContainText('What are your average weekly hours? (optional)');

    await this.page.locator('#avg-weekly-hrs').fill( '20');
    await this.saveAndContinueButton();
  }
  //enter average weekly hours for no longer working
  async enterAverageWeeklyHoursNoLongerWorking() {
    await expect(this.page.locator('h1')).toContainText('What were your average weekly hours? (optional)');
    await this.page.locator('#avg-weekly-hrs').fill('20');
    await this.saveAndContinueButton();
  }
  //enters pay on the /pay page
  async enterPay() {
    await expect(this.page.locator('h1')).toContainText('Your pay (optional)');
    await this.page.locator('#pay-before-tax').fill( '40000');
    await this.page.locator('#pay-after-tax').fill('35000');
    await this.page.locator('input[id=pay-interval]').check();
    await this.saveAndContinueButton();
  }
  //enter Pension contribution on /pension page
  async enterPensionContribution() {
    await expect(this.page.locator('h1')).toContainText('Did the respondent make any contributions to your pension? (optional)');
    await this.page.locator('input[id=pension]').check();
    await this.page.locator('#pension-contributions').fill( '200');
    await this.saveAndContinueButton();
  }
  //enter employee benefits on /benefits page
  async enterEmployeeBenefits() {
    await expect(this.page.locator('legend')).toContainText('Do you or did you receive any employee benefits? (optional)');
    await this.page.locator('input[id=employee-benefits]').check();
    await this.saveAndContinueButton();
  }
  //enter employment benefir for no longer working different to flow on R1.1.2
  async enterEmployeeBenefitsForNoLongerWorking() {
    await expect(this.page.locator('legend')).toContainText('Did you receive any employee benefits? (optional)');
    await this.page.locator('input[id=employee-benefits]').check();
    await this.saveAndContinueButton();
  }
  //Selects yes to new job on /new-job page
  async newJob() {
    await expect(this.page.locator('#new-job')).toBeVisible();
    await this.page.locator('#new-job').check();
    await this.saveAndContinueButton();
  }

  // enter start date for new job
  async enterNewJobStartDates() {
    await expect(this.page.locator('#new-job-start-date-day')).toBeVisible();
    await this.page.locator('#new-job-start-date-day').fill('20');
    await this.page.locator('#new-job-start-date-month').fill('08');
    await this.page.locator('#new-job-start-date-year').fill('2024');
    await this.saveAndContinueButton();
  }

  // enter new job pay
  async enterNewJobPay() {
    await expect(this.page.locator('#new-pay-before-tax')).toBeVisible();
    await this.page.locator('#new-pay-before-tax').fill('50000');
    await this.page.locator('#new-job-pay-interval-3').check();
    await this.saveAndContinueButton();
  }
  //verify user is on respondent-name page and then enters a respondent name
  async enterRespondentName() {
    await expect(this.page.locator('h1')).toContainText('What is the name of the respondent you\'re making the claim against?');
    await this.page.locator('#respondentName').fill( 'Henry Marsh');
    await this.saveAndContinueButton();
  }
  //enters address for respondent
  async enterRespondentAddress(workPostcode, selectedWorkAddress) {
    await expect(this.page.locator('label')).toContainText('Enter a UK postcode');
    await this.page.locator('#respondentEnterPostcode').fill( workPostcode);
    await this.saveAndContinueButton();
    await expect(this.page.locator('h1')).toContainText('Select an address');
    await this.page.locator('#respondentAddressTypes').selectOption(selectedWorkAddress);
    await this.saveAndContinueButton();
    await expect(this.page.locator('#main-content')).toContainText('This should be the same respondent address given to Acas.');
    await this.saveAndContinueButton();
  }
  //selects yes to working at respondent address
  async selectYesToWorkingAtRespondentAddress(firstLineOfAddress) {
    await expect(this.page.locator('h1')).toContainText('Did you work at');

    await this.page.locator('#work-address').check();
    await this.saveAndContinueButton();
  }
  //selects no option for acas cerificate question on /acas-cer-num page
  async selectNoToAcas() {
    await expect(this.page.locator('legend')).toContainText('Do you have an Acas certificate number for Henry Marsh?');
    await this.page.locator('#acasCert-2').check();
    await this.saveAndContinueButton();
    await expect(this.page.locator('legend')).toContainText('Why do you not have an Acas number?');
    await this.page.locator('#no-acas-reason').check();
    await this.saveAndContinueButton();
  }
  
  async selectYesToAcas() {
    await expect(this.page.locator('legend')).toContainText('Do you have an Acas certificate number for');
    await this.page.locator('#acasCert').check()
    await this.page.locator('#acasCertNum').fill('R444444/89/74');
  await this.saveAndContinueButton();
  }
  //check respondent details page
  async checkRespondentDetails() {
    await expect(this.page.locator('h1')).toContainText('Check the respondent details');
    await this.saveAndContinueButton();
  }
  //confirm completed section for employment and respondent details
  async completeEmploymentAndRespondentDetails() {
    await expect(this.page.locator('h1')).toContainText('Have you completed this section?');
    await this.page.locator('#tasklist-check').check();
    await this.saveAndContinueButton();
  }
}
