import { Page } from '@playwright/test';
import { BaseStep } from "./base";

const referralData = require('../data/ui-data/referral-content.json');

export default class ReferralSteps extends BaseStep {

    constructor(page: Page) {
              super(page);
    }

    async processReferrals(referralType: string, referralTypeMethod: (page) => Promise<void>, verifyReferralMethod: (page) => Promise<void>) {
        //Send new referral
        await this.caseListPage.navigateToTab(referralData.tabName);
        await this.caseListPage.verifyAndClickReferralLink(referralType);
        // await this.referralPage.sendNewReferral();
        await referralTypeMethod(this.referralPage);

        //verify referral details
        await this.caseListPage.navigateToTab(referralData.tabName);
        // await this.caseListPage.verifyReferralDetails();
        await verifyReferralMethod(this.caseListPage);
    }


}