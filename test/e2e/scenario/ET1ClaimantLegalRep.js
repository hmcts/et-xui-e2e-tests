
const testConfig = require('../../../config.js');
const postcodeHelper = require('../../helper/postcode.js');
const postcode = 'LS1 2AJ';
const addressOption = ' Office 1 9 East Parade, Leeds';

Feature('End To End Tests For an ET1 claimant Representative makes a claim in Manage Case application');
Scenario(
  'Claimant Representative creates a claim (England and Wales - Singles) and submit',
  async ({
           I,
           loginPage,
           et1CreateDraftClaim,
           caseListPage,
           makeanApplicationPage
         }) => {
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await caseListPage.claimantRepCreateCase('Employment','Eng/Wales - Singles');
    await et1CreateDraftClaim.claimantWorkLocation();
    await postcodeHelper.enterPostcode(postcode, addressOption);
    await postcodeHelper.postcodeValidation('Submit');

    await et1CreateDraftClaim.et1Section1();
    await et1CreateDraftClaim.et1Section2();
    await et1CreateDraftClaim.et1Section3();

    let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();

    //Legal rep makes an application
    await caseListPage.selectTabLink('Applications');
    await caseListPage.navigateToClaimantRepMakeAnApplication(submissionReference);
    await makeanApplicationPage.selectApplicationType('Amend claim', 'claimantRep');
    await makeanApplicationPage.amendClaim('Amend claim');
    await makeanApplicationPage.copyCorrespondanceR92();
    await makeanApplicationPage.checkYourAnswersAndSubmit();
    await makeanApplicationPage.claimantCloseAndReturnToCaseDetails();


    // I.click('Sign out');
    //
    // I.wait(5);
    // I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    // await loginPage.processLoginOnXui(testConfig.TestEnvETManageCaseUser, testConfig.TestEnvETManageCasePassword);
    // await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);
    // let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    // console.log('The Case Number is:' + caseNumber);

  },
).tag('@nightly')
  .retry(2);
