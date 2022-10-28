const { I } = inject();

module.exports = {
  async submitClaim() {
    await this.clickCheckYourAnswersLink();
    await this.noPcqQuestions();
    await this.clickSubmitOnCheckYourAnswers();
    await this.verifyClaimSubmitted();
  },
  //user clicks check your answers link
  async clickCheckYourAnswersLink() {
    await I.click('[href="/pcq"]');
  },
  //
  async noPcqQuestions() {
    await I.see('Equality and diversity questions');
    await I.click('[name=opt-out-button]');
  },
  async clickSubmitOnCheckYourAnswers() {
    await I.see('Check your answers');
    await I.click('Submit');
  },
  async verifyClaimSubmitted() {
    await I.see('Your claim has been submitted');
    const submissionRef = await I.grabTextFrom('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd');
    console.log(submissionRef);
  },
};
