import {params} from "../utils/config";
import { test } from '../fixtures/common.fixture';

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

test.describe('Make an application', () => {

    test.beforeEach(async ({ page,createCaseStep }) => {

        // ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page));
        subRef = '1739363094566013';
    });

    test.skip('Legal representatives make and application - England', async ({ page,citizenHubPage,loginPage,legalRepPage,et1CaseServingPage,caseListPage, applicationTabPage  }) => {
        // const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        // //perform NOC
        // await page.click('text=Sign out');
        // await page.goto(params.TestUrlForManageCaseAAT);
        // await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        // await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);
        //
        // //legal rep make an application
         //await legalRepPage.legalRepMakeAnApplication();
        //
        // //Claimant Reply to Application from Legal Rep
        // await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        // await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        // await citizenHubPage.respondToAnApplication();


        //Case Worker Request for additional information (respond to claimant's response)
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await caseListPage.processCaseFromCaseList();
        await applicationTabPage.respondToAnApplication();

        //claimant see response of respond
        // await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        // await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(submissionRef);

    });

});

