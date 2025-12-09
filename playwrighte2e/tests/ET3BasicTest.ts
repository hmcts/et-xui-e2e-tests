import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';

let caseNumber: any;
let subRef;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
let userEmail:any;
let userPassword:any;



test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async ({ page, createCaseStep, axeUtils }) => {
    ({ subRef, caseNumber } = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true,axeUtils));
    // Create dynamic respondent user
    ({userEmail, userPassword} = await createCaseStep.createRespUser());

  });

  test('Respondent Assign a claim (ET3)', async ({ et3LoginPage, responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim, respSubmitEt3}) => {
    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(userEmail, userPassword,caseNumber);
    await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
    await responseLandingPage.startEt3();
    await respContactDetailsPages.et3Section1();
    await respClaimantDetails.et3Section2();
    await respContestClaim.et3Section3();
    await respSubmitEt3.checkYourAnswers();
  });
});
