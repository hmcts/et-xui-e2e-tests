import {test} from "../fixtures/common.fixture";
import createAndAcceptCase from "../steps/createAndAcceptCase";
import NotificationPage from "../pages/notificationPage";
import {params} from "../utils/config";

let caseNumber: any;
let subRef;

test.beforeEach(async ({ page, createCaseStep}) => {
    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true));
});

test.describe('Notification', () => {

//RET-5718
    test('Tribunal/caseworker sends ET1 claim notification to claimant', async ({page, citizenHubPage, caseListPage}) => {
        let notificationPage = new NotificationPage(page);


        //Caseworker send notification
        await notificationPage.selectNotificationLink();
        await notificationPage.sendNotification('ET1 claim');
        await caseListPage.signoutButton();

        //claimant verify notification
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

        //claimant validates notification banner
        await citizenHubPage.verifyNotificationBanner('ET1 claim');
    });

    test.skip('Tribunal/caseworker sends CMO notification to claimant', async ({page, citizenHubPage, caseListPage}) => {
        let notificationPage = new NotificationPage(page);


        //Caseworker send notification
        await notificationPage.selectNotificationLink();
        await notificationPage.sendNotification('CMO');
        await caseListPage.signoutButton();

        //claimant verify notification
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

        //claimant validates notification banner
        await citizenHubPage.verifyNotificationBanner('CMO');
    });
});
