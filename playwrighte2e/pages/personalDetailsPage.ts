import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";



export default class PersonalDetailsPage extends BasePage{

  elements={
    personalDetailsLink: this.page.locator('[href="/dob-details?lng=en"]'),
    dobDay:this.page.locator('#dobDate-day'),
    dobMonth:this.page.locator('#dobDate-month'),
    dobYear:this.page.locator('#dobDate-year')

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
    await this.elements.personalDetailsLink.click();
  }
  async enterDob() {
    await expect(this.page.locator('legend')).toContainText('What is your date of birth?');
    //enter date of birth

    await this.elements.dobDay.fill('01');
    await this.elements.dobMonth.fill( '01');
    await this.elements.dobYear.fill('1989');
    await this.saveAndContinueButton();
  }
  async selectSexAndTitle() {
    //select sex and enter title
    await expect(this.page.locator('h1')).toContainText('Sex and preferred title');
    await this.page.locator('#sex').check();
    await this.page.locator('#preferredTitle').fill( 'Mr');
    await this.saveAndContinueButton();
  }
  async enterPostcode(postcode, addressOption) {
    //Enter postcode for claimant address
    await expect(this.page.locator('label')).toContainText('Enter a UK postcode');
    await this.page.locator('#addressEnterPostcode').fill( postcode);
    await this.saveAndContinueButton();
    await expect(this.page.locator('h1')).toContainText('Select an address');
    await this.page.locator('#addressAddressTypes').selectOption( addressOption);
    await this.saveAndContinueButton();
    await expect(this.page.locator('h1')).toContainText('What is your contact or home address?');
    await this.saveAndContinueButton();
  }
  async enterTelephoneNumber() {
    //Enter telephone number
    await expect(this.page.locator('h1')).toContainText('What is your telephone number? (optional)');
    await this.page.locator('#telephone-number').fill( '07898787676');
    await this.saveAndContinueButton();
  }
  async selectHowToBeContacted() {
    //select option for how to be contacted
    //the communication preference combination should be tested in functional-test
    await expect(this.page.locator('h1')).toContainText('Communication preference');
    await expect(this.page.locator('#main-form')).toContainText('What format would you like to be contacted in?');
    await expect(this.page.locator('#main-form')).toContainText('What language do you want us to use when we contact you?');
    await expect(this.page.locator('#main-form')).toContainText('If a hearing is required, what language do you want to speak at a hearing?');

    await this.page.locator('#update-preference').check();
    await this.page.locator('#update-preference-language-2').check();
    await this.page.locator('#update-hearing-language-2').check();
    await this.saveAndContinueButton();
  }

  async communicationPreferenceScotland() {
    await expect(this.page.locator('#main-content')).toBeVisible({ timeout: 5000 });
    await expect(this.page.locator('h1')).toContainText('Communication preference', { timeout: 30000 });
    await expect(this.page.locator('#main-form')).toContainText('What format would you like to be contacted in?');
    await this.page.locator('#update-preference').check();
    await this.saveAndContinueButton();
  }

  async selectHearingPreference() {
    //Select hearing preference option - video hearing
    await expect(this.page.locator('legend')).toContainText('Would you be able to take part in hearings by video and phone?');
    await expect(this.page.locator('fieldset')).toContainText('Yes, I can take part in video hearings');
    await expect(this.page.locator('fieldset')).toContainText('Yes, I can take part in phone hearings');

    await this.page.locator('#hearingPreferences').check();
    await this.saveAndContinueButton();
  }
  async selectReasonableAdjustment() {
    //Select No to reasonable adjustment question
    await expect(this.page.locator('legend')).toContainText('Do you have a physical, mental or learning disability or long term health condition that means you need support during your case?');
    await this.page.locator('#reasonableAdjustments-2').check();
    await this.saveAndContinueButton();
  }
  async confirmCompletedPersonalDetailsQuestions() {
    //confirm completed personal details question
    await expect(this.page.locator('h1')).toContainText('Have you completed this section?');
    await this.page.locator('#tasklist-check').check();
    await this.saveAndContinueButton();
    await expect(this.page.locator('h1')).toContainText('Steps to making your claim');
  }
}
