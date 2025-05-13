import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class Et1CreateDraftClaim extends BasePage{

elements = {

  et1Postcode:  this.page.locator("//input[@id='et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput']"),
  et1Section1Link: this.page.locator('//a[contains(.,"ET1 Section 1 - Claimant details")]'),
  claimantFirstName: this.page.locator('#claimantFirstName'),
  claimantLastname: this.page.locator('#claimantLastName'),
  date: this.page.locator('#claimantDateOfBirth-day'),
  month: this.page.locator('#claimantDateOfBirth-month'),
  year:this.page.locator('#claimantDateOfBirth-year'),
  et1Section2Link:this.page.locator('//a[contains(.,"ET1 Section 2 - Employment & respondent details")]'),
  et1Section3Link:this.page.locator('//a[contains(.,"ET1 Section 3 - Details of the claim")]'),
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
  claimantStartDateMonth:this.page.locator('#claimantStartDate-month'),
  claimantStartDateYear:this.page.locator('#claimantStartDate-year'),
  claimantStillWorkingNoticePeriodMonths:this.page.locator('#claimantStillWorkingNoticePeriod-Months'),
  claimantStillWorkingNoticePeriodMonthsText:this.page.locator('#claimantStillWorkingNoticePeriodMonths'),
  claimantAverageWeeklyWorkHours:this.page.locator('#claimantAverageWeeklyWorkHours'),
};
 async claimantWorkLocation() {
    await this.elements.et1Postcode.click();
  }


  async et1Section1(claimantsFirstName,claimantLastname ){
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 1 - Claimant details');
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 2 - Employment & respondent details');
    await expect(this.page.getByLabel('case viewer table').getByRole('table')).toContainText('ET1 Section 3 - Details of the claim');
    await expect(this.page.getByText('ET1 Claim', { exact: true })).toBeVisible();

    await this.elements.et1Section1Link.click();
    await this.delay(2000);
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Make a claim to an employment tribunal');
    await this.clickContinue();

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Claimant details');
    await this.elements.claimantFirstName.fill(claimantsFirstName);
    await this.elements.claimantLastname.fill(claimantLastname);
    await this.elements.date.fill('1');
    await this.elements.month.fill('11');
    await this.elements.year.fill('2000');
    await this.clickContinue();

    await expect(this.page.locator('#claimantSex')).toContainText('Select the claimant\'s sex (Optional)');


    await this.page.getByLabel('Female').check();
    await this.page.getByLabel('What is the claimant’s').click();
    await this.page.getByLabel('What is the claimant’s').fill('miss');
    await this.clickContinue();
    //can check fields are optional

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Claimant contact address');
    await this.enterPostCode('LS121AA');
    await this.clickContinue();


    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Hearing format');
    await this.elements.representativeAttendHearing.check();
    await this.elements.hearingContactLanguage.check();
    await this.elements.claimantAttendHearing.check();
    await this.elements.claimantHearingContactLanguage.check();
    await this.clickContinue();


    await this.elements.claimantSupportQuestion.check();
    await this.page.locator('#claimantSupportQuestionReason').fill('disability access');
    await this.clickContinue();

    //await expect(this.page.locator('ccd-case-edit-page')).toContainText('Your information (as the representative)');
    await this.elements.representativeContactPreference.isVisible();
    await this.elements.representativeContactPreference.check();
    await this.elements.contactLanguageQuestion.check();
    await this.elements.representativePhoneNumber.fill('01234567890');
    await this.elements.representativeReferenceNumber.fill('reference no: 1');
    await this.clickContinue();


    // ET1 section 1- CYA page
    await this.page.locator('form').isVisible();
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
    await this.delay(2000);
  }

  async et1Section2(respondentFirstName,respondentLastName){
    await expect(this.page.getByText('ET1 Claim', { exact: true })).toBeVisible();

    await this.elements.et1Section2Link.click();

    //await expect(this.page.getByRole('term')).toContainText('employment status');
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
    await this.page.locator('#respondentFirstName').fill( respondentFirstName);
    await this.page.locator('#respondentLastName').fill( respondentLastName);
    await this.clickContinue();


    await this.enterPostCode('LS121AA');
    await this.clickContinue();

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
    await this.delay(2000);
  }

  async et1Section3(){
    await expect(this.page.getByText('ET1 Claim', { exact: true })).toBeVisible();
    await this.elements.et1Section3Link.click();
    await this.clickContinue();

    await this.page.locator('#et1SectionThreeClaimDetails').fill( 'No supplemetary Details');
    await this.clickContinue();

    await this.page.locator('#et1SectionThreeTypeOfClaim-discrimination').check();
    await this.page.locator('#discriminationTypesOfClaim-Age').check();
    await this.clickContinue();

    await this.page.locator('#claimSuccessful-compensation').check();
    await this.page.locator('#compensationDetails').fill( 'Compensation £40,000');
    await this.clickContinue();

    await this.page.locator('#linkedCasesYesNo-No').check();
    await this.clickContinue();

    await expect(this.page.locator('form')).toContainText('Check your answers');
    await expect(this.page.locator('form')).toContainText('What type of claim is this?');
    await expect(this.page.locator('form')).toContainText('What type of discrimination are you claiming?');
    await expect(this.page.locator('form')).toContainText('What compensation is the claimant seeking?');
    await this.saveAsDraft();

    await expect(this.page.locator('#confirmation-body')).toContainText('Your answers have been saved.');
    await this.closeAndReturn();
    await this.delay(2000);
  }

  async et1SubmitClaim(){
    await expect(this.page.getByText('ET1 Claim', { exact: true })).toBeVisible();
    await this.elements.submitClaimLink.click();
    await this.delay(2000);

    await this.page.locator('#submitEt1Confirmation-Yes').check();
    await this.submitButton();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have submitted the ET1 claim');
    await this.closeAndReturn();

    await this.elements.caseDetailsTab.isVisible();
    const submissionRef =await this.page.locator('//*[@id="case-viewer-field-read--feeGroupReference"]').innerText();
    return submissionRef;
  }


}
