import { test } from '../../fixtures/common.fixture.ts';
import { Helpers } from '../../pages/helpers/Helper.ts';
import { CaseTypeLocation, Events } from '../../config/case-data.ts';
import { CaseworkerCaseFactory } from '../../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CitizenClaimantFactory } from '../../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { users } from '../../config/config.dynamic.ts';
import LoginPage from '../../pages/loginPage.ts';
import { ManageCaseDashboardPage } from '../../pages/ManageCaseDashboardPage.ts';
import CaseDetailsPage from '../../pages/caseDetailsPage.ts';
import ReferralPage from '../../pages/referralPage.ts';
import DraftJudgementPage from '../../pages/events/draftJudgementPage.ts';

let caseNumber: string;
let caseId: string;
// TODO: remove test.fail once work allocation user role is fixed.
test.describe('Work Allocation', () => {
  test.use({
    storageState: users.etCaseWorker.sessionFile,
  })
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test.fail('CTSC user assign a task to itself and completes a task', async ({
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
    referralPage, caseDetailsPage, browserUtils
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
          { tabItem: 'ET1', value: 'ET | Judge | Yes', clickable: true, exact: false },
          'Awaiting instructions',
          { tabItem: 'Details of the referral', value: 'This is a test referral' },
        ]
      }
    ]);

    //log in as judge & assign and completes a task
    const judgeBrowserPage = await browserUtils.openNewBrowserContext(users.etWorkAllocationJudge.sessionFile);
    const loginPage= new LoginPage(judgeBrowserPage);
    const manageCaseDashboardPage = new ManageCaseDashboardPage(judgeBrowserPage);
    const caseDetailsPageJudge = new CaseDetailsPage(judgeBrowserPage);
    const referralPageJudge = new ReferralPage(judgeBrowserPage);
    await loginPage.processLogin(
      users.etWorkAllocationJudge
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageJudge.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(judgeBrowserPage, 'EJ - Review Referral #1 - ET1', 'Reply to the Referral');
    await referralPageJudge.replyToReferral();
  });

  test.fail('Roles and Access', async ({ page, rolesAndAccessPage, referralPage, taskPage, caseDetailsPage }) => {
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
  test.use({
    storageState: users.etCaseWorker.sessionFile
  })
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test.fail('Judge completes Draft and sign document task', async ({
    page,
    listHearingPage,
    hearingDetailsPage,
    caseDetailsPage, browserUtils
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

    //login as judge and assign a task
    const judgeBrowserPage = await browserUtils.openNewBrowserContext(users.etWorkAllocationJudge.sessionFile);
    const loginPage= new LoginPage(judgeBrowserPage);
    const manageCaseDashboardPage = new ManageCaseDashboardPage(judgeBrowserPage);
    const caseDetailsPageJudge = new CaseDetailsPage(judgeBrowserPage);
    const draftJudgementPage = new DraftJudgementPage(judgeBrowserPage);

    await loginPage.processLogin(
      users.etWorkAllocationJudge
    );
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageJudge.navigateToTab('Tasks');

    await Helpers.assignTaskToMeAndTriggerNextSteps(judgeBrowserPage, 'Draft And Sign Judgment/Order', 'Draft and Sign Judgment');
    await draftJudgementPage.submitDraftJudgement();
  });
});
