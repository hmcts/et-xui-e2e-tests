import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

test.describe('perform NOC for Claimant', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5954
  test('Caseworker assigns a claimant representative via manage case',
    async ({ page, caseListPage, claimantRepresentativePage, citizenHubPage }) => {
      //Caseworker assign a claimant representative
      await caseListPage.selectNextEvent('Claimant Representative');
      await claimantRepresentativePage.addClaimantRepresentative();
      await caseListPage.navigateToTab('Claimant Representative');
      await claimantRepresentativePage.validateRepresentativeDetails();
      await page.click('text=Sign out');

      //citizen validates notification banner
      await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
      await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.verifyLegalRepNotificationBanner();
      await citizenHubPage.contactTheTribunalLink();
    });
});