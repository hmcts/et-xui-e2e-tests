import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export default class ReinstateCasePage extends BasePage {

  async reinstateCase() {
    await expect(this.page.locator('h1').filter({ hasText: 'Reinstate Case'})).toBeVisible();
    await this.webActions.selectByLabelFromDropDown('#positionType', 'Awaiting appeal judgment');
    await this.submitButton();
    await this.delay(7000);
  }
}