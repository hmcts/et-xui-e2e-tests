import { test } from '../fixtures/common.fixture';
import config from '../config/config';

let caseNumber: string;
let subRef: string;

const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe('ET3/Respondent Applications', () => {
    test.beforeEach(async ({ page,createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Respondent makes Type B Application, Claimant respond to an application successfully', async ({ et3LoginPage, respondentCaseOverviewPage, citizenHubPage}) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);

        //make type B application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeB', true);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeB');
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.respondToRespondentApplication('TypeB');
    });

    test('Respondent makes Type C Application successfully', async ({ et3LoginPage, respondentCaseOverviewPage, citizenHubPage}) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);

        //make type B application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeC', false);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeC');
        await respondentCaseOverviewPage.signOutButtonSyr();
    });

});

test.describe('ET3/Respondent Applications', () => {
    //too long UI work flow, create a case via API as a legal rep
    test.skip('Legal Representative created a case, Respondent makes Type A Application, LR can see application', async ({page, createCaseStep,loginPage,caseListPage, legalRepPage,et3LoginPage, respondentCaseOverviewPage}) => {
        const respName ='Mark McDonald';
        const firstName ='Jessamine';
        const lastName = 'Malcom';

        ({subRef, caseNumber}  = await createCaseStep.setUpLegalRepCase(page));
        await caseListPage.signoutButton();

        // assign case to respondent and make application
        await et3LoginPage.processRespondentLogin(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
        await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);
        await respondentCaseOverviewPage.signOutButtonSyr();

        // legal rep view application
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        // legal rep can see an application
        await legalRepPage.legalRepViewApplication();
    });

});
