import config from "../config/config";
import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import DateUtilComponent from '../data-utils/DateUtilComponent.ts';

const respondentName = 'Mrs Test Auto';
let caseId: string;
let caseNumber: string;

test.describe('Make an application and view Recorded Decision', () => {

    test.beforeEach(async ({ manageCaseDashboardPage }) => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
      ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
      await manageCaseDashboardPage.visit();
    });

    //RET-5787
    test('Legal representatives make and application - England', async ({
      manageCaseDashboardPage,
      citizenHubLoginPage,
      citizenHubPage,
      loginPage,
      applicationTabPage, nocPage, caseListPage
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
      await caseListPage.navigateToTab('Applications')
      await  applicationTabPage.enterDetailsForMakingApplication('Amend response')
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
      await caseListPage.navigateToTab('Applications')
      await applicationTabPage.caseWorkerRespondToAnApplication('Amend response');
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
        applicationTabPage,
        nocPage,
        caseListPage, checkYourAnswersPage, caseDetailsPage
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
        await caseListPage.navigateToTab('Applications');
        await applicationTabPage.enterDetailsForMakingApplication('Amend response');
        await manageCaseDashboardPage.signOut();

        //caseworker records a decision
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseListPage.navigateToTab('Applications');
        await applicationTabPage.enterDetailsForRecordADecision(checkYourAnswersPage, 'Amend response');

        await caseListPage.navigateToTab('Applications');
        await caseDetailsPage.assertTabData([
          {
            tabName: 'Applications',
            tabContent: [
              { tabItem: 'Amend response', value: 'Respondent Representative', exact: false, clickable: true },
              {tabItem: 'Decision date', value: DateUtilComponent.formatToDayMonthYear(new Date())},
              { tabItem: 'Decision', value: 'Granted'}
            ]
          }
        ]);
        await manageCaseDashboardPage.signOut();

        //Legal rep view decision in an application tab
        await loginPage.processLogin(
          config.etLegalRepresentative.email,
          config.etLegalRepresentative.password,
          config.loginPaths.cases,
        );
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseListPage.navigateToTab('Applications');
        await applicationTabPage.viewApplicationAndAssertDetails('Amend response', 'Open', [
          `Type of application - Amend response`,
          'Notification - Amend response',
          `Date - ${DateUtilComponent.formatToDayMonthYear(new Date())}`,
          `Sent by - Tribunal`
        ]);

        await manageCaseDashboardPage.signOut();

        //citizen view notification about decision
        await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
        await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
        //await citizenHubPage.validateRecordDecisionBanner(); RET-5707 bug ticket raised for the failing step
        await manageCaseDashboardPage.signOut();
      },
    );

    test('England - submit ET3 as a legal Representative',
      async ({
               manageCaseDashboardPage,
               loginPage,
               nocPage,
               caseListPage,
               checkYourAnswersPage,
               et3DetailsPage, et3RespondentDetailsPage,
               et3EmploymentDetailsPage, et3ResponseDetailsPage}) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(
        caseId,
        CaseDetailsValues.respondentName,
        caseNumber,
      );

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //perform all ET3 events as a LR
      await caseListPage.selectNextEvent(Events.et3RespondentDetails.listItem);
      await et3RespondentDetailsPage.enterEt3RespondentDetails(checkYourAnswersPage);

      await et3DetailsPage.navigateToEt3EmploymentDetailsPage();
      await et3EmploymentDetailsPage.enterEt3EmploymentDetails(checkYourAnswersPage);

      await et3DetailsPage.navigateToEt3ResponseDetailsPage();
      await et3ResponseDetailsPage.enterEt3ResponseDetails(checkYourAnswersPage);

      await caseListPage.selectNextEvent(Events.submitEt3Form.listItem);
      await et3DetailsPage.submitEt3Form(checkYourAnswersPage);
    });
});

