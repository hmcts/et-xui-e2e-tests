//const applicationPage = require('../../pages/application.page.js');
const testConfig = require('../../../config.js');
const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

//Scotish Details
//const scotPostcode = 'FK15 9ET';
//const scotAddressOption = '3e, Station Road, Dunblane, FK15 9ET';
//const scotWorkPostcode = 'EH45 9BU';
//const scotSelectedWorkAddress = 'Unit 4, Cherry Court, Cavalry Park, Peebles, EH45 9BU';
//const scotFirstLineOfAddress = 'Unit 4, Cherry Court, Cavalry Park';
const respondentName = 'Henry Marsh';
// const ClaimantFirstName = 'etAutoesting';
//const ClaimantLastName = 'Manual';

Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario(
  'Submit and Respond to an application-- England and Wales - Singles',
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
    legalRepNOCPages,
    //citizenHubPages,
  }) => {
    I.amOnPage('/');
    //await loginPage.registerNewAccount();
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
    //let submissionReference = '1684228875185777';
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //await caseListPage.verifyCaseDetailsPage(true);
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    const { firstName, lastName } = await et1CaseServingPages.getClaimantFirstName();
    I.click('Sign out');
    // //NOC to assign a solicitor
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    //   await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await legalRepNOCPages.processNOC('Eng/Wales - Singles', submissionReference, respondentName, firstName, lastName);
    // I.click('Sign out');
    //let submissionReference = '1690114841176896';
    //console.log('The value of the Case Number ' + caseNumber);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    //let caseNumberNew = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('Applications');
    await caseListPage.navigateToMakeAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('Amend response');
    await makeanApplicationPage.amendResponse('Amend response');
    await makeanApplicationPage.copyCorrespondance();
    await makeanApplicationPage.checkYourAnswersAndSybmit();
    await makeanApplicationPage.closeAndReturnToCaseDetails();
    I.click('Sign out');
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.selectTab('Applications');
    await makeanApplicationPage.respondToAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('1 - Amend response');
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
).tag('@RET-3687-WIP');

Scenario(
  'Submit and Respond to an application -- Scotland - Singles',
  async ({
    I,
    //basePage,
    loginPage,
    //taskListPage,
    //personalDetailsPage,
    //employmentAndRespondentDetailsPage,
    //claimDetailsPage,
    //submitClaimPage,
    caseListPage,
    makeanApplicationPage,
    //et1CaseVettingPages,
    //et1CaseServingPages,
    //legalRepNOCPages,
    //citizenHubPages,
  }) => {
    I.amOnPage('/');
    // await basePage.processPreLoginPagesForTheDraftApplication(scotPostcode);
    // await loginPage.processLogin(testConfig.TestEnvETUser, testConfig.TestEnvETPassword);
    // await taskListPage.processPostLoginPagesForTheDraftApplication();
    // await personalDetailsPage.processPersonalDetails(scotPostcode, 'Scotland', scotAddressOption);
    // await employmentAndRespondentDetailsPage.processStillWorkingJourney(
    //   scotPostcode,
    //   scotSelectedWorkAddress,
    //   scotFirstLineOfAddress,
    // );
    // await claimDetailsPage.processClaimDetails();
    // let submissionReference = await submitClaimPage.submitClaim();
    // I.click('Sign out');
    // //let submissionReference = '1684228875185777';
    // I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    // await loginPage.processLogin(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    // await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles (RET)', submissionReference);
    // let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // await caseListPage.verifyCaseDetailsPage();
    // await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    // await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    // //await caseListPage.verifyCaseDetailsPage(true);
    // await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    // await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    // //Case acceptance or rejection Event
    // await caseListPage.selectNextEvent('6: Object'); //Case acceptance or rejection Event
    // I.click('Sign out');
    // //NOC to assign a solicitor
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    //   await loginPage.processLogin(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    //  // await legalRepNOCPages.processNOC('Scotland - Singles (RET)', submissionReference, respondentName, ClaimantFirstName, ClaimantLastName);
    //  // I.click('Sign out');
    let scotishsubmissionReference = '1690123236270818';
    //   //console.log('The value of the Case Number ' + caseNumber);
    //   await caseListPage.searchCaseApplicationWithSubmissionReference('Scotland - Singles (RET)', submissionReference);
    //   let caseNumberNew = await caseListPage.processCaseFromCaseList(submissionReference);
    //   await caseListPage.selectTab('Applications');
    //   await caseListPage.navigateToMakeAnApplication(submissionReference);
    //   await makeanApplicationPage.selectApplicationType('Amend response');
    //   await makeanApplicationPage.amendResponse('Amend response');
    //   await makeanApplicationPage.copyCorrespondance();
    //   await makeanApplicationPage.checkYourAnswersAndSybmit();
    //   await makeanApplicationPage.closeAndReturnToCaseDetails();
    //   I.click('Sign out');
    await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    await caseListPage.searchCaseApplicationWithSubmissionReference(
      'Scotland - Singles (RET)',
      scotishsubmissionReference,
    );
    await caseListPage.processCaseFromCaseList(scotishsubmissionReference);
    await caseListPage.selectTab('Applications');
    await makeanApplicationPage.respondToAnApplication(scotishsubmissionReference);
    await makeanApplicationPage.selectApplicationType('1 - Amend response');
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
).tag('@RET-3687-WIP');
