import {test} from '../fixtures/common.fixture';
import {params} from '../utils/config';
let caseNumber: any;
let subRef;


test.beforeEach(async ({ page, createCaseStep}) => {
  ({subRef, caseNumber}  = await createCaseStep.setUpLegalRepCase(page));
});

test.describe('Legal Representative submits a case and perform various events', () => {

    test('CR creates a claim, amend claimant/respondent names and persist NOC with original claimant/respondent names',
        {tag: '@demo'},
        async ({ page, caseListPage, claimantDetailsPage, respondentDetailsPage, loginPage, nocPage }) => {

        // Amend Claimant and Respondent names
        await caseListPage.selectNextEvent('Claimant Details');
        await claimantDetailsPage.processClaimantDetails();
        await caseListPage.selectNextEvent('Respondent Details');
        await respondentDetailsPage.processRespondentDetails();
        await caseListPage.signoutButton();

        // Perform NOC using original Claimant and Respondent names (different org)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETRespondentEmailAddress, params.TestEnvETRespondentPassword);
        await nocPage.processNoc(subRef);
    });
});
