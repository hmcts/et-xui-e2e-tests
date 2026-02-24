import { idamApi, test } from '../../fixtures/common.fixture.ts';
import config from '../../config/config.ts';
import { CaseworkerCaseFactory } from '../../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseDetailsValues, CaseTypeLocation } from '../../config/case-data.ts';

let caseId: string;
let caseNumber: string;
let userEmail:any;
let userPassword:any;
const respName = CaseDetailsValues.respondentName;
const firstName = CaseDetailsValues.claimantFirstName;
const lastName = CaseDetailsValues.claimantLastName;

test.describe('Respondent Notification scenarios tests', () =>{
  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    ({ userEmail, userPassword } = await idamApi.createDynamicRespondentUser());
  });

  test('Respondent Notification - Verify respondent receives notification and can view case details',
    async ({ manageCaseDashboardPage,loginPage,
             et3LoginPage,
             caseWorkerNotificationPage,
             caseListPage,
             responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim,
             respSubmitEt3
  }) => {
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await responseLandingPage.startEt3();
    await respContactDetailsPages.et3Section1();
    await respClaimantDetails.et3Section2();
    await respContestClaim.et3Section3();
    await respSubmitEt3.checkYourAnswers();
    await manageCaseDashboardPage.signOut();

    await manageCaseDashboardPage.visit();
    // changed from legalRep to caseWorker as legal rep cannot send notification
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseWorkerNotificationPage.navigateToSendANotifications();
    await caseWorkerNotificationPage.sendNotification('ET1 claim', 'No');
    await caseListPage.signoutButton();

    //Respondent verify notification
    await et3LoginPage.processRespondentLogin(userEmail, userPassword, caseNumber);
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, 'Mrs Test Auto', firstName, lastName);
  });
});
