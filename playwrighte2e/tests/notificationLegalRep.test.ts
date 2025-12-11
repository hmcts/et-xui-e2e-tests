import { test } from '../fixtures/common.fixture';
import config from '../config/config';

let caseNumber: string;
let subRef: string;

test.describe('Legal Representative Notifications', () => {
  //RET-5309
  test('Legal Representative creates a claim and tribunal sends notification, Legal Rep view notification',
    {tag: '@demo'},
    async ({ page, createCaseStep, notificationPage, caseListPage, loginPage }) => {
      ({subRef, caseNumber}  = await createCaseStep.setUpLegalRepCase(page));

    //send Notification
    await notificationPage.selectNotificationLink();
    await notificationPage.sendNotification('ET1 claim');
    await caseListPage.signoutButton();

    //view Notification as Legal rep
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
    await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
    await notificationPage.viewNotification();
  });
});
