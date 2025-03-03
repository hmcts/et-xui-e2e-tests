import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export default class PersonalDetailsPage extends BasePage{

  elements={
    personalDetailsLink: '[href="/dob-details?lng=en"]',
    dobDay: '#dobDate-day',
    dobMonth:'#dobDate-month',
    dobYear: '#dobDate-year',
    headerElement: this.page.locator('h1'),
    labelElement: this.page.locator('label')

  };
  async processPersonalDetails(postcode, location, addressOption) {
    switch (location) {
      case 'England':
      case 'Wales':
      case 'England & Wales':
        await this.clickPersonalDetailsLink();
        await this.enterDob();
        await this.selectSexAndTitle();
        await this.enterPostcode(postcode, addressOption);
        await this.enterTelephoneNumber();
        await this.selectHowToBeContacted();
        await this.selectHearingPreference();
        await this.selectReasonableAdjustment();
        await this.confirmCompletedPersonalDetailsQuestions();
        break;
      case 'Scotland':
        await this.clickPersonalDetailsLink();
        await this.enterDob();
        await this.selectSexAndTitle();
        await this.enterPostcode(postcode, addressOption);
        await this.enterTelephoneNumber();
        await this.communicationPreferenceScotland();
        await this.selectHearingPreference();
        await this.selectReasonableAdjustment();
        await this.confirmCompletedPersonalDetailsQuestions();
        break;
      default:
        throw new Error(
          '... check the provided location. you have not specified a valid location such as England, Wales or Scotland',
        );
    }
  }
  //click personal details link and enter details
  async clickPersonalDetailsLink() {
    await this.webActions.clickElementByCss(this.elements.personalDetailsLink);
  }
  async enterDob() {
    await expect(this.page.locator('legend')).toContainText('What is your date of birth?');
    //enter date of birth
    await this.webActions.fillField(this.elements.dobDay, '01');
    await this.webActions.fillField(this.elements.dobMonth, '01');
    await this.webActions.fillField(this.elements.dobYear, '1989');
    await this.saveAndContinueButton();
  }
  async selectSexAndTitle() {
    //select sex and enter title
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Sex and preferred title');
    await this.webActions.checkElementById('#sex');

    await this.webActions.fillField('#preferredTitle', 'Mr');
    await this.saveAndContinueButton();
  }
  async enterPostcode(postcode, addressOption) {
    //Enter postcode for claimant address
    await this.webActions.verifyElementContainsText(this.elements.labelElement, 'Enter a UK postcode');
    await this.webActions.fillField('#addressEnterPostcode', postcode);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Select an address');
    await this.webActions.selectByLabelFromDropDown('#addressAddressTypes', addressOption);

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'What is your contact or home address?');

    await this.saveAndContinueButton();
  }
  async enterTelephoneNumber() {
    //Enter telephone number
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'What is your telephone number? (optional)');
    await this.webActions.fillField('#telephone-number', '07898787676');
    await this.saveAndContinueButton();
  }
  async selectHowToBeContacted() {
    //select option for how to be contacted
    //the communication preference combination should be tested in functional-test
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Communication preference');
    await this.webActions.verifyElementContainsText(this.page.locator('#main-form'), 'What format would you like to be contacted in?');
    await this.webActions.verifyElementContainsText(this.page.locator('#main-form'), 'What language do you want us to use when we contact you?');
    await this.webActions.verifyElementContainsText(this.page.locator('#main-form'), 'If a hearing is required, what language do you want to speak at a hearing?');
    await this.webActions.checkElementById('#update-preference');
    await this.webActions.checkElementById('#update-preference-language-2');
    await this.webActions.checkElementById('#update-hearing-language-2');

    await this.saveAndContinueButton();
  }

  async communicationPreferenceScotland() {
    await this.webActions.verifyElementToBeVisible(this.page.locator('#main-content'), 5000);
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Communication preference', 30000);
    await this.webActions.verifyElementContainsText(this.page.locator('#main-form'), 'What format would you like to be contacted in?');
    await this.webActions.checkElementById('#update-preference');
    await this.saveAndContinueButton();
  }

  async selectHearingPreference() {
    //Select hearing preference option - video hearing
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Would you be able to take part in hearings by video and phone?');
    await this.webActions.verifyElementContainsText(this.page.locator('fieldset'), 'Yes, I can take part in video hearings');
    await this.webActions.verifyElementContainsText(this.page.locator('fieldset'), 'Yes, I can take part in phone hearings');
    await this.webActions.checkElementById('#hearingPreferences');
    await this.saveAndContinueButton();
  }
  async selectReasonableAdjustment() {
    //Select No to reasonable adjustment question
    await this.webActions.verifyElementContainsText(this.page.locator('legend'), 'Do you have a physical, mental or learning disability or long term health condition that means you need support during your case?');
    await this.webActions.checkElementById('#reasonableAdjustments-2');
    await this.saveAndContinueButton();
  }
  async confirmCompletedPersonalDetailsQuestions() {
    //confirm completed personal details question
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Have you completed this section?');
    await this.webActions.checkElementById('#tasklist-check');

    await this.saveAndContinueButton();
    await this.webActions.verifyElementContainsText(this.elements.headerElement, 'Steps to making your claim');
  }
}
