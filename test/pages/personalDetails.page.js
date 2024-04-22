const { I } = inject();

module.exports = {
  async processPersonalDetails(postcode, location, addressOption) {
    switch (location) {
      case 'England':
      case 'Wales':
      case 'England & Wales':
        this.clickPersonalDetailsLink();
        this.enterDob();
        this.selectSexAndTitle();
        this.enterPostcode(postcode, addressOption);
        this.enterTelephoneNumber();
        this.selectHowToBeContacted();
        this.selectHearingPreference();
        this.selectReasonableAdjustment();
        this.confirmCompletedPersonalDetailsQuestions();
        break;
      case 'Scotland':
        this.clickPersonalDetailsLink();
        this.enterDob();
        this.selectSexAndTitle();
        this.enterPostcode(postcode, addressOption);
        this.enterTelephoneNumber();
        this.communicationPreferenceScotland();
        this.selectHearingPreference();
        this.selectReasonableAdjustment();
        this.confirmCompletedPersonalDetailsQuestions();
        break;
      default:
        throw new Error(
          '... check the provided location. you have not specified a valid location such as England, Wales or Scotland',
        );
    }
  },
  //click personal details link and enter details
  clickPersonalDetailsLink() {
    I.click('[href="/dob-details?lng=en"]');
  },
  enterDob() {
    //enter date of birth
    I.waitForVisible('#main-content', 5);
    I.see('What is your date of birth?');
    I.fillField('#dobDate-day', '01');
    I.fillField('#dobDate-month', '01');
    I.fillField('#dobDate-year', '1989');
    I.click('Save and continue');
    I.wait(5);
  },
  selectSexAndTitle() {
    //select sex and enter title
    I.waitForVisible('#main-content', 5);
    I.see('Sex and preferred title');
    I.checkOption('#sex');
    I.fillField('#preferredTitle', 'Mr');
    I.click('Save and continue');
  },
  enterPostcode(postcode, addressOption) {
    //Enter postcode for claimant address
    I.waitForVisible('#main-content', 5);
    I.see('Enter a UK postcode');
    I.refreshPage();
    I.dontSeeElement('#address1');
    I.fillField('#addressEnterPostcode', postcode);
    I.wait(20);
    I.click('Save and continue');
    I.waitForVisible('#addressAddressTypes', 30);
    I.see('Select an address');
    I.see('Several addresses found');
    I.selectOption('#addressAddressTypes', addressOption);
    I.click('Save and continue');
    I.see('What is your contact or home address?');
    I.click('Save and continue');
  },
  enterTelephoneNumber() {
    //Enter telephone number
    I.waitForVisible('#main-content', 10);
    I.see('What is your telephone number?');
    I.fillField('#telephone-number', '07898787676');
    I.click('Save and continue');
  },
  selectHowToBeContacted() {
    //select option for how to be contacted
    //the communication preference combination should be tested in functional-test
    I.waitForVisible('#main-content', 5);
    I.see('Communication preference');
    I.see('What format would you like to be contacted in?');
    I.see('What language do you want us to use when we contact you?');
    I.see('If a hearing is required, what language do you want to speak at a hearing?');
    I.checkOption('#update-preference');
    I.checkOption('#update-preference-language-2');
    I.click('Save and continue');
  },
  communicationPreferenceScotland() {
    I.waitForVisible('#main-content', 5);
    I.waitForText('Communication preference', 30);
    I.see('What format would you like to be contacted in?');
    I.checkOption('#update-preference');
    I.click('Save and continue');
  },
  selectHearingPreference() {
    //Select hearing preference option - video hearing
    I.waitForVisible('#main-content', 5);
    I.see('Would you be able to take part in hearings by');
    I.see('video and phone?');
    I.checkOption('#hearingPreferences');
    I.click('Save and continue');
  },
  selectReasonableAdjustment() {
    //Select No to reasonable adjustment question
    I.waitForVisible('#main-content', 5);
    I.see('Do you have a physical, mental or learning');
    I.see('disability or long term health condition that');
    I.see('means you need support during your case?');
    I.checkOption('#reasonableAdjustments-2');
    I.click('Save and continue');
  },
  confirmCompletedPersonalDetailsQuestions() {
    //confirm completed personal details question
    I.waitForVisible('#main-content', 10);
    I.see('Have you completed this');
    I.see('section?');
    I.checkOption('#tasklist-check');
    I.click('Save and continue');
    I.see('Steps to making your claim');
  },
};
