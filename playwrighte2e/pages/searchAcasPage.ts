import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
const acasCertData = require('../data/ui-data/acas-content.json');

export default class SearchAcasPage extends BasePage {

    elements = {
        acasCertificateTextBox: '#acasCertificate',
        confirmationEle: '#confirmation-body'
    }

    async findAcasCertificateSuccessfully(acasCertNum: string) {
        await expect(this.page.getByText('Please enter an ACAS Certificate number')).toBeVisible();
        await this.page.fill(this.elements.acasCertificateTextBox, acasCertNum);
        await this.submitButton();

        await this.page.waitForSelector(this.elements.confirmationEle, { timeout: 10000 });
        await expect(this.page.getByText(`Please download the ACAS Certificate from : ${acasCertData.docName}`)).toBeVisible();
    }
}