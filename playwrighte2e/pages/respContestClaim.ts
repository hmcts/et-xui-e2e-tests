import {BasePage} from "./basePage";
import { expect, Page } from '@playwright/test';

export default class RespContestClaim extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): RespContestClaim {
    return new RespContestClaim(page);
  }

  elements={
    contestClaimReason: "//*[@id=\'et3ResponseContestClaimDetails\']",
    clickContestClaimLink:'[href="/respondent-contest-claim"]',
  };

  async et3Section3() {
    await this.contestTheClaim();
    // RET-5953
    await this.employerContractClaim();
  }

  async contestTheClaim() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Your response form (ET3)');
    await this.webActions.clickElementByCss(this.elements.clickContestClaimLink);
    await this.webActions.checkElementByLabel('Yes');

    await this.saveAndContinueButton();
    await this.webActions.fillField(this.elements.contestClaimReason, 'Test Contest Claim');

    await this.saveAndContinueButton();
    await this.webActions.checkElementByLabel('Yes, I’ve completed this');
    await this.saveAndContinueButton();
  }

  async employerContractClaim() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Employer’s Contract Claim');
    await this.webActions.checkElementByLabel('Yes');

    await this.saveAndContinueButton();
    await this.webActions.fillField('#et3ResponseEmployerClaimDetails', 'Test ECC Text Box');
    await this.page.setInputFiles('#claimSummaryFile', `test/data/test.txt`);
    await this.saveAndContinueButton();
    await this.webActions.clickElementByText('Yes, I’ve completed this');
    await this.saveAndContinueButton();
  }
}
