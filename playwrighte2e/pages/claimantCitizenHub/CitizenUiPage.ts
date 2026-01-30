import { expect} from "@playwright/test";
import { BasePage } from "../basePage.ts";


export default class CitizenUiPage extends BasePage{

  elements={
    workPostcode: this.page.locator('#workPostcode'),
    singleOrMultipleClaim:this.page.locator('#single-or-multiple-claim'),
    header1: this.page.locator('h1'),
    legend: this.page.locator('legend')
  };

  async processPreLoginPagesForTheDraftApplication(region: string) {
    await this.startDraftApplication();
    await this.processBeforeYourContinuePage();
    //await this.processWhatsThePostCodeYouHaveWorkedForPage(postcode);
    await this.processAreYouMakingTheClaimForYourselfPage();
    await this.processAreYouMakingTheClaimOnYourOwnPage();
    await this.processWhereYouCanMakeClaim(region);
    await this.processDoYouHaveAnACASEarlyConciliation();
    //await this.processWhatKindOfClaimAreYouMaking();
  }

  async startDraftApplication() {
    await this.webActions.verifyElementContainsText(this.elements.header1, 'Make a claim to an employment tribunal');
    await this.clickStartNow();
  }

  async processBeforeYourContinuePage() {
    await this.webActions.verifyElementContainsText(this.elements.header1, 'Before you continue');
    await this.clickContinue();
  }
  async processWhatsThePostCodeYouHaveWorkedForPage(postcode: string) {
    await expect(this.elements.header1).toContainText('What’s the postcode where you worked or work?');
    await this.elements.workPostcode.fill(postcode);
    await this.clickContinue();
  }

  async processWhereYouCanMakeClaim(region: string){
    await this.webActions.verifyElementContainsText(this.elements.header1, 'Where you can make your claim');
    await this.webActions.checkElementById(`//input[@value='ET_${region}']`);
    await this.clickContinue();
  }

  async processAreYouMakingTheClaimForYourselfPage() {
    await this.webActions.verifyElementContainsText(this.elements.legend, 'Are you making the claim for yourself, or representing someone else?');
    await this.webActions.checkElementById('#lip-or-representative');
    await this.clickContinue();
  }

  async processAreYouMakingTheClaimOnYourOwnPage() {
    await this.webActions.verifyElementContainsText(this.elements.header1, 'Claiming on your own or with others');
    await this.webActions.checkElementById('#single-or-multiple-claim');
    await this.clickContinue();
  }

  async processDoYouHaveAnACASEarlyConciliation() {
    await this.webActions.verifyElementContainsText(this.elements.legend, 'Do you have an ‘Acas early conciliation certificate’ for the respondent or respondents you\'re claiming against?');
    await this.webActions.checkElementById('#acas-multiple');
    await this.clickContinue();
  }

  async processWhatKindOfClaimAreYouMaking() {
    await this.webActions.verifyElementContainsText(this.elements.header1, 'What type of claim are you making?');

    await this.webActions.checkElementById('#discrimination');
    await this.webActions.checkElementById('#whistleBlowing');
    await this.clickContinue();
  }
}
