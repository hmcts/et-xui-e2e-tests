import { BasePage } from "./basePage";
import { params } from "../utils/config";
import { expect, Page } from '@playwright/test';


export default class Et3LoginPage extends BasePage {

  protected constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): Et3LoginPage {
    return new Et3LoginPage(page);
  }

  elements={

    returnToExistingResponse:this.page.locator('[href="/return-to-existing?lng=en"]'),
    submit:this.page.locator('[type="submit"]'),
    startNow:this.page.locator('[href="/interruption-card"]'),
    replyToNewClaim:this.page.locator('[href="/new-self-assignment-request?lng=en"]'),
    submissionRefNumber: '#caseReferenceId',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    caseRefNumber:this.page.locator('#ethosCaseReference')
  }
  async processRespondentLogin(username, password, caseNumber) {
    await this.page.goto(params.TestUrlRespondentUi);
    await this.elements.startNow.click();
    await this.elements.caseRefNumber.fill(caseNumber);
    await this.clickContinue();
    await this.loginRespondentUi(username, password);
  }

  async loginRespondentUi(username, password){
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.elements.submit.click();
  }


  async replyToNewClaim(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Before you continue');
    await this.clickContinue();
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.replyToNewClaim.click();
    await this.caseDetailsPage(submissionRef);
    await this.checkAndSubmitPage(submissionRef);
  }

  async caseDetailsPage(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Case Details');
    await this.page.locator(this.elements.submissionRefNumber).fill(submissionRef);
    //resp name is hard coded here as case is created from api which is using json
    await this.page.locator(this.elements.respName).fill('Mrs Test Auto');
    await this.page.locator(this.elements.claimantFirstName).fill('Grayson');
    await this.page.locator(this.elements.claimantLastName).fill('Becker');
    await this.clickContinue();
  }

  async checkAndSubmitPage(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Check and submit');
    await expect(this.page.locator('#main-content')).toContainText(submissionRef);
     await this.page.locator('#confirmation').check();
     await this.submitButton();

    //validate claim is displayed in awaiting response
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.replyToNewClaim.isVisible();
    await expect(this.page.locator('tbody')).toContainText(submissionRef);
    await this.page.getByLabel('View Reference: ' + submissionRef).click();
  }

}
