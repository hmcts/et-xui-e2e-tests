import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { LegalRepCaseFactory } from '../data-utils/factory/exui/LegalRepCaseFactory.ts';
import DateUtilComponent from '../data-utils/DateUtilComponent.ts';

let caseNumber: string;
let caseId: string;

const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe('ET3/Respondent Applications', () => {
    test.beforeEach(async () => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
      ({caseId, caseNumber} =  await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
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
    test('Legal Representative created a case, Respondent makes Type A Application, LR can see application', async ({
      page,
      manageCaseDashboardPage,
      loginPage,
      caseListPage,
      et3LoginPage,
      respondentCaseOverviewPage,
      applicationTabPage,
    }) => {
      const respName = 'Mark McDonald';
      const firstName = CaseDetailsValues.claimantFirstName;
      const lastName = CaseDetailsValues.claimantLastName;

      ({ caseId, caseNumber } = await LegalRepCaseFactory.createAndProgressToSubmitEnglandWalesCase());
      console.log('Created ' + caseId + caseNumber);

      // assign case to respondent and make application
      await et3LoginPage.processRespondentLogin(config.etRespondent.email, config.etRespondent.password, caseNumber);
      await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
      await respondentCaseOverviewPage.respondentMakeApplication('TypeA', true);
      await respondentCaseOverviewPage.signOutButtonSyr();

      // legal rep view application
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      // legal rep can see an application
      await caseListPage.navigateToTab('Applications');
      await applicationTabPage.viewApplicationAndAssertDetails('Amend response', 'Open', [
        `Type of application - Amend response`,
        `Applicant - Respondent Representative`,
        `Application date - ${DateUtilComponent.formatToDayMonthYear(new Date())}`,
      ]);
    });

});
