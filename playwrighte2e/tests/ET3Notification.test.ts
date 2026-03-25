import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { expect } from '@playwright/test';

let caseNumber: string;
let subRef: string;

test.describe('ET3 Notification', () => {
  test.describe.configure({ mode: 'default' });
  test.beforeEach(async ({}) => {
    subRef = await CitizenClaimantFactory.progressCaseFromCreateToEt3(CaseTypeLocation.EnglandAndWales);
  });

  test('Respondent Reject response and attempt to send ET3 Notification', async ({
                                                                                       page,
                                                                                       loginPage,
                                                                                       caseDetailsPage,
                                                                                       respondentDetailsPage,
                                                                                       et3NotificationPage, manageCaseDashboardPage
                                                                                     }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);

    //reject ET3 Response
    await caseDetailsPage.selectNextEvent(Events.respondentDetails);
    await respondentDetailsPage.processRespondentDetailsET3(false);

    //attempt to send ET3 notification
    await caseDetailsPage.selectNextEvent(Events.et3Notification);
    await et3NotificationPage.sendEt3Notification();
    await et3NotificationPage.verifyEt3NotificationErrorMessage();
  });

  test('Respondent Accept response and sends ET3 Notification',async ({
                                                                        page,
                                                                        loginPage,
                                                                        caseDetailsPage,
                                                                        respondentDetailsPage,
                                                                        et3NotificationPage,initialConsiderationPage,
                                                                        manageCaseDashboardPage
                                                                     }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
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

  test('Respondent not Accepting or rejecting response and attempts to send ET3 Notification', async ({
                                                                         page,
                                                                         loginPage,
                                                                         caseDetailsPage,
                                                                         manageCaseDashboardPage
                                                                       }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(subRef.toString(), CaseTypeLocation.EnglandAndWales);

    //attempt to send ET3 notification
    await caseDetailsPage.selectNextEvent(Events.et3Notification);
    await expect(page.getByLabel('Errors').getByRole('listitem')).toContainText('At least one respondent must have a selected response status.');
  });
});
