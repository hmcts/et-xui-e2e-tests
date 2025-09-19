import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber;

test.describe('perform NOC for respondent', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5787
  test.skip('Process NOC using respondent details',
    async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, citizenHubPage }) => {
      await page.click('text=Sign out');

      await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      // @ts-ignore
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, "", "", true, true);
    });
});

test.describe('perform NOC for claimant and assign a new claimant representative', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5787
  test.skip('Process NOC using claimant details, assign a new claimant representative and check original claimant representative cannot access a case',
    async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, citizenHubPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      // @ts-ignore
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, true, false);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      caseNumber = await caseListPage.processCaseFromCaseList();
      await page.click('text=Sign out');

      //Assign a case to another legal representative
      await loginPage.processLogin(params.TestEnvETRespondentEmailAddress, params.TestEnvETRespondentPassword);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, true, false);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      caseNumber = await caseListPage.processCaseFromCaseList();
      await page.click('text=Sign out');

      //validate case no longer accessible by original legal representative
      await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      //TODO
      // add validation
    });
});