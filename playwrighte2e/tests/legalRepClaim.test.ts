import {test} from '../fixtures/common.fixture';
import {params} from '../utils/config';

test.describe('Legal Representative submits a case and perform various events', () => {
        test('Claimant Representative creates a claim (England and Wales - Singles) and submit', {tag: '@demo'}, async () => {
            // let loginPage = new LoginPage(page);
            // let caseListPage = new CaseListPage(page);
            // let et1CreateDraftClaim = new Et1CreateDraftClaim(page);
            // //let applicationPage = new ApplicationPage(page);


            // await page.goto(params.TestUrlForManageCaseAAT);
            // await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
            // await caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', postcode);

            // await et1CreateDraftClaim.et1Section1(claimantsFirstName, claimantsLastName);
            // await et1CreateDraftClaim.et1Section2(respondentsFirstName, respondentsLastName);
            // await et1CreateDraftClaim.et1Section3();
            // let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
            // console.log('The value of the Case Number ' + submissionReference);

            //Legal rep makes an application- R92 Yes (offline scenario -only claimant rep is online user)
            //RET-5191&92
            // await applicationPage.clickApplicationTab();
            // await applicationPage.navigateMakeAnApplicationLink();
            // await applicationPage.makeAnApplicationR92WithYesOption('Yes');
            //
            // //Legal rep makes an application- R92 No
            // await applicationPage.clickApplicationTab();
            // await applicationPage.navigateMakeAnApplicationLink();
            // await applicationPage.makeAnApplicationR92WithYesOption('No');

            //TODO NOC-5188, 5190...

            // await page.goto(params.TestUrlForManageCaseAAT);
            // await loginPage.processLoginOnXui(params.TestEnvETLegalRepUserDiffOrg, params.TestEnvETLegalRepPasswordDiffOrg);

        });


    test('CR creates a claim, amend claimant/respondent names and persist NOC with original claimant/respondent names',
        {tag: '@demo'},
        async ({ page, createCaseStep, caseListPage, claimantDetailsPage, respondentDetailsPage, loginPage, nocPage }) => {
        
        const submissionReference = await createCaseStep.setUpLegalRepCase(page);

        // Amend Claimant and Respondent names
        await caseListPage.selectNextEvent('Claimant Details');
        await claimantDetailsPage.processClaimantDetails();
        await caseListPage.selectNextEvent('Respondent Details');
        await respondentDetailsPage.processRespondentDetails();
        await caseListPage.signoutButton();

        // Perform NOC using original Claimant and Respondent names (different org)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETRespondentEmailAddress, params.TestEnvETRespondentPassword);
        await nocPage.processNoc(submissionReference);
    });
});
