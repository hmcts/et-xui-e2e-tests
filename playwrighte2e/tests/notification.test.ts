import {test} from "../fixtures/common.fixture";
import createAndAcceptCase from "../steps/createAndAcceptCase";
import NotificationPage from "../pages/notificationPage";
import {params} from "../utils/config";

let caseNumber: any;
let subRef;

test.beforeEach(async ({ page, createCaseStep, axeUtils }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true, axeUtils));
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

    test('Tribunal/caseworker sends CMO notification to claimant', async ({page, citizenHubPage, caseListPage}) => {
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


    //RET-4646
    test('Tribunal/caseworker sends Hearing notification to claimant', async ({page, citizenHubPage, caseListPage,listHearingPage}) => {
        let notificationPage = new NotificationPage(page);

        //list hearing
        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales', 1,false);

        //Caseworker send notification
        await notificationPage.selectNotificationLink();
        await notificationPage.sendNotification('Hearing');
        await caseListPage.signoutButton();

        //claimant verify notification
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

        //claimant validates notification banner
        await citizenHubPage.verifyNotificationBanner('Hearing');
    });

  test('Tribunal/caseworker perform ET1 serving event with 7.7 type document', async ({caseListPage, et1CaseServingPage}) => {
    //Caseworker perform ET1 serving notification
    await caseListPage.selectNextEvent('ET1 serving');
    await et1CaseServingPage.et1ServingEvent();
    await et1CaseServingPage.validateEt1ErrorMessage();
    await caseListPage.signoutButton();
  });

  //RET-5850, 5627
  test('Tribunal/caseworker perform ET1 serving, claimant validates notification', async ({citizenHubPage, caseListPage, et1CaseServingPage}) => {
    //Caseworker perform ET1 serving notification
    await caseListPage.selectNextEvent('ET1 serving');
    await et1CaseServingPage.et1ServingEventNoticeOfClaim();
    await caseListPage.signoutButton();

    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant validates notification banner
    await citizenHubPage.verifyNotificationBannerForNoticeOfClaim();
  });

});
