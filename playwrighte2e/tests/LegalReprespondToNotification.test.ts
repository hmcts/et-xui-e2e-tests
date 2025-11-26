import {params} from "../utils/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Legal Rep Respond to an application made by caseworker', () => {

  test.beforeEach(async ({ page,createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

//RET-5921
test('Perform NOC using claimant details, caseworker sends notification and (claimant)legal rep respond to notification',
  async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, notificationPage }) => {
    const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
    await page.click('text=Sign out');

    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, false);
    await page.click('text=Sign out');

    //caseworker send notification
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
    await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    await notificationPage.selectNotificationLink();
    await notificationPage.sendNotification('ET1 claim');
    await caseListPage.signoutButton();

    //respond as a (claimant) Legal rep
    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    //respond to an application
    await caseListPage.clickTab('Judgment');
    await legalRepPage.respondToNotificationFromTribunal();

  });

//RET-5924
  test.skip('Perform NOC using respondent details, caseworker sends notification and (respondent)legal rep respond to notification',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, notificationPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
      await page.click('text=Sign out');

      //caseworker send notification
      await page.goto(params.TestUrlForManageCaseAAT);
      await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

      await notificationPage.selectNotificationLink();
      await notificationPage.sendNotification('ET1 claim');
      await caseListPage.signoutButton();

      //respond as a (respondent) Legal rep
      await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

      //respond to an application
      await caseListPage.clickTab('Judgment');
      await legalRepPage.respondToNotificationFromTribunal();
    });

});