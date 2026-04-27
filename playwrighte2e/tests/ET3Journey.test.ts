import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { users } from '../config/config.dynamic.ts';
import { CaseDetailsValues } from '../config/case-data.ts';

let caseNumber: string;
let caseId: string;

test.describe('ET3/Respondent Journey', () => {
  test.use({
    storageState: users.etRespondent.sessionFile,
  });

  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });

  test('Validate ET3 Form start page and check case sensitivity', async ({et3LoginPage,
    respondentCaseOverviewPage,
    respondentTaskListPage
  }) => {
    const respName = 'mrs test auto';
    const firstName = 'graYson';
    const lastName = 'beCker';

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(users.etRespondent);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await respondentCaseOverviewPage.validateRespondentCaseOverviewPage();
    await respondentTaskListPage.validateTaskListPage();
  });

  test('Validate claimant details in respondent application', async ({ et3LoginPage }) => {
    //RET-5517
    await et3LoginPage.processRespondentLogin(users.etRespondent);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, CaseDetailsValues.respondentName, CaseDetailsValues.claimantFirstName, CaseDetailsValues.claimantLastName);
    await et3LoginPage.validateClaimantDetailsInRespondentApp(CaseDetailsValues.claimantFirstName, CaseDetailsValues.claimantLastName);
  });
});
