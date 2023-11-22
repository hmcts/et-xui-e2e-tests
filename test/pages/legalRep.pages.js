const { I } = inject();

module.exports = {
  applyButtonOnLegalRep: '.workbasket-filters-apply',
  manageCasesLinkLegalRep: '[aria-label="Manage Cases"]',
  nocLinkLegalRep: '[href="/noc"]',
  continueButtonLegalRep: '.button',
  caseidFillfield: '#caseRef',
  respondentDetailsLegalRep: '#respondentName',
  fieldSetLegalRep: '#fieldset-q-and-a-form',
  claimantFirstNamelegalRep: '#claimantFirstName',
  claimantLastNamelegalRep: '#claimantLastName',
  detailConfirmationCheckbox: '#affirmation',
  notifyPartyCheckbox: '#notifyEveryParty',
  confirmdiv: 'affirmation-section',
  linkToCasesLegalRep: '.hmcts-header__link',
  caseListText: 'Case list',
  caseTypeDropdown: '#wb-case-type',
  manageCasesLink: '.hmcts-header__link',

  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '[type="submit"]',
  successfulMessageHeader: '//h1[@class="govuk-panel__title"]',
  prepareDocPageTwoHeader: '.govuk-heading-l',
  prepDecYesOption: '#bundlesRespondentAgreedDocWith-Yes',
  prepDocAgreeWithRes: '#bundlesRespondentAgreedDocWith-But',
  prepDocAgreeWithResTextField: '#bundlesRespondentAgreedDocWithBut',
  prepDocNoAgreement: '#bundlesRespondentAgreedDocWith-No',
  prepDocNoAgreementTextField: '#bundlesRespondentAgreedDocWithNo',
  selectHearingFromDropdown: '#bundlesRespondentSelectHearing',
  respondentDocOnly: '#bundlesRespondentWhoseDocuments div:nth-of-type(1) > .form-control',
  bothPartiesDoc: '#bundlesRespondentWhoseDocuments div:nth-of-type(2) > .form-control',
  hearingDocumentIncludingWitnessStatement: '#bundlesRespondentWhatDocuments div:nth-of-type(1) > .form-control',
  supplementaryHearingDocument: '#bundlesRespondentWhatDocuments div:nth-of-type(2) > .form-control',
  witnessStatementOnly: '#bundlesRespondentWhatDocuments div:nth-of-type(3) > .form-control',
  uploadBundleDocument: '#bundlesRespondentUploadFile',
  legalRepSubmit: '[type="submit"]',
  successfulmsgHeader: '.heading-h1',

  // prevent NOC process from failing
  // NOC process tend to fail is existing applications are not loaded
  async loadExistingApplications(option) {
    I.waitForElement(this.nocLinkLegalRep, 30);
    I.click(this.linkToCasesLegalRep);
    I.waitForElement(this.caseTypeDropdown, 30);
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
    I.wait(3);
    I.click(this.applyButton);
  },

  async processNOC(option, submissionReference, respondentName, ClaimantFirstName, ClaimantLastName) {
    this.loadExistingApplications(option);
    I.refreshPage();
    I.waitForVisible(this.applyButtonOnLegalRep, 35);
    I.click(this.nocLinkLegalRep);
    I.waitForVisible(this.continueButtonLegalRep, 5);
    I.see('Notice of change');
    I.fillField(this.caseidFillfield, submissionReference);
    I.click(this.continueButtonLegalRep);
    I.waitForVisible(this.fieldSetLegalRep, 10);
    I.see('Enter details');
    I.fillField(this.respondentDetailsLegalRep, respondentName);
    I.fillField(this.claimantFirstNamelegalRep, ClaimantFirstName);
    I.fillField(this.claimantLastNamelegalRep, ClaimantLastName);
    I.wait(3);
    I.click(this.continueButtonLegalRep);
    //I.waitForVisible(this.confirmdiv, 10);
    I.see('Check and submit');
    I.waitForElement(this.detailConfirmationCheckbox, 10);
    I.scrollTo(this.detailConfirmationCheckbox);
    I.checkOption(this.detailConfirmationCheckbox);
    I.checkOption(this.notifyPartyCheckbox);
    I.wait(2);
    I.forceClick(this.continueButtonLegalRep);
    I.waitForElement(this.successfulMessageHeader, 20);
    I.see('Notice of change successful');
  },

  async submitDocumentForHearing(agreement,whoseDocu,docuType) {
    I.see('Prepare and submit documents for a hearing');
    I.click(this.continueButtonLegalRep);
    I.waitForElement(this.prepareDocPageTwoHeader, 10);
    I.see('Have you agreed these documents with the other party?');
    try {
      switch (agreement) {
        case 'Yes':
          I.checkOption(this.prepDecYesOption);
          break;
        case 'Agreed':
          I.checkOption(this.prepDocAgreeWithRes);
          I.fillField(this.prepDocAgreeWithResTextField, 'Testing prep document for hearing -- Agree with Res');
          break;
        case 'NotAgreed':
          I.checkOption(this.prepDocNoAgreement);
          I.fillField(this.prepDocNoAgreementTextField, 'Testing prep document for hearing -- No agreement')
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.click(this.continueButtonLegalRep);
    I.selectOption(this.selectHearingFromDropdown, '1: 1');
    // Whose hearing documents are you uploading
    try {
      switch (whoseDocu) {
        case 'Respondent':
          I.selectOption(this.respondentDocOnly)
          break;
        case 'Both Parties':
          I.selectOption(this.bothPartiesDoc)
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    // What are these documents?
    try {
      switch (docuType) {
        case 'Hearing Document including witness statement':
          I.checkOption(this.hearingDocumentIncludingWitnessStatement);
          break;
        case 'Supplementary hearing documents':
          I.checkOption(this.supplementaryHearingDocument);
          break;
        case 'Witness statement only':
          I.checkOption(this.witnessStatementOnly);
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.click(this.continueButtonLegalRep);
    I.see('Upload your file of documents')
    I.attachFile(this.uploadBundleDocument, 'test/data/RET_newBug.png');
    I.wait(2)
    I.click(this.continueButtonLegalRep);
    I.waitForElement()
    I.see('Check the information below carefully.');
    I.see('Prepare documents for hearing');
    I.see('Check your answers');
    I.forceClick(this.legalRepSubmit);
    I.waitForElement(this.successfulmsgHeader, 10);
    I.see('You have sent your hearing documents to the tribunal');

  }
};
