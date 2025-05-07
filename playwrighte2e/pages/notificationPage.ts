import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class NotificationPage extends BasePage {


    notificationDropDown= '#claimantSelectNotification';

    notification_tab2 = '//div[@class="mat-tab-label-content"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted mat-tab-label-active"]/div[.="Notifications"]';
    notification_link = 'text=Send a notification';
    respondToNotificationLink = 'text=Respond to an order or request from the tribunal';


    async selectNotificationLink() {
      await this.webActions.clickElementByText('Notifications');
      await this.webActions.clickElementByCss(this.notification_link);
    }


    async respondToAnOrderOrNotification() {
      await this.webActions.clickElementByCss(this.respondToNotificationLink);
    }


  async sendNotification(notificationType) {
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Send a notification');
    await this.page.getByLabel('Enter notification title').fill('test Notification');
    await this.page.getByRole('radio', {name: 'No'}).check();
    switch (notificationType) {
        case 'ET1 claim':
            await this.webActions.checkElementByLabel('Claim (ET1)');
            break;
        case 'CMO':
            await this.webActions.checkElementByLabel('Case management orders / requests');
            await this.webActions.checkElementById('#sendNotificationCaseManagement-Case management order');
            await this.webActions.checkElementById('#sendNotificationResponseTribunal-No');
            await this.webActions.checkElementById('#sendNotificationWhoCaseOrder-Legal officer');
            await this.webActions.fillField('#sendNotificationFullName', 'Caseworker');
            break;
        default:
            throw new Error(
                '... Notification Type not provided ...',
            );
    }
    await this.webActions.checkElementByLabel('Both parties');
    await this.webActions.clickElementByRole('button', {name: 'Continue'});
    await this.submitButton();
    await this.webActions.clickElementByRole('button', {name: 'Close and Return to case'});
  }

  async viewNotification() {
    await this.webActions.clickElementByText('Judgments, orders &');
    await this.webActions.clickElementByRole('link', {name: 'View a judgment, order or'});

    await expect(this.page.locator('ccd-case-edit-page')).toContainText('View a judgment, order or notification');
    await this.page.locator(this.notificationDropDown).selectOption('1: 1');
    await this.page.getByRole('button', {name: 'Continue'}).click();
    await this.webActions.verifyElementContainsText(this.page.locator('tbody'), 'test Notification');
    await this.webActions.verifyElementContainsText(this.page.locator('thead'), 'View Notification');
    await this.webActions.verifyElementContainsText(this.page.locator('tbody'), 'Both parties');
  }

}
