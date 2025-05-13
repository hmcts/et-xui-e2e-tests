import { test } from '../fixtures/common.fixture';
import {params} from '../utils/config';

let caseNumber: any;
let subRef;
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
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
    await caseListPage.processCaseFromCaseList();
    await notificationPage.viewNotification();
  });
});
