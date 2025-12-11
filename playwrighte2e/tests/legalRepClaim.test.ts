import {test} from '../fixtures/common.fixture';
import config from '../config/config';

let caseNumber: string;
let subRef: string;

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
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETRespondentEmailAddress, config.TestEnvETRespondentPassword);
        await nocPage.processNoc(subRef);
    });
});
