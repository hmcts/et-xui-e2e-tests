import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

export default class ClaimantRepresentativePage extends BasePage {

  elements = {
    nameOfRepresentative: "#representativeClaimantType_name_of_representative",
    occupation: "#representativeClaimantType_representative_occupation",
    claimantPostcode:"#representativeClaimantType_representative_address_representative_address_postcodeInput",
    searchForOrg:"#search-org-text",
    selectOrgFromSearchResult: '//a[contains(.,"Select")]',

  }

  async addClaimantRepresentative() {
   await this.webActions.fillField(this.elements.nameOfRepresentative, "Test Claimant Representative");
   await this.webActions.selectByOptionFromDropDown(this.elements.occupation,'1: Solicitor');
     await this.webActions.fillField(this.elements.claimantPostcode, 'LS1 1NS');
    await this.webActions.clickElementByCss('#representativeClaimantType_representative_address_representative_address_postcodeInput button' );
    await this.webActions.selectByLabelFromDropDown('#representativeClaimantType_representative_address_representative_address_addressList', 'H B O S Plc, 1 Lovell Park Road, Leeds');
    await this.delay(2000);

    await this.webActions.fillField(this.elements.searchForOrg, 'ET Test Factory Solicitor');
    await this.webActions.clickElementByCss(this.elements.selectOrgFromSearchResult);
    await this.clickSubmitButton();
  }

  async validateRepresentativeDetails(){
    await expect(this.page.locator('ccd-read-organisation-field-table')).toBeVisible()
    await expect(this.page.locator('ccd-read-organisation-field-table')).toContainText('ET Test Factory Solicitor');
  }

}
