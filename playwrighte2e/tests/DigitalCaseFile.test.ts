import { test } from "../fixtures/common.fixture";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Digital Case File', () => {
    test.beforeEach(async () => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('Create a claim, perform DCF event', {tag: '@demo'}, async ({manageCaseDashboardPage, loginPage, uploadDocumentPage, caseDetailsPage}) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etCaseWorker.email,
        config.etCaseWorker.password,
        config.loginPaths.worklist,
      );

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(
        caseId,
        CaseTypeLocation.EnglandAndWales,
      );

      await caseDetailsPage.selectNextEvent(Events.uploadDocument);
      await uploadDocumentPage.uploadCaseManagementDocument();
      await caseDetailsPage.navigateToTab('Documents');
      await uploadDocumentPage.createDCF();
      await caseDetailsPage.navigateToTab('Documents');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Documents',
          tabContent: ['Digital Case File', { tabItem: 'Status', value: 'DCF Updating:', exact: false }],
        }
      ]);
      await manageCaseDashboardPage.signOut();
    });
});
