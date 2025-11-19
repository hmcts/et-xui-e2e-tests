import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export default class CloseCasePage extends BasePage{

  async closeCase() {
    await this.webActions.selectByOptionFromDropDown('#clerkResponsible', '1: A Clerk');
    await this.clickContinue();
    await this.webActions.waitForElementToBeVisible('text=Check your answers');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }
}