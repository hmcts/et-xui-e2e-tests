import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Case Flag', () => {
    test.beforeEach(async () => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('Create and remove case Flag for E/W-Single case', {tag: '@demo'}, async ({ manageCaseDashboardPage, loginPage, caseListPage, createCaseFlagPage, manageCaseFlagPage }) => {
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        //Create case flag
        await caseListPage.selectNextEvent('Create a case flag');
        await createCaseFlagPage.createCaseFlag();

        //remove case flag
        await caseListPage.selectNextEvent('Manage case flags');
        await manageCaseFlagPage.manageCaseFlag();
    });
});

test.describe('Case Flag', () => {
        test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
          ({ caseId, caseNumber } = await CaseworkerCaseFactory.createScotlandAndAcceptCase());
          await manageCaseDashboardPage.visit();
          await loginPage.processLogin(
            config.etCaseWorker.email,
            config.etCaseWorker.password,
            config.loginPaths.worklist,
          );
          caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);
        });

        test('Create and remove case Flag for Scotland-Single case', {tag: '@demo'}, async ({ caseListPage, createCaseFlagPage, manageCaseFlagPage }) => {

            //Create case flag
            await caseListPage.selectNextEvent('Create a case flag');
            await createCaseFlagPage.createCaseFlag();

            //remove case flag
            await caseListPage.selectNextEvent('Manage case flags');
            await manageCaseFlagPage.manageCaseFlag();
        });
    });
