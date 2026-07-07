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
import ManageCaseFlag from '../pages/manageCaseFlag.ts';

let caseNumber: string;
let caseId: string;

test.describe('Case Flag 2.1', () => {
  let caseWorkerBrowserPage: Page;
  let loginPageCW: LoginPage;
  let manageCaseDashboardPageCW: ManageCaseDashboardPage;
  let caseDetailsPageCW: CaseDetailsPage;
  let createCaseFlagPageCW: CreateCaseFlag;
  let manageSupportPageCW: ManageSupportPage;
  let manageCaseFlagPageCW: ManageCaseFlag;

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
    manageCaseFlagPageCW = new ManageCaseFlag(caseWorkerBrowserPage);
  })

  //RET-6178,79
  test('Caseworker- Creates claimant and claimant representative case Flag for E/W-Single case', async ({ manageCaseDashboardPage, nocPage }) => {
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

    //TODO-validate judge user can see internal flags and external flags
  });

  //RET-6178,79
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

    //TODO- Flags not visible to LR
  });

  //RET-6178,79
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

  //RET-6178,79
  test('Respondent legal representative- Creates a Case Flags for the respondent and respondent`s legal representative', async ({ manageCaseDashboardPage, nocPage, caseDetailsPage, requestSupportPage, manageSupportPage }) => {
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
    await manageSupportPage.validateSupportFlag(true);

    //caseworker can see support flag
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateSupportFlag(true);

  });

  //RET-6243
  test('Respondent legal representative- Creates a Case Flags for the respondent, and the caseworker updates the case flag status to Active', async ({ manageCaseDashboardPage, nocPage, caseDetailsPage, requestSupportPage, manageSupportPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //Create case flag as a legal rep
    await caseDetailsPage.selectNextEvent(Events.requestSupport);
    await requestSupportPage.requestSupportFlag('Respondent', 'forms');
    await caseDetailsPage.navigateToTab('Support');
    await manageSupportPage.validateSupportFlag(false);

    //caseworker can see support flag
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateSupportFlag(false);

    //update case flag staus
    await caseDetailsPageCW.selectNextEvent(Events.manageFlag);
    await manageCaseFlagPageCW.updateCaseFlag('Active');
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateUpdatedSupportFlag('Active');

    //legal rep validates updated status
    //RET-6244
    await caseDetailsPage.navigateToTab('Support');
    await manageSupportPageCW.validateUpdatedSupportFlag('Active');
  });

  //RET-6245
  test('Respondent legal representative- Creates a Case Flags for the respondent, and the caseworker not approved/inactive case flags', async ({ manageCaseDashboardPage, nocPage, caseDetailsPage, requestSupportPage, manageSupportPage }) => {
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
    await manageSupportPage.validateSupportFlag(true);

    //caseworker can see support flag
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateSupportFlag(true);

    //update case flag staus
    await caseDetailsPageCW.selectNextEvent(Events.manageFlag);
    await manageCaseFlagPageCW.updateCaseFlag('Not approved');
    await caseDetailsPageCW.selectNextEvent(Events.manageFlag);
    await manageCaseFlagPageCW.updateCaseFlag('Inactive');
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateUpdatedSupportFlag('Not approved');
    await manageSupportPageCW.validateUpdatedSupportFlag('Inactive');

    //legal rep validates updated status
    await caseDetailsPage.navigateToTab('Support');
    await manageSupportPageCW.validateUpdatedSupportFlag('Not approved');
    await manageSupportPageCW.validateUpdatedSupportFlag('Inactive');
  });

  //RET-6229
  test('Respondent legal representative- Creates a Case Flags for the respondent, and inactive case flags as a LR', async ({ manageCaseDashboardPage, nocPage, caseDetailsPage, requestSupportPage, manageSupportPage }) => {
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
    await manageSupportPage.validateSupportFlag(true);


    //update case flag staus as LR
    await caseDetailsPage.selectNextEvent(Events.manageSupport);
    await manageSupportPage.manageSupportFlag();
    await caseDetailsPage.navigateToTab('Support');
    await manageSupportPage.validateInactiveFlag();

    //caseworker validates updated status
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.navigateToTab('Case Flags');
    await manageSupportPageCW.validateInactiveFlag();
  });

});



test.describe('Case Flag 2.1- Multiple respondents', () => {
  let caseWorkerBrowserPage: Page;
  let loginPageCW: LoginPage;
  let manageCaseDashboardPageCW: ManageCaseDashboardPage;
  let caseDetailsPageCW: CaseDetailsPage;
  let createCaseFlagPageCW: CreateCaseFlag;
  let manageSupportPageCW: ManageSupportPage;
  let manageCaseFlagPageCW: ManageCaseFlag;

  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage, browserUtils }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales, true);
    ({ caseId, caseNumber } = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etLegalRepresentative);

    caseWorkerBrowserPage = await browserUtils.openNewBrowserContext(users.etCaseWorker.sessionFile);
    loginPageCW = new LoginPage(caseWorkerBrowserPage);
    manageCaseDashboardPageCW = new ManageCaseDashboardPage(caseWorkerBrowserPage);
    caseDetailsPageCW = new CaseDetailsPage(caseWorkerBrowserPage);
    createCaseFlagPageCW = new CreateCaseFlag(caseWorkerBrowserPage);
    manageSupportPageCW = new ManageSupportPage(caseWorkerBrowserPage);
    manageCaseFlagPageCW = new ManageCaseFlag(caseWorkerBrowserPage);
  })


  //RET-6178
  test('Caseworker- Creates case Flag for multiple respondents', async ({ manageCaseDashboardPage, nocPage }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, `${CaseDetailsValues.respondentName}`, caseNumber);

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
});

