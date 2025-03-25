import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class RolesAndAccessPage extends BasePage {

  async assignAccessToCtscUser() {
    await this.page.getByRole('link', { name: 'Allocate a CTSC role' }).click();
    await this.webActions.clickElementByText('Allocated CTSC Caseworker');
    await this.clickContinue();
    await this.webActions.clickElementByText('Allocate to me');
    await this.clickContinue();
    await this.page.getByRole('radio', { name: 'days' }).check();
    await this.page.getByRole('radio', { name: 'Indefinite' }).check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByRole('button', { name: 'Confirm allocation' }).click();
    await expect(this.page.locator('tbody')).toContainText('Allocated CTSC Caseworker');
  }

}
