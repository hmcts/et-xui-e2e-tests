import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true));
    });

    test('Scan exui pages- Caseworker journey', {tag: '@accessibility'}, async ({ page, accessibilitySteps }) => {
        await accessibilitySteps.scanExuiPages(page);
    });

});

test.describe('Accessibility test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        //accessibility test not needed for pre steps
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    //RET-5787
    test.skip('Scan exui pages- Legal Representative journey', {tag: '@accessibility'}, async ({ page, et1CaseServingPage, accessibilitySteps }) => {

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await accessibilitySteps.scanLegalRepApplicationPages(page, subRef, caseNumber, firstName, lastName, true);
    });

    test('Scan exui pages- Work allocation journey', {tag: '@accessibility'}, async ({ page, accessibilitySteps}) => {
        await accessibilitySteps.scanWAPages(page, subRef);
    });
});
