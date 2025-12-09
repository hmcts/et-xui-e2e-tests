import { test } from '../fixtures/common.fixture';
import { params } from "../config/config";
import { Events } from '../config/case-data';

let subRef: string;
let caseNumber: string;

test.describe('E/W Hearing Reports', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Generate Hearing Reports for Newcastle office',
      async ({caseListPage, listHearingPage, caseDetailsPage }) => {
        //List 1 hearing for the case

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales', 0, 'Newcastle CFCTC');
        await caseDetailsPage.checkHasBeenCreated(Events.listHearing);

        await caseListPage.searchHearingReports('Eng/Wales - Hearings/Reports', 'Hearing Documents', 'Newcastle');
        await caseListPage.selectHearingReport();
        await caseListPage.selectNextEvent('Generate Report');
        await caseListPage.generateReport();
        await caseListPage.validateHearingReport(caseNumber);
    });
});
