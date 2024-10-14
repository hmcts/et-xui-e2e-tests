import { BasePage } from "./basePage";
import { expect } from "@playwright/test";


export default class ClaimantDetailsPage extends BasePage{

  elements = {
    firstName:'#claimantIndType_claimant_first_names',
    LastName:'#claimantIndType_claimant_last_name',
    addressLine1:'#claimantType_claimant_addressUK__detailAddressLine1',
    claimantWorkPhone:'#claimantWorkAddress_claimant_work_phone_number',
    occupation:'#claimantOtherType_claimant_occupation',
    hearingPreference:'#claimantHearingPreference_contact_language-English'
  }
  async processClaimantDetails() {
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
    await this.submitButton();
  }

}
