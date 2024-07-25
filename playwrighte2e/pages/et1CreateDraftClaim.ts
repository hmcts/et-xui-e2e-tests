import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { click } from "webdriverio/build/commands/element/click";
const postcodeHelper = require('../helper/postcode.js');

export default class Et1CreateDraftClaim extends BasePage{

elements = {

  et1Postcode:  this.page.locator("//input[@id='et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput']"),
  et1Section1Link: this.page.locator('//a[contains(.,"ET1 Section 1")]'),
  claimantFirstName: this.page.locator('#claimantFirstName'),
  claimantLastname: this.page.locator('#claimantLastName'),
  date: this.page.locator('#claimantDateOfBirth-day'),
  month: this.page.locator('#claimantDateOfBirth-month'),
  year:this.page.locator('#claimantDateOfBirth-year'),
  et1Section2Link:this.page.locator('//a[contains(.,"ET1 Section 2")]'),
  et1Section3Link:this.page.locator('//a[contains(.,"ET1 Section 3")]'),
  submitClaimLink:this.page.locator('//a[contains(.,"Submit claim")]'),
  caseDetailsTab:this.page.locator('#mat-tab-label-0-0'),
  representativeAttendHearing: this.page.locator('#representativeAttendHearing-Phone'),
  hearingContactLanguage:this.page.locator('#hearingContactLanguage-English'),
  claimantAttendHearing: this.page.locator('#claimantAttendHearing-Phone'),
  claimantHearingContactLanguage:this.page.locator('#claimantHearingContactLanguage-English'),
  claimantSupportQuestion:this.page.locator('#claimantSupportQuestion-Yes'),
  representativeContactPreference:this.page.locator('#representativeContactPreference-Email'),
  contactLanguageQuestion:this.page.locator('#contactLanguageQuestion-English'),
  representativePhoneNumber:this.page.locator('#representativePhoneNumber'),
  representativeReferenceNumber:this.page.locator('#representativeReferenceNumber'),
  didClaimantWorkForOrg:this.page.locator('#didClaimantWorkForOrg-Yes'),
  claimantStillWorking:this.page.locator('  #claimantStillWorking-Working'),
  claimantJobTitle:this.page.locator('#claimantJobTitle'),
  claimantStartDate:this.page.locator('#claimantStartDate-day'),
  claimantStartDateMonth:this.page.locator('#claimantStartDateMonth'),
  claimantStartDateYear:this.page.locator('#claimantStartDateYear'),
  claimantStillWorkingNoticePeriodMonths:this.page.locator('#claimantStillWorkingNoticePeriod-Months'),
  claimantStillWorkingNoticePeriodMonthsText:this.page.locator('#claimantStillWorkingNoticePeriodMonths'),
  claimantAverageWeeklyWorkHours:this.page.locator('#claimantAverageWeeklyWorkHours'),
};
 async claimantWorkLocation() {
    await this.elements.et1Postcode.click();
  }


  async et1Section1(){
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 1 - Claimant details');
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 2 - Employment & respondent details');
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 3 - Details of the claim');
    await expect(this.page.locator('#mat-tab-label-0-0')).toContainText('ET1 Claim');

    await this.elements.et1Section1Link.click();
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Make a claim to an employment tribunal');
    await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Claimant details');
    await this.elements.claimantFirstName.fill('Jessamine');
    await this.elements.claimantLastname.fill('Malcom');
    await this.elements.date.fill('1');
    await this.elements.month.fill('11');
    await this.elements.year.fill('2000');
    await this.clickContinue();

    await expect(this.page.locator('#claimantSex')).toContainText('Select the claimant\'s sex (Optional)');


    await this.page.getByLabel('Female').check();
    await this.page.getByLabel('What is the claimant’s').click();
    await this.page.getByLabel('What is the claimant’s').fill('miss');
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.clickContinue();
    //can check fields are optional

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Claimant contact address');
    await postcodeHelper.enterClaimantPostcode('LS121AA','The Deli, 1 Whitehall Place, Leeds');


    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Hearing format');
    await this.elements.representativeAttendHearing.check();
    await this.elements.hearingContactLanguage.check();
    await this.elements.claimantAttendHearing.check();
    await this.elements.claimantHearingContactLanguage.check();
    await this.clickContinue();


    await this.elements.claimantSupportQuestion.check();
    await this.page.locator('claimantSupportQuestionReason').fill('disability access');
    await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Your information (as the representative)');
    await this.elements.representativeContactPreference.check();
    await this.elements.contactLanguageQuestion.check();
    await this.elements.representativePhoneNumber.fill('01234567890');
    await this.elements.representativeReferenceNumber.fill('reference no: 1');
    await this.clickContinue();


    // ET1 section 1- CYA page
    await expect(this.page.locator('form')).toContainText('Claimant\'s First Name');
    await expect(this.page.locator('form')).toContainText('Claimant\'s Last Name');
    await expect(this.page.locator('form')).toContainText('Which types of hearing can you, as the representative, attend?');
    await expect(this.page.locator('form')).toContainText('If a hearing is required, what language does the claimant want to speak at a hearing?');
    await expect(this.page.locator('form')).toContainText('Are there any support requirements?');
    await expect(this.page.locator('form')).toContainText('What is your representative reference number?');
    await expect(this.page.locator('form')).toContainText('What is you contact phone number?');
    await this.saveAsDraft();

    await expect(this.page.locator('#confirmation-body')).toContainText('Your answers have been saved.');
    await this.closeAndReturn();
  }

