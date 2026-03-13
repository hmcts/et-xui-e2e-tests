import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';

let caseId: string;
let caseNumber: string;

test.describe('Accessibility test', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test('Scan exui pages- Caseworker journey', { tag: '@accessibility' }, async ({ axeUtils, caseListPage }) => {
    await axeUtils.audit();

    //Scan case tabs
    await caseListPage.navigateToTab('Claimant');
    await axeUtils.audit();

    await caseListPage.navigateToTab('ET1 Vetting');
    await axeUtils.audit();

    await caseListPage.navigateToTab('Respondent');
    await axeUtils.audit();

    await caseListPage.navigateToTab('Jurisdictions');
    await axeUtils.audit();

    await caseListPage.navigateToTab('Referrals');
    await axeUtils.audit();

    await caseListPage.navigateToTab('Initial Consideration');
    await axeUtils.audit();

    // await this.caseListPage.navigateToTab('Judgments');
    // await axeUtils.audit();

    await caseListPage.navigateToTab('History');
    await axeUtils.audit();

    // await this.caseListPage.selectNextEvent('ET3 Processing');
    // await this.caseListPage.delay(2000);
    // await this.scanEt3ProcessingEvent(page); // et3 processing (Got accessibility error)
  });

  test(
    'Scan exui pages- Legal Representative journey',
    { tag: '@accessibility' },
    async ({ caseListPage, applicationTabPage,  loginPage, axeUtils, manageCaseDashboardPage, nocPage }) => {
      //RET-5787
      await manageCaseDashboardPage.signOut();
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber, true, axeUtils);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //legal rep make an application
      await caseListPage.navigateToTab('Applications');
      await applicationTabPage.enterDetailsForMakingApplication('Amend response',axeUtils);
    },
  );

  test(
    'Scan exui pages- Work allocation journey',
    { tag: '@accessibility' },
    async ({ manageCaseDashboardPage, axeUtils, caseListPage, loginPage }) => {
      await manageCaseDashboardPage.signOut();
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      await caseListPage.delay(2000);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      // await page.goto(`${config.TestUrlForManageCaseAAT}/cases/case-details/${subRef}`);
      await caseListPage.navigateToTab('Case list');
      await caseListPage.delay(2000);
      await axeUtils.audit();

      /* (Got accessibility error)
      await this.caseListPage.navigateToTab('All work');
      await this.caseListPage.delay(2000);
      await axeTest(page);
      await this.caseListPage.delay(3000);
      */

      await caseListPage.navigateToTab('My work');
      await caseListPage.delay(2000);
      await axeUtils.audit();
    },
  );
});
