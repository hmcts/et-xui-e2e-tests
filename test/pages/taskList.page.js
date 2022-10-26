const { I } = inject();

module.exports = {
  async processPostLoginPagesForTheDraftApplication() {
    await this.newAccountLanding();
    await this.stepsToMakeClaim();
  },

  //select continue on the /new-account-landing page
  async newAccountLanding() {
    await I.see('You do not have to complete your claim in one go');
    await I.click('Continue');
  },

  //Verify Steps to making your claim page
  async stepsToMakeClaim() {
    await I.see('Steps to making your claim');
    await I.see('Discrimination');
    await I.see('Whistleblowing');
  },
};
