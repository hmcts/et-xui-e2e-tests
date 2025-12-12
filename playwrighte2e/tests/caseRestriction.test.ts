import { test } from '../fixtures/common.fixture';

test.describe('Restrict a case by applying rule 43 flag', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Create and remove case Flag for E/W-Single case', {tag: '@demo'}, async ({ caseListPage, restrictedReportingPage }) => {

        //Create case flag
        await caseListPage.selectNextEvent('Restricted Reporting');
        await restrictedReportingPage.selectRule49BOption();
        await restrictedReportingPage.verifyRule49BFlag();
    });
});
