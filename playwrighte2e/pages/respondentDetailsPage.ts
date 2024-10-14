import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class RespondentDetailsPage extends BasePage{

  elements = {
    respondentName:'#respondentCollection_0_respondent_name'
  }
  async processRespondentDetails() {
    await expect(this.page.locator(this.elements.respondentName)).toBeVisible();
    await this.page.locator(this.elements.respondentName).fill('Mr Mark Gill');
    await this.submitButton();
  }

}
