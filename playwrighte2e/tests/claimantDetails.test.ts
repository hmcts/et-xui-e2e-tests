import { test } from '../fixtures/common.fixture';
import config from "../config/config";

let subRef: string;
let caseNumber: string;

test.describe('Claimant details test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('England - Claimant details', {tag: ['@ccd-callback-tests', '@demo']}, async ({ loginPage, caseListPage, claimantDetailsPage, icUploadDocPage }) => {

        await caseListPage.selectNextEvent('Claimant Details');
        // Check case file view
        await claimantDetailsPage.processClaimantDetails(true);
        await caseListPage.navigateToTab('Claimant');
        await claimantDetailsPage.verifyClaimantDetails();

        //sign out as caseworker
        await caseListPage.signoutButton();

        //judge log in
        await loginPage.processLogin(config.TestEnvETJudgeUserEng, config.TestEnvETJudgeUserEngPassword, config.loginPaths.cases);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
        await caseListPage.selectNextEvent('Initial Consideration');
        await icUploadDocPage.verifyClaimantHearingPanelValues();
    });
});
