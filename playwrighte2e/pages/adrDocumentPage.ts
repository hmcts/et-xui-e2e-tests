import { BasePage } from "./basePage";


export default class AdrDocumentPage extends BasePage {
    async adrUploadDocument() {
        await this.page.locator('#adrDocumentCollection_0_uploadedDocument').setInputFiles('test/data/welshTest.pdf');
        await this.page.waitForTimeout(3000);
        await this.webActions.fillField('#adrDocumentCollection_0_shortDescription', 'description');
        await this.submitButton();
    }

    async verifyAdrDocumentDetails() {
        await this.page.locator('ccd-read-collection-field').waitFor();
        await this.webActions.verifyElementContainsText(this.page.locator('ccd-read-collection-field'), 'description');
    }
}

