import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export default class RespContactDetailsPages extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public static create(page: Page): RespContactDetailsPages {
    return new RespContactDetailsPages(page);
  }

  elements = {
    contactDetailsLink: '[href="/respondent-name"]',
  };
  async et3Section1() {
    await this.contactDetails();
    await this.hearingFormatEmployerDetails();
  }

  async contactDetails() {
    await this.clickContactDetailsLink();
    await this.respondentName();
    await this.typeOfOrganization();
    await this.respondentAddress();
    await this.nameOfContact();
    await this.dxAddress();
    await this.contactPhoneNumber();
    await this.contactPreference();
    await this.cyaPage();
  }

  async hearingFormatEmployerDetails() {
    await this.hearingFormat();
    await this.respondentEmployee();
    await this.respondentSite();
    await this.numberOfEmployeeAtsite();
    await this.hearingFormatCya();
  }

  async clickContactDetailsLink() {
    await this.webActions.verifyElementContainsText(this.page.locator('h1'), 'Your response form (ET3)');
    await this.webActions.clickElementByCss(this.elements.contactDetailsLink);
  }

  async respondentName() {
    await this.page.getByLabel('Yes').check();
    await this.saveAndContinueButton();
  }

  async typeOfOrganization() {
    await this.webActions.checkElementByLabel('Individual');
    await this.page.getByLabel('Preferred title (optional)').fill('test');
    await this.saveAndContinueButton();
  }

  async respondentAddress() {
    await this.webActions.checkElementByLabel('Yes');
    await this.saveAndContinueButton();
  }

  async nameOfContact() {
    await this.saveAndContinueButton();
  }

  async dxAddress() {
    await this.webActions.fillField('#et3ResponseDXAddress', 'DX12345');
    await this.saveAndContinueButton();
  }

  async contactPhoneNumber() {
    await this.webActions.fillField('#responseRespondentPhone1', '07803456789');
    await this.saveAndContinueButton();
  }

  async contactPreference() {
    await this.webActions.verifyElementContainsText(
      this.page.locator('#main-form'),
      'How would you prefer to be contacted? (optional)',
    );
    await this.webActions.verifyElementContainsText(
      this.page.locator('#main-form'),
      'Which language should the tribunal use to contact you? (optional)',
    );
    await this.webActions.checkElementByLabel('Email');
    await this.webActions.checkElementByLabel('English');

    await this.saveAndContinueButton();
  }

  async cyaPage() {
    await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'Respondent name');
    await this.webActions.verifyElementContainsText(
      this.page.locator('dl'),
      'What type of organisation is the respondent?',
    );
    await this.webActions.verifyElementContainsText(this.page.locator('dl'), 'DX address (optional)');
    await this.webActions.verifyElementContainsText(
      this.page.locator('dl'),
      'What language would you like to be contacted in? (optional)',
    );
    await this.webActions.checkElementByLabel('Yes, I’ve completed this');
    await this.saveAndContinueButton();
  }

  async hearingFormat() {
    await this.webActions.verifyElementContainsText(
      this.page.locator('legend'),
      'Would you be able to take part in hearings by video and phone? (optional)',
    );

    await this.page.getByText('Yes, I can take part in video').click();
    await this.saveAndContinueButton();
    await this.webActions.clickElementByLabel('Yes');
    await this.webActions.clickElementByLabel('Tell us what support you need');
    await this.page.getByLabel('Tell us what support you need').fill('disable access');
    await this.saveAndContinueButton();
  }

  async respondentEmployee() {
    await this.webActions.verifyElementContainsText(
      this.page.locator('#main-form'),
      'How many people does the respondent employ in Great Britain? (optional)',
    );
    await this.page.getByLabel('How many people does the').fill('10');
    await this.saveAndContinueButton();
  }

  async respondentSite() {
    await this.webActions.checkElementByLabel('No');
    await this.saveAndContinueButton();
  }

  async numberOfEmployeeAtsite() {
    await this.webActions.verifyElementContainsText(
      this.page.locator('#main-form'),
      'How many people are employed at the site where the claimant worked? (optional)',
    );

    await this.page.getByLabel('How many people are employed').fill('10');
    await this.saveAndContinueButton();
  }

  async hearingFormatCya() {
    await this.webActions.verifyElementContainsText(
      this.page.locator('dl'),
      'Would you be able to take part in hearings by video and phone? (optional)',
    );
    await this.webActions.verifyElementContainsText(
      this.page.locator('dl'),
      'Tell us what support you need to request',
    );
    await this.webActions.verifyElementContainsText(
      this.page.locator('dl'),
      'How many employed at the site the claimant worked at? (optional)',
    );
    await this.webActions.clickElementByText('Yes, I’ve completed this');
    await this.saveAndContinueButton();
  }
}
