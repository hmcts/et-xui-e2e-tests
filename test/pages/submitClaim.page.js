const { I } = inject();

module.exports = {
  submitClaim() {
    this.clickCheckYourAnswersLink();
    this.noPcqQuestions();
    this.clickSubmitOnCheckYourAnswers();
    return this.verifyClaimSubmitted();
  },
  //user clicks check your answers link
  clickCheckYourAnswersLink() {
    I.waitForElement('[href="/pcq"]', 30);
    I.click('[href="/pcq"]');
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
  verifyClaimSubmitted() {
    I.waitForText('Your claim has been submitted', 30);
    const submissionRef = I.grabTextFrom('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd').trim();
    console.log(submissionRef);
    return submissionRef;
  },
};
