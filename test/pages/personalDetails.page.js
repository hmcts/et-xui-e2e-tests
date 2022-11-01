const { I } = inject();

module.exports = {
  async processPersonalDetails() {
    this.clickPersonalDetailsLink();
    this.enterDob();
    this.selectSexAndTitle();
    this.enterPostcode();
    this.enterTelephoneNumber();
    this.selectHowToBeContacted();
    this.selectHearingPreference();
    this.selectReasonableAdjustment();
    this.confirmCompletedPersonalDetailsQuestions();
  },
  //click personal details link and enter details
  clickPersonalDetailsLink() {
    I.click('[href="/dob-details"]');
    I.see('What is your date of birth?');
  },
  enterDob() {
    //enter date of birth
    I.see('What is your date of birth?');
    I.fillField('#dobDate-day', '01');
    I.fillField('#dobDate-month', '01');
    I.fillField('#dobDate-year', '1989');
    I.click('Save and continue');
  },
  selectSexAndTitle() {
    //select sex and enter title
    I.see('Sex and preferred title');
    I.checkOption('#sex');
    I.fillField('#preferredTitle', 'Mr');
    I.click('Save and continue');
  },
  enterPostcode() {
    //Enter postcode for claimant address
    I.see('What is your contact or home address?');
    I.refreshPage();
    I.waitToHide('#address1', 10);
    I.dontSeeElement('#address1');
    I.fillField('#postcode', 'LS9 9HE');
    I.click('#findAddressButton');
    I.waitForVisible('#selectAddressInput', 30);
    I.selectOption(
      '#selectAddressInput',
      '{"fullAddress":"3, SKELTON AVENUE, LEEDS, LS9 9HE","street1":"3 SKELTON AVENUE","street2":"","town":"LEEDS","county":"LEEDS","postcode":"LS9 9HE","country":"ENGLAND"}',
    );
    I.click('Save and continue');
  },
  enterTelephoneNumber() {
    //Enter telephone number
    I.see('What is your telephone number?');
    I.fillField('#telephone-number', '07898787676');
    I.click('Save and continue');
  },
  selectHowToBeContacted() {
    //select option for how to be contacted
    I.see('How would you like to be contacted about your claim?');
    I.checkOption('#update-preference');
    I.click('Save and continue');
  },
  selectHearingPreference() {
    //Select hearing preference option - video hearing
    I.checkOption('#hearingPreferences');
    I.click('Save and continue');
  },
  selectReasonableAdjustment() {
    //Select No to reasonable adjustment question
    I.see(
      'Do you have a physical, mental or learning disability or long term health condition that means you need support during your case?',
    );
    I.checkOption('#reasonableAdjustments-2');
    I.click('Save and continue');
  },
  confirmCompletedPersonalDetailsQuestions() {
    //confirm completed personal details question
    I.see('Have you completed this section?');
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
    I.see('Steps to making your claim');
  },
};
