import { test } from '../../fixtures/common.fixture.ts';
import { CitizenClaimantFactory } from '../../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../../config/case-data.ts';
import { CaseEventApi } from '../../data-utils/api/CaseEventApi.ts';
import { users } from '../../config/config.dynamic.ts';
import CitizenHubLoginPage from '../../pages/claimantCitizenHub/CitizenHubLoginPage.ts';
import CitizenHubPage from '../../pages/claimantCitizenHub/CitizenHubPage.ts';
import ContactTheTribunalPage from '../../pages/claimantCitizenHub/ContactTheTribunalPage.ts';
import { ManageCaseDashboardPage } from '../../pages/ManageCaseDashboardPage.ts';
import LoginPage from '../../pages/loginPage.ts';
import CaseDetailsPage from '../../pages/caseDetailsPage.ts';
import { ApplicationTabPage } from '../../pages/applicationTabPage.ts';
import Et3LoginPage from '../../pages/respondentCitizenHub/et3LoginPage.ts';

let caseId: string;
let caseNumber: string;

test.describe('Citizen applications', () => {
  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })

  //RET-5818
  test('Citizen make an application with 1 respondent, legal rep respond to it and caseworker validate documents - England', async ({
    manageCaseDashboardPage,
    loginPage,
    nocPage,
    applicationTabPage,
    caseDetailsPage,
    browserUtils
  }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));

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

test.describe('Citizen with 2 respondent case applications', () => {

  test.use({
    storageState: users.etClaimant.sessionFile,
  })

  test('Multiple respondents, Citizen make application, Respondent response with R92 No, other should not see each other responses',
    async ({
             citizenHubLoginPage,
             contactTheTribunalPage,
             citizenHubPage,
             browserUtils

      }) => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales, true);
      ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));

      // respondents assign case to themselves in SYR
      const respondent1BrowserPage = await browserUtils.openNewBrowserContext(users.etRespondent.sessionFile);
      const et3LoginPage1 = new Et3LoginPage(respondent1BrowserPage);
      await et3LoginPage1.processLogin(users.etRespondent);
      await et3LoginPage1.replyToNewClaim(caseId, caseNumber, CaseDetailsValues.respondentName, CaseDetailsValues.claimantFirstName, CaseDetailsValues.claimantLastName);

      const respondent2BrowserPage = await browserUtils.openNewBrowserContext(users.etRespondent2.sessionFile);
      const et3LoginPage2 = new Et3LoginPage(respondent2BrowserPage);
      await et3LoginPage2.processLogin(users.etRespondent);
      await et3LoginPage2.replyToNewClaim(caseId, caseNumber, CaseDetailsValues.respondentName2, CaseDetailsValues.claimantFirstName, CaseDetailsValues.claimantLastName);

      // Citizen makes application
      await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
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

      // Caseworker responds to the application
      const caseWorkerBrowserPage = await browserUtils.openNewBrowserContext(users.etCaseWorker.sessionFile);
      const manageCaseDashboardPageCW = new ManageCaseDashboardPage(caseWorkerBrowserPage);
      await manageCaseDashboardPageCW.visit();
      const loginPageCW = new LoginPage(caseWorkerBrowserPage);
      await loginPageCW.processLogin(users.etCaseWorker);
      caseNumber = await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      const applicationTabPage = new ApplicationTabPage(caseWorkerBrowserPage);
      await applicationTabPage.caseWorkerRespondToAnApplication('Amend claim');

      // Respondent 1 responds to the application


  });
});
