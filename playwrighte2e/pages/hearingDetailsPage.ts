import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class HearingDetailsPage extends BasePage {
elements={
  hearingDropdownOption:'#hearingDetailsHearing'
}

  async updateHearing() {
    await this.page.selectOption('#hearingDetailsHearing',{index:1});
    await this.clickContinue();

    //remove all dates so can list hearing as heard
    await this.webActions.selectByLabelFromDropDown('#hearingDetailsCollection_0_hearingDetailsStatus','Heard');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Day','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Month','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Year','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Hour','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Minute','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Start Time (Optional)' },'Second','');

    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Day','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Month','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Year','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Hour','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Minute','');
    await this.webActions.fillFieldByRoleAndLabel('group',{ name: 'Finish (Optional)' },'Second','');
    await this.submitButton();

    await expect(this.page.locator('cut-alert')).toContainText('updated with event: Hearing Details');
  }

}
