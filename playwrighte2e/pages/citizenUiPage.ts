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
    header1: this.page.locator('h1'),
    jurisdiction:this.page.locator('#claim-jurisdiction')
  };

  async processWhereYouCanMakeClaim(){
    await expect(this.elements.header1).toContainText('Where you can make your claim');
    await this.elements.jurisdiction.check('England and Wales');
    await this.clickContinue();
  }

  async processPreLoginPagesForTheDraftApplication(postcode: string) {
    await this.startDraftApplication();
    await this.processBeforeYourContinuePage();
    await this.processWhatsThePostCodeYouHaveWorkedForPage(postcode);
    await this.processAreYouMakingTheClaimForYourselfPage();
    await this.processAreYouMakingTheClaimOnYourOwnPage();
    await this.processDoYouHaveAnACASEarlyConciliation();
    await this.processWhatKindOfClaimAreYouMaking();
  }

  async startDraftApplication() {
    await this.page.waitForSelector('text=Make a claim to an employment tribunal', { timeout: 30000 });
    await this.page.click('text=Start now');
  }

  async processBeforeYourContinuePage() {
    await this.page.waitForSelector('#main-content', { timeout: 5000 });
    await this.page.click('text=Continue');
  }

    async processWhatsThePostCodeYouHaveWorkedForPage(postcode: string) {
    await this.page.waitForSelector('#main-content', { timeout: 5000 });
    await this.page.fill('#workPostcode', postcode);
    await this.page.click('text=Continue');
    }

    async processAreYouMakingTheClaimForYourselfPage() {
    await this.page.waitForSelector('#main-form', { timeout: 5000 });
    await this.page.check('input[id=lip-or-representative]');
    await this.page.click('text=Continue');
    }

    async processAreYouMakingTheClaimOnYourOwnPage() {
    await this.page.waitForSelector('#main-form', { timeout: 5000 });
    await this.page.check('input[id=single-or-multiple-claim]');
    await this.page.click('text=Continue');
    }

    async processDoYouHaveAnACASEarlyConciliation() {
    await this.page.waitForSelector('#main-form', { timeout: 5000 });
    await this.page.check('input[id=acas-multiple]');
    await this.page.click('text=Continue');
    }

    async processWhatKindOfClaimAreYouMaking() {
    await this.page.waitForSelector('#typeOfClaim-hint', { timeout: 5000 });
    await this.page.check('input[value=discrimination]');
    await this.page.check('input[value=whistleBlowing]');
    await this.page.click('text=Continue');
    }
}
