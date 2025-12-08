import { test } from '../fixtures/common.fixture';
import { params } from '../config/config';


let caseNumber: any;
let submissionRef:string;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';


test.describe('Respondent Store Application for unrepresented cases', () => {

  test.beforeEach(async ({ page, createCaseStep }) => {
    submissionRef = await createCaseStep.setupCaseWorkerCaseVetAndAcceptViaApi(page, "England", "ET_EnglandWales", true);
    //  subRef = '1752767563027673';
  });


  test.skip(
    'Unrepresented Respondent to store Rule 92 application- Correspondence Yes',
    async ({ page, loginPage, caseListPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await page.goto(params.TestUrlForManageCaseAAT);
      await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
      caseNumber = await caseListPage.navigateToCaseDetails(submissionRef.toString(), 'EnglandWales');

      //RET-5466
      await et3LoginPage.processRespondentLoginForExistingCase(
        params.TestEnvET3RespondentEmailAddress,
        params.TestEnvET3RespondentPassword,
        caseNumber,
      );
      await respondentCaseOverviewPage.unrepresentedRespondentMakeApplication('Rule92', true);
      await respondentCaseOverviewPage.unrepresentedRespondentValidateApplication(true);
    },
  );

  test.skip(
    "Unrepresented Respondent to submit Rule 92 application- Correspondence No'",
    async ({ page, loginPage, caseListPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await page.goto(params.TestUrlForManageCaseAAT);
      await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
      caseNumber = await caseListPage.navigateToCaseDetails(submissionRef, 'EnglandWales');

      //RET-5466
      await et3LoginPage.processRespondentLoginForExistingCase(
        params.TestEnvET3RespondentEmailAddress,
        params.TestEnvET3RespondentPassword,
        caseNumber,
      );
      await respondentCaseOverviewPage.unrepresentedRespondentMakeApplication('Rule92', false);
      await respondentCaseOverviewPage.unrepresentedRespondentValidateApplication(false);
    },
  );
});
