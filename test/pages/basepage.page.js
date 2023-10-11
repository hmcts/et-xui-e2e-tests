const { I } = inject();

module.exports = {
  processPreLoginPagesForTheDraftApplication(postcode) {
    this.startDraftApplication();
    this.processBeforeYourContinuePage();
    this.processWhatsThePostCodeYouHaveWorkedForPage(postcode);
    this.processAreYouMakingTheClaimForYourselfPage();
    this.processAreYouMakingTheClaimOnYourOwnPage();
    this.processDoYouHaveAnACASEarlyConciliation();
    this.processWhatKindOfClaimAreYouMaking();
  },

  startDraftApplication() {
    //I.click('[class="govuk-button cookie-banner-reject-button"]');
    I.waitForText('Make a claim to an employment tribunal', 30);
    I.click('Start now');
  },

  processBeforeYourContinuePage() {
    I.waitForVisible('#main-content', 5);
    I.see('Before you continue');
    I.click('Continue');
  },

  processWhatsThePostCodeYouHaveWorkedForPage(postcode) {
    I.waitForVisible('#main-content', 5);
    I.see('What’s the postcode where');
    I.see('you worked or work?');
    I.fillField('#workPostcode', postcode);
    I.click('Continue');
  },

  processAreYouMakingTheClaimForYourselfPage() {
    I.waitForVisible('#main-form', 5);
    I.see('Are you making the claim for yourself, or');
    I.see('representing someone else?');
    I.checkOption('input[id=lip-or-representative]');
    I.click('Continue');
  },

  processAreYouMakingTheClaimOnYourOwnPage() {
    I.waitForVisible('#main-form', 5);
    I.see('Are you making a claim on your own or with');
    I.see('others?');
    I.checkOption('input[id=single-or-multiple-claim]');
    I.click('Continue');
  },

  processDoYouHaveAnACASEarlyConciliation() {
    I.waitForVisible('#main-form', 5);
    I.see('Do you have an ‘Acas early conciliation');
    I.see('certificate’ for the respondent or');
    I.see("respondents you're claiming against?");
    I.checkOption('input[id=acas-multiple]');
    I.click('Continue');
  },

  processWhatKindOfClaimAreYouMaking() {
    I.waitForVisible('#typeOfClaim-hint', 5);
    I.see('What type of claim are you making?');
    I.checkOption('input[value=discrimination]');
    I.checkOption('input[value=whistleBlowing]');
    I.click('Continue');
  },
};
