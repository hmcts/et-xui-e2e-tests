import { BasePage } from "../basePage.ts";
import { expect, Locator, Page } from '@playwright/test';
import CitizenHubPage from './CitizenHubPage.ts';
import { th } from '@faker-js/faker';

export default class SingleOrMultipleClaimPage extends CitizenHubPage{

  private readonly singleOrMultipleClaim: Locator;
  private readonly claimingWithOtherPersonRadio: Locator;
  private readonly addAnotherClaimantToYourGroupClaimLink: Locator;
  private readonly groupRepresentative: Locator;

  constructor(page: Page) {
    super(page);
    this.singleOrMultipleClaim = this.page.locator('a[href="/single-or-multiple-claim?lng=en"]');
    this.claimingWithOtherPersonRadio = this.page.locator('#single-or-multiple-claim-2');
    this.addAnotherClaimantToYourGroupClaimLink = this.page.locator('a[href=""]');
    this.groupRepresentative = this.page.locator('a[href=""]');
  }

  async clickClaimingOnOwnOrOthersLink() {
    await this.singleOrMultipleClaim.click();
    await this.clickContinue();
  }

  async processClaimingWithOthers() {
    await this.clickClaimingOnOwnOrOthersLink();
    await expect(this.page.locator('h1')).toContainText('Claiming on your own or with others');
    await this.claimingWithOtherPersonRadio.click();
    await expect(this.page.locator('h1')).toContainText('Steps to making your claim');

    //validate group claim link appears
    await expect(this.addAnotherClaimantToYourGroupClaimLink).toBeVisible();
    await expect(this.groupRepresentative).toBeVisible();
  }
}
