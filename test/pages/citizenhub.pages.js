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
  
clicksViewLinkOnClaimantApplicationPage(caseNumber, submissionReference) {
    I.click(`[href="/citizen-hub/${submissionReference}"]`);
  },
  
  verifyFormType() {
    I.click('//a[contains(.,"Contact the tribunal about my case")]');
    I.see('Contact the tribunal about your case');
    I.click('.govuk-accordion__show-all-text');
    I.see('Give notice that I want to withdraw all or part of my claim');
    I.see('I want to change my personal details');
    I.see('Apply to postpone my hearing');
    I.see('Apply to vary or revoke an order');
    I.see('Apply to have a decision considered afresh');
    I.see('Apply to amend my claim');
    I.see('Order the respondent to do something');
    I.see('Order a witness to attend to give evidence');
    I.see('Tell the tribunal the respondent has not complied with an order');
    I.see('Apply to restrict publicity');
    I.see('Strike out all or part of the response');
    I.see('Contact the tribunal about something else');
    I.see('Submit documents for a hearing');
    I.see('Call the Employment Tribunal customer contact centre');
 
  },
};
