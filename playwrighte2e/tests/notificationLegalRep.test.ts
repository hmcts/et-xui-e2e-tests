import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { LegalRepCaseFactory } from '../data-utils/factory/exui/LegalRepCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Legal Representative Notifications', () => {
  //RET-5309
  test(
    'Legal Representative creates a claim and tribunal sends notification, Legal Rep view notification',
    { tag: '@demo' },
    async ({ manageCaseDashboardPage, caseWorkerNotificationPage, caseListPage, loginPage }) => {
      ({ caseId, caseNumber } = await LegalRepCaseFactory.createAndProgressToSubmitEnglandWalesCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //send Notification
      await caseWorkerNotificationPage.navigateToSendANotifications();
      await caseWorkerNotificationPage.sendNotification('ET1 claim');
      await manageCaseDashboardPage.signOut();

      //view Notification as Legal rep
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      await caseListPage.navigateToCaseDetails(caseId, 'EnglandWales');
      await caseWorkerNotificationPage.viewNotification();
    },
  );
});
