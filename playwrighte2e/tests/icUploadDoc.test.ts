import  { test } from "../fixtures/common.fixture";
import { params } from "../utils/config";

test.describe('IC Upload documents', () => {

    let subRef, caseNumber;

    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

    });

    test('Judge uploads Internal consideration document', {tag: '@demo'}, async({ caseListPage, loginPage, icUploadDocPage }) => {

        await caseListPage.signoutButton();
        
        //judge log in
        await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();
        await caseListPage.selectNextEvent('Initial Consideration');

        //judge uploads document
        await icUploadDocPage.judgeUploadsDocument();
        await caseListPage.navigateToTab('ICTab');

        //verify the uploaded document details
        await icUploadDocPage.verifyICDetailsOnTab('Initial Consideration Document', 'Initial Consideration.pdf');
        await icUploadDocPage.verifyICDetailsOnTab('Document', 'test-doc.pdf');
        await icUploadDocPage.verifyICDetailsOnTab('Initial consideration completed by:', 'ET Judge');
    });
})