const { I } = inject();

module.exports = {
  async processPersonalDetails() {
    await this.enterPersonalDetails();
  },

  //click personal details link and enter details
  async enterPersonalDetails() {
    await I.click('[href="/dob-details"]');
    //enter date of birth
    await I.see('What is your date of birth?');
    await I.fillField('#dobDate-day', '01');
    await I.fillField('#dobDate-month', '01');
    await I.fillField('#dobDate-year', '1989');
    await I.click('Save and continue');
    //select sex and enter title
    await I.see('Sex and preferred title');
    await I.checkOption('#sex');
    await I.fillField('#preferredTitle', 'Mr');
    await I.click('Save and continue');
    //Enter postcode for claimant address
    await I.see('What is your contact or home address?');
    await I.refreshPage();
    await I.waitToHide('#address1', 10);
    await I.dontSeeElement('#address1');
    await I.fillField('#postcode', 'LS9 9HE');
    await I.click('#findAddressButton');
    await I.waitForVisible('#selectAddressInput');
    await I.selectOption(
      '#selectAddressInput',
      '{"fullAddress":"3, SKELTON AVENUE, LEEDS, LS9 9HE","street1":"3 SKELTON AVENUE","street2":"","town":"LEEDS","county":"LEEDS","postcode":"LS9 9HE","country":"ENGLAND"}',
    );
    await I.click('Save and continue');
    //Enter telephone number
    await I.see('What is your telephone number?');
    await I.fillField('#telephone-number', '07898787676');
    await I.click('Save and continue');
    //select option for how to be contacted
    await I.see('How would you like to be contacted about your claim?');
    await I.checkOption('#update-preference');
    await I.click('Save and continue');
    //Select hearing preference option - video hearing
    await I.checkOption('#hearingPreferences');
    await I.click('Save and continue');
    //Select No to reasonable adjustment question
    await I.see(
      'Do you have a physical, mental or learning disability or long term health condition that means you need support during your case?',
    );
    await I.checkOption('#reasonableAdjustments-2');
    await I.click('Save and continue');
    //confirm completed personal details question
    await I.see('Have you completed this section?');
    await I.checkOption('#tasklist-check');
    await I.click('Save and continue');
    await I.see('Steps to making your claim');
  },
};
