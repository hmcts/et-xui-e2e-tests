const testConfig = require('../../../config.js');
const { date, month, year } = require('../../pages/et1CreateDraftClaim.js');
const postcode = 'FK15 9ET';
const addressOption = '3e, Station Road, Dunblane, FK15 9ET';
const workPostcode = 'EH45 9BU';
const selectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const firstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';
const respondentName = 'Henry Marsh';

const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear();

// Note :
// There is a exitsing big attached to this test where a LR is not able to see the judgement issued on an tseApplication
Feature('End To End Tests For an ET Case progression with NOC and response to Tribunal request');
Scenario(
  'Case Progression - assign case to legal rep and respond to tribunal -- legal rep',
  async ({
    I,
    basePage,
    loginPage,
    taskListPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
    caseListPage,
    et1CaseVettingPages,
    et1CaseServingPages,
    legalRepNOCPages,
    caseOverviewPage,
    applicationsTabsPages,
    sendNotificationPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + caseNumber);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    const { firstName, lastName } = await et1CaseServingPages.getClaimantFirstName();
    I.click('Sign out');
    //NOC to assign a solicitor
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC('Eng/Wales - Singles', submissionReference, respondentName, firstName, lastName);

    //Make an Application
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC('Scotland - Singles (RET)', submissionReference, respondentName, firstName, lastName);
    await caseListPage.selectTab('Applications');
    await caseListPage.navigateToMakeAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('Amend response');
    await makeanApplicationPage.amendResponse('Amend response');
    await makeanApplicationPage.copyCorrespondance();
    await makeanApplicationPage.checkYourAnswersAndSubmit();
    await makeanApplicationPage.closeAndReturnToCaseDetails();
    I.click('Sign out');
    I.wait(5);    
    // caseworker records a decision
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.findCasewithRefNumber(submissionReference);
    await caseOverviewPage.recordAdecisionOnAcase(
      submissionReference,
      '1 - Amend response',
      'granted',
      'judgement',
      'judge',
      'both',
    );
   I.click('Sign out');

   // legal rep view Judgement
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectTab('Judgments, orders & notifications')
    await caseListPage.navigateToJudgememts('View a judgment, order or notification')
    await caseListPage.selectAJudgement('Amend response')    
  },
)
  .tag('@legalRepTSE')
  .tag('@nightly');
//.retry(1);
