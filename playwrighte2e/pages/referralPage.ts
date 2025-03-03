import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

const referralData = require('../data/ui-data/referral-content.json');

export default class ReferralPage extends BasePage {

    elements = {
        judgeReferralOption: '#referCaseTo-Judge',
        isUrgentYes: '#isUrgent_Yes',
        referralSubjOption: '#referralSubject',
        referralDetails: '#referralDetails',
        docUploadEle: '#referralDocument_0_uploadedDocument',
        referralSelectEle: '#selectReferral',
        adminDirectionOption: '#directionTo-Admin',
        isUrgentReplyYes: '#isUrgentReply_Yes',
        directionSubjEle: '#directionDetails',
        replyDocUploadEle: '#replyDocument_0_uploadedDocument',
        confirmCloseReferralYes: '#confirmCloseReferral-Yes',
        closeReferralGeneralNotes: '#closeReferralGeneralNotes',
    }

    async sendNewReferral() {

        await expect(this.page.getByText('Refer to admin, legal officer or judge')).toBeVisible();
        await this.webActions.clickElementByCss(this.elements.judgeReferralOption);
        await this.webActions.clickElementByCss(this.elements.isUrgentYes);
        await this.webActions.selectByLabelFromDropDown(this.elements.referralSubjOption, 'ET1');
        await this.webActions.fillField(this.elements.referralDetails, referralData.details);

        await this.addNewButtonClick();
        await this.page.waitForSelector(this.elements.docUploadEle);
        await this.page.setInputFiles(this.elements.docUploadEle,'test/data/test.txt');

        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.createRefConfirmationMsg);
        await this.closeAndReturn();
    }

    async replyToReferral(){
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.referralSelectEle));
        await this.webActions.selectByOptionFromDropDown(this.elements.referralSelectEle, '1 - ET1');
        await this.clickContinue();

        await expect(this.page.locator("//tr/td[contains(text(), 'Judge')]")).toBeVisible();
        await expect(this.page.locator("//tr/td[contains(text(), 'ET Caseworker5')]")).toBeVisible();
        await this.webActions.clickElementByCss(this.elements.adminDirectionOption);
        await this.webActions.clickElementByCss(this.elements.isUrgentReplyYes);
        await this.webActions.fillField(this.elements.directionSubjEle, referralData.directionDetails);
        
        await this.addNewButtonClick();
        await this.page.waitForSelector(this.elements.replyDocUploadEle);
        await this.page.setInputFiles(this.elements.replyDocUploadEle,'test/data/test.txt');

        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.replyRefConfirmationMsg);
        await this.closeAndReturn();
    }

    async closeAReferral(){
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.referralSelectEle));
        await this.webActions.selectByOptionFromDropDown(this.elements.referralSelectEle, '1 - ET1');
        await this.clickContinue();

        let expText = await this.page.locator("//tr/th[contains(text(), 'Referral')]").textContent();
        await expect(expText).toEqual('Referral');
        await expect(this.page.getByText('Referral Replies', { exact: true })).toBeVisible();
        await this.webActions.clickElementByCss(this.elements.confirmCloseReferralYes);
        await this.webActions.fillField(this.elements.closeReferralGeneralNotes, referralData.closeRefNotes);
        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.closeRefConfirmationMsg);
        await this.closeAndReturn();
    }
}