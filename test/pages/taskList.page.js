const { I } = inject();

module.exports = {
  processPostLoginPagesForTheDraftApplication() {
    this.newAccountLanding();
    this.stepsToMakeClaim();
  },

  //select continue on the /new-account-landing page
  newAccountLanding() {
    I.waitForElement('#main-content', 10);
    I.see('You do not have to complete your claim in one go');
    I.click('Continue');
  },

  //Verify Steps to making your claim page
  stepsToMakeClaim() {
    I.see('Steps to making your claim');
    I.see('Discrimination');
    I.see('Whistleblowing');
  },
};
