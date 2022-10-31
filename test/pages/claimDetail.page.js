const { I } = inject();

module.exports = {
  async processClaimDetails() {
    await this.clickClaimDetailsLink();
    await this.selectClaimTypeDiscrimination();
    await this.describeWhatHappened();
    await this.tellUsWhatYouWant();
    await this.compensation();
    await this.tribunalRecommendation();
    await this.whistleBlowingClaims();
    await this.claimDetailsCheck();
  },
  //clicks on the claim details link
  async clickClaimDetailsLink() {
    await I.click('[href="/claim-type-discrimination"]');
    await I.see('What type of discrimination are you');
  },
  async selectClaimTypeDiscrimination() {
    await I.see('What type of discrimination are you');
    await I.checkOption('#age');
    await I.checkOption('#disability');
    await I.click('Save and continue');
  },
  async describeWhatHappened() {
    await I.see('Describe what happened to you');
    await I.fillField('#claim-summary-text', 'Discrimination, Dismissal and Pay Cut.');
    await I.click('Save and continue');
  },
  async tellUsWhatYouWant() {
    await I.see('What do you want if your claim is successful? (optional)');
    await I.checkOption('#compensationOnly');
    await I.checkOption('#tribunalRecommendation');
    await I.checkOption('#oldJob');
    await I.click('Save and continue');
  },
  async compensation() {
    await I.see('What compensation are you seeking? (optional)');
    await I.fillField('#compensationOutcome', 'Seeking months wage and job back');
    await I.fillField('#compensation-amount', '2000');
    await I.click('Save and continue');
  },
  async tribunalRecommendation() {
    await I.see('What tribunal recommendation would you like to make? (optional)');
    await I.fillField('#tribunalRecommendationRequest', 'Get Job back and my boss to say sorry');
    await I.click('Save and continue');
  },
  async whistleBlowingClaims() {
    await I.see('Whistleblowing claims (optional)');
    await I.checkOption('#whistleblowing-claim');
    await I.waitForElement('#whistleblowing-entity-name');
    await I.fillField('#whistleblowing-entity-name', 'Rupert Regulator');
    await I.click('Save and continue');
  },
  async claimDetailsCheck() {
    await I.see('Have you completed this section?');
    await I.checkOption('#claim-details-check');
    await I.click('Save and continue');
  },
};
