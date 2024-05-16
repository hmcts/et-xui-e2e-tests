const { I } = inject();

module.exports = {
  officerName: '#officeCT',
  reasonCT: '#reasonForCT',
  submitEventButton: '//button[@class="button"]',

  transferCase(option, reason) {
    I.waitForElement(this.officerName, 15);
    I.selectOption(this.officerName, option);
    I.fillField(this.reasonCT, reason);
    I.forceClick(this.submitEventButton);
    I.wait(10);
    I.see('Check your answers');
    I.see('Reason for Case Transfer');
    I.see('Check the information below carefully.');
    I.forceClick(this.submitEventButton);
    I.see('has been updated with event: Case Transfer');
  },
};
