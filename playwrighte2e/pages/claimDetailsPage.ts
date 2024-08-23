import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";


export default class ClaimDetailsPage extends BasePage{
  async processClaimDetails() {
    await this.clickClaimDetailsLink();
    await this.selectClaimTypeDiscrimination();
    await this.describeWhatHappened();
    await this.tellUsWhatYouWant();
    await this.compensation();
    await this.tribunalRecommendation();
    await this.whistleBlowingClaims();
    await this.claimDetailsCheck();
  }
  //clicks on the claim details link
  async clickClaimDetailsLink() {
    await this.page.locator('[href="/claim-type-discrimination?lng=en"]').click();
  }
  async selectClaimTypeDiscrimination() {
    await expect(this.page.locator('legend')).toContainText('What type of discrimination are you claiming?');
    await this.page.locator('#age').check();
    await this.page.locator('#disability').check();
    await this.saveAndContinueButton();
  }
  async describeWhatHappened() {
    await expect(this.page.locator('h1')).toContainText('Describe your claim');
    await this.page.locator('#claim-summary-text').fill( 'Discrimination, Dismissal and Pay Cut.');
    await this.saveAndContinueButton();
  }
  async tellUsWhatYouWant() {
    await expect(this.page.locator('legend')).toContainText('What do you want if your claim is successful? (optional)');
    await this.page.locator('#compensationOnly').check();
    await this.page.locator('#tribunalRecommendation').check();
    await this.page.locator('#oldJob').check();
    await this.saveAndContinueButton();
  }
  async compensation() {
    await expect(this.page.locator('#main-form')).toContainText('What compensation are you seeking? (optional)');
    await this.page.locator('#compensationOutcome').fill('Seeking months wage and job back');
    await this.page.locator('#compensation-amount').fill('2000');
    await this.saveAndContinueButton();
  }
  async tribunalRecommendation() {
    await expect(this.page.locator('label')).toContainText('What tribunal recommendation would you like to make? (optional)');
   await this.page.locator('#tribunalRecommendationRequest').fill( 'Get Job back and my boss to say sorry');
   await this.saveAndContinueButton();
  }
  async whistleBlowingClaims() {
    await expect(this.page.locator('h1')).toContainText('Whistleblowing claims (optional)');
    await this.page.locator('#whistleblowing-claim').check();
    await this.page.locator('#whistleblowing-entity-name').fill('Rupert Regulator');
    await this.saveAndContinueButton();
    await expect(this.page.locator('h1')).toContainText('Linked cases');

    // selecting no option for case link currently disable on exui
    await this.page.locator('#linkedCases').check();
    await this.saveAndContinueButton();
  }

  async claimDetailsCheck() {
    await expect(this.page.locator('h1')).toContainText('Have you completed this section?');
    await this.page.locator('#claim-details-check').check();
    await this.saveAndContinueButton();
  }
}
