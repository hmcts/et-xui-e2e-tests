import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
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
                                                                                       caseListPage,
                                                                                       respondentDetailsPage,
                                                                                       et3NotificationPage
                                                                                     }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

    //reject ET3 Response
    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(false);

    //attempt to send ET3 notification
    await caseListPage.selectNextEvent('ET3 notification');
    await et3NotificationPage.sendEt3Notification();
    await et3NotificationPage.verifyEt3NotificationErrorMessage();
  });

  test('Respondent Accept response and sends ET3 Notification', async ({
                                                                                        page,
                                                                                        loginPage,
                                                                                        caseListPage,
                                                                                        respondentDetailsPage,
                                                                                        et3NotificationPage
                                                                                      }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

    //reject ET3 Response
    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(true);


    await caseListPage.selectNextEvent('ET3 notification');
    await et3NotificationPage.sendEt3Notification();
    await et3NotificationPage.processAcasPage();
  });

  test('Respondent not Accepting or rejecting response and attempts to send ET3 Notification', async ({
                                                                         page,
                                                                         loginPage,
                                                                         caseListPage,
                                                                         respondentDetailsPage,
                                                                         et3NotificationPage
                                                                       }) => {
    await page.goto(config.manageCaseBaseUrl);
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

    //attempt to send ET3 notification
    await caseListPage.selectNextEvent('ET3 notification');
    await expect(page.getByLabel('Errors').getByRole('listitem')).toContainText('At least one respondent must have a selected response status.');
  });
});
