import { BasePage } from "./basePage";
import {expect} from "@playwright/test";


export default class UploadDocumentPage extends BasePage {
    readonly addNewButtonBottom= '//button[@class="button write-collection-add-item__bottom ng-star-inserted"]';
    readonly createDcfLink = '//a[contains(.,"Create, Upload or Remove DCF")]';
    readonly createDcfRadio ='#uploadOrRemoveDcf-Create';


    async uploadCaseManagementDocument() {
        await this.page.click(this.addNewButtonBottom);
        await this.page.locator('#documentCollection_1_topLevelDocuments').selectOption('4: Case Management');
        await this.page.locator('#documentCollection_1_uploadedDocument').click();
        await this.page.locator('#documentCollection_1_uploadedDocument').setInputFiles('test/data/welshTest.pdf');
        await this.page.waitForTimeout(3000);
        await this.submitButton();
    }

    async createDCF(){
        await this.page.locator(this.createDcfLink).isVisible();
        await this.page.click(this.createDcfLink);
        await this.page.check(this.createDcfRadio);
        await this.submitButton();
        await this.delay(60000);
    }

    async validateDCF(){
        await expect(this.page.locator('ccd-read-complex-field-table')).toContainText('-DCF.pdf');
        await expect(this.page.locator('ccd-read-complex-field-table')).toContainText('DCF Generated:');
    }

    async uploadFile(fileName: string, docNumber: number) {

        await this.page.waitForSelector('text=Case documentation', { timeout: 10000 });
        await this.addNewUploadDocButtonClick();
    
        await this.page.selectOption(`#documentCollection_${docNumber}_topLevelDocuments`, 'Misc');
        await expect(this.page.locator(`#documentCollection_${docNumber}_miscDocuments`)).toBeVisible();
        await this.page.waitForSelector(`#documentCollection_${docNumber}_uploadedDocument`);
        await this.page.setInputFiles(`#documentCollection_${docNumber}_uploadedDocument`,`test/data/${fileName}`);
        await this.page.waitForTimeout(6000);
        await this.submitButton();
        await this.delay(4000);
    }

    async verifyUploadDocuments(fileName: string) {
        await expect(this.page.getByText(fileName)).toBeVisible();
    }

}
