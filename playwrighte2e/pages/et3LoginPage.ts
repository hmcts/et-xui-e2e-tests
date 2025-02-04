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
    startNow:this.page.locator('[href="/case-number-check"]'),
    respondToNewClaim:this.page.locator('[href="/self-assignment-form?lng=en"]'),
    submissionRefNumber: '#caseReferenceId',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    caseRefNumber:this.page.locator('#ethosCaseReference')
  }
  async processRespondentLogin(username: string, password: string, caseNumber: string) {
    await this.page.goto(params.TestUrlRespondentUi);
    await expect(this.page.locator('h1')).toContainText('Introduction');
    await this.elements.startNow.click();
    await this.wait(10);
    await expect(this.page.locator('h1')).toContainText('Case Number');
    await this.elements.caseRefNumber.fill(caseNumber.toString());
    await this.clickContinue();
    await this.loginRespondentUi(username, password);
  }

  async loginRespondentUi(username, password){
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.elements.submit.click();
  }


  async replyToNewClaim(submissionRef, caseNumber){
    await expect(this.page.locator('h1')).toContainText('Before you continue');
    await this.clickContinue();
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.respondToNewClaim.click();
    await this.caseDetailsPage(submissionRef);
    await this.checkAndSubmitPage(caseNumber);
  }

  async caseDetailsPage(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Case Details');
    await this.page.locator(this.elements.submissionRefNumber).fill(submissionRef.toString());
    //resp name is hard coded here as case is created from api which is using json
    //check case sensitivity while assigning a case
    await this.page.locator(this.elements.respName).fill('Mrs Test Auto');
    await this.page.locator(this.elements.claimantFirstName).fill('Grayson');
    await this.page.locator(this.elements.claimantLastName).fill('Becker');
    await this.clickContinue();
  }

  async checkAndSubmitPage(caseNumber){
    await expect(this.page.locator('h1')).toContainText('Check and submit');
    await this.page.locator('#confirmation').check();
    await this.submitButton();

    //validate claim is displayed in awaiting response
    await this.page.reload();
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.respondToNewClaim.isVisible();
    await this.page.getByLabel('view ' + caseNumber.toString() + ':').click();
  }

}
