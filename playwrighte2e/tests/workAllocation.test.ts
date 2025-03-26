import {test} from "../fixtures/common.fixture";
import {Helpers} from "../helpers/helper";
import {params} from "../utils/config";
let caseNumber: any;
let subRef;

const referralData = require('../data/ui-data/referral-content.json');

test.describe('Work Allocation', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, false, false));

    });

    test('CTSC user assign a task to itself and completes a task', async ({ page, caseListPage, createCaseStep }) => {
        //user completes a task
        await caseListPage.navigateToTab('Tasks');
        await Helpers.assignTaskToMeAndTriggerNextSteps(page, "Et1 Vetting", "ET1 Vetting");
        await createCaseStep.completeEt1VettingTask();
    });

    test('Caseworker sends Referral- Referral task generated, Judge assign and completes referral task', async ({ page, caseListPage, referralSteps, loginPage }) => {
        //send referral
        await referralSteps.processReferrals(referralData.createNewReferral,
            (referralPage) => referralPage.sendNewReferral(false),
            (caseListPage) => caseListPage.verifyReferralDetails()
        );
        //sign out as caseworker
        await caseListPage.signoutButton();

        //log in as judge & assign and completes a task
        await loginPage.processLogin(params.TestEnvETJudgeUserWorkAllocation, params.TestEnvETJudgeUserPasswordWorkAllocation);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();
        await caseListPage.clickTab('Tasks');

        await Helpers.assignTaskToMeAndTriggerNextSteps(page, "Review Referral #1 - ET1", "Reply to the Referral");
        await referralSteps.processReferralsForWa(
            (referralPage) => referralPage.replyToReferral(),
        );
    });


    test('Roles and Access', async ({ page,createCaseStep,caseListPage, rolesAndAccessPage , referralSteps, taskPage}) => {
        //Note: if this test seems flaky- assign both tasks to the user than complete eT1vetting task from task list
        await caseListPage.clickTab('Tasks');
        await Helpers.waitForTask(page, 'Et1 Vetting');
        await caseListPage.clickTab('Roles and access');
         await rolesAndAccessPage.assignAccessToCtscUser();

         //new task - send a referral
        await referralSteps.processSendReferralsForWa(referralData.createNewReferral,
            (referralPage) => referralPage.sendNewReferral(true));

        await caseListPage.clickTab('Tasks');
        await Helpers.waitForTask(page,'Review Referral #1 - ET1');
        await taskPage.validateTaskAssignToUser();
    });

});

    test.describe('Work Allocation- Judge completes tasks', () => {

        test.beforeEach(async ({ page, createCaseStep }) => {

            ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
        });

        test('Judge completes Draft and sign document task', async ({ page,caseListPage, listHearingPage, hearingDetailsPage, loginPage, draftJudgementPage }) => {

            //list past hearing
            await caseListPage.selectNextEvent('List Hearing');
            await listHearingPage.listCase('EnglandWales', 1,false);

            //update hearing
            await caseListPage.selectNextEvent('Hearing Details');
            await hearingDetailsPage.updateHearing();
            //wait for draft and sign document task
            await caseListPage.clickTab('Tasks');
            await Helpers.waitForTask(page,'Draft And Sign Judgment');
             await caseListPage.signoutButton();

            //login as judge and assign a task
            await loginPage.processLogin(params.TestEnvETJudgeUserWorkAllocation, params.TestEnvETJudgeUserPasswordWorkAllocation);
            await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
            await caseListPage.processCaseFromCaseList();
            await caseListPage.clickTab('Tasks');

            await Helpers.assignTaskToMeAndTriggerNextSteps(page, "Draft And Sign Judgment", 'Draft and Sign Judgement');
            await draftJudgementPage.submitDraftJudgement();
        });
    });




