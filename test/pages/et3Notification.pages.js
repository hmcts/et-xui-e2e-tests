const { I } = inject();

module.exports = {
  et3NotificationFadedTitle: '.govuk-caption-l',
  uploadDocumentText: 'Upload documents',
  uploadPDFText: 'Upload document PDF',
  addNewButton: '.write-collection-add-item__top',
  et3DocumentTypeDropdown: 'et3NotificationDocCollection_0_typeOfDocument',
  letterOfEt3Acceptance: '1: 2.11',
  letterOfEt3ResponseAccepted: '3: Letter 13',
  rejectionLetterByStaff: '1: Letter 10',
  rejectionLetterByEJ: '2: Letter 11',
  uploadFileButton: '[type="file"]',
  shortDescription: '#et3NotificationDocCollection_0_shortDescription',
  addSecondDocument: '.write-collection-add-item__bottom',
  typeofDocument2: 'et3NotificationDocCollection_1_typeOfDocument',
  uploadFile2: '#et3NotificationDocCollection_1_uploadedDocument',
  shortDescription2: '#et3NotificationDocCollection_1_shortDescription',
  removeButtonOne: '[aria-label="Remove Upload document PDF"]',
  confirmationHeader: '#confirmation-header',

  uploadET3acceptanceLetter(option) {
    I.waitForElement(this.addNewButton, 30);
    I.see(this.uploadDocumentText);
    try {
      switch (option) {
        case 'single document':
          I.click(this.addNewButton);
          I.waitForElement(this.removeButtonOne, 15);
          I.wait(2);
          I.click('.ccd-dropdown');
          I.selectOption('.ccd-dropdown', this.letterOfEt3Acceptance);
          I.click('.ccd-dropdown');
          I.moveCursorTo(this.uploadFileButton);
          I.wait(3);
          I.attachFile(this.uploadFileButton, '../data/RET_newBug.png');
          I.fillField(this.shortDescription, 'document 1');
          I.wait(5);
          I.click('Continue');
          break;
        case 'multiple document':
          I.click(this.addNewButton);
          I.waitForElement(this.et3DocumentTypeDropdown, 15);
          I.selectOption(this.et3DocumentTypeDropdown, this.letterOfEt3Acceptance);
          I.attachFile(this.uploadFileButton, 'test/data/RET_newBug.png');

          I.fillField(this.shortDescription, 'document 1');
          I.click(this.addNewButton);
          I.selectOption(this.typeofDocument2, this.letterOfEt3Acceptance);
          I.wait(3);
          I.attachFile(this.uploadFileButton, 'test/data/RET_newBug.png');
          I.fillField(this.shortDescription2, 'document 2'), I.wait(5); //for the document upload process to complete
          I.click('Continue');
          break;
        default:
          throw new Error('... check you options and try again');
      }
    } catch (e) {
      console.error('invalid option', e.message);
    }
    I.waitForElement('#et3SendDocByFirstClass', 20);
    I.see('ET3 notification');
    I.see('Send documents');
    I.click('Continue');
    I.waitForElement('#et3EmailDocsToAcasTitle', 10);
    I.see('ET3 notification');
    I.see('Email Acas');
    I.click('Continue');
    I.waitForElement(this.confirmationHeader, 10);
    I.see('Documents submitted');
    I.click('.button');
  },
};
