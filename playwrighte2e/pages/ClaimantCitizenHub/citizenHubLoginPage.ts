import { BasePage } from '../basePage.ts';
import { expect, Locator, Page } from '@playwright/test';
import config from '../../config/config.ts';
import LoginPage from '../loginPage.ts';

export default class CitizenHubLoginPage extends LoginPage {
  private readonly syaLandingPageTitle: Locator;
  private readonly startNowButton: Locator;
  private readonly returnToAnExistingClaimLink: Locator;
  private readonly returnToExistingClaimPageTitle: Locator;
  private readonly saveAndReturnNumberCheckbox: Locator;
  private readonly employmentTribAccountCheckbox: Locator;


  constructor(page: Page) {
    super(page);
    this.syaLandingPageTitle = this.page.getByRole('heading', {name: 'Make a claim to an employment tribunal'})
    this.startNowButton = this.page.locator(`xpath=//a[normalize-space()='Start now']`);
    this.returnToAnExistingClaimLink = this.page.locator(`xpath=//a[normalize-space()='Return to an existing claim']`);
    this.returnToExistingClaimPageTitle = this.page.getByRole('heading', {name: 'Return to an existing claim'});
    this.saveAndReturnNumberCheckbox = this.page.locator(`#return_number_or_account`);
    this.employmentTribAccountCheckbox = this.page.locator(`#return_number_or_account-2`);
  }

  async assertSyaLandingPage() {
    await this.page.waitForLoadState('load');
    await expect(this.syaLandingPageTitle).toBeVisible();
    await expect(this.startNowButton).toBeVisible();
    await expect(this.returnToAnExistingClaimLink).toBeVisible();
  }

  async assertReturnToAnExistingClaimPage() {
    await expect(this.returnToExistingClaimPageTitle).toBeVisible();
    await expect(this.saveAndReturnNumberCheckbox).toBeVisible();
    await expect(this.employmentTribAccountCheckbox).toBeVisible();
  }

  async processCitizenHubLogin(username: string, password: string){
    const claimantUri = config.TestUrlCitizenUi;
    await this.page.goto(claimantUri);
    await this.page.waitForLoadState('load');

    await this.assertSyaLandingPage();
    await this.returnToAnExistingClaimLink.click();
    await this.page.waitForLoadState('load');

    await this.assertReturnToAnExistingClaimPage();
    await this.employmentTribAccountCheckbox.check();

    await this.clickContinue();

    await this.processLoginCitizenUi(username, password);
    await this.page.waitForURL(`${claimantUri}claimant-applications**`, {timeout: 10000});
  }

}
