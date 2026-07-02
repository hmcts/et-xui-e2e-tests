import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { users } from '../config/config.dynamic.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import LoginPage from '../pages/loginPage.ts';
import { ManageCaseDashboardPage } from '../pages/ManageCaseDashboardPage.ts';
import CaseDetailsPage from '../pages/caseDetailsPage.ts';
import { Page } from '@playwright/test';
import CreateCaseFlag from '../pages/createCaseFlag.ts';
import ManageSupportPage from '../pages/manageSupportPage.ts';

let caseNumber: string;
let caseId: string;

test.describe('Case Flag 2.1', () => {
  let caseWorkerBrowserPage: Page;
  let loginPageCW: LoginPage;
  let manageCaseDashboardPageCW: ManageCaseDashboardPage;
  let caseDetailsPageCW: CaseDetailsPage;
  let createCaseFlagPageCW: CreateCaseFlag;
  let manageSupportPageCW: ManageSupportPage;

  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })
  test.beforeEach(async ({manageCaseDashboardPage, loginPage, browserUtils}) => {
     caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
     ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etLegalRepresentative);

    caseWorkerBrowserPage = await browserUtils.openNewBrowserContext(users.etCaseWorker.sessionFile);
    loginPageCW = new LoginPage(caseWorkerBrowserPage);
    manageCaseDashboardPageCW = new ManageCaseDashboardPage(caseWorkerBrowserPage);
    caseDetailsPageCW = new CaseDetailsPage(caseWorkerBrowserPage);
    createCaseFlagPageCW= new CreateCaseFlag(caseWorkerBrowserPage);
    manageSupportPageCW = new ManageSupportPage(caseWorkerBrowserPage);
  })

  test('Caseworker- Creates claimant and claimant representative case Flag for E/W-Single case', async ({ manageCaseDashboardPage, nocPage, caseDetailsPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, `${CaseDetailsValues.claimantFirstName} ${CaseDetailsValues.claimantLastName}`, caseNumber);

    // login as Caseworker check the detail updated
    await manageCaseDashboardPageCW.visit();
    await loginPageCW.processLogin(users.etCaseWorker);
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //Create case flag
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForClaimant();
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForClaimantRep();
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await createCaseFlagPageCW.validateCaseFlagForClaimantAndRep(true, false);
  });

  test('Caseworker- Create respondent and respondent representative case Flag for E/W-Single case', async ({ manageCaseDashboardPage, nocPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

    // login as Caseworker check the detail updated
    await manageCaseDashboardPageCW.visit();
    await loginPageCW.processLogin(users.etCaseWorker);
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //Create case flag
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForRespondent('Confidential','Requested');
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForRespondentRep();
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await createCaseFlagPageCW.validateCaseFlagForClaimantAndRep(false, false);
  });

  test('Caseworker- Creates multiple Case Flags for respondent', async ({ manageCaseDashboardPage, nocPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

    // login as Caseworker check the detail updated
    await manageCaseDashboardPageCW.visit();
    await loginPageCW.processLogin(users.etCaseWorker);
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //Create multiple case flags
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForRespondent('Confidential', 'Requested');
    await caseDetailsPageCW.selectNextEvent(Events.createFlag);
    await createCaseFlagPageCW.createCaseFlagForRespondent('Banning order','Active');
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await createCaseFlagPageCW.validateCaseFlagForClaimantAndRep(true, true);
  });

  test('Respondent legal representative- Creates a Case Flags for the respondent and respondent`s legal representative', async ({ manageCaseDashboardPage, nocPage, caseListPage, caseDetailsPage, requestSupportPage, manageSupportPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //Create case flag as a legal rep
    await caseDetailsPage.selectNextEvent(Events.requestSupport);
    await requestSupportPage.requestSupportFlag('Respondent', 'forms');
    await caseDetailsPage.selectNextEvent(Events.requestSupport);
    await requestSupportPage.requestSupportFlag('Representative', 'building access');
    await caseDetailsPage.navigateToTab('Support');
    await manageSupportPage.validateSupportFlag();

    //caseworker can see support flag
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateSupportFlag();

  });
});
