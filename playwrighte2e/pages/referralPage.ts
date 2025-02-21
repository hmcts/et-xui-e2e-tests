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
        await this.page.locator(this.elements.judgeReferralOption).click();
        await this.page.locator(this.elements.isUrgentYes).click();

        await this.page.selectOption(this.elements.referralSubjOption, 'ET1');
        await this.page.locator(this.elements.referralDetails).fill(referralData.details);

        await this.addNewButtonClick();
        await this.page.waitForSelector(this.elements.docUploadEle);
        await this.page.setInputFiles(this.elements.docUploadEle,'test/data/test.txt');

        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.createRefConfirmationMsg);
        await this.closeAndReturn();
    }

    async replyToReferral(){

        await expect(this.page.locator(this.elements.referralSelectEle)).toBeVisible();
        await this.page.selectOption(this.elements.referralSelectEle, '1 - ET1');
        await this.clickContinue();

        await expect(this.page.locator("//tr/td[contains(text(), 'Judge')]")).toBeVisible();
        await expect(this.page.locator("//tr/td[contains(text(), 'ET CaseworkerOne')]")).toBeVisible();

        await this.page.locator(this.elements.adminDirectionOption).click();
        await this.page.locator(this.elements.isUrgentReplyYes).click();
        await this.page.locator(this.elements.directionSubjEle).fill(referralData.directionDetails);
        
        await this.addNewButtonClick();
        await this.page.waitForSelector(this.elements.replyDocUploadEle);
        await this.page.setInputFiles(this.elements.replyDocUploadEle,'test/data/test.txt');

        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.replyRefConfirmationMsg);
        await this.closeAndReturn();
    }

    async closeAReferral(){
    
        await expect(this.page.locator(this.elements.referralSelectEle)).toBeVisible();
        await this.page.selectOption(this.elements.referralSelectEle, '1 - ET1');
        await this.clickContinue();

        let expText = await this.page.locator("//tr/th[contains(text(), 'Referral')]").textContent();
        await expect(expText).toEqual('Referral');
        await expect(this.page.getByText('Referral Replies', { exact: true })).toBeVisible();

        await this.page.locator(this.elements.confirmCloseReferralYes).click();
        await this.page.locator(this.elements.closeReferralGeneralNotes).fill(referralData.closeRefNotes);
        await this.clickContinue();
        await this.submitButton();

        await expect(this.page.locator('markdown p')).toContainText(referralData.closeRefConfirmationMsg);
        await this.closeAndReturn();

    }

    

}