import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

const letterPageData = require('../data/ui-data/letter-content.json');

export default class LettersPage extends BasePage {

    elements = {
        part1DocsEle: "#correspondenceType_topLevel_Documents",
        part2DocsEle: "#correspondenceType_part_2_Documents",
        hearingNumberEle: "#correspondenceType_dynamicHearingNumber"
    }

    async generateShortTrackLetter() {

        expect(this.page.getByText(letterPageData.headerText)).toBeVisible();
        await this.page.selectOption(this.elements.part1DocsEle, letterPageData.part1DocOption);
        
        expect(this.page.locator(this.elements.part2DocsEle)).toBeVisible();
        await this.page.selectOption(this.elements.part2DocsEle, letterPageData.part2DocOption);

        expect(this.page.locator(this.elements.hearingNumberEle)).toBeVisible();
        const selectBox = this.page.locator(this.elements.hearingNumberEle);
        const option = await selectBox.locator("option").filter({ hasText: letterPageData.hearingOption }).textContent();
        if(option) await selectBox.selectOption(option);

        await this.submitButton();
        await this.page.waitForSelector('markdown p', { timeout: 10000 });
        await expect(this.page.getByText(letterPageData.confirmationTxt)).toBeVisible();
        await this.closeAndReturn();
    }
}