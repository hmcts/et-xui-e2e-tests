import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;
let firstName: string;
let lastName: string;
const respName ='Mrs Test Auto';

test.describe('NOC Notification Banner', () => {

  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    await manageCaseDashboardPage.visit();
    firstName = CaseDetailsValues.claimantFirstName;
    lastName = CaseDetailsValues.claimantLastName;

  });

  //RET-5419
  test('Perform NOC and validate the notification banner in CUI',
    async ({ manageCaseDashboardPage, loginPage, legalRepPage, citizenHubLoginPage, citizenHubPage }) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber.toString(), firstName, lastName, false, false);
      await manageCaseDashboardPage.signOut();

      //citizen validates notification banner
      await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.verifyLegalRepNotificationBanner();
      await citizenHubPage.contactTheTribunalLink();
    });

  //RET-5791
  test('Perform NOC and validate the notification banner in  Respondent UI',
    async ({ manageCaseDashboardPage, loginPage, legalRepPage, et3LoginPage }) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber.toString(), firstName, lastName, false, true);
      await manageCaseDashboardPage.signOut();

      //Assign a claim to respondent
      await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
      await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);

      //citizen validates notification banner in respondent UI
      await et3LoginPage.validateNocNotificationBanner();

      // RET-6007 -change my legal representative- stop representation
      await et3LoginPage.stopLegalRepRepresentation();
    });

  //RET-5425
  test('Share case (respondent representative)',
    async ({ loginPage, legalRepPage, caseListPage, caseDetailsPage, baseEventPage }) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber.toString(), firstName, lastName, false, true);

      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId);
      await caseListPage.checkAndShareCaseFromList(caseId);
      //caseId = '1768406266566446';
      caseNumber = await caseListPage.navigateToCaseDetails(caseId.toString(), 'EnglandWales');
      await caseListPage.selectNextEvent(Events.refreshSharedUsers.listItem);
      await baseEventPage.clickSubmitButton();

      //validate share case details
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Respondent Representative',
          tabContent: [
            { tabItem: 'Respondent who is being represented', value: respName },
            { tabItem: 'First name', value: 'Test' },
            { tabItem: 'Last name', value: 'Factory' },
            { tabItem: 'Email address', value: config.etManageOrgSuperUser.email, position: 1 } // position starts from 0
            ]
        }
      ]);
    });

  //RET-5425
  test('Share case (claimant representative)',
    async ({ loginPage, legalRepPage, caseListPage, caseDetailsPage, baseEventPage }) => {

      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber.toString(), firstName, lastName, false, false);

      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId);
      await caseListPage.checkAndShareCaseFromList(caseId);
      caseNumber = await caseListPage.navigateToCaseDetails(caseId.toString(), 'EnglandWales');
      await caseListPage.selectNextEvent(Events.refreshSharedUsers.listItem);
      await baseEventPage.clickSubmitButton();
      //validate share case details
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Claimant Representative',
          tabContent: [
            'Claimant Representative Details',
            { tabItem: 'First name', value: 'Test', position: 0 },
            { tabItem: 'Last name', value: 'Factory', position: 0 },
            { tabItem: 'Email address', value: config.etManageOrgSuperUser.email, position: 1 } // position starts from 0
          ]
        }
      ]);
    });

  //RET-5416
  test('Perform NOC and Remove claimant legal representative as a citizen, claimant reinstated case',
    async ({ manageCaseDashboardPage, loginPage, legalRepPage, citizenHubLoginPage, citizenHubPage }) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber.toString(), firstName, lastName, false, false);
      await manageCaseDashboardPage.signOut();

      //remove claimant legal rep
      await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email , config.etClaimant.password);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.changeMyLegalRep();
      await citizenHubPage.verifyLegalRepUnassignedNotificationBanner();
    });
});
