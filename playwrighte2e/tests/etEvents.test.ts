import { test } from "../fixtures/common.fixture";
import config from "../config/config";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
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

  test('Create a claim and perform B/F action event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ caseDetailsPage, bfActionPage }) => {
    //BF action
    await caseDetailsPage.selectNextEvent(Events.broughtForwardAction);
    await bfActionPage.addBfAction();
  });

  test('Create a claim and perform jurisdiction event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ jurisdictionPage, caseDetailsPage }) => {
    //Jurisdiction event
    await caseDetailsPage.selectNextEvent(Events.jurisdiction);
    await jurisdictionPage.addJurisdictionCode();
    await caseDetailsPage.navigateToTab('Jurisdictions');
    await jurisdictionPage.verifyJurisdictionCodeOnTab();
  });

  //RET-5809
  test('Validate longer than 3 letters jurisdiction code in IC event', {tag: ['@ccd-callback-tests', '@demo']}, async ({ caseDetailsPage, jurisdictionPage, icUploadDocPage }) => {
    //Jurisdiction event
    await caseDetailsPage.selectNextEvent(Events.jurisdiction);
    await jurisdictionPage.addADTJurisdictionCode();
    await caseDetailsPage.selectNextEvent(Events.initialConsideration);
    await icUploadDocPage.verifyJurisdictionCodeInICevent();
  });

  //EXUI-3451
  test.skip('Create a England/Wales claim and transfer to Scotland', {tag: '@demo'}, async ({ caseDetailsPage, caseTransferPage }) => {
    await caseDetailsPage.selectNextEvent(Events.caseTransferScotland);
    await caseTransferPage.progressCaseTransfer();
    await caseTransferPage.checkYourAnswer(caseNumber);
  });

  //RET-5790
  test('perform ADR document event', {tag: '@demo'}, async ({ adrDocument, caseDetailsPage }) => {
    await caseDetailsPage.selectNextEvent(Events.adrPrivilegedDocuments);
    await adrDocument.adrUploadDocument();
    await caseDetailsPage.navigateToTab('ADR/Privileged');
    await adrDocument.verifyAdrDocumentDetails();
  });

});

test.describe('Claimant retaining access to transferred case', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  //EXUI-3451
  test('Create a England/Wales claim and transfer to Scotland, Claimant retains case', async ({ manageCaseDashboardPage, caseDetailsPage, caseTransferPage, citizenHubLoginPage, citizenHubPage }) => {
    await caseDetailsPage.selectNextEvent(Events.caseTransferScotland);
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
  });


//RET-5806
  test('Add speak to VP case flag for Scotland case', {tag: '@demo'}, async ({ caseDetailsPage }) => {
    await caseDetailsPage.selectNextEvent(Events.caseDetails);
    await caseDetailsPage.addVPCaseFlag();
  });

  //RET-5931, 5961
  test('Add Case Notes and validate links on Initial Consideration', async ({ caseNotesPage, caseDetailsPage,initialConsiderationPage}) => {
    await caseDetailsPage.selectNextEvent(Events.addTelephoneNote);
    await caseNotesPage.addCaseNotes();
    await caseDetailsPage.assertTabData([
      {
        tabName: 'Telephone Notes',
        tabContent:[
          'Telephone notes',
          { tabItem: 'Case Notes', value: '', clickable: true },
          { tabItem: 'Note', value: 'This is test'}
        ]

      }
    ])
    // RET-5796 Validate initial consideration links
    await caseDetailsPage.selectNextEvent(Events.initialConsideration);
    await initialConsiderationPage.validateLinksNotVisible();
  });
});


