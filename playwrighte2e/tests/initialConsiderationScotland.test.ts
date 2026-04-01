import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import fileUploadData from '../resources/payload/file-upload-content.json';

let caseNumber: string;
let caseId: string;

test.describe('Scotland Case Initial Consideration', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createScotlandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(
      config.etCaseWorker.email,
      config.etCaseWorker.password,
      config.loginPaths.worklist,
    );
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);
  });

  test('Tribunal Case file link on IC - Scotland case', {tag: '@demo'}, async ({ caseDetailsPage,uploadDocumentPage,initialConsiderationPage }) => {

    const fileName = fileUploadData.rtfFile
    await caseDetailsPage.selectNextEvent(Events.uploadDocument);
    await uploadDocumentPage.uploadFile(fileName, 1);
    await caseDetailsPage.navigateToTab('Documents');
    await uploadDocumentPage.verifyUploadDocuments(fileName);
    await uploadDocumentPage.createDCF();
    await initialConsiderationPage.waitForTribunalCaseFileLink();
    await caseDetailsPage.selectNextEvent(Events.initialConsideration);
    await initialConsiderationPage.validateTribunalCaseFileLink();
  });
});
