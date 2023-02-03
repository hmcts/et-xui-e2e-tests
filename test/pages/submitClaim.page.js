const { I } = inject();

module.exports = {
  async submitClaim() {
    this.clickCheckYourAnswersLink();
    this.noPcqQuestions();
    this.clickSubmitOnCheckYourAnswers();
    return await this.verifyClaimSubmitted();
  },
  //user clicks check your answers link
  clickCheckYourAnswersLink() {
    I.waitForElement('[href="/pcq?lng=en"]', 30);
    I.click('[href="/pcq?lng=en"]');
  },
  //
  noPcqQuestions() {
    I.waitForText('Equality and diversity questions', 30);
    I.click('[name=opt-out-button]');
  },
  clickSubmitOnCheckYourAnswers() {
    I.waitForText('Check your answers', 30);
    I.click('Submit');
  },
  async verifyClaimSubmitted() {
    I.waitForText('Your claim has been submitted', 30);
    const submissionRef = (await I.grabTextFrom('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd')).trim();
    console.log(submissionRef);
    return submissionRef;
  },
};
