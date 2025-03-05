import { Page } from '@playwright/test';
import { BaseStep } from "./base";
import axeTest from '../helper/accessibilityHelper';

export default class AccessibilitySteps extends BaseStep {
    readonly page: Page;

     constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async scanExuiPages() {

        await axeTest(this.page);
        
        //Scan claimant tab
        await this.caseListPage.navigateToTab('Claimant');
        await axeTest(this.page);

        //Scan Vetting tab
        await this.caseListPage.navigateToTab('ET1 Vetting');
        await axeTest(this.page);

        //Scan Respondent tab
        await this.caseListPage.navigateToTab('Respondent');
        await axeTest(this.page);

        //Scan Jurisdction tab
        await this.caseListPage.navigateToTab('Jurisdictions');
        await axeTest(this.page);

        //Scan Referrals tab
        await this.caseListPage.navigateToTab('Referrals');
        await axeTest(this.page);
    }
}