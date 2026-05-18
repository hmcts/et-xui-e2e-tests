import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { users } from '../config/config.dynamic.ts';
import CitizenHubLoginPage from '../pages/claimantCitizenHub/CitizenHubLoginPage.ts';
import CitizenHubPage from '../pages/claimantCitizenHub/CitizenHubPage.ts';
import ContactTheTribunalPage from '../pages/claimantCitizenHub/ContactTheTribunalPage.ts';
import { ManageCaseDashboardPage } from '../pages/ManageCaseDashboardPage.ts';
import LoginPage from '../pages/loginPage.ts';
import CaseDetailsPage from '../pages/caseDetailsPage.ts';

let caseId: string;
let caseNumber: string;

test.describe('Citizen applications', () => {
  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })
  //RET-5818
  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  });

  test('Citizen make an application, legal rep respond to it and caseworker validate documents - England', async ({
    manageCaseDashboardPage,
    loginPage,
    nocPage,
    applicationTabPage,
    caseDetailsPage,
    browserUtils
  }) => {

    // perform NOC
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      users.etLegalRepresentative
    );
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

    // Citizen rep make an application
    const citizenBrowserPage = await browserUtils.openNewBrowserContext(users.etClaimant.sessionFile);
    const citizenHubLoginPage = new CitizenHubLoginPage(citizenBrowserPage);
    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    const citizenHubPage = new CitizenHubPage(citizenBrowserPage);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.navigateToContactTheTribunalPage();
    const contactTheTribunalPage = new ContactTheTribunalPage(citizenBrowserPage);
    await contactTheTribunalPage.makeApplicationToTribunal(
      'change personal details',
      'Citizen made an application',
      'Yes',
    );
    await contactTheTribunalPage.clickSubmitButton();
    await contactTheTribunalPage.assertApplicationSentSuccessPageIsDisplayed();
    await contactTheTribunalPage.clickCloseAndReturn();
    await citizenBrowserPage.close();

    // Legal Rep respond to an application
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      users.etLegalRepresentative
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPage.navigateToTab('Applications');
    await applicationTabPage.legalRepRespondToAnApplication('Change my personal details');

    // Caseworker validates Document tab
    const caseWorkerBrowserPage = await browserUtils.openNewBrowserContext(users.etCaseWorker.sessionFile);
    const manageCaseDashboardPageCW = new ManageCaseDashboardPage(caseWorkerBrowserPage);
    await manageCaseDashboardPageCW.visit();
    const loginPageCW = new LoginPage(caseWorkerBrowserPage);
    await loginPageCW.processLogin(users.etCaseWorker);
    caseNumber = await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    const caseDetailsPageCW = new CaseDetailsPage(caseWorkerBrowserPage);
    await caseDetailsPageCW.navigateToTab('Documents');
    await caseDetailsPageCW.assertTabData([
      {
        tabName: 'Documents',
        tabContent: [
         'Application 1 - Change my personal details - Respondent Response.pdf',
          'Application 1 - Change my personal details - Respondent Response Attachment.pdf'
        ]
      }
    ]);
  });
});
