import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseId: string, caseNumber: string;

test.describe('Case File View', () => {
    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

    test('Case File View - Check ET 1 Claim in CFV folder - England-Singles', {tag: '@demo'}, async ({applicationTabPage }) => {
      // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});

test.describe('Case File View', () => {
    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createScotlandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);
    });

    test('Case File View - Check ET 1 Claim in CFV folder - Scotland-Singles', {tag: '@demo'}, async ({ applicationTabPage }) => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});
