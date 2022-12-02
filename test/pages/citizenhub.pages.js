const testConfig = require('../e2e/config');
const { I } = inject();

module.exports = {
  processCitizenHubLogin(test_case_username, test_case_password, submissionReference) {
    I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
    I.waitForElement('#username', 10);
    I.fillField('#username', test_case_username);
    I.fillField('#password', test_case_password);
    I.click('[type="submit"]');
  },

  verifyCitizenHubCaseOverviewPage(caseNumber) {
    I.see('Case overview - ');
    I.see('Case number ' + caseNumber);

    I.see('You have submitted your claim to the tribunal');
    I.see('We aim to process your claim by');
    I.see('In busy periods it may take longer.');
  },
  //clicks on the view link for the submitted case
  clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference) {
    I.click(`[href="/citizen-hub/${submissionReference}"]`);
  },
};
