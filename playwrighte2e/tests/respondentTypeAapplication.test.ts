import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import {Helpers} from "../pages/helpers/helper";

let caseNumber: string;
let subRef: string;
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
        await et3LoginPage.processRespondentLogin(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);

        //make type A application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeA');
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        //RET-5754
        //await citizenHubPage.validateApplicationBanner();
        await citizenHubPage.respondToRespondentApplication('TypeA');
    });

    test('Respondent makes Type A Application, review Application and review Application Response task generated', async ({
                                                                                           page,
                                                                                           loginPage,
                                                                                           caseListPage
                                                                                       }) => {
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword);
        caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

        await caseListPage.clickTab('Tasks');
        await Helpers.waitForTask(page, 'Review Application - Amend response');
        await Helpers.waitForTask(page, 'Review Application Response - Amend response');
        await caseListPage.signoutButton();
    });
});
