import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';

let caseId: string;
let caseNumber: string;

test.describe('Accessibility test', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test(
    'Scan exui pages- Caseworker journey',
    { tag: '@accessibility' },
    async ({ page, accessibilitySteps, axeUtils }) => {
      await accessibilitySteps.scanExuiPages(page, axeUtils);
    },
  );

  test(
    'Scan exui pages- Legal Representative journey',
    { tag: '@accessibility' },
    async ({ page, caseListPage, et1CaseServingPage, accessibilitySteps, axeUtils }) => {
      //RET-5787
      await caseListPage.navigateToTab('Claimant');
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await accessibilitySteps.scanLegalRepApplicationPages(
        page,
        caseId,
        caseNumber,
        firstName,
        lastName,
        true,
        axeUtils,
      );
    },
  );

  test(
    'Scan exui pages- Work allocation journey',
    { tag: '@accessibility' },
    async ({ page, accessibilitySteps, axeUtils }) => {
      await accessibilitySteps.scanWAPages(page, caseId, axeUtils);
    },
  );
});
