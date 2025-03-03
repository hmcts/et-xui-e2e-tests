

import { BasePage } from "./basePage";


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
