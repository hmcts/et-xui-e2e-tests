const { I } = inject();

module.exports = {
  processPreLoginPagesForTheDraftApplication() {
    this.startDraftApplication();
    this.processBeforeYourContinuePage();
    this.processWhatsThePostCodeYouHaveWorkedForPage();
    this.processAreYouMakingTheClaimForYourselfPage();
    this.processAreYouMakingTheClaimOnYourOwnPage();
    this.processDoYouHaveAnACASEarlyConciliation();
    this.processWhatKindOfClaimAreYouMaking();
  },

  startDraftApplication() {
    I.amOnPage('/');
    I.waitForText('Make a claim to an employment tribunal', 30);
    I.click('Start now');
  },

  processBeforeYourContinuePage() {
    I.waitForText('Before you continue', 30);
    I.click('Continue');
  },

  processWhatsThePostCodeYouHaveWorkedForPage() {
    I.waitForText('What’s the postcode where', 15);
    I.see('you worked or work?');
    I.fillField('#workPostcode', 'LS9 6EP');
    I.click('Continue');
  },

  processAreYouMakingTheClaimForYourselfPage() {
    I.waitForText('Are you making the claim for yourself, or');
    I.see('representing someone else?');
    I.checkOption('input[id=lip-or-representative]');
    I.click('Continue');
  },

  processAreYouMakingTheClaimOnYourOwnPage() {
    I.waitForText('Are you making a claim on your own or with', 30);
    I.see('others?');
    I.checkOption('input[id=single-or-multiple-claim]');
    I.click('Continue');
  },

  processDoYouHaveAnACASEarlyConciliation() {
    I.waitForText('Do you have an ‘Acas early conciliation', 30);
    I.see('certificate’ for the respondent or');
    I.see("respondents you're claiming against?");
    I.checkOption('input[id=acas-multiple]');
    I.click('Continue');
  },

  processWhatKindOfClaimAreYouMaking() {
    I.waitForElement('.govuk-fieldset__legend', 10);
    I.waitForText('What type of claim are you making?', 30);
    I.checkOption('input[value=discrimination]');
    I.checkOption('input[value=whistleBlowing]');
    I.click('Continue');
  },
};
