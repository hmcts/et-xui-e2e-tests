import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {
        
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true));
    });

    test('Scan exui pages', {tag: '@accessibility'}, async ({ page, accessibilitySteps, et1CaseServingPage }) => {

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();     
        await accessibilitySteps.scanExuiPages(page, subRef, respondentName, firstName, lastName);
    });
});