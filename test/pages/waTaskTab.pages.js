const { I } = inject();
const testConfig = require('../../config');

module.exports = {

  et1VettingLink: '//a[contains(.,"ET1 Vetting")]',

  verifyWAtaskTabPage(submissionReference) {
    I.waitForElement(this.et1VettingLink, 20);
    I.click(this.et1VettingLink);
  },
};

