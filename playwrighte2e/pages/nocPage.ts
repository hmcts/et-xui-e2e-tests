import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

export default class NocPage extends BasePage{
  elements={
    nocLink:'[href="/noc"]',
    caseRef:'#caseRef',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    confirmDetailsCheckBox:'#affirmation',
    serveNoticeCheckBox:'#notifyEveryParty'
  }
  async processNoc(submissionRef){
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.nocLink));
    await this.webActions.clickElementByCss(this.elements.nocLink);
    await this.webActions.verifyElementContainsText(this.page.locator('label'), 'Online case reference number');
    await this.webActions.fillField(this.elements.caseRef, submissionRef);

    await this.clickContinue();
    await this.webActions.fillField(this.elements.respName, 'Mark McDonald');
    await this.webActions.fillField(this.elements.claimantFirstName, 'Jessamine');
    await this.webActions.fillField(this.elements.claimantLastName, 'Malcom');

    await this.clickContinue();
    await this.webActions.clickElementByRole('heading', {name: 'Check and submit'});
    await this.webActions.checkElementById(this.elements.confirmDetailsCheckBox);
    await this.webActions.checkElementById(this.elements.serveNoticeCheckBox);

    await this.clickSubmitButton();
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Notice of change successful You\'re now representing a client on case');
    await expect(this.page.locator('exui-noc-submit-success')).toContainText('What happens next');
  }
}
