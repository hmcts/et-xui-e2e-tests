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
    I.wait(5);
    I.refreshPage();
    I.waitForElement(this.bodycontent, 30);
    I.see('You do not have to complete your claim in one go');
    I.forceClick(this.continueButton);
  },

  //Verify Steps to making your claim page
  stepsToMakeClaim() {
    I.waitForText('Steps to making your claim', 10);
    I.see('Steps to making your claim');
  },
};
