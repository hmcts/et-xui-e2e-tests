import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseNumber: string;
let caseId: string;

const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe('ET3/Respondent Applications', () => {
    test.beforeEach(async () => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
      const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
      caseNumber = response.case_data.ethosCaseReference;
   });

    test('Respondent makes Type B Application, Claimant respond to an application successfully', async ({ et3LoginPage, respondentCaseOverviewPage, citizenHubLoginPage, citizenHubPage}) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
        await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);

        //make type B application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeB', true);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeB');
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
        await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
        await citizenHubPage.respondToRespondentApplication('TypeB');
    });

    test('Respondent makes Type C Application successfully', async ({ et3LoginPage, respondentCaseOverviewPage, citizenHubPage}) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
        await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);

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

        ({ subRef: caseId, caseNumber}  = await createCaseStep.setUpLegalRepCase(page));
        await caseListPage.signoutButton();

        // assign case to respondent and make application
        await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
        await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
        await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);
        await respondentCaseOverviewPage.signOutButtonSyr();

        // legal rep view application
        await page.goto(config.manageCaseBaseUrl);
        await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
        caseNumber = await caseListPage.navigateToCaseDetails(caseId, 'EnglandWales');

        // legal rep can see an application
        await legalRepPage.legalRepViewApplication();
    });

});
