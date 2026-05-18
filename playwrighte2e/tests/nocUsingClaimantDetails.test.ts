import { test } from '../fixtures/common.fixture';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { users } from '../config/config.dynamic.ts';
import CitizenHubLoginPage from '../pages/claimantCitizenHub/CitizenHubLoginPage.ts';
import CitizenHubPage from '../pages/claimantCitizenHub/CitizenHubPage.ts';

let caseId: string;
let caseNumber: string;

test.describe('perform NOC for Claimant', () => {
  test.use({
    storageState: users.etCaseWorker.sessionFile
  })

  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  //RET-5954
  test('Caseworker assigns a claimant representative via manage case', async ({
    claimantRepresentativePage,
    caseDetailsPage, browserUtils
  }) => {
    //Caseworker assign a claimant representative
    await caseDetailsPage.selectNextEvent(Events.claimantRepresentative);
    await claimantRepresentativePage.addClaimantRepresentative();
    await caseDetailsPage.navigateToTab('Claimant Representative');
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Claimant Representative',
        tabContent: [
          { tabItem: 'Name of Representative', value: 'Test Claimant Representative' },
          { tabItem: 'Name:', value: 'ET Test Factory Solicitor' },
        ],
      },
    ]);

    //citizen validates notification banner
    const claimantBrowserPage = await browserUtils.openNewBrowserContext(users.etClaimant.sessionFile);
    const citizenHubLoginPage = new CitizenHubLoginPage(claimantBrowserPage);
    const citizenHubPage = new CitizenHubPage(claimantBrowserPage);

    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.verifyLegalRepNotificationBanner();
    await citizenHubPage.contactTheTribunalLink();
  });
});
