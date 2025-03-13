import {params} from "../utils/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Make an application and view Recorded Decision', () => {

    test.beforeEach(async ({ page,createCaseStep }) => {
       ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Legal representatives make and application - England', async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();
        await page.click('text=Sign out');

       // Claimant Reply to Application from Legal Rep
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.respondToAnApplication();
        await page.click('text=Sign out');


        //Case Worker Request for additional information (respond to claimant's response)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();

        await applicationTabPage.respondToAnApplication();
        await page.click('text=Sign out');

        //claimant see response of respond
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.validateResponseOfResponse();
    });

    test('Legal representatives make and application, caseworker record a decision, LR and citizen view a decision - E/W',
        async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();
        await page.click('text=Sign out');

       //caseworker records a decision
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();

        await applicationTabPage.recordADecision();
        //Legal rep view decision in an application tab
        await applicationTabPage.validateRecordDecisionDetails();
        await page.click('text=Sign out');

        //citizen view notification about decision
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.validateRecordDecisionBanner();
        await page.click('text=Sign out');
    });
});

