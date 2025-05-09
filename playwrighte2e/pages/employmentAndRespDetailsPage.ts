import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const today = new Date();
const listDay = today.getDate();
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear() + 1;
let inNoticePeriod: boolean = true;

export default class EmploymentAndRespDetailsPage extends BasePage{

  addAnotherRespondentButton: '#main-form-submit';
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

  async multipleAcasCertificate(workPostcode, selectedWorkAddress, firstLineOfAddress) {
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
    await this.addMultipleAcasCertificate();
    await this.addSecondRespondentDetails(workPostcode, selectedWorkAddress)
    await this.checkRespondentDetails();
    await this.completeEmploymentAndRespondentDetails();
  }
  //clicks employment status link
  async clickEmploymentStatusLink() {
    await this.webActions.clickElementByCss('[href="/past-employer?lng=en"]');
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Did you work for the organisation or person you’re making your claim against?');
  }
  //function to click yes worked for organisation on /past-employer page
  async workedForOrganisation(workedForOrg) {
    if (workedForOrg === 'Yes') {
      await this.webActions.clickElementByCss('#past-employer');
    } else if (workedForOrg === 'No') {
      await this.webActions.clickElementByCss('#past-employer-2');
    }
    await this.saveAndContinueButton();
  }
  //selects still working for respondent on /are-you-still-working page
  async stillWorkingForOrganisation() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Are you still working for the organisation or person you\'re making your claim against?');
    await this.webActions.checkElementById('#still-working');
    await this.saveAndContinueButton();
  }
  //selects working notice period for respondent on /are-you-still-working page
  async workingNoticePeriodForOrganisation() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Are you still working for the organisation or person you\'re making your claim against?');
    await this.webActions.checkElementById('#still-working-2');
    await this.saveAndContinueButton();
  }
  // //selects i'm no longer working for respondent on /are-you-still-working page
  async noLongerWorkingForOrganisation() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Are you still working for the organisation or person you\'re making your claim against?');
    await this.webActions.checkElementById('#still-working-3');
    await this.saveAndContinueButton();
  }
  //check page title and enter job title
  async enterEmploymentJobTitle() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Employment details');
    await this.webActions.fillField('#jobTitle', 'Tester');
    await this.saveAndContinueButton();
  }
  //employment start date page
  async enterEmploymentStartDate() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Employment start date');
    await this.webActions.fillField('#startDate-day', '20');
    await this.webActions.fillField('#startDate-month', '04');
    await this.webActions.fillField('#startDate-year', '2014');
    await this.saveAndContinueButton();
  }
  //select yes to notice period on /got-a-notice-period page
  async selectYesNoticePeriod() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you have a written contract with a notice period? (optional)');
    await this.webActions.checkElementById('#notice-period');
    await this.saveAndContinueButton();
  }
  //selects yes to did you have or work a notice period on /got-a-notice-period page
  async selectYesNoticePeriodNoLongerWorking() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Did you have or work a notice period? (optional)');
    await this.webActions.checkElementById('#notice-period');
    await this.saveAndContinueButton();
  }
  //enters notice period end date
  async noticePeriodEndDate() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'End of notice period');
    await this.webActions.fillField('#notice-dates-day', String(listDay));
    await this.webActions.fillField('#notice-dates-month', String(listMonth));
    await this.webActions.fillField('#notice-dates-year', String(listYear));
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
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Is your notice period in weeks or months? (optional)');
    await this.webActions.checkElementById('#notice-type');
    await this.saveAndContinueButton();
  }
  //enter notice length on /notice-length page
  async enterNoticePeriodLength(inNoticePeriod) {

    const noticePeriodText = inNoticePeriod
      ? 'How many weeks of your notice period are you being paid for? (optional)'
      : 'How many weeks in your notice period? (optional)';

    await this.webActions.verifyElementContainsText(this.page.locator('h1'), noticePeriodText);
    await this.webActions.fillField('input[id=notice-length]', '4');
    await this.saveAndContinueButton();
  }
  //select yes for did you have or work a notice period question
  async selectNoticeTypeNoLongerWorking() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Was your notice period in weeks or months? (optional)');
    await this.webActions.checkElementById('#notice-type');
    await this.saveAndContinueButton();
  }
  //enter notice length on /notice-length page
  async enterNoticePeriodLengthNoLongerWorking() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'How many weeks in your notice period? (optional)');
    await this.webActions.fillField('input[id=notice-length]', '4');
    await this.saveAndContinueButton();
  }
  //enter average weekly hours
  async enterAverageWeeklyHours() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'What are your average weekly hours? (optional)');
    await this.webActions.fillField('#avg-weekly-hrs', '20');
    await this.saveAndContinueButton();
  }
  //enter average weekly hours for no longer working
  async enterAverageWeeklyHoursNoLongerWorking() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'What were your average weekly hours? (optional)');
    await this.webActions.fillField('#avg-weekly-hrs', '20');
    await this.saveAndContinueButton();
  }
  //enters pay on the /pay page
  async enterPay() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Your pay (optional)');
    await this.webActions.fillField('#pay-before-tax', '40000');
    await this.webActions.fillField('#pay-after-tax', '35000');
    await this.webActions.checkElementById('#pay-interval');
    await this.saveAndContinueButton();
  }
  //enter Pension contribution on /pension page
  async enterPensionContribution() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Did the respondent make any contributions to your pension? (optional)');
    await this.webActions.checkElementById('#pension');
    await this.webActions.fillField('#pension-contributions', '200');
    await this.saveAndContinueButton();
  }
  //enter employee benefits on /benefits page
  async enterEmployeeBenefits() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you or did you receive any employee benefits? (optional)');
    await this.webActions.checkElementById('#employee-benefits');
    await this.saveAndContinueButton();
  }
  //enter employment benefir for no longer working different to flow on R1.1.2
  async enterEmployeeBenefitsForNoLongerWorking() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Did you receive any employee benefits? (optional)');
    await this.webActions.checkElementById('#employee-benefits');
    await this.saveAndContinueButton();
  }
  //Selects yes to new job on /new-job page
  async newJob() {
    await this.webActions.verifyElementToBeVisible(this.page.locator('#new-job'));
    await this.webActions.checkElementById('#new-job');
    await this.saveAndContinueButton();
  }

  // enter start date for new job
  async enterNewJobStartDates() {
    await this.webActions.verifyElementToBeVisible(this.page.locator('#new-job-start-date-day'));
    await this.webActions.fillField('#new-job-start-date-day', '20');
    await this.webActions.fillField('#new-job-start-date-month', '08');
    await this.webActions.fillField('#new-job-start-date-year', '2024');
    await this.saveAndContinueButton();
  }

  // enter new job pay
  async enterNewJobPay() {
    await this.webActions.verifyElementToBeVisible(this.page.locator('#new-pay-before-tax'));
    await this.webActions.fillField('#new-pay-before-tax', '50000');
    await this.webActions.checkElementById('#new-job-pay-interval-3');
    await this.saveAndContinueButton();
  }
  //verify user is on respondent-name page and then enters a respondent name
  async enterRespondentName() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'What is the name of the respondent you\'re making the claim against?');
    await this.webActions.fillField('#respondentName', 'Henry Marsh');
    await this.saveAndContinueButton();
  }
  //enters address for respondent
  async enterRespondentAddress(workPostcode, selectedWorkAddress) {
    await this.webActions.verifyElementContainsText(this.page.locator('label'), 'Enter a UK postcode');
    await this.webActions.fillField('#respondentEnterPostcode', workPostcode);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Select an address');
    await this.webActions.selectByOptionFromDropDown('#respondentAddressTypes', selectedWorkAddress);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'This should be the same respondent address given to Acas.');
    await this.saveAndContinueButton();
  }
  //selects yes to working at respondent address
  async selectYesToWorkingAtRespondentAddress(firstLineOfAddress) {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Did you work at');
    await this.webActions.checkElementById('#work-address');
    await this.saveAndContinueButton();
  }
  //selects no option for acas cerificate question on /acas-cer-num page
  async selectNoToAcas() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you have an Acas certificate number for Henry Marsh?');
    await this.webActions.checkElementById('#acasCert-2');

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Why do you not have an Acas number?');
    await this.webActions.checkElementById('#no-acas-reason');
    await this.saveAndContinueButton();
  }

  async selectYesToAcas() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you have an Acas certificate number for');
    await this.webActions.checkElementById('#acasCert');
    await this.webActions.fillField('#acasCertNum', 'R444444/89/74');
    await this.delay(2000);
    await this.saveAndContinueButton();
  }

  async addMultipleAcasCertificate(){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Check the respondent details');
    await this.addRespondentButton();
  }

  async addSecondRespondentDetails(workPostcode, selectedWorkAddress){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'What is the name of the respondent you\'re making the claim against?');
    await this.webActions.fillField('#respondentName', 'Annie Ray');
    await this.saveAndContinueButton();

    await this.webActions.verifyElementContainsText(this.page.locator('label'), 'Enter a UK postcode');
    await this.webActions.fillField('#respondentEnterPostcode', workPostcode);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Select an address');
    await this.webActions.selectByOptionFromDropDown('#respondentAddressTypes', selectedWorkAddress);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'This should be the same respondent address given to Acas.');
    await this.saveAndContinueButton();

    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you have an Acas certificate number for');
    await this.webActions.checkElementById('#acasCert');
    await this.webActions.fillField('#acasCertNum', 'R872259/22/64');
    await this.delay(2000);
    await this.saveAndContinueButton();
  }

  //check respondent details page
  async checkRespondentDetails() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Check the respondent details');
    await this.saveAndContinueButton();
  }
  //confirm completed section for employment and respondent details
  async completeEmploymentAndRespondentDetails() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Have you completed this section?');
    await this.webActions.checkElementById('#tasklist-check');
    await this.saveAndContinueButton();
  }
}
