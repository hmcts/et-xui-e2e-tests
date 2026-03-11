import config from '../config/config';
import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;

test.describe('Legal Rep Respond to an application made by caseworker', () => {
  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  });

  //RET-5921
  test('Perform NOC using claimant details, caseworker sends notification and (claimant)legal rep respond to notification', async ({
    manageCaseDashboardPage,
    loginPage,
    caseListPage,
    caseWorkerNotificationPage,
    legalRepNotificationPage,
    nocPage,
  }) => {
    const firstName = CaseDetailsValues.claimantFirstName;
    const lastName = CaseDetailsValues.claimantLastName;

    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, `${firstName} ${lastName}`, caseNumber);
    await manageCaseDashboardPage.signOut();

    //caseworker send notification
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    await caseWorkerNotificationPage.navigateToSendANotifications();
    const notificationTitle = await caseWorkerNotificationPage.sendNotification('ET1 claim', 'Yes', 'Both parties');
    await manageCaseDashboardPage.signOut();

    //respond as a (claimant) Legal rep
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //respond to an application
    await caseListPage.clickTab('Judgment');
    await legalRepNotificationPage.respondToTribunal({
      notificationName: notificationTitle,
      responseText: 'Responding to notification from tribunal - claimant legal rep',
      supportingMaterialFiles: [],
      notifyOtherParty: 'Yes',
    });
  });

  //RET-5924
  test('Perform NOC using respondent details, caseworker sends notification and (respondent)legal rep respond to notification', async ({
    manageCaseDashboardPage,
    loginPage,
    caseListPage,
    caseWorkerNotificationPage,
    legalRepNotificationPage,
    nocPage,
  }) => {
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
    await manageCaseDashboardPage.signOut();

    //caseworker send notification
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseWorkerNotificationPage.navigateToSendANotifications();
    const notificationTitle = await caseWorkerNotificationPage.sendNotification('ET1 claim', 'Yes', 'Both parties');
    await caseListPage.signoutButton();

    //respond as a (respondent) Legal rep
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //respond to an application
    await caseListPage.clickTab('Judgment');
    await legalRepNotificationPage.respondToTribunal({
      notificationName: notificationTitle,
      responseText: 'Responding to notification from tribunal - Respondent legal rep',
      supportingMaterialFiles: [],
      notifyOtherParty: 'Yes',
    });
  });

});
