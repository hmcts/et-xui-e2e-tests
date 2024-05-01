const { I } = inject();

const today = new Date();
const receiptDay = today.getDate();
const receiptMonth = today.getMonth() + 1;
const receiptYear = today.getFullYear();

module.exports ={
  batchUpdateDropdown: '[id="batchUpdateType"]',
  continueButton: '[type="submit"]',
  currentPositionDropdown: '#positionType',
  dayOfReceipt: '[id="receiptDate-day"]',
  monthOfReceipt: '[id="receiptDate-month"]',
  yearOfReceipt: '[id="receiptDate-year"]',
  physicalLocation: '[id="fileLocation"]',
  stayedCase: '[id="batchCaseStayed_Yes"]',
  noOptionMovingCasesToSingle: '#batchMoveCases_convertToSingle_No',
  caseNumberReferenceTextField: '#batchUpdateCase',


  sendBatchUpdate(batchUpdateOption) {
    I.waitForElement(this.batchUpdateDropdown, 10);
    switch (batchUpdateOption) {
      case 'Batch update based on flag criteria':
        I.selectOption(this.batchUpdateDropdown, '1: batchUpdateType');
        I.click(this.continueButton);
        I.waitForElement(this.currentPositionDropdown,10);
        I.selectOption(this.currentPositionDropdown, '9: Awaiting ET3');
        I.fillField(this.dayOfReceipt, receiptDay);
        I.fillField(this.monthOfReceipt, receiptMonth);
        I.fillField(this.yearOfReceipt, receiptYear);
        I.selectOption(this.physicalLocation, '5: Casework - B/F Stayed');
        I.checkOption(this.stayedCase);
        I.click(this.continueButton);
        break;
      case 'Batch transfer of cases to another multiple or submultiple':
        I.selectOption(this.batchUpdateDropdown, '2: batchUpdateType2');
        I.click(this.continueButton);
        I.waitForElement(this.noOptionMovingCasesToSingle, 10);
        I.checkOption(this.noOptionMovingCasesToSingle);
        I.click(this.continueButton);
        break;
      default:
        throw new Error('... invalid option, check you options');


    }

    },

  bathUpdateCasesWithDetailsOfaCase(caseNumber)  {
    I.selectOption(this.batchUpdateDropdown, '3: batchUpdateType3');
    I.click(this.continueButton);
    I.waitForElement(this.caseNumberReferenceTextField, 10);
    I.fillField( this.caseNumberReferenceTextField, caseNumber);
    I.click(this.continueButton);
  }
};
