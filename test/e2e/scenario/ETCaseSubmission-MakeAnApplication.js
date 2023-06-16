const applicationPage = require('../../pages/application.page.js');
const testConfig = require('../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';
Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario(
  'Create a claim for still working for organisation, submit and Respond to an application',
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
    makeanApplicationPage,
    et1CaseVettingPages,
    et1CaseServingPages,
    // citizenHubPages,
  }) => {
    I.amOnPage('/');
    // await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   workPostcode,
    //   selectedWorkAddress,
    //   firstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // let submissionReference = await submitClaimPage.submitClaim();
    // I.click('Sign out');
    let submissionReference = '1684228875185777';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    // await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    // let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // console.log('The value of the Case Number ' + caseNumber);
    // await caseListPage.selectTab('Applications');
    // await caseListPage.navigateToMakeAnApplication(submissionReference);
    // await makeanApplicationPage.selectApplicationType('Amend response');
    // await makeanApplicationPage.amendResponse('Amend response');
    // await makeanApplicationPage.copyCorrespondance();
    // await makeanApplicationPage.checkYourAnswersAndSybmit();
    // await makeanApplicationPage.closeAndReturnToCaseDetails();
    // I.click('Sign out');
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('Applications');
    await makeanApplicationPage.respondToAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('Postpone a hearing');
    await makeanApplicationPage.selectcaseManagementOption('caseManagementOrder');
    await makeanApplicationPage.selectPartyType('bothParties');
    await makeanApplicationPage.selectcaseManagementOrder('Legal officer');
    await makeanApplicationPage.selectResponseTotribunal('No');
    await makeanApplicationPage.submitApplication();
    await makeanApplicationPage.checkYourAnswersAndSybmit();
    await makeanApplicationPage.closeAndReturnToCaseDetails();

    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    //await caseListPage.verifyCaseDetailsPage();
    //await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    //await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    //await caseListPage.selectNextEvent('2: Object'); //Case acceptance or rejection Event
    //await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //I.click('Sign out');
    /*    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.VerifyFormType();
    */
  },
).tag('@RET-3687');

Scenario(
  'Create a claim for still working for organisation, submit and Respond to an application',
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
    makeanApplicationPage,
    et1CaseVettingPages,
    et1CaseServingPages,
    // citizenHubPages,
  }) => {
    I.amOnPage('/');
    // await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(postcode, 'England', addressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   workPostcode,
    //   selectedWorkAddress,
    //   firstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // let submissionReference = await submitClaimPage.submitClaim();
    // I.click('Sign out');
    let submissionReference = '1683876566560350';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    // await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    // let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // console.log('The value of the Case Number ' + caseNumber);
    // await caseListPage.selectTab('Applications');
    // await caseListPage.navigateToMakeAnApplication(submissionReference);
    // await makeanApplicationPage.selectApplicationType('Amend response');
    // await makeanApplicationPage.amendResponse('Amend response');
    // await makeanApplicationPage.copyCorrespondance();
    // await makeanApplicationPage.checkYourAnswersAndSybmit();
    // await makeanApplicationPage.closeAndReturnToCaseDetails();
    // I.click('Sign out');
    await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles (RET)', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('Applications');
    await makeanApplicationPage.respondToAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('Postpone a hearing');
    await makeanApplicationPage.selectcaseManagementOption('caseManagementOrder');
    await makeanApplicationPage.selectPartyType('bothParties');
    await makeanApplicationPage.selectcaseManagementOrder('Legal officer');
    await makeanApplicationPage.selectResponseTotribunal('No');
    await makeanApplicationPage.submitApplication();
    await makeanApplicationPage.checkYourAnswersAndSybmit();
    await makeanApplicationPage.closeAndReturnToCaseDetails();

    //await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber,'1666891874114742'); Test after the Citizen Hub Login is already in Session....
    //await caseListPage.verifyCaseDetailsPage();
    //await caseListPage.selectNextEvent('1: Object'); //Firing the ET1 Event.
    //await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    //await caseListPage.selectNextEvent('2: Object'); //Case acceptance or rejection Event
    //await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //I.click('Sign out');
    /*    await citizenHubPages.processCitizenHubLogin(
      testConfig.TestEnvETUser,
      testConfig.TestEnvETPassword,
      submissionReference,
    );
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.VerifyFormType();
    */
  },
).tag('@RET-3687-Scotland');
