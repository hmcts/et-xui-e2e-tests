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
        await this.webActions.selectByLabelFromDropDown(this.elements.part1DocsEle, letterPageData.part1DocOption);
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.part2DocsEle));
        await this.webActions.selectByLabelFromDropDown(this.elements.part2DocsEle, letterPageData.part2DocOption);
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.hearingNumberEle));

        const selectBox = this.page.locator(this.elements.hearingNumberEle);
        const option = await selectBox.locator("option").filter({ hasText: letterPageData.hearingOption }).textContent();
        if(option) await selectBox.selectOption(option);

      await this.submitButton();
      await this.webActions.verifyElementToBeVisible(this.closeAndReturnButton);
      //await this.webActions.verifyElementContainsText(this.page.locator('markdown p'), letterPageData.confirmationTxt);
      await this.closeAndReturn();
    }

    async generateNoHearingDateLetter() {

        expect(this.page.getByText(letterPageData.headerText)).toBeVisible();
        await this.webActions.selectByLabelFromDropDown(this.elements.part1DocsEle, letterPageData.part1DocOption);
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.part2DocsEle));
        await this.webActions.selectByLabelFromDropDown(this.elements.part2DocsEle, letterPageData.part2DocOptionNoHearing);

        await this.submitButton();
        await this.page.waitForSelector('markdown p', { timeout: 30000 });
        await this.webActions.verifyElementContainsText(this.page.locator('markdown p'), letterPageData.confirmationTxt);
        await this.closeAndReturn();
    }
}