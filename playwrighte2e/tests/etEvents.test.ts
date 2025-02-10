import { test } from "../fixtures/common.fixture";
import { params } from "../utils/config";

let caseNumber: any;
let subRef;



test.describe('Various events in mange case application', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

  });

  test('Create a claim and perform B/F action event', async ({ caseListPage, bfActionPage }) => {
    //BF action
    await caseListPage.selectNextEvent('B/F Action');
    await bfActionPage.addBfAction();
  });

  test('Create a claim and perform jurisdiction event', async ({ caseListPage, jurisdictionPage }) => {
    //Jurisdiction event
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.addJurisdictionCode();
    await caseListPage.clickTab('Jurisdictions');
    await jurisdictionPage.verifyJurisdictionCodeOnTab();
  });

  test('Create a England/Wales claim and transfer to Scotland', async ({ caseListPage, caseTransferPage }) => {
    await caseListPage.selectNextEvent('Case Transfer (Scotland)');
    await caseTransferPage.progressCaseTransfer();
    await caseTransferPage.checkYourAnswer(caseNumber);
  });

  test('Judge draft and sign judgement or order for a England/Wales claim ', async ({ caseListPage, loginPage }) => {
   await caseListPage.signoutButton();

   //judge log in
    await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
    await caseListPage.processCaseFromCaseList();
    await caseListPage.clickTab('Judgments');
  });

});
