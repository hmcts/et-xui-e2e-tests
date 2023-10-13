const { I } = inject();
const testConfig = require('../../config');

module.exports = {
  verifyWAtaskTabPage(submissionReference) {
    I.amOnPage(testConfig.TestUrlForManageCaseAAT + '/cases/case-details/' + `${submissionReference}` + '/tasks');
    I.waitForElement('#action_claim', 20);
    I.click('#action_claim');
  },
};

// [href='/cases/case-details/1692870832932534/tasks']
