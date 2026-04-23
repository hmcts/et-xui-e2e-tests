import { test } from '../fixtures/common.fixture';
import { Helpers } from '../pages/helpers/Helper.ts';
import config from '../config/config';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
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
    caseDetailsPage,
    et1VettingPage,
  }) => {
    //user completes a task
    await caseDetailsPage.navigateToTab('Tasks');
    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'Et1 Vetting', 'ET1 Vetting');
    await et1VettingPage.processET1CaseVettingPages();
  });

  test('Caseworker sends Referral- Referral task generated, Judge assign and completes referral task', async ({
    page,
    manageCaseDashboardPage,
    referralPage,
    loginPage, caseDetailsPage
  }) => {
    //send referral
    await caseDetailsPage.navigateToTab('Referrals');
    await caseDetailsPage.verifyAndClickLinkInTab('Send a new referral');
    await referralPage.sendNewReferral(false);

    //verify referral details
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Referrals',
        tabContent: [
          { tabItem: 'ET1', value: 'ET Caseworker1 | Judge | Yes', clickable: true },
          'Awaiting instructions',
          { tabItem: 'Details of the referral', value: 'This is a test referral' },
        ]
      }
    ]);

    //sign out as caseworker
    await manageCaseDashboardPage.signOut();

    //log in as judge & assign and completes a task
    await loginPage.processLogin(
      config.etWorkAllocationJudge.email,
      config.etWorkAllocationJudge.password,
      config.loginPaths.cases,
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPage.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'EJ - Review Referral #1 - ET1', 'Reply to the Referral');
    await referralPage.replyToReferral();
  });

  test('Roles and Access', async ({ page, caseListPage, rolesAndAccessPage, referralPage, taskPage, caseDetailsPage }) => {
    await caseDetailsPage.navigateToTab('Tasks');
    await Helpers.waitForTask(page, 'Et1 Vetting');
    await caseDetailsPage.navigateToTab('Roles and access');
    await rolesAndAccessPage.assignAccessToCtscUser();

    //new task - send a referral
    await caseDetailsPage.navigateToTab('Referrals');
    await caseDetailsPage.verifyAndClickLinkInTab('Send a new referral');
    await referralPage.sendNewReferral(true);

    await caseDetailsPage.navigateToTab('Tasks');
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
    draftJudgementPage, caseDetailsPage
  }) => {
    //list past hearing
    await caseDetailsPage.selectNextEvent(Events.listHearing);
    await listHearingPage.listCase('EnglandWales', 0, 'Leeds ET');

    //update hearing
    await caseDetailsPage.selectNextEvent(Events.hearingDetails);
    await hearingDetailsPage.updateHearing();
    //wait for draft and sign document task
    await caseDetailsPage.navigateToTab('Tasks');
    await Helpers.waitForTask(page, 'Draft And Sign Judgment');
    await caseListPage.signoutButton();

    //login as judge and assign a task
    await loginPage.processLogin(
      config.etWorkAllocationJudge.email,
      config.etWorkAllocationJudge.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPage.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(page, 'Draft And Sign Judgment/Order', 'Draft and Sign Judgment');
    await draftJudgementPage.submitDraftJudgement();
  });
});
