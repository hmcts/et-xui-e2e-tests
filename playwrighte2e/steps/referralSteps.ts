import { Page } from '@playwright/test';
import { BaseStep } from "./base";

const referralData = require('../data/ui-data/referral-content.json');

export default class ReferralSteps extends BaseStep {
  constructor(page: Page) {
    super(page);
  }

  async processReferrals(
    referralType: string,
    referralTypeMethod: (page: any) => Promise<void>,
    verifyReferralMethod: (page: any) => Promise<void>,
  ) {
    //Send new referral
    await this.caseListPage.navigateToTab(referralData.tabName);
    await this.caseListPage.verifyAndClickLinkInTab(referralType);
    await referralTypeMethod(this.referralPage);

    //verify referral details
    await this.caseListPage.navigateToTab(referralData.tabName);
    await verifyReferralMethod(this.caseListPage);
  }

  async processReferralsForWa(referralTypeMethod: (page: any) => Promise<void>) {
    await referralTypeMethod(this.referralPage);
  }

  async processSendReferralsForWa(referralType: string, referralTypeMethod: (page: any) => Promise<void>) {
    //Send new referral
    await this.caseListPage.navigateToTab(referralData.tabName);
    await this.caseListPage.verifyAndClickLinkInTab(referralType);
    await referralTypeMethod(this.referralPage);
  }
}
