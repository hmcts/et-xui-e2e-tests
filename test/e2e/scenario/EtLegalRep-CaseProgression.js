// go through NOC
// legal rep make application
// click on banner notification
// check status from Citizen hub
// Tribunal makes a request/cmo
// check status from application hub
// citizen respond to application

const testConfig = require('../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
const respondentName = 'Henry Mash';
const ClaimantFirstName = 'Alexa';
const ClaimantLastName = 'Siri';

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
    citizenHubPages,
    respondentRepresentativePage,
    legalRepNOCPages,
  }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + caseNumber);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('2: Object'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //Case acceptance or rejection Event
    await caseListPage.selectNextEvent('6: Object'); //Case acceptance or rejection Event
    await respondentRepresentativePage.addRespondentRepresentative('registered', 'test solicitor firm');
    I.click('Sign out');
    //NOC to assign a solicitor
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC(
      'Eng/Wales - Singles',
      submissionReference,
      respondentName,
      ClaimantFirstName,
      ClaimantLastName
    );
    I.click('Sign out');
    //Case progression  -- applicant to respond to tribunal request
    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.regAccountContactTribunal('withdraw all or part of my claim');
    await citizenHubPages.rule92Question('yes');
    await citizenHubPages.cyaPageVerification();
  },
)
  .tag('@sample')
  .retry(1);
