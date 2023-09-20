const { I } = inject();

module.exports = {
  nextButton: '#next-button',
  caseLinkProposeButton: '#propose',
  caseReferenceField: '[name="width-20"]',
  bailOption: '#CLRC010',
  samePartyOption: '#CLRC003',
  sharedEvidenceOption: '#CLRC008',
  guardianOption: '#CLRC006',
  linkedForHearingOption: '#CLRC017',
  progressedAsPartofLeadCase: '#CLRC016',
  removeLinkedCase: '//a[.="Remove"]',
  submitButton: '[type="submit"]',
  checkedLinkedCases: '[name="linkedCases"]',
  cyaBody: '#fieldset-case-data',
  unlinkCasesSuccessMessageAlert: '//div[@class="alert-message"]',

  checksCaseLinktartingPage() {
   I.waitForElement(this.nextButton, 10)
    I.see('If a group of linked cases has a lead case, you must start from the lead case.')
    I.see('If the cases to be linked has no lead, you can start the linking journey from any of those cases.')
    I.click(this.nextButton);
  },
  enterCaseLinkReferenceWithHearing(submissionReference) {
    I.waitForElement(this.caseLinkProposeButton, 10);
    I.see('Enter case reference');
    I.see('Why should these cases be linked?')
    I.fillField(this.caseReferenceField,submissionReference);
    I.checkOption(this.bailOption);
    I.checkOption(this.samePartyOption);
    I.checkOption(this.sharedEvidenceOption);
    I.checkOption(this.guardianOption);
    I.checkOption(this.linkedForHearingOption);
    I.checkOption(this.progressedAsPartofLeadCase);
    I.click(this.caseLinkProposeButton)
    // check the remove button is working
    I.click(this.nextButton);
    I.waitForElement(this.submitButton);
    I.see('Check your answers');
    I.click(this.submitButton);
  },
  enterCaseLinkReferenceWithoutHearing(submissionReference) {
    I.waitForElement(this.caseLinkProposeButton, 10);
    I.see('Enter case reference');
    I.see('Why should these cases be linked?')
    I.fillField(this.caseReferenceField,submissionReference);
    I.checkOption(this.bailOption);
    I.checkOption(this.samePartyOption);
    I.checkOption(this.sharedEvidenceOption);
    I.checkOption(this.guardianOption);
    I.checkOption(this.progressedAsPartofLeadCase);
    I.click(this.caseLinkProposeButton)
    // check the remove button is working
    I.waitForElement(this.removeLinkedCase,10)
    //enter the details again
    I.fillField(this.caseReferenceField,submissionReference);
    I.checkOption(this.bailOption);
    I.checkOption(this.samePartyOption);
    I.checkOption(this.sharedEvidenceOption);
    I.checkOption(this.guardianOption);
    I.checkOption(this.linkedForHearingOption);
    I.checkOption(this.progressedAsPartofLeadCase);
    I.click(this.caseLinkProposeButton)
    I.wait(2);
    I.click(this.nextButton);
    I.waitForElement(this.submitButton);
    I.see('Check your answers');
    I.click(this.submitButton);
  },
  unlinkedCase() {
    I.waitForElement(this.nextButton);
    I.click(this.nextButton);
    I.waitForElement(this.checkedLinkedCases);
    I.checkOption(this.checkedLinkedCases);
    I.click(this.nextButton);
    I.waitForElement(this.cyaBody, 15);
    I.see('Check your answers');
    I.see('Cases to unlink');
    I.click(this.submitButton);
    I.wait(2);
    I.click(this.submitButton);
    I.waitForElement(this.unlinkCasesSuccessMessageAlert,15)
  }
}