import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ManageOrgPage extends BasePage {
  readonly clickAssignedCases: Locator;
  readonly clickUnassignedCases: Locator;
  readonly clickShowCasesFilter: Locator;
  readonly clickShowUnassignedCasesFilter: Locator;
  readonly allAssigneesRadio: Locator;
  readonly assignedCasesElement: Locator;
  readonly assigneeNameSearchBox: Locator;
  readonly assigneeNameRadio: Locator;
  readonly caseReferenceSearchBox: Locator;
  readonly caseRefTextBox: Locator;
  readonly applyFilterButton: Locator;

  constructor(page: Page) {
    super(page);
    this.clickAssignedCases = page.locator('//a[.="Assigned cases"]');
    this.clickUnassignedCases = page.locator('//a[.="Unassigned cases"]');
    this.clickShowCasesFilter = page.locator('.govuk-button--secondary');
    this.clickShowUnassignedCasesFilter = page.locator("//button[normalize-space()='Show unassigned cases filter']");
    this.allAssigneesRadio = page.locator('[for="caa-filter-all-assignees"]');
    this.assignedCasesElement = page.locator('.govuk-heading-xl');
    this.assigneeNameSearchBox = page.locator('#assignee-person');
    this.assigneeNameRadio = page.locator('[for="caa-filter-assignee-name"]');
    this.caseReferenceSearchBox = page.locator('#caa-filter-case-reference-number');
    this.caseRefTextBox = page.locator('#case-reference-number');
    this.applyFilterButton = page.getByRole('button', { name: 'Apply filters' });
  }

  async allAssignedCases() {
    await this.delay(10);
    await this.page.waitForSelector('text=Organisation');
    await this.page.waitForSelector('text=Users');
    await this.page.waitForSelector('text=Unassigned Cases');
    await this.page.waitForSelector('text=Assigned Cases');
    await this.clickAssignedCases.click();
    await this.page.waitForSelector('text=Assigned Cases');
    await this.clickShowCasesFilter.click();
    await this.page.waitForSelector('text=Filter assigned cases');
    await this.page.waitForSelector('text=All assignees');
    await this.allAssigneesRadio.click();
    await this.applyFilterButton.click();
  }

  async filterByAssigneeName(assigneeName: string) {
    await expect(this.assignedCasesElement).toBeVisible({ timeout: 20000 });
    await this.page.waitForSelector('text=Assignee name');
    await this.assigneeNameRadio.click();
    await this.page.waitForSelector('text=Type the name and select an available match option');
    await this.assigneeNameSearchBox.click();
    await this.assigneeNameSearchBox.fill(assigneeName);
    await this.applyFilterButton.click();
    const firstResult = this.page.locator(`xpath=//table/tbody/tr[1]/td[2]`);
    await firstResult.waitFor({state: 'visible', timeout: 10000});
    return await firstResult.textContent();
  }

  async verifyResultsCount(expTotCount: number) {
    await this.page.locator('tbody tr').first().waitFor();
    const totRes = await this.page.locator('tbody tr').count();
    expect(totRes).toEqual(expTotCount);
  }

  async filterByReferenceNumber(caseReferenceNumber: string) {
    await expect(this.assignedCasesElement).toBeVisible({ timeout: 20000 });
    await this.page.waitForSelector('text=Case reference number');
    await this.caseReferenceSearchBox.click();
    await this.caseRefTextBox.fill(caseReferenceNumber);
    await this.applyFilterButton.click();
    await this.delay(3000);
  }

  async unassignedCases() {
    await this.clickUnassignedCases.click();
    await this.page.waitForSelector('text=Unassigned Cases');
    await this.page.waitForSelector('text=Show unassigned cases filter');
    await this.clickShowUnassignedCasesFilter.click();
    await this.page.waitForSelector('text=Search for an unassigned case');
    await this.caseRefTextBox.click();
    await this.caseRefTextBox.fill('');
    await this.applyFilterButton.click();
  }

  async assignCaseToSolicitor(assigneeName: string) {
    await this.allAssignedCases();
    let caseReferenceNumber = await this.filterByAssigneeName(assigneeName);
    await this.filterByReferenceNumber(caseReferenceNumber?? '');
  }

  async unassignCaseFromSolicitor() {
    await this.unassignedCases();
  }
}
