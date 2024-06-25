const { I } = inject();
const Continue = 'Continue';
//const et1CaseVetting = 'ET1 case vetting';

module.exports = {
  locators: {
    //ET1 Vetting Pages...
    can_we_serve_claim_yes_option: { xpath: "//input[@id='et1VettingCanServeClaimYesOrNo_Yes']" },
    is_there_an_acas_certificate_yes_option: { xpath: "//input[@id='et1VettingAcasCertIsYesOrNo1_Yes']" },
    are_these_codes_correct_yes_option: { xpath: "//input[@id='areTheseCodesCorrect_Yes']" },
    is_track_allocation_correct_yes_option: { css: '#isTrackAllocationCorrect-Yes'},
    is_location_correct_yes_option: { xpath: "//input[@id='isLocationCorrect-Yes']" },
    do_you_want_to_suggest_a_hearing_venue_yes_option: { xpath: "//input[@id='et1SuggestHearingVenue_Yes']" },
    do_you_want_to_suggest_a_hearing_venue_no_option: { xpath: "//input[@id='et1SuggestHearingVenue_No']" },
    hearing_venues_options: { xpath: "//select[@id='et1HearingVenues']" },
    is_the_respondent_a_major_government_agency_no_option: { xpath: "//input[@id='et1GovOrMajorQuestion_No']" },
    reasonable_adjustment_questions_no_option: { xpath: "//input[@id='et1ReasonableAdjustmentsQuestion_No']" },
    can_claimant_attend_a_video_hearing_yes_option: { xpath: "//input[@id='et1VideoHearingQuestion_Yes']" },
    suggest_hearing_venue_yes_option: { xpath: "//input[@id='et1SuggestHearingVenue_Yes']" },
  },

  processET1CaseVettingPages() {
    this.processBeforeYourStartPage();
    this.processMinimumRequiredInformationPage();
    this.processACASCertificatePage();
    this.processPossibleSubstantiveDefectsPage();
    this.processJurisdictionCodePage();
    this.processTrackAllocationPage();
    this.processTribunalLocationPage();
    this.processListingDetailsPage();
    this.processFurtherQuestionsPage();
    this.processPossibleReferralToACaseOfficerPage();
    this.processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage();
    this.processOtherFactorsPage();
    this.processFinalNotesPage();
    this.processCheckYourAnswersPage();
    this.processET1CaseVettingPage();
    I.wait(15);
  },


  processBeforeYourStartPage() {
    I.waitForText('Before you start', 10);
    I.click(Continue);
  },

  processMinimumRequiredInformationPage() {
    I.waitForText('Minimum required information', 10);
    I.checkOption(this.locators.can_we_serve_claim_yes_option);
    I.click(Continue);
  },

  processACASCertificatePage() {
    I.waitForElement(this.locators.is_there_an_acas_certificate_yes_option, 10);
    I.checkOption(this.locators.is_there_an_acas_certificate_yes_option);
    I.click(Continue);
  },

  processPossibleSubstantiveDefectsPage() {
    I.waitForText('Possible substantive defects (Optional)', 10);
    I.click(Continue);
  },

  processJurisdictionCodePage() {
    I.waitForText('Jurisdiction Codes', 5);
    I.checkOption(this.locators.are_these_codes_correct_yes_option);
    I.click(Continue);
  },

  processTrackAllocationPage() {
    I.waitForText('Track allocation', 5);
    I.checkOption(this.locators.is_track_allocation_correct_yes_option);
    I.click(Continue);
  },

  processTribunalLocationPage() {
    I.waitForText('Tribunal location', 5);
    I.checkOption(this.locators.is_location_correct_yes_option);
    I.click(Continue);
  },

  processListingDetailsPage(caseNumber) {
    I.waitForText('Listing details', 5);
    I.checkOption(this.locators.do_you_want_to_suggest_a_hearing_venue_no_option);
    //I.selectOption(this.locators.hearing_venues_options, '5: Leeds');
    I.click(Continue);
  },

  processFurtherQuestionsPage(caseNumber) {
    I.waitForText('Further questions', 5);
    I.checkOption(this.locators.is_the_respondent_a_major_government_agency_no_option);
    I.checkOption(this.locators.reasonable_adjustment_questions_no_option);
    I.checkOption(this.locators.can_claimant_attend_a_video_hearing_yes_option);
    I.click(Continue);
  },

  processPossibleReferralToACaseOfficerPage() {
    I.waitForText('Possible referral to a judge or legal officer', 5);
    I.click(Continue);
  },

  processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage(caseNumber) {
    I.waitForText('Possible referral to Regional Employment Judge or Vice-President', 5);
    I.click(Continue);
  },

  processOtherFactorsPage() {
    I.waitForText('Other factors', 5);
    I.click(Continue);
  },

  processFinalNotesPage() {
    I.waitForText('Final notes', 5);
    I.click(Continue);
  },

  processCheckYourAnswersPage() {
    I.waitForText('Check your answers', 5);
    I.see('Check the information below carefully.');
    I.click('Submit');
  },

  processET1CaseVettingPage() {
    I.waitForText('Do this next', 15);
    I.see('You must accept or reject the case or refer the case.');
    I.click('[data-ng-click="submit()"]');
  },
};
