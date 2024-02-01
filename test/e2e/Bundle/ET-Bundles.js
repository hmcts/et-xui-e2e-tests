
const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

//Scotish Details
const scotPostcode = 'FK15 9ET';
const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
const scotWorkPostcode = 'EH45 9BU';
const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';

const respondentName = 'Henry Marsh';
const ClaimantFirstName = 'Tutan';
const ClaimantLastName = 'Khamum';


Feature('End To End Test - Bundles');
Scenario(
  'Bundles - Legal rep submit hearing preparation document - England & Wales',
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
           listHearingPages,
           et1CaseVettingPages,
           legalRepNOCPages,
           et1CaseServingPages,
         }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    // //find case on manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // list hearing
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPages.listCase();
    I.click('Sign out');
    // complete noc on the case
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC(
      'Eng/Wales - Singles',
      submissionReference,
      respondentName,
      ClaimantFirstName,
      ClaimantLastName,
    );
    //submit a prepared document for hearing
    //await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectNextEvent('Prepare documents for hearing');
    await legalRepNOCPages.submitDocumentForHearingRespondent('Yes', 'Both Parties','Witness statement only');
    await legalRepNOCPages. verifyHearingDocumentTabLegalRep();

  },
)
  .tag('@bundle')
  .tag('@bundleLegalRep')
  .tag('@nightly');
 // .retry(1);
Scenario(
  'Bundles - Legal rep submit hearing preparation document - Scotland',
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
           listHearingPages,
           et1CaseVettingPages,
           legalRepNOCPages,
           et1CaseServingPages,
         }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      scotWorkPostcode,
      scotSelectedWorkAddress,
      scotFirstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    // //find case on manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // list hearing
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPages.listCase();
    I.click('Sign out');
    // complete noc on the case
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC(
      'Scotland - Singles',
      submissionReference,
      respondentName,
      ClaimantFirstName,
      ClaimantLastName,
    );
    //submit a prepared document for hearing
    //await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectNextEvent('Prepare documents for hearing');
    await legalRepNOCPages.submitDocumentForHearingRespondent('Yes', 'Both Parties','Witness statement only');
    await legalRepNOCPages. verifyHearingDocumentTabLegalRep();

  },
)
  .tag('@bundle')
  .tag('@bundleLegalRep')
  .tag('@bundleScot')
  .tag('@nightly');
// .retry(1);
Scenario(
  'Bundles - Claimant Submitting hearing preparation document - England',
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
           listHearingPages,
           et1CaseVettingPages,
           legalRepNOCPages,
           et1CaseServingPages,
           citizenHubPages,
         }) => {
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    I.wait(3);
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    //find case on manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // list hearing
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPages.listCase();
    I.click('Sign out');
    // complete noc on the case
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC(
      'Eng/Wales - Singles',
      submissionReference,
      respondentName,
      ClaimantFirstName,
      ClaimantLastName,
    );
    // go to cui
    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.regAccountContactTribunal('submit document for hearing');
    //submit a document for hearing
    await citizenHubPages.submitDocumentForHearingClaimant();

  })
  .tag('@bundle')
  .tag('@bundleClaimant')
  .tag('@nightly');
// .retry(1);