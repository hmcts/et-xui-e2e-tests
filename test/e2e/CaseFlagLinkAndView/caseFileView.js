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

Feature('End To End Test -Case File View ');
Scenario(
  'Case File View - Check ET 1 Claim in CFV folder - England',
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
    applicationsTabsPages,
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
    await caseListPage.processCaseFromCaseList(submissionReference);
    // check case file view
    await applicationsTabsPages.selectCaseFileView();
  },
)
  .tag('@caseFileView')
  .tag('@caseFileViewEW')
  .tag('@nightly')
  .retry(1);

Scenario(
  'Case File View - Check ET 1 Claim in CFV folder - Scotland',
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
    applicationsTabsPages,
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
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    console.log('The value of the Case Number ' + submissionReference);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    // check case file view
    await applicationsTabsPages.selectCaseFileView();
  },
)
  .tag('@caseFileView')
  .tag('@caseFileViewScot')
  .tag('@nightly')
  .retry(1);
