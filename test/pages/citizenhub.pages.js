const testConfig = require('../e2e/config');
const {expect} = require('chai');
const { I } = inject();

module.exports = {
  veiwResponseLink: '[href="/case-document/response-acknowledgement"]',
  statusBeforeView: '.govuk-tag--red',
  statusAfterView: '//strong[contains(.,"Viewed")]',
  backButton: '.govuk-back-link',
  linkToAttachedDocument: '[class="govuk-link"]',
  linkToET3Response: '[href="/case-document/response-from-respondent"]',

  processCitizenHubLogin(test_case_username, test_case_password, submissionReference) {
    I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
    //I.waitForElement('#username', 10);
    //I.fillField('#username', test_case_username);
    //I.fillField('#password', test_case_password);
    //I.click('[type="submit"]');
    I.waitForElement('#main-content', 20);
    //I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
  },

  verifyCitizenHubCaseOverviewPage(caseNumber) {
    I.see('Case overview - ');
    I.see('Case number ' + caseNumber);

    I.see('You have submitted your claim to the tribunal');
    I.see('We aim to process your claim by');
    I.see('In busy periods it may take longer.');
  },

  clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference) {
    I.refreshPage();
    I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
    I.waitForElement('#main-content', 20);
  },

  verifyET3RespondentResponseonCUI() {
    I.waitForElement(this.veiwResponseLink, 10)
    I.see(`The tribunal has acknowledged the respondent's response.`);
    let flagStatusBeforeView = I.grabTextFrom(this.statusBeforeView);
    expect(flagStatusBeforeView).to.eql('Not viewed yet');
    I.click(this.veiwResponseLink);
    I.waitForElement(this.linkToAttachedDocument, 20);
    I.see('Acknowledgement of response');
    I.click(this.backButton);
    I.waitForElement(this.linkToET3Response, 20);
    let flagStatusAfterView = I.grabTextFrom(this.statusAfterView);
    expect(flagStatusAfterView).to.eql('Viewed');

  }
};
