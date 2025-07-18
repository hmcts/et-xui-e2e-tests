import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


let caseNumber: any;
let subRef;

test.describe('ET3 Notification', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    subRef = await createCaseStep.setupCUIcaseVetAndAcceptViaApi(page, true);
   //  subRef = '1752767563027673';
  });


  test('Respondent Reject response and attempt to send ET3 Notification', async ({
                                                                                       page,
                                                                                       loginPage,
                                                                                       caseListPage,
                                                                                       respondentDetailsPage,
                                                                                       et3NotificationPage
                                                                                     }) => {
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef.toString());
    caseNumber = await caseListPage.processCaseFromCaseList();

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
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef.toString());
    caseNumber = await caseListPage.processCaseFromCaseList();

    //reject ET3 Response
    await caseListPage.selectNextEvent('Respondent Details');
    await respondentDetailsPage.processRespondentDetailsET3(true);

    //attempt to send ET3 notification
    await caseListPage.selectNextEvent('ET3 notification');
    await et3NotificationPage.sendEt3Notification();
    await et3NotificationPage.processAcasPage();
  });
});