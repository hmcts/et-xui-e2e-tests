import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage.ts';

export class Et1ClaimsListPage extends BasePage {
  private readonly myEt1Claims: Locator;
  private readonly draftClaimsTable: Locator;
  private readonly submittedClaimsTable: Locator;

  constructor(page: Page) {
    super(page);
    this.myEt1Claims = this.page.getByRole('link', { name: 'My ET1 claims', exact: true });
    this.draftClaimsTable = this.page.locator(`//caption[normalize-space()='Draft claims']/../tbody`);
    this.submittedClaimsTable = this.page.locator(`//caption[normalize-space()='Submitted claims']/../tbody`);
  }

  async clickMyEt1ClaimLink() {
    await this.page.waitForLoadState('load');
    await expect(this.myEt1Claims).toBeVisible();
    await this.myEt1Claims.click();
  }

  async assertCaseListedInDraftClaims(caseId: string) {
    await this.page.waitForLoadState('load');
    await expect(this.draftClaimsTable).toBeVisible();
    const targetHref = `/claimant-application/${caseId}?lng=en`;
    const targetLink = this.draftClaimsTable.locator(`a[href="${targetHref}"]`);
    await expect(targetLink).toBeVisible();
    return targetLink;
  }

  async continueToCaseFromDraftClaimsTable(caseId: string) {
    const link = await this.assertCaseListedInDraftClaims(caseId);
    await expect(link).toBeVisible();
    expect(await link.textContent()).toBe('Continue');
    await link.click();
  }

  async assertCaseListedInSubmittedClaims(caseId: string) {
    await this.page.waitForLoadState('load');
    await expect(this.submittedClaimsTable).toBeVisible();
    const targetHref = `/citizen-hub/${caseId}?lng=en`;
    const targetLink = this.submittedClaimsTable.locator(`a[href="${targetHref}"]`);
    await expect
      .poll(
        async() => {
          const visible = await targetLink.isVisible();
          if (!visible) {
            await this.page.reload();
          }
          return visible;
        },
        {
          intervals: [1_000],
          timeout: 5000,
          message: `Case with ID ${caseId} not found in Submitted claims table after waiting for 5 seconds.`,
        }
      )
      .toBeTruthy();
    return targetLink;
  }

  async navigateToCaseFromSubmittedClaimsTable(caseId: string) {
    await this.page.reload();
    await this.page.waitForLoadState('load');
    const caseNumberLink = await this.assertCaseListedInSubmittedClaims(caseId);
    await expect(caseNumberLink).toBeVisible();
    const text = await caseNumberLink.textContent();
    await caseNumberLink.click();
    return text? text: '';
  }
}
