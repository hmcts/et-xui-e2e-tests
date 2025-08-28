import { test } from "../fixtures/common.fixture";
import { params } from "../utils/config";

let caseNumber: any;
let subRef;



test.describe('Various events in mange case application', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
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

  test('Create a England/Wales claim and transfer to Scotland', {tag: '@demo'}, async ({ caseListPage, caseTransferPage }) => {
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
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));

  });

  //Flaky test in CI
  test.skip('Create a England/Wales claim and transfer to Scotland, Claimant retains case', async ({ caseListPage, caseTransferPage, citizenHubPage }) => {
    await caseListPage.selectNextEvent('Case Transfer (Scotland)');
    await caseTransferPage.progressCaseTransfer();
    let newSubRef= await caseTransferPage.checkYourAnswer(caseNumber);

    //login as claimant and access transferred case
    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(newSubRef);
  });

});

test.describe('Various events in mange case application for Scotland case', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland"));
  });


//RET-5806
  test('Add speak to VP case flag for Scotland case', {tag: '@demo'}, async ({ caseListPage, caseDetails }) => {
    await caseListPage.selectNextEvent('Case Details');
    await caseDetails.addVPCaseFlag();
  });

  //RET-5931, 5961
  test.skip('Add Case Notes', async ({ caseListPage, caseNotesPage }) => {
    await caseListPage.selectNextEvent('Add Telephone Note');
    await caseNotesPage.addCaseNotes();
  });
});


