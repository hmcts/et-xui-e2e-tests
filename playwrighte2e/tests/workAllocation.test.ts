import {test} from "../fixtures/common.fixture";
import {Helpers} from "../helpers/helper";
let caseNumber: any;
let subRef;


test.describe('Work Allocation', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, false));

    });

    test('CTSC user assign a task to itself and completes a task', async ({ page, caseListPage, createCaseStep }) => {
        //user completes a task
        await caseListPage.clickTab('Tasks');
        await Helpers.assignTaskToMeAndTriggerNextSteps(page, "Et1 Vetting", "ET1 Vetting");
        await createCaseStep.completeEt1VettingTask();
    });

});



