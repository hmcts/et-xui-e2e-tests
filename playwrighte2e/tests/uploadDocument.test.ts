import { test } from '../fixtures/common.fixture';

const fileUploadData = require('../data/ui-data/file-upload-content.json');


test.describe('Upload Document with multiple file extensions', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {

        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
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