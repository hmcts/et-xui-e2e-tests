import { test } from '../fixtures/common.fixture';
import { params } from '../config/config';


// let caseId: { toString: () => any; };
let caseNumber: any;
let subRef;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
let userEmail:any;
let userPassword:any;


test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    // Create dynamic respondent user
    ({userEmail, userPassword} = await createCaseStep.createRespUser());
  });

  test('Validate ET3 Form start page and check case sensitivity', async ({ et3LoginPage, respondentCaseOverviewPage, respondentTaskListPage }) => {
    const respName ='mrs test auto';
    const firstName ='graYson';
    const lastName = 'beCker';

    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
    await respondentCaseOverviewPage.validateRespondentCaseOverviewPage();
    await respondentTaskListPage.validateTaskListPage();
  });

  test('Validate claimant details in respondent application', async ({ et3LoginPage, respondentCaseOverviewPage, respondentTaskListPage }) => {
    //RET-5517
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
    await et3LoginPage.validateClaimantDetailsInRespondentApp(firstName, lastName);
  });
});
