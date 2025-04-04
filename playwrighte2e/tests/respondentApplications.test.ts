import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


let caseNumber: any;
let subRef;

test.describe('ET3/Respondent Applications', () => {
    test.beforeEach(async ({ page,createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Respondent makes Type A Application', async ({ et3LoginPage, respondentCaseOverviewPage, citizenHubPage}) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber);

        //make type A application
        await respondentCaseOverviewPage.respondentMakeApplicationTypeA();

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplicationTypeA();
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.respondToRespondentApplication();
    });
});
