import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export default class TaskListPage extends BasePage{
elements={
  header1: this.page.locator('h1')
};

  async processPostLoginPagesForTheDraftApplication() {
    await this.newAccountLanding();
    await this.stepsToMakeClaim();
  }

  //select continue on the /new-account-landing page
  async newAccountLanding() {
    await expect(this.elements.header1).toContainText('You do not have to complete your claim in one go');
    await this.clickContinue();
  }

  //Verify Steps to making your claim page
  async stepsToMakeClaim() {
    await expect(this.elements.header1).toContainText('Steps to making your claim');
  }
}
