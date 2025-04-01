import { test } from "../fixtures/common.fixture";

let caseNumber: any;
let subRef;



test.describe('Digital Case File', () => {
    test.beforeEach(async ({page, createCaseStep}) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

    });

    test('Create a claim, perform DCF event', {tag: '@demo'}, async ({page,caseListPage, uploadDocumentPage}) => {
        //list hearing
        await caseListPage.selectNextEvent('Upload Document');
        await uploadDocumentPage.uploadCaseManagementDocument();
        await caseListPage.navigateToTab('Documents');
        await uploadDocumentPage.createDCF();
        await caseListPage.navigateToTab('Documents');
        await uploadDocumentPage.validateDCF();
    });
});
