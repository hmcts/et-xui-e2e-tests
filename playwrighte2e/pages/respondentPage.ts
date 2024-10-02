import { BasePage } from "./basePage";
import { params } from "../utils/config";
import { expect } from "@playwright/test";
import { th } from "@faker-js/faker";

export default class RespondentPage extends BasePage {
  elements={

    returnToExistingResponse:this.page.locator('[href="/return-to-existing?lng=en"]'),
    submit:this.page.locator('[type="submit"]'),
    startNow:this.page.locator('[href="/interruption-card"]'),
    replyToNewClaim:this.page.locator('[href="/new-self-assignment-request?lng=en"]'),
    caseRefNumber: '#caseReferenceId',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName'
  }
  async processRespondentLogin(username, password) {
    await this.page.goto(params.TestUrlRespondentUi);
    await this.elements.startNow.click();
    await this.clickContinue();
    await this.loginRespondentUi(username, password);
  }

  async loginRespondentUi(username, password){
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.elements.submit.click();
  }
  async clicksViewLinkOnET3RespondentPage(submissionRef){
    await this.page.goto(params.TestUrlRespondentUi + '/case-details/' + submissionRef);
  }

  async verifyET3RespondentPage(caseNumber) {
    //veriy  case overview text
    await expect(this.page.locator('#caseNumber')).toContainText('Case number: ' +caseNumber);
  }

  async replyToNewClaim(submissionRef){
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.replyToNewClaim.click();
    await this.selfAssignmentPage(submissionRef);
    await this.selfAssignCase(submissionRef);
  }

  async selfAssignmentPage(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Self Assignment');
    await this.page.locator(this.elements.caseRefNumber).fill(submissionRef);
    //resp name is hard coded here as case is created from api which is using json
    await this.page.locator(this.elements.respName).fill('Mrs Test Auto');
    await this.page.locator(this.elements.claimantFirstName).fill('Grayson');
    await this.page.locator(this.elements.claimantLastName).fill('Becker');
    await this.clickContinue();
  }

  async selfAssignCase(submissionRef){
    await expect(this.page.locator('h1')).toContainText('Self Assignment');
    await expect(this.page.locator('#main-content')).toContainText(submissionRef);
    await expect(this.page.locator('label')).toContainText('I confirm all these details are accurate and match what is written on the case.');
    await this.page.locator('#confirmation').check();

    //validate claim is displayed in awaiting response
    await expect(this.page.locator('#main-content')).toContainText('ET3 Responses');
    await this.elements.replyToNewClaim.isVisible();
    await expect(this.page.locator('tbody')).toContainText(submissionRef);


  }

}
