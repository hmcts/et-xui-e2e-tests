import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';

let caseNumber: string;
let caseId: string;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';
let userEmail:any;
let userPassword:any;

test.describe('ET3/Respondent Journey', () => {
  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    const response = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId);
    caseNumber = response.case_data.ethosCaseReference;
    userEmail = config.etRespondent.email;
    userPassword = config.etRespondent.password;
  });

  test('Respondent Assign a claim (ET3)', async ({ et3LoginPage, responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim, respSubmitEt3}) => {
    //Assign a claim to respondent
    await et3LoginPage.processRespondentLogin(userEmail, userPassword,caseNumber);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await responseLandingPage.startEt3();
    await respContactDetailsPages.et3Section1();
    await respClaimantDetails.et3Section2();
    await respContestClaim.et3Section3();
    await respSubmitEt3.checkYourAnswers();
  });
});
