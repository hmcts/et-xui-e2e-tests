const { I } = inject();

module.exports = {
  async submitClaim() {
    await this.clickCheckYourAnswersLink();
    await this.noPcqQuestions();
    await this.clickSubmitOnCheckYourAnswers();
    return await this.verifyClaimSubmitted();
  },
  //user clicks check your answers link
  async clickCheckYourAnswersLink() {
    I.waitForElement('[href="/pcq"]', 30);
    I.click('[href="/pcq"]');
  },
  //
  async noPcqQuestions() {
    await I.waitForText('Equality and diversity questions', 30);
    await I.click('[name=opt-out-button]');
  },
  async clickSubmitOnCheckYourAnswers() {
    await I.waitForText('Check your answers', 30);
    await I.click('Submit');
  },
  async verifyClaimSubmitted() {
    await I.waitForText('Your claim has been submitted', 30);
    const submissionRef = (await I.grabTextFrom('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd')).trim();
    console.log(submissionRef);
    return submissionRef;
  },
};
