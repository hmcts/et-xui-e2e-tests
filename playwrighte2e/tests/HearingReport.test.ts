import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('E/W Hearing Reports', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Generate Hearing Reports for Newcastle office', async ({ page, caseListPage, listHearingPage, et1CaseServingPage, loginPage, legalRepPage }) => {

        //Retrieve claimant's first name and last name for NoC
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        //List 2 hearings for the case
        const hearingNumbers: number[] = [1];
        for(const number of hearingNumbers) {
            await caseListPage.selectNextEvent('List Hearing');
            await listHearingPage.listCase('EnglandWales', number, true);
        }
        await caseListPage.searchHearingReports('Eng/Wales - Hearings/Reports', 'Hearing Documents', 'Newcastle');
        await caseListPage.selectHearingReport();
        await caseListPage.selectNextEvent('Generate Report');
        await caseListPage.generateReport();
        await caseListPage.validateHearingReport(caseNumber);
    });
});
