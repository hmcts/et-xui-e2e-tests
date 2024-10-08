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

Feature('End To End Test - Multiples ');
Scenario(
  'Grant Legal Rep access to multiples Cases - Scotland',
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
             legalRepNOCPages
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
      //manage case
      I.amOnPage(testConfig.TestUrlForManageCaseAAT);
      await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);

      //let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
      console.log('The value of the Case Number ' + submissionReference);
      let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
      // case vetting
      await caseListPage.selectNextEvent('ET1 case vetting');
      await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
      // case acceptance
      await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
      await et1CaseServingPages.processET1CaseServingPages(caseNumber);
      let { firstName, lastName } = await et1CaseServingPages.getClaimantFirstName();
      // process case 2
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
      let caseNumber2 = await caseListPage.processCaseFromCaseList(submissionReference2);
      // case vetting
      await caseListPage.selectNextEvent('ET1 case vetting');
      await et1CaseVettingPages.processET1CaseVettingPages(caseNumber2);
      // case acceptance
      await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
      await et1CaseServingPages.processET1CaseServingPages(caseNumber2);
      let { firstNameTwo, lastNameTwo } = await et1CaseServingPages.getClaimantFirstName()
      // Complete NOC to assign a solicitor
      I.amOnPage(testConfig.TestUrlForManageCaseAAT);
      await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
      await legalRepNOCPages.processNOC('Eng/Wales - Singles', submissionReference, respondentName, firstName, lastName);
      await legalRepNOCPages.processNOC('Eng/Wales - Singles', submissionReference2, respondentName, firstNameTwo, lastNameTwo);
      I.click('Sign out');
     // create multiples with 2 cases
      await caseListPage.createMutipleCase('Eng/Wales - Multiples');
      await caseListPage.createMutiple('MultipleNotification', 'Leeds');
      await caseListPage.addTwoCases(caseNumber, caseNumber2, 'true');
      // get multiple case number
      await caseListPage.findCaseWithRef(submissionReference2);
      const caseNumberForMultiple = await caseListPage.getMultiplecaseNumber();
      I.click('Sign out');
      // LR get access to multiples
      I.amOnPage(testConfig.TestUrlForManageCaseAAT);
      await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
      await caseListPage.searchMultipleCaseWithCaseNumber('Eng/Wales - Singles', submissionReference2);
      await caseListPage.processCaseFromCaseList(submissionReference2);
      await caseListPage.selectNextEvent('Add me to Multiple');
      await legalRepNOCPages.grantAccessToMultiples(submissionReference2)
      await caseListPage.searchMultipleCaseWithCaseNumber('Eng/Wales - Multiples', caseNumberForMultiple);
      I.see('Multiple Cases');
  },
)
  .tag('@MultLegalRep')
  .tag('@unreleased');
