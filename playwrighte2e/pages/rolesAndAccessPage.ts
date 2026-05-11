import { BasePage } from "./basePage";
import { expect, Locator, Page } from "@playwright/test";

export default class RolesAndAccessPage extends BasePage {
  private readonly allocateCtscRoleLink: Locator;
  private readonly allocatedCtscCaseworker: Locator;
  private readonly allocateToMe: Locator;
  private readonly daysRadio: Locator;
  private readonly indefiniteRadio: Locator;
  private readonly confirmAllocationButton: Locator;
  private readonly tbody: Locator;

  constructor(page: Page) {
    super(page);
    this.allocateCtscRoleLink = page.getByRole('link', { name: 'Allocate a CTSC role' });
    this.allocatedCtscCaseworker = page.getByText('Allocated CTSC Caseworker');
    this.allocateToMe = page.getByText('Allocate to me');
    this.daysRadio = page.getByRole('radio', { name: 'days' });
    this.indefiniteRadio = page.getByRole('radio', { name: 'Indefinite' });
    this.confirmAllocationButton = page.getByRole('button', { name: 'Confirm allocation' });
    this.tbody = page.locator('tbody');
  }

  async assignAccessToCtscUser() {
    await this.allocateCtscRoleLink.click();
    await this.allocatedCtscCaseworker.click();
    await this.clickContinue();
    await this.allocateToMe.click();
    await this.clickContinue();
    await this.daysRadio.check();
    await this.indefiniteRadio.check();
    await this.clickContinue();
    await this.confirmAllocationButton.click();
    await expect(this.tbody).toContainText('Allocated CTSC Caseworker');
  }
}
