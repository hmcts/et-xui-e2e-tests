import config from "../config/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber: string;

test.describe('Legal Rep Respond to an application made by caseworker', () => {

  test.beforeEach(async ({ page,createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

//RET-5921
test('Perform NOC using claimant details, caseworker sends notification and (claimant)legal rep respond to notification',
  async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, caseWorkerNotificationPage, legalRepNotificationPage }) => {
    const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
    await page.click('text=Sign out');

    await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
    await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, false);
    await page.click('text=Sign out');

    //caseworker send notification
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    await caseWorkerNotificationPage.navigateToSendANotifications();
    const notificationTitle = await caseWorkerNotificationPage.sendNotification('ET1 claim', 'Yes', 'Both parties');
    await caseListPage.signoutButton();

    //respond as a (claimant) Legal rep
    await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
    await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    //respond to an application
    await caseListPage.clickTab('Judgment');
    await legalRepNotificationPage.respondToTribunal(
      {
        notificationName: notificationTitle,
        responseText: 'Responding to notification from tribunal - claimant legal rep',
        supportingMaterialFiles: [],
        notifyOtherParty: 'Yes'
      }
    )

  });

//RET-5924
  test.skip('Perform NOC using respondent details, caseworker sends notification and (respondent)legal rep respond to notification',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, caseWorkerNotificationPage, legalRepNotificationPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
      await page.click('text=Sign out');

      //caseworker send notification
      await page.goto(config.TestUrlForManageCaseAAT);
      await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

      await caseWorkerNotificationPage.navigateToSendANotifications();
      const notificationTitle = await caseWorkerNotificationPage.sendNotification('ET1 claim', 'Yes', 'Both parties');
      await caseListPage.signoutButton();

      //respond as a (respondent) Legal rep
      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

      //respond to an application
      await caseListPage.clickTab('Judgment');
      await legalRepNotificationPage.respondToTribunal(
        {
          notificationName: notificationTitle,
          responseText: 'Responding to notification from tribunal - claimant legal rep',
          supportingMaterialFiles: [],
          notifyOtherParty: 'Yes'
        }
      )
    });

});
