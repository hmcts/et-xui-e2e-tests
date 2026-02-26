import { test } from '../fixtures/common.fixture';
import { Helpers } from '../pages/helpers/Helper.ts';
import config from '../config/config';
import referralData from '../resources/payload/referral-content.json';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';

let caseNumber: string;
let caseId: string;

test.describe('Work Allocation', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test('CTSC user assign a task to itself and completes a task', async ({
    page,
    caseListPage,
    et1VettingPage,
  }) => {
    //user completes a task
    await caseListPage.navigateToTab('Tasks');
    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'Et1 Vetting', 'ET1 Vetting');
    await et1VettingPage.processET1CaseVettingPages();
  });

  test('Caseworker sends Referral- Referral task generated, Judge assign and completes referral task', async ({
    page, manageCaseDashboardPage,
    caseListPage,
    referralSteps,
    loginPage,
  }) => {
    //send referral
    await referralSteps.processReferrals(
      referralData.createNewReferral,
      referralPage => referralPage.sendNewReferral(false),
      caseListPage => caseListPage.verifyReferralDetails(),
    );
    //sign out as caseworker
    await caseListPage.signoutButton();

    //log in as judge & assign and completes a task
    await loginPage.processLogin(
      config.etWorkAllocationJudge.email,
      config.etWorkAllocationJudge.password,
      config.loginPaths.cases
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseListPage.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'Review Referral #1 - ET1', 'Reply to the Referral');
    await referralSteps.processReferralsForWa(referralPage => referralPage.replyToReferral());
  });

  test('Roles and Access', async ({
    page,
    caseListPage,
    rolesAndAccessPage,
    referralSteps,
    taskPage,
  }) => {
    await caseListPage.navigateToTab('Tasks');
    await Helpers.waitForTask(page, 'Et1 Vetting');
    await caseListPage.navigateToTab('Roles and access');
    await rolesAndAccessPage.assignAccessToCtscUser();

    //new task - send a referral
    await referralSteps.processSendReferralsForWa(referralData.createNewReferral, referralPage =>
      referralPage.sendNewReferral(true),
    );

    await caseListPage.navigateToTab('Tasks');
    await Helpers.waitForTask(page, 'Review Referral #1 - ET1');
    await taskPage.validateTaskAssignToUser();
  });
});

test.describe('Work Allocation- Judge completes tasks', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test('Judge completes Draft and sign document task', async ({
    page, manageCaseDashboardPage,
    caseListPage,
    listHearingPage,
    hearingDetailsPage,
    loginPage,
    draftJudgementPage,
  }) => {
    //list past hearing
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPage.listCase('EnglandWales', 0, 'Leeds ET');

    //update hearing
    await caseListPage.selectNextEvent('Hearing Details');
    await hearingDetailsPage.updateHearing();
    //wait for draft and sign document task
    await caseListPage.navigateToTab('Tasks');
    await Helpers.waitForTask(page, 'Draft And Sign Judgment');
    await caseListPage.signoutButton();

    //login as judge and assign a task
    await loginPage.processLogin(
      config.etWorkAllocationJudge.email,
      config.etWorkAllocationJudge.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseListPage.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'Draft And Sign Judgment', 'Draft and Sign Judgment');
    await draftJudgementPage.submitDraftJudgement();
  });
});
