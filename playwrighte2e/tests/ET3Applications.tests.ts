import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';


let caseNumber: any;
let subRef;

test.describe('ET3/Respondent Journey', () => {
    test.beforeEach(async ({page, createCaseStep}) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

    });


    test.skip('ET3 Contact Tribunal or make Type A Application as respondent', async ({ et3LoginPage, respondentCaseOverviewPage, respondentTaskListPage }) => {
        //Assign a claim to respondent
        await et3LoginPage.processRespondentLogin(params.TestEnvET3RespondentEmailAddress, params.TestEnvET3RespondentPassword, caseNumber);
        await et3LoginPage.replyToNewClaim(subRef, caseNumber);

        //make type A application
        //validate application is visible in respondent application link

    });
});
