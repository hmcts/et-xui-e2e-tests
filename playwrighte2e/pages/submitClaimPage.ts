import { BasePage } from "./basePage";

export default class SubmitClaimPage extends BasePage{
  async submitClaim() {
    await this.clickCheckYourAnswersLink();
    await this.noPcqQuestions();
    await this.clickSubmitOnCheckYourAnswers();
    return this.verifyClaimSubmitted();
  }

  //user clicks check your answers link
  async clickCheckYourAnswersLink() {
    await this.webActions.clickElementByCss('[href="/pcq?lng=en"]');
  }

  async noPcqQuestions() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Equality and diversity questions');
    await this.webActions.clickElementByCss('[name=opt-out-button]');
  }

  async clickSubmitOnCheckYourAnswers() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Check your answers');
    await this.clickSubmitButton();
  }

  async verifyClaimSubmitted() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Your claim has been submitted');

    const submissionRef = (await this.page.locator('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd').innerText()).trim();
    console.log('you have successfully submitted claim...' +submissionRef);
    return submissionRef;
  }
}
