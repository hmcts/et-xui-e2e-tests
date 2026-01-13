import { BasePage } from '../basePage.ts';
import { Page } from '@playwright/test';

export default class ResponseLandingPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): ResponseLandingPage {
    return new ResponseLandingPage(page);
  }

  async startEt3() {
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');
    await this.webActions.clickElementByRole('link', { name: 'Your response form (ET3)' });
    await this.clickStartNow();
  }
}
