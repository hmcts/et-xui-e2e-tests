import {BasePage} from "./basePage";
import {expect} from "@playwright/test";

export default class responseLandingPage extends BasePage {
    async startEt3() {
        await expect(this.page.locator('#main-content')).toContainText('Case overview');
        await this.page.getByRole('link', {name: 'Your response form (ET3)'}).click();
        await expect(this.page.getByRole('heading')).toContainText('Response to ET1 employment tribunal claim (ET3)');
        await this.clickStartNow();
    }
}
