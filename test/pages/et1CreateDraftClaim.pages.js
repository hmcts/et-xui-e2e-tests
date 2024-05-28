const { I } = inject();


module.exports = {

    //Create draft claim pages...
    et1Postcode:  "//input[@id='et1ReppedTriageAddress_et1ReppedTriageAddress_postcodeInput']" ,
    et1Section1: '[href="/et1SectionOne/et1SectionOne1"]',



  claimantWorkLocation() {
    I.waitForElement(this.et1Postcode, 10);
    // validate 2 links
    I.click(this.et1Postcode);
  },

  et1Claim(){
      I.waitForText('ET1 Claim', 10);
      I.see('Steps to making a claim');
      pause();
      I.click(this.et1Section1);
      // I.see('');
      // I.see('');
      // I.see('');
  }

};
