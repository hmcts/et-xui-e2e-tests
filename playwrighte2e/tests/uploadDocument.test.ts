import { test } from '../fixtures/common.fixture';
import fileUploadData from '../resources/payload/file-upload-content.json';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('Upload Document with multiple file extensions', () => {
    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

    test('Multiple file extension test', {tag: '@demo'}, async ({ caseListPage, uploadDocumentPage }) => {

        const fileNames: string[] = [fileUploadData.textFile, fileUploadData.imageFile, fileUploadData.audioFile, fileUploadData.rtfFile];
        let i =1;

        for(const fileName of fileNames) {
            await caseListPage.selectNextEvent('Upload Document');
            await uploadDocumentPage.uploadFile(fileName, i);
            await caseListPage.navigateToTab('Documents');
            await uploadDocumentPage.verifyUploadDocuments(fileName);
            i++;
        }

    });
});
