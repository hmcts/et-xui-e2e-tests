import { test } from '../fixtures/common.fixture';
import config from '../config/config';

let caseNumber: any;
let submissionRef:string;

test.describe('Respondent Store Application for unrepresented cases', () => {
  //TODO
  test.beforeEach(async ({ page, createCaseStep }) => {
  //  submissionRef = await createCaseStep.setupCaseWorkerCaseVetAndAcceptViaApi(page, "England", "ET_EnglandWales", true);
    submissionRef = '1752767563027673';
  });


  test.skip(
    'Unrepresented Respondent to store Rule 92 application- Correspondence Yes',
    async ({ page, loginPage, caseListPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await page.goto(config.manageCaseBaseUrl);
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await caseListPage.navigateToCaseDetails(submissionRef.toString(), 'EnglandWales');

      //RET-5466
      await et3LoginPage.processRespondentLoginForExistingCase(
        config.etRespondent.email,
        config.etRespondent.password,
        caseNumber,
      );
      await respondentCaseOverviewPage.unrepresentedRespondentMakeApplication('Rule92', true);
      await respondentCaseOverviewPage.unrepresentedRespondentValidateApplication(true);
    },
  );

  test.skip(
    "Unrepresented Respondent to submit Rule 92 application- Correspondence No'",
    async ({ page, loginPage, caseListPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await page.goto(config.manageCaseBaseUrl);
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await caseListPage.navigateToCaseDetails(submissionRef, 'EnglandWales');

      //RET-5466
      await et3LoginPage.processRespondentLoginForExistingCase(
        config.etRespondent.email,
        config.etRespondent.password,
        caseNumber,
      );
      await respondentCaseOverviewPage.unrepresentedRespondentMakeApplication('Rule92', false);
      await respondentCaseOverviewPage.unrepresentedRespondentValidateApplication(false);
    },
  );
});
