import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import {Helpers} from "../pages/helpers/Helper.ts";
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseNumber: string;
let caseId: string;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe.serial('ET3/Respondent Applications and verify WA tasks', () => {

    test('Respondent makes Type A Application, Claimant respond to an application successfully',
      async ({
              citizenHubLoginPage,
              et3LoginPage,
              respondentCaseOverviewPage,
              citizenHubPage
          }) => {
        caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
        const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
        caseNumber = response.case_data.ethosCaseReference;

        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
        await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);

        //make type A application
        await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);

        //validate application is visible in respondent application link
        await respondentCaseOverviewPage.validateApplication('TypeA');
        await respondentCaseOverviewPage.signOutButtonSyr();

        //Citizen & caseworker can view an application
        await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
        await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
        //RET-5754
        //await citizenHubPage.validateApplicationBanner();
        await citizenHubPage.respondToRespondentApplication('TypeA');
    });

    test('Respondent makes Type A Application, review Application and review Application Response task generated',
      async ({
        page,
             manageCaseDashboardPage,
             loginPage,
             caseListPage
      }) => {
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
        caseNumber = await caseListPage.navigateToCaseDetails(caseId, 'EnglandWales');

        await caseListPage.clickTab('Tasks');
        await Helpers.waitForTask(page, 'Review Application - Amend response');
        await Helpers.waitForTask(page, 'Review Application Response - Amend response');
        await caseListPage.signoutButton();
    });
});
