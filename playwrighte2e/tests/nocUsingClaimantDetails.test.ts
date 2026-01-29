import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { Events } from '../config/case-data.ts';

let subRef: string, submissionRef: string;
let caseNumber: string;

test.describe('perform NOC for Claimant', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5954
  test('Caseworker assigns a claimant representative via manage case',
    async ({ page, caseListPage, claimantRepresentativePage, citizenHubLoginPage, citizenHubPage, caseDetailsPage }) => {
      //Caseworker assign a claimant representative
      await caseListPage.selectNextEvent(Events.claimantRepresentative.listItem);
      await claimantRepresentativePage.addClaimantRepresentative();
      await caseListPage.navigateToTab('Claimant Representative');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Claimant Representative',
          tabContent: [
            { tabItem:'Name of Representative', value: 'Test Claimant Representative' },
            { tabItem:'Name:', value: 'ET Test Factory Solicitor' }
          ]
        }
      ])
      await page.click('text=Sign out');

      //citizen validates notification banner
      await citizenHubLoginPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(subRef);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.verifyLegalRepNotificationBanner();
      await citizenHubPage.contactTheTribunalLink();
    });
});
