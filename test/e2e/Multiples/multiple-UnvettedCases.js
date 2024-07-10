const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
const respondentName = 'Henry Marsh';

//Scotish Details
const scotPostcode = 'FK15 9ET';
const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
const scotWorkPostcode = 'EH45 9BU';
const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';

Feature('End To End Test - Add cases yet to be vetted to Multiples');
Scenario(
  'Unvetted cases - EnglandWales',
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
         }) => {
    //case 1
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
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
    // case 2
    I.amOnPage('/', 20);
    I.clearCookie();
    I.refreshPage();
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference2 = await submitClaimPage.submitClaim();
    I.click('Sign out');
    //manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // process cases number 2
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber2 = await caseListPage.processCaseFromCaseList(submissionReference2);
    // create multiple with 2 cases not vetted
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.createMutipleCase('Eng/Wales - Multiples');
    await caseListPage.createMutiple('None Vetted Multiples', 'Leeds');
    await caseListPage.addTwoCases(caseNumber, caseNumber2);
    // verify event list is working for the unvetted cases
    await caseListPage.selectNextEvent('Batch Update Cases');
  },
)
  .tag('@Unvetted')
  .tag('@UnvettedEW')
  .tag('@unreleased');

Scenario(
  'Partly Vetted Multiples -One out of Two cases vetted -Scotland',
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
         }) => {
    //case 1
    I.amOnPage('/');
    await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      scotWorkPostcode,
      scotSelectedWorkAddress,
      scotFirstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    console.log('The value of the Case Number ' + submissionReference);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    I.click('Sign out');
    // case 2
    I.amOnPage('/', 20);
    I.clearCookie();
    I.refreshPage();
    await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      scotWorkPostcode,
      scotSelectedWorkAddress,
      scotFirstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference2 = await submitClaimPage.submitClaim();
    // process case no 2
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    console.log('The value of the Case Number ' + submissionReference2);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference2);
    let caseNumber2 = await caseListPage.processCaseFromCaseList(submissionReference2);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber2);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber2);
    await caseListPage.createMutiple('Partly Vetted Multiples', 'Glasgow');
    await caseListPage.addTwoCases(caseNumber, caseNumber2);
    // verify list events are working for partly vetted multiples
    await caseListPage.selectNextEvent('Upload Document');


  },
)
  .tag('@Unvetted')
  .tag('@partlyVettedScot')
  .tag('@nightly');
