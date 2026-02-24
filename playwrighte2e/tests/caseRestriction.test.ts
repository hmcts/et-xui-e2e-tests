import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Restrict a case by applying rule 43 flag', () => {
    test.beforeEach(async () => {

      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test(
      'Create and remove case Flag for E/W-Single case',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, restrictedReportingPage }) => {
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );

        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        //Create case flag
        await caseListPage.selectNextEvent('Restricted Reporting');
        await restrictedReportingPage.selectRule49BOption();
        await restrictedReportingPage.verifyRule49BFlag();
      },
    );
});
