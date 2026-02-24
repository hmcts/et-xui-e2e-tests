import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';

// let caseId: { toString: () => any; };
let caseNumber: string;
let caseId: string;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
let userEmail:any;
let userPassword:any;

test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    userEmail = config.etRespondent.email;
    userPassword = config.etRespondent.password;
  });

  test('Validate ET3 Form start page and check case sensitivity', async ({et3LoginPage,
    respondentCaseOverviewPage,
    respondentTaskListPage,
  }) => {
    const respName = 'mrs test auto';
    const firstName = 'graYson';
    const lastName = 'beCker';

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await respondentCaseOverviewPage.validateRespondentCaseOverviewPage();
    await respondentTaskListPage.validateTaskListPage();
  });

  test('Validate claimant details in respondent application', async ({ et3LoginPage }) => {
    //RET-5517
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await et3LoginPage.validateClaimantDetailsInRespondentApp(firstName, lastName);
  });
});
