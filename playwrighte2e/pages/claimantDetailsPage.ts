import { BasePage } from "./basePage";

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
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.firstName));
    await this.webActions.fillField(this.elements.firstName, 'Laila');
    await this.webActions.fillField(this.elements.LastName, 'McDonald');

    await this.clickContinue();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.addressLine1));
    await this.clickContinue();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.claimantWorkPhone));

    await this.clickContinue();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.occupation));

    await this.clickContinue();
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.hearingPreference));
    await this.webActions.checkElementById('#claimantHearingPreference_contact_language-English');

    if(hearingPanelPreference) await this.fillPanelPreference();
    await this.clickSubmitButton();
  }

  async verifyClaimantDetails() {

    await this.verifyClaimantDetailsOnTab("Panel preference reason", respPageData.panelReason);
    await this.verifyClaimantDetailsOnTab("Hearing panel preference", respPageData.preferenceNameisPanel);
  }


  async verifyClaimantDetailsOnTab(fieldLabel: string, fieldValue: string) {
    await this.webActions.verifyElementToBeVisible(this.page.locator(`//*[normalize-space()="${fieldLabel}"]/../..//td[normalize-space()="${fieldValue}"]`));
  }

  async fillPanelPreference() {
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.panelEle));
    await this.webActions.checkElementById(this.elements.panelEle);
    await this.webActions.verifyElementToBeVisible(this.page.locator(this.elements.panelPreferenceReason));
    await this.webActions.fillField(this.elements.panelPreferenceReason, respPageData.panelReason);
  }

}
