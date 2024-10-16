import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { th } from "@faker-js/faker";

export default class NocPage extends BasePage{
  elements={
    nocLink:this.page.locator('[href="/noc"]'),
    caseRef:'#caseRef',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    confirmDetailsCheckBox:'#affirmation',
    serveNoticeCheckBox:'#notifyEveryParty'
  }
  async processNoc(submissionRef){
    await this.elements.nocLink.isVisible();
    await this.elements.nocLink.click();
    await expect(this.page.locator('label')).toContainText('Online case reference number');
    await this.page.locator(this.elements.caseRef).fill(submissionRef);
    await this.clickContinue();
    await expect(this.page.locator('h1')).toContainText('Enter details');
    await this.page.locator(this.elements.respName).fill('Mark McDonald');
    await this.page.locator(this.elements.claimantFirstName).fill('Jessamine');
    await this.page.locator(this.elements.claimantLastName).fill('Malcom');
    await this.clickContinue();
    await this.page.getByRole('heading', { name: 'Check and submit'}).click();
    await this.page.locator(this.elements.confirmDetailsCheckBox).check();
    await this.page.locator(this.elements.serveNoticeCheckBox).check();
    await this.submitButton();
    await expect(this.page.locator('h1')).toContainText('Notice of change successful You\'re now representing a client on case');
    await expect(this.page.locator('exui-noc-submit-success')).toContainText('What happens next');
  }
}
