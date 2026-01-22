import  { test } from "../fixtures/common.fixture";
import config from "../config/config";

test.describe('IC Upload documents', () => {

    let subRef: string, caseNumber: string;

    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

    });

    test('Judge uploads Internal consideration document', {tag: '@demo'}, async({ caseListPage, loginPage, icUploadDocPage, caseDetailsPage }) => {

        await caseListPage.signoutButton();

        //judge log in
        await loginPage.processLogin(config.TestEnvETJudgeUserEng, config.TestEnvETJudgeUserEngPassword, config.loginPaths.cases);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
        await caseListPage.selectNextEvent('Initial Consideration');

        //judge uploads document
        await icUploadDocPage.judgeUploadsDocument();
        await caseListPage.navigateToTab('ICTab');

        //verify the uploaded document details
        await caseDetailsPage.assertTabData([
          {
            tabName: 'Initial Consideration',
            tabContent: [
              { tabItem: 'Initial Consideration Document', value: 'Initial Consideration.pdf' },
              { tabItem: 'Document', value: 'test-doc.pdf' },
              { tabItem: 'Initial consideration completed by:', value: 'ET Judge1' }
            ]
          }
        ])
    });
})
