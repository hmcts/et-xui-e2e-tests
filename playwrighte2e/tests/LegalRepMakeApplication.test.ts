import config from "../config/config";
import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

const respondentName = 'Mrs Test Auto';
let caseId: string;
let caseNumber: string;
let firstName: string;
let lastName: string;

test.describe('Make an application and view Recorded Decision', () => {

    test.beforeEach(async ({ manageCaseDashboardPage }) => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
      ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
      await manageCaseDashboardPage.visit();
      firstName = CaseDetailsValues.claimantFirstName;
      lastName = CaseDetailsValues.claimantLastName;
    });

    //RET-5787
    test('Legal representatives make and application - England', async ({
      manageCaseDashboardPage,
      citizenHubLoginPage,
      citizenHubPage,
      loginPage,
      legalRepPage,
      applicationTabPage, nocPage
    }) => {
      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //legal rep make an application
      await legalRepPage.legalRepMakeAnApplication();
      await manageCaseDashboardPage.signOut();

      // Claimant Reply to Application from Legal Rep
      await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
      await citizenHubPage.respondToAnApplication();
      await manageCaseDashboardPage.signOut();

      //Case Worker Request for additional information (respond to claimant's response)
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      await applicationTabPage.respondToAnApplication();
      await manageCaseDashboardPage.signOut();

      //claimant see response of respond
      await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
      await citizenHubPage.validateResponseOfResponse();
    });

    //RET-5787
    test(
      'Legal representatives make and application, caseworker record a decision, LR and citizen view a decision - E/W',
      { tag: '@demo' },
      async ({
        manageCaseDashboardPage,
        citizenHubLoginPage,
        citizenHubPage,
        loginPage,
        legalRepPage,
        applicationTabPage, nocPage
      }) => {
        await loginPage.processLogin(
          config.etLegalRepresentative.email,
          config.etLegalRepresentative.password,
          config.loginPaths.cases,
        );
        await manageCaseDashboardPage.navigateToNoticeOfChange();
        await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

        // await legalRepPage.processNOCForClaimantOrRespondent(
        //   'Eng/Wales - Singles',
        //   caseId,
        //   caseNumber,
        //   firstName,
        //   lastName,
        //   false,
        // );
        caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();
        await manageCaseDashboardPage.signOut();

        //caseworker records a decision
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        await applicationTabPage.recordADecision();
        //Legal rep view decision in an application tab
        await applicationTabPage.validateRecordDecisionDetails();
        await manageCaseDashboardPage.signOut();

        //citizen view notification about decision
        await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
        await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
        //await citizenHubPage.validateRecordDecisionBanner(); RET-5707 bug ticket raised for the failing step
        await manageCaseDashboardPage.signOut();
      },
    );

    test.skip('England - submit ET3 as a legal Representative', async ({ manageCaseDashboardPage,loginPage, legalRepPage, nocPage,caseListPage, lettersPage, et3ProcessingSteps }) => {
        //To long UI , flaky test: solution perform all ET3 event in separate test with same case
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(
        caseId,
        CaseDetailsValues.respondentName,
        caseNumber,
      );

      //await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, respondentName, firstName, lastName, true);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //perform all ET3 events as a LR
      await caseListPage.selectNextEvent('ET3 - Respondent Details');
      await legalRepPage.completeDraftET3ResponseForm();

      await caseListPage.selectNextEvent('Submit ET3 Form');
      await legalRepPage.submitET3ResponseForm();

    });
});

