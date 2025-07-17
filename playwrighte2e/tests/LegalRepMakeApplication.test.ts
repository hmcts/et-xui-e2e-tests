import {params} from "../utils/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Make an application and view Recorded Decision', () => {

    test.beforeEach(async ({ page,createCaseStep }) => {
       ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    //RET-5787
    test.skip('Legal representatives make and application - England', async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();

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

    //RET-5787
    test.skip('Legal representatives make and application, caseworker record a decision, LR and citizen view a decision - E/W',
        {tag: '@demo'},
        async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent  ('Eng/Wales - Singles', subRef, respondentName, firstName, lastName, false);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();

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
        //  await citizenHubPage.validateRecordDecisionBanner(); RET-5707 bug ticket raised for the failing step
        await page.click('text=Sign out');
    });

    test.skip('England - submit ET3 as a legal Representative', async ({ page,loginPage, legalRepPage, et1CaseServingPage,caseListPage, lettersPage, et3ProcessingSteps }) => {
        //To long UI , flaky test: solution perform all ET3 event in separate test with same case
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, respondentName, firstName, lastName, true);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();

        //perform all ET3 events as a LR
        await caseListPage.selectNextEvent('ET3 - Respondent Details');
        await legalRepPage.completeDraftET3ResponseForm();

        await caseListPage.selectNextEvent('Submit ET3 Form');
        await legalRepPage.submitET3ResponseForm();

    });
});

