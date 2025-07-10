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
    await this.webActions.selectByOptionFromDropDown(this.elements.typeOfDocument, '2.11 Response accepted')
    await this.page.waitForTimeout(2000);
    //Can't upload file via playwright
    await this.page.setInputFiles(this.elements.documentUpload,'test/data/test.txt');
    await this.page.waitForTimeout(3000);
    await this.clickContinue();
  }

  async verifyEt3NotificationErrorMessage(){
    await expect(this.page.locator('errors')).toContainText('Please upload the appropriate ET3 document for each respondent’s response status.');
  }

}
