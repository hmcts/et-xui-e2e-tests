import {test} from "@playwright/test";
import createAndAcceptCase from "../pages/createAndAcceptCase";
import NotificationPage from "../pages/notificationPage";

test.beforeEach(async ({ page }) => {
    let createCase= new createAndAcceptCase();
    await createCase.setupCase(page, "England", "ET_EnglandWales");
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
