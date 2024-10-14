import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class NotificationPage extends BasePage {

  elements = {
notificationDropDown:'#claimantSelectNotification'
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

  async viewNotification(){
    await this.page.getByText('Judgments, orders &').click();
    await this.page.getByRole('link', { name: 'View a judgment, order or' }).click();
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('View a judgment, order or notification');
    await this.page.locator(this.elements.notificationDropDown).selectOption('1: 1');
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.locator('tbody')).toContainText('test Notification');
    await expect(this.page.locator('thead')).toContainText('View Notification');
    await expect(this.page.locator('tbody')).toContainText('Both parties');
  }

}
