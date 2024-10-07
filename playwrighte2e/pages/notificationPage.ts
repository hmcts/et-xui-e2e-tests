import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { th } from "@faker-js/faker";


export default class NotificationPage extends BasePage {

  elements = {

  }

  async sendNotification(){
    await this.page.getByRole('link', { name: 'Send a notification' }).click();
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Send a notification');
    await this.page.getByLabel('Enter notification title').fill('test Notification');
    await this.page.getByRole('radio', { name: 'No' }).check();
    await this.page.getByLabel('Claim (ET1)').check();
    await this.page.getByLabel('Both parties').check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByText('Claim (ET1)').click();
    await this.submitButton();
    await this.page.getByRole('button', { name: 'Close and Return to case' }).click();
  }

}
