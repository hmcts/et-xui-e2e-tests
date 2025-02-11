import {test} from "../fixtures/common.fixture";
import createAndAcceptCase from "../steps/createAndAcceptCase";
import NotificationPage from "../pages/notificationPage";

test.beforeEach(async ({ page, createCaseStep}) => {
    await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
});

test.describe('Notification', () => {

//TODO RET-5290
    test.skip('Tribunal/caseworker sends notification to claimant', async ({page}) => {
        let notificationPage = new NotificationPage(page);


        //Caseworker send notification
        await notificationPage.selectNotificationLink();
        await notificationPage.sendNotification();

        //claimant verify notification

    });
});
