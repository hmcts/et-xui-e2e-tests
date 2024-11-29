import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export default class RespSubmitEt3 extends BasePage{
  protected constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): RespSubmitEt3 {
    return new RespSubmitEt3(page);
  }

  elements={
    clickContestClaimLink:this.page.locator('[href="/check-your-answers-et3"]'),
  };

  async checkYourAnswers() {
    await this.submitEt3();

  }

  async submitEt3() {
    await this.page.getByRole('button', { name: 'Save and continue' }).click();
    await this.page.getByRole('button', { name: 'Close and return to case' }).click();
  }
}