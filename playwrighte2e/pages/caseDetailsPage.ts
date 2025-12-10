import { BasePage } from "./basePage";
import { expect, Locator } from '@playwright/test';
import { CaseEvent } from '../config/case-data';
import { Tab, TabContentItem } from './types/tab';

export default class CaseDetailsPage extends BasePage {
    async addVPCaseFlag() {
        await this.webActions.waitForElementToBeVisible('text=Managing Office');
        await this.webActions.selectByOptionFromDropDown('#allocatedOffice', '1: Glasgow');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Single or Multiple');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Speak to VP (Optional)');
        await this.webActions.checkElementById('#additionalCaseInfo_interventionRequired_Yes');
        await this.clickContinue();
        await this.webActions.waitForElementToBeVisible('text=Check your answers');
        await this.clickSubmitButton();

        await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
        await expect(this.page.getByText('SPEAK TO VP', { exact: true })).toBeVisible();
    }

  async checkHasBeenCreated(event: CaseEvent) {
      await expect(this.page.locator('//div[@class="alert-message"]')).toBeVisible();
      const successMessage = this.page.getByText(`has been updated with event: ${event.listItem}`);
      await expect(successMessage).toBeVisible();
  }


  async assertTabData(tabs: Tab[]) {
    for (const tab of tabs) {
      await this.assertTabHeader(tab.tabName, tab.tabContent[0]);
      // Wait for the first content item to be attached (visible in DOM)
      const firstContent = tab.tabContent[0];
      if (firstContent) {
        const text = typeof firstContent === 'string' ? firstContent : firstContent.tabItem;
        const exact = typeof firstContent === 'object' ? (firstContent.exact ?? true) : true;
        await this.page.getByText(text, { exact }).first().waitFor({ state: 'attached', timeout: 5000 });
      }
      await this.assertTabContent(tab.tabContent);
      if (tab.excludedContent) {
        await this.assertExcludedContent(tab.excludedContent);
      }
    }
  }

  private async assertTabHeader(tabName: string, firstContent?: TabContentItem): Promise<void> {
    const tabHeader = this.getTabHeader(tabName);
    // Wait for the tab header to be visible and enabled before clicking
    await tabHeader.waitFor({ state: 'visible' });
    await expect(tabHeader).toBeEnabled();
    await tabHeader.click();
  }

  /**
   * Asserts that each item in the provided tab content array is visible and, if applicable, contains the expected value.
   *
   * The function supports both string and object tab content items. For string items, it checks visibility.
   * For object items, it checks both visibility and that the corresponding value cell contains the expected text.
   *
   * The `tabItemCount` record is used to track the number of times each unique tab item key has been processed.
   * This allows the function to correctly select the nth visible instance of a tab item when the same label appears multiple times,
   * ensuring assertions are made against the correct DOM element.
   * Tab array items should be in right order, as they are displayed in the UI.
   */
  private async assertTabContent(tabContent: TabContentItem[]): Promise<void> {
    const tabItemCount: Record<string, number> = {};
    for (const content of tabContent) {
      let tabKey: string;
      let position: number;

      if (typeof content === 'string') {
        tabKey = content;
        position = tabItemCount[tabKey] ?? 0;
        tabItemCount[tabKey] = position + 1;
      } else {
        tabKey = content.tabItem;
        // Use explicit position if provided, otherwise use counting logic
        if (typeof content.position === 'number') {
          position = content.position;
        } else {
          position = tabItemCount[tabKey] ?? 0;
          tabItemCount[tabKey] = position + 1;
        }
      }

      if (typeof content === 'string') {
        const tabItem = await this.getVisibleTabContent(content, position);
        await expect(tabItem).toBeVisible();
      } else {
        const tabItem = await this.getVisibleTabContent(content.tabItem, position, content.exact ?? true);
        await expect(tabItem).toBeVisible();

        const tabValue = tabItem.locator('xpath=../following-sibling::td[1]');
        if (content.clickable) {
          await tabItem.click();
          await this.page.waitForLoadState();
        }

        const expectedValues = content.value.split('|').map(v => {return v.trim();});
        for (let i = 0; i < expectedValues.length; i++) {
          const tabValue = tabItem.locator(
            `xpath=ancestor::*[self::td or self::th]/following-sibling::*[self::td or self::th][${i + 1}]`
          );
          if (!content.exact) {
            await expect(tabValue).toContainText(expectedValues[i]);
          } else {
            await expect(tabValue).toHaveText(expectedValues[i]);
          }
        }
      }
    }
  }

  private async assertExcludedContent(excludedContent: string[]): Promise<void> {
    for (const excluded of excludedContent) {
      const tabItem = this.page.getByText(excluded, { exact: true }); // Locate the element directly
      await expect(tabItem).not.toBeVisible(); // Assert that it is not visible
    }
  }

  private getTabHeader(tabName: string): Locator {
    return this.page.getByRole('tab', { name: tabName, exact: true });
  }

  /**
   * Returns the `Locator` for the nth visible element matching the given text content.
   *
   * @param content - The exact text to match in the DOM.
   * @param position - The zero-based index of the visible element to return (default is 0).
   * @returns A Playwright `Locator` for the requested visible element.
   * @throws Error if no visible element is found at the specified position.
   *
   * Logic:
   * 1. Finds all elements matching the exact text.
   * 2. If only one match and position is 0, returns it directly.
   * 3. Otherwise, iterates through all matches, counting only those that are visible.
   * 4. Returns the element at the requested visible position.
   * 5. Throws an error if the requested visible position does not exist.
   */
  private async getVisibleTabContent(content: string, position: number = 0, exact: boolean = true): Promise<Locator> {
    const locator = this.page.getByText(content, { exact });
    // Wait for at least one matching element to be attached
    await locator.first().waitFor({ state: 'attached', timeout: 10000 }).catch(() => {});
    const count = await locator.count();

    if (count === 0) {
      throw new Error(`No element found for content: ${content}`);
    }

    let visibleIndex = 0;
    for (let i = 0; i < count; i++) {
      const element = locator.nth(i);
      // Wait for each element to be attached before checking visibility
      await element.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {});
      if (await element.isVisible()) {
        if (visibleIndex === position) {
          return element;
        }
        visibleIndex++;
      }
    }
    throw new Error(`No visible element found for content: ${content} at position: ${position}`);
  }
}
