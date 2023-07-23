const { I } = inject();

module.exports = {

  applyButtonOnLegalRep: '.workbasket-filters-apply',
  manageCasesLinkLegalRep: 'hmcts-header__link',
  nocLinkLegalRep: '[href="/noc"]',
  continueButtonLegalRep: '.button',
  caseidFillfield: '#caseRef',
  respondentDetailsLegalRep: '#respondentName',
  fieldSetLegalRep: '#fieldset-q-and-a-form',
  claimantFirstNamelegalRep: '#claimantFirstName',
  claimantLastNamelegalRep: '#claimantLastName',
  detailConfirmationLegalRep: '#affirmation',
  notifyPartyLegalRep: '#notifyEveryParty',
  confirmdiv: 'affirmation-section',
  linkToCasesLegalRep: '[href="cases"]',
  caseListText: 'Case list',
  caseTypeDropdown: '#wb-case-type',
  manageCasesLink: '.hmcts-header__link',

  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',

  // prevent NOC process from failing
  // NOC process tend to fail is existing applications are not loaded
  loadExistingApplications(option) {
    I.waitForElement(this.manageCasesLink, 30);
    I.click(this.manageCasesLink);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.resetButton, 35);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, 'Eng/Wales - Singles');
          break;
        case 'Scotland':
        case 'Scotland - Singles':
          I.selectOption(this.caseTypeDropdown, 'Scotland - Singles (RET)');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    //I.selectOption(this.caseTypeDropdown, option);
    I.scrollPageToBottom();
    I.waitForVisible(this.resetButton, 10);
  },

  async processNOC(option, submissionReference,respondentName, ClaimantFirstName, ClaimantLastName) {
    this.loadExistingApplications(option)
    I.refreshPage();
    I.waitForVisible(this.applyButtonOnLegalRep, 35);
    I.click(this.nocLinkLegalRep);
    I.waitForVisible(this.continueButtonLegalRep, 5)
    I.see('Notice of change');
    I.fillField(this.caseidFillfield,submissionReference);
    I.click(this.continueButtonLegalRep);
    I.waitForVisible(this.fieldSetLegalRep,10);
    I.see('Enter details');
    I.fillField(this.respondentDetailsLegalRep,respondentName)
    I.fillField(this.claimantFirstNamelegalRep,ClaimantFirstName);
    I.fillField(this.claimantLastNamelegalRep,ClaimantLastName)
    I.wait(3);
    I.click(this.continueButtonLegalRep);
    I.waitForVisible(this.confirmdiv, 10);
    I.see('Check and submit');
    I.checkOption(this.detailConfirmationLegalRep);
    I.checkOption(this.notifyPartyLegalRep)
    I.wait(2);
    I.click(this.continueButtonLegalRep);
    I.waitForVisible(this.linkToCasesLegalRep,10);
    I.see('Notice of change successful');
  }
}