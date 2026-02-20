import { BasePage } from './basePage.ts';
import config from '../config/config.ts';
import { expect, Locator, Page } from '@playwright/test';
import { CaseTypeLocation } from '../config/case-data.ts';

export class ManageCaseDashboardPage extends BasePage {
  private readonly url: string;
  private readonly signOutButton: Locator;

  public constructor(page: Page) {
    super(page);
    this.url = config.manageCaseBaseUrl;
    this.signOutButton = page.getByText('Sign Out');
  }

  async navigateToCaseDetails(
    caseId: string,
    caseTypeLocation: CaseTypeLocation,
    canView: boolean = true,
  ): Promise<string> {
    await this.page.waitForLoadState('load');
    const url = `${this.url}/case-details/EMPLOYMENT/${caseTypeLocation.toString()}/${caseId}#Case%20Details`;
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
    if (canView) {
      await expect(this.page.getByText(String(caseId))).toBeVisible();
      const caseNumberText = await this.page.locator('h1', { hasText: 'Case Number:' }).textContent();
      const match = caseNumberText?.match(/Case Number:(\d+\/\d+)/);
      const caseNumber = match ? match[1] : '';
      console.log('Navigated to case number: ' + caseNumber);
      return caseNumber;
    } else {
      await expect(this.page.getByText(String(caseId))).not.toBeVisible();
      return "";
    }
  }

  async visit() {
    await this.page.goto(`${this.url}`);
  }

  async signOut() {
    await this.page.waitForLoadState();
    await this.signOutButton.click();
  }
}
