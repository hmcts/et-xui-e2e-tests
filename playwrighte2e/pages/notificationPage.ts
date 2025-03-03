import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class NotificationPage extends BasePage {


    notificationDropDown= '#claimantSelectNotification';

    notification_tab2 = '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]';
    notification_link = 'text=Send a notification';
    respondToNotificationLink = 'text=Respond to an order or request from the tribunal';


    async selectNotificationLink() {
      await this.webActions.verifyElementToBeVisible(this.page.locator(this.notification_tab2), 20000);
      await this.webActions.clickElementByCss(this.notification_tab2);
      await this.webActions.clickElementByCss(this.notification_link);
    }


    async respondToAnOrderOrNotification() {
      await this.webActions.clickElementByCss(this.respondToNotificationLink);
    }


  async sendNotification() {
    await expect(this.page.locator('ccd-case-edit-page')).toContainText('Send a notification');
    await this.page.getByLabel('Enter notification title').fill('test Notification');
    await this.page.getByRole('radio', {name: 'No'}).check();
    await this.webActions.checkElementByLabel('Claim (ET1)');
    await this.webActions.checkElementByLabel('Both parties');
    await this.webActions.clickElementByRole('button', {name: 'Continue'});
    await this.webActions.clickElementByText('Claim (ET1)');

    await this.submitButton();
    await this.webActions.clickElementByRole('button', {name: 'Close and Return to case'});
    //TODO write switch for ECC notification
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
