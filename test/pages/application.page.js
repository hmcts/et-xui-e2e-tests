const { I } = inject();

module.exports = {
  caseListText: 'Case list',
  caseListLink: '[href="/cases"]',
  hideFilterButton: '[class="govuk-button hmcts-button--secondary"]',
  jurisdictionDropdown: '#wb-jurisdiction',
  caseTypeDropdown: '#wb-case-type',
  stateDropdown: '#wb-case-state',
  tribunalOffice: '#managingOffice',
  caseNumberInputField: '#ethosCaseReference',
  receiptDateDay: '#receiptDate-day',
  receiptDateMonth: '#receiptDate-month',
  receiptDateYear: '#receiptDate-year',
  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#resTseSelectApplication',
  submitButton: '[type="submit"]',
  accompanyInformationTextBox: '#resTseTextBox1',
  resTseCopyToOtherPartyYes: '#resTseCopyToOtherPartyYesOrNo-Yes',
  postponeMyHearing: '#tseAdminSelectApplication > option:nth-child(2)',
  applicationDropdown: '#tseAdminSelectApplication',
  caseManagementOrderRadioButton: '#tseAdmReplyIsCmoOrRequest-Case management order',
  requestRadioButton: '#tseAdmReplyIsCmoOrRequest-Request',
  neitherRadioButton: '#tseAdmReplyIsCmoOrRequest-Neither',
  bothParties: '#tseAdmReplySelectPartyNotify-Both parties',
  claimantOnly: '#tseAdmReplySelectPartyNotify-Claimant only',
  respondantOnly: '#tseAdmReplySelectPartyNotify-Respondent only',
  legalOfficer: '#tseAdmReplyCmoMadeBy > option:nth-child(2)',
  judge: '#tseAdmReplyCmoMadeBy > option:nth-child(3)',
  fullName: '#tseAdmReplyCmoEnterFullName',
  yesToTribunal: '#tseAdmReplyCmoIsResponseRequired > option:nth-child(2)',
  noToTribunal: '#tseAdmReplyCmoIsResponseRequired > option:nth-child(3)',
  selectBothParties: '#tseAdmReplySelectPartyNotify-Both parties',
  respondentOnly: '#tseAdmReplySelectPartyNotify-Respondent only',

  selectApplicationType(applicationType) {
    try {
      switch (applicationType) {
        case 'Amend response':
          I.selectOption(this.nextEventDropdown, 'Amend response');
          I.click(this.submitButton);
          break;
        case '1 - Amend response':
          I.selectOption(this.applicationDropdown, '1 - Amend response');
          I.click(this.submitButton);
          break;
        case 'Postpone a hearing':
          I.waitForElement(this.applicationDropdown);
          I.selectOption(this.applicationDropdown, '1 - Postpone a hearing');
          I.click(this.submitButton);
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
  },

  respondToAnApplication() {
    I.click('Respond to an application');
  },

  amendResponse(text) {
    I.fillField(this.accompanyInformationTextBox, text);
    I.click(this.submitButton);
  },
  selectNextEvent(option) {
    I.waitForElement(this.nextEventDropdown, 60);
    I.selectOption(this.nextEventDropdown, option);
    I.wait(5);
    I.forceClick(this.submitButton);
  },

  selectcaseManagementOrder(option) {
    switch (option) {
      case 'Legal officer':
        I.selectOption('#tseAdmReplyCmoMadeBy', option);
        I.fillField(this.fullName, 'Test Legal Officer');
        break;
      case 'Judge':
        I.selectOption('#tseAdmReplyCmoMadeBy', option);
        I.fillField(this.fullName, 'Test Legal Officer');
        break;
      default:
        throw new Error('... invalid option, check you options');
    }
  },
  selectResponseTotribunal(option) {
    switch (option) {
      case 'Yes - view document for details':
        I.selectOption('#tseAdmReplyCmoIsResponseRequired', option);
        break;
      case 'No':
        I.selectOption('#tseAdmReplyCmoIsResponseRequired', option);
        break;
      default:
        throw new Error('... invalid option, check you options');
    }
  },
  copyCorrespondance() {
    I.see('Copy this correspondence to the other party');
    I.click(this.resTseCopyToOtherPartyYes);
    I.click(this.submitButton);
  },

  checkYourAnswersAndSybmit() {
    I.see('Check your answers');
    I.click(this.submitButton);
  },

  closeAndReturnToCaseDetails() {
    I.see('What happens next');
    I.click(this.submitButton);
  },

  selectcaseManagementOption(radioButtonType) {
    switch (radioButtonType) {
      case 'caseManagementOrder':
        I.checkOption('Case management order');
        break;
      case 'request':
        I.checkOption('Request');
        break;
      case 'neither':
        I.checkOption('Neither');
        break;
      default:
        console.error('Invalid radio button ID');
    }
  },

  selectPartyType(partyType) {
    switch (partyType) {
      case 'bothParties':
        I.checkOption('Both parties');

        break;
      case 'claimantOnly':
        I.checkOption('claimant Only');
        break;
      case 'respondantOnly':
        I.checkOption('Respondant Only');
        break;
      default:
        console.error('Invalid radio button ID');
    }
  },

  submitApplication() {
    I.click(this.submitButton);
  },

  verifyCaseDetailsPage(et1VettingFlag = false) {
    I.waitForText('Case Details', 30);
    I.see('Claimant');
    I.see('Respondent');
    I.see('Jurisdictions');
    I.see('Referrals');
    I.see('History');
    I.see('Documents');
    if (et1VettingFlag) {
      I.see('ET1Vetting');
    }
  },
};
