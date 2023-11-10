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

Feature('End To End Test -Case Linking ');
Scenario(
  'Case Flag - Claimant level - Scotland',
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
    caseFlagPages,
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
    //manage case
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    console.log('The value of the Case Number ' + submissionReference);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case');
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // add case flag
    await caseListPage.selectNextEvent('Create a case flag');
    await caseFlagPages.setCaseFlagLevel('claimant level');
    await caseFlagPages.caseFlagReasonsCaseLevel('Others');
    await caseFlagPages.setCaseFlagReasonOptions('Others');
    await caseFlagPages.caseFlagSubmission();
    // view case flag
    await caseFlagPages.viewCaseFlags();
    //remove case flag
    await caseFlagPages.deactivateCaseFlag();
  },
)
  .tag('@caseFlags')
  .tag('@cFlagsSc')
  .tag('@nightly')
  .retry(1);

Scenario(
  'Case Flag - Respondent and Case Level- England & Wales',
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
    caseFlagPages,
  }) => {
    //case 1
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
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    console.log('The value of the Case Number ' + submissionReference);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // case vetting
    await caseListPage.selectNextEvent('ET1 case vetting');
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // case acceptance
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // add case flag
    await caseListPage.selectNextEvent('Create a case flag');
    await caseFlagPages.setCaseFlagLevel('claimant level');
    await caseFlagPages.caseFlagReasonsCaseLevel('Others');
    await caseFlagPages.setCaseFlagReasonOptions('Others');
    await caseFlagPages.caseFlagSubmission();
    // view case flag
    await caseFlagPages.viewCaseFlags();
    // create case level flag
    await caseListPage.selectNextEvent('Create a case flag');
    await caseFlagPages.setCaseFlagLevel('case level');
    await caseFlagPages.caseFlagReasonsCaseLevel('Others');
    await caseFlagPages.setCaseFlagReasonOptions('Others');
    await caseFlagPages.caseFlagSubmission();
    // view case flag
    await caseFlagPages.viewCaseFlags();
    // remove case flag
    await caseFlagPages.deactivateCaseFlag();
  },
)
  .tag('@caseFlags')
  .tag('@cFlagsEW')
  .tag('@nightly')
  .retry(1);
