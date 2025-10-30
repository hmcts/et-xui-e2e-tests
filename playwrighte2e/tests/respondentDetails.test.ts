import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

let subRef: string;
let caseNumber;

test.describe('Respondent details test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('England - Respondent details', {tag: '@demo'}, async ({ loginPage, caseListPage, respondentDetailsPage, icUploadDocPage }) => {

        await caseListPage.selectNextEvent('Respondent Details');
        // Check case file view
        await respondentDetailsPage.processPanelPreference();
        await caseListPage.navigateToTab('Respondent');
        await respondentDetailsPage.verifyRespondentDetails();

        //sign out as caseworker
        await caseListPage.signoutButton();

        //judge log in
        await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
        await caseListPage.selectNextEvent('Initial Consideration');
        await icUploadDocPage.verifyRespondentHearingPanelValues();
    });
});