  async et1Section2(){
    await expect(this.page.locator('#mat-tab-label-0-0')).toContainText('ET1 Claim');

    await this.elements.et1Section2Link.click();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Section 2 - Employment and respondent details');
    await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Did the claimant work for the respondent the claim is being made against? (Optional)');
    await this.elements.didClaimantWorkForOrg.check();
    await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Is the claimant still working for the respondent the claim is being made against? (Optional)');
    await this.elements.claimantStillWorking.check();
    await this.clickContinue();


    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Claimant employment details');
    await this.elements.claimantJobTitle.fill('Developer');
    await this.elements.claimantStartDate.fill('1');
    await this.elements.claimantStartDateMonth.fill('2');
    await this.elements.claimantStartDateYear.fill('2022');
    await this.clickContinue();

    await expect(this.page.locator('#claimantStillWorkingNoticePeriod')).toContainText('Is there a notice period? (Optional)');
    await this.elements.claimantStillWorkingNoticePeriodMonths.check();
    await this.elements.claimantStillWorkingNoticePeriodMonthsText.fill('1');
    await this.clickContinue();

    await expect(this.page.locator('label')).toContainText('Enter average weekly hours (Optional)');
    await this.elements.claimantAverageWeeklyWorkHours.fill('40');
    await this.clickContinue();

    await this.page.locator('#claimantPayBeforeTax').fill('44000');
    await this.page.locator('#claimantPayType-Weekly').check();
    await this.clickContinue();

    await this.page.locator('#claimantPensionContribution-Yes').check();
    await this.page.locator('#claimantWeeklyPension').fill( '20');
    await this.page.locator('#claimantEmployeeBenefits-Yes').check();
    await this.page.locator('#claimantBenefits').fill('child benefit');
    await this.clickContinue();


    await this.page.locator('#respondentType-Individual').check();
    await this.page.locator('#respondentFirstName').fill( 'Mark');
    await this.page.locator('#respondentLastName').fill( 'McDonald');
    await this.clickContinue();


    await postcodeHelper.enterRespPostcode('LS121AA', ' 6 Whitehall Place, Leeds ');

    await this.page.locator('#didClaimantWorkAtSameAddress_Yes').check();
    await this.clickContinue();

    await this.page.locator('#respondentAcasYesNo-Yes').check();
    await this.page.locator('#respondentAcasNumber').fill('R872259/22/64');
    await this.clickContinue();

    await this.page.locator('#addAdditionalRespondent_No').check();
    await this.clickContinue();

    await expect(this.page.locator('form')).toContainText('Check your answers');
    await expect(this.page.locator('form')).toContainText('Did the claimant work for the respondent?');
    await expect(this.page.locator('form')).toContainText('Did the claimant work at this address?');
    await this.saveAsDraft();

    await expect(this.page.locator('#confirmation-body')).toContainText('Your answers have been saved.');
    await this.closeAndReturn();
  }
  //
  // async et1Section3(){
  //   I.waitForText('ET1 Claim', 15);
  //   I.see('Steps to making a claim');
  //   I.click(this.et1Section3Link);
  //
  //   I.waitForText('You’ll need to provide details of the claim. This can be uploaded in a document.');
  //   I.click('Continue');
  //
  //   I.waitForText('Enter details of the claim', 10);
  //   I.fillField('#et1SectionThreeClaimDetails', 'No supplemetary Details');
  //   I.click('Continue');
  //
  //   I.waitForText('What type of claim is this?');
  //   I.checkOption('#et1SectionThreeTypeOfClaim-discrimination');
  //   I.waitForText('What type of discrimination are you claiming?');
  //   I.checkOption('#discriminationTypesOfClaim-Age');
  //   I.click('Continue');
  //
  //   I.waitForText('What does the claimant want if their claim is successful?');
  //   I.checkOption('#claimSuccessful-compensation');
  //   I.fillField('#compensationDetails', 'Compensation £40,000');
  //   I.click('Continue');
  //
  //   I.waitForText('Linked cases');
  //   I.checkOption('#linkedCasesYesNo-No');
  //   I.click('Continue');
  //
  //   I.waitForText('Check your answers');
  //   I.see('What type of claim is this?');
  //   I.see('What type of discrimination are you claiming?');
  //   I.see('What compensation is the claimant seeking?');
  //   I.click('Save as draft');
  //   I.waitForText('Your answers have been saved.');
  //
  //   I.click('Close and Return to case details');
  // },
  //
  // async et1SubmitClaim(){
  //   I.waitForText('ET1 Claim', 15);
  //   I.see('Steps to making a claim');
  //   I.click(this.submitClaimLink);
  //   I.wait(10);
  //
  //   I.waitForText('Do you want to submit this ET1 claim?');
  //   I.checkOption('#submitEt1Confirmation-Yes');
  //   I.click('Submit');
  //
  //   I.waitForText('You have submitted the ET1 claim');
  //   I.see('You have submitted the ET1 claim');
  //   I.click('Close and Return to case details');
  //   I.wait(10);
  //
  //   I.seeElement(this.caseDetailsTab);
  //   I.see('Submission Reference');
  //
  //   const submissionRef = (I.grabTextFrom('//*[@id="case-viewer-field-read--feeGroupReference"]'));
  //   console.log(submissionRef);
  //   I.wait(5);
  //   return submissionRef;
  // }


}
