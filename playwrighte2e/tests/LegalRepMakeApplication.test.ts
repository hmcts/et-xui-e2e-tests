import config from "../config/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber: string;

test.describe('Make an application and view Recorded Decision', () => {

    test.beforeEach(async ({ page,createCaseStep }) => {
       ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    //RET-5787
    test.skip('Legal representatives make and application - England', async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();
        await page.click('text=Sign out');

       // Claimant Reply to Application from Legal Rep
        await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.respondToAnApplication();
        await page.click('text=Sign out');


        //Case Worker Request for additional information (respond to claimant's response)
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        await applicationTabPage.respondToAnApplication();
        await page.click('text=Sign out');

        //claimant see response of respond
        await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
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
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent  ('Eng/Wales - Singles', subRef, respondentName, firstName, lastName, false);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        //legal rep make an application
        await legalRepPage.legalRepMakeAnApplication();
        await page.click('text=Sign out');

       //caseworker records a decision
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
        await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        await applicationTabPage.recordADecision();
        //Legal rep view decision in an application tab
        await applicationTabPage.validateRecordDecisionDetails();
        await page.click('text=Sign out');

        //citizen view notification about decision
        await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        //  await citizenHubPage.validateRecordDecisionBanner(); RET-5707 bug ticket raised for the failing step
        await page.click('text=Sign out');
    });

    test.skip('England - submit ET3 as a legal Representative', async ({ page,loginPage, legalRepPage, et1CaseServingPage,caseListPage, lettersPage, et3ProcessingSteps }) => {
        //To long UI , flaky test: solution perform all ET3 event in separate test with same case
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        //perform NOC
        await page.click('text=Sign out');
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, respondentName, firstName, lastName, true);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        //perform all ET3 events as a LR
        await caseListPage.selectNextEvent('ET3 - Respondent Details');
        await legalRepPage.completeDraftET3ResponseForm();

        await caseListPage.selectNextEvent('Submit ET3 Form');
        await legalRepPage.submitET3ResponseForm();

    });
});

