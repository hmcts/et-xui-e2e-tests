import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export default class DraftJudgementPage extends BasePage {

    elements = {
        judgementYesEle: '#draftAndSignJudgement_isJudgement_Yes',
        docUploadEle: '#draftAndSignJudgement_draftAndSignJudgementDocuments_0_uploadedDocument',
        directionTextEle: '#draftAndSignJudgement_furtherDirections'
    
    }

    async submitDraftJudgement() {

        await expect(this.page.getByText('Draft and Sign Judgment').nth(1)).toBeVisible();
        await this.page.locator(this.elements.judgementYesEle).click();

        await this.addNewButtonClick();
        await this.page.waitForSelector(this.elements.docUploadEle);
        await this.page.setInputFiles(this.elements.docUploadEle,'test/data/test.txt');
        await this.delay(3000);

        await this.page.locator(this.elements.directionTextEle).fill('Test Draft Judgement');

        await this.clickContinue();
        await this.submitButton();
    }
}