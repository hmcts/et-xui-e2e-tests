const { I } = inject();


//Use this page to write down various postcode look up methods

module.exports = {
  postcodeLookUp: '#et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput',
  addressListDropdown: '#et1ReppedTriageAddress_et1ReppedTriageAddress_addressList',
  findAddress:'//*[@id="et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeLookup"]/button',


  enterPostcode(postcode, addressOption) {
    //Enter postcode for claimant address
    I.see('Enter a UK postcode');
    //TODO: validate hyper links
    I.fillField(this.postcodeLookUp, postcode);
    I.click(this.findAddress);
    I.waitForElement(this.addressListDropdown,5);
    I.selectOption(this.addressListDropdown, addressOption);
    I.see('Select an address');
    I.see('Building and Street');
    I.see('Address Line 2');
    I.see('Address Line 3');
    I.see('Town or City');
    I.see('County');
    I.see('Country');
    I.see('Postcode/Zipcode');
    pause();
    I.click('Submit');
    I.wait(10);
  }
};
