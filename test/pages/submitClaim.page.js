const { I } = inject();

module.exports = {
  async submitClaim() {
    this.clickCheckYourAnswersLink();
    this.noPcqQuestions();
    this.clickSubmitOnCheckYourAnswers();
    return this.verifyClaimSubmitted();
  },
  //user clicks check your answers link
  clickCheckYourAnswersLink() {
    I.waitForElement('[href="/pcq?lng=en"]', 20);
    I.click('[href="/pcq?lng=en"]');
  },
  //
  noPcqQuestions() {
    I.waitForElement('[name=opt-out-button]', 25);
    I.see('Equality and diversity questions');
    I.click('[name=opt-out-button]');
  },
  clickSubmitOnCheckYourAnswers() {
    I.waitForVisible('#main-content', 15);
    I.see('Check your answers');
    I.waitForVisible('#main-form-submit', 10);
    I.scrollPageToBottom();
    I.wait(15);
    I.forceClick('#main-form-submit');
  },
  async verifyClaimSubmitted() {
    I.waitForVisible('#main-content', 35);
    const submissionRef = (await I.grabTextFrom('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd')).trim();
    console.log(submissionRef);
    I.wait(5);
    return submissionRef;
  },
};
