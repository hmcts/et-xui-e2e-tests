import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export default class CitizenUiPage extends BasePage{

  elements={
    workPostcode: this.page.locator('#workPostcode'),
    selfClaim:this.page.locator('#lip-or-representative'),
    singleOrMultipleClaim:this.page.locator('#single-or-multiple-claim'),
    acasMultiple:this.page.locator('#acas-multiple'),
    discriminationCheckBox: this.page.locator('#discrimination'),
    whistleBlowingCheckBox: this.page.locator('#whistleBlowing'),
    header1: this.page.locator('h1')
  };

  async processPreLoginPagesForTheDraftApplication(region) {
    await this.startDraftApplication();
    await this.processBeforeYourContinuePage();
    //await this.processWhatsThePostCodeYouHaveWorkedForPage(postcode);
    await this.processAreYouMakingTheClaimForYourselfPage();
    await this.processAreYouMakingTheClaimOnYourOwnPage();
    await this.processWhereYouCanMakeClaim(region);
    await this.processDoYouHaveAnACASEarlyConciliation();
    await this.processWhatKindOfClaimAreYouMaking();
  }

  async startDraftApplication() {
    await expect(this.elements.header1).toContainText('Make a claim to an employment tribunal');
    await this.clickStartNow();
  }

  async processBeforeYourContinuePage() {
    await expect(this.elements.header1).toContainText('Before you continue');
    await this.clickContinue();
  }
  async processWhatsThePostCodeYouHaveWorkedForPage(postcode) {
    await expect(this.elements.header1).toContainText('What’s the postcode where you worked or work?');
    await this.elements.workPostcode.fill(postcode);
    await this.clickContinue();
  }

  async processWhereYouCanMakeClaim(region){
    await expect(this.elements.header1).toContainText('Where you can make your claim');
    await this.page.locator(`//input[@value='ET_${region}']`).check();
    await this.clickContinue();
  }

  async processAreYouMakingTheClaimForYourselfPage() {
    await expect(this.page.locator('legend')).toContainText('Are you making the claim for yourself, or representing someone else?');
    await this.elements.selfClaim.check();
    await this.clickContinue();
  }

  async processAreYouMakingTheClaimOnYourOwnPage() {
    await expect(this.elements.header1).toContainText('Claiming on your own or with others');
    await this.elements.singleOrMultipleClaim.check();
    await this.clickContinue();
  }

  async processDoYouHaveAnACASEarlyConciliation() {
   await expect(this.page.locator('legend')).toContainText('Do you have an ‘Acas early conciliation certificate’ for the respondent or respondents you\'re claiming against?');
    await this.elements.acasMultiple.check();
    await this.clickContinue();
  }

  async processWhatKindOfClaimAreYouMaking() {
    await expect(this.elements.header1).toContainText('What type of claim are you making?');
    await this.elements.discriminationCheckBox.check();
    await this.elements.whistleBlowingCheckBox.check();
    await this.clickContinue();
  }
}
