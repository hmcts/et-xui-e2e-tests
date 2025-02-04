import { Page } from 'playwright';
import { BasePage } from './basePage';

const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear();

export class ListHearingPage extends BasePage {
    // private page: Page;

    // constructor(page: Page) {
    //     this.page = page;
    // }

    hearingElement = '#hearingCollection';
    hearingNumber = '#hearingCollection_0_hearingNumber';
    hearingTypeOption = '#hearingCollection_0_Hearing_type';
    hearingOption = '#hearingCollection_0_Hearing_type';
    hearingFormatOption = '//input[@value="In person"]';
    hearingHybridOption = '#hearingCollection_0_hearingFormat-Hybrid';
    judicialMediationOption = '#hearingCollection_0_judicialMediation_No';
    hearingVenueOption = '#hearingCollection_0_Hearing_venue';
    managingOffice = '#hearingCollection_0_Hearing_venue_Scotland';
    hearingVenueOptionScotland = '#hearingCollection_0_Hearing_Glasgow';
    hearingLengthNum = '#hearingCollection_0_hearingEstLengthNum';
    dayHourMinutes = '#hearingCollection_0_hearingEstLengthNumType';
    sitAlonePanel = '#hearingCollection_0_hearingSitAlone-Sit\\ Alone';
    fullPanel = '#hearingCollection_0_hearingSitAlone-Full Panel';
    hearingStage = '#hearingCollection_0_Hearing_stage';
    hearingNotes = '#hearingCollection_0_Hearing_notes';
    dateSetUp = '#hearingCollection_0_hearingDateCollection > div > button';
    hearingListDay = '#listedDate-day';
    hearingListMonth = '#listedDate-month';
    hearingListYear = '#listedDate-year';
    submitHearingButton = '//button[@type="submit"]';
    selectHearing = '#hearingDetailsHearing';
    hearingStatus = '#hearingDetailsCollection_0_hearingDetailsStatus';
    disposePartOfCase = '#hearingDetailsCollection_0_hearingDetailsCaseDisposed_No';
    completionSuccessMessage = '//div[@class="alert-message"]';

    async listCase(location: string) {
        switch (location) {
            case 'EnglandWales':
                await this.page.waitForSelector(this.hearingNumber, { timeout: 10000 });
                await this.page.fill(this.hearingNumber, '1');
                await this.page.check(this.hearingHybridOption);
                await this.page.selectOption(this.hearingOption, '1: Costs Hearing');
                await this.page.check(this.judicialMediationOption);
                await this.page.selectOption(this.hearingVenueOption, '2: Hull');
                await this.page.fill(this.hearingLengthNum, '1');
                await this.page.selectOption(this.dayHourMinutes, '1: Days');
                await this.page.check(this.sitAlonePanel);
                await this.page.selectOption(this.hearingStage, '1: Stage 1');
                await this.page.click(this.dateSetUp);
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingListDay, listDay.toString());
                await this.page.fill(this.hearingListMonth, listMonth.toString());
                await this.page.fill(this.hearingListYear, listYear.toString());
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.locator(this.submitHearingButton).click();
                break;
            case 'Scotland':
                await this.page.waitForSelector(this.hearingNumber, { timeout: 10000 });
                await this.page.fill(this.hearingNumber, '01');
                await this.page.selectOption(this.hearingTypeOption, '1: Expenses/Wasted Costs Hearing');
                await this.page.check(this.hearingHybridOption);
                await this.page.check(this.judicialMediationOption);
                await this.page.selectOption(this.managingOffice, '1: Glasgow');
                await this.page.selectOption(this.hearingVenueOptionScotland, '1: Glasgow COET');
                await this.page.fill(this.hearingLengthNum, '1');
                await this.page.selectOption(this.dayHourMinutes, '1: Days');
                await this.page.check(this.sitAlonePanel);
                await this.page.selectOption(this.hearingStage, '1: Stage 1');
                await this.page.click(this.dateSetUp);
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingListDay, listDay.toString());
                await this.page.fill(this.hearingListMonth, listMonth.toString());
                await this.page.fill(this.hearingListYear, listYear.toString());
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.locator(this.submitHearingButton).click();
                break;
            default:
                throw new Error('... check your options or add new option');
        }
        await this.page.waitForSelector(this.completionSuccessMessage, { timeout: 10000 });
        await this.page.waitForSelector('text=has been updated with event: List Hearing');
    }

    async updateHearing() {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=Hearing Details');
        await this.page.selectOption(this.selectHearing, '1');
        await this.page.click(this.submitHearingButton);
        await this.page.waitForTimeout(10000);
        await this.page.selectOption(this.hearingStatus, 'Heard');
        await this.page.waitForSelector('text=Hearing Status', { timeout: 10000 });
        await this.page.check(this.disposePartOfCase);
        await this.page.fill('#hearingDetailsTimingStart-day', previousDay.toString());
        await this.page.fill('#hearingDetailsTimingFinish-day', currentDay.toString());
        await this.page.click(this.submitHearingButton);
        await this.page.waitForSelector('text=has been updated with event: Hearing Details', { timeout: 15000 });
    }
}
