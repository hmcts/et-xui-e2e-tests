import { BasePage } from "./basePage";
import { expect } from '@playwright/test';


export default class Et3NotificationPage extends BasePage {

  elements = {
    documentUpload:'#et3NotificationDocCollection_0_uploadedDocument',
    typeOfDocument:'#et3NotificationDocCollection_0_typeOfDocument'
  }

  async sendEt3Notification() {
    await this.addNewButtonClick();
    await this.page.waitForSelector(this.elements.typeOfDocument);
    await this.webActions.selectByOptionFromDropDown(this.elements.typeOfDocument, '2.11 Response accepted');
    //Can't upload file via playwright
    await this.page.setInputFiles(this.elements.documentUpload,'test/data/welshTest.pdf');
    await this.page.waitForTimeout(5000);
    await this.clickContinue();
  }

  async processAcasPage() {
    await expect(this.page.locator('#caseEditForm')).toContainText('Email documents to Acas');
    await this.clickSubmitButton();

    await expect(this.page.locator('h5')).toContainText('We have notified the following parties:');
    await expect(this.page.locator('h3')).toContainText('Grayson Becker, Mrs Test Auto');
    await this.closeAndReturn();
  }

  async verifyEt3NotificationErrorMessage(){
    await expect(this.page.getByLabel('Cannot continue because the').getByRole('listitem')).toContainText('Please upload the appropriate ET3 document for each respondent’s response status.');
  }

}
