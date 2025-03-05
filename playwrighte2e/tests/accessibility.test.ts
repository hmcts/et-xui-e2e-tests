import { test } from '../fixtures/common.fixture';

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {
        
        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('Scan exui pages', {tag: '@accessibility'}, async ({ accessibilitySteps }) => {
        
        await accessibilitySteps.scanExuiPages();
    });
});