import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
import { AxeUtils } from '@hmcts/playwright-common';
const today = new Date();

export default class Et1CaseServingPage extends BasePage {

  elements = {

    //ET1 Vetting Pages...
    date_accepted_day: '#dateAccepted-day',
    date_accepted_month: '#dateAccepted-month',
    date_accepted_year: '#dateAccepted-year',
  }

  async processET1CaseServingPages(accessibilityEnabled?: boolean, axeUtils?: AxeUtils) {
    if(accessibilityEnabled) {
      // @ts-ignore
      await axeUtils.audit();
    }
    await this.webActions.checkElementByLabel('Yes');
    await this.webActions.fillField(this.elements.date_accepted_day, String(today.getDate()));
    await this.webActions.fillField(this.elements.date_accepted_month, String(today.getMonth() +1));
    await this.webActions.fillField(this.elements.date_accepted_year, String(today.getFullYear()));
    await this.page.locator(this.elements.date_accepted_month).click();
    await this.clickSubmitButton();
    await this.delay(5000);
  }


  async getClaimantFirstName() {
    const firstName = await this.page.locator('#case-viewer-field-read--claimantIndType tr:nth-of-type(2) span:nth-of-type(1) span:nth-of-type(1)').innerText();
    const lastName = await this.page.locator('#case-viewer-field-read--claimantIndType tr:nth-of-type(3) span:nth-of-type(1) span:nth-of-type(1)').innerText();
    console.log(firstName);
    console.log(lastName);
    return {
      firstName,
      lastName,
    };
  }

  async et1ServingEvent(){
    await this.addNewButtonClick();
    await this.webActions.selectByOptionFromDropDown('#servingDocumentCollection_0_typeOfDocument', '7.7 In person preliminary hearing - notice of case management discussion');
    await this.page.locator('#servingDocumentCollection_0_uploadedDocument').setInputFiles('test/data/welshTest.pdf');
    await this.page.waitForTimeout(3000);
    await this.webActions.fillField('#servingDocumentCollection_0_shortDescription', 'ET1 serving');
    await this.clickContinue();
  }

  async et1ServingEventNoticeOfClaim(){
    await this.addNewButtonClick();
    await this.webActions.selectByOptionFromDropDown('#servingDocumentCollection_0_typeOfDocument', '2.7 ET2 short track claim');
    await this.page.locator('#servingDocumentCollection_0_uploadedDocument').setInputFiles('test/data/welshTest.pdf');
    await this.page.waitForTimeout(3000);
    await this.webActions.fillField('#servingDocumentCollection_0_shortDescription', 'ET1 serving');
    await this.clickContinue();

    await this.webActions.waitForElementToBeVisible('text=Print and send paper documents');
    await this.clickContinue();

    await this.webActions.waitForElementToBeVisible('text=Email documents to Acas');
    await this.clickSubmitButton();

    await this.webActions.waitForElementToBeVisible('text=Documents sent');
    await this.clickCloseAndReturn();
  }

  async validateEt1ErrorMessage(){
    await expect(this.page.getByLabel('Cannot continue because the').getByRole('listitem')).toContainText('You have only uploaded a notice of hearing. Please also upload the relevant service letter.');
  }
}

