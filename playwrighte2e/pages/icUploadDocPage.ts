import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import path from "path";

const icPageData = require('../data/ui-data/ic-page-content.json');

export default class ICUploadDocPage extends BasePage {

    elements = {
        respNameEle: 'tbody tr:nth-child(1) td:nth-child(2)',
        jurisdictionCodeInvalidYes: '#etICJuridictionCodesInvalid_Yes',
        invalidDetails: '#etICInvalidDetails',
        canProceedYes: '#etICCanProceed_Yes',
        hearingListedNo: '#etICHearingAlreadyListed_No',
        documentHeading: '#icDocumentCollection1 h2',
        fileUploadEle: '#icDocumentCollection1_0_uploadedDocument',
    }


    async judgeUploadsDocument() {
        await expect(this.page.getByText(icPageData.icLandingPageContent)).toBeVisible();
        await this.clickContinue();

        let actRespNameText = await this.page.locator(this.elements.respNameEle).first().textContent();
        await expect(actRespNameText).toEqual(icPageData.respName);

        await this.clickElement(this.elements.jurisdictionCodeInvalidYes);
        await this.clickElement(this.elements.canProceedYes);

        await this.page.fill(this.elements.invalidDetails, icPageData.invalidDetailsText);
        await this.clickElement(this.elements.hearingListedNo);
        await this.clickContinue();

        let txtHeading = await this.page.locator(this.elements.documentHeading).textContent();
        await expect(txtHeading?.trim()).toEqual(icPageData.docHeadingText);

        await this.page.getByLabel(icPageData.hearingOptionText).check();

        // Click and upload a document
        await this.addNewBtn.click();
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.locator(this.elements.fileUploadEle).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(__dirname, '../data/test-file/test-doc.pdf'));
        await this.delay(2000);
        await this.clickContinue();

        await this.submitButton();
        await expect(this.page.getByText(icPageData.icConfirmationText)).toBeVisible();
        await this.closeAndReturn();
    }

    async verifyRespondentHearingPanelValues() {

        await expect(this.page.getByText(icPageData.icLandingPageContent)).toBeVisible();
        await this.clickContinue();

        await this.verifyICDetailsOnTab("Preference", "Judge");
        await this.verifyICDetailsOnTab("Reason", "Test Panel Preference Reason");
    }

    async verifyICDetailsOnTab(fieldLabel: string, fieldValue: string) {
        await expect(this.page
            .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
    }
}