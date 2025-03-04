import {test} from "../fixtures/common.fixture";
let caseNumber: any;
let subRef;


test.describe('Work Allocation', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));


    });

    test('CTSC user assign a task to itself and completes a task(et1vetting)', async ({ caseListPage, bfActionPage }) => {

    });

});



