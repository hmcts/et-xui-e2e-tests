import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { expect } from '@playwright/test';
import { users } from '../config/config.dynamic.ts';

let caseNumber: string;
let subRef: string;

test.describe('ET3 Notification', () => {
  test.use({
    storageState: users.etCaseWorker.sessionFile,
  })
  test.describe.configure({ mode: 'default' });
  test.beforeEach(async ({}) => {
    subRef = await CitizenClaimantFactory.progressCaseFromCreateToEt3(CaseTypeLocation.EnglandAndWales);
  });

  test('Respondent Reject response and attempt to send ET3 Notification',
    async ({
           loginPage,
           caseDetailsPage,
           respondentDetailsPage,
           et3NotificationPage, manageCaseDashboardPage
         }) => {
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);

    //reject ET3 Response
    await caseDetailsPage.selectNextEvent(Events.respondentDetails);
    await respondentDetailsPage.processRespondentDetailsET3(false);

    //attempt to send ET3 notification
    await caseDetailsPage.selectNextEvent(Events.et3Notification);
    await et3NotificationPage.sendEt3Notification(false);
    await et3NotificationPage.verifyEt3NotificationErrorMessage();
  });

  test('Respondent Accept response and sends ET3 Notification',
    async ({
        loginPage,
        caseDetailsPage,
        respondentDetailsPage,
        et3NotificationPage,initialConsiderationPage,
        manageCaseDashboardPage
     }) => {
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);

    //reject ET3 Response
    await caseDetailsPage.selectNextEvent(Events.respondentDetails);
    await respondentDetailsPage.processRespondentDetailsET3(true);

    await caseDetailsPage.selectNextEvent(Events.et3Notification);
    await et3NotificationPage.sendEt3Notification();
    await et3NotificationPage.processAcasPage();

    // Validate Initial Consideration Links RET-5796
    await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);
    await caseDetailsPage.selectNextEvent(Events.initialConsideration);
    await initialConsiderationPage.validateET1Links();


  });

  test('Respondent not Accepting or rejecting response and attempts to send ET3 Notification',
    async ({page,
           loginPage,
           caseDetailsPage,
           manageCaseDashboardPage
         }) => {
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);

    //attempt to send ET3 notification
    await caseDetailsPage.selectNextEvent(Events.et3Notification, false);
    await expect(
      page.getByLabel('Errors').getByRole('listitem')
    ).toContainText('At least one respondent must have a selected response status.');
  });
});
