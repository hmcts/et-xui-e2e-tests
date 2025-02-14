import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const respPageData = require('../data/ui-data/respondent-page-content.json');

export default class ClaimantDetailsPage extends BasePage{

  elements = {
    firstName:'#claimantIndType_claimant_first_names',
    LastName:'#claimantIndType_claimant_last_name',
    addressLine1:'#claimantType_claimant_addressUK__detailAddressLine1',
    claimantWorkPhone:'#claimantWorkAddress_claimant_work_phone_number',
    occupation:'#claimantOtherType_claimant_occupation',
    hearingPreference:'#claimantHearingPreference_contact_language-English',
    panelEle: '#claimantHearingPreference_claimant_hearing_panel_preference-Panel',
    panelPreferenceReason: '#claimantHearingPreference_claimant_hearing_panel_preference_why'
  }

  async processClaimantDetails(hearingPanelPreference?: boolean) {
    await expect(this.page.locator(this.elements.firstName)).toBeVisible();
    await this.page.locator(this.elements.firstName).fill('Laila');
    await this.page.locator(this.elements.LastName).fill('McDonald');
    await this.clickContinue();
    await expect(this.page.locator(this.elements.addressLine1)).toBeVisible();
    await this.clickContinue();
    await expect(this.page.locator(this.elements.claimantWorkPhone)).toBeVisible();
    await this.clickContinue();
    await expect(this.page.locator(this.elements.occupation)).toBeVisible();
    await this.clickContinue();
    await expect(this.page.locator(this.elements.hearingPreference)).toBeVisible();
    await this.page.locator('#claimantHearingPreference_contact_language-English').check();

    if(hearingPanelPreference) await this.fillPanelPreference();
    await this.submitButton();
  }

  async verifyClaimantDetails() {

    await this.verifyClaimantDetailsOnTab("Panel preference reason", respPageData.panelReason);
    await this.verifyClaimantDetailsOnTab("Hearing panel preference", respPageData.preferenceNameisPanel);
  }


  async verifyClaimantDetailsOnTab(fieldLabel: string, fieldValue: string) {
    await expect(this.page
        .locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`)).toBeVisible();
  }

  async fillPanelPreference() {
    await expect(this.page.locator(this.elements.panelEle)).toBeVisible();
    await this.page.locator(this.elements.panelEle).check();

    await expect(this.page.locator(this.elements.panelPreferenceReason)).toBeVisible();
    await this.page.locator(this.elements.panelPreferenceReason).fill(respPageData.panelReason);
  }

}
