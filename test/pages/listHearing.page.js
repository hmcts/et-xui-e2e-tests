import { expect, Page } from '@playwright/test';

const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear();

export const hearingPage = {
  hearingElement: '#hearingCollection',
  hearingNumber: '#hearingCollection_0_hearingNumber',
  hearingTypeOption: '#hearingCollection_0_Hearing_type',
  hearingOption: '#hearingCollection_0_Hearing_type',
  hearingFormatOption: '//input[@value="In person"]',
  hearingHybridOption: '#hearingCollection_0_hearingFormat-Hybrid',
  judicialMediationOption: '#hearingCollection_0_judicialMediation_No',
  hearingVenueOption: '#hearingCollection_0_Hearing_venue',
  managingOffice: '#hearingCollection_0_Hearing_venue_Scotland',
  hearingVenueOptionScotland: '#hearingCollection_0_Hearing_Glasgow',
  hearingLengthNum: '#hearingCollection_0_hearingEstLengthNum',
  dayHourMinutes: '#hearingCollection_0_hearingEstLengthNumType',
  sitAlonePanel: '#hearingCollection_0_hearingSitAlone-Sit\\ Alone',
  fullPanel: '#hearingCollection_0_hearingSitAlone-Full Panel',
  hearingStage: '#hearingCollection_0_Hearing_stage',
  hearingNotes: '#hearingCollection_0_Hearing_notes',
  dateSetUp: '#hearingCollection_0_hearingDateCollection > div > button',
  hearingListDay: '#listedDate-day',
  hearingListMonth: '#listedDate-month',
  hearingListYear: '#listedDate-year',
  submitHearingButton: '[type="submit"]',
  selectHearing: '#hearingDetailsHearing',
  hearingStatus: '#hearingDetailsCollection_0_hearingDetailsStatus',
  disposePartOfCase: '#hearingDetailsCollection_0_hearingDetailsCaseDisposed_No',
  completionSuccessMessage: '//div[@class="alert-message"]',

  async listCase(page, location) {
    switch (location) {
      case 'EnglandWales':
        await page.waitForSelector(this.hearingNumber, { timeout: 10000 });
        await expect(page.locator('text=Case Number')).toBeVisible();
        await page.fill(this.hearingNumber, '1');
        // hearing format
        await page.check(this.hearingHybridOption);
        //hearing type
        await page.selectOption(this.hearingOption, '1: Costs Hearing');
        await page.check(this.judicialMediationOption);
        await page.selectOption(this.hearingVenueOption, '2: Hull');
        await page.fill(this.hearingLengthNum, '1');
        await page.selectOption(this.dayHourMinutes, '1: Days');
        //sit alone or full panel
        await page.check(this.sitAlonePanel);
        await page.selectOption(this.hearingStage, '1: Stage 1');
        await page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.click(this.dateSetUp);
        await page.waitForTimeout(2000);
        await page.fill(this.hearingListDay, listDay.toString());
        await page.fill(this.hearingListMonth, listMonth.toString());
        await page.fill(this.hearingListYear, listYear.toString());
        await page.click(this.submitHearingButton);
        break;
      case 'Scotland':
        await page.waitForSelector(this.hearingNumber, { timeout: 10000 });
        await expect(page.locator('text=Case Number')).toBeVisible();
        await page.fill(this.hearingNumber, '01');
        //hearing type
        await page.selectOption(this.hearingTypeOption, '1: Expenses/Wasted Costs Hearing');
        // hearing format
        await page.check(this.hearingHybridOption);
        await page.check(this.judicialMediationOption);
        await page.selectOption(this.managingOffice, '1: Glasgow');
        await page.selectOption(this.hearingVenueOptionScotland, '1: Glasgow COET');
        await page.fill(this.hearingLengthNum, '1');
        await page.selectOption(this.dayHourMinutes, '1: Days');
        //sit alone or full panel
        await page.check(this.sitAlonePanel);
        await page.selectOption(this.hearingStage, '1: Stage 1');
        await page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.click(this.dateSetUp);
        await page.waitForTimeout(2000);
        await page.fill(this.hearingListDay, listDay.toString());
        await page.fill(this.hearingListMonth, listMonth.toString());
        await page.fill(this.hearingListYear, listYear.toString());
        await page.click(this.submitHearingButton);
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    await page.waitForSelector(this.completionSuccessMessage, { timeout: 10000 });
    await expect(page.locator('text=has been updated with event: List Hearing')).toBeVisible();
  },

  async updateHearing(page) {
    await page.waitForTimeout(5000);
    await expect(page.locator('text=Hearing Details')).toBeVisible();
    await page.selectOption(this.selectHearing, '1');
    await page.click(this.submitHearingButton);
    // Verifying the Hearings Tab.
    await page.waitForTimeout(10000);
    await page.selectOption(this.hearingStatus, 'Heard');
    await page.waitForSelector('text=Hearing Status', { timeout: 10000 });
    await page.check(this.disposePartOfCase);
    await page.fill('#hearingDetailsTimingStart-day', previousDay.toString());
    await page.fill('#hearingDetailsTimingFinish-day', currentDay.toString());
    await page.click(this.submitHearingButton);
    await page.waitForSelector('text=has been updated with event: Hearing Details', { timeout: 15000 });
  },
};
