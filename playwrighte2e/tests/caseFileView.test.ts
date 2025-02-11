import { test } from '../fixtures/common.fixture';

test.describe('Case File View', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {
        
        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - England-Singles', async ({ applicationTabPage }) => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});

test.describe('Case File View', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland");
    });

    test('Case File View - Check ET 1 Claim in CFV folder - Scotland-Singles', async ({ applicationTabPage }) => {
        // Check case file view
        await applicationTabPage.selectCaseFileView();
    });
});
