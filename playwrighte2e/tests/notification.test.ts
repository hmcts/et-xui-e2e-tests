import { test } from '../fixtures/common.fixture';
import CaseWorkerNotificationPage from '../pages/notifications/CaseWorkerNotificationPage.ts';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseNumber: any;
let caseId: string;

test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
  caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
  ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  await manageCaseDashboardPage.visit();
  await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
  caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
});

test.describe('Notification', () => {
  //RET-5718
  test('Tribunal/caseworker sends ET1 claim notification to claimant', async ({
    manageCaseDashboardPage,
    citizenHubLoginPage,
    citizenHubPage,
    caseWorkerNotificationPage
  }) => {

    //Caseworker send notification
    await caseWorkerNotificationPage.navigateToSendANotifications();
    await caseWorkerNotificationPage.sendNotification('ET1 claim');
    await manageCaseDashboardPage.signOut();

    //claimant verify notification
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant validates notification banner
    await citizenHubPage.verifyNotificationBanner('ET1 claim');
  });

  test('Tribunal/caseworker sends CMO notification to claimant', async ({
    manageCaseDashboardPage,
    citizenHubLoginPage,
    citizenHubPage,
    caseWorkerNotificationPage,
  }) => {
    //Caseworker send notification
    await caseWorkerNotificationPage.navigateToSendANotifications();
    await caseWorkerNotificationPage.sendNotification('CMO');
    await manageCaseDashboardPage.signOut();

    //claimant verify notification
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant validates notification banner
    await citizenHubPage.verifyNotificationBanner('CMO');
  });

  //RET-4646
  test('Tribunal/caseworker sends Hearing notification to claimant', async ({
    manageCaseDashboardPage,
    citizenHubLoginPage,
    citizenHubPage,
                                                                              caseDetailsPage,
    listHearingPage,
    caseWorkerNotificationPage,
  }) => {
    //list hearing
    await caseDetailsPage.selectNextEvent(Events.listHearing);
    await listHearingPage.listCase('EnglandWales', 0, 'Amersham');

    //Caseworker send notification
    await caseWorkerNotificationPage.navigateToSendANotifications();
    await caseWorkerNotificationPage.sendNotification('Hearing');
    await manageCaseDashboardPage.signOut();

    //claimant verify notification
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant validates notification banner
    await citizenHubPage.verifyNotificationBanner('Hearing');
  });

  test('Tribunal/caseworker perform ET1 serving event with 7.7 type document',
    async ({
    manageCaseDashboardPage,
    caseDetailsPage,
    et1CaseServingPage,
  }) => {
    //Caseworker perform ET1 serving notification
    await caseDetailsPage.selectNextEvent(Events.et1Serving);
    await et1CaseServingPage.et1ServingEvent();
    await et1CaseServingPage.validateEt1ErrorMessage();
    await manageCaseDashboardPage.signOut();
  });

  //RET-5850, 5627
  test('Tribunal/caseworker perform ET1 serving, claimant validates notification',
    async ({
             manageCaseDashboardPage,
    citizenHubPage, citizenHubLoginPage,
    caseDetailsPage,
    et1CaseServingPage,
  }) => {
    //Caseworker perform ET1 serving notification
    await caseDetailsPage.selectNextEvent(Events.et1Serving);
    await et1CaseServingPage.et1ServingEventNoticeOfClaim();
    await manageCaseDashboardPage.signOut();

    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant validates notification banner
    await citizenHubPage.verifyNotificationBannerForNoticeOfClaim();
  });
});
