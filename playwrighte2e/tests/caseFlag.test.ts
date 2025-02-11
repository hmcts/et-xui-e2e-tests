import { test } from '../fixtures/common.fixture';



test.describe('Case Flag', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Create and remove case Flag for E/W-Single case', async ({ caseListPage, createCaseFlagPage, manageCaseFlagPage }) => {

        //Create case flag
        await caseListPage.selectNextEvent('Create a case flag');
        await createCaseFlagPage.createCaseFlag();

        //remove case flag
        await caseListPage.selectNextEvent('Manage case flags');
        await manageCaseFlagPage.manageCaseFlag();
    });
});

test.describe('Case Flag', () => {
        test.beforeEach(async ({ page, createCaseStep }) => {

            await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland");
        });

        test('Create and remove case Flag for Scotland-Single case', async ({ caseListPage, createCaseFlagPage, manageCaseFlagPage }) => {
            
            //Create case flag
            await caseListPage.selectNextEvent('Create a case flag');
            await createCaseFlagPage.createCaseFlag();

            //remove case flag
            await caseListPage.selectNextEvent('Manage case flags');
            await manageCaseFlagPage.manageCaseFlag();
        });
    });


