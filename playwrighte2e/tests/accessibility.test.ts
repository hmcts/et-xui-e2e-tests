import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep, axeUtils }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true, axeUtils));
    });

    test('Scan exui pages- Caseworker journey', {tag: '@accessibility'}, async ({ page, accessibilitySteps, axeUtils }) => {
        await accessibilitySteps.scanExuiPages(page, axeUtils);
    });

});

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        //accessibility test not needed for pre steps
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Scan exui pages- Legal Representative journey', {tag: '@accessibility'}, async ({ page, et1CaseServingPage, accessibilitySteps, axeUtils }) => {

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await accessibilitySteps.scanLegalRepApplicationPages(page, subRef, respondentName, firstName, lastName, true, axeUtils);
    });

    test('Scan exui pages- Work allocation journey', {tag: '@accessibility'}, async ({ page, accessibilitySteps, axeUtils}) => {
        await accessibilitySteps.scanWAPages(page, subRef, axeUtils);
    });
});
