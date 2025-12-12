import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export default class DocumentsTabPage extends BasePage {

  async validateApplicationDocuments() {
    await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Application 1 - Change my personal details - Respondent Response.pdf');
    await expect(this.page.locator('ccd-read-complex-field-collection-table')).toContainText('Application 1 - Change my personal details - Respondent Response Attachment.txt');

  }
}
