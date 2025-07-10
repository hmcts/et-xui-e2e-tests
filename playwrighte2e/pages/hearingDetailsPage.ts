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
    await this.webActions.checkElementById('#hearingDetailsCollection_0_hearingDetailsCaseDisposed_No');
    await this.webActions.fillField('#hearingDetailsTimingStart-day', '');
    await this.webActions.fillField('#hearingDetailsTimingStart-month', '');
    await this.webActions.fillField('#hearingDetailsTimingStart-year', '');
    await this.webActions.fillField('#hearingDetailsTimingStart-hour', '');
    await this.webActions.fillField('#hearingDetailsTimingStart-minute', '');
    await this.webActions.fillField('#hearingDetailsTimingStart-second', '');


    await this.webActions.fillField('#hearingDetailsTimingFinish-day', '');
    await this.webActions.fillField('#hearingDetailsTimingFinish-month', '');
    await this.webActions.fillField('#hearingDetailsTimingFinish-year', '');
    await this.webActions.fillField('#hearingDetailsTimingFinish-hour', '');
    await this.webActions.fillField('#hearingDetailsTimingFinish-minute', '');
    await this.webActions.fillField('#hearingDetailsTimingFinish-second', '');
    await this.submitButton();

    await expect(this.page.locator('cut-alert')).toContainText('updated with event: Hearing Details');
  }

}
