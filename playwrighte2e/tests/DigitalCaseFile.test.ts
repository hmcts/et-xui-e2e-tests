import { test } from "../fixtures/common.fixture";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Digital Case File', () => {
    test.beforeEach(async () => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('Create a claim, perform DCF event', {tag: '@demo'}, async ({manageCaseDashboardPage, loginPage, caseListPage, uploadDocumentPage, caseDetailsPage}) => {
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

      await caseListPage.selectNextEvent('Upload Document');
      await uploadDocumentPage.uploadCaseManagementDocument();
      await caseListPage.navigateToTab('Documents');
      await uploadDocumentPage.createDCF();
      await caseListPage.navigateToTab('Documents');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Documents',
          tabContent:[
            'Digital Case File',
            { tabItem: 'Status', value:'DCF Updating:', exact: false },
          ]
        }
      ])
      await manageCaseDashboardPage.signOut();
    });
});
