import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

test.describe('England - Caseworker Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales', async ({ page, et1CaseServingPage, bundleSteps }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await bundleSteps.submitHearingPreparationDocument(page, 'EnglandWales', subRef, respondentName, firstName, lastName);
    });
});

test.describe('Scotland - Caseworker Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland"));
    });

    test('Bundles - Legal rep submit hearing preparation document - Scotland', async ({ page, et1CaseServingPage, bundleSteps }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        await bundleSteps.submitHearingPreparationDocument(page, 'Scotland', subRef, respondentName, firstName, lastName);
    });
});

test.describe('England - Claimant Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep}) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Bundles - Claimant Submitting hearing preparation document - England',
        async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, citizenHubPage }) => {

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales', 1,false);
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);

        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.verifyCitizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.regAccountContactTribunal('submit document for hearing');
        await citizenHubPage.submitDocumentForHearingClaimant();
    });

});


