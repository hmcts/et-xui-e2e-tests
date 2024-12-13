import {BasePage} from "./basePage";
import { expect, Page } from '@playwright/test';

export default class RespContestClaim extends BasePage {
  protected constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): RespContestClaim {
    return new RespContestClaim(page);
  }

  elements={
    contestClaimReason: this.page.locator("//*[@id=\"et3ResponseContestClaimDetails\"]"),
    clickContestClaimLink:this.page.locator('[href="/respondent-contest-claim"]'),
  };

  async et3Section3() {
    await this.contestTheClaim();
    // Below only for BOC Claims
    // await this.employerContractClaim();
  }

  async contestTheClaim() {
    await expect(this.page.locator('h1')).toContainText('Your response form (ET3)');
    await this.elements.clickContestClaimLink.click();
    await this.page.getByLabel('Yes').check();
    await this.saveAndContinueButton();
    await this.elements.contestClaimReason.fill('Test Contest Claim');
    await this.saveAndContinueButton();
    await this.page.getByLabel('Yes, I’ve completed this').check();
    await this.saveAndContinueButton();
  }

  async employerContractClaim() {
    await expect(this.page.locator('h1')).toContainText('Employer’s Contract Claim');
    await this.page.getByLabel('Yes').check();
    await this.saveAndContinueButton();
    await this.page.locator('#et3ResponseEmployerClaimDetails').fill('Test ECC Text Box');
    await this.saveAndContinueButton();
    await this.page.getByText('Yes, I’ve completed this').click();
    await this.saveAndContinueButton();
  }
}
