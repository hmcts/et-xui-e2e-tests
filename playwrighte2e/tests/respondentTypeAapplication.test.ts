import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';
import {Helpers} from "../helpers/helper";


let caseNumber: any;
let subRef;


const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe.serial('ET3/Respondent Applications and verify WA tasks', () => {

    test('Respondent makes Type A Application, Claimant respond to an application successfully', async ({
                                                                                                            page,
                                                                                                            createCaseStep,
                                                                                                            et3LoginPage,
                                                                                                            respondentCaseOverviewPage,
                                                                                                            citizenHubPage
                                                                                                        }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
        //subRef='1745846012875831'

        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);

        //make type A application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeA');
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        //RET-5754
        //await citizenHubPage.validateApplicationBanner();
        await citizenHubPage.respondToRespondentApplication('TypeA');
    });

    test('Respondent makes Type A Application, review Application and review Application Response task generated', async ({
                                                                                           page,
                                                                                           loginPage,
                                                                                           caseListPage,
                                                                                           et3LoginPage,
                                                                                           respondentCaseOverviewPage,
                                                                                           citizenHubPage
                                                                                       }) => {
        await page.goto(params.TestUrlForManageCaseAAT);
        await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();

        await caseListPage.clickTab('Tasks');
        await Helpers.waitForTask(page, 'Review Application - Amend response');
        await Helpers.waitForTask(page, 'Review Application Response - Amend response');
        await caseListPage.signoutButton();
    });
});
