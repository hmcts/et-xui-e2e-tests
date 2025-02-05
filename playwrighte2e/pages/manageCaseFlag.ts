

import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class ManageCaseFlag extends BasePage {

    elements = {
    }
    async manageCaseFlag() {
        await this.page.getByLabel('Case level - Urgent case (').check();
        await this.clickNextButton();
        await this.page.getByRole('button', { name: 'Make inactive' }).click();
        await this.clickNextButton();
        await this.submitButton();
    }
}
