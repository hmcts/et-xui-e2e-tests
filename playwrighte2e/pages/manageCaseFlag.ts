

import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class ManageCaseFlag extends BasePage {

    elements = {
    }
    async manageCaseFlag() {
        await this.webActions.checkElementByLabel('Case level - Urgent case (');
        await this.clickNextButton();
        await this.webActions.clickElementByRole('button', { name: 'Make inactive' });
        await this.clickNextButton();
        await this.submitButton();
    }
}
