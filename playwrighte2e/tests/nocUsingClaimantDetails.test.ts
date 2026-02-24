import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;

test.describe('perform NOC for Claimant', () => {

  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  //RET-5954
  test('Caseworker assigns a claimant representative via manage case', async ({
    manageCaseDashboardPage,
    caseListPage,
    claimantRepresentativePage,
    citizenHubLoginPage,
    citizenHubPage,
    caseDetailsPage,
  }) => {
    //Caseworker assign a claimant representative
    await caseListPage.selectNextEvent(Events.claimantRepresentative.listItem);
    await claimantRepresentativePage.addClaimantRepresentative();
    await caseListPage.navigateToTab('Claimant Representative');
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Claimant Representative',
        tabContent: [
          { tabItem: 'Name of Representative', value: 'Test Claimant Representative' },
          { tabItem: 'Name:', value: 'ET Test Factory Solicitor' },
        ],
      },
    ]);
    await manageCaseDashboardPage.signOut();

    //citizen validates notification banner
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.verifyLegalRepNotificationBanner();
    await citizenHubPage.contactTheTribunalLink();
  });
});
