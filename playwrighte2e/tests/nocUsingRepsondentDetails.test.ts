import { test } from '../fixtures/common.fixture';
import config from "../config/config";

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber: string;

test.describe('perform NOC for respondent', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5787
  test('Process NOC using respondent details',
    async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, axeUtils }) => {
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
      // @ts-ignore
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, "", "", true, true,axeUtils);
    });
});

test.describe('perform NOC for claimant and assign a new claimant representative', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5787
  test('Process NOC using claimant details, assign a new claimant representative and check original claimant representative cannot access a case',
    async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, citizenHubPage,axeUtils}) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      let caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
      // @ts-ignore
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, true, false,axeUtils);

      await page.click('text=Sign out');

      //Assign a case to another legal representative
      await loginPage.processLogin(config.TestEnvETRespondentEmailAddress, config.TestEnvETRespondentPassword);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, false);
      await page.click('text=Sign out');

      //validate case no longer accessible by original legal representative
      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
      //TODO
      // add validation
    });
});
