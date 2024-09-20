import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class JurisdictionPage extends BasePage {

  elements = {
    jurisdictionDropdown:'#jurCodesCollection_1_juridictionCodesList'
  }

  async addJurisdictionCode(){
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.page.locator(this.elements.jurisdictionDropdown).selectOption('10: DDA');
    await this.submitButton();
  }

  async verifyJurisdictionCodeOnTab(){
    await this.page.getByText('Jurisdictions').click();
    await expect(this.page.locator('ccd-read-collection-field')).toContainText('DDA');
  }
}
