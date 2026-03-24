import { BasePage } from './basePage.ts';
import { expect } from '@playwright/test';
import dateUtilComponent from "../data-utils/DateUtilComponent";

export default class AllocateHearingPage extends BasePage {

  elements = {
    hearingDropDown: '#allocateHearingHearing',
    hearingJudge: '#allocateHearingJudge',
    hearingEmployerMember: '#allocateHearingEmployerMember',
    hearingEmployeeMember: '#allocateHearingEmployeeMember',
    hearingTypeSingle: '#printHearingDetails_hearingDateType-Single'
  };

  async allocateHearing() {
    await this.page.selectOption(this.elements.hearingDropDown,{index:1});
    await this.clickContinue();
    await this.page.selectOption(this.elements.hearingJudge,'T Haddlesey');
    await this.page.selectOption(this.elements.hearingEmployerMember,'ER Member');
    await this.page.selectOption(this.elements.hearingEmployeeMember,'EE Member');
    await this.clickContinue();
    await this.clickSubmitButton()
    await this.delay(2000);
  }

  async validateHearingList() {
    await this.webActions.selectByOptionFromDropDown('#printHearingDetails_listingVenue','Newcastle CFCTC')
    await this.page.selectOption('#printHearingDetails_hearingDocType','IT56 - List of Exhibits' )
    let [year, month, day] = dateUtilComponent.addWeekdays(new Date(), 21).toISOString().split('T')[0].split('-');
    await this.webActions.checkElementById(this.elements.hearingTypeSingle)
    await this.webActions.fillField('#listingDate-day',day)
    await this.webActions.waitForElementToBeVisible('#listingDate-month')
    await this.webActions.fillField('#listingDate-month',month)
    await this.webActions.waitForElementToBeVisible('#listingDate-year')
    await this.webActions.fillField('#listingDate-year',year)
    await this.page.waitForLoadState('load');
    await this.clickContinue();
    await this.page.waitForLoadState('load');
    await this.delay(5000)
    await expect(this.page.locator("//th/span[text()='Employee Member']/../../td")).toBeEmpty()
    await expect(this.page.locator("//th/span[text()='Employer Member']/../../td")).toBeEmpty()
  }
}