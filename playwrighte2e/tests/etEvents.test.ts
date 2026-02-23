import { test } from "../fixtures/common.fixture";
import config from "../config/config";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseNumber: string;
let caseId: string;

test.describe('Various events in mange case application', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  test('Create a claim and perform B/F action event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ caseListPage, bfActionPage }) => {
    //BF action
    await caseListPage.selectNextEvent('B/F Action');
    await bfActionPage.addBfAction();
  });

  test('Create a claim and perform jurisdiction event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ caseListPage, jurisdictionPage }) => {
    //Jurisdiction event
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.addJurisdictionCode();
    await caseListPage.clickTab('Jurisdictions');
    await jurisdictionPage.verifyJurisdictionCodeOnTab();
  });

  //RET-5809
  test('Validate longer than 3 letters jurisdiction code in IC event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ caseListPage, jurisdictionPage, icUploadDocPage }) => {
    //Jurisdiction event
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.addADTJurisdictionCode();
    await caseListPage.selectNextEvent('Initial Consideration');
    await icUploadDocPage.verifyJurisdictionCodeInICevent();
  });

  //EXUI-3451
  test.skip('Create a England/Wales claim and transfer to Scotland', {tag: '@demo'}, async ({ caseListPage, caseTransferPage }) => {
    await caseListPage.selectNextEvent('Case Transfer (Scotland)');
    await caseTransferPage.progressCaseTransfer();
    await caseTransferPage.checkYourAnswer(caseNumber);
  });

  //RET-5790
  test('perform ADR document event', {tag: '@demo'}, async ({ caseListPage, adrDocument }) => {
    await caseListPage.selectNextEvent('ADR/Privileged Documents');
    await adrDocument.adrUploadDocument();
    await caseListPage.navigateToTab('ADR/Privileged');
    await adrDocument.verifyAdrDocumentDetails();
  });

});

test.describe('Claimant retaining access to transferred case', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  //EXUI-3451
  test('Create a England/Wales claim and transfer to Scotland, Claimant retains case', async ({ manageCaseDashboardPage, caseListPage, caseTransferPage, citizenHubLoginPage, citizenHubPage }) => {
    await caseListPage.selectNextEvent('Case Transfer (Scotland)');
    await caseTransferPage.progressCaseTransfer();
    let newSubRef= await caseTransferPage.checkYourAnswer(caseNumber);
    await manageCaseDashboardPage.signOut();

    //login as claimant and access transferred case
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(newSubRef);
  });

});

test.describe('Various events in mange case application for Scotland case', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createScotlandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);
    //({ subRef: caseId, caseNumber } = await createCaseStep.setupCaseCreatedViaApi(page, 'Scotland', 'ET_Scotland'));
  });


//RET-5806
  test('Add speak to VP case flag for Scotland case', {tag: '@demo'}, async ({ caseListPage, caseDetailsPage }) => {
    await caseListPage.selectNextEvent('Case Details');
    await caseDetailsPage.addVPCaseFlag();
  });

  //RET-5931, 5961
  test('Add Case Notes', async ({ caseListPage, caseNotesPage, caseDetailsPage }) => {
    await caseListPage.selectNextEvent('Add Telephone Note');
    await caseNotesPage.addCaseNotes();
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Telephone Notes',
        tabContent:[
          'Telephone notes',
          { tabItem: 'Case Notes', value: 'TEst Test', clickable: true },
          { tabItem: 'Note', value: 'This is test'}
        ]

      }
    ])
  });
});


