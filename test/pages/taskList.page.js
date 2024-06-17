const { I } = inject();

module.exports = {
  bodycontent: '#main-content',
  continueButton: '//a[contains(.,"Continue")]',

  processPostLoginPagesForTheDraftApplication() {
    this.newAccountLanding();
    this.stepsToMakeClaim();
  },

  //select continue on the /new-account-landing page
  newAccountLanding() {
    I.waitForText('You do not have to complete your claim in one go', 30);
    I.click(this.continueButton);
  },

  //Verify Steps to making your claim page
  stepsToMakeClaim() {
    I.refreshPage();
    I.waitForText('Steps to making your claim', 10);
    I.see('Steps to making your claim');
  },
};
