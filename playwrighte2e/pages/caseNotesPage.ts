import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { th } from '@faker-js/faker';


export default class CaseNotesPage extends BasePage {

  elements = {
  }
  async addCaseNotes() {
    await this.webActions.fillField('#addCaseNote_title', 'Case Notes');
    await this.webActions.fillField('#addCaseNote_note', 'This is test');
    await this.submitButton();
    await expect(this.page.getByRole('tab', { name: 'Case Notes' }).locator('div')).toContainText('Case Notes');

  }
}
