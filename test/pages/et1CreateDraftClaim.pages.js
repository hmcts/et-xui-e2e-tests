const { I } = inject();
const postcodeHelper = require('../helper/postcode.js');
const { helper } = require("codeceptjs");


module.exports = {

    et1Postcode:  "//input[@id='et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput']" ,
    et1Section1Link: '//a[contains(.,"ET1 Section 1")]',
    claimantFirstName: '#claimantFirstName',
    claimantLastname: '#claimantLastName',
    date: '#claimantDateOfBirth-day',
    month: '#claimantDateOfBirth-month',
    year:'#claimantDateOfBirth-year',
    et1Section2Link:'//a[contains(.,"ET1 Section 2")]',
    et1Section3Link:'//a[contains(.,"ET1 Section 3")]',
    submitClaimLink:'//a[contains(.,"Submit claim")]',
    caseDetailsTab:'#mat-tab-label-0-0',

  claimantWorkLocation() {
    I.waitForElement(this.et1Postcode, 10);
    //TODO: validate 2 links
    I.click(this.et1Postcode);
  },

  et1Section1(){
    I.waitForText('ET1 Claim', 15);
    I.see('Steps to making a claim');
    //TODO: validate 3 section link available/visible and not completed
    I.click(this.et1Section1Link);
    I.waitForText('Make a claim to an employment tribunal', 15);
    I.click('Continue');
    I.wait(10);

    I.waitForText('Claimant details');
    //TODO:can check names fields mandatory
    I.fillField(this.claimantFirstName, 'Jessamine');
    I.fillField(this.claimantLastname, 'Malcom');
    //TODO:Can add date validation
    I.fillField(this.date, '1');
    I.fillField(this.month, '11');
    I.fillField(this.year, '2000');
    I.click('Continue');

    I.waitForText('Select the claimant\'s sex', 10);
    I.checkOption('#claimantSex-Female');
    I.fillField('#claimantPreferredTitle', 'Miss');
    I.click('Continue');
    //can check fields are optional

    I.waitForText('Claimant contact address', 10);
    postcodeHelper.enterClaimantPostcode('LS121AA','The Deli, 1 Whitehall Place, Leeds');

    I.waitForText('Hearing format');
    I.checkOption('#representativeAttendHearing-Phone');
    I.checkOption('#hearingContactLanguage-English');
    I.checkOption('#claimantAttendHearing-Phone');
    I.checkOption('#claimantHearingContactLanguage-English');
    I.click('Continue');
    //TODO: can check questions are optional

    I.waitForText('Are there any support requirements', 10);
    I.checkOption('#claimantSupportQuestion-Yes');
    I.fillField('#claimantSupportQuestionReason', 'disability access');
    I.click('Continue');

    I.waitForText('Your information (as the representative)', 10);
    I.checkOption('#representativeContactPreference-Email');
    I.checkOption('#contactLanguageQuestion-English');
    I.fillField('#representativePhoneNumber', '01234567890');
    I.fillField('#representativeReferenceNumber', 'reference no: 1');
    I.click('Continue');

    // ET1 section 1- CYA page
    I.waitForText('Claimant\'s First Name', 10);
    I.see('Claimant\'s Last Name');
    I.see('Which types of hearing can you, as the representative, attend?');
    I.see('If a hearing is required, what language do you, as the representative, want to speak at a hearing?');
    I.see('Which types of hearing can the claimant attend?');
    I.see('Give details of the support required');
    I.see('How would you prefer to be contacted?');
    I.see('What is you contact phone number?');
    I.see('What is your representative reference number?');
    I.click('Save as draft');
    I.waitForText('Your answers have been saved.');

    I.click('Close and Return to case details');
    //TODO:can validate completed and date for section
  },

  et1Section2(){
    I.waitForText('ET1 Claim', 15);
    I.see('Steps to making a claim');
    I.click(this.et1Section2Link);

    I.waitForText('employment status');
    I.click('Continue');

    I.waitForText('Did the claimant work for the respondent?', 10);
    I.checkOption('#didClaimantWorkForOrg-Yes');
    I.click('Continue');

    I.waitForText('Is the claimant still working for the respondent?', 10);
    I.checkOption('#claimantStillWorking-Working');
    I.click('Continue');

    I.waitForText('Claimant employment details', 10);
    I.fillField('#claimantJobTitle', 'Developer');
    I.fillField('#claimantStartDate-day','1');
    I.fillField('#claimantStartDate-month','2');
    I.fillField('#claimantStartDate-year', '2022');
    I.click('Continue');

    I.waitForText('Is there a notice period?', 10);
    I.checkOption('#claimantStillWorkingNoticePeriod-Months');
    I.fillField('#claimantStillWorkingNoticePeriodMonths', '1');
    I.click('Continue');

    I.waitForText('Average weekly work hours', 10);
    I.fillField('#claimantAverageWeeklyWorkHours', '40');
    I.click('Continue');

    I.waitForText('Pay details', 10);
    I.fillField('#claimantPayBeforeTax', '44000');
    I.fillField('#claimantPayAfterTax', '40000');
    I.checkOption('#claimantPayType-Weekly');
    I.click('Continue');

    I.waitForText('Pensions and benefits', 10);
    I.checkOption('#claimantPensionContribution-Yes');
    I.fillField('#claimantWeeklyPension', '20');
    I.checkOption('#claimantEmployeeBenefits-Yes');
    I.fillField('#claimantBenefits', 'child benefit');
    I.click('Continue');

    I.waitForText('Respondent Name', 10);
    I.checkOption('#respondentType-Individual');
    I.fillField('#respondentFirstName', 'Mark');
    I.fillField('#respondentLastName', 'McDonald');
    I.click('Continue');

    I.waitForText('Respondent address', 10);
    postcodeHelper.enterRespPostcode('LS121AA', ' 6 Whitehall Place, Leeds ');

    I.waitForText('Claimant work address', 10);
    I.checkOption('#didClaimantWorkAtSameAddress_Yes');
    I.click('Continue');

    I.waitForText('Acas certificate for the respondent', 10);
    I.checkOption('#respondentAcasYesNo-Yes');
    I.fillField('#respondentAcasNumber','R872259/22/64');
    I.click('Continue');

    I.waitForText('Respondent added:', 10);
    I.checkOption('#addAdditionalRespondent_No');
    I.click('Continue');

    I.waitForText('Check your answers', 10);
    I.see('Did the claimant work for the respondent?');
    I.see('Enter job title');
    I.see('Did the claimant work at this address?');
    I.see('Enter the Acas number');
    I.click('Save as draft');
    I.waitForText('Your answers have been saved.');

    I.click('Close and Return to case details');
  },

   et1Section3(){
    I.waitForText('ET1 Claim', 15);
    I.see('Steps to making a claim');
    I.click(this.et1Section3Link);

    I.waitForText('You’ll need to provide details of the claim. This can be uploaded in a document.');
    I.click('Continue');

    I.waitForText('Enter details of the claim', 10);
    I.fillField('#et1SectionThreeClaimDetails', 'No supplemetary Details');
    I.click('Continue');

    I.waitForText('What type of claim is this?');
    I.checkOption('#et1SectionThreeTypeOfClaim-discrimination');
    I.waitForText('What type of discrimination are you claiming?');
    I.checkOption('#discriminationTypesOfClaim-Age');
    I.click('Continue');

    I.waitForText('What does the claimant want if their claim is successful?');
    I.checkOption('#claimSuccessful-compensation');
    I.fillField('#compensationDetails', 'Compensation £40,000');
    I.click('Continue');

    I.waitForText('Linked cases');
    I.checkOption('#linkedCasesYesNo-No');
    I.click('Continue');

    I.waitForText('Check your answers');
    I.see('What type of claim is this?');
    I.see('What type of discrimination are you claiming?');
    I.see('What compensation is the claimant seeking?');
    I.click('Save as draft');
    I.waitForText('Your answers have been saved.');

    I.click('Close and Return to case details');
  },

  et1SubmitClaim(){
      //TODO:can validate sections are completed
    I.waitForText('ET1 Claim', 15);
    I.see('Steps to making a claim');
    I.click(this.submitClaimLink);

    I.waitForText('Do you want to submit this ET1 claim?');
    I.checkOption('#submitEt1Confirmation-Yes');
    I.click('Submit');

    I.waitForText('You have submitted the ET1 claim');
    I.see('You have submitted the ET1 claim');
    I.click('Close and Return to case details');
    I.wait(10);

    I.seeElement(this.caseDetailsTab);
    I.see('Submission Reference');
  }

};
