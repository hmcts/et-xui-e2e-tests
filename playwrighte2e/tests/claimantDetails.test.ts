import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

let subRef: string;
let caseNumber;

test.describe('Claimant details test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {
        
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Englad - Claimant details', async ({ loginPage, caseListPage, claimantDetailsPage, icUploadDocPage }) => {

        await caseListPage.selectNextEvent('Claimant Details');
        // Check case file view
        await claimantDetailsPage.processClaimantDetails(true);
        await caseListPage.navigateToTab('Claimant');
        await claimantDetailsPage.verifyClaimantDetails();

        //sign out as caseworker
        await caseListPage.signoutButton();
                
        //judge log in
        await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();
        await caseListPage.selectNextEvent('Initial Consideration');
        await icUploadDocPage.verifyClaimantHearingPanelValues();
    });
});