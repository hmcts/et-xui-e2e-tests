//noc
//prepare &submit hearing doc myhmcts
//prepare &submit hearing doc

const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
const respondentName = 'Henry Mash';
const ClaimantFirstName = 'Alex';
const ClaimantLastName = 'Bonfire';


Feature('End To End Test - Bundles');
Scenario(
  'Bundles - Legal rep submit hearing preparation document - England',
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
    //submit a prepared document for hearing
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectNextEvent('Prepare documents for hearing');
    await legalRepNOCPages.submitDocumentForHearing('Yes');
    //verify that the doc is visible --- tbc no story yet

  },
)
  .tag('@bundle')
  .tag('@bundleLagalRep')
  .tag('@nightly')
  .retry(1);
