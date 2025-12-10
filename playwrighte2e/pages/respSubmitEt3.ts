import { BasePage } from './basePage';
import { expect, Page } from '@playwright/test';

export default class RespSubmitEt3 extends BasePage{
  constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): RespSubmitEt3 {
    return new RespSubmitEt3(page);
  }

  elements={
    cya:this.page.locator('[href="/check-your-answers-et3"]'),
  };

  async checkYourAnswers() {
    await this.submitEt3();

  }

  async submitEt3() {
    await this.elements.cya.click();
    await this.clickSubmitButton();
    await expect(this.page.locator('h1')).toContainText('Your response has been submitted');
    await this.page.getByRole('button', { name: 'Close and return to case overview' }).click();
  }
}
