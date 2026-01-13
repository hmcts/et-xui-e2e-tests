import { test } from '../../fixtures/common.fixture.ts';
import config from '../../config/config.ts';

let subRef: string;
let caseNumber: string;
let userEmail:any;
let userPassword:any;
const respName ='Mrs Test Auto';
const firstName ='Grayson';
const lastName = 'Becker';

test.describe('Respondent Notification scenarios tests', () =>{
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    ({userEmail, userPassword} = await createCaseStep.createRespUser());
  });

  test.skip('Respondent Notification - Verify respondent receives notification and can view case details',
    async ({ page, loginPage,
             et3LoginPage,
             notificationPage,
             et1CaseServingPage,
             caseListPage,
             respondentDetailsPage, responseLandingPage, respContactDetailsPages, respClaimantDetails, respContestClaim,
             respSubmitEt3
  }) => {

      await et3LoginPage.processRespondentLogin(userEmail, userPassword,caseNumber);
      await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);
      await responseLandingPage.startEt3();
      await respContactDetailsPages.et3Section1();
      await respClaimantDetails.et3Section2();
      await respContestClaim.et3Section3();
      await respSubmitEt3.checkYourAnswers();

      await page.goto(config.TestUrlForManageCaseAAT);
     // await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
      await notificationPage.navigateToSendANotifications();
      await notificationPage.sendNotification('ET1 claim', 'No');
      await caseListPage.signoutButton();

      //Respondent verify notification
      await et3LoginPage.processRespondentLogin(userEmail, userPassword,caseNumber);
      await et3LoginPage.replyToNewClaim(subRef, caseNumber, 'Mrs Test Auto', firstName, lastName);


  });



});
