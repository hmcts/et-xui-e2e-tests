import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

test.describe('IC Upload documents', () => {
  let caseId: string, caseNumber: string;

  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });

  test(
    'Judge uploads Internal consideration document',
    { tag: '@demo' },
    async ({ manageCaseDashboardPage, caseListPage, loginPage, icUploadDocPage, caseDetailsPage }) => {
      await manageCaseDashboardPage.visit();
      //judge log in
      await loginPage.processLogin(
        config.etEnglandJudge.email,
        config.etEnglandJudge.password,
        config.loginPaths.cases,
      );
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      await caseListPage.selectNextEvent('Initial Consideration');

      //judge uploads document
      await icUploadDocPage.judgeUploadsDocument();
      await caseListPage.navigateToTab('ICTab');

      //verify the uploaded document details
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Initial Consideration',
          tabContent: [
            { tabItem: 'Initial Consideration Document', value: 'Initial Consideration.pdf' },
            { tabItem: 'Document', value: 'test-doc.pdf' },
            { tabItem: 'Initial consideration completed by:', value: 'ET Judge1' },
          ],
        },
      ]);
    },
  );
});
