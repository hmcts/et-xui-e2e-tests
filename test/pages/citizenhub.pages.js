const testConfig = require('../e2e/config');
const { I } = inject();

module.exports = {
  async verifyCitizenHubCaseOverviewPage(caseNumber, submissionReference) {
    I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
    I.see('Case overview - ');
    I.see('Case number ' + caseNumber);

    I.see('You have submitted your claim to the tribunal');
    I.see('We aim to process your claim by');
    I.see('In busy periods it may take longer.');
  },
};
