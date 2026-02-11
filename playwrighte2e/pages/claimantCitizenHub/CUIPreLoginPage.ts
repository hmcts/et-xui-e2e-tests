import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from "../basePage.ts";

export default class CUIPreLoginPage extends BasePage{

  private readonly syaLandingPageTitle: Locator;
  private readonly startNowButton: Locator;
  private readonly beforeYouContinueHeading: Locator;
  private readonly representingMyselfRadio: Locator;
  private readonly claimForSomeoneElseRadio: Locator;
  private readonly legalRepSingleClaimRadio: Locator;
  private readonly legalRepMultipleClaimRadio: Locator

  constructor(page: Page) {
    super(page);
    this.syaLandingPageTitle = this.page.getByRole('heading', {name: 'Make a claim to an employment tribunal'});
    this.startNowButton = this.page.locator(`xpath=//a[normalize-space()='Start now']`);
    this.beforeYouContinueHeading = this.page.getByRole('heading', {name: 'Before you continue'});
    this.representingMyselfRadio = this.page.locator('input[id=lip-or-representative]');
    this.claimForSomeoneElseRadio = this.page.locator('input[id=lip-or-representative-2]');
    this.legalRepSingleClaimRadio = this.page.locator('input[id=lip-or-representative-3]');
    this.legalRepMultipleClaimRadio = this.page.locator('input[id=lip-or-representative-4]');
  }

  async processPreLoginPagesForTheDraftApplication(region: string) {
    await this.startDraftApplication();
    await this.processBeforeYourContinuePage();
    await this.processAreYouMakingTheClaimForYourselfPage();
    await this.processAreYouMakingTheClaimOnYourOwnPage();
    await this.whereYouMakeTheClaimPage(region);
    await this.processDoYouHaveAnACASEarlyConciliation();
  }

  async startDraftApplication() {
    await this.page.waitForLoadState('load');
    await expect(this.syaLandingPageTitle).toBeVisible();
    await this.startNowButton.click();
  }

  async processBeforeYourContinuePage() {
    await this.page.waitForLoadState('load');
    await expect(this.beforeYouContinueHeading).toBeVisible();
    await this.clickContinue();
  }

  async selectWhoIsMakingTheClaim(option: string) {
    switch(option) {
      case 'representing myself':
        await this.representingMyselfRadio.click();
        break;
      case 'claim for someone else':
        await this.claimForSomeoneElseRadio.click();
        break;
      case 'legal representative making a single claim':
        await this.legalRepSingleClaimRadio.click();
        break;
      case 'legal representative making multiple claims':
        await this.legalRepMultipleClaimRadio.click();
        break;
       default:
         throw new Error(`Option ${option} not found for who is making the claim question`);
    }
  }

  async processAreYouMakingTheClaimForYourselfPage() {
    await this.page.waitForLoadState('load');
    await this.selectWhoIsMakingTheClaim('representing myself');
    await this.clickContinue();
  }

  async processAreYouMakingTheClaimOnYourOwnPage() {
    await this.page.waitForLoadState('load');
    await this.page.check('input[id=single-or-multiple-claim]');
    await this.clickContinue();
  }

  async whereYouMakeTheClaimPage(location: string = 'EnglandWales') {
    await this.page.waitForLoadState('load');
    switch (location) {
      case 'EnglandWales':
        await this.page.check('input[id=claim-jurisdiction]');
        break;
      case 'Scotland':
        await this.page.check('input[id=claim-jurisdiction-2]');
        break;
      default:
        throw new Error(`Location ${location} not recognized for where you want to make the claim`);
    }
    await this.clickContinue();
  }

  async processDoYouHaveAnACASEarlyConciliation() {
    await this.page.waitForSelector('#main-form', { timeout: 5000 });
    await this.page.check('input[id=acas-multiple]');
    await this.clickContinue();
  }
}
