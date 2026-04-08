import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseNumber: any;
let caseId:string;

test.describe('Respondent Store Application for unrepresented cases', () => {
  //TODO
  test.beforeEach(async () => {
    ({caseId, caseNumber} = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });


  test.skip(
    'Unrepresented Respondent to store Rule 92 application- Correspondence Yes',
    async ({ loginPage, manageCaseDashboardPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

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
    async ({ loginPage, manageCaseDashboardPage, et3LoginPage, respondentCaseOverviewPage }) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

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
