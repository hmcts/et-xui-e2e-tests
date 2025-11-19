import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Upload hearing docs test', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

  //RET-5787
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
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
        await  caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
        await caseListPage.selectNextEvent('Upload documents for hearing');

        //Verify only future hearings are shown in the options
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Respondent', 'Witness statement only', true);
        await caseListPage.navigateToTab('Hearing Documents');
        await legalRepPage.verifyHearingDocumentTabLegalRep();
        await legalRepPage.verifyHearingDocumentReceipientValues("Whose hearing documents are you uploading?", "Respondent's documents only");
    });
});
