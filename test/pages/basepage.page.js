const { I } = inject();

module.exports = {
  async processPreLoginPagesForTheDraftApplication() {
    await this.startDraftApplication();
    await this.processBeforeYourContinuePage();
    await this.processWhatsThePostCodeYouHaveWorkedForPage();
    await this.processAreYouMakingTheClaimForYourselfPage();
    await this.processAreYouMakingTheClaimOnYourOwnPage();
    await this.processDoYouHaveAnACASEarlyConciliation();
    await this.processWhatKindOfClaimAreYouMaking();
  },

  async startDraftApplication() {
    I.see('Make a claim to an employment tribunal');
    await I.click('Start now');
  },

  async processBeforeYourContinuePage() {
    I.see('Before you continue');
    await I.click('Continue');
  },

  async processWhatsThePostCodeYouHaveWorkedForPage() {
    I.see('What’s the postcode where you worked or work?');
    await I.fillField('#workPostcode', 'LS9 6EP');
    await I.click('Continue');
  },

  async processAreYouMakingTheClaimForYourselfPage() {
    I.see('Are you making the claim for yourself, or representing someone else?');
    I.checkOption('input[id=lip-or-representative]');
    I.click('Continue');
  },

  async processAreYouMakingTheClaimOnYourOwnPage() {
    I.see('Are you making a claim on your own or with others?');
    I.checkOption('input[id=single-or-multiple-claim]');
    I.click('Continue');
  },

  async processDoYouHaveAnACASEarlyConciliation() {
    I.see('Do you have an ‘Acas early conciliation');
    I.see('certificate’ for the respondent or');
    I.see("respondents you're claiming against?");
    I.checkOption('input[id=acas-multiple]');
    I.click('Continue');
  },

  async processWhatKindOfClaimAreYouMaking() {
    I.see('What type of claim are you making?');
    I.checkOption('input[value=discrimination]');
    I.checkOption('input[value=whistleBlowing]');
    I.click('Continue');
  },
};
