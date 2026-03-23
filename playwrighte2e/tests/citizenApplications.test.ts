import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;

test.describe('Citizen applications', () => {
  //RET-5818
  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  });

  test('Citizen make an application, legal rep respond to it and caseworker validate documents - England', async ({
    page,
    manageCaseDashboardPage,
    citizenHubLoginPage,
    citizenHubPage,
    loginPage,
    nocPage,
    caseListPage,
    applicationTabPage,
    caseDetailsPage,
    contactTheTribunalPage,
  }) => {

    // perform NOC
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
    await manageCaseDashboardPage.signOut();

    // Citizen rep make an application
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.navigateToContactTheTribunalPage();
    await contactTheTribunalPage.makeApplicationToTribunal(
      'change personal details',
      'Citizen made an application',
      'Yes',
    );
    await contactTheTribunalPage.clickSubmitButton();
    await contactTheTribunalPage.assertApplicationSentSuccessPageIsDisplayed();
    await contactTheTribunalPage.clickCloseAndReturn();
    await manageCaseDashboardPage.signOut();

    // Legal Rep respond to an application
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseListPage.navigateToTab('Applications');
    await applicationTabPage.legalRepRespondToAnApplication('Change my personal details');
    await manageCaseDashboardPage.signOut();

    // Caseworker validates Document tab
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    await caseListPage.navigateToTab('Documents');
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Documents',
        tabContent: [
         'Application 1 - Change my personal details - Respondent Response.pdf',
          'Application 1 - Change my personal details - Respondent Response Attachment.pdf'
        ]
      }
    ])
    await manageCaseDashboardPage.signOut();
  });
});
