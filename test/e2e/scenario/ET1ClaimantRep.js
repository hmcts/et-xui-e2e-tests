//const applicationPage = require('../../pages/application.page.js');
const testConfig = require('../../../config.js');
const postcodeHelper = require('../../helper/postcode.js');
const postcode = 'LS1 2AJ';
const addressOption = ' Office 1 9 East Parade, Leeds';

Feature('End To End Tests For an ET1 claimant Representative makes a claim in Manage Case application');
Scenario(
  'Claimant creates a claim (England and Wales - Singles) and submit',
  async ({
           I,
           loginPage,
           et1CreateDraftClaim,
           caseListPage
         }) => {
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(testConfig.TestEnvETLegalRepUser, testConfig.TestEnvETLegalRepPassword);
    await caseListPage.claimantRepCreateCase('Employment','Eng/Wales - Singles');
    await et1CreateDraftClaim.claimantWorkLocation();
    await postcodeHelper.enterPostcode(postcode, addressOption);

    await et1CreateDraftClaim.et1Section1();
    await et1CreateDraftClaim.et1Section2();
    await et1CreateDraftClaim.et1Section3();
    await et1CreateDraftClaim.et1SubmitClaim();

  },
).tag('@nk');
