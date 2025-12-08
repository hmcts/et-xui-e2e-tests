import { BasePage } from "./basePage";
import { params } from "../config/config";
import { expect, Page } from '@playwright/test';


export default class Et3LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): Et3LoginPage {
    return new Et3LoginPage(page);
  }

  elements={

    returnToExistingResponse:'[href="/return-to-existing-response?lng=en"]',
    submit:this.page.locator('[type="submit"]'),
    startNow:this.page.locator('[href="/case-number-check"]'),
    respondToNewClaim: '[href="/case-number-check?lng=en&redirect=selfAssignment"]',
    caseNumber: '#ethosCaseReference',
    submissionRefNumber: '#caseReferenceId',
    respName:'#respondentName',
    claimantFirstName:'#claimantFirstName',
    claimantLastName:'#claimantLastName',
    caseRefNumber:this.page.locator('#ethosCaseReference'),
    appointLegalRepLink:'[href="/appoint-legal-representative"]'

  }
  async processRespondentLogin(username: string, password: string, caseNumber: string) {
    await this.page.goto(params.TestUrlRespondentUi);
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Introduction');
    await this.webActions.clickElementByCss('[href="/case-number-check"]');
    await this.wait(10);
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Case Number');
    await this.webActions.fillField(this.elements.caseNumber, caseNumber.toString());
    await this.clickContinue();
    await this.loginRespondentUi(username, password);
  }

  async loginRespondentUi(username, password){
    await this.webActions.fillField('#username', username);
    await this.webActions.fillField('#password', password);
    await this.elements.submit.click();
  }


  async replyToNewClaim(submissionRef, caseNumber, respName, firstName, lastName){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Before you continue');

    await this.clickContinue();
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'ET3 Responses');
    await this.webActions.clickElementByCss(this.elements.respondToNewClaim);
    await this.caseNumberPage(caseNumber);
    await this.caseDetailsPage(submissionRef, respName, firstName, lastName);
    await this.checkAndSubmitPage(caseNumber);
  }

  async caseNumberPage(caseNumber){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Case Number');
    await this.webActions.fillField(this.elements.caseNumber, caseNumber.toString());

    await this.clickContinue();
  }

  async caseDetailsPage(submissionRef, respName, firstName, lastName){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Case Details');
    await this.webActions.fillField(this.elements.submissionRefNumber, submissionRef.toString());

    //resp name is hard coded here as case is created from api which is using json
    //check case sensitivity
    await this.webActions.fillField(this.elements.respName, respName);
    await this.webActions.fillField(this.elements.claimantFirstName, firstName);
    await this.webActions.fillField(this.elements.claimantLastName, lastName);
    await this.delay(5000);
    await this.clickContinue();
  }

  async checkAndSubmitPage(caseNumber){
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Check and submit');
    await this.webActions.checkElementById('#confirmation');
    await this.clickSubmitButton();

    //validate claim is displayed in awaiting response
    await this.page.reload();
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'ET3 Responses');
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondToNewClaim));
    await this.webActions.clickElementByLabel('view ' + caseNumber.toString() + ':');
  }

  async processRespondentLoginForExistingCase(username: string, password: string, caseNumber: string){
    await this.page.goto(params.TestUrlRespondentUi);
    await this.webActions.clickElementByCss(this.elements.returnToExistingResponse);
    await this.webActions.checkElementById('#return_number_or_account-2');
    await this.clickContinue();
    await this.loginRespondentUi(username, password);

    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'ET3 Responses');
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.respondToNewClaim));
    await this.webActions.clickElementByLabel('view ' + caseNumber.toString() + ':');
  }

  async validateClaimantDetailsInRespondentApp(firstname:string, lastname:string) {
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');

    await this.webActions.clickElementByText('View claimant contact details');
    await expect(this.page.locator('dl')).toContainText(firstname +" " +lastname);
    await expect(this.page.locator('dl')).toContainText('Address');
    await expect(this.page.locator('dl')).toContainText('Email');
  }

  async validateNocNotificationBanner(){
    await expect(this.page.locator('h3')).toContainText('You are now being legally represented by');
  }

  async stopLegalRepRepresentation(){
    await this.webActions.clickElementByText('Change my legal representative');
    await expect(this.page.locator('legend')).toContainText('Do you want to change your legal representative?');
    //Yes, I confirm I wish to remove my legal representative and continue my case representing myself.
    await this.page.locator('#legalRep-2').click();
    await this.clickSubmitButton();
    await this.webActions.verifyElementContainsText(this.page.locator('#main-content'), 'Case overview');
    await this.page.getByLabel('Important').filter({ hasText: 'You are no longer legally represented.'}).isVisible();
    await this.page.locator(this.elements.appointLegalRepLink).isVisible();
  }
}
