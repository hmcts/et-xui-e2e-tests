const { I } = inject();


//Use this page to write down various postcode look up methods

module.exports = {
  postcodeLookUp: '#et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput',
  addressListDropdown: '#et1ReppedTriageAddress_et1ReppedTriageAddress_addressList',
  claimantAddressListDropdown:'#claimantContactAddress_claimantContactAddress_addressList',
  findAddress:'//*[@id="et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeLookup"]/button',
  claimantFindAddressButton:'//*[@id="claimantContactAddress_claimantContactAddress_postcodeLookup"]/button',
  claimantPostcode:'#claimantContactAddress_claimantContactAddress_postcodeInput',
  respPostcode: '#respondentAddress_respondentAddress_postcodeInput',
  restFindAddressButton:'//*[@id="respondentAddress_respondentAddress_postcodeLookup"]/button',
  respAddressListDropdown:'#respondentAddress_respondentAddress_addressList',



  enterPostcode(postcode, addressOption) {
    I.see('Enter a UK postcode');
    //TODO: validate hyper links
    I.fillField(this.postcodeLookUp, postcode);
    I.click(this.findAddress);
    I.waitForElement(this.addressListDropdown,5);
    I.selectOption(this.addressListDropdown, addressOption);
  },

  enterClaimantPostcode(postcode, addressOption) {
    I.see('Enter a UK postcode');
    I.fillField(this.claimantPostcode, postcode);
    I.click(this.claimantFindAddressButton);
    I.waitForElement(this.claimantAddressListDropdown,5);
    I.selectOption(this.claimantAddressListDropdown, addressOption);
  },

  enterRespPostcode(postcode, addressOption){
    I.see('Enter a UK postcode');
    I.fillField(this.respPostcode, postcode);
    I.click(this.restFindAddressButton);
    I.waitForElement(this.respAddressListDropdown,5);
    I.selectOption(this.respAddressListDropdown, addressOption);
  },

  postcodeValidation(buttonType){
    I.waitForText('Select an address');
    I.see('Building and Street');
    I.see('Address Line 2');
    I.see('Address Line 3');
    I.see('Town or City');
    I.see('County');
    I.see('Country');
    I.see('Postcode/Zipcode');
    if(buttonType=='Submit'){
      I.click('Submit');
    } else {
      I.click('Continue');
    }
    I.wait(10);
  }
};
