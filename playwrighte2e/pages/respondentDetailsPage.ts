import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const respPageData = require('../data/ui-data/respondent-page-content.json');

export default class RespondentDetailsPage extends BasePage {

  elements = {
    respondentName: '#respondentCollection_0_respondent_name',
    judgePanelEle: '#respondentCollection_0_respondent_hearing_panel_preference-Judge',
    panelPreferenceReason: '#respondentCollection_0_respondent_hearing_panel_preference_reason',
    orgRespondentType: '#respondentCollection_0_respondentType-Organisation',
    orgNameEle: '#respondentCollection_0_respondentOrganisation',
    expandImgIcon: 'div a img'
  }

  async processRespondentDetails() {
    await expect(this.page.locator(this.elements.respondentName)).toBeVisible();
    await this.page.locator(this.elements.respondentName).fill('Mr Mark Gill');
    await this.submitButton();
  }

  async processPanelPreference() {

    await expect(this.page.locator(this.elements.judgePanelEle)).toBeVisible();
    await this.page.locator(this.elements.judgePanelEle).check();

    await expect(this.page.locator(this.elements.panelPreferenceReason)).toBeVisible();
    await this.page.locator(this.elements.panelPreferenceReason).fill(respPageData.panelReason);

    await expect(this.page.locator(this.elements.orgRespondentType)).toBeVisible();
    await this.page.locator(this.elements.orgRespondentType).check();

    await expect(this.page.locator(this.elements.orgNameEle)).toBeVisible();
    await this.page.locator(this.elements.orgNameEle).fill(respPageData.orgName);
    await this.submitButton();
  }

  async verifyRespondentDetails() {

    await this.page.waitForSelector(this.elements.expandImgIcon);
    await this.page.locator(this.elements.expandImgIcon).click();

    await this.verifyRespondentDetailsOnTab("Type of respondent", respPageData.orgRespType);
    await this.verifyRespondentDetailsOnTab("Organisation or business name", "Test Organisation Name");
    await this.verifyRespondentDetailsOnTab("Hearing panel preference", respPageData.preferenceNameisJudge);
  }


  async verifyRespondentDetailsOnTab(fieldLabel: string, fieldValue: string) {
    await expect(this.page
        .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
  }

}
