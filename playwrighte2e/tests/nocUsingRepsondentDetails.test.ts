import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;
let firstName: string;
let lastName: string;

test.describe('perform NOC for respondent', () => {

  test.beforeEach(async ({ manageCaseDashboardPage }) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    await manageCaseDashboardPage.visit();
    firstName = CaseDetailsValues.claimantFirstName;
    lastName = CaseDetailsValues.claimantLastName;
  });

  //RET-5787
  test('Process NOC using respondent details',
    async ({ loginPage, legalRepPage, axeUtils }) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);

      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber, "", "", false, true,axeUtils);
    });

  //RET-5787
  test('Process NOC using claimant details, assign a new claimant representative and check original claimant representative cannot access a case',
    async ({ manageCaseDashboardPage, caseListPage, loginPage, legalRepPage,axeUtils}) => {
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber, firstName, lastName, false, false,axeUtils);
      await manageCaseDashboardPage.signOut();

      //Assign a case to another legal representative
      await loginPage.processLogin(config.etLegalRepresentative2.email, config.etLegalRepresentative2.password, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', caseId, caseNumber, firstName, lastName, false, false);
      await manageCaseDashboardPage.signOut();

      //validate case no longer accessible by original legal representative
      await loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', caseId);
      await caseListPage.verifyNoCasesFoundMessage();
      await manageCaseDashboardPage.signOut();
    });
});
