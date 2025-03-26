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
            (referralPage) => referralPage.sendNewReferral(),
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

});



