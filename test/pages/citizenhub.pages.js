const testConfig = require('../../config');
const { I } = inject();

module.exports = {
  veiwResponseLink: '[href="/case-document/response-acknowledgement"]',
  et3ResponseLink: '[href="/case-document/response-from-respondent"]',
  statusBeforeView: '.govuk-tag--blue',
  statusAfterView: '//strong[contains(.,"Viewed")]',
  backButton: '.govuk-back-link',
  welshToggle: '//a[.="Cymraeg"]',
  linkToAttachedDocument: '[class="govuk-link"]',
  linkToET3Response: '[href="/case-document/response-from-respondent"]',
  contactTribunalLinkRegistered: '[href="/contact-the-tribunal"]',
  showAllApplicationType: '.govuk-accordion__show-all-text',
  withdrawClaimLink: '[href="/contact-the-tribunal/withdraw"]',
  applicationTextField: '#Contact-Application-Text',
  changePersonalDetail: '[href="/contact-the-tribunal/change-details"]',
  postponeMyHearing: '[href="/contact-the-tribunal/postpone"]',
  revokeAnOrder: '[href="/contact-the-tribunal/vary"]',
  reconsiderDecision: '[href="/contact-the-tribunal/reconsider-decision"]',
  amendClaim: '[href="/contact-the-tribunal/amend"]',
  orderRespondent: '[href="/contact-the-tribunal/respondent"]',
  orderWitness: '[href="/contact-the-tribunal/witness"]',
  respondentNotComplied: '[href="/contact-the-tribunal/non-compliance"]',
  restrictPublicity: '[href="/contact-the-tribunal/publicity"]',
  strikeOutResponse: '[href="/contact-the-tribunal/strike"]',
  reconsiderJudgment: '[href="/contact-the-tribunal/reconsider-judgement"]',
  somethingElse: '[href="/contact-the-tribunal/other"]',
  yesOptionOnRule92: '#copyToOtherPartyYesOrNo',
  noOptionOnRule92: '#copyToOtherPartyYesOrNo-2',
  addInfoToNoOption: '#copyToOtherPartyText',
  submitApplicationButton: '#main-form-submit',
  returntoCUIcaseOverviewButton: '//a[contains(.,"Close and return to case overview")]',
  notificationFlagBefore: '.govuk-tag--red',
  notificationLink: '[href="/tribunal-orders-and-requests"]',
  sendNotifButton: 'td:nth-of-type(2) > .govuk-link',
  respondButton: '.govuk-template__body .govuk-grid-row .govuk-button',
  tribunalResponseField: '#response-text',
  noSupportingMaterialOption: '[for="supporting-material-yes-no-2"]',
  responseSubmitButton: '#main-form-submit',
  yesRule92Button: '[for="copyToOtherPartyYesOrNo-2"]',
  returnOverviewButton: '.govuk-template__body > .govuk-width-container > .govuk-button-group > .govuk-button',
  notificationFlagAfter: '.app-task-list > li:nth-of-type(5) .govuk-tag',

  processCitizenHubLogin(test_case_username, test_case_password, submissionReference) {
    I.amOnPage(testConfig.TestUrl + '/citizen-hub/' + submissionReference);
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
    I.waitForElement(this.veiwResponseLink, 10);
    I.see("The tribunal has acknowledged the respondent's response.");
    I.scrollTo(this.et3ResponseLink);
    I.wait(2);
    I.see('Ready to view', { css: this.statusBeforeView });
    I.click(this.veiwResponseLink);
    I.waitForElement(this.linkToAttachedDocument, 20);
    I.see('Acknowledgement of response');
    I.click(this.linkToAttachedDocument);
    I.wait(5);
    I.click(this.backButton);
    I.waitForElement(this.linkToET3Response, 20);
    // the change of status is failing to be fixed by PET team
    //I.see('Viewed', { css: this.statusAfterView });
  },
  regAccountContactTribunal(applicationType) {
    I.waitForElement(this.contactTribunalLinkRegistered, 20);
    I.click(this.contactTribunalLinkRegistered);
    I.waitForElement('#main-content', 20);
    I.see('Contact the tribunal about your case');
    I.see('Call the Employment Tribunal customer contact centre');
    I.click(this.showAllApplicationType);
    try {
      switch (applicationType) {
        case 'withdraw all or part of my claim':
          I.waitForElement('#contact-options-content-1', 5);
          I.click(this.withdrawClaimLink);
          I.waitForElement('#main-content', 20);
          I.see('I want to withdraw all or part of my claim');
          break;
        case 'change personal details':
          I.waitForElement('#contact-options-content-2', 5);
          I.click(this.changePersonalDetail);
          I.waitForElement('#main-content', 20);
          I.see('I want to change my personal details');
          break;
        case 'postpone hearing':
          I.waitForElement('#contact-options-content-3', 5);
          I.click(this.postponeMyHearing);
          I.waitForElement('#main-content', 20);
          I.see('Apply to postpone my hearing');
          break;
        case 'revoke an order':
          I.waitForElement('#contact-options-content-4', 5);
          I.click(this.revokeAnOrder);
          I.waitForElement('#main-content', 20);
          I.see('Apply to vary or revoke an order');
          break;
        case 'decision consider afresh':
          I.waitForElement('#contact-options-content-5', 5);
          I.click(this.reconsiderDecision);
          I.waitForElement('#main-content', 20);
          I.see('Apply to have a decision considered afresh');
          break;
        case 'amend my claim':
          I.waitForElement('#contact-options-content-6', 5);
          I.click(this.amendClaim);
          I.waitForElement('#main-content', 20);
          I.see('Apply to amend my claim');
          break;
        case 'order respondent':
          I.waitForElement('#contact-options-content-7', 5);
          I.click(this.orderRespondent);
          I.waitForElement('#main-content', 20);
          I.see('Order the respondent to do something');
          break;
        case 'order witness':
          I.waitForElement('#contact-options-content-8', 5);
          I.click(this.orderWitness);
          I.waitForElement('#main-content', 20);
          I.see('Order a witness to attend to give evidence');
          break;
        case 'respondent has not complied':
          I.waitForElement('#contact-options-content-9', 5);
          I.click(this.respondentNotComplied);
          I.waitForElement('#main-content', 20);
          I.see('Tell the tribunal the respondent has not complied with an order');
          break;
        case 'restrict publicity':
          I.waitForElement('#contact-options-content-10', 5);
          I.click(this.restrictPublicity);
          I.waitForElement('#main-content', 20);
          I.see('Apply to restrict publicity');
          break;
        case 'strike out response':
          I.waitForElement('#contact-options-content-11', 5);
          I.click(this.strikeOutResponse);
          I.waitForElement('#main-content', 20);
          I.see('Strike out all or part of the response');
          break;
        case 'reconsider judgment':
          I.waitForElement('#contact-options-content-12', 5);
          I.click(this.reconsiderJudgment);
          I.waitForElement('#main-content', 20);
          I.see('Apply for a judgment to be reconsidered');
          break;
        case 'contact tribunal about something else':
          I.waitForElement('#contact-options-content-13', 5);
          I.click(this.somethingElse);
          I.waitForElement('#main-content', 20);
          I.see('Contact the tribunal');
          break;
        default:
          throw new Error('... invalid option, check you options');
      }
    } catch (e) {
      console.error('invalid option', e.message);
    }
    I.scrollPageToBottom();
    I.fillField(this.applicationTextField, 'blah blah');
    I.click('Continue');
  },
  rule92Question(option) {
    switch (option) {
      case 'yes':
        I.checkOption(this.yesOptionOnRule92);
        break;
      case 'no':
        I.checkOption(this.noOptionOnRule92);
        I.fillField(this.addInfoToNoOption, 'dont want other party to see this');
        break;
      default:
        throw new Error('... you can only select a yes or no option on rule 92 page');
    }
    I.click('Continue');
    I.waitForElement('#main-content', 20);
  },
  cyaPageVerification() {
    I.see('Application type');
    I.see('What do you want to tell or ask the tribunal?');
    I.see('Supporting material');
    I.see('Do you want to copy this correspondence to the other party to satisfy the Rules of Procedure?');
    I.click(this.submitApplicationButton);
    I.waitForElement('#main-content', 20);
    I.see('You have sent your application to the tribunal');
    I.click(this.returntoCUIcaseOverviewButton);
    I.waitForElement('#main-content', 20);
    I.see('Case overview');
  },

  verifySendNotification() {
    //I.waitForElement(this.veiwResponseLink, 10);
    I.see('The tribunal has sent you a notification: Send Notification Title');
    I.scrollTo(this.notificationLink);
    I.wait(2);
    I.see('Not started yet', { css: this.notificationFlagBefore });
    I.click(this.notificationLink);
    I.see('All orders and requests');
    I.click(this.sendNotifButton);
    I.see('Send Notification Title');
    I.click(this.respondButton);
    I.see('Your response');
    I.see("What's your response to the tribunal?");
    I.fillField(this.tribunalResponseField, 'Testing');
    I.click(this.noSupportingMaterialOption);
    I.click(this.responseSubmitButton);
    I.see('Copy this correspondence to the other party');
    I.click(this.yesOptionOnRule92);
    I.click(this.responseSubmitButton);
    I.see('Check your answers');
    I.click(this.responseSubmitButton);
    I.see('You have sent your response to the tribunal');
    I.click(this.returnOverviewButton);
    I.scrollTo(this.notificationLink);
    I.see('Submitted', { css: this.notificationFlagAfter });
  },
  verifyContentInWelsh() {
    I.click(this.welshToggle);
    I.see('Eich hawliad');
    I.see('Yr ymateb');
    I.see('Eich gwrandawiadau');
    I.see('Ceisiadau i’r tribiwnlys');
    I.see('Gorchmynion a cheisiadau gan y tribiwnlys');
    I.see('Dyfarniadau gan y tribiwnlys');
    I.see('Dogfennau’r achos');
    I.seeInCurrentUrl('?lng=cy');
    I.click(this.contactTribunalLinkRegistered);
    I.see('Cuddio pob adran');
    I.see('Ffonio canolfan gyswllt cwsmeriaid y Tribiwnlys Cyflogaeth');
    I.see('Cymru a Lloegr');
    I.see('Gwasanaeth Cymraeg');

  }
};
