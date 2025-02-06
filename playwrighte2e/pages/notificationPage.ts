import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class NotificationPage extends BasePage {


    notificationDropDown= '#claimantSelectNotification';

    notification_tab2 = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]';
    notification_link = 'text=Send a notification';
    respondToNotificationLink = 'text=Respond to an order or request from the tribunal';


    async selectNotificationLink() {
      await this.page.waitForSelector(this.notification_tab2, {timeout: 20000});
      await this.page.click(this.notification_tab2);
      await this.page.click(this.notification_link);
    }


    async respondToAnOrderOrNotification() {
      await this.page.click(this.respondToNotificationLink);
    }


  async sendNotification() {
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Send a notification');
    await this.page.getByLabel('Enter notification title').fill('test Notification');
    await this.page.getByRole('radio', {name: 'No'}).check();
    await this.page.getByLabel('Claim (ET1)').check();
    await this.page.getByLabel('Both parties').check();
    await this.page.getByRole('button', {name: 'Continue'}).click();
    await this.page.getByText('Claim (ET1)').click();
    await this.submitButton();
    await this.page.getByRole('button', {name: 'Close and Return to case'}).click();
    //TODO write switch for ECC notification
  }

  async viewNotification() {
    await this.page.getByText('Judgments, orders &').click();
    await this.page.getByRole('link', {name: 'View a judgment, order or'}).click();
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('View a judgment, order or notification');
    await this.page.locator(this.notificationDropDown).selectOption('1: 1');
    await this.page.getByRole('button', {name: 'Continue'}).click();
    await expect(this.page.locator('tbody')).toContainText('test Notification');
    await expect(this.page.locator('thead')).toContainText('View Notification');
    await expect(this.page.locator('tbody')).toContainText('Both parties');
  }

}
