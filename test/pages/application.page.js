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
  claimantAccompanyInformationTextBox:'#claimantTseTextBox1',
  resTseCopyToOtherPartyYes: '#resTseCopyToOtherPartyYesOrNo-Yes',
  r92Yes: '#claimantTseRule92-Yes',
  postponeMyHearing: '#tseAdminSelectApplication > option:nth-child(2)',
  applicationDropdown: '#tseAdminSelectApplication',
  claimantApplicationDropdown:'#claimantTseSelectApplication',
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

  selectApplicationType(applicationType, role) {
    switch (role){
      case 'respondent': {
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
            default:
              throw new Error('... invalid option, check you options');
          }
        } catch (e) {
          console.error('invalid option', e.message);
        }
        break;
      }
      case 'claimantRep': {
        try {
          switch (applicationType) {
            case 'Amend claim':
              I.waitForElement(this.claimantApplicationDropdown);
              I.selectOption(this.claimantApplicationDropdown, 'Amend claim');
              I.click(this.submitButton);
              break;
          }
        }
        catch (e) {
            console.error('invalid option', e.message);
          }
          break;
        }

      break;
      default:
        throw new Error('... invalid option, define role to make an application ');
    }

  },

  respondToAnApplication() {
    I.click('Respond to an application');
  },

  amendResponse(text) {
    I.fillField(this.accompanyInformationTextBox, text);
    I.click(this.submitButton);
  },

  amendClaim(text) {
    I.fillField(this.claimantAccompanyInformationTextBox, text);
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

  copyCorrespondanceR92() {
    pause();
    I.see('Copy this correspondence to the other party');
    I.checkOption(this.r92Yes);
    I.click(this.submitButton);
  },

  checkYourAnswersAndSubmit() {
    I.see('Check your answers');
    I.click(this.submitButton);
  },

  closeAndReturnToCaseDetails() {
    I.see('What happens next');
    I.click(this.submitButton);
  },

  claimantCloseAndReturnToCaseDetails() {
    I.see('Copy this correspondence to the other party');
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
