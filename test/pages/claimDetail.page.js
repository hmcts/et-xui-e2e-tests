const { I } = inject();

module.exports = {
  processClaimDetails() {
    this.clickClaimDetailsLink();
    this.selectClaimTypeDiscrimination();
    this.describeWhatHappened();
    this.tellUsWhatYouWant();
    this.compensation();
    this.tribunalRecommendation();
    this.whistleBlowingClaims();
    this.claimDetailsCheck();
  },
  //clicks on the claim details link
  clickClaimDetailsLink() {
    I.click('[href="/claim-type-discrimination"]');
    I.see('What type of discrimination are you');
  },
  selectClaimTypeDiscrimination() {
    I.see('What type of discrimination are you');
    I.checkOption('#age');
    I.checkOption('#disability');
    I.click('Save and continue');
  },
  describeWhatHappened() {
    I.see('Describe what happened to you');
    I.fillField('#claim-summary-text', 'Discrimination, Dismissal and Pay Cut.');
    I.click('Save and continue');
  },
  tellUsWhatYouWant() {
    I.see('What do you want if your claim is successful? (optional)');
    I.checkOption('#compensationOnly');
    I.checkOption('#tribunalRecommendation');
    I.checkOption('#oldJob');
    I.click('Save and continue');
  },
  compensation() {
    I.see('What compensation are you seeking? (optional)');
    I.fillField('#compensationOutcome', 'Seeking months wage and job back');
    I.fillField('#compensation-amount', '2000');
    I.click('Save and continue');
  },
  tribunalRecommendation() {
    I.see('What tribunal recommendation would you like to make? (optional)');
    I.fillField('#tribunalRecommendationRequest', 'Get Job back and my boss to say sorry');
    I.click('Save and continue');
  },
  whistleBlowingClaims() {
    I.see('Whistleblowing claims (optional)');
    I.checkOption('#whistleblowing-claim');
    I.waitForElement('#whistleblowing-entity-name');
    I.fillField('#whistleblowing-entity-name', 'Rupert Regulator');
    I.click('Save and continue');
  },

  claimDetailsCheck() {
    I.see('Have you completed this section?');
    I.checkOption('#claim-details-check');
    I.click('Save and continue');
  },
};
