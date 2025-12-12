import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

export default class JurisdictionPage extends BasePage {

  elements = {
    jurisdictionDropdown:'#jurCodesCollection_1_juridictionCodesList'
  }

  async addJurisdictionCodeDDA(){
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.jurisdictionDropdown));
    await this.webActions.selectByOptionFromDropDown(this.elements.jurisdictionDropdown, '10: DDA');
    await this.webActions.selectByLabelFromDropDown('#jurCodesCollection_1_judgmentOutcome', 'Not allocated');
  }

  async addJurisdictionCode(){
    await this.addJurisdictionCodeDDA();
    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async addADTJurisdictionCode(){
    //add longer than 3 letter jurisdiction code
    await this.page.getByRole('button', { name: 'Add new' }).nth(1).click();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.jurisdictionDropdown));
    await this.webActions.selectByOptionFromDropDown(this.elements.jurisdictionDropdown, '3: ADT(ST)');
    await this.webActions.selectByLabelFromDropDown('#jurCodesCollection_1_judgmentOutcome', 'Not allocated');

    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }

  async verifyJurisdictionCodeOnTab(){
    await this.page.locator('ccd-read-collection-field').waitFor();
    await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-collection-field'), 'DDA');
  }

  async closeJurisdictionCode(){
    await this.webActions.selectByLabelFromDropDown('#jurCodesCollection_0_judgmentOutcome', 'Input in error');
    await this.clickSubmitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
  }
}
