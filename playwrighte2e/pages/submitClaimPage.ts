import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class SubmitClaimPage extends BasePage{
  async submitClaim() {
    await this.clickCheckYourAnswersLink();
    await this.noPcqQuestions();
    await this.clickSubmitOnCheckYourAnswers();
    return this.verifyClaimSubmitted();
  }
  //user clicks check your answers link
  async clickCheckYourAnswersLink() {
    await this.page.locator('[href="/pcq?lng=en"]').click();
  }
  //
  async noPcqQuestions() {
    await expect(this.page.locator('h1')).toContainText('Equality and diversity questions');
    await this.page.locator('[name=opt-out-button]').click();
  }
  async clickSubmitOnCheckYourAnswers() {
    await expect(this.page.locator('h1')).toContainText('Check your answers');
    await this.submitButton();
  }
  async verifyClaimSubmitted() {
    await expect(this.page.locator('h1')).toContainText('Your claim has been submitted');

    const submissionRef = (await this.page.locator('//*[@id="main-content"]/div[1]/div/dl[1]/div[1]/dd').innerText()).trim();
    console.log('you have successfully submitted claim...' +submissionRef);
    return submissionRef;
  }
}
