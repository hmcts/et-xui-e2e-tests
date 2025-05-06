import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


// let caseId: { toString: () => any; };
let caseNumber: any;
let subRef;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
const region = 'England';


test.describe.serial('ET3/Respondent Journey', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

    });

    test('Respondent Assign a claim (ET3)', {tag: '@demo'}, async ({ et3LoginPage, responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim, respSubmitEt3 }) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
        await responseLandingPage.startEt3();
        await respContactDetailsPages.et3Section1();
        await respClaimantDetails.et3Section2();
        await respContestClaim.et3Section3();
        await respSubmitEt3.checkYourAnswers();
    });

    //RET-5516
    test.skip('Citizen user validates respondent contact details', {tag: '@demo'}, async ({page, caseListPage, respondentDetailsPage, citizenHubPage }) => {
        //caseworker completes respondent details
        await page.goto(params.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
        await this.caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, subRef);
        caseNumber = await this.caseListPage.processCaseFromCaseList();

        await caseListPage.selectNextEvent('Respondent Details');
        await respondentDetailsPage.processRespondentDetailsWithET3Acceptance();
        await caseListPage.signoutButton();

        //citizen validates respondent contact details
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.verifyCitizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.respondentContactDetailsLinkRegistered();
        await citizenHubPage.verifyRespondentContactDetails();
    });
});
