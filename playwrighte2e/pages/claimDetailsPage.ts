import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";


export default class ClaimDetailsPage extends BasePage{
  async processClaimDetails() {
    await this.clickClaimDetailsLink();
    await this.whatTypeOfClaim();
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
    await expect(this.page.locator('ol')).toContainText('Tell us about your claim');
    await this.webActions.clickElementByText('Tell us about your claim');
  }

  async whatTypeOfClaim(){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'What type of claim are you making?');
    await this.webActions.checkElementById('#discrimination');
    await this.webActions.checkElementById('#whistleBlowing');
    await this.clickContinue();
  }
  async selectClaimTypeDiscrimination() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'What type of discrimination are you claiming?');
    await this.webActions.checkElementById('#age');
    await this.webActions.checkElementById('#disability');

    await this.saveAndContinueButton();
  }
  async describeWhatHappened() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Describe your claim');
    await this.webActions.fillField('#claim-summary-text', 'Discrimination, Dismissal and Pay Cut.');

    await this.saveAndContinueButton();
  }
  async tellUsWhatYouWant() {
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'What do you want if your claim is successful? (optional)');
    await this.webActions.checkElementById('#compensationOnly');
    await this.webActions.checkElementById('#tribunalRecommendation');
    await this.webActions.checkElementById('#oldJob');
    await this.saveAndContinueButton();
  }
  async compensation() {
    await this.webActions.verifyElementContainsText(this.page.locator('#main-form'), 'What compensation are you seeking? (optional)');
    await this.webActions.fillField('#compensationOutcome', 'Seeking months wage and job back');
    await this.webActions.fillField('#compensation-amount', '2000');

    await this.saveAndContinueButton();
  }
  async tribunalRecommendation() {
    await this.webActions.verifyElementContainsText(this.page.locator('label'), 'What tribunal recommendation would you like to make? (optional)');
    await this.webActions.fillField('#tribunalRecommendationRequest', 'Get Job back and my boss to say sorry');

    await this.saveAndContinueButton();
  }
  async whistleBlowingClaims() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Whistleblowing claims (optional)');
    await this.webActions.checkElementById('#whistleblowing-claim');
    await this.webActions.fillField('#whistleblowing-entity-name', 'Rupert Regulator');

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Linked cases');
    await this.webActions.checkElementById('#linkedCases');
    await this.saveAndContinueButton();
  }

  async claimDetailsCheck() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Have you completed this section?');
    await this.webActions.checkElementById('#claim-details-check');
    await this.saveAndContinueButton();
  }
}
