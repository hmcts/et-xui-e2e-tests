
import { Page, expect, Locator } from "@playwright/test";

export abstract class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAsDraftButton:Locator;
  readonly closeAndReturnButton:Locator;
  readonly submit:Locator;
  readonly postcode:Locator;
  readonly findAddress: Locator;
  readonly signout:Locator;
  readonly startNow:Locator;
  readonly saveAndContinue:Locator;
  readonly nextButton:Locator;
  readonly addNewButton:Locator;


  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
    this.closeAndReturnButton = this.page.getByRole('button', { name: 'Close and Return to case' });
    this.submit = this.page.getByRole('button', { name: 'Submit' });
    this.postcode = page.getByRole('textbox', { name: 'Enter a UK postcode' });
    this.findAddress = page.getByRole('button', { name: 'Find address' });
    this.signout = page.getByText('Sign out');
    this.startNow = page.getByRole('button', { name: 'Start now' });
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
   this.addNewButton = page.getByRole('button', { name: 'Add new' });

  }

  async wait(time: number) {
    await this.page.waitForTimeout(time)
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async saveAsDraft() {
    await this.saveAsDraftButton.click();
  }

  async closeAndReturn() {
    await this.closeAndReturnButton.click();
  }

  async submitButton(){
    await this.submit.click();
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async clickNextButton(){
    await this.nextButton.click();
  }

  async enterPostCode(postcode){
    await this.postcode.fill(postcode);
    await this.wait(3000);
    await this.findAddress.click();
    await this.wait(3000);
    await this.page.getByLabel('Select an address').selectOption('1: Object');
  }

  async signoutButton(){
    await this.signout.click();
  }

  async clickStartNow(){
    await this.startNow.click();
  }

  async saveAndContinueButton(){
    await this.saveAndContinue.click();
  }

  async addNewButtonClick(){
    await this.addNewButton.click;
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
