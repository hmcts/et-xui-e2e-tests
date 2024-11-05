import {BasePage} from "./basePage";
import {expect} from "@playwright/test";

export default class RespContactDetailsPages extends BasePage{
    elements={
        contactDetailsLink:this.page.locator('[href="/new-self-assignment-request?lng=en"]')
    };
    async et3Section1() {
        await this.contactDetails();
        //TODO
        await this.hearingFormatEmployerDetails();

    }

    async contactDetails(){
        await this.clickContactDetailsLink();
        await this.respondentName();
        await this.typeOfOrganization();
        await this.respondentAddress();
        await this.nameOfContact();
        await this.dxAddress();
        await this.contactPhoneNumber();
        await this.contactPreference();
        await this.cyaPage();
    }

    async hearingFormatEmployerDetails(){

    }

    async clickContactDetailsLink(){
        await expect(this.page.locator('h1')).toContainText('Your response form (ET3)');
        await this.elements.contactDetailsLink.click();
    }

    async respondentName(){
        await expect(this.page.getByRole('heading')).toContainText('Respondent name');
        await this.page.getByLabel('Yes').check();
        await this.saveAndContinueButton();
           }

    async typeOfOrganization(){
        await expect(this.page.getByRole('heading')).toContainText('What type of organisation is the respondent? (optional)');
        await this.page.getByLabel('Preferred title (optional)').fill('test');
        await this.saveAndContinueButton();
    }

    async respondentAddress(){
        await expect(this.page.locator('legend')).toContainText('Is this the respondent’s correct address?');
        await this.page.getByLabel('Yes').check();
        await this.saveAndContinueButton();
    }

    async nameOfContact(){
        await expect(this.page.getByRole('heading')).toContainText('Name of contact (optional)');
        await this.saveAndContinueButton();
    }

    async dxAddress(){
        await expect(this.page.getByRole('heading')).toContainText('DX address (optional)');
        await this.page.locator('#et3ResponseDXAddress').fill('DX12345');
        await this.saveAndContinueButton();
    }

    async contactPhoneNumber(){
        await expect(this.page.getByRole('heading')).toContainText('What is your contact phone number? (optional)');
        await this.page.locator('#responseRespondentPhone1').fill('07803456789');
        await this.saveAndContinueButton();
    }

    async contactPreference(){
        await expect(this.page.getByRole('heading')).toContainText('Respondent contact preferences');
        await expect(this.page.locator('#main-form')).toContainText('How would you prefer to be contacted? (optional)');
        await expect(this.page.locator('#main-form')).toContainText('Which language should the tribunal use to contact you? (optional)');
        await this.page.getByLabel('Email').check();
        await this.page.getByLabel('English').check();
        await this.saveAndContinueButton();
    }

    async cyaPage(){
        await expect(this.page.locator('dl')).toContainText('Respondent name');
        await expect(this.page.locator('dl')).toContainText('What type of organisation is the respondent?');
        await expect(this.page.locator('dl')).toContainText('DX address (optional)');
        await expect(this.page.locator('dl')).toContainText('What language would you like to be contacted in? (optional)');
        await this.page.getByLabel('Yes, I’ve completed this').check();
        await this.saveAndContinueButton();
    }
}
