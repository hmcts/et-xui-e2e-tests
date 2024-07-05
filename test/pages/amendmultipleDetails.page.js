const { I } = inject();

module.exports = {
    fields: {
        amendMultipleName: '#typeOfAmendment-Amend multiple name',
        amendLeadCase: '#typeOfAmendment-Amend lead case',
        addCaseToMultiple: '#typeOfAmendment-Add cases to multiple',
        removeCaseFromMultiple: '#typeOfAmendment-Remove cases from multiple',
        amendMultipleNote: '#typeOfAmendment-Unlink case from multiple',
        addNewButton: '.write-collection-add-item__top',
        addCaseNumberTextField: '.form-control',
        email: '#username',
        password: '#password'
    },
    continueButtonButton: '//button[@class="button"]',

    amendMultipleDetails (option, caseNumber) {
      I.waitForText('Amend Multiple Details', 10);
      // Add switch statement to handle different options
      switch (option) {
        case 'Amend multiple name':
          I.checkOption(this.fields.amendMultipleName);
          break;
        case 'Amend lead case':
          I.checkOption(this.fields.amendLeadCase);
          break;
        case 'Add cases to multiple':
          I.checkOption(this.fields.addCaseToMultiple);
          break;
        case 'Remove cases from multiple':
          I.checkOption(this.fields.removeCaseFromMultiple);
          I.click(this.continueButtonButton);
          I.waitForText('Case Numbers', 10);
          I.click(this.fields.addNewButton);
          I.waitForElement(this.fields.addCaseNumberTextField, 10);
          I.fillField(this.fields.addCaseNumberTextField, caseNumber);
          break;
        case 'Amend multiple note':
          I.checkOption(this.fields.amendMultipleNote);
          break;
        default:
          break;
      }
        I.click(this.continueButtonButton);
    }
};
