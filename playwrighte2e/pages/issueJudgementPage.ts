import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export default class IssueJudgementPage extends BasePage {

    elements = {
        nonHearingJudgementYes: '#judgementCollection_0_non_hearing_judgment_Yes',
        judgementTypeOption: '#judgementCollection_0_judgement_type',
        addNewEle: '.write-collection-add-item__top',
        jurisdictionList: '#judgementCollection_0_jurisdictionCodes_0_juridictionCodesList',
        judgementMadeDay: '#date_judgment_made-day',
        judgementMadeMonth: '#date_judgment_made-month',
        judgementMadeYear: '#date_judgment_made-year',
        judgementSentDay: '#date_judgment_sent-day',
        judgementSentMonth: '#date_judgment_sent-month',
        judgementSentYear: '#date_judgment_sent-year',


    }

    async issueJudgement() {

        await expect(this.page.getByText('Non Hearing Judgment?')).toBeVisible();
        await this.page.locator(this.elements.nonHearingJudgementYes).click();
        await this.page.selectOption(this.elements.judgementTypeOption, 'Case Management');

        await this.page.locator(this.elements.addNewEle).nth(1).click();
        await this.page.selectOption(this.elements.jurisdictionList, 'DAG');

        await this.page.locator(this.elements.judgementMadeDay).fill('01');
        await this.page.locator(this.elements.judgementMadeMonth).fill('01');
        await this.page.locator(this.elements.judgementMadeYear).fill('2025');

        await this.page.locator(this.elements.judgementSentDay).fill('02');
        await this.page.locator(this.elements.judgementSentMonth).fill('01');
        await this.page.locator(this.elements.judgementSentYear).fill('2025');

        await this.clickSubmitButton();
    }
}
