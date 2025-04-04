import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Upload hearing docs test', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('for respondent - verify only future hearings are shown in options', {tag: '@demo'}, async ({ page, caseListPage, listHearingPage, et1CaseServingPage, loginPage, legalRepPage }) => {

        //Retrieve claimant's first name and last name for NoC
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        //List 2 hearings for the case
        const hearingNumbers: number[] = [1, 2];
        for(const number of hearingNumbers) {
            await caseListPage.selectNextEvent('List Hearing');
            await listHearingPage.listCase('EnglandWales', number, false);
        }
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();
        await caseListPage.selectNextEvent('Upload documents for hearing');

        //Verify only future hearings are shown in the options
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Respondent', 'Witness statement only', true);
        await legalRepPage.verifyHearingDocumentTabLegalRep();
        await legalRepPage.verifyHearingDocumentReceipientValues("Whose hearing documents are you uploading?", "Respondent's documents only");
    });
});
