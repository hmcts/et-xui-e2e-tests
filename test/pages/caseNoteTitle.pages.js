const { I } = inject();

module.exports = {
  multipleCaseNoteTab: '//a[.="Notes"],',
  caseNoteTitle: '#caseNote_title',
  caseNoteText: '#caseNote_note',
  submitButton: '[type="submit"]',

  addNoteToMultiple() {
    I.waitForText('Case: Add note', 10);
    I.fillField(this.caseNoteTitle, 'Henry Mash Multiple case note');
    I.fillField(this.caseNoteText, 'Adding notes to multiple');
    I.click(this.submitButton);
    I.waitForText('Check your answers', 10);
    I.see('Check the information below carefully.');
    I.click(this.submitButton);
  },

  verifyAddedNoteIsVisible() {
    I.waitForElement(this.multipleCaseNoteTab, 10);
    I.click(this.multipleCaseNoteTab);
    I.waitForText('Multiple notes', 10);
    I.see('Title');
    I.see('Note');
    I.see('Author');
    I.see('Date');
  }
};
