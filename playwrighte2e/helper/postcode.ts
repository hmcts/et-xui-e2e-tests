
//Use this page to write down various postcode look up methods
import { BasePage } from "../pages/basePage";
import { Page, expect } from "@playwright/test"

export default class PostcodeHelper extends BasePage {
  elements = {
    postcodeLookUp: this.page.locator('#et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput'),
    addressListDropdown: this.page.locator('#et1ReppedTriageAddress_et1ReppedTriageAddress_addressList'),
    claimantAddressListDropdown: this.page.locator('#claimantContactAddress_claimantContactAddress_addressList'),
    findAddress: this.page.locator('//*[@id="et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeLookup"]/button'),
    claimantFindAddressButton: this.page.locator('//*[@id="claimantContactAddress_claimantContactAddress_postcodeLookup"]/button'),
    claimantPostcode: this.page.locator('#claimantContactAddress_claimantContactAddress_postcodeInput'),
    respPostcode: this.page.locator('#respondentAddress_respondentAddress_postcodeInput'),
    restFindAddressButton: this.page.locator('//*[@id="respondentAddress_respondentAddress_postcodeLookup"]/button'),
    respAddressListDropdown: this.page.locator('#respondentAddress_respondentAddress_addressList'),
  };

    async enterPostcode(postcode, addressOption) {
    //'Enter a UK postcode' - text validate
      await this.elements.postcodeLookUp.fill(postcode);
      //flaky ui
      await this.wait(3000);
      //TODO: validate hyper links
      await this.elements.findAddress.click();
      await this.wait(3000);
      await this.elements.addressListDropdown.selectOption(addressOption);
      await this.page.click('Submit');
    }

  async enterClaimantPostcode(postcode, addressOption) {
    //'Enter a UK postcode' - text validate
     await this.elements.claimantPostcode.fill(postcode);
    await this.wait(3000);
     await this.elements.claimantFindAddressButton.click();
    await this.wait(3000);
     await this.elements.claimantAddressListDropdown.selectOption(addressOption)
    await this.clickContinue();
    }

  async enterRespPostcode(postcode, addressOption) {
    //'Enter a UK postcode' - text validate
    await this.elements.respPostcode.fill(postcode);
    await this.wait(3000);
    await this.elements.restFindAddressButton.click();
    await this.wait(3000);
    await this.elements.respAddressListDropdown.selectOption(addressOption);
    await this.clickContinue();
    }

}
