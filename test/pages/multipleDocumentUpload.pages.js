const { I } = inject();

const today = new Date();
const correspondenceDay = today.getDate();
const correspondenceMonth = today.getMonth() + 1;
const correspondenceYear = today.getFullYear();

module.exports = {
  addNewDocumentButton: '//button[@class="button write-collection-add-item__top"]',
  documentCategoryDropdown: '#documentCollection_0_topLevelDocuments',
  startAClaimDropdown: '#documentCollection_0_startingClaimDocuments',
  responseToACliamDropdown: '[id="documentCollection_0_responseClaimDocuments"]',
  initialConsiderationDropdown: '[id="documentCollection_0_initialConsiderationDocuments"]',
  uploadFileButton: '[type="file"]',
  shortDescription: '#documentCollection_0_shortDescription',
  dayOfCorrespondent: '#dateOfCorrespondence-day',
  monthOfCorrespondent: '#dateOfCorrespondence-month',
  yearOfCorrespondent: '#dateOfCorrespondence-year',
  submitButton: '[type="submit"]',

  uploadDocumentOnMultiple(documentCat) {
    I.waitForText('Case documentation');
    I.click(this.addNewDocumentButton);
    I.waitForElement(this.documentCategoryDropdown,10);
    switch (documentCat) {
      case 'Starting a Claim':
        I.selectOption(this.documentCategoryDropdown, '1: Starting a Claim');
        I.waitForElement(this.startAClaimDropdown, 10);
        I.selectOption(this.startAClaimDropdown, '1: ET1');
        I.fillField(this.shortDescription, 'ET1 Application form');
        break;
      case 'Response to a claim':
        I.selectOption(this.documentCategoryDropdown, '2: Response to a Claim');
        I.waitForElement(this.responseToACliamDropdown, 10);
        I.selectOption(this.responseToACliamDropdown, '1: ET3');
        I.fillField(this.shortDescription, 'ET3 Response form');
        break;
      case 'Initial consideration':
        I.selectOption(this.documentCategoryDropdown, '3: Initial Consideration');
        I.waitForElement(this.initialConsiderationDropdown, 10);
        I.selectOption(this.initialConsiderationDropdown, '1: Initial Consideration');
        I.fillField(this.shortDescription, 'Initial Consideration');
        break;
      default:
        throw new Error('... invalid option, check you options');

    }
    I.attachFile(this.uploadFileButton, '/test/data/RET_newBug.png');
    I.fillField(this.dayOfCorrespondent, correspondenceDay);
    I.fillField(this.monthOfCorrespondent, correspondenceMonth);
    I.fillField(this.yearOfCorrespondent, correspondenceYear);

    I.click(this.submitButton)




  }
}
